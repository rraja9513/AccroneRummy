const router=require('express').Router();
let Referalcommission=require('../models/referalcommission.model');
router.route('/').post((req, res) => {
    Referalcommission.find()
      .then(referalcommissions => res.json(referalcommissions))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Referalcommission.findById(req.params.id)
      .then(referalcommissions => res.json(referalcommissions))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const selectuser = req.body.selectuser;
    const onlostamountcommission = req.body.onlostamountcommission;
    const onwonamountcommission = req.body.onwonamountcommission;
    const newReferalcommission=new Referalcommission({
      selectuser,
      onlostamountcommission,
      onwonamountcommission
    })
    newReferalcommission.save()
  .then(() => res.json('Referalcommission added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Referalcommission.findById(req.params.id)
    .then(referalcommission => {
      referalcommission.selectuser = req.body.selectuser;
      referalcommission.onlostamountcommission = req.body.onlostamountcommission;
      referalcommission.onwonamountcommission = req.body.onwonamountcommission;
      referalcommission.save()
        .then(() => res.json('Referalcommission updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Referalcommission.findByIdAndDelete(req.params.id)
    .then(() => res.json('Referalcommission deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Referalcommission.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;