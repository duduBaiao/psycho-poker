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
        jquery: {
            deps: ['underscore', 'Backbone'],
            exports: 'jquery'
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

require(['jquery', 'jasmine-html', 'spec/SpecHelper'],
    function($, jasmine) {
    
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    
    var htmlReporter = new jasmine.HtmlReporter();
    
    jasmineEnv.addReporter(htmlReporter);
    
    var specs = [];
    
    specs.push('spec/PlayerSpec');
    
    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
});
