import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

function createToken(admin) {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = createToken(admin);

  res.json({
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email
    }
  });
}

export async function me(req, res) {
  res.json({
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email
    }
  });
}

export function logout(_req, res) {
  res.json({ message: 'Logged out' });
}
