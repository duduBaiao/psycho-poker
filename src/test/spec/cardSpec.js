define(['model/Card'],
    function(Card) {
    
    describe('Card', function() {
        
        it("O número extraído do código da carta deve estar correto", function() {
            
            expect((new Card("AC")).number).toBe(0);
            expect((new Card("2C")).number).toBe(1);
            expect((new Card("3C")).number).toBe(2);
            expect((new Card("4C")).number).toBe(3);
            expect((new Card("5C")).number).toBe(4);
            expect((new Card("6C")).number).toBe(5);
            expect((new Card("7C")).number).toBe(6);
            expect((new Card("8C")).number).toBe(7);
            expect((new Card("9C")).number).toBe(8);
            expect((new Card("TC")).number).toBe(9);
            expect((new Card("JC")).number).toBe(10);
            expect((new Card("QC")).number).toBe(11);
            expect((new Card("KC")).number).toBe(12);
        });
        
        it("O naipe extraído do código da carta deve estar correto", function() {
            
            expect((new Card("AC")).suit).toBe("C");
            expect((new Card("AD")).suit).toBe("D");
            expect((new Card("AS")).suit).toBe("S");
            expect((new Card("AH")).suit).toBe("H");
        });
    });
});