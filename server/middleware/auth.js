import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(payload.id);

    if (!admin) {
      return res.status(401).json({ message: 'Admin account not found' });
    }

    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
