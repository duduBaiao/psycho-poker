require.config({
    paths: {
        text: 'lib/require/text',
        underscore: 'lib/underscore/underscore',
        Backbone: 'lib/backbone/backbone',
        jquery: 'lib/jquery/jquery-1.9.1'
    },
    
    shim: {
        Backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['Backbone', 'views/MainView', 'utils/Utils'], function(Backbone, MainView) {
    
    new MainView({el: 'body'}).render();;
});