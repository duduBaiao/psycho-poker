define(['Backbone'],
        function(Backbone) {

    var CardsCombinator = Backbone.Model.extend({},
    {
        isNewCombination: function(combinations, sortedCards) {
            var cards = sortedCards.join("");
            
            for (var c=0; c < combinations.length; c++) {
                if (combinations[c].join("") == cards) {
                    return false;
                }
            }
            return true;
        },
        
        collectCombinations: function(
            combinations,
            numberOfCards,
            totalDeck,
            cards,
            startIndex,
            cardsUsed) {
            
            cardsUsed = cardsUsed || new Array();
            startIndex = startIndex || 0;
            
            if (startIndex == cards.length) {
                
                var sortedCards = cards.slice(0).sort();
                
                if (this.isNewCombination(combinations, sortedCards)) {
                    combinations.push(sortedCards);
                }
            }
            else {
                for (var i=0; i < totalDeck; i++) {
                    
                    if (cardsUsed.indexOf(i) == -1) {
                        
                        cards[startIndex] = i;
                        cardsUsed.push(i);
                        
                        this.collectCombinations(
                            combinations,
                            numberOfCards,
                            totalDeck,
                            cards,
                            startIndex + 1,
                            cardsUsed);
                        
                        cardsUsed.splice(cardsUsed.indexOf(i), 1);
                    }
                }
            }
        },
        
        generate: function(numberOfCards, totalDeck) {
            var combinations = new Array();
            
            this.collectCombinations(
                combinations,
                numberOfCards,
                totalDeck,
                new Array(numberOfCards));
            
            return combinations;
        }
    });

    return CardsCombinator;
});