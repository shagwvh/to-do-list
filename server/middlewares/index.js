const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Token has expired, try to refresh;
        console.log(req.headers)
        const refreshToken = req.headers['refreshtoken'];

        if (!refreshToken) {
          return res.status(401).json({ message: 'Refresh token not provided' });
        }

        jwt.verify(refreshToken, 'refresh_secret_key', (refreshErr, refreshDecoded) => {
          if (refreshErr) {
            return res.status(401).json({ message: 'Invalid refresh token' });
          }

          // If refresh token is valid, generate a new access token
          const newAccessToken = jwt.sign({ id: refreshDecoded.id }, 'secret_key', { expiresIn: '1h' });

          // Attach the new access token to the response headers
          res.set('New-Access-Token', newAccessToken);

          // Continue with the request
          req.userId = refreshDecoded.id;
          next();
        });
      } else {
        // Token is invalid for some other reason
        return res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      // Token is valid
      req.userId = decoded.id;
      next();
    }
  });
};
