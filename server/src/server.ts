import { app } from './app';
import { env } from './config/env';
import { connectDb } from './config/db';
import { User } from './models/User';
import bcrypt from 'bcryptjs';

const start = async () => {
  await connectDb();

  // Seed admin user if missing
  const existing = await User.findOne({ email: env.adminSeed.email.toLowerCase().trim() });
  if (!existing) {
    const hashed = await bcrypt.hash(env.adminSeed.password, 10);
    const adminUser = await User.create({ email: env.adminSeed.email.toLowerCase().trim(), password: hashed, role: 'admin' });
    console.log('[SEED] Admin user created:', { email: adminUser.email, role: adminUser.role });
  } else {
    console.log('[SEED] Admin user exists:', { email: existing.email, role: existing.role });
  }

  app.listen(env.port, () => {
    console.log(`API running on port ${env.port}`);
  });
};

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
