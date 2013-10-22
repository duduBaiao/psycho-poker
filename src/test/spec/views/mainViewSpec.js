define(['views/MainView'],
    function(MainView) {
    
    describe('MainView', function() {
        
        beforeEach(function() {
            this.gameCount = 8;
            this.mainView = new MainView().render();
            
            $("#sandbox").html(this.mainView.$el);
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
            
            expect(this.mainView.$("#action-btn")).toBeVisible();
            
            expect(this.mainView.$("#action-btn").val()).toBe("Descobrir a melhor mão");
        });
        
        it("Deve detectar quando todos os jogos tiverem sido processados", function() {
            
            for (var i=0; i < (this.gameCount -1); i++) {
                
                runs(function() {
                    this.mainView.$("#action-btn").trigger("click");
                });
                
                waitsFor(function() {
                    return this.mainView.gameProcessed;
                });
                
                runs(function() {
                    this.mainView.$("#action-btn").trigger("click");
                });
                
                waitsFor(function() {
                    return (!this.mainView.gameProcessed);
                });
            }
            
            runs(function() {
                expect(this.mainView.allGamesProcessed()).toBeTruthy();
                
                expect(this.mainView.$("#action-btn")).toBeHidden();
            });
        });
    });
});