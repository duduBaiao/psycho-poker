define(['Backbone', 'utils/HandEvaluator', 'model/CardsCollection'],
        function(Backbone, HandEvaluator, CardsCollection) {

    var Game = Backbone.Model.extend({
        
        initialize: function(hand, deck) {
            this.hand = hand;
            this.deck = deck;
        },
        
        bestGame: function() {
            var that = this;
            
            var bestGameRanking = 0;
            
            /*
            var sortFunction = function(card){return card.code;}
            
            var initialHandCards = _.sortBy(this.hand.models, sortFunction);
            var initialDeckCards = _.sortBy(this.deck.models, sortFunction);
            
            console.log(_.pluck(initialHandCards, 'code'));
            console.log(_.pluck(initialDeckCards, 'code'));
            console.log('');
            */
            
            var checkForBestGame = function(cards) {
                var cardsCollection = new CardsCollection(cards);
                var gameRanking = HandEvaluator.cardsRanking(cardsCollection);
                
                console.log(_.pluck(cards, 'code'));
                
                if (gameRanking > bestGameRanking) {
                    bestGameRanking = gameRanking;
                }
            }
            
            that.checkNextCard = function(handCards, deckCards) {
                
                // checkForBestGame(handCards);
                console.log(handCards);
                
                var deckCardsLength = deckCards.length;
                
                if (deckCardsLength > 0) {
                    
                    var deckCard = deckCards.shift();
                    
                    var firstIndex = handCards.length - deckCardsLength;
                    
                    for (var h=firstIndex; h < handCards.length; h++) {
                        
                        var cards = handCards.slice(0);
                        
                        cards.splice(h, 1);
                        cards.splice(h, 0, deckCard);
                        
                        that.checkNextCard(cards, deckCards.slice(0));
                    }
                }
            }
            
            that.checkNextCard(['1','2','3','4','5'], ['A','B','C','D','E']);
            
            return HandEvaluator.handNameForRanking(bestGameRanking);
        }
    });

    return Game;
});