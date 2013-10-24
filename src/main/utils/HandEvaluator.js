define(['Backbone', 'model/Card'],
        function(Backbone, Card) {

    var HandEvaluator = Backbone.Model.extend({},
    {
        HANDS: ["highest-card",
                "one-pair",
                "two-pairs",
                "three-of-a-kind",
                "straight",
                "flush",
                "full-house",
                "four-of-a-kind",
                "straight-flush"],
        
        sortedByNumber: function(cardsCollection) {
            var sortedCards = _.sortBy(cardsCollection.models, function(card){
                                 return card.sequence;
                              });
            var firstCard = _.first(sortedCards);
            var lastCard = _.last(sortedCards);
            
            if ((firstCard.number == "A") && (lastCard.number == "K")) {
                
                var newCard = new Card(firstCard.code);
                
                newCard.sequence = lastCard.sequence + 1;
                
                sortedCards.push(newCard);
                sortedCards = _.tail(sortedCards);
            }
            
            return sortedCards;
        },
        
        isSequence: function(cardsCollection) {
            var sortedCards = this.sortedByNumber(cardsCollection);
            return (_.last(sortedCards).sequence - _.first(sortedCards).sequence) == (sortedCards.length -1);
        },
        
        suitGroups: function(cardsCollection) {
            return _.keys(_.groupBy(cardsCollection.models, function(card) {return card.suit;}));
        },
        
        numberGroups: function(cardsCollection) {
            var groups = _.groupBy(cardsCollection.models, function(card) {return card.number;});
            
            return _.map(_.keys(groups), function(key) {
                      return {key: key, cards: groups[key]};
                   });
        },
        
        maxCountCardsOnGroup: function(groups) {
            var maxGroup = _.max(groups, function(group){
                              return group.cards.length;
                           });
            return maxGroup.cards.length;
        },
        
        minCountCardsOnGroup: function(groups) {
            var minGroup = _.min(groups, function(group){
                              return group.cards.length;
                           });
            return minGroup.cards.length;
        },
        
        handName: function(cardsCollection) {
            
            var isSequence = this.isSequence(cardsCollection);
            
            var numberGroups = this.numberGroups(cardsCollection);
            
            var maxNumberCount = this.maxCountCardsOnGroup(numberGroups);
            
            var minNumberCount = this.minCountCardsOnGroup(numberGroups);
            
            var suitGroups = this.suitGroups(cardsCollection);
            
            var handName = "highest-card";
            
            if (suitGroups.length == 1) {
                if (isSequence) {
                    handName = "straight-flush";
                }
                else {
                    handName = "flush";
                }
            }
            else if ((numberGroups.length == 2) && (maxNumberCount == 4)) {
                handName = "four-of-a-kind";
            }
            else if ((numberGroups.length == 2) && (maxNumberCount == 3)) {
                handName = "full-house";
            }
            else if ((numberGroups.length == 3) && (maxNumberCount == 3)) {
                handName = "three-of-a-kind";
            }
            else if ((numberGroups.length == 3) && (maxNumberCount == 2) && (minNumberCount == 1)) {
                handName = "two-pairs";
            }
            else if ((numberGroups.length == 4) && (maxNumberCount == 2)) {
                handName = "one-pair";
            }
            else if (isSequence) {
                handName = "straight";
            }
            
            return handName;
        },
        
        handRanking: function(handName) {
            return this.HANDS.indexOf(handName);
        },
        
        cardsRanking: function(cardsCollection) {
            return this.handRanking(this.handName(cardsCollection));
        }
    });

    return HandEvaluator;
});