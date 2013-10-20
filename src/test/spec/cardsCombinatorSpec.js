define(['utils/CardsCombinator'],
    function(CardsCombinator) {
    
    describe('CardsCombinator', function() {
        
        it("grupos de 4 cartas devem gerar 5 combinações ", function() {
            
            var combinations = new Array();
            CardsCombinator.collectCards(combinations, 4, 5);
            
            expect(combinations.length).toBe(5);
        });
        
        it("grupos de 3 cartas devem gerar 10 combinações ", function() {
            
            var combinations = new Array();
            CardsCombinator.collectCards(combinations, 3, 5);
            
            expect(combinations.length).toBe(10);
        });
        
        it("grupos de 2 cartas devem gerar 10 combinações ", function() {
            
            var combinations = new Array();
            CardsCombinator.collectCards(combinations, 2, 5);
            
            expect(combinations.length).toBe(10);
        });
        
        it("grupos de uma carta devem gerar 5 combinações ", function() {
            
            var combinations = new Array();
            CardsCombinator.collectCards(combinations, 1, 5);
            
            expect(combinations.length).toBe(5);
        });
    });
});