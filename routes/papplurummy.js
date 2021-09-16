const router=require('express').Router();
let Papplurummy=require('../models/papplurummy.model');
router.route('/').post((req, res) => {
    Papplurummy.find()
      .then(papplurummys => res.json(papplurummys))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Papplurummy.findById(req.params.id)
      .then(papplurummys => res.json(papplurummys))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const game = req.body.game;
    const gametype = req.body.gametype;
    const tablename=req.body.tablename;
    const tablenumber=req.body.tablenumber;
    const bet=req.body.bet;
    const valuepoints=req.body.valuepoints;
    const sittingcapacity=req.body.sittingcapacity;
    const tablestatus=req.body.tablestatus;
    const newPapplurummy=new Papplurummy({
       game,
       gametype,
       tablename,
       tablenumber,
       bet,
       valuepoints,
       sittingcapacity,
       tablestatus
    })
    newPapplurummy.save()
  .then(() => res.json('Papplurummy added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Papplurummy.findById(req.params.id)
    .then(papplurummy => {
      papplurummy.game = req.body.game;
      papplurummy.gametype = req.body.gametype;
      papplurummy.tablename = req.body.tablename;
      papplurummy.tablenumber =req.body.tablenumber;
      papplurummy.bet=req.body.bet;
      papplurummy.valuepoints=req.body.valuepoints;
      papplurummy.sittingcapacity=req.body.sittingcapacity;
      papplurummy.tablestatus=req.body.tablestatus;
      papplurummy.save()
        .then(() => res.json('Papplurummy updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Papplurummy.findByIdAndDelete(req.params.id)
    .then(() => res.json('Papplurummy deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Papplurummy.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;