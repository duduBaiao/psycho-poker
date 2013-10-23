define(['Backbone'],
        function(Backbone) {
    
    var CardView = Backbone.View.extend({
        
        update: function(values) {
            this.card = values.card;
            
            this.row = values.row;
            this.column = values.column;
            
            this.$el.css("background-image", "url(img/" + this.card.code + ".png)");
        },
        
        initialize: function(values) {
            this.update(values);
        },
        
        render: function() {
            this.$el.addClass("card");
            
            return this;
        }
    });

    return CardView;
});