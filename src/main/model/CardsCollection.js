define(['Backbone', 'model/Card'],
        function(Backbone, Card) {

    var CardsCollection = Backbone.Collection.extend({
        
        model: Card,
        
        sortedByNumber: function() {
            return _.sortBy(this.models, function(card){
                        return card.number;
                    });
        }
    });

    return CardsCollection;
});