require.config({
    baseUrl: "../main/",
    paths:{
        text: 'lib/require/text',
        underscore: 'lib/underscore/underscore',
        Backbone: 'lib/backbone/backbone',
        jquery: 'lib/jquery/jquery-1.9.1',
        jasmine: '../test/lib/jasmine-1.3.1/jasmine',
        'jasmine-html': '../test/lib/jasmine-1.3.1/jasmine-html',
        'jasmine-jquery': '../test/lib/jasmine-jquery/jasmine-jquery',
        spec: '../test/spec'
    },
    shim:{
        Backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        'jasmine-jquery': {
            deps: ['jasmine', 'jquery']
        },
        'jasmine-html': {
            deps: ['jasmine-jquery'],
            exports: 'jasmine'
        }
    }
});

require(['jasmine-html'],
    function(jasmine) {
    
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    
    var htmlReporter = new jasmine.HtmlReporter();
    
    jasmineEnv.addReporter(htmlReporter);
    
    var specs = [];
    
    specs.push('spec/cardSpec');
    specs.push('spec/cardsParserSpec');
    specs.push('spec/handEvaluatorSpec');
    specs.push('spec/gameSpec');
    
    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
});
