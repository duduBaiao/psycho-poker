define(['utils/CardsParser'],
    function(CardsParser) {
    
    describe('CardsParser', function() {
        
        var cardsString = "TH JH QC QD QS QH KH AH 2S 6S";
        
        var cards = CardsParser.parse(cardsString);
        
        describe('Todas as cartas', function() {
            
            it("Deve conseguir obter 10 cartas no total", function() {
                
                expect(cards.length).toBe(10);
            });
            
            it("A primeira carta deve ser um 'TH'", function() {
                
                expect(_.first(cards.models).code).toBe("TH");
            });
            
            it("A última carta deve ser um '6S'", function() {
                
                expect(_.last(cards.models).code).toBe("6S");
            });
        });
        
        describe('Mão', function() {
            
            it("A mão deve ter ficado com 5 cartas", function() {
                
                expect(cards.fromHand().length).toBe(5);
            });
            
            it("A última carta da mão deve ser um 'QS'", function() {
                
                expect(_.last(cards.fromHand()).code).toBe("QS");
            });
        });
        
        describe('Mesa', function() {
            
            it("A mesa deve ter ficado com 5 cartas", function() {
                
                expect(cards.fromDeck().length).toBe(5);
            });
            
            it("A primeira carta da mesa deve ser um 'QH'", function() {
                
                expect(_.first(cards.fromDeck()).code).toBe("QH");
            });
        });
    });
});