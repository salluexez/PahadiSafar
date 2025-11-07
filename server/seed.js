import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import { hrtcRoutes } from './hrtc-routes.js';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import the Route model
const routeSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  vehicleType: { 
    type: String, 
    enum: ['bus', 'taxi'], 
    required: true 
  },
  departureTime: String,
  price: Number,
  availableSeats: Number,
  vehicleId: String,
  routePolyline: String,
  estimatedDuration: Number,
  distance: Number,
  stops: [String],
  routeType: String,
  busType: String,
  lastUpdated: { type: Date, default: Date.now }
});

const Route = mongoose.model('Route', routeSchema);

// Seed the database
async function seedDatabase() {
  try {
    // Clear existing routes
    await Route.deleteMany({});
    
    // Make sure all routes have the correct vehicle types
    const validatedRoutes = hrtcRoutes.map(route => ({
      ...route,
      price: Number(route.price),
      availableSeats: Number(route.availableSeats),
      estimatedDuration: Number(route.estimatedDuration),
      distance: Number(route.distance),
      vehicleType: route.vehicleType.toLowerCase() // normalize to lowercase
    }));
    
    // Insert routes
    await Route.insertMany(validatedRoutes);
    
    console.log(`✅ Database seeded with ${validatedRoutes.length} HRTC routes`);
    console.log('🚌 Added routes for major destinations:');
    console.log('   - Shimla Region (including Kinnaur circuit)');
    console.log('   - Manali Region (including Leh route)');
    console.log('   - Dharamshala Region');
    console.log('   - Kullu Valley Routes');
    console.log('   - Tourist Special Routes');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    console.log('Validation error details:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

seedDatabase();