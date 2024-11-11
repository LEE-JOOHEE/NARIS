/*
 * jQuery Modal Layer- 0.9
 * Copyright (c) 2013 nickname stryper http://gotoplay.tistory.com/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Copyright (c) 2016 nickname Song Sang Koo
 * modify by song sang koo 2016.03.09
 * added options selects
 * 함수호출 지원을 위한 모달레이어 팝업창 작성(JQuery 사용)
 */

/* Support for Zepto 1.0 compiled with optional data module.
 * For AMD or NODE/CommonJS support, you will need to manually switch the related 2 lines in the code below.
 * Search terms: "jQuery Switch" and "Zepto Switch"
 */
;
(function(root, factory) {
    "use strict";

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
    $.fn.modalLayerOpener = function(options) {
        var name = "modalLayerOpener";
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
                    $(this).data(name, new $.modalLayerOpener(options, this));
                }
            });
        }

        return returnValue;
    };

    $.modalLayerOpener = function(options, element) {
        //allow instantiation without initializing for simple inheritance
        if (arguments.length) {
            this.element = $(element);
            this.options = $.extend(true, {}, this.options, options);
            this._init();
        }
    };

    $.modalLayerOpener.prototype = {
        options: {
            //debug settting
            debugbabled: false,
        },
        _init: function() {
            var self = this;
            this._modalElement = null;
            this._isOpen = false;
            var hrefType = this.element.attr("href");
            if (hrefType.length === 0) {
                alert("[" + this.element.attr("id") + "]" + self.options["errors"]["hrefRequire"]);
                return false;
            };

            if ($.modalLayerOpener.isUrls(hrefType) == false) {
                alert("[" + this.element.attr("id") + "]" + self.options["errors"]["notSupportType"]);
                return false;
            };

            this._setDefaultOption();
            this._onCreateEventListener(self.element);
            //draw modal popup
        },
        _setDefaultOption: function() {
            //IE8 ERROR 수정
            //console.log("This option 0: "+$.modalLayerOpener.defaultOptions);
            //var changeoption = $.extend( true, {}, $.modalLayerOpener.defaultOptions, this.options );
            //console.log("This option 1: "+changeoption);
            //$.extend(this.options,changeoption);
            //console.log("This option 2: "+this.options);
            this.options = $.extend(true, {}, $.modalLayerOpener.defaultOptions, this.options);
            return this;
        },
        _onCompleteOpenEvnet: function() {
            var instance = this;

            instance._modalElement.attr("tabindex", "0").attr({
                'aria-hidden': 'false',
                'aria-live': 'polit'
            }).fadeIn(instance.options["delay"]["show"]).focus();

            instance._modalElement.siblings().find(instance.options["focusElement"]).attr('tabindex', '-1');

            if (instance.options["fixwindow"] === true) {
                //$("body").bind("touchmove",function(e){ e.preventDefault();});
                $("body").css({
                    overflow: "hidden"
                }).bind("touchmove", function(e) {
                    e.preventDefault();
                });
            }
            instance._modalElement.find(instance.options["focusElement"]).last().on("keydown", function(e) {
                if (e.which == 9) {
                    if (e.shiftKey) {
                        instance._modalElement.find(instance.options["focusElement"]).eq(instance.selectIdfocusNumber - 1).focus();
                        e.stopPropagation();
                    } else {
                        instance._modalElement.find(instance.options["focusElement"]).eq(0).focus();
                        e.preventDefault();
                    };
                };
            });
            instance._modalElement.find(instance.options["focusElement"]).first().on("keydown", function(e) {
                if (e.keyCode == 9) {
                    if (e.shiftKey) {
                        instance._modalElement.find(instance.options["focusElement"]).eq(instance.selectIdfocusNumber - 1).focus();
                        e.preventDefault();
                    };
                };
            });
            instance._modalElement.on("keydown", function(e) {
                if (e.which == 27) {
                    //$.modalLayerOpener.hide();
                    //alert(this);
                    instance._hide(instance._modalElement, instance.element);
                };
                if ($(this).is(":focus")) {
                    if (e.keyCode == 9) {
                        if (e.shiftKey) {
                            instance._modalElement.find(instance.options["focusElement"]).eq(instance.selectIdfocusNumber - 1).focus();
                            e.preventDefault();
                        };
                    };
                };
            });
            instance.checkLabel.on("click", function() {
                $(this).focus();
            });
            instance._isOpen = true;
            instance.options.openEvent();
        },
        _onCreateEventListener: function(element) {
            var instance = this;

            //console.log("options : " + instance.options);
            instance.selectId = $(instance.element).attr(instance.options["selectType"]).replaceAll("#", "");
            instance._modalElement = $("#" + instance.selectId);

            instance.selectIdfocus = $("#" + instance.selectId).find(this.options["focusElement"]);

            instance.selectIdfocusNumber = instance.selectIdfocus.length;

            instance.closebtn = $("#" + instance.selectId).find(this.options["closebtn"]);

            instance.checkLabel = $("#" + instance.selectId).find(this.options["radioCheck"]);

            //console.log("close button length : "+instance.closebtn.length);

            instance.closebtn.on("click", function(event) {
                event.preventDefault();
                instance._hide(instance._modalElement, instance.element);
            });

            element.on("click", function(event) {
                event.preventDefault();
                if (instance.options["beforeOpenEvent"] != null && typeof instance.options["beforeOpenEvent"] == "function") {
                    instance.options.beforeOpenEvent();
                    setTimeout(function() {
                        console.log("late Start...")
                        instance._onCompleteOpenEvnet();
                    }, 2000);
                } else {
                    instance._onCompleteOpenEvnet();
                }
            });
        },
        option: function(key, value) {
            var options = key;

            if (arguments.length === 0) {
                return $.extend(true, {}, this.options, $.modalLayerOpener.defaultOptions);
            }

            if (typeof key === "string") {

                var keys = key.split(".");

                if (value === undefined) {
                    var opt = $.extend(true, {}, this.options, $.modalLayerOpener.defaultOptions);
                    for (var i = 0; i < keys.length; i++) {
                        if (opt[keys[i]] !== undefined) {
                            opt = opt[keys[i]];
                        } else {
                            this._warning({
                                type: $.modalLayerOpener.warning.OPTION_KEY,
                                context: key,
                                message: $.modalLayerOpener.warningMsg.OPTION_KEY,
                                hint: $.modalLayerOpener.warningHint.OPTION_KEY
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
        _hide: function(element, hrefFocus) {
            var instance = this;
            instance.options.closeEvent();

            element.attr("aria-hidden", "true").fadeOut(this.options["delay"]["hide"]);

            element.siblings().find(this.options["focusElement"]).removeAttr('tabindex');

            element.find(this.options["radioCheck"]).prop('checked', false);

            var escapevalue = this.options["escapeId"];
            element.find("input[type='text'], select, textarea").each(function() {
                var checkCnt = 0;
                if ($(this).attr("id").length != 0 || $(this).attr("name").length != 0) {
                    if (escapevalue !== undefined || (escapevalue.length > 0 && escapevalue !== "N/A")) {
                        var escapeId = escapevalue.split(",");
                        for (var i = 0; i < escapeId.length; i++) {
                            if (escapeId[i] === $(this).attr("id") || escapeId[i] === $(this).attr("name")) {
                                checkCnt = checkCnt + 1;
                            }
                        }
                    }
                }
                if (checkCnt == 0) {
                    $(this).val("");
                }
            });

            if (this.options.focusable) {
                setTimeout(function() {
                    hrefFocus.focus();
                }, this.options["delay"]["focusTimeOut"]);
            }

            if (this.options["fixwindow"] == true) {
                $("body").unbind("touchmove");
            }
            $("body").removeAttr("style");
        }
    };

    $.modalLayerOpener.defaultOptions = {
        //window resize settting
        beforeOpenEvent: null,
        //Modal Window Open Events
        openEvent: function() {},
        //Modal Window Close Events
        closeEvent: function() {},
        //Body Scroll Fixalble
        fixwindow: true,
        //
        focusable: true,
        delay: {
            show: 100,
            hide: 300,
            removeTimeOut: 400,
            focusTimeOut: 100
        },
        //default position relative to element
        position: "top left",
        selectType: "href",
        closebtn: ".pop_close",
        //Modal popup type and class use
        focusElement: "a[href], area[href], input:not([disabled]), input:not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",
        radioCheck: "input[type='checkbox'], input[type='radio']",
        escapeId: "N/A",
        errors: {
            hrefRequire: "This link type is required.",
            notSupportType: "This link type is not Supports."
        }
    };

    //check popup link 
    //this href or id is http,https,ftp is not surpport
    $.modalLayerOpener.isUrls = function(hrefType) {
        var href = hrefType.toLowerCase();

        if (href.indexOf("http") != -1 || href.indexOf("https") != -1 || href.indexOf("ftp") != -1) {
            return false;
        }

        return true;
    };

    $.modalLayerOpener.warning = {
        OPTION_KEY: "e_option_key"
    };

    $.modalLayerOpener.warningMsg = {
        OPTION_KEY: "The option requested in modalLayerOpener('option') is undefined."
    };

    $.modalLayerOpener.warningHint = {
        OPTION_KEY: "Check your option name."
    };
}));