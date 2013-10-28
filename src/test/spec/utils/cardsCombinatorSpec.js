define(['utils/CardsCombinator'],
    function(CardsCombinator) {
    
    describe('CardsCombinator', function() {
        
        it("grupos de 4 cartas devem gerar 5 combinações únicas", function() {
            
            expect(CardsCombinator.generate(_.range(5), 4).length).toBe(5);
        });
        
        it("grupos de 3 cartas devem gerar 10 combinações únicas", function() {
            
            expect(CardsCombinator.generate(_.range(5), 3).length).toBe(10);
        });
        
        it("grupos de 2 cartas devem gerar 10 combinações únicas", function() {
            
            expect(CardsCombinator.generate(_.range(5), 2).length).toBe(10);
        });
        
        it("grupos de uma carta devem gerar 5 combinações únicas", function() {
            
            expect(CardsCombinator.generate(_.range(5), 1).length).toBe(5);
        });
    });
});