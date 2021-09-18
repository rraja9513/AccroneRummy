const router=require('express').Router();
let Socialloginfacebook=require('../models/socialloginfacebook.model');
router.route('/').post((req, res) => {
    Socialloginfacebook.find()
      .then(socialloginfacebooks => res.json(socialloginfacebooks))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Socialloginfacebook.findById(req.params.id)
      .then(socialloginfacebooks => res.json(socialloginfacebooks))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const socialloginid = req.body.socialloginid;
    const version = req.body.version;
    const status = req.body.status;
    const newSocialloginfacebook=new Socialloginfacebook({
     socialloginid,
     version,
     status
    })
    newSocialloginfacebook.save()
  .then(() => res.json('Socialloginfacebook added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Socialloginfacebook.findById(req.params.id)
    .then(socialloginfacebook => {
      socialloginfacebook.socialloginid = req.body.socialloginid;
      socialloginfacebook.version = req.body.version;
      socialloginfacebook.status = req.body.status;
      socialloginfacebook.save()
        .then(() => res.json('Socialloginfacebook updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Socialloginfacebook.findByIdAndDelete(req.params.id)
    .then(() => res.json('Socialloginfacebook deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Socialloginfacebook.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;