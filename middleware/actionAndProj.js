const proj_db = require("../data/helpers/projectModel");
const action_db = require("../data/helpers/actionModel");

function validateUserId() {
  return (req, res, next) => {
    action_db
      .get(req.params.id)
      .then((user) => {
        if (user) {
          // attach "user data the request so we could access it inmidw func"
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
        if (!req.body.name || !req.body.project_id) {
            return res.status(400).json({
                message: "Missing user name or email",
            })
        }
        next()
    }
}

module.exports={
    validateUser,
    validateUserId,
    // validatePost
}