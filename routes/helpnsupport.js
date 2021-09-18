const router=require('express').Router();
let Helpnsupport=require('../models/helpnsupport.model');
router.route('/').post((req, res) => {
    Helpnsupport.find()
      .then(helpnsupports => res.json(helpnsupports))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Helpnsupport.findById(req.params.id)
      .then(helpnsupports => res.json(helpnsupports))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const subject = req.body.subject;
    const message = req.body.message;
    const newHelpnsupport=new Helpnsupport({
        subject,
        message
    })
    newHelpnsupport.save()
  .then(() => res.json('Helpnsupport added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Helpnsupport.findById(req.params.id)
    .then(helpnsupport => {
      helpnsupport.subject = req.body.subject;
      helpnsupport.message = req.body.message;
      helpnsupport.save()
        .then(() => res.json('Helpnsupport updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Helpnsupport.findByIdAndDelete(req.params.id)
    .then(() => res.json('Helpnsupport deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Helpnsupport.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;