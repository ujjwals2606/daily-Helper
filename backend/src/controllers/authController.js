import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateOtp } from '../utils/otp.js';
import { sendOtpEmail } from '../utils/mailer.js';

const signToken = (user) => {
  const payload = { id: user._id, role: user.role, email: user.email, name: user.name };
  return jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '7d' });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const otp = generateOtp();
  const user = await User.create({ name, email, password: hashed, role: role === 'seeker' ? 'seeker' : 'user', otp, verified: false });
  try {
    await sendOtpEmail({ to: email, otp });
  } catch (e) {
    // Continue even if email fails (for local dev), OTP stored in DB
    console.warn('Failed to send OTP email:', e.message);
  }
  return res.status(201).json({ message: 'Registered. Verify OTP sent to email.', userId: user._id });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.verified) return res.json({ message: 'Already verified' });
  if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
  user.verified = true;
  user.otp = undefined;
  await user.save();
  const token = signToken(user);
  return res.json({ message: 'Verified', token, user: { id: user._id, role: user.role, name: user.name, email: user.email } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

  // Admin fixed credentials
  if (email === 'smartujjwalsingh47@gmail.com' && password === '12345') {
    let admin = await User.findOne({ email });
    if (!admin) {
      admin = await User.create({ name: 'Admin', email, role: 'admin', verified: true, password: await bcrypt.hash(password, 10) });
    }
    const token = signToken(admin);
    return res.json({ token, user: { id: admin._id, role: 'admin', name: admin.name, email: admin.email } });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password || '');
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  if (!user.verified) return res.status(403).json({ message: 'Please verify OTP' });
  const token = signToken(user);
  return res.json({ token, user: { id: user._id, role: user.role, name: user.name, email: user.email } });
};

export const googleCallback = async (req, res) => {
  try {
    const profile = req.user;
    const email = profile?.emails?.[0]?.value;
    const name = profile?.displayName || 'Google User';
    const googleId = profile?.id;
    if (!email) return res.status(400).send('Google profile missing email');
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, role: 'user', verified: true, googleId });
    } else if (!user.googleId) {
      user.googleId = googleId;
      user.verified = true;
      await user.save();
    }
    const token = signToken(user);
    const redirectUrl = `${process.env.CLIENT_URL}/login?token=${encodeURIComponent(token)}`;
    return res.redirect(redirectUrl);
  } catch (e) {
    return res.status(500).send('Google OAuth failed');
  }
};


