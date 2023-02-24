module.exports = {
  accessControl: (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  },
};
