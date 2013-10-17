define(['model/Card', 'model/CardsCollection'],
    function(Card, CardsCollection) {
    
    describe('CardsCollection', function() {
        
        describe('Sequências', function() {
            
            var noSequenceCards = new CardsCollection([new Card("7C"),
                                                       new Card("4C"),
                                                       new Card("AC")]);
            var sortedCards = noSequenceCards.sortedByNumber();
            
            var sequenceCards = new CardsCollection([new Card("KC"),
                                                     new Card("QC"),
                                                     new Card("JC"),
                                                     new Card("TC"),
                                                     new Card("9C")]);
            
            describe('sortedByNumber', function() {
                
                it("A primeira carta deve ser um 'AC'", function() {
                    expect(_.first(sortedCards).code).toBe("AC");
                });
                
                it("A segunda carta deve ser um '4C'", function() {
                    expect(sortedCards[1].code).toBe("4C");
                });
                
                it("A última carta deve ser um '7C'", function() {
                    expect(_.last(sortedCards).code).toBe("7C");
                });
            });
            
            describe('isSequence', function() {
                
                it("As cartas não devem formar uma sequência", function() {
                    expect(noSequenceCards.isSequence()).toBeFalsy();
                });
                
                it("As cartas devem formar uma sequência", function() {
                    expect(sequenceCards.isSequence()).toBeTruthy();
                });
                
                var royalCards = new CardsCollection([new Card("AC"),
                                                      new Card("TC"),
                                                      new Card("JC"),
                                                      new Card("QC"),
                                                      new Card("KC")]);
                
                it("Deve conseguir detectar uma sequência que termine em 'A'", function() {
                    expect(royalCards.isSequence()).toBeTruthy();
                });
            });
        });
        
        describe('handName', function() {
            
            describe('straight-flush: TH JH QH KH AH', function() {
                
                var cards = new CardsCollection([new Card("TH"),
                                                 new Card("JH"),
                                                 new Card("QH"),
                                                 new Card("KH"),
                                                 new Card("AH")]);
                
                it("As cartas devem formar um straight-flush", function() {
                    expect(cards.handName()).toBe("straight-flush");
                });
                
                it("O ranking da mão deve estar correto", function() {
                    expect(cards.handRanking()).toBe(8);
                });
            });
            
            describe('four-of-a-kind: AH AC AD AS TH', function() {
                
                var cards = new CardsCollection([new Card("AH"),
                                                 new Card("AC"),
                                                 new Card("AD"),
                                                 new Card("AS"),
                                                 new Card("TH")]);
                
                it("As cartas devem formar um four-of-a-kind", function() {
                    expect(cards.handName()).toBe("four-of-a-kind");
                });
                
                it("O ranking da mão deve estar correto", function() {
                    expect(cards.handRanking()).toBe(7);
                });
            });
            
            describe('full-house: AH AC AD KH KC', function() {
                
                var cards = new CardsCollection([new Card("AH"),
                                                 new Card("AC"),
                                                 new Card("AD"),
                                                 new Card("KH"),
                                                 new Card("KC")]);
                
                it("As cartas devem formar um full-house", function() {
                    expect(cards.handName()).toBe("full-house");
                });
                
                it("O ranking da mão deve estar correto", function() {
                    expect(cards.handRanking()).toBe(6);
                });
            });
            
            describe('flush: AH TH 8H 5H 2H', function() {
                
                var cards = new CardsCollection([new Card("AH"),
                                                 new Card("TH"),
                                                 new Card("8H"),
                                                 new Card("5H"),
                                                 new Card("2H")]);
                
                it("As cartas devem formar um flush", function() {
                    expect(cards.handName()).toBe("flush");
                });
                
                it("O ranking da mão deve estar correto", function() {
                    expect(cards.handRanking()).toBe(5);
                });
            });
            
            describe('straight: 5H 4C 3D 2S AH', function() {
                
                var cards = new CardsCollection([new Card("5H"),
                                                 new Card("4C"),
                                                 new Card("3D"),
                                                 new Card("2S"),
                                                 new Card("AH")]);
                
                it("As cartas devem formar um straight", function() {
                    expect(cards.handName()).toBe("straight");
                });
                
                it("O ranking da mão deve estar correto", function() {
                    expect(cards.handRanking()).toBe(4);
                });
            });
            
            describe('three-of-a-kind: TH TC TD 5H 3C', function() {
                
                var cards = new CardsCollection([new Card("TH"),
                                                 new Card("TC"),
                                                 new Card("TD"),
                                                 new Card("5H"),
                                                 new Card("3C")]);
                
                it("As cartas devem formar um three-of-a-kind", function() {
                    expect(cards.handName()).toBe("three-of-a-kind");
                });
                
                it("O ranking da mão deve estar correto", function() {
                    expect(cards.handRanking()).toBe(3);
                });
            });
            
            describe('two-pairs: AH AC KH KC 5C', function() {
                
                var cards = new CardsCollection([new Card("AH"),
                                                 new Card("AC"),
                                                 new Card("KH"),
                                                 new Card("KC"),
                                                 new Card("5C")]);
                
                it("As cartas devem formar um two-pairs", function() {
                    expect(cards.handName()).toBe("two-pairs");
                });
                
                it("O ranking da mão deve estar correto", function() {
                    expect(cards.handRanking()).toBe(2);
                });
            });
            
            describe('one-pair: AH AC 6H 4H 2D', function() {
                
                var cards = new CardsCollection([new Card("AH"),
                                                 new Card("AC"),
                                                 new Card("6H"),
                                                 new Card("4H"),
                                                 new Card("2D")]);
                
                it("As cartas devem formar um one-pair", function() {
                    expect(cards.handName()).toBe("one-pair");
                });
                
                it("O ranking da mão deve estar correto", function() {
                    expect(cards.handRanking()).toBe(1);
                });
            });
            
            describe('highest-card: AH 9C 6D 4S 2H', function() {
                
                var cards = new CardsCollection([new Card("AH"),
                                                 new Card("9C"),
                                                 new Card("6D"),
                                                 new Card("4S"),
                                                 new Card("2H")]);
                
                it("As cartas devem formar um highest-card", function() {
                    expect(cards.handName()).toBe("highest-card");
                });
                
                it("O ranking da mão deve estar correto", function() {
                    expect(cards.handRanking()).toBe(0);
                });
            });
        });
    });
});