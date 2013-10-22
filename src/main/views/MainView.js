define(['Backbone', 'utils/CardsParser', 'model/CardsCollection', 'model/Game',
        'text!templates/main.html'],
        function(Backbone, CardsParser, CardsCollection, Game, mainTemplate) {
    
    var MainView = Backbone.View.extend({
        
        games: ["TH JH QC QD QS QH KH AH 2S 6S",
                "2H 2S 3H 3S 3C 2D 3D 6C 9C TH",
                "2H AD 5H AC 7H AH 6H 9H 4H 3C",
                "AC 2D 9C 3S KD 5S 4D KS AS 4C",
                "KS AH 2H 3C 4H KC 2C TC 2D AS",
                "AH 2C 9S AD 3C QH KS JS JD KD",
                "6C 9C 8C 2D 7C 2H TC 4C 9S AH",
                "3D 5S 2H QD TD 6S KH 9H AD QH"],
        
        events: {
            'click #action-btn': 'executeAction',
        },
        
        initialize: function() {
            this.currentGameIndex = -1;
            
            this.proxedOnResized = $.proxy(this.onResized, this);
            $(window).bind('resize', this.proxedOnResized);
        },
        
        render: function() {
            this.$el.html(_.template(mainTemplate));
            
            this.adjustSize();
            
            this.startNextGame();
            
            return this;
        },
        
        allGamesProcessed: function() {
            return (this.currentGameIndex == (this.games.length -1));
        },
        
        startNextGame: function() {
            this.currentGameIndex++;
            this.gameProcessed = false;
            
            var cards = CardsParser.parse(this.games[this.currentGameIndex]);
            
            this.currentGame = new Game(cards);
            
            this.displayCards();
        },
        
        updateActionButton: function() {
            
            if (this.allGamesProcessed()) {
                this.$("#action-btn").hide();
            }
            else {
                this.$("#action-btn").val(
                    !this.gameProcessed ?
                    "Descobrir a melhor mão":
                    "Carregar próximo jogo");
            }
        },
        
        displayCards: function() {
            
            this.updateActionButton();
        },
        
        processGame: function() {
            this.gameProcessed = true;
            this.updateActionButton();
        },
        
        executeAction: function() {
            if (!this.gameProcessed) {
                this.processGame();
            }
            else {
                this.startNextGame();
            }
        },
        
        adjustSize: function() {
            var cardRowsHeight = Utils.screen.height() * 0.8;
            this.$("#card-rows").outerHeight(cardRowsHeight);
            this.$("#footer").outerHeight(Utils.screen.height() - cardRowsHeight);
        },
        
        onResized: function() {
            this.adjustSize();
        },
        
        remove: function() {
            $(window).unbind('resize', this.proxedOnResized);
            Backbone.View.prototype.remove.call(this);
        }
    });

    return MainView;
});