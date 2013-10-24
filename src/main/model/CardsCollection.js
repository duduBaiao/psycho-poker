define(['Backbone', 'model/Card', 'utils/HandEvaluator'],
        function(Backbone, Card, HandEvaluator) {

    var CardsCollection = Backbone.Collection.extend({
        
        model: Card,
        
        name: function() {
            return HandEvaluator.handName(this);
        },
        
        foundCard: function(searchingCard) {
            return _.find(this.models, function(card) {
                            return card.code == searchingCard.code;
                        });
        },
        
        cardSequence: function(searchingCard) {
            return _.indexOf(this.models, this.foundCard(searchingCard));
        },
        
        hasCard: function(searchingCard) {
            return typeof this.foundCard(searchingCard) != "undefined";
        }
    });

    return CardsCollection;
});