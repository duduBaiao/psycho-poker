define(['views/MainView'],
    function(MainView) {
    
    describe('MainView', function() {
        
        beforeEach(function() {
            this.gameCount = 8;
            this.mainView = new MainView().render();
            
            $("#sandbox").html(this.mainView.$el);
            
            this.mainView.$el.hide();
        });
        
        afterEach(function() {
            this.mainView.remove();
        });
        
        it("A view deve ter iniciado um jogo", function() {
            
            expect(this.mainView.currentGameIndex).toBe(0);
            
            expect(this.mainView.currentGame).toBeDefined();
        });
        
        it("Devem ter sido carregados todos os possíveis jogos", function() {
            
            expect(this.mainView.games.length).toBe(this.gameCount);
        });
        
        it("Ainda devem ter jogos a serem processados", function() {
            
            expect(this.mainView.allGamesProcessed()).toBeFalsy();
        });
        
        it("O botão de ação deve estar em seu estado inicial", function() {
            
            expect(this.mainView.$actionBtn.val()).toBe("Descobrir a melhor mão");
        });
        
        it("Deve detectar quando todos os jogos tiverem sido processados", function() {
            
            for (var i=0; i < (this.gameCount -1); i++) {
                
                runs(function() {
                    this.mainView.$actionBtn.trigger("click");
                });
                
                waitsFor(function() {
                    return this.mainView.gameProcessed;
                });
                
                runs(function() {
                    this.mainView.$actionBtn.trigger("click");
                });
                
                waitsFor(function() {
                    return (!this.mainView.gameProcessed);
                });
            }
            
            runs(function() {
                expect(this.mainView.allGamesProcessed()).toBeTruthy();
                
                expect(this.mainView.$actionBtn).toBeHidden();
            });
        });
        
        it("Devem haver 10 cartas na mesa", function() {
            
            expect(this.mainView.$(".card").length).toBe(10);
        });
    });
});