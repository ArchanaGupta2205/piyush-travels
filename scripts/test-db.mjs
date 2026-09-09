import mongoose from 'mongoose';
import dns from 'node:dns';
import fs from 'node:fs';
import path from 'node:path';

// Set public DNS fallback if local ISP fails on SRV records
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Load .env.local manually if not present in process.env
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

console.log('--------------------------------------------------');
console.log('Testing MongoDB Atlas Connection');
console.log('--------------------------------------------------');

if (!rawUri) {
  console.error('❌ ERROR: MONGODB_URI not found in .env.local');
  process.exit(1);
}

// Clean URI
const uri = rawUri.trim();
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log('Connecting to:', maskedUri);

try {
  const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log('✅ SUCCESS: Connected to MongoDB successfully!');
  console.log('Database Name:', conn.connection.name || 'default');
  console.log('Connection Host:', conn.connection.host);
  await mongoose.disconnect();
  console.log('--------------------------------------------------');
  process.exit(0);
} catch (err) {
  console.error('\n❌ FAILED TO CONNECT TO MONGODB:');
  console.error(err.message || err);
  console.log('--------------------------------------------------');
  process.exit(1);
}
