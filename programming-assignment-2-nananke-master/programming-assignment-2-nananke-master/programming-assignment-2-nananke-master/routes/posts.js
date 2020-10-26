const express = require('express');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const router = express.Router();
let p_id = 1;
let c_id = 1; 
/* GET home page. */
router.get('/', function (req, res, next) {
  let Squery = req.query.search;
  if (Squery === undefined) {
    Post.find(function (err, posts) {
      res.send(posts);
    });
  }
  else {
    Post.find({ $text: { $search: Squery } })
      .exec(function (err, docs) {
        res.send(docs);
      });
  }
});

router.post('/', function (req, res, next) {
  const post = new Post(req.body);

 
        //set a global variable p_id which equals to 1 at first time
        //do the incresement to p_id as you click more create button     
        post.set({ Post_Id: p_id });
        p_id ++;
        post.save();
        res.send(post);
      
    
   
});

router.get('/:p_id', function (req, res, next) {
  Post.findOne({ Post_Id: req.params.p_id }, function (err, post) {
    if (post == null){
      //if not exist, return 404
      res.status(404).json({ msg: 'post not exist' });
  }
    else{
      //else send the post 
      res.send(post);
    }
    });
});

router.put('/:p_id', function (req, res, next) {
  Post.findOne({ Post_Id: req.params.p_id }, function (err, post) {
  
    if (post == null) {
      //if null, create
      const post = new Post(req.body);
      post.set({ Post_Id: req.params.p_id });
      post.save();
      res.send(post);
    }
    
    else {
      //else update
      post.set(req.body);
      post.save();
      res.send(post);
  
    }
  });
});

router.delete('/:p_id', function (req, res, next) {
      Comment.deleteMany({ Parent_Id: req.params.p_id }, function (err, doc) {
        Post.deleteOne({ Post_Id: req.params.p_id }, function (err, result) {
          if (result.deletedCount == 0) {
            res.send(result);
            res.status(404).json({ msg: 'post not exist' });
          }
          else {
            res.send(result);
          }
        });
      });
  });

router.get('/:p_id/comments', function (req, res, next) {
  Post.findOne({ Post_Id: req.params.p_id }, function (err, post) {
    //if post not exist
    if (post === null)
      res.status(404).json({msg: 'post not exist' });
    else {
      let Squery = req.query.search;
  if (Squery === undefined) {
    Comment.find({ Parent_Id: req.params.p_id }, function (err, comment) {
      if (comment == null){
        res.status(404).json({ msg: 'comment not exist' });
      }
      else{
        res.send(comment);
      }
    });
  }
  else {
    Comment.where({ Parent_Id: req.params.p_id }).find({ $text: { $search: Squery } })
      .exec(function (err, docs) {
        res.send(docs);
      });
  }
    }
  });
});

//This should accept a JSON body and create a new blog post comment element in the comments collection in the blog post identified by [post_id].
router.post('/:p_id/comments', function (req, res, next) {
  Post.findOne({ Post_Id: req.params.p_id }, function (err, post) {
    if (post === null)
      res.status(404).json({ msg: 'post not exist' });
    else {
      const comment = new Comment(req.body);
      comment.set({ Parent_Id: req.params.p_id });
      //get the largest existing comment id
     
            comment.set({ comment_Id: c_id });
            //increasement c_id
            c_id++;
            comment.save();
            res.send(comment);
          }
  });
});

router.put('/:p_id/comments/:c_id', function (req, res, next) {
  Post.findOne({ Post_Id: req.params.p_id }, function (err, post) {
    if (post === null)
      res.status(404).json({ msg: 'post not exist' });
    else {
      Comment.findOne({ comment_Id: req.params.c_id }, function (err, comment) {
        if (comment !== null ) {
          //compare parent_id to the p_id
          if( comment.Parent_Id == req.params.p_id){
          comment.set(req.body);
          comment.set({ Parent_Id: req.params.p_id });
          comment.save();
          res.send(comment);
        }
      }
        //if comment is null, create one      
        else {
          Comment.remove({ comment_Id: req.params.c_id });
          const comment = new Comment(req.body);
          comment.set({ comment_Id: req.params.c_id });
          comment.set({ Parent_Id: req.params.p_id });
          comment.save();
          res.send(comment);
        }
      });
    }
  });
});

router.get('/:p_id/comments/:c_id', function (req, res, next) {
 
      Comment.findOne({ comment_Id: req.params.c_id }, function (err, comment) {
        if (comment !== null ){
          //compare parent_id to p_id
         if(comment.Parent_Id == req.params.p_id){
          res.send(comment);
         }
        }
        else{
          //not exist
          res.status(404).json({msg: 'comment not exist' });
        }
      });
  
});

router.delete('/:p_id/comments/:c_id', function (req, res, next) {
   
      Comment.findOne({ comment_Id: req.params.c_id }, function (err, comment) {
        //not null at first place
        if (comment !== null) {
          //compare Parent_ID to p_id we receive
          if(comment.Parent_Id == req.params.p_id)
        {
          Comment.deleteOne({ comment_Id: req.params.c_id }, function (err, result) {
            res.send(result);
          });
        }
      }
        else{
        //if null, return 404
          res.status(404).json({ msg: 'comment not exist' });
        }
      });
   
 
});

module.exports = router;
