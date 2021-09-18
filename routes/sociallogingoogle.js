const router=require('express').Router();
let Sociallogingoogle=require('../models/sociallogingoogle.model');
router.route('/').post((req, res) => {
    Sociallogingoogle.find()
      .then(sociallogingoogles => res.json(sociallogingoogles))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Sociallogingoogle.findById(req.params.id)
      .then(sociallogingoogles => res.json(sociallogingoogles))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const socialloginid = req.body.socialloginid;
    const status = req.body.status;
    const newSociallogingoogle=new Sociallogingoogle({
     socialloginid,
     status
    })
    newSociallogingoogle.save()
  .then(() => res.json('Sociallogingoogle added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Sociallogingoogle.findById(req.params.id)
    .then(sociallogingoogle => {
      sociallogingoogle.socialloginid = req.body.socialloginid;
      sociallogingoogle.status = req.body.status;
      sociallogingoogle.save()
        .then(() => res.json('Sociallogingoogle updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Sociallogingoogle.findByIdAndDelete(req.params.id)
    .then(() => res.json('Sociallogingoogle deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Sociallogingoogle.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;