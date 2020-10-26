/*
 * This files holds all the code to test you REST API
 */
//Run once broswer has loaded everything
window.onload = function () {

  function hash(str) {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function signUp(userName,password,userProfile) {
    let payload = {
      user_name: userName,
      nick_name: makeId(8),
      password: hash(password),
      profile: userProfile
    };

    //console.log(payload)
    return fetch('/signup', {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        //console.log(response)
        if(response.ok){
          return response.json()
        }else{
          window.alert("sign up failed for some reason")
        }
      })
  }
  

  function signIn(userName,password) {
    let payload = {
      user_name: userName,
      password: hash(password),
    };
    return fetch('/login', {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if(response.ok){
          return response.json()
        }
        else{
          return false
        }
        //return response.json()
      })
  }

  function getAllLobby(userName) {
    return fetch('/all')
      .then(function (response) {
        return response.json()
      })
  }

  function joinLobby(userName, lobbyId) {
    let payload = {
      user_name: userName,
      lobby_id: lobbyId
    };
    //let uri = "/join/" + lobbyId;
    let uri = "/join"
    return fetch(uri, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      body: JSON.stringify(payload)
    })
      .then(function (response,error) {
        if(error){
          window.alert("Banned")
        }
        if(response.ok){
          return response.json()
        }else{
          //window.alert("Banned")
          console.log(response.json.msg)
        }
      })
  }

  function createLobby(userName, lobbyName, lobbyDescription, lobbyGame) {
    let payload = {
      owner: userName,
      lobby_name: lobbyName,
      description: lobbyDescription,
      game: lobbyGame
    };
    return fetch("/lobby", {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json()
      })
  }

  function deleteLobby(userName, lobbyId) {
    let payload = {
      user_name: userName,
      lobby_id: lobbyId,
    };
    let uri = "/user/lobby/";
    return fetch(uri, {
      headers: {'Content-Type': 'application/json'},
      method: 'delete',
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json()
      })
  }

  function banUser(userName, targetName, lobbyId) {
    let payload = {
      user_name: userName,
      nick_name: targetName,
      lobby_id: lobbyId
    };
    let uri = "/ban/" + lobbyId + "/user/"+targetName;
    return fetch(uri, {
      headers: {'Content-Type': 'application/json'},
      method: 'put',
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json()
      })
  }

  function getUser(userName,nickname) {
    let payload = {
      user_name: userName,
      get_name: nickname
    };
    return fetch("/users", {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json()
      })
  }

  function search(content){
    let url = "/all?search="+content
    return fetch(url, {
      method: 'get',
    })
      .then(function (response) {
        return response.json()
      })
  }

    var main_pg = document.getElementById("main_pg");
    var text_0 = document.getElementById("text_0");
    var sg_in = document.getElementById("sin_btn");
    var text_1 = document.getElementById("new_u");
    var sg_up = document.getElementById("sup_btn");
    var sg_in_input = document.getElementById("sg_in_input");
    var title = document.getElementById("show_title");
    var profile = document.getElementById("discp");
    var lobby_title = document.getElementById("lobby_title");
    var username_in = document.getElementById("sg_in_us");
    var password_in = document.getElementById("sg_in_ps");
    var table1 = document.getElementById("table_1");
    var table2 = document.getElementById("lobby_table");
    var ban_tab = document.getElementById("ban_table");
    var search_table = document.getElementById("search_table");



    var lobby_info = document.getElementById("Lobby_Info")
    var lobby_disc = document.getElementById("lobby_disc")
    var lobby_game = document.getElementById("lobby_game")
    var lobby_name = document.getElementById("lobby_name")
    var table_3 = document.getElementById("table_3")
    var banname = ""
    var currentLobby = ""
   // lobby_disc.submit(function(){return false;})


    main_pg.style.display = "none";
    profile.style.display = "none";
    lobby_title.style.display = "none";
    table2.style.display = "none";
    lobby_info.style.display = "none";
    ban_tab.style.display = "none";
    search_table.style.display = "none"



  
   
    document.getElementById("sup_btn")
         .addEventListener("click",function(e){
           sg_in.style.display = "none";
           text_0.style.display = "none";
           text_1.style.display = "none";
           profile.style.display = "inline";
           
          document.getElementById("sup_btn")
          .addEventListener("click",function(e){
            //if sign up success
            signUp(username_in.value,password_in.value,profile.value)
            .then(function(res){
              console.log(res)
            })
            window.open("/")
        
          })
         });


    document.getElementById("sin_btn")
         .addEventListener("click",function(e){
                //if sign in successful, load the lobby page, open the lobby page
               
                signIn(username_in.value,password_in.value)
                .then(function(res){
                  //console.log(res)
                  if(res===false){
                    console.log("Login failed")
                    window.alert("login failed")
                  }else{
                      //console.log(res)
                      sg_in.style.display = "none";
                      text_0.style.display = "none";
                      text_1.style.display = "none";
                      sg_up.style.display = "none";        
                      main_pg.style.display = "inline";
                      title.style.display = "none";
                      username_in.style.display = "none";
                      password_in.style.display = "none";
                      table1.style.display = "none"
                      table2.style.display = "block";
                      search_table.style.display = "block"
                      
                      // go to lobby page after successful login
                      go_lobby(username_in)
                      
                    }
                  
                  //console.log(res)
                })
                // .then(function(res){

                // })
       
         //   lobby_title.style.display = "inline";
            

         })

 function addFields(res){
      
    var number = res.length;
    var container = document.getElementById("container");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (i=0;i<number;i++){
      //- <input class="lobby_title" type="button" align = "center"  id = "first_lobby_button">
      //  container.appendChild(document.createTextNode("Member " + (i+1)));
        var butt = document.createElement("button");
        butt.setAttribute("class","lobby_title");
        butt.value = res[i].lobbyId
        butt.innerHTML = res[i].lobby_name;
        butt.addEventListener("click",function(e){
          //console.log(this.value)
          joinLobby(username_in.value,this.value)
          .then(function(res){
            console.log(res)
            if(res == undefined){
              window.alert("you are banned")
            }
            else{
            currentLobby = res.lobbyId
            table2.style.display = "none"
            table_3.style.display = "block"
            document.getElementById("lobby_page_name").value = res.lobby_name;
            document.getElementById("lobby_page_owner").value = res.owner_name;
            document.getElementById("lobby_page_dis").value =res.description;
            document.getElementById("lobby_page_game").value = res.game;
            var player_list = document.getElementById("current_player");
            while (player_list.hasChildNodes()) {
              player_list.removeChild(player_list.lastChild);
            }
            var number = res.currentPlayer;
            console.log(number.length)
            for (i=0;i<number.length;i++){
              var butt = document.createElement("button");
              butt.setAttribute("class","lobby_title");
              butt.setAttribute
              butt.value = res.currentPlayer[i];
              butt.innerHTML = res.currentPlayer[i];
              console.log(res.currentPlayer[i])
         //   butt.id = res.currentPlayer[i]
              butt.addEventListener("click",function(e){
                table_3.style.display = "none"
                ban_tab.style.display = "block"
                main_pg.style.display = "none"
                console.log("xxxx")
                document.getElementById("play_name").value = butt.value
                banname = butt.value
              })
              player_list.appendChild(butt);
              player_list.appendChild(document.createElement("br")); 
            }

          }

          })
  
        })
        container.appendChild(butt);
        container.appendChild(document.createElement("br"));
       
    }
  //  console.log(butt)
  }

  document.getElementById("bar_btn").addEventListener("click",function(e){
    serach_value = document.getElementById("search_bar").value

    console.log("search")
    console.log(serach_value)

    search(serach_value)
    .then(function(res){
      if(res.length === 0){
        window.alert("No matching")
        go_lobby(username_in.value)
      }
      else{
        addFields(res)
      }
    })

    })

  document.getElementById("ban_player_yes").addEventListener("click",function(e){
    console.log(currentLobby)
    banUser(username_in.value,banname,currentLobby)
    .then(function(res){
      console.log(res)
      table2.style.display = "block"
      ban_tab.style.display = "none"
      main_pg.style.display = "block"
    })

  })
  document.getElementById("ban_player_no").addEventListener("click",function(e){
    //no, go back to lobby
    table_3.style.display = "block"
    ban_tab.style.display = "none"
    main_pg.style.display = "block"
   
  })
  

  document.getElementById("back_main_lobby").addEventListener("click",function(e){
    table_3.style.display = "none"
    table2.style.display = "block"
    go_lobby(username_in)
  })

  document.getElementById("create_lobby").addEventListener("click",function(e){
    //code for create lobby
    lobby_info.style.display = "block"
    table2.style.display = "none"
  })

  document.getElementById("crea_lob").
  addEventListener("click",function(e){
    console.log(lobby_name.value)
    console.log(lobby_disc.value)
    console.log(lobby_game.value)
    createLobby(username_in.value,lobby_name.value,lobby_disc.value,lobby_game.value)
    .then(function(res){
      console.log(res)
      sg_in.style.display = "none";
      text_0.style.display = "none";
      text_1.style.display = "none";
      sg_up.style.display = "none";        
      main_pg.style.display = "inline";
      title.style.display = "none";
      username_in.style.display = "none";
      password_in.style.display = "none";
      table1.style.display = "none"
      table2.style.display = "block";    
      lobby_info.style.display = "none";  
      document.getElementById("lobby_disc").value = "enter discrption";
      document.getElementById("lobby_game").value = "enter game";
      document.getElementById("lobby_name").value = "enter lobby_name";
    })
    .then(function(res){
      go_lobby(username_in)
    })
  })


  function go_lobby(username_in){
    //get lobby information
    getAllLobby(username_in.value)
    .then(function(res){
      console.log(res)
      addFields(res);
    })
  }


  };

   