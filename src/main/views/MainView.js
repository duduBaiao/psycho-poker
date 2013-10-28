define(['Backbone', 'utils/CardsParser', 'utils/HandEvaluator',
        'model/CardsCollection', 'model/Game',
        'views/CardView',
        'text!templates/main.html'],
        function(Backbone, CardsParser, HandEvaluator,
                 CardsCollection, Game,
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
        
        HAND_ROW: 0,
        DECK_ROW: 1,
        COLUMNS_COUNT: 5,
        
        ANIMATION_TIME: 1.2,
        
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
        
        startNextGame: function() {
            this.currentGameIndex++;
            this.gameProcessed = false;
            
            var parsedCards = CardsParser.parse(this.games[this.currentGameIndex]);
            
            this.currentGame = new Game(parsedCards);
            
            this.loadCards();
            
            this.adjustSizeAndPosition();
            
            this.updateActionButton();
            
            this.showAllCards();
        },
        
        loadCards: function() {
            var index = 0;
            
            var allCards = this.currentGame.allCards();
            
            for (var row=this.HAND_ROW; row <= this.DECK_ROW; row++) {
                for (var column=0; column < this.COLUMNS_COUNT; column++) {
                    
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
                    
                    cardView.status = CardView.STATUS_HIDDEN;
                    
                    index++;
                }
            }
        },
        
        adjustSizeAndPosition: function() {
            var cardRowsHeight = Utils.screen.height() * 0.80;
            
            this.$cardsContainer.outerHeight(cardRowsHeight);
            this.$footer.outerHeight(Utils.screen.height() - cardRowsHeight);
            
            this.repositionCards();
        },
        
        repositionCards: function(animated) {
            animated = animated && this.$el.is(":visible");
            
            var cardRowsHeight = this.$cardsContainer.outerHeight();
            
            var cardHeight = cardRowsHeight * 0.4;
            var cardWidth = cardHeight * 0.74489796;
            
            var verticalSpace = cardRowsHeight * 0.2 / 3;
            var horizontalSpace = cardWidth * 0.1;
            
            var leftMargin = (Utils.screen.width() - (5 * cardWidth) - (4 * horizontalSpace)) / 2.0;
            
            var that = this;
            
            _.each(this.cards, function(cardView) {
                
                var posX = ((cardView.column * (cardWidth + horizontalSpace)) + leftMargin);
                var posY = ((cardView.row * (cardHeight + verticalSpace)) + verticalSpace);
                
                if (cardView.status == CardView.STATUS_HIDDEN) {
                    posX = Utils.screen.width() + 10;
                }
                else if (cardView.status == CardView.STATUS_DISCARDED) {
                    if (cardView.row == that.HAND_ROW) {
                        posY = (cardHeight + 10) * -1;
                    }
                    else {
                        posY = Utils.screen.height() + 10;
                    }
                }
                else if (cardView.status == CardView.STATUS_PROCESSED) {
                    posX = (((cardWidth + horizontalSpace) * (that.COLUMNS_COUNT - cardView.column)) + 10) * -1;
                }
                
                cardView.$el.css({
                    height: cardHeight,
                    width: cardWidth,
                    "transition-duration": (animated ? that.ANIMATION_TIME : 0) + "s",
                    transform: 'translate3d(' + posX + 'px,' + posY + 'px, 0px)',
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
        
        updateAllCardsStatus: function(status) {
            _.each(this.cards, function(cardView) {
                cardView.status = status;
            });
        },
        
        showAllCards: function() {
            this.updateAllCardsStatus(CardView.STATUS_VISIBLE);
            
            this.repositionCards(true);
        },
        
        allCardsProcessed: function() {
            this.updateAllCardsStatus(CardView.STATUS_PROCESSED);
            
            this.repositionCards(true);
        },
        
        hideAllCards: function() {
            this.updateAllCardsStatus(CardView.STATUS_HIDDEN);
            
            this.repositionCards();
        },
        
        processGame: function() {
            var bestHand = this.currentGame.bestHand();
            
            var sortedCards = HandEvaluator.sortedByNumber(bestHand);
            
            bestHand = new CardsCollection(sortedCards);
            
            var that = this;
            
            var bestCardViews = [];
            var discardedCardViews = [];
            
            _.each(this.cards, function(cardView) {
                if (!bestHand.hasCard(cardView.card)) {
                    cardView.status = CardView.STATUS_DISCARDED;
                    
                    discardedCardViews.push(cardView);
                }
                else {
                    bestCardViews.push(cardView);
                }
            });
            
            this.gameProcessed = true;
            this.updateActionButton();
            
            this.repositionCards(true);
            
            setTimeout(function() {
                
                _.each(discardedCardViews, function(cardView) {
                    cardView.status = CardView.STATUS_PROCESSED;
                });
                
                that.repositionCards();
                
                _.each(bestCardViews, function(cardView) {
                    cardView.row = that.HAND_ROW;
                    cardView.column = bestHand.cardSequence(cardView.card);
                });
                
                that.repositionCards(true);
                
            }, (this.ANIMATION_TIME + 0.1) * 1000);
        },
        
        allGamesProcessed: function() {
            return this.gameProcessed && (this.currentGameIndex == (this.games.length -1));
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
        
        executeAction: function(event) {
            
            if (!this.gameProcessed) {
                this.processGame();
            }
            else {
                event.currentTarget.enabled = false;
                
                this.allCardsProcessed();
                
                var that = this;
                
                setTimeout(function() {
                    that.hideAllCards();
                    
                    that.startNextGame();
                    
                    event.currentTarget.enabled = true;
                    
                }, (this.ANIMATION_TIME + 0.1) * 1000);
            }
        },
        
        remove: function() {
            $(window).unbind('resize', this.proxedOnResized);
            Backbone.View.prototype.remove.call(this);
        }
    });

    return MainView;
});