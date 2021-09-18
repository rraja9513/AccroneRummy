const router=require('express').Router();
let Sms=require('../models/sms.model');
router.route('/').post((req, res) => {
    Sms.find()
      .then(smss => res.json(smss))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Sms.findById(req.params.id)
      .then(smss => res.json(smss))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const player = req.body.player;
    const usetemplate = req.body.usetemplate;
    const message = req.body.message;
    const newSms=new Sms({
      player,
      usetemplate,
      message
    })
    newSms.save()
  .then(() => res.json('Sms added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Sms.findById(req.params.id)
    .then(sms => {
      sms.player = req.body.player;
      sms.usetemplate = req.body.usetemplate;
      sms.message = req.body.message;
      sms.save()
        .then(() => res.json('Sms updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Sms.findByIdAndDelete(req.params.id)
    .then(() => res.json('Sms deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Sms.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;