define(['Backbone'],
        function(Backbone) {
    
    var CardView = Backbone.View.extend({
        
        update: function(values) {
            this.card = values.card;
            
            this.row = values.row;
            this.column = values.column;
        },
        
        initialize: function(values) {
            this.update(values);
            
            this.status = CardView.STATUS_VISIBLE;
        },
        
        render: function() {
            this.$el.addClass("card");
            
            return this;
        }
    },
    {
        STATUS_HIDDEN: "hidden",
        STATUS_DISCARDED: "discarded",
        STATUS_PROCESSED: "processed",
        STATUS_VISIBLE: "visible",
    });

    return CardView;
});