const express = require("express");
const action_db = require("../data/helpers/actionModel");
const { validateUserId, validateUser } = require("../middleware/actionAndProj");
const router = express.Router();

router.get("/", (req, res) => {
  
    action_db.get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateUserId(), (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateUser(), (req, res) => {
    action_db.insert(req.body)
    .then((add) => {
      res.status(201).json(add);
    })
    .catch((error) => {
      next(error);
    });
});

router.put('/:id',validateUser(), validateUserId(),(req, res) => {
    // do your magic!
    action_db.update(req.params.id, req.body.description)
    .then((update)=>{
      if(update){
        res.status(200).json(update)
      }else {
        res.status(404).json({
          message: "Can't find the user",
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
