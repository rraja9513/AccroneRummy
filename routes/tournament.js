const router=require('express').Router();
let Tournament=require('../models/tournament.model');
router.route('/').post((req, res) => {
    Tournament.find()
      .then(tournaments => res.json(tournaments))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Tournament.findById(req.params.id)
      .then(tournaments => res.json(tournaments))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const title = req.body.title;
    const price = req.body.price;
    const startdate=req.body.startdate;
    const registrationstartdate=req.body.registrationstartdate;
    const registrationstarttime=req.body.registrationstarttime;
    const registrationenddate=req.body.registrationenddate;
    const registrationendtime=req.body.registrationendtime;
    const entryfee=req.body.entryfee;
    const numberofplayers=req.body.numberofplayers;
    const description=req.body.description;
    const pricedistribution=[
        {
            position:req.body.position,
            pprice:req.body.pprice,
            pnumberofplayers:req.body.pnumberofplayers
        }
    ];
    const newTournament=new Tournament({
      title,
      price,
      startdate,
      registrationstartdate,
      registrationstarttime,
      registrationenddate,
      registrationendtime,
      entryfee,
      numberofplayers,
      description,
      pricedistribution
    })
    newTournament.save()
  .then(() => res.json('Tournament added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Tournament.findById(req.params.id)
    .then(tournament => {
      tournament.title = req.body.title;
      tournament.price = req.body.price;
      tournament.startdate = req.body.startdate;
      tournament.registrationstartdate =req.body.registrationstartdate;
      tournament.registrationstarttime=req.body.registrationstarttime;
      tournament.registrationenddate=req.body.registrationenddate;
      tournament.registrationendtime=req.body.registrationendtime;
      tournament.entryfee=req.body.entryfee;
      tournament.numberofplayers=req.body.numberofplayers;
      tournament.description=req.body.description;
      tournament.pricedistribution=[
          {
            position:req.body.position,
            pprice:req.body.pprice,
            pnumberofplayers:req.body.pnumberofplayers
          }
      ]
      tournament.save()
        .then(() => res.json('Tournament updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Tournament.findByIdAndDelete(req.params.id)
    .then(() => res.json('Tournament deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Tournament.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;