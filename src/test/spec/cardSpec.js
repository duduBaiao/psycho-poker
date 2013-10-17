define(['model/Card'],
    function(Card) {
    
    describe('Card', function() {
        
        it("O número de sequência extraído do código da carta deve estar correto", function() {
            
            expect((new Card("AC")).sequence).toBe(0);
            expect((new Card("2C")).sequence).toBe(1);
            expect((new Card("3C")).sequence).toBe(2);
            expect((new Card("4C")).sequence).toBe(3);
            expect((new Card("5C")).sequence).toBe(4);
            expect((new Card("6C")).sequence).toBe(5);
            expect((new Card("7C")).sequence).toBe(6);
            expect((new Card("8C")).sequence).toBe(7);
            expect((new Card("9C")).sequence).toBe(8);
            expect((new Card("TC")).sequence).toBe(9);
            expect((new Card("JC")).sequence).toBe(10);
            expect((new Card("QC")).sequence).toBe(11);
            expect((new Card("KC")).sequence).toBe(12);
        });
        
        it("O naipe extraído do código da carta deve estar correto", function() {
            
            expect((new Card("AC")).suit).toBe("C");
            expect((new Card("AD")).suit).toBe("D");
            expect((new Card("AS")).suit).toBe("S");
            expect((new Card("AH")).suit).toBe("H");
        });
    });
});