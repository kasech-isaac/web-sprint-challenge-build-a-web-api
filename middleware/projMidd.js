const proj_db = require("../data/helpers/projectModel");
// const action_db = require("../data/helpers/actionModel");

function validatePro() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "Missing data",
      });
    } else if (!req.body.name || !req.body.description) {
      res.status(400).json({
        message: "Missing user name or description",
      });
    } else {
      next();
    }
  };
}

module.exports = {
  validatePro,
};
