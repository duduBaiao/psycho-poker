define(['Backbone'],
        function(Backbone) {
    
    var CardView = Backbone.View.extend({
        
        initialize: function(options) {
            this.row = options.row;
            this.column = options.column;
            
            this.state = CardView.STATE_REMOVED;
        },
        
        render: function() {
            this.$el.addClass("card");
            return this;
        }
    },
    {
        STATE_REMOVED: "removed",
        STATE_REMOVING: "removing",
        STATE_POSITIONED: "positioned",
        STATE_POSITIONING: "positioning",
    });

    return CardView;
});