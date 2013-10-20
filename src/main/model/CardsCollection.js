define(['Backbone', 'model/Card', 'utils/HandEvaluator'],
        function(Backbone, Card, HandEvaluator) {

    var CardsCollection = Backbone.Collection.extend({
        
        model: Card,
        
        name: function() {
            return HandEvaluator.handName(this);
        }
    });

    return CardsCollection;
});