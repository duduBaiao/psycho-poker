define(['Backbone', 'model/Card'],
        function(Backbone, Card) {

    var CardsCollection = Backbone.Collection.extend({
        
        model: Card
    });

    return CardsCollection;
});