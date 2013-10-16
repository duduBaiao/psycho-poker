define(['Backbone'],
        function(Backbone) {
    
    var Card = Backbone.Model.extend({
        
        initialize: function(cardCode) {
            this.code = cardCode;
        }
    });

    return Card;
});