define(['Backbone', 'utils/CardsParser', 'model/CardsCollection', 'model/Game',
        'views/CardView',
        'text!templates/main.html'],
        function(Backbone, CardsParser, CardsCollection, Game,
                 CardView,
                 mainTemplate) {
    
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
            
            this.cards = new Array(10);
        },
        
        render: function() {
            this.$el.html(_.template(mainTemplate));
            
            this.$cardsContainer = this.$("#cards-container");
            this.$actionBtn = this.$("#action-btn");
            this.$footer = this.$("#footer");
            
            this.startNextGame();
            
            return this;
        },
        
        allGamesProcessed: function() {
            return (this.currentGameIndex == (this.games.length -1));
        },
        
        startNextGame: function() {
            this.currentGameIndex++;
            this.gameProcessed = false;
            
            var parsedCards = CardsParser.parse(this.games[this.currentGameIndex]);
            
            this.currentGame = new Game(parsedCards);
            
            this.loadCards();
            
            this.adjustSizeAndPosition();
            
            this.updateActionButton();
        },
        
        loadCards: function() {
            var index = 0;
            
            var allCards = this.currentGame.allCards();
            
            for (var row=0; row < 2; row++) {
                for (var column=0; column < 5; column++) {
                    
                    var cardView = this.cards[index];
                    
                    var cardValues = {card: allCards[index], row: row, column: column};
                    
                    if (!cardView) {
                        cardView = new CardView(cardValues);
                        this.cards[index] = cardView;
                        
                        this.$cardsContainer.append(cardView.render().$el);
                    }
                    else {
                        cardView.update(cardValues);
                    }
                    
                    index++;
                }
            }
        },
        
        processGame: function() {
            this.gameProcessed = true;
            this.updateActionButton();
            
            // alert("O melhor jogo é um " + this.currentGame.bestHand().name());
        },
        
        updateActionButton: function() {
            
            if (this.allGamesProcessed()) {
                this.$actionBtn.hide();
            }
            else {
                this.$actionBtn.val(
                    !this.gameProcessed ?
                    "Descobrir a melhor mão":
                    "Carregar próximo jogo");
            }
        },
        
        executeAction: function() {
            if (!this.gameProcessed) {
                this.processGame();
            }
            else {
                this.startNextGame();
            }
        },
        
        adjustSizeAndPosition: function() {
            var cardRowsHeight = Utils.screen.height() * 0.85;
            
            this.$cardsContainer.outerHeight(cardRowsHeight);
            this.$footer.outerHeight(Utils.screen.height() - cardRowsHeight);
            
            var cardHeight = cardRowsHeight * 0.4;
            var cardWidth = cardHeight * 0.74489796;
            
            var verticalSpace = cardRowsHeight * 0.2 / 3;
            var horizontalSpace = cardWidth * 0.1;
            
            var leftMargin = (Utils.screen.width() - (5 * cardWidth) - (4 * horizontalSpace)) / 2.0;
            
            _.each(this.cards, function(cardView) {
                
                cardView.$el.css({
                    height: cardHeight,
                    width: cardWidth,
                    transform: 'translate3d(' +
                        ((cardView.column * (cardWidth + horizontalSpace)) + leftMargin) + 'px,' +
                        ((cardView.row * (cardHeight + verticalSpace)) + verticalSpace) + 'px,' +
                        '0px)',
                    "background-size": (cardWidth * 13) + 'px',
                    "background-position":
                        (cardView.card.numberPosition * cardWidth * -1) + 'px ' +
                        (cardView.card.suitPosition * cardHeight * -1) + 'px'
                    });
            });
        },
        
        onResized: function() {
            this.adjustSizeAndPosition();
        },
        
        remove: function() {
            $(window).unbind('resize', this.proxedOnResized);
            Backbone.View.prototype.remove.call(this);
        }
    });

    return MainView;
});