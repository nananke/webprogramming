const express = require('express');
const User = require('../models/User.js');
const Lobby = require('../models/Lobby.js');
const router = express.Router();
// /* GET home page. */
// router.get('/all', function (req, res, next) {
//   //get quert param "search"
//   let page = req.query.search;
//   //if no param provided, do a get all 
//   if (page === undefined) {
//     Lobby.find(function (err, lobbys) {
//       res.send(lobbys);
//     });
//   }
//   else {
//     Lobby.search({ query:page }, function(err,results) {  
//       res.json(results.hits.hits);
//     });
//   }
// });

// //create a new lobby
// router.post('/lobby', function (req, res, next) {
//   User.findOne({ user_name: req.body.user_name }, function (err, user) {
//     //if no such user 
//     if (user === null)
//       res.status(403).json({ success: false, msg: 'you do not have access' });
//     else {
//       const lobby = new Lobby(req.body);
//       lobby.set({ owner: req.params.user_name });
//       lobby.set({ owner_name: user.nick_name });
//       Lobby.
//         find({}).
//         limit(1).
//         sort('-lobbyId').
//         select('lobbyId').
//         exec(function (err, doc) {
//           if (doc.length !== 0) {
//             let max = doc[0].lobbyId;
//             max++;
//             lobby.set({ lobbyId: max });
//             lobby.save();
//             res.send(lobby);
//           }
//           else {
//             lobby.set({ lobbyId: 1 });
//             lobby.save();
//             res.send(lobby);
//           }
//         });
//     }
//   });
// });

// //login using the username, if success return true, if not return false 
// router.post('/login', function (req, res, next) {
//   User.findOne({ user_name: req.body.user_name }, function (err, user) {
//     //if no duplicate username 
//     if (user !== null) {
//       if (user.password === req.body.password) {
//         res.send(user);
//       }
//       else {
//         let result = "wrong password";
//         res.send(result);
//       }

//     }
//     else
//       res.status(404).json({ success: false, msg: 'user not exist' });
//   });
// });

// //sign up with username 
// router.post('/signup', function (req, res, next) {
//   User.findOne({ user_name: req.body.user_name }, function (err, user) {
//     //if no duplicate username 
//     if (user === null) {
//       User.findOne({ nick_name: req.body.nick_name }, function (err, nick) {
//         if (nick === null) {
//           const user = new User(req.body);
//           user.save();
//           res.send(user);
//         }
//         else {
//           let result = "nickname duplicated";
//           res.send(result);
//         }
//       });
//     }
//     else {
//       let result = "username duplicated";
//       res.send(result);
//     }
//   });
// });

// //try to join a lobby
// router.put('/lobby/:lobby_id', function (req, res, next) {
//   User.findOne({ user_name: req.body.user_name }, function (err, user) {
//     if (user === null) {
//       res.status(403).json({ success: false, msg: 'you do not have access to join' });
//     }
//     else {
//       Lobby.findOne({ lobbyId: req.params.lobby_id }, function (err, lobby) {
//         if (lobby !== null) {
//           if (lobby.banPlayer.includes(req.body.user_name))
//             res.status(403).json({ success: false, msg: 'you are banned from this lobby' });
//           if (!lobby.currentPlayer.includes(user.nick_name))
//             lobby.currentPlayer.push(user.nick_name);
//           lobby.save()
//           res.send(lobby);
//         }
//         else
//           res.status(404).json({ success: false, msg: 'no such lobby' });
//       });
//     }
//   });
// });

// //get a user
// router.post('/user', function (req, res, next) {
//   User.findOne({ user_name: req.body.user_name }, function (err, user) {
//     if (user !== null) {
//       User.findOne({ nick_name: req.body.get_name }, function (err, get) {
//         if (get === null)
//           res.status(404).json({ success: false, msg: 'user not exist' });
//         res.send(get);
//       });
//     }
//     else
//       res.status(403).json({ success: false, msg: 'you do not have access' });
//   });
// });

// //ban a user from given lobby
// router.put('/ban/:lobby_id/user/:nick_name', function (req, res, next) {
//   Lobby.findOne({ lobbyId: req.params.lobby_id }, function (err, lobby) {
//     if (lobby !== null) {
//       User.findOne({ user_name: req.body.user_name }, function (err, user) {
//         if (user !== null) {
//           if (lobby.owner != req.body.user_name)
//             res.status(403).json({ success: false, msg: 'you do not have access to ban' });
//           User.findOne({ nick_name: req.params.nick_name }, function (err, nick) {
//             lobby.banPlayer.push(nick.user_name);
//             lobby.save()
//             res.send(lobby);
//           });
//         }
//         else
//           res.status(404).json({ success: false, msg: 'no such user' });
//       });
//     }
//     else
//       res.status(404).json({ success: false, msg: 'no such lobby' });
//   });
// });

// // router.put('/:lobby_id', function (req, res, next) {
// //   Lobby.findOne({ lobbyId: req.params.lobby_id }, function (err, lobby) {
// //     //When there is an existing lobby
// //     if (lobby !== null) {
// //       lobby.set(req.body);
// //       lobby.save();
// //       res.send(lobby);
// //     }
// //     //When there is no lobby under that id 
// //     else {
// //       const lobby = new Lobby(req.body);
// //       lobby.set({ lobbyId: req.params.lobby_id });
// //       lobby.save();
// //       res.send(lobby);
// //     }
// //   });
// // });

// //delete a lobby 
// router.delete('/lobby/:lobby_id', function (req, res, next) {
//   User.findOne({ user_name: req.body.user_name }, function (err, user) {
//     if (user !== null) {
//       if (user.createdLobbies.includes(req.params.lobby_id)) {
//         let index = user.createdLobbies.indexOf(req.params.lobby_id);
//         if (index !== -1) user.createdLobbies.splice(index, 1);
//         Lobby.deleteOne({ lobbyId: req.params.lobby_id }, function (err, result) {
//           //when there is something deleted
//           if (result.deletedCount !== 0) {
//             user.save();
//             res.send(result);
//           }
//           else
//             res.status(404).json({ success: false, msg: 'no such lobby' });
//         });
//       }
//       else
//         res.status(404).json({ success: false, msg: 'user does not have access to delete' });
//     }
//     else
//       res.status(404).json({ success: false, msg: 'no such user' });
//   });
// });

// // router.get('/:lobby_id/comments', function (req, res, next) {
// //   //find the comment's parend lobby
// //   Lobby.findOne({ lobbyId: req.params.lobby_id }, function (err, lobby) {
// //     if (lobby === null)
// //       res.status(404).json({ success: false, msg: 'no such lobby' });
// //     else {
// //       let page = req.query.search;
// //       //when no search param
// //       if (page === undefined) {
// //         Comment.find({ parentId: req.params.lobby_id }, function (err, comment) {
// //           if (comment !== null)
// //             res.send(comment);
// //           else
// //             res.status(404).json({ success: false, msg: 'no comment' });
// //         });
// //       }
// //       else {
// //         Comment.where({ parentId: req.params.lobby_id }).find({ $text: { $search: page } })
// //           .exec(function (err, docs) {
// //             res.send(docs);
// //           });
// //       }
// //     }
// //   });
// // });


// // router.put('/:lobby_id/comments/:comment_id', function (req, res, next) {
// //   //similar to above functions 
// //   Lobby.findOne({ lobbyId: req.params.lobby_id }, function (err, lobby) {
// //     if (lobby === null)
// //       res.status(404).json({ success: false, msg: 'no such lobby' });
// //     else {
// //       Comment.findOne({ cId: req.params.comment_id }, function (err, comment) {
// //         //The comment must have the same lobby id as specified
// //         if (comment !== null && comment.parentId == req.params.lobby_id) {
// //           comment.set(req.body);
// //           comment.set({ parentId: req.params.lobby_id });
// //           comment.save();
// //           res.send(comment);
// //         }
// //         else {
// //           //remove the orginal comment, create a new comment under the specified lobby
// //           Comment.remove({ cId: req.params.comment_id });
// //           const comment = new Comment(req.body);
// //           comment.set({ cId: req.params.comment_id });
// //           comment.set({ parentId: req.params.lobby_id });
// //           comment.save();
// //           res.send(comment);
// //         }
// //       });
// //     }
// //   });
// // });

// // router.get('/:lobby_id/comments/:comment_id', function (req, res, next) {
// //   //similar to above functions 
// //   Lobby.findOne({ lobbyId: req.params.lobby_id }, function (err, lobby) {
// //     if (lobby === null)
// //       res.status(404).json({ success: false, msg: 'no such lobby' });
// //     else {
// //       Comment.findOne({ cId: req.params.comment_id }, function (err, comment) {
// //         //The comment must have the same lobby id as specified
// //         if (comment !== null && comment.parentId == req.params.lobby_id)
// //           res.send(comment);
// //         else
// //           res.status(404).json({ success: false, msg: 'no comment' });
// //       });
// //     }
// //   });
// // });

// // router.delete('/:lobby_id/comments/:comment_id', function (req, res, next) {
// //   Lobby.findOne({ lobbyId: req.params.lobby_id }, function (err, lobby) {
// //     if (lobby === null)
// //       res.status(404).json({ success: false, msg: 'no such lobby' });
// //     else {
// //       Comment.findOne({ cId: req.params.comment_id }, function (err, comment) {
// //         //The comment must have the same lobby id as specified
// //         if (comment !== null && comment.parentId == req.params.lobby_id) {
// //           Comment.remove({ cId: req.params.comment_id }, function (err, result) {
// //             res.send(result);
// //           });
// //         }
// //         else
// //           res.status(404).json({ success: false, msg: 'no comment' });
// //       });
// //     }
// //   });
// // });

module.exports = router;
