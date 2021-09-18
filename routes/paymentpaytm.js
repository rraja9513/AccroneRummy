const router=require('express').Router();
let Paymentpaytm=require('../models/paymentpaytm.model');
router.route('/').post((req, res) => {
    Paymentpaytm.find()
      .then(paymentpaytms => res.json(paymentpaytms))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Paymentpaytm.findById(req.params.id)
      .then(paymentpaytms => res.json(paymentpaytms))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const merchantid = req.body.merchantid;
    const merchantkey = req.body.merchantkey;
    const mode = req.body.mode;
    const status = req.body.status;
    const newPaymentpaytm=new Paymentpaytm({
     merchantid,
     merchantkey,
     mode,
     status
    })
    newPaymentpaytm.save()
  .then(() => res.json('Paymentpaytm added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Paymentpaytm.findById(req.params.id)
    .then(paymentpaytm => {
      paymentpaytm.merchantid = req.body.merchantid;
      paymentpaytm.merchantkey = req.body.merchantkey;
      paymentpaytm.mode = req.body.mode;
      paymentpaytm.status = req.body.status;
      paymentpaytm.save()
        .then(() => res.json('Paymentpaytm updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Paymentpaytm.findByIdAndDelete(req.params.id)
    .then(() => res.json('Paymentpaytm deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Paymentpaytm.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;