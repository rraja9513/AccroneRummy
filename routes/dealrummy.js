const router=require('express').Router();
let Dealrummy=require('../models/dealrummy.model');
router.route('/').post((req, res) => {
    Dealrummy.find()
      .then(dealrummys => res.json(dealrummys))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Dealrummy.findById(req.params.id)
      .then(dealrummys => res.json(dealrummys))
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
    const newDealrummy=new Dealrummy({
       game,
       gametype,
       tablename,
       tablenumber,
       bet,
       valuepoints,
       sittingcapacity,
       tablestatus
    })
    newDealrummy.save()
  .then(() => res.json('Dealrummy added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Dealrummy.findById(req.params.id)
    .then(dealrummy => {
      dealrummy.game = req.body.game;
      dealrummy.gametype = req.body.gametype;
      dealrummy.tablename = req.body.tablename;
      dealrummy.tablenumber =req.body.tablenumber;
      dealrummy.bet=req.body.bet;
      dealrummy.valuepoints=req.body.valuepoints;
      dealrummy.sittingcapacity=req.body.sittingcapacity;
      dealrummy.tablestatus=req.body.tablestatus;
      dealrummy.save()
        .then(() => res.json('Dealrummy updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Dealrummy.findByIdAndDelete(req.params.id)
    .then(() => res.json('Dealrummy deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Dealrummy.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;