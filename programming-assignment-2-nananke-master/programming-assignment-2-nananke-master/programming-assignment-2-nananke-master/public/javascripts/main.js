/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
window.onload = function () {
//button event for create
document.getElementById("create")
.addEventListener("click",function(e){   

 var payload = { 
     Post_ID:'123', 
     title:'abc', 
     body:'qweqweqweqw', 
     author:'kekeke',
     };
                 
fetch('http://localhost:3000/posts', {
    headers: {'Content-Type': 'application/json'},
    //This should accept a JSON body and create a new blog post element in the post collection
    method: 'post',
    body: JSON.stringify(payload)
  }).then(function(response) {
    return response.json();
  })
 console.log("created")
},false);

//button event for read
document.getElementById("read")
.addEventListener("click",function(e){
  fetch('http://localhost:3000/posts')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
  })
  .catch(err => {
    console.log("fetch error")
  })

    console.log("read")
},false);

//button event for search
document.getElementById("search")
.addEventListener("click",function(e){
  fetch('http://localhost:3000/posts/1',{
    headers: {'Content-Type': 'application/json'},
    method: 'get',
  }
  )
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
  })
  .catch(err => {
    console.log("fetch error")
  })
  
    console.log("search")
},false);


//button event for update
document.getElementById("update")
.addEventListener("click",function(e){
  var payload = { 
    Post_ID:'3321312', 
    title:'ccc', 
    Body:'123', 
    Author:'eqweqwe',
    };
                
fetch('http://localhost:3000/posts/1', {
   headers: {'Content-Type': 'application/json'},
   //This should accept a JSON body and create a new blog post element in the post collection
   method: 'put',
   body: JSON.stringify(payload)
 }).then(function(response) {
   return response.json();
 })

  
    console.log("update")
},false);

//button event for destroy
document.getElementById("destroy")
.addEventListener("click",function(e){
  fetch('http://localhost:3000/posts/1', {
    headers: {'Content-Type': 'application/json'},
    method: 'delete'
  }).then(() => {
     console.log('removed');
  }).catch(err => {
    console.error(err)
  });
console.log("delete")
},false);


//butto event for post comment
document.getElementById("create_comment")
.addEventListener("click",function(e){
  var comment = { 
    Parent_Id: '1',
    comment_Id: '333',
    comment_Title: 'firstcomment',
    comment_Body: 'qweqweqw',
    comment_Author: 'xxxxx',
    };
                
fetch('http://localhost:3000/posts/1/comments', {
   headers: {'Content-Type': 'application/json'},
   //This should accept a JSON body and create a new blog post element in the post collection
   method: 'post',
   body: JSON.stringify(comment)
 }).then(function(response) {
   return response.json();
  })
  console.log('comment post')
 
},false);

//butto event for get all posted comment
document.getElementById("get_all_comment")
.addEventListener("click",function(e){
  fetch('http://localhost:3000/posts/1/comments')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
  })
  .catch(err => {
    console.log("fetch error")
  })
  console.log("comment test2")
})

//butto event for get a certain comment using c_id and p_id
document.getElementById("get_comment")
.addEventListener("click",function(e){
  fetch('http://localhost:3000/posts/1/comments/2',{
    headers: {'Content-Type': 'application/json'},
    method: 'get',
  }
  )
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
  })
  .catch(err => {
    console.log("fetch error")
  })
  console.log("comment test3")
})

//butto event for update a certain comment using c_id and p_id
document.getElementById("update_comment")
.addEventListener("click",function(e){
  var payload = { 
    parentId: '1',
    cId: '312',
    cTitle: 'updatecomment',
    cBody: 'qrxew',
    cAuthor: 'yyyy',
    };
                
fetch('http://localhost:3000/posts/1/comments/2', {
   headers: {'Content-Type': 'application/json'},
   //This should accept a JSON body and create a new blog post element in the post collection
   method: 'put',
   body: JSON.stringify(payload)
 }).then(function(response) {
   return response.json();
 })
  console.log("comment test4")
})

//butto event for delete a certain comment using c_id and p_id
document.getElementById("delete_comment")
.addEventListener("click",function(e){
  fetch('http://localhost:3000/posts/1/comments/1', {
    headers: {'Content-Type': 'application/json'},
    method: 'delete'
  }).then(() => {
     console.log('removed');
  }).catch(err => {
    console.error(err)
  });
  console.log("comment test5")
})

//search
document.getElementById("search_query")
.addEventListener("click",function(e){
  console.log("serach query")
  fetch('http://localhost:3000/posts?search=asdjkkbn',{
    headers: {'Content-Type': 'application/json'},
    method: 'get',
  }
  )
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
  })
  .catch(err => {
    console.log("fetch error")
  })
})


document.getElementById("search_query_comment")
.addEventListener("click",function(e){
  console.log("serach query")
  fetch('http://localhost:3000/posts/1/comments?search=[qweqweqw]',{
    headers: {'Content-Type': 'application/json'},
    method: 'get',
  }
  )
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
  })
  .catch(err => {
    console.log("fetch error")
  })
})
};