define(['Backbone'],
        function(Backbone) {
    
    var Card = Backbone.Model.extend({
        
        CARDS_NUMBER: "A23456789TJQK",
        
        initialize: function(cardCode) {
            this.code = cardCode;
            this.number = this.CARDS_NUMBER.indexOf(cardCode.slice(0,1));
            this.suit = cardCode.slice(1,2);
        }
    });

    return Card;
});