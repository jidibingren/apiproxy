
var common = require('./common.js');
var randomSelect = common.randomSelect;
var writeData = common.writeData;
var url  = require('url');
var specialPaths = {
    'api/detectApp': function(req, res) {

    res.status(200).send("<html>"+
                        "<script>"+
                        "window.onfocus(function() { this.isActive = true; });"+
                        "window.onblur(function() { this.isActive = false; });"+
                        "function startMyApp(){"+
                        "  document.location = 'toon://';"+
                        "  setTimeout( function(){"+
                        "    if (window.isActive) {"+
                        "        document.location = 'http://facebook.com';"+
                        "    }"+
                        "  }, 1000);"+
                        "}"+
                        "startMyApp();"+
                        "</script>"+
                    "</html>");
        // writeData(res, {
        //             "<script>"
        //                 "window.onfocus(function() { this.isActive = true; });"
        //                 "window.onblur(function() { this.isActive = false; });"
        //                 "function startMyApp(){"
        //                 "  document.location = 'fb://';"
        //                 "  setTimeout( function(){"
        //                 "    if (window.isActive) {"
        //                 "        document.location = 'http://facebook.com';"
        //                 "    }"
        //                 "  }, 1000);"
        //                 "}"
        //                 "startMyApp();"
        //             "</script>"
        //         })
    },
};

module.exports = specialPaths;