const router=require('express').Router();
let Commission=require('../models/commission.model');
router.route('/').post((req, res) => {
    Commission.find()
      .then(commissions => res.json(commissions))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Commission.findById(req.params.id)
      .then(commissions => res.json(commissions))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const commission = req.body.commission;
    const newCommission=new Commission({
      commission
    })
    newCommission.save()
  .then(() => res.json('Commission added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Commission.findById(req.params.id)
    .then(commission => {
      commission.commission = req.body.commission;
      commission.save()
        .then(() => res.json('Commission updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Commission.findByIdAndDelete(req.params.id)
    .then(() => res.json('Commission deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Commission.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;