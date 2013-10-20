define(['utils/CardsCombinator'],
    function(CardsCombinator) {
    
    describe('CardsCombinator', function() {
        
        it("grupos de 4 cartas devem gerar 5 combinações únicas", function() {
            
            expect(CardsCombinator.generate(4, 5).length).toBe(5);
        });
        
        it("grupos de 3 cartas devem gerar 10 combinações únicas", function() {
            
            expect(CardsCombinator.generate(3, 5).length).toBe(10);
        });
        
        it("grupos de 2 cartas devem gerar 10 combinações únicas", function() {
            
            expect(CardsCombinator.generate(2, 5).length).toBe(10);
        });
        
        it("grupos de uma carta devem gerar 5 combinações únicas", function() {
            
            expect(CardsCombinator.generate(1, 5).length).toBe(5);
        });
    });
});