const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const session=require('express-session');
const passport=require('passport');
const Admin=require('./models/admin.model');
const User=require('./models/user.model');
require('dotenv').config();
const app=express();
app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
const port=process.env.PORT || 80;
const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Atlas started successfully")
})
passport.use('adminLocal',Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
passport.use('userLocal',User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');
const pointrummyRouter=require('./routes/pointrummy');
const poolrummyRouter=require('./routes/poolrummy');
const dealrummyRouter=require('./routes/dealrummy');
const papplurummyRouter=require('./routes/papplurummy');
const tournamentRouter=require('./routes/tournament');
const bannerRouter=require('./routes/banner');
const couponRouter=require('./routes/coupon');
const promotionRouter=require('./routes/promotion');
const commissionRouter=require('./routes/commission');
const baseurlRouter=require('./routes/baseurl');
const websliderRouter=require('./routes/webslider');
const mobilesliderRouter=require('./routes/mobileslider');
const logouploadRouter=require('./routes/logoupload');
const helpnsupportRouter=require('./routes/helpnsupport');
const referalcommissionRouter=require('./routes/referalcommission');
const notificationRouter=require('./routes/notification');
const smsRouter=require('./routes/sms');
const emailRouter=require('./routes/email');
const emailconfigurationRouter=require('./routes/emailconfiguration');
const smsconfigurationRouter=require('./routes/smsconfiguration');
const paymentcashfreeRouter=require('./routes/paymentcashfree');
const paymentpaytmRouter=require('./routes/paymentpaytm');
const socialloginfacebookRouter=require('./routes/socialloginfacebook');
const sociallogingoogleRouter=require('./routes/sociallogingoogle');
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/pointrummy',pointrummyRouter);
app.use('/poolrummy',poolrummyRouter);
app.use('/dealrummy',dealrummyRouter);
app.use('/papplurummy',papplurummyRouter);
app.use('/tournament',tournamentRouter);
app.use('/banner',bannerRouter);
app.use('/coupon',couponRouter);
app.use('/promotion',promotionRouter);
app.use('/commission',commissionRouter);
app.use('/baseurl',baseurlRouter);
app.use('/webslider',websliderRouter);
app.use('/mobileslider',mobilesliderRouter);
app.use('/logoupload',logouploadRouter);
app.use('/helpnsupport',helpnsupportRouter);
app.use('/referalcommission',referalcommissionRouter);
app.use('/notification',notificationRouter);
app.use('/sms',smsRouter);
app.use('/email',emailRouter);
app.use('/emailconfiguration',emailconfigurationRouter);
app.use('/smsconfiguration',smsconfigurationRouter);
app.use('/paymentcashfree',paymentcashfreeRouter);
app.use('/paymentpaytm',paymentpaytmRouter);
app.use('/socialloginfacebook',socialloginfacebookRouter);
app.use('/sociallogingoogle',sociallogingoogleRouter);
app.listen(port,function(){
    console.log("Server started Successfully");
});