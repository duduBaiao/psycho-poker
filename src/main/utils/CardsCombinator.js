define(['Backbone'],
        function(Backbone) {

    var CardsCombinator = Backbone.Model.extend({},
    {
        generate: function(cards, numberOfCards) {
            var i,
            subI,
            sub,
            combinedCards = [],
            nextCards;
            
            for (i = 0; i < cards.length; i++) {
                
                if (numberOfCards === 1){
                    combinedCards.push([ cards[i] ]);
                }
                else {
                    sub = this.generate(cards.slice(i+1, cards.length), numberOfCards-1);
                    
                    for (subI = 0; subI < sub.length; subI++) {
                        nextCards = sub[subI];
                        nextCards.unshift(cards[i]);
                        combinedCards.push(nextCards);
                    }
                }
            }
            
            return combinedCards;
        }
    });

    return CardsCombinator;
});