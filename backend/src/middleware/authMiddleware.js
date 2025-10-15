import jwt from 'jsonwebtoken';

export const authRequired = (roles = []) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;
      if (!token) return res.status(401).json({ message: 'Unauthorized' });

      const payload = jwt.verify(token, process.env.JWT_SECRET || '');
      req.user = payload;

      if (allowedRoles.length && !allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};


