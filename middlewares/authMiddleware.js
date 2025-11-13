// middlewares/authMiddleware.js
module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated && req.isAuthenticated()) return next();
      req.flash('error', 'Please login');
      return res.redirect('/auth/login');
    },
    ensureRole: (roles = []) => (req, res, next) => {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        req.flash('error', 'Please login');
        return res.redirect('/auth/login');
      }
      const role = req.user && req.user.role;
      if (typeof roles === 'string') roles = [roles];
      if (!roles.length || roles.includes(role)) return next();
      req.flash('error', 'No permission');
      return res.redirect('/');
    }
  };

  