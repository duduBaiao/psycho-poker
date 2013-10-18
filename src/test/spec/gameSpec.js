define(['utils/CardsParser', 'model/CardsCollection', 'model/Game'],
    function(CardsParser, CardsCollection, Game) {
    
    describe('Game', function() {
        
        it("A melhor jogada deve ser um 'straight-flush'", function() {
            
            var cards = CardsParser.parse("TH JH QC QD QS QH KH AH 2S 6S");
            
            var hand = new CardsCollection(cards.fromHand());
            var deck = new CardsCollection(cards.fromDeck());
            
            var game = new Game(hand, deck);
            
            expect(game.bestGame()).toBe("straight-flush");
        });
    });
});