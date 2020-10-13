const express = require("express");
const db = require("../data/helpers/projectModel");
const { validateProId, validateproj } = require("../middleware/projMidd");
const router = express.Router();

router.get("/", (req, res) => {
  
 db.get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateProId(), (req, res) => {
  res.status(200).json(req.user);
});

router.post('/',(req, res) => {
    if (!req.body.name || !req.body.description) {
		return res.status(400).json({
			message: "Missing user name or email",
		})
	}
    db.insert(req.body)
    .then((newUser)=>{
      res.status(201).json(newUser)
      
    })
    .catch((error) => {
      next(error)
    })
  });

router.put('/:id',validateproj(), validateProId(),(req, res) => {
    // do your magic!
   db.update(req.params.id, req.body.description)
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
  router.post('/:id/posts',(req, res) => {
    if (!req.body.description){
        return res.status(400).json({
        message:"Need a description value."
         })
         }
   db.getProjectActions(req.params.id)
  .then(post=>{
    res.status(200).json(post)
   
  })
  .catch((error) => {
    next(error)
  })

});

module.exports = router;
