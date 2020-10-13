const proj_db = require("../data/helpers/projectModel");
// const action_db = require("../data/helpers/actionModel");

function validateProId() {
  return (req, res, next) => {
    proj_db.get(req.params.id)
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

function validateproj(){
    return (req, res, next)=>{
        if (!req.body.project_id ||!req.body.description) {
            res.status(400).json({
                message: "Missing user name or description",
            })
        }
        next()
    }
}

module.exports={
    validateproj,
    validateProId,

   

}