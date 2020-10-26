const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosastic=require("mongoosastic");

const lobbySchema = new mongoose.Schema({
    lobbyId: { type:Number, es_indexed:true },
    owner: {
        type: String,
        required: true,
    },
    owner_name: String, 
    lobby_name:  { type:String, es_indexed:true },
    game: { type:String, es_indexed:true },
    currentPlayer: [String],
    banPlayer: [String],
    description: { type:String, es_indexed:true }
 });
 lobbySchema.plugin(mongoosastic,{
    host:"0bc5095763164f7fa73fd84ba05d2714.us-east-1.aws.found.io",
    port: 9243,
    protocol: "https",
    auth: "elastic:AVhaXOfpCw5eKVy2qDX6nUwS"
  //  ,curlDebug: true
  });
 //lobbySchema.index({'$**': 'text'});


const Lobby = mongoose.model('Lobby', lobbySchema);
Lobby.createMapping(function(err, mapping){
    if(err){
      console.log('error creating mapping (you can safely ignore this)');
      console.log(err);
    }else{
      console.log('mapping created!');
      console.log(mapping);
    }
  });
module.exports = Lobby;
