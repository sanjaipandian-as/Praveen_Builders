const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../config/config.env') });

const connectDatabase = require('../config/database');
const User = require('../models/userModel');

async function ensureAdminUser({ resetPassword } = { resetPassword: true }) {
  const name = process.env.ADMIN_NAME || 'Admin';
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  const existing = await User.findOne({ email }).select('+password');

  if (!existing) {
    await User.create({
      name,
      email,
      password,
      role: 'admin',
    });
    console.log(`✅ Admin user created: ${email}`);
    return;
  }

  existing.name = name;
  existing.role = 'admin';
  if (resetPassword) existing.password = password;

  await existing.save();
  console.log(
    `✅ Admin user updated: ${email}${resetPassword ? ' (password reset)' : ''}`
  );
}

async function run() {
  connectDatabase();

  try {
    const args = new Set(process.argv.slice(2));
    const resetPassword = !args.has('--no-reset');

    await ensureAdminUser({ resetPassword });
  } catch (err) {
    console.error('❌ Seeder failed:', err);
    process.exitCode = 1;
  } finally {
    // allow pending logs to flush
    setTimeout(() => process.exit(), 0);
  }
}

run();

