const proj_db = require("../data/helpers/projectModel");
const action_db = require("../data/helpers/actionModel");

function validateUserId() {
  return (req, res, next) => {
    action_db
      .get(req.params.id)
      .then((user) => {
        if (user) {
    
          req.user = user;
          next();
        } else {
          res.status(400).json({ message: "Invalid user ID" });
        }
      })
      .catch((error) => {
        next(error);
      });
  };
}

function validateUser(){
    return (req, res, next)=>{
        if (!req.body.name ||!req.body.description) {
            res.status(400).json({
                message: "Missing user name or description",
            })
        }
        next()
    }
}

module.exports={
    validateUser,
    validateUserId,
}