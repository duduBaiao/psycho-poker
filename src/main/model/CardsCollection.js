define(['Backbone', 'model/Card'],
        function(Backbone, Card) {

    var CardsCollection = Backbone.Collection.extend({
        
        model: Card,
        
        HANDS: ["highest-card",
                "one-pair",
                "two-pairs",
                "three-of-a-kind",
                "straight",
                "flush",
                "full-house",
                "four-of-a-kind",
                "straight-flush"],
        
        sortedByNumber: function() {
            var sortedCards = _.sortBy(this.models, function(card){
                                 return card.sequence;
                              });
            var firstCard = _.first(sortedCards);
            var lastCard = _.last(sortedCards);
            
            if ((firstCard.number == "A") && (lastCard.number == "K")) {
                
                var newCard = _.clone(firstCard);
                newCard.sequence = lastCard.sequence + 1;
                
                sortedCards.push(newCard);
                sortedCards = _.tail(sortedCards);
            }
            
            return sortedCards;
        },
        
        isSequencedCardsArray: function(sortedCards) {
            return (_.last(sortedCards).sequence - _.first(sortedCards).sequence) == (sortedCards.length -1);
        },
        
        isSequence: function() {
            return this.isSequencedCardsArray(this.sortedByNumber());
        },
        
        suitGroups: function() {
            return _.keys(_.groupBy(this.models, function(card) {return card.suit;}));
        },
        
        numberGroups: function() {
            var groups = _.groupBy(this.models, function(card) {return card.number;});
            
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
        
        handName: function() {
            var sortedCards = this.sortedByNumber();
            
            var isSequence = this.isSequencedCardsArray(sortedCards);
            
            var numberGroups = this.numberGroups();
            
            var maxNumberCount = this.maxCountCardsOnGroup(numberGroups);
            
            var minNumberCount = this.minCountCardsOnGroup(numberGroups);
            
            var suitGroups = this.suitGroups();
            
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
        
        handRanking: function() {
            return (this.HANDS.indexOf(this.handName()) + 1) * 100;
        },
        
        cardsWeightSum: function() {
            return _.reduce(this.models,
                            function(memo, card) {
                                return memo += card.weight;
                            },
                            0);
        },
        
        finalRanking: function() {
            return this.handRanking() + this.cardsWeightSum();
        }
    });

    return CardsCollection;
});