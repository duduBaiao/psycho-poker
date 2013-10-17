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
            return _.sortBy(this.models, function(card){
                        return card.number;
                    });
        },
        
        handRanking: function() {
            return 0;
        },
        
        cardNumbersRanking: function() {
            return _.reduce(this.models,
                            function(memo, card) {
                                return memo += card.number;
                            },
                            0);
        },
        
        ranking: function() {
            return this.handRanking() + this.cardNumbersRanking();
        }
    });

    return CardsCollection;
});