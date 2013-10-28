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
            var allHands = [];
            
            allHands.push(this.hand);
            allHands.push(this.deck);
            
            var that = this;
            
            for (var i=1; i < this.hand.length; i++) {
                
                var combinations = CardsCombinator.generate(this.hand.models, this.hand.length -i);
                
                _.each(combinations, function(handCombination) {
                    
                    var deckCards = that.deck.models.slice(0, i);
                    
                    var checkCards = handCombination.concat(deckCards);
                    
                    allHands.push(new CardsCollection(checkCards));
                });
            }
            
            return _.last(_.sortBy(allHands, function(cardsCollection) {
                             return HandEvaluator.cardsRanking(cardsCollection);
                          }));
        }
    });

    return Game;
});