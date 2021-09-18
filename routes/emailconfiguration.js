const router=require('express').Router();
let Emailconfiguration=require('../models/emailconfiguration.model');
router.route('/').post((req, res) => {
    Emailconfiguration.find()
      .then(emailconfigurations => res.json(emailconfigurations))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Emailconfiguration.findById(req.params.id)
      .then(emailconfigurations => res.json(emailconfigurations))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const senderemail = req.body.senderemail;
    const fromname = req.body.fromname;
    const smtphost = req.body.smtphost;
    const typeofencryption = req.body.typeofencryption;
    const smtpport = req.body.smtpport;
    const smtpauthentication = req.body.smtpauthentication;
    const smtpusername = req.body.smtpusername;
    const smtppassword = req.body.smtppassword;
    const to = req.body.to;
    const newEmailconfiguration=new Emailconfiguration({
        senderemail,
        fromname,
        smtphost,
        typeofencryption,
        smtpport,
        smtpauthentication,
        smtpusername,
        smtppassword,
        to
    })
    newEmailconfiguration.save()
  .then(() => res.json('Emailconfiguration added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Emailconfiguration.findById(req.params.id)
    .then(emailconfiguration => {
      emailconfiguration.senderemail = req.body.senderemail;
      emailconfiguration.fromname = req.body.fromname;
      emailconfiguration.smtphost = req.body.smtphost;
      emailconfiguration.typeofencryption = req.body.typeofencryption;
      emailconfiguration.smtpport = req.body.smtpport;
      emailconfiguration.smtpauthentication = req.body.smtpauthentication;
      emailconfiguration.smtpusername = req.body.smtpusername;
      emailconfiguration.smtppassword = req.body.smtppassword;
      emailconfiguration.to = req.body.to;
      emailconfiguration.save()
        .then(() => res.json('Emailconfiguration updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Emailconfiguration.findByIdAndDelete(req.params.id)
    .then(() => res.json('Emailconfiguration deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Emailconfiguration.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;