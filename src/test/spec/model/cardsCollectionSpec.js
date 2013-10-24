define(['model/Card', 'model/CardsCollection'],
    function(Card, CardsCollection) {
    
    describe('CardsCollection', function() {
        
        var hand = new CardsCollection([new Card("AC"), new Card("2C"), new Card("3C")]);
        
        it("Deve encontrar uma carta na coleção", function() {
            
            expect(hand.hasCard(new Card("3C"))).toBeTruthy();
        });
        
        it("Não deve encontrar uma carta na coleção", function() {
            
            expect(hand.hasCard(new Card("4C"))).toBeFalsy();
        });
        
        it("Deve encontrar a carta na sequência certa", function() {
            
            expect(hand.cardSequence(new Card("AC"))).toBe(0);
            expect(hand.cardSequence(new Card("2C"))).toBe(1);
            expect(hand.cardSequence(new Card("3C"))).toBe(2);
        });
    });
});