export const hrtcRoutes = [
  // Shimla Region Routes
  {
    from: "Shimla",
    to: "Manali",
    vehicleType: "bus",
    departureTime: "06:00",
    price: 750,
    availableSeats: 40,
    vehicleId: "HP01-1234",
    estimatedDuration: 300, // 5 hours
    distance: 247, // km
    stops: ["Theog", "Narkanda", "Rampur", "Kullu"],
    routeType: "Regular",
    busType: "Volvo"
  },
  {
    from: "Shimla",
    to: "Dharamshala",
    vehicleType: "bus",
    departureTime: "05:30",
    price: 800,
    availableSeats: 40,
    vehicleId: "HP01-2345",
    estimatedDuration: 360, // 6 hours
    distance: 330,
    stops: ["Sundernagar", "Mandi", "Joginder Nagar", "Palampur"],
    routeType: "Regular",
    busType: "Deluxe"
  },
  {
    from: "Shimla",
    to: "Chamba",
    vehicleType: "bus",
    departureTime: "06:30",
    price: 700,
    availableSeats: 40,
    vehicleId: "HP01-3456",
    estimatedDuration: 420, // 7 hours
    distance: 380,
    stops: ["Mandi", "Joginder Nagar", "Dharamshala", "Khajjiar"],
    routeType: "Regular",
    busType: "Standard"
  },

  // Manali Region Routes
  {
    from: "Manali",
    to: "Dharamshala",
    vehicleType: "bus",
    departureTime: "02:00", // Early morning departure
    price: 1500,
    availableSeats: 40,
    vehicleId: "HP01-4567",
    estimatedDuration: 1200, // 20 hours
    distance: 479,
    stops: ["Keylong", "Jispa", "Sarchu", "Pang", "Upshi"],
    routeType: "Special",
    busType: "Deluxe"
  },
  {
    from: "Manali",
    to: "Chandigarh",
    vehicleType: "bus",
    departureTime: "07:00",
    price: 850,
    availableSeats: 40,
    vehicleId: "HP01-5678",
    estimatedDuration: 480, // 8 hours
    distance: 310,
    stops: ["Kullu", "Mandi", "Bilaspur", "Kiratpur"],
    routeType: "Regular",
    busType: "Volvo"
  },

  // Dharamshala Region Routes
  {
    from: "Dharamshala",
    to: "Delhi",
    vehicleType: "bus",
    departureTime: "16:30",
    price: 1200,
    availableSeats: 40,
    vehicleId: "HP01-6789",
    estimatedDuration: 720, // 12 hours
    distance: 520,
    stops: ["Kangra", "Una", "Ambala", "Karnal"],
    routeType: "Regular",
    busType: "Volvo AC"
  },
  {
    from: "Dharamshala",
    to: "Dalhousie",
    vehicleType: "bus",
    departureTime: "08:00",
    price: 400,
    availableSeats: 40,
    vehicleId: "HP01-7890",
    estimatedDuration: 240, // 4 hours
    distance: 140,
    stops: ["Kangra", "Nurpur", "Chamba"],
    routeType: "Regular",
    busType: "Deluxe"
  },

  // Kullu Region Routes
  {
    from: "Kullu",
    to: "Manikaran",
    vehicleType: "bus",
    departureTime: "09:00",
    price: 150,
    availableSeats: 35,
    vehicleId: "HP01-8901",
    estimatedDuration: 120, // 2 hours
    distance: 45,
    stops: ["Bhuntar", "Kasol", "Manikaran Sahib"],
    routeType: "Regular",
    busType: "Standard"
  },
  {
    from: "Kullu",
    to: "Shimla",
    vehicleType: "bus",
    departureTime: "07:30",
    price: 750,
    availableSeats: 40,
    vehicleId: "HP01-9012",
    estimatedDuration: 300, // 5 hours
    distance: 247,
    stops: ["Mandi", "Bilaspur", "Shimla"],
    routeType: "Regular",
    busType: "Deluxe"
  },

  // Popular Tourist Circuit Routes
  {
    from: "Shimla",
    to: "Kinnaur",
    vehicleType: "bus",
    departureTime: "05:00",
    price: 900,
    availableSeats: 35,
    vehicleId: "HP02-1234",
    estimatedDuration: 660, // 11 hours
    distance: 350,
    stops: ["Rampur", "Powari", "Reckong Peo", "Kalpa"],
    routeType: "Tourist Special",
    busType: "Deluxe"
  },
  {
    from: "Manali",
    to: "Rohtang Pass",
    vehicleType: "bus",
    departureTime: "08:00",
    price: 300,
    availableSeats: 35,
    vehicleId: "HP02-2345",
    estimatedDuration: 120, // 2 hours
    distance: 51,
    stops: ["Kothi", "Gulaba", "Marhi"],
    routeType: "Tourist Special",
    busType: "Standard"
  },

  // Additional Important Routes
  {
    from: "Shimla",
    to: "Kasauli",
    vehicleType: "bus",
    departureTime: "08:30",
    price: 300,
    availableSeats: 35,
    vehicleId: "HP02-3456",
    estimatedDuration: 180, // 3 hours
    distance: 77,
    stops: ["Kandaghat", "Dharampur"],
    routeType: "Regular",
    busType: "Standard"
  },
  {
    from: "Mandi",
    to: "Kullu",
    vehicleType: "bus",
    departureTime: "Every 30 mins",
    price: 200,
    availableSeats: 40,
    vehicleId: "HP02-4567",
    estimatedDuration: 180, // 3 hours
    distance: 110,
    stops: ["Pandoh", "Bajaura"],
    routeType: "Regular",
    busType: "Standard"
  },

  // Taxi Routes (Premium Options)
  {
    from: "Shimla",
    to: "Manali",
    vehicleType: "taxi",
    departureTime: "Flexible",
    price: 1800,
    availableSeats: 4,
    vehicleId: "TAX-1234",
    estimatedDuration: 420, // 7 hours (more realistic for mountain roads)
    distance: 247,
    stops: [],
    routeType: "Direct",
    busType: "SUV"
  },
  {
    from: "Dharamshala",
    to: "McLeodganj",
    vehicleType: "taxi",
    departureTime: "Flexible",
    price: 500,
    availableSeats: 4,
    vehicleId: "TAX-2345",
    estimatedDuration: 30,
    distance: 9,
    stops: [],
    routeType: "Local",
    busType: "Sedan"  // Changed from vehicleType to busType
  }
];