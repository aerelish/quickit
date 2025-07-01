import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  // get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // if no token is provided, return an error
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  };

  try {
    // verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // attach user information to the request object
    req.userId = decoded.id;
    
    // call the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  };
};

export default authMiddleware;