define(['Backbone', 'model/Hand', 'model/Deck'],
        function(Backbone, Hand, Deck) {

    var Game = Backbone.Model.extend({
        
        initialize: function(hand, deck) {
            this.hand = hand;
            this.deck = deck;
        },

        bestGame: function() {
            return "straight-flush";
        }
    });

    return Game;
});