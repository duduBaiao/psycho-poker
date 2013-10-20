define(['utils/CardsParser', 'model/CardsCollection', 'model/Game'],
    function(CardsParser, CardsCollection, Game) {
    
    describe('Game', function() {
        
        var bestHandName = function(logLine) {
            
            var cards = CardsParser.parse(logLine);
            
            var hand = new CardsCollection(cards.fromHand());
            var deck = new CardsCollection(cards.fromDeck());
            
            var game = new Game(hand, deck);
            
            return game.bestHand().name();
        }
        
        it("A melhor jogada deve ser um 'straight-flush'", function() {
            
            expect(bestHandName("TH JH QC QD QS QH KH AH 2S 6S")).toBe("straight-flush");
        });
        
        it("A melhor jogada deve ser um 'four-of-a-kind'", function() {
            
            expect(bestHandName("2H 2S 3H 3S 3C 2D 3D 6C 9C TH")).toBe("four-of-a-kind");
        });
        
        it("A melhor jogada deve ser um 'full-house'", function() {
            
            expect(bestHandName("2H 2S 3H 3S 3C 2D 9C 3D 6C TH")).toBe("full-house");
        });
        
        it("A melhor jogada deve ser um 'flush'", function() {
            
            expect(bestHandName("2H AD 5H AC 7H AH 6H 9H 4H 3C")).toBe("flush");
        });
        
        it("A melhor jogada deve ser um 'straight'", function() {
            
            expect(bestHandName("AC 2D 9C 3S KD 5S 4D KS AS 4C")).toBe("straight");
        });
        
        it("A melhor jogada deve ser um 'three-of-a-kind'", function() {
            
            expect(bestHandName("KS AH 2H 3C 4H KC 2C TC 2D AS")).toBe("three-of-a-kind");
        });
        
        it("A melhor jogada deve ser um 'two-pairs'", function() {
            
            expect(bestHandName("AH 2C 9S AD 3C QH KS JS JD KD")).toBe("two-pairs");
        });
        
        it("A melhor jogada deve ser um 'one-pair'", function() {
            
            expect(bestHandName("6C 9C 8C 2D 7C 2H TC 4C 9S AH")).toBe("one-pair");
        });
        
        it("A melhor jogada deve ser um 'highest-card'", function() {
            
            expect(bestHandName("3D 5S 2H QD TD 6S KH 9H AD QH")).toBe("highest-card");
        });
    });
});