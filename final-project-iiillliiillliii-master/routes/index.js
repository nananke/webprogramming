const express = require('express');
const User = require('../models/User.js');
const Lobby = require('../models/Lobby.js');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Front Page' });
});

//get all lobbies
router.get('/all', function (req, res, next) {
  //get quert param "search"
  let page = req.query.search;
  console.log(page)
  //if no param provided, do a get all
  if (page === undefined) {
    Lobby.find(function (err, lobbies) {
      res.send(lobbies);
    });
  }
  else {
    Lobby.search({ query_string: { query: page } }, function (err, results) {
      let json = results.hits.hits
      let idList = [];
      for (let i = 0; i < json.length; i++) {
        idList.push(json[i]._source.lobbyId);
      }
      Lobby.find({
        'lobbyId': { $in: idList }
      }, function (err, docs) {
        res.send(docs);
      });
    });

  }
});

//create a new lobby
router.post('/lobby', function (req, res, next) {
  console.log(req.body)
  User.findOne({ user_name: req.body.owner }, function (err, user) {
    //if no such user
    if (user === null)
      res.status(403).json({ success: false, msg: 'no such user' });
    else {
      var lobby = new Lobby();
      lobby.set({ description: req.body.description });
      lobby.set({ game: req.body.game });
      lobby.set({ lobby_name: req.body.lobby_name });
      lobby.set({ owner: req.body.owner });
      lobby.set({ owner_name: user.nick_name });
      console.log(lobby)

      Lobby.
        find({}).
        limit(1).
        sort({ lobbyId: 'descending' }).
        select('lobbyId').
        exec(function (err, doc) {
          if (doc.length !== 0) {
            let max = doc[0].lobbyId;
            console.log(doc)

            max++;
            lobby.set({ lobbyId: max });
            lobby.save(function (err) {
              if (err) throw err;
              /* Document indexation on going */
              lobby.on('es-indexed', function (err, res) {
                if (err) console.log(err);
                console.log("indexed")
              });
            }); console.log(lobby)
            res.send(lobby);
          }
          else {
            lobby.set({ lobbyId: 1 });
            lobby.save(function (err) {
              if (err) throw err;
              /* Document indexation on going */
              lobby.on('es-indexed', function (err, res) {
                if (err) console.log(err);
                console.log("indexed")
              });
            })
            res.send(lobby);
          }
        });
    }
  });
});

//try to join a lobby
router.post('/join', function (req, res, next) {

  ///:lobby_id
  User.findOne({ user_name: req.body.user_name }, function (err, user) {
    if (user === null) {
      res.status(409).json({ success: false, msg: 'you do not have access to join' });
    }
    else {
      Lobby.findOne({ lobbyId: req.body.lobby_id }, function (err, lobby) {
        if (lobby !== null) {
          if (lobby.banPlayer.includes(req.body.user_name))
            res.status(409).json({ success: false, msg: 'you are banned from this lobby' });
          //lobby.currentPlayer.push(req.body.nick_name);
          else {
            if (!lobby.currentPlayer.includes(user.nick_name))
              lobby.currentPlayer.push(user.nick_name);
            lobby.save();
            res.status(200).send(lobby);
          }
        }
        else
          res.status(404).json({ success: false, msg: 'no such lobby' });
      });
    }
  });
});

//get a user
router.post('/user', function (req, res, next) {
  User.findOne({ user_name: req.body.user_name }, function (err, user) {
    if (user !== null) {
      User.findOne({ nick_name: req.body.get_name }, function (err, get) {
        if (get === null)
          res.status(404).json({ success: false, msg: 'user not exist' });
        else res.send(get);
      });
    }
    else
      res.status(403).json({ success: false, msg: 'you do not have access' });
  });
});

//ban a user from given lobby
router.put('/ban/:lobby_id/user/:nick_name', function (req, res, next) {
  Lobby.findOne({ lobbyId: req.params.lobby_id }, function (err, lobby) {
    if (lobby !== null) {
      User.findOne({ user_name: req.body.user_name }, function (err, user) {
        if (user !== null) {
          if (lobby.owner != req.body.user_name)
            res.status(403).json({ success: false, msg: 'you do not have access to ban' });
          else {
            User.findOne({ nick_name: req.params.nick_name }, function (err, nick) {
              lobby.banPlayer.push(nick.user_name);
              lobby.save();
              res.send(lobby);
            });
          }
        }
        else
          res.status(404).json({ success: false, msg: 'no such user' });
      });
    }
    else
      res.status(404).json({ success: false, msg: 'no such lobby' });
  });
});

router.delete('/lobby/:lobby_id', function (req, res, next) {
  User.findOne({ user_name: req.body.user_name }, function (err, user) {
    if (user !== null) {
      if (user.createdLobbies.includes(req.params.lobby_id)) {
        let index = user.createdLobbies.indexOf(req.params.lobby_id);
        if (index !== -1) user.createdLobbies.splice(index, 1);
        Lobby.deleteOne({ lobbyId: req.params.lobby_id }, function (err, result) {
          //when there is something deleted
          if (result.deletedCount !== 0) {
            user.save();
            res.send(result);
          }
          else
            res.status(404).json({ success: false, msg: 'no such lobby' });
        });
      }
      else
        res.status(404).json({ success: false, msg: 'user does not have access to delete' });
    }
    else
      res.status(404).json({ success: false, msg: 'no such user' });
  });
});

//login using the username, if success return true, if not return false 
router.post('/login', function (req, res, next) {
  //console.log(req.body);
  User.findOne({ user_name: req.body.user_name }, function (err, user) {
    //if no duplicate username 
    if (user !== null) {
      //console.log(user)
      if (user.password == req.body.password) {
        res.status(200).send(user);
      }
      else {
        res.status(500).json({ success: false, msg: "wrong password" });
      }
    }
    else
      res.status(404).json({ success: false, msg: 'user not exist' });
  });
});

//sign up with username 
router.post('/signup', function (req, res, next) {
  //console.log(req.body);

  User.findOne({ user_name: req.body.user_name }, function (err, user) {
    console.log(req.body.user_name);
    //if no duplicate username 
    if (user === null) {
      User.findOne({ nick_name: req.body.nick_name }, function (err, nick) {
        if (nick === null) {
          const user = new User(req.body);
          user.save();
          res.send(user);
        }
        else {
          let result = "nickname duplicated";
          res.status(200).json({ success: false, msg: result });
        }
      });
    }
    else {
      let result = "username duplicated";
      res.status(200).json({ success: false, msg: result });
    }
  });
});

module.exports = router;
