    testRequirements = {
        name          : 'string',
        groups        : 'array',
        message       : 'string',
        warnMessage   : 'string',
        failMessage   : 'string',
        test          : 'function',
        qualify       : 'function'
    };

    // ---- BEGIN: Private test definitions

    tests = {
        modernDoctype : {
            name          : 'Doctype Version',
            groups        : ['page'],
            message       : 'Doctype',
            warnMessage   : 'This page has a non-HTML5 doctype. Browsers will enter a mode where sitecues hasn\'t been well tested.',
            failMessage   : 'This page does not have a doctype. Browsers will enter quirks mode and some sitecues features will misbehave.',
            test : function () {
                var result, doctype = window.document.doctype;
                if (doctype) {
                    result = '<!DOCTYPE ' +
                        doctype.name +
                        (doctype.publicId ? ' PUBLIC \"' + doctype.publicId + '\"' : '') +
                        (!doctype.publicId && doctype.systemId ? ' SYSTEM' : '') +
                        (doctype.systemId ? ' \"' + doctype.systemId + '\"' : '') +
                        '>';
                }
                else {
                    result = 'none';
                }
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === '<!DOCTYPE html>') {
                    result = 0;
                }
                else if (typeof value === 'string' && value !== 'none') {
                    result = -1;
                }
                return result;
            }
        },
        totalElements : {
            name          : 'Total Number of Elements',
            groups        : ['page', 'element', 'count'],
            message       : 'Number of elements on the page',
            warnMessage   : 'This page has a lot of code. It could be difficult to track down bugs.',
            failMessage   : 'It is unlikely sitecues will perform well on most systems with a document this complex.',
            test : function () {
                var result = document.getElementsByTagName('*').length;
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0 || (value > 0 && value < 1000)) {
                    result = 0;
                }
                else if (value >= 1000 && value < 1600) {
                    result = -1;
                }
                return result;
            }
        },
        bodyElements : {
            name          : 'Number of Body Elements',
            groups        : ['page', 'element', 'count'],
            message       : 'Number of elements inside of the body',
            warnMessage   : 'This page has a lot of code. It could be difficult to track down bugs.',
            failMessage   : 'It is unlikely sitecues will perform well on most systems with a document this complex.',
            test : function () {
                var result = sitecues.qa.getBodyElements().length;
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0 || (value > 0 && value < 400)) {
                    result = 0;
                }
                else if (value >= 400 && value < 600) {
                    result = -1;
                }
                return result;
            }
        },
        notBodyElements : {
            name          : 'Number of Non-Body Elements',
            groups        : ['page', 'element', 'count'],
            message       : 'Number of elements outside of the body',
            warnMessage   : 'This page has a lot of code. It could be difficult to track down bugs.',
            failMessage   : 'It is unlikely sitecues will perform well on most systems with a document this complex.',
            test : function () {
                // +1 accounts for the body element itself in the equation...
                var result = sitecues.qa.getAllElements().length - (sitecues.qa.getBodyElements().length + 1);
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0 || (value > 0 && value < 50)) {
                    result = 0;
                }
                else if (value >= 50 && value < 100) {
                    result = -1;
                }
                return result;
            }
        },
        scriptElements : {
            name          : 'Total Number of Script Tags',
            groups        : ['page', 'element', 'count'],
            message       : 'Number of script tags on the page',
            warnMessage   : 'JavaScript is present on this page and could conflict with sitecues.',
            failMessage   : 'There is a high likelihood that sitecues will be affected by other scripts on this page.',
            test : function () {
                var result = document.getElementsByTagName('script').length;
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0 || (value > 0 && value < 9)) {
                    result = 0;
                }
                else if (value >= 9 && value < 12) {
                    result = -1;
                }
                return result;
            }
        },
        flashElements : {
            name          : 'Total Number of Flash Elements',
            groups        : ['page', 'element', 'count'],
            message       : 'Number of flash objects',
            warnMessage   : 'This page has some flash. Those elements probably won\'t work well.',
            failMessage   : 'This amount of flash content often makes sitecues very unresponsive.',
            test : function () {
                var result = document.getElementsByTagName('object').length + document.getElementsByTagName('embed').length;
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0 || (value > 0 && value < 4)) {
                    result = 0;
                }
                else if (value >= 4 && value < 6) {
                    result = -1;
                }
                return result;
            }
        },
        iFrameElements : {
            name          : 'Total Number of iFrame Elements',
            groups        : ['page', 'element', 'count'],
            message       : 'Number of iFrames',
            warnMessage   : 'This page has some iFrames. Those elements probably won\'t work well.',
            failMessage   : 'The amount of iFrames present is likely to cause confusing behavior.',
            test : function () {
                var result = document.getElementsByTagName('frame').length + document.getElementsByTagName('iframe').length;
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0) {
                    result = 0;
                }
                else if (value >= 1 && value < 3) {
                    result = -1;
                }
                return result;
            }
        },
        tableElements : {
            name          : 'Total Number of Table Elements',
            groups        : ['page', 'element', 'count', 'table'],
            message       : 'Number of table elements',
            warnMessage   : 'This page contains tables. May signal compatibility problems.',
            failMessage   : 'This page relies heavily upon tables. Performance will not be acceptable on all systems.',
            test : function () {
                var result = document.getElementsByTagName('table').length;
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0 || (value > 0 && value < 4)) {
                    result = 0;
                }
                else if (value >= 4 && value < 7) {
                    result = -1;
                }
                return result;
            }
        },
        tdElements : {
            name          : 'Number of Table Cells',
            groups        : ['page', 'element', 'count', 'table'],
            message       : 'Number of table cells',
            warnMessage   : 'This page has some table cells. That could cause issues for the Reading Box.',
            failMessage   : 'This site relies heavily upon table cells. We aren\'t compatible with this at the moment.',
            test : function () {
                var result = document.getElementsByTagName('td').length;
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0 || (value > 0 && value < 7)) {
                    result = 0;
                }
                else if (value >= 7 && value < 12) {
                    result = -1;
                }
                return result;
            }
        },
        positionFixedElements : {
            name          : 'Number of Position Fixed Elements',
            groups        : ['page', 'element', 'count', 'user-simulation'],
            message       : 'Number of position:fixed; elements',
            warnMessage   : 'This page has some position:fixed; elements. That could cause issues when zooming.',
            failMessage   : 'This site relies heavily upon position:fixed; elements.' +
                            'We aren\'t compatible with this at the moment.',
            test : function () {

                var beforeScroll = 0,
                    afterScrollTopLeft = 0,
                    afterScrollTopRight = 0,
                    afterScrollBottomLeft = 0,
                    afterScrollBottomRight = 0,
                    result = 0;

                function findFixed() {
                    // intentionally re-computing a live HTMLCollection with each call...
                    var i, allElements = document.getElementsByTagName('*'), len = allElements.length, result = 0;
                    for (i = 0; i < len; i = i + 1) {
                        if (window.getComputedStyle(allElements[i]).position === 'fixed') {
                            result = result + 1;
                        }
                    }
                    return result;
                }
                function scrollElements(callback) {
                    // intentionally re-computing a live HTMLCollection with each call...
                    var i, allElements = document.getElementsByTagName('*'), len = allElements.length;
                    for (i = 0; i < len; i = i + 1) {
                        // this callback should scroll each element in the array,
                        // one at a time, to a desired position...
                        callback(allElements[i]);
                    }
                }

                // TODO: Make sure this function puts the scroll
                // position of elements back to where they were

                beforeScroll = findFixed();

                // Scroll everything to bottom left...
                scrollElements(function (elem) {
                    elem.scrollLeft = 0;
                    elem.scrollTop = elem.scrollHeight;
                });

                afterScrollBottomLeft = findFixed();

                // Scroll everything to bottom right...
                scrollElements(function (elem) {
                    elem.scrollLeft = elem.scrollWidth;
                    elem.scrollTop = elem.scrollHeight;
                });

                afterScrollBottomRight = findFixed();

                // Scroll everything to top right...
                scrollElements(function (elem) {
                    elem.scrollLeft = elem.scrollWidth;
                    elem.scrollTop = 0;
                });

                afterScrollTopRight = findFixed();

                // Scroll everything to top left...
                scrollElements(function (elem) {
                    elem.scrollLeft = 0;
                    elem.scrollTop = 0;
                });

                afterScrollTopLeft = findFixed();

                result = Math.max(beforeScroll, afterScrollBottomLeft, afterScrollBottomRight, afterScrollTopRight, afterScrollTopLeft);

                return result;

            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0) {
                    result = 0;
                }
                else if (value > 0 && value < 2) {
                    result = -1;
                }
                return result;
            }
        },
        overflowHiddenElements : {
            name          : 'Number of Overflow Hidden Elements',
            groups        : ['page', 'element', 'count'],
            message       : 'Number of overflow:hidden; elements',
            warnMessage   : 'This page uses overflow:hidden; some. That could cause issues for the Reading Box.',
            failMessage   : 'This site relies heavily upon overflow:hidden; elements. We aren\'t compatible with this at the moment.',
            test : function () {
                var allElements = document.getElementsByTagName('*'), len = allElements.length,
                    i, overflowHiddenElementList = [], result = 0;
                for (i = 0; i < len; i = i + 1) {
                    if (window.getComputedStyle(allElements[i]).overflow === 'hidden') {
                        overflowHiddenElementList.push(allElements[i]);
                        result = result + 1;
                    }
                }
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0) {
                    result = 0;
                }
                else if (value >= 1 && value < 4) {
                    result = -1;
                }
                return result;
            }
        },
        whiteSpaceNoWrapElements : {
            name          : 'Number of White-space No Wrap Elements',
            groups        : ['page', 'element', 'count'],
            message       : 'Number of white-space:nowrap; elements',
            warnMessage   : 'This page uses white-space:nowrap; some. That could cause issues for the Reading Box.',
            failMessage   : 'This site relies heavily upon white-space:nowrap; elements. We aren\'t compatible with this at the moment.',
            test : function () {
                var result = 0, i, allElements = sitecues.qa.getAllElements(), len = allElements.length;
                for (i = 0; i < len; i = i + 1) {
                    if (window.getComputedStyle(allElements[i]).whiteSpace === 'nowrap') {
                        result = result + 1;
                    }
                }
                return result;
            },
            qualify : function (value) {
                var result = -2; // assume total failure

                if (value === 0) {
                    result = 0;
                }
                else if (value >= 1 && value < 4) {
                    result = -1;
                }
                return result;
            }
        }
    };

    // ---- END: Private test definitions
