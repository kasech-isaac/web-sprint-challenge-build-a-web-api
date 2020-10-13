const express = require("express");
const action_db = require("../data/helpers/actionModel");
const { validateAction, validateUser } = require("../middleware/actionAndProj");
const router = express.Router();

router.get("/", (req, res) => {
  
    action_db.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      next(error);
    });
});



router.post("/",validateAction(),(req, res) => {
action_db.insert(req.body)
  .then((newAction)=>{
      res.status(200).json(newAction)
  })
  .catch((error)=>{
      next(error)
  })
})

router.put('/:id',validateAction(),(req, res) => {
    action_db.update(req.params.id, req.body)
    .then((updateAction)=>{
      if(updateAction){
        res.status(200).json({message:"Action has been updated"})
      }else {
        res.status(404).json({
          message: "Can't update",
        })
      }
    })
    .catch((error) => {
      next(error)
    })
  
  });

  router.delete('/:id',(req, res) => {
    action_db.remove(req.params.id)
  .then ((removed)=>{
    if (removed > 0){
     res.status(200).json({message: "it's been deleted"})
    }else{
      res.status(404).json({
        message: "Sorry could not be found",
      })
    }
  })
  .catch((error) => {
    next(error)
  })
  
  });


module.exports = router;
