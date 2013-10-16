define(['Backbone', 'model/Card'],
        function(Backbone, Card) {

    var ParsedCardsCollection = Backbone.Collection.extend({
        
        model: Card,
        
        fromHand: function() {
            return this.slice(0, 5);
        },
        
        fromDeck: function() {
            return this.slice(5, 10);
        }
    },
    {
    });

    return ParsedCardsCollection;
});