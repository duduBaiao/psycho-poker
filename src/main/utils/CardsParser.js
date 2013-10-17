define(['Backbone', 'utils/ParsedCardsCollection', 'model/Card'],
        function(Backbone, ParsedCardsCollection, Card) {

    var CardsParser = Backbone.Model.extend({},
    {
        parse: function(cardsString) {
            var cardsArray = [];
            
            _.each(cardsString.split(" "), function(cardCode) {
                cardsArray.push(new Card(cardCode));
            });
            
            return new ParsedCardsCollection(cardsArray);
        }
    });

    return CardsParser;
});