define(['model/Card', 'model/CardsCollection'],
    function(Card, CardsCollection) {
    
    describe('CardsCollection', function() {
        
        var sortedCards =
            (new CardsCollection([new Card("7C"),
                                  new Card("4C"),
                                  new Card("AC")])).sortedByNumber();
        
        describe('sortedByNumber: 7C, 4C, AC -> AC, 4C, 7C', function() {
            
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
    });
});