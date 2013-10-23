define(['Backbone', 'utils/CardsCombinator', 'utils/HandEvaluator', 'model/CardsCollection'],
        function(Backbone, CardsCombinator, HandEvaluator, CardsCollection) {

    var Game = Backbone.Model.extend({
        
        initialize: function(cards) {
            this.hand = new CardsCollection(cards.fromHand());
            this.deck = new CardsCollection(cards.fromDeck());
        },
        
        allCards: function() {
            return this.hand.models.slice(0).concat(this.deck.models);
        },
        
        bestHand: function() {
            var that = this;
            var bestRanking = -1;
            var bestHand;
            
            var checkForBestGame = function(cardsCollection) {
                var ranking = HandEvaluator.cardsRanking(cardsCollection);
                
                if (ranking > bestRanking) {
                    bestRanking = ranking;
                    bestHand = cardsCollection;
                }
            }
            
            checkForBestGame(this.hand);
            checkForBestGame(this.deck);
            
            for (var i=1; i < this.hand.length; i++) {
                
                var combinations = CardsCombinator.generate(
                    this.hand.length - i,
                    this.hand.length);
                
                _.each(combinations, function(combination) {
                    
                    var handCards = _.map(combination, function(cardIndex) {
                        return that.hand.models[cardIndex];
                    });
                    
                    var deckCards = that.deck.models.slice(0, i);
                    
                    var checkCards = handCards.concat(deckCards);
                    
                    checkForBestGame(new CardsCollection(checkCards));
                });
            }
            
            return bestHand;
        }
    });

    return Game;
});