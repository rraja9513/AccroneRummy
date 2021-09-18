const router=require('express').Router();
let Notification=require('../models/notification.model');
router.route('/').post((req, res) => {
    Notification.find()
      .then(notifications => res.json(notifications))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Notification.findById(req.params.id)
      .then(notifications => res.json(notifications))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const playertype = req.body.playertype;
    const title = req.body.title;
    const message = req.body.message;
    const newNotification=new Notification({
      playertype,
      title,
      message
    })
    newNotification.save()
  .then(() => res.json('Notification added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Notification.findById(req.params.id)
    .then(notification => {
      notification.playertype = req.body.playertype;
      notification.title = req.body.title;
      notification.message = req.body.message;
      notification.save()
        .then(() => res.json('Notification updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Notification.findByIdAndDelete(req.params.id)
    .then(() => res.json('Notification deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Notification.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;