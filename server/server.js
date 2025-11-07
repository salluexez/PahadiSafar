import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("🌐 Server is ready at http://localhost:3000");
  })
  .catch((err) => {
    console.error("❌ Mongo Error:", err);
    process.exit(1);
  });

/////////////////////////////////////////////////////
// Schemas
/////////////////////////////////////////////////////

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["driver", "admin"], default: "driver" },
});

const User = mongoose.model("User", userSchema);

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  driverName: String,
  routeName: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

const routeSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  vehicleType: { type: String, enum: ['bus', 'taxi'], required: true },
  departureTime: String,
  price: Number,
  availableSeats: Number,
  vehicleId: { type: String, required: true },
  routePolyline: String,
  estimatedDuration: Number, // in minutes
  distance: Number, // in kilometers
  stops: [String], // intermediate stops if any
  lastUpdated: { type: Date, default: Date.now }
});

const Route = mongoose.model("Route", routeSchema);

// Ride Schema for Driver-created rides
const rideSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driverName: String,
  status: { 
    type: String, 
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  createdAt: { type: Date, default: Date.now }
});

const Ride = mongoose.model("Ride", rideSchema);

/////////////////////////////////////////////////////
// Middleware for Auth
/////////////////////////////////////////////////////

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Check for Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ 
          success: false,
          message: "No authorization header provided" 
        });
      }

      // Extract token
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ 
          success: false,
          message: "No token provided" 
        });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Add user info to request
      req.user = decoded;

      // Check role if required
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ 
          success: false,
          message: "Access forbidden. Required role: " + roles.join(" or ")
        });
      }

      console.log('Auth successful for user:', decoded.username); // Debug log
      next();
    } catch (err) {
      console.error('Auth error:', err); // Debug log
      res.status(401).json({ 
        success: false,
        message: "Invalid or expired token" 
      });
    }
  };
};

/////////////////////////////////////////////////////
// AUTH ROUTES
/////////////////////////////////////////////////////

// 1️⃣ Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.json({ success: true, message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2️⃣ Signin
app.post("/api/auth/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      role: user.role,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/////////////////////////////////////////////////////
// VEHICLE ROUTES (Protected)
/////////////////////////////////////////////////////

// Check-In (driver only)
app.post("/api/checkin", authMiddleware(["driver"]), async (req, res) => {
  try {
    const { vehicleId, routeName, latitude, longitude } = req.body;
    const driverId = req.user.id;
    const driverName = req.user.username;

    const data = new Vehicle({
      vehicleId,
      driverId,
      driverName,
      routeName,
      latitude,
      longitude,
    });
    await data.save();
    res.json({ success: true, message: "Check-in saved", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get Vehicles (any authenticated role)
app.get("/api/vehicles", authMiddleware(), async (req, res) => {
  try {
    const cutoff = new Date(Date.now() - 30 * 60 * 1000);
    const vehicles = await Vehicle.find({ timestamp: { $gte: cutoff } });
    res.json({ success: true, vehicles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3️⃣ Get Specific Vehicle by ID
app.get("/api/vehicle/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ vehicleId: req.params.id });
    if (!vehicle)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4️⃣ Delete Old Data (cleanup route)
app.delete("/api/cleanup", async (req, res) => {
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hrs
    await Vehicle.deleteMany({ timestamp: { $lt: cutoff } });
    res.json({ success: true, message: "Old data removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/////////////////////////////////////////////////////
// DRIVER RIDE MANAGEMENT
/////////////////////////////////////////////////////

// Create a new ride
app.post("/api/rides", authMiddleware(['driver']), async (req, res) => {
  try {
    const { source, destination, date } = req.body;
    
    if (!source || !destination || !date) {
      return res.status(400).json({ 
        success: false, 
        message: "Source, destination and date are required" 
      });
    }

    const ride = new Ride({
      source,
      destination,
      date: new Date(date),
      driverId: req.user.id,
      driverName: req.user.username
    });

    await ride.save();

    res.json({ 
      success: true, 
      message: "Ride created successfully",
      ride
    });

  } catch (error) {
    console.error('Create ride error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to create ride"
    });
  }
});

// ROUTE SEARCH AND NAVIGATION ENDPOINTS
/////////////////////////////////////////////////////

// Search for available routes
app.get("/api/routes/search", async (req, res) => {
  try {
    const { from, to, type } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({ 
        success: false, 
        message: "Both 'from' and 'to' locations are required" 
      });
    }

    // Build search query
    const query = {
      from: new RegExp(from, 'i'),
      to: new RegExp(to, 'i')
    };
    if (type && ['bus', 'taxi'].includes(type)) {
      query.vehicleType = type;
    }

    // Find matching routes
    const routes = await Route.find(query)
      .select('-routePolyline') // Don't send polyline in search results
      .sort({ departureTime: 1 })
      .limit(10);

    res.json({ 
      success: true, 
      routes,
      count: routes.length
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get route details with path
app.get("/api/routes/:id/path", async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ 
        success: false, 
        message: "Route not found" 
      });
    }

    // If we don't have a cached polyline or it's old, fetch from Mapbox
    if (!route.routePolyline || 
        route.lastUpdated < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      
      // This would be your Mapbox API call
      // For hackathon demo, returning dummy polyline
      route.routePolyline = "mock_polyline_data";
      route.lastUpdated = new Date();
      await route.save();
    }

    res.json({
      success: true,
      route: {
        id: route._id,
        from: route.from,
        to: route.to,
        polyline: route.routePolyline,
        duration: route.estimatedDuration,
        distance: route.distance,
        stops: route.stops
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Add a new route (admin only)
app.post("/api/routes", authMiddleware(["admin"]), async (req, res) => {
  try {
    const {
      from,
      to,
      vehicleType,
      departureTime,
      price,
      availableSeats,
      vehicleId,
      stops
    } = req.body;

    const route = new Route({
      from,
      to,
      vehicleType,
      departureTime,
      price,
      availableSeats,
      vehicleId,
      stops: stops || []
    });

    await route.save();
    res.json({ 
      success: true, 
      message: "Route added successfully", 
      route 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

/////////////////////////////////////////////////////
// Root route handler
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to the HRTC Routes API",
    endpoints: {
      search: "/api/routes/search?from={city}&to={city}",
      auth: {
        signup: "/api/auth/signup",
        signin: "/api/auth/signin"
      },
      vehicles: "/api/vehicles",
      routes: "/api/routes"
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('👉 Make sure MongoDB is running');
  console.log('📝 Available endpoints:');
  console.log('   POST /api/auth/signin - Sign in');
  console.log('   POST /api/auth/signup - Sign up');
  console.log('   POST /api/rides - Create a ride (requires auth)');
  console.log('   GET /api/routes/search - Search routes');
});

// 31.690707243428594, 76.48864777433269;

// 32.110920207983604, a;
