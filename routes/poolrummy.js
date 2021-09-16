const router=require('express').Router();
let Poolrummy=require('../models/poolrummy.model');
router.route('/').post((req, res) => {
    Poolrummy.find()
      .then(poolrummys => res.json(poolrummys))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Poolrummy.findById(req.params.id)
      .then(poolrummys => res.json(poolrummys))
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
    const newPoolrummy=new Poolrummy({
       game,
       gametype,
       tablename,
       tablenumber,
       bet,
       valuepoints,
       sittingcapacity,
       tablestatus
    })
    newPoolrummy.save()
  .then(() => res.json('Poolrummy added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Poolrummy.findById(req.params.id)
    .then(poolrummy => {
      poolrummy.game = req.body.game;
      poolrummy.gametype = req.body.gametype;
      poolrummy.tablename = req.body.tablename;
      poolrummy.tablenumber =req.body.tablenumber;
      poolrummy.bet=req.body.bet;
      poolrummy.valuepoints=req.body.valuepoints;
      poolrummy.sittingcapacity=req.body.sittingcapacity;
      poolrummy.tablestatus=req.body.tablestatus;
      poolrummy.save()
        .then(() => res.json('Poolrummy updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Poolrummy.findByIdAndDelete(req.params.id)
    .then(() => res.json('Poolrummy deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Poolrummy.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;