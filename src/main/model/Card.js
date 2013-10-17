define(['Backbone'],
        function(Backbone) {
    
    var Card = Backbone.Model.extend({
        
        CARDS: "A23456789TJQK",
        
        initialize: function(cardCode) {
            this.code = cardCode;
            
            this.number = cardCode.slice(0,1);
            this.suit = cardCode.slice(1,2);
            
            this.sequence = this.CARDS.indexOf(this.number);
        }
    });

    return Card;
});