/**
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Copyright (c) 2016 nickname Song Sang Koo
 * modify by song sang koo 2016.03.09
 * Main Layout Script Plug in Search text 
 */
;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jQuery Switch
        // define(['zepto'], factory); // Zepto Switch
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery')); // jQuery Switch
        //factory(require('zepto')); // Zepto Switch
    } else {
        // Browser globals
        if (root.jQuery) { // Use jQuery if available
            factory(root.jQuery);
        } else { // Otherwise, use Zepto
            factory(root.Zepto);
        }
    }
}(this, function($, undefined) {
    $.fn.searchQuery = function(options) {
        var name = "searchQuery";

        var isMethodCall = typeof options === "string",
            args = Array.prototype.slice.call(arguments, 1),
            returnValue = this;

        //allow multiple hashes to be passed on init
        options = !isMethodCall && args.length ? $.extend.apply(null, [true, options].concat(args)) : options;

        //prevent calls to internal methods
        if (isMethodCall && options.charAt(0) === "_") {
            return returnValue;
        };

        if (isMethodCall) {
            this.each(function() {
                var instance = $(this).data(name),
                    methodValue = instance && $.isFunction(instance[options]) ? instance[options].apply(instance, args) : instance;

                if (methodValue !== instance && methodValue !== undefined) {
                    returnValue = methodValue;
                    return false;
                }
            });
        } else {
            this.each(function() {
                var instance = $(this).data(name);
                if (instance) {
                    instance.option(options || {}); // The new constructor only changes the options. Changing options only has basic support atm.
                } else {
                    $(this).data(name, new $.searchQuery(options, this));
                }
            });
        }

        return returnValue;
    };

    $.searchQuery = function(options, element) {
        //allow instantiation without initializing for simple inheritance
        if (arguments.length) {
            this.element = $(element);
            this.options = $.extend(true, {}, this.options, options);
            this.template = $(element || this.defaultElement || this)[0];
            this.document = $(this.template.style ? this.template.ownerDocument : this.template.document || this.template);
            this._init();
        }
    };

    $.searchQuery.defaultOptions = {
        openClass: "keyword",
        durations: 0,
        onfocusEvent: function() {},
        onKeyupEvent: function() {}
    }

    $.searchQuery.prototype = {
        options: {},
        _init: function() {
            var instance = this;
            this.element.bind("focusin", function(event) {
                instance.options.onfocusEvent();
            });
            //console.log(this.element);
            this.element.keyup(function(event) {
                instance.options.onKeyupEvent();
            });

            instance._documentClick(instance.document);
        },
        _documentClick: function(element) {
            var instance = this;
            element.bind("mousedown touchstart", function(event) {
                //console.log("<<<<");
                if (!$(event.target).closest("." + instance.options["openClass"] + ", .msearch_inp").length) {
                    $(document).find("div." + instance.options["openClass"]).each(function() {
                        if ($(this).attr("aria-open")) {
                            //$(this).slideUp(instance.options["durations"]);
                            $(this).hide();
                        }
                    });
                }
            });
        },
        option: function(key, value) {
            var options = key;

            if (arguments.length === 0) {
                return $.extend(true, {}, this.options, $.searchQuery.defaultOptions);
            }

            if (typeof key === "string") {

                var keys = key.split(".");

                if (value === undefined) {
                    var opt = $.extend(true, {}, this.options, $.searchQuery.defaultOptions);
                    for (var i = 0; i < keys.length; i++) {
                        if (opt[keys[i]] !== undefined) {
                            opt = opt[keys[i]];
                        } else {
                            this._warning({
                                type: $.searchQuery.warning.OPTION_KEY,
                                context: key,
                                message: $.searchQuery.warningMsg.OPTION_KEY,
                                hint: $.searchQuery.warningHint.OPTION_KEY
                            });
                            return undefined;
                        }
                    }
                    return opt;
                }

                options = {};
                var opts = options;

                for (var j = 0; j < keys.length; j++) {
                    if (j < keys.length - 1) {
                        opts[keys[j]] = {};
                        opts = opts[keys[j]];
                    } else {
                        opts[keys[j]] = value;
                    }
                }
            }

            this._setOptions(options);
            return this;
        },
        _warning: function(warning) {
            console.log("Warning!" + (warning.message ? "\n" + warning.message : "") + (warning.hint ? "\n" + warning.hint : "") + "\nContext: " + warning.context);
        },
        _setOptions: function(options) {
            var self = this;

            $.each(options, function(key, value) { // This supports the 2 level depth that the options of modalLayerOpener has. Would review if we ever need more depth.
                self._setOption(key, value);
            });

            return this;
        },
        _setOption: function(key, value) {
            this.options[key] = value;

            return this;
        },
    };

    $.searchQuery.warning = {
        OPTION_KEY: "e_option_key"
    };

    $.searchQuery.warningMsg = {
        OPTION_KEY: "The option requested in searchQuery('option') is undefined."
    };

    $.searchQuery.warningHint = {
        OPTION_KEY: "Check your option name."
    };
}));