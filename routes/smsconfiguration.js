const router=require('express').Router();
let Smsconfiguration=require('../models/smsconfiguration.model');
router.route('/').post((req, res) => {
    Smsconfiguration.find()
      .then(smsconfigurations => res.json(smsconfigurations))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Smsconfiguration.findById(req.params.id)
      .then(smsconfigurations => res.json(smsconfigurations))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const senderid = req.body.senderid;
    const authenticationkey = req.body.authenticationkey;
    const mobilenumber = req.body.mobilenumber;
    const newSmsconfiguration=new Smsconfiguration({
     senderid,
     authenticationkey,
     mobilenumber
    })
    newSmsconfiguration.save()
  .then(() => res.json('Smsconfiguration added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Smsconfiguration.findById(req.params.id)
    .then(smsconfiguration => {
      smsconfiguration.senderid = req.body.senderid;
      smsconfiguration.authenticationkey = req.body.authenticationkey;
      smsconfiguration.mobilenumber = req.body.mobilenumber;
      smsconfiguration.save()
        .then(() => res.json('Smsconfiguration updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Smsconfiguration.findByIdAndDelete(req.params.id)
    .then(() => res.json('Smsconfiguration deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Smsconfiguration.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;