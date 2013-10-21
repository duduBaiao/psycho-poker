define(['Backbone'],
        function(Backbone) {
    
    var MainView = Backbone.View.extend({
        
        el: "body",
        
        initialize: function() {
            console.log("iniciou!");
        },
        
        render: function() {
            this.$el.append("Psycho!");
            return this;
        }
    });

    return MainView;
});