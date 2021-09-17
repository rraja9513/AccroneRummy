const router=require('express').Router();
let Coupon=require('../models/coupon.model');
router.route('/').post((req, res) => {
    Coupon.find()
      .then(coupons => res.json(coupons))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Coupon.findById(req.params.id)
      .then(coupons => res.json(coupons))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const coupontitle = req.body.coupontitle;
    const couponcode = req.body.couponcode;
    const validfromdate=req.body.validfromdate;
    const validtodate=req.body.validtodate;
    const bonustype=req.body.bonustype;
    const bonusvalue=req.body.bonusvalue;
    const maxprice=req.body.maxprice;
    const newCoupon=new Coupon({
      coupontitle,
      couponcode,
      validfromdate,
      validtodate,
      bonustype,
      bonusvalue,
      maxprice
    })
    newCoupon.save()
  .then(() => res.json('Coupon added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Coupon.findById(req.params.id)
    .then(coupon => {
      coupon.coupontitle = req.body.coupontitle;
      coupon.couponcode = req.body.couponcode;
      coupon.validfromdate = req.body.validfromdate;
      coupon.validtodate =req.body.validtodate;
      coupon.bonustype=req.body.bonustype;
      coupon.bonusvalue=req.body.bonusvalue;
      coupon.maxprice=req.body.maxprice;
      coupon.save()
        .then(() => res.json('Coupon updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Coupon.findByIdAndDelete(req.params.id)
    .then(() => res.json('Coupon deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Coupon.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;