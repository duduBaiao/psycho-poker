define(['Backbone', 'utils/CardsCombinator', 'utils/HandEvaluator', 'model/CardsCollection'],
        function(Backbone, CardsCombinator, HandEvaluator, CardsCollection) {

    var Game = Backbone.Model.extend({
        
        initialize: function(hand, deck) {
            this.hand = hand;
            this.deck = deck;
        },
        
        bestGame: function() {
            var bestGameRanking = 0;
            
            var checkForBestGame = function(cardsCollection) {
                var gameRanking = HandEvaluator.cardsRanking(cardsCollection);
                
                if (gameRanking > bestGameRanking) {
                    bestGameRanking = gameRanking;
                }
            }
            
            checkForBestGame(this.hand);
            checkForBestGame(this.deck);
            
            return HandEvaluator.handNameForRanking(bestGameRanking);
        }
    });

    return Game;
});