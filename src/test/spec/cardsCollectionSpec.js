define(['model/Card', 'model/CardsCollection'],
    function(Card, CardsCollection) {
    
    describe('CardsCollection', function() {
        
        var cards = new CardsCollection([new Card("7C"),
                                         new Card("4C"),
                                         new Card("AC")]);
        
        describe('sortedByNumber: 7C 4C AC', function() {
            
            var sortedCards = cards.sortedByNumber();
            
            it("A primeira carta deve ser um 'AC'", function() {
                expect(_.first(sortedCards).code).toBe("AC");
            });
            
            it("A segunda carta deve ser um '4C'", function() {
                expect(sortedCards[1].code).toBe("4C");
            });
            
            it("A última carta deve ser um '7C'", function() {
                expect(_.last(sortedCards).code).toBe("7C");
            });
        });
        
        describe('ranking', function() {
            
            it("A soma das cartas deve estar correta", function() {
                expect(cards.cardNumbersRanking()).toBe(9);
            });
        });
    });
});