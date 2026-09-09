import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const rawUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!rawUri) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

const uri = rawUri.trim();

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('✅ Connected!');

  const { Vehicle } = await import('../src/lib/server/models/Vehicle.ts');
  const { User } = await import('../src/lib/server/models/User.ts');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'piyushtravels79@gmail.com';
  const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

  const adminPasswordPlain = 'Admin@Piyush2026';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPasswordPlain, salt);

  if (existingAdmin) {
    existingAdmin.role = 'admin';
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();
    console.log(`✅ Updated existing Admin User: ${adminEmail}`);
  } else {
    await User.create({
      name: 'Piyush Travels Admin',
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      phone: '+91 9999999999',
      role: 'admin',
    });
    console.log(`✅ Created Primary Admin User: ${adminEmail}`);
  }
  console.log(`   Admin Credentials: ${adminEmail} / ${adminPasswordPlain}`);

  // 2. Seed Fleet
  const vehicleCount = await Vehicle.countDocuments();
  if (vehicleCount > 0) {
    console.log(`ℹ️ Vehicles already exist in database (${vehicleCount} found). Keeping existing fleet.`);
  } else {
    console.log('Seeding initial luxury fleet into database...');

    const initialFleet = [
      {
        name: 'Mercedes-Benz S-Class',
        brand: 'Mercedes-Benz',
        type: 'Luxury',
        ratePerHour: 1800,
        ratePerKm: 65,
        minHours: 8,
        pricePerDay: 18000,
        priceOnRequest: false,
        seats: 4,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        ac: true,
        driverIncluded: true,
        rating: 4.9,
        location: 'Delhi NCR',
        images: [
          'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop',
        ],
      },
      {
        name: 'Toyota Innova Crysta',
        brand: 'Toyota',
        type: 'SUV',
        ratePerHour: 350,
        ratePerKm: 18,
        minHours: 8,
        pricePerDay: 3500,
        priceOnRequest: false,
        seats: 7,
        fuelType: 'Diesel',
        transmission: 'Manual',
        ac: true,
        driverIncluded: true,
        rating: 4.8,
        location: 'Delhi NCR',
        images: [
          'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop',
        ],
      },
      {
        name: 'Toyota Innova Hycross Hybrid',
        brand: 'Toyota',
        type: 'SUV',
        ratePerHour: 450,
        ratePerKm: 22,
        minHours: 8,
        pricePerDay: 4500,
        priceOnRequest: false,
        seats: 7,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        ac: true,
        driverIncluded: true,
        rating: 4.9,
        location: 'Delhi NCR',
        images: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop',
        ],
      },
      {
        name: 'Volvo B11R Luxury Coach',
        brand: 'Volvo',
        type: 'Luxury Bus',
        ratePerHour: 2800,
        ratePerKm: 85,
        minHours: 10,
        pricePerDay: 28000,
        priceOnRequest: true,
        seats: 54,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        ac: true,
        driverIncluded: true,
        rating: 4.9,
        location: 'Delhi NCR',
        images: [
          'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
        ],
      },
      {
        name: '12-Seater Luxury Maharaja Tempo Traveller',
        brand: 'Force Motors',
        type: 'Minibus',
        ratePerHour: 600,
        ratePerKm: 26,
        minHours: 8,
        pricePerDay: 6000,
        priceOnRequest: false,
        seats: 12,
        fuelType: 'Diesel',
        transmission: 'Manual',
        ac: true,
        driverIncluded: true,
        rating: 4.9,
        location: 'Delhi NCR',
        images: [
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2072&auto=format&fit=crop',
        ],
      },
      {
        name: '26-Seater Executive Tempo Traveller',
        brand: 'Force Motors',
        type: 'Minibus',
        ratePerHour: 850,
        ratePerKm: 34,
        minHours: 8,
        pricePerDay: 8500,
        priceOnRequest: false,
        seats: 26,
        fuelType: 'Diesel',
        transmission: 'Manual',
        ac: true,
        driverIncluded: true,
        rating: 4.8,
        location: 'Delhi NCR',
        images: [
          'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2072&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
        ],
      },
      {
        name: 'BMW 7 Series M-Sport',
        brand: 'BMW',
        type: 'Luxury',
        ratePerHour: 1900,
        ratePerKm: 70,
        minHours: 8,
        pricePerDay: 19000,
        priceOnRequest: false,
        seats: 4,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        ac: true,
        driverIncluded: true,
        rating: 4.9,
        location: 'Delhi NCR',
        images: [
          'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop',
        ],
      },
      {
        name: 'Audi A6 Matrix Edition',
        brand: 'Audi',
        type: 'Sedan',
        ratePerHour: 1200,
        ratePerKm: 50,
        minHours: 8,
        pricePerDay: 12000,
        priceOnRequest: false,
        seats: 4,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        ac: true,
        driverIncluded: true,
        rating: 4.8,
        location: 'Delhi NCR',
        images: [
          'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
        ],
      },
    ];

    const created = await Vehicle.insertMany(initialFleet);
    console.log(`✅ Successfully seeded ${created.length} vehicles into database!`);
  }

  await mongoose.disconnect();
  console.log('Seeding completed successfully.');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
