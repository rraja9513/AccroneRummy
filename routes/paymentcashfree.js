const router=require('express').Router();
let Paymentcashfree=require('../models/paymentcashfree.model');
router.route('/').post((req, res) => {
    Paymentcashfree.find()
      .then(paymentcashfrees => res.json(paymentcashfrees))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Paymentcashfree.findById(req.params.id)
      .then(paymentcashfrees => res.json(paymentcashfrees))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const clientid = req.body.clientid;
    const clientsecretkey = req.body.clientsecretkey;
    const mode = req.body.mode;
    const status = req.body.status;
    const newPaymentcashfree=new Paymentcashfree({
     clientid,
     clientsecretkey,
     mode,
     status
    })
    newPaymentcashfree.save()
  .then(() => res.json('Paymentcashfree added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Paymentcashfree.findById(req.params.id)
    .then(paymentcashfree => {
      paymentcashfree.clientid = req.body.clientid;
      paymentcashfree.clientsecretkey = req.body.clientsecretkey;
      paymentcashfree.mode = req.body.mode;
      paymentcashfree.status = req.body.status;
      paymentcashfree.save()
        .then(() => res.json('Paymentcashfree updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Paymentcashfree.findByIdAndDelete(req.params.id)
    .then(() => res.json('Paymentcashfree deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Paymentcashfree.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;