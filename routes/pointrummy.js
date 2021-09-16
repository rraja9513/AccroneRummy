const router=require('express').Router();
let Pointrummy=require('../models/pointrummy.model');
router.route('/').post((req, res) => {
    Pointrummy.find()
      .then(pointrummys => res.json(pointrummys))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Pointrummy.findById(req.params.id)
      .then(pointrummys => res.json(pointrummys))
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
    const newPointrummy=new Pointrummy({
       game,
       gametype,
       tablename,
       tablenumber,
       bet,
       valuepoints,
       sittingcapacity,
       tablestatus
    })
    newPointrummy.save()
  .then(() => res.json('Pointrummy added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Pointrummy.findById(req.params.id)
    .then(pointrummy => {
      pointrummy.game = req.body.game;
      pointrummy.gametype = req.body.gametype;
      pointrummy.tablename = req.body.tablename;
      pointrummy.tablenumber =req.body.tablenumber;
      pointrummy.bet=req.body.bet;
      pointrummy.valuepoints=req.body.valuepoints;
      pointrummy.sittingcapacity=req.body.sittingcapacity;
      pointrummy.tablestatus=req.body.tablestatus;
      pointrummy.save()
        .then(() => res.json('Pointrummy updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Pointrummy.findByIdAndDelete(req.params.id)
    .then(() => res.json('Pointrummy deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Pointrummy.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;