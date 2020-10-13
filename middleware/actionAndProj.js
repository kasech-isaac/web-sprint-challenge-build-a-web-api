const proj_db = require("../data/helpers/projectModel");
const action_db = require("../data/helpers/actionModel");

function validateAction() {
  return (req, res, next) => {
    // action_db.get(req.params.id)
     
        if(!req.body){
          res.status(400).json({ message: "Please add data" }); 
      } else if(!req.body.project_id || !req.body.notes || !req.body.description){
          res.status(400).json({ message: "Please add required field" }); 
      } else if(req.body.description.length > 160){
          res.status(403).json({ message: " Description can not be more than  160 characters" }); 
      } else {
          next(); 
      }
  };
}


module.exports={
  
    validateAction
}