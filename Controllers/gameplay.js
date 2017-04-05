/* A module representing the game of lightbikes */
// class Game{
module.exports = exports = Game;

function Game(io, sockets, room) {
    this.io = io;
    this.room = room;
    this.deckCards = [];
    this.card = {
      suits : ['H','S','C','D'],
      cardValues : ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    }
    // this.temp = { temp: this.card.suits }
    this.deck = this.deckCards;
    // this.deck = function(socket, i) {
    //     for(var num=1; num<=1; num++){
    //       for(var x=0; x<this.card.suits.length; x++){
    //         for(var y=0; y<this.card.cardValues.length; y++){
    //           this.deckCards.push(this.card.cardValues[y]+this.card.suits[x]);
    //         } 
    //       }
    //     }
    //     // return this.deckCards;
    //     return 'teST';
    //     // break;
    // }
      // 
    
    this.players = sockets.map(function(socket, i) {
      // Initialize the player
      var player = {
        socket: socket,
        id: i + 1,
        name: '',
        hand: ''
      }

      // Join the room
      player.socket.join(room);

      // Handle disconnect events
      player.socket.on('disconnect', function() {
        io.to(room).emit('player disconnected');
      });

      player.socket.on('deal', function() {
        io.to(room).emit('Dealing cards');
      });
      
      return player;

    });
    
    this.players[0].x = 210;
    this.players[0].y = 420;
    this.io.to(this.room).emit('set', {
      x: this.players[0].x,
      y: this.players[0].y,
      id: this.players[0].id,
      name: 'YOU',
      hand: this.deck
      // hand: this.temp.temp
      // deck: ''+this.deck
    });
    
    this.players[1].x = 210;
    this.players[1].y = 25;
    this.io.to(this.room).emit('set', {
      x: this.players[1].x,
      y: this.players[1].y,
      id: this.players[1].id,
      name: 'PLAYER 1'
    });
    
    /*
    this.players[2].x = 25;
    this.players[2].y = 190;
    this.io.to(this.room).emit('set', {
      x: this.players[2].x,
      y: this.players[2].y,
      id: this.players[2].id,
      name: 'PLAYER 2'
    });
    
    this.players[3].x = 400;
    this.players[3].y = 190;
    this.io.to(this.room).emit('set', {
      x: this.players[3].x,
      y: this.players[3].y,
      id: this.players[3].id,
      name: 'PLAYER 3'
    }); 
    */
    var game = this;
    // Start the game

    this.io.to(this.room).emit('game on');
    // this.io.to(this.room).emit('set');
}

Game.prototype.update = function() {
    var room = this.room;
    var io = this.io;

    // Update players
    this.players.forEach(function(player, i, players){
      var otherPlayer = players[(i+1)%2];
      player.socket.emit('victory');
      io.to(room).emit('set', {
        x: player.x,
        y: player.y,
        id: player.id,
        hand: x,
        name: player.name
      });
    });
}