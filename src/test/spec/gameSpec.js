define(['utils/CardsParser', 'model/Hand', 'model/Deck', 'model/Game'],
    function(CardsParser, Hand, Deck, Game) {
    
    describe('Game', function() {
        
        it("A melhor jogada deve ser um 'straight-flush'", function() {
            
            var cards = CardsParser.parse("TH JH QC QD QS QH KH AH 2S 6S");
            
            var hand = new Hand(cards.fromHand());
            var deck = new Deck(cards.fromDeck());
            
            var game = new Game(hand, deck);
            
            expect(game.bestGame()).toBe("straight-flush");
        });
    });
});