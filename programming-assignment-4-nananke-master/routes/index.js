const express = require('express');
const router = express();
const User = require('../models/User');

//444 code for no access 
//445 code for name duplicate
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Front Page' });
});

//for log off use
router.post('/LogOff', function (req, res) {
  req.session.destroy(function (err) {  
   res.status(200).json({ success: true, msg: 'user logged off' });
  });
});

//for session use
router.get('/Session', function (req, res, next) {
  if (req.session.Auth) {
    User.findOne({ Username: req.session.Auth }, function (err, user) {
      if (user !== null)
        res.status(200).json({ success: true, msg: ' you are logged in' });
      else
        res.status(444).json({ success: false, msg: 'no access' }); 
    });
  }
  else 
    res.status(444).json({ success: false, msg: 'no access' });
  });

  router.get('/User', function (req, res, next) {
    if (req.session.Auth) {
      User.findOne({ Username: req.session.Auth }, function (err, user) {
        if (user == null){
         res.status(444).json({ success: false, msg: 'not registered' }); 
         }
        else{ 
          res.send(user);
        }
      });
    }
    else 
      res.status(444).json({ success: false, msg: 'no access' });
    });



router.post('/SignUp', function (req, res) {

  User.findOne({ Username: req.body.Username }, function (err, user) {
    if (user == null){
      var user = new User();
      user.set({ Username: req.body.Username });
      user.set({ password: req.body.password });
      user.set({ Win: 0 });
      user.set({ lose: 0 });
      user.set({ Tie: 0 });
      user.save();
      req.session.Auth = req.body.Username
      res.send(user)
    
    }
    else {
      res.status(444).json({ success: false, msg: 'username duplicated' });
    }
  });
});

router.post('/SignIn', function (req, res) {
  User.findOne({ Username: req.body.Username }, function (err, user) {
    if (user !== null) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) res.status(444).json({ success: false, msg: 'wrong password' });
        else if (isMatch) {
          req.session.Auth = req.body.Username
          res.send(user);
        }
        else {
          res.status(444).json({ success: false, msg: 'wrong password' });
        }
      });
    }
    else
      res.status(444).json({ success: false, msg: 'user does not exist' });
  });
});


//win button 
router.put('/win', function (req, res) {
  console.log(req.session)
  if (req.session.Auth) {
    console.log(req.session.Auth)
    User.findOne({ Username: req.session.Auth }, function (err, user) {
      
      if (user == null) {
        res.status(444).json({ success: false, msg: 'null' });
      }
   
      else {
        let Win_update = user.Win+1;
        user.set({ Win: Win_update });
        user.save();
        res.send(user);
       
      }
    });
  }
  else res.status(444).json({ success: false, msg: 'something wrong' });
});

//lose button 
router.put('/lose', function (req, res) {
  if (req.session.Auth) {

    User.findOne({ Username: req.session.Auth }, function (err, user) {
      //null
      if (user == null) {
        res.status(444).json({ success: false, msg: 'null' });
      }
      else {
        let Lose_update = user.lose+1;
        user.set({ lose: Lose_update });
        user.save();
        res.send(user);
      }
    });
  }
  else res.status(444).json({ success: false, msg: 'no access' });

});

//tie button
router.put('/tie', function (req, res) {
  if (req.session.Auth) {
    User.findOne({ Username: req.session.Auth }, function (err, user) {
    
      if (user == null) {
      res.status(444).json({ success: false, msg: 'null' });
      }
     
      else {
        let Tie_update = user.Tie+1;
        user.set({ Tie: Tie_update });
        user.save();
        res.send(user);
      }
    });
  }
  else res.status(444).json({ success: false, msg: 'no access' });
});
module.exports = router;
