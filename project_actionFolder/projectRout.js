const express = require("express");
const db = require("../data/helpers/projectModel");
const {  validatePro } = require("../middleware/projMidd");
const router = express.Router();

router.get("/", (req, res) => {
  
 db.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      next(error);
    });
});


router.get("/:id", (req, res) => {
  db.get(req.params.id)
      .then(project => {
          res.status(200).json(project);
      })
      .catch((error) => {
        next(error)
      })
});


router.get("/:id", (req, res) => {
  res.status(200).json(req.user);
});

router.post('/',validatePro(),(req, res) => {
  
    db.insert(req.body)
    .then((newProject)=>{
      res.status(201).json(newProject)
      
    })
    .catch((error) => {
      next(error)
    })
  });

router.put('/:id', validatePro(),(req, res) => {
  
   db.update(req.params.id, req.body)
    .then((update)=>{
      if(update){
        res.status(200).json({ message: "Project has been updated"})
      }else {
        res.status(404).json({
          message: "Can not update",
        })
      }
    })
    .catch((error) => {
      next(error)
    })
  
  });

  router.delete('/:id',(req, res) => {
   db.remove(req.params.id)
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
  router.get('/:id',(req, res) => {
   db.getProjectActions(req.params.id)
  .then(action=>{
    res.status(200).json(action)
   
  })
  .catch((error) => {
    next(error)
  })

});

module.exports = router;
