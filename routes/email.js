const router=require('express').Router();
let Email=require('../models/email.model');
router.route('/').post((req, res) => {
    Email.find()
      .then(emails => res.json(emails))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Email.findById(req.params.id)
      .then(emails => res.json(emails))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const user = req.body.user;
    const usetemplate = req.body.usetemplate;
    const subject = req.body.subject;
    const message = req.body.message;
    const newEmail=new Email({
      user,
      usetemplate,
      subject,
      message
    })
    newEmail.save()
  .then(() => res.json('Email added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Email.findById(req.params.id)
    .then(email => {
      email.user = req.body.user;
      email.usetemplate = req.body.usetemplate;
      email.subject = req.body.subject;
      email.message = req.body.message;
      email.save()
        .then(() => res.json('Email updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Email.findByIdAndDelete(req.params.id)
    .then(() => res.json('Email deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Email.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;