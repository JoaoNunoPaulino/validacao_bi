
/*
*
* UTILS APP
*
*/

// TYPES

// Test value type
function IsType (value, type) {
return (typeof value === type);
/*
    >IsType(1, 'number')
    <true
    >IsType('hello', 'string')
    <true
    >IsType(true, 'boolean')
    <true
*/
}
    
// Test if value is string
function IsStr(value) {
return IsType(value, 'string') || (value instanceof String);
/*
    >IsStr('oi')
    <true
    >IsStr(1)
    <false
*/
}

// Convert value to string or predef ('') if null
function Str (value, predef) {
if (predef === undefined) predef = '';
if (value == null) return predef;
return value.toString();
/*
    >Str ('1')
    <"1"
    >var n = 1;
    >Str (n)
    <"1"
*/
}

// Test if value is number (integer or decimal)
function IsNumber (value) {
return IsType (value, 'number') || (value instanceof Number);
/*
    >IsNumber(1)
    <true
    >IsNumber('')
    <false
*/
}

// Convert value to integer or predef (0) if null
function Int (value, predef) {
if (predef === undefined) predef = 0;
if (value == null) return predef;
var resp = parseInt(value);
if (isNaN(resp)) return predef;
return resp;
/*
    >Int('1')
    <1
    >Int('1000')
    <1000
    >Int('','2')
    <"2"
*/
}

// Convert value to decimal or predef (0.0) if null
function Decimal (value, predef) {
if (predef === undefined) predef = 0.0;
if (value == null) return predef;
var resp = parseFloat(value);
if (isNaN(resp)) return predef;
return resp;
/*
    >Decimal('3.4')
    <3.4
*/
}

// Test if value is boolean
function IsBool (value) {
return IsType(value,'boolean') || (value instanceof Boolean);
/*
    >IsBool(false)
    <true
    >IsBool(true)
    <true
    >IsBool ('false')
    <false
    >IsBool (1)
    <false
*/
}

// Convert value to boolean or predef (0) if null
function Bool(value, predef) {
if (predef === undefined) predef = false;
if (value == null) return predef;
if (IsBool(value)) return value;
return Int(value, predef ? 1 : 0) != 0;
/*
    >Bool(0, false)
    <false
    >Bool(1, false)
    >true
    >Bool(0, true)
    <false
    >Bool(1, true)
    <true
*/
}

// Test if value is array
function IsArray (value) {
return value instanceof Array;
}

// Convert value to array or predef ([]) if null
function Array (value, predef) {
if (predef === undefined) predef = [];
if (value == null) return predef;
if (IsArray(value)) return value;
return [value];
/*
    >Array('hello')
    <["hello"]
    >Array('123')
    <["123"]
*/
}

// Test if value is function
function IsFunc (value) { 
return value instanceof Function;
/*
    >function x () {alert('oi')}
    >IsFunc(x)
    <true
*/
}

// Test if value is an object
function IsObj (value) { 
return value instanceof Object;
/*
    >var x = $$("#x");
    >IsFunc(x)
    <true
*/
}

/*********************************************************/

// Test if value has attribute
function HasAttr (obj, attr){ 
return obj && obj.hasOwnProperty && obj.hasOwnProperty(attr);
}

/*********************************************************/

// Test if value has index
function HasIndex (obj, index){ 
return (index >= 0) && (index < Len(obj));
/*
>var x = [0,1,2,3,4];
>HasIndex(x, 1);
<true
>HasIndex(x, 5);
<false
*/
}

// Get value len or predef (-1)
function Len (obj, predef) {
if (predef === undefined) predef = -1;
if (obj == null) {
    return predef;
}
else if (obj.length || (obj.length === 0)) {
    return obj.length;
}
else {
    return predef;
}
/*
>var x = [1,2,3];
>Len (x);
<3
>var x = 'hello'; 
>Len (x);
<5
*/
}

// Get value or predef(null) if 
function Null(obj, predef) {
if (obj == null) {
    return (predef === undefined) ? null : predef;
}
else {
    return obj;
}
/*
>var x = 3;   
>Null (x)
<3
>var x = null;   
>Null (x)
<null
*/
}

// Get value or predef(null) if null or empty('')
function NullOrEmpty (obj, predef) {
if ((obj == null) || (obj == '')) {
    return (predef === undefined) ? null : predef;
}
else {
    return obj;
}
/*
>var x = null;
>var y = [];
>NullOrEmpty(x,y);
< >[]
>NullOrEmpty(y,x);
<null
*/
}






/*********************************************************/

// Test if object has elements or specific element
function Exist (obj, element) {
if (Len(obj) <= 0) {
    return false;
} else if (element === undefined) {
    return true;
} else if (IsArray(obj)) {
    return (Pos(obj, element) >= 0);
} else {
    return obj == element;
}
}

/*********************************************************/





// Clone object
function Clone (obj) {
var len = Len(obj);
if (len >= 0) {
    var resp = [];
    for (var i = 0; i < len; i++) {
    resp[i] = obj[i];
    }
    return resp;
} else if (IsObj(obj)) {
    var resp = {};
    for (var prop in obj) {
    resp[prop] = obj[prop];
    }
    return resp;
} else {
    return null;
}
/*
>var x = $$('.bills');
>x;
<[a#bills.bills]
>Clone(x);
<[a#bills.bills]
*/
}

// Push element to object
// @toHead - optional - push to head of list
function Push (obj, element, toHead) {
var len = Len(obj);
if (len <= 0) return [element];
if (toHead) { 
    obj.unshift(element);
}
else {
    obj.push(element);
}
return obj;
/*
>var x = $$('#bg')
>var y = $$('#page')
>Push(y, x);
<[div#page.page, Array(1)]
>Push(y, x, 'head');
<[ Array(1), div#page.page]
*/
}


    
    
    
    /*********************************************************/
    
    // Positon of element in object
    function Pos (obj, element) {
    if (IsArray(obj)) {
        if (!element) return -1;
        return obj.indexOf(element);
    } else {
        obj = Str(obj);
        element = Str(element);
        if (!obj || !element) return -1;
        return obj.indexOf(element);
    }
    /*
        >var x = [0,1,2,3,4,5]
        >var a = $$('#bg')
        >var b = $$('#page')
        >Pos(b, x)
        <-1
        >Pos(x, 1)
        <2
        >Pos(x, 4)
        <8
        >Pos(x, a)
        <-1
        >Pos(x, b)
        <-1
        >Pos(a, b)  
        <0
        >Pos(a, x)
        <-1
    */
    }
    
    /*********************************************************/
    
    
    
    
    
    
    // Join text or array using separator
    function Join (a, sep, b) {
    if (IsArray(a)) {
        var resp = null;
        for (var i = 0; i < a.length; i++) resp = Join(resp, sep, a[i]);
        return Join(resp, sep, b);
    } else if (IsArray(b)) {
        var resp = null;
        for (var i = 0; i < b.length; i++) resp = Join(resp, sep, b[i]);
        return Join(a, sep, resp);
    } else {
        if ((a != null) && (b != null)) return a + sep + b;
        if (a != null) return a;
        if (b != null) return b;
        return null;
    }
    /*
        >var y = ['a','b','c']
        >var y = ['1','2','3']
        >Join(x, ' | ' ,y)
        <"a,b,c | 1,2,3"
    */
    }
    
    
    
    
    
    /*********************************************************/
    
    // Merge arrays
    function Merge (a, b) {
    if (IsArray(a)) {
        if (IsArray(b)) {
        for (var i = 0; i < b.length; i++) a.push(b[i]); 
        } else if (b != null) {
        a.push(b);
        }
        return a;
    } else if (a != null) {
        return Merge([a], b);
    } else {
        return b;
    }
    }
    
    /*********************************************************/
    
    // Get element at index
    function Index (obj, index) {
    if (IsArray(obj)) {
    if (index == null) return null;
    return obj[index];
    } else {
        obj = Str(obj);
        if (!obj || (index == null)) return null;
        return obj[index];
    }
    /*
        >var x = ['a','b','c']
        >Index(x, 0);
        <"a"
        >Index(x, 1);
        >","
        >Index(x, 2);
        >"b"
    */
    }
    
    // Last posotion of element in object
    function PosLast (obj, element) {
    if (IsArray(obj)) {
    element = Str(element);
    if (!element) return -1;
    return obj.lastIndexOf(element);
    } else {
        obj = Str(obj);
        element = Str(element);
        if (!obj || !element) return -1;
        return obj.lastIndexOf(element);
    }
        /*
        >var x = ['a','b','c']
        >PosLast(x, 'a');
        <0
        >PosLast(x, 'b');
        >1
        >Index(x, 'c');
        >3
    */
    }
    
    // Split text using separator
    function Split (text, sep) {
    if (text == null) return null;
    return Str(text).split(Str(sep));
    /*
        >var x = ['a','b','c']
        >Split(x)
        <["a", ",", "b", ",", "c"]
        >var y = ['hello']
        >Split(y)
        <["h", "e", "l", "l", "o"]
    */
    }
    
    
    // NUMBER
    
    // Get maximum between a and b
    function Max (a, b) {
    if (a == null) return b;
    if (b == null) return a;
    if (a >= b) return a;
    return b;
    /*
        >var n1 = 0;
        >var n2 = 4;
        >Max(n1, n2)
        <4
    */
    }
    
    
    
    
    
    /*********************************************************/
    
    // Get round of value
    // @decimals - optional - decimals round
    function  Round (value, decimals) {
    if (value == null) return null;
    return Decimal(value).toFixed((decimals > 0) ? decimals : 0);
    }
    
    /*********************************************************/
    
    
    
    
    
    // TEXT
    
    
    // Convert text to html, to avoid html desruption
    function Html (text) {
    if (text == null) return text;
    var replace = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };
    return Str(text).replace(/[&<>"'\/]/g, function (c) { return replace[c]; });
    /*
        >Html('hello')
        <"hello"
    */
    }
    
    // Cat text with prefix and sufix (optional) if not null
    function Cat (left, text, right) {
    if (text != null) {
        return Str(left) + text + Str(right);
    } else {
        return null;
    }
    /*
        >Cat('a','b','c')
        <"abc"
    */
    }
    
    // Convert text to JSON format
    function Json (text) {
    try {
        return JSON.stringify(text);
    }
    catch (e)
    {
        LogError("Json failed: " + e.message);
        return null;
    }
    /*
        >Json({"colors": [{
        "color": "black",
        "code": {   "rgba": [255,255,255,1],
                    "hex": "#000"}},{
        "color": "white",
        "code": {     "rgba": [0,0,0,1],
                        "hex": "#FFF"}}]
        })
        <"{"colors":[{"color":"black","code":{"rgba":[255,255,255,1],"hex":"#000"}},{"color":"white","code":{"rgba":[0,0,0,1],"hex":"#FFF"}}]}"
    */
    }
    
    
    
    
    
    /*********************************************************/
    
    // Get head of text, using separator
    function Head (text, sep) {
    if (text == null) return text;
    var pos = text.indexOf(sep);
    if (pos >= 0) {
        return text.substr(0, pos);
    } else {
        return text.substr(pos + 1);
    }
    }
    
    /*********************************************************/
    
    
    
    
    
    // Get rest of text, using separator
    function Rest (text, sep) {
    if (text == null) return text;
    var pos = text.indexOf(sep);
    if (pos >= 0) {
        return text.substr(pos + 1);
    } else {
        return null;
    }
    /*
        >Rest('hello','')
        <"ello"
        >Rest('hello','e')
        <"llo"
    */
    }
    
    // Text has word, using separator
    function HasWord (words, word, sep) {
    if ((Len(words) < 1) || (Len(word) < 1)) return false;
    return Pos(sep + words + sep, sep + word + sep) >= 0;
    /*
        >var h = 'hello';
        >var w = 'word';
        >var m = 'word';
        >HasWord(m,w)
        <true
        >HasWord(h,w)
        <false
    */
    }
    
    // Text has prefix
    function IsPrefix (text, prefix) {
    if ((Len(text) < 1) || (Len(prefix) < 1)) return false;
    return Pos(text, prefix) == 0;
    /*
        >IsPrefix('hello','h')
        <true
    */
    }
    
    // Get text without prefix
    function PrefixRest (text, prefix) {
    if ((Len(text) < 1) || (Len(prefix) < 1)) return text;
    if (Pos(text, prefix) == 0) {
        return Copy(text, Len(prefix));
    } else {
        return null;
    }
    /*
        >PrefixRest('hello','h')
        <"ello"
    */
    }
    
    
    // Copy text starting at pos
    // @len - optional - text size to copy
    function Copy (text, pos, len) {
    if (text == null) return text;
    if (len == null) {
        return text.substr(pos);
    } else {
        return text.substr(pos, len);
    }
    /*
        >Copy('hello',3,1)
        <"l"
        >Copy('hello',1,4)
        <"ello"
        >Copy('hello',1,2)
        <"el"
    */
    }
    
    // Copy text starting at pos1
    // @pos2 - optional - ending position
    function Slice (text, pos1, pos2) {
    if (text == null) return text;
    if (pos2 == null) {
        return text.slice(pos1);
    } else {
        return text.slice(pos1, pos2);
    }
    /*
        >Slice('hello_world',2,5)
        <"llo"
        >Slice('hello_world',2,7)
        <"llo_w"
    */
    }
    
    // Replace first text a with b
    function Replace (text, a, b) {
    if (text == null) return text;
    return Str(text).replace(Str(a), Str(b));
    /*
        >Replace('hello_world','llo','llllllo')
        <"hellllllo_world"
    */
    }
    
    // Replace all text a with b
    function ReplaceAll (text, a, b) {
    if (text == null) return text;
    return Str(text).split(Str(a)).join(Str(b));
    /*
        >ReplaceAll('hello_world','llo','11')
        <"he11_world"
    */
    }
    
    
    
    /*********************************************************/
    // Repeat text
    function Repeat (text, repeat) {
    if (text == null) return text;
    return new Array(repeat + 1).join(text);
    }
    /*********************************************************
     >Repeat('hello_world','llo')
    <"llo1"
    >Repeat('hello_world','')
    <"1"
    >Repeat('1','1')
    <"11"
    >Repeat('1','')
    <"1"
    >Repeat('hello','')
    <"1"
    >Repeat('hello','hello')
    <"hello1"
    *********************************************************/
    
    
    
    // Get text with spacer at left
    // @len - text size
    function SpacerLeft (text, spacer, len) {
    if (text == null) return text;
    return (Repeat(spacer, len) + text).substr(-len);
    }
    
    // Get text with spacer at right
    // @len - text size
    function SpacerRight (text, spacer, len) {
    if (text == null) return text;
    return (text + Repeat(spacer, len)).substr(0, len);
    }
    
    // Get value with 0 at left, until size = 2
    // Example: 5 -> 05
    function Zero2 (value) {
    return SpacerLeft(value, '0', 2);
    }
    
    // Replace in text tag (predef. '*')
    // Tag starts with '{' and ends with '}'
    // Example: aaa{*}ccc + bbb -> aaabbbccc
    function Tag (text, value, tag) {
    if (tag == null) tag = '*';
    return ReplaceAll(text, '{' + tag + '}', value);
    }
    
    // Upper case of text
    function Upper (text) {
    text = Str(text);
    if (text == null) return text;
    return text.toUpperCase();
    }
    
    // Lower case of text
    function Lower (text) {
    text = Str(text);
    if (text == null) return text;
    return text.toLowerCase();
    }
    
    // Remove text accents
    // Example: Ã -> A
    function Ascii (text) {
    var map = {
        'Á': 'A', 'á': 'a', 'À': 'A', 'à': 'a', 'Ã': 'A', 'ã': 'a', 'Â': 'A', 'â': 'a', 'Ä': 'A', 'ä': 'a', 'Å': 'A', 'å': 'a',
        'É': 'E', 'é': 'e', 'È': 'E', 'è': 'e', 'Ê': 'E', 'ê': 'e', 'Ë': 'E', 'ë': 'e',
        'Í': 'I', 'í': 'i', 'Ì': 'I', 'ì': 'i', 'Î': 'I', 'î': 'i', 'Ï': 'I', 'ï': 'i',
        'Ó': 'O', 'ó': 'o', 'Ò': 'O', 'ò': 'o', 'Õ': 'O', 'õ': 'o', 'Ô': 'O', 'ô': 'o', 'Ö': 'O', 'ö': 'o',
        'Ú': 'U', 'ú': 'u', 'Ù': 'U', 'ù': 'u', 'Û': 'U', 'û': 'u', 'Ü': 'U', 'ü': 'u',
        'Ç': 'C', 'ç': 'c', 'Ñ': 'N', 'ñ': 'n',
    };
    return Str(text).replace(/[^A-Za-z0-9\[\] ]/g, function(c){ return map[c] || c})
    }
    
    // LOGS
    function LogError(text) {
    console.error(text);
    }
    
    function LogWarn(text) {
    console.warn(text);
    }
    
    function LogInfo(text) {
    console.info(text);
    }
    
    function LogShow(text) {
    console.log(text);
    }
    


    /*
    * JQUERY
    * ATTR/PROP/ID
    * SHOW/HIDE
    * EACH
    * CSS
    * WIDTH/HEIGHT
    * HTML/TEXT
    * LABEL
*/



// JQUERY

function J(element) {
    return $(element);
    /*
        >J('.bg');
        <[div#bg.bg]
    */
}

/*********************************************************/
function J_View(view, child) {
    return view.$(child);
}
/*********************************************************
>var p = $$('#page')
>p;
<[div#page.page]
>var pi = $$('.page_item')
>pi;
[div.page_item, div.page_item, div.page_item, div.page_item]
J_View(p,pi)

<<Uncaught TypeError: 
<<frontend.js:26 
<<view.$ is not a function
**********************************************************/

/*********************************************************/
function J_Event(ev) {
    return $(ev.currentTarget);
}
/**********************************************************
 $(".bills").click(function(event){
 alert(event.currentTarget === this);
});  
**********************************************************/

function J_Child(element, child) {
    return $(element).find(child);
    /*
    >J_Child('#page', '.page_item');
    <[div.page_item, div.page_item, div.page_item, div.page_item]
    */
}

function J_Children(element) {
    return $(element).children();
    /*
    >J_Children('#page');
    <[div.page_item, div.page_item, div.page_item, div.page_item]
    */
}

function J_Clone(element) {
    return $(element).clone();
    /*
    >J_Clone('#page');
    <[div#page.page]
    */
}

// ATTR/PROP/ID
function GetId(element) {
    return $(element).attr('id');
    /*
    <div id="pageMain" class="page">
    >GetId('.page');
    <"pageMain"
    */
}

function SetId(element, id) {
    $(element).attr('id', id);
    /*
    >var x = $('#pageMain') 
    >x;
    <[div#pageMain.page]
    >SetId('.page', 'page')
    >x;
    >[div#page.page]
    */
}

function GetAttr(element, attr) {
    return $(element).attr(attr);
    /*
    >var x = $('#bills') ;
    >x;
    <[a#bills.bills]
    >GetAttr(x, 'href');
    >"bills.html"
    */
}

function SetAttr(element, attr, value) {
    $(element).attr(attr, value);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >SetAttr(x, 'href', 'index.html');
    >GetAttr(x, 'href');
    >"index.html"
    */
}

function GetProp(element, prop) {
    return $(element).prop(prop);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >GetProp(x, 'id');
    >"bills"
    */
}

function SetProp(element, prop, value) {
    $(element).prop(prop, value);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >SetProp(x, 'id', 'billsMain');
    >x;
    >[a#billsMain.bills]
    */
}

// SHOW/HIDE
function IsShow(element) {
    return $(element).is(":visible");
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >IsShow(x);
    <true
    */
}

function Show(element) {
    $(element).show();
    /*
    >var x = $('#bills');
    ><a id="bills" style="display: none;"
    >Show(x);
    <<a id="bills" style="display: block;"
    */
}

function Hide(element) {
    $(element).hide();
    /*
    >var x = $('#bills');
    ><a id="bills" style="display: block;"
    >Hide(x);
    <<a id="bills" style="display: none;"
    */
}

function ShowHide(isShow, element) {
    if (isShow) Show(element);
    else Hide(element);
    /*
    >var x = $('#bills');
    ><a id="bills" style="display: block;"
    >ShowHide(false, x)
    <<a id="bills" style="display: none;"
    >ShowHide(true, x)
    <<a id="bills" style="display: block;"
    */
}

// EACH
/*********************************************************/
function Each(element, callback) {
    $(element).each(callback);
}
/*********************************************************/

// CSS
/*********************************************************/
//fix error from >>Array.isArray is not a function
if (typeof Array.isArray != "function"){
    Array.isArray = function(arr){
        return arr != undefined && arr.constructor == Array
    }
}
/*********************************************************/


function HasCss(element, css) {
    return $(element).hasClass(css);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >HasCss(x, 'bills');
    <true
    */
}

function GetCss(element) {
    return GetAttr(element, 'class');
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >GetCss(x);
    <'bills'
    */
}

function SetCss(element, css) {
    $(element).removeClass().addClass(css);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >SetCss(x, 'hello');
    >x;
    <[a#bills.hello]
    */
}


/*********************************************************/
function SetCssHtml(element, css) {
    $(element).css(css);
}
/*********************************************************/


function SetCssValue(element, property, css) {
    $(element).css(property, css);
    /*
    >var x = $('#bills');
    >x;
    <><a id="bills"
    >SetCssValue(x, 'color', 'red');
    >x;
    <><a id="bills" style="color: red;"
    */
}

function CssAdd(element, css) {
    if (css == null) return;
    $(element).addClass(css);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssAdd(x, 'hello');
    >x;
    <[a#bills.bills.hello]
    */
}

function CssRemove(element, css) {
    if (css == null) return;
    $(element).removeClass(css);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssRemove(x, 'hello');
    >x;
    <[a#bills.bills]
    */
}

function CssAddRemove(isAdd, element, css) {
    if (isAdd) CssAdd(element, css);
    else CssRemove(element, css);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssAddRemove(false, x, 'bills');
    >x;
    <[a#bills]
    >CssAddRemove(true, x, 'bills');
    >x;
    <[a#bills.bills]
    */
}

function CssSwitch(element, css) {
    if (css == null) return;
    $(element).toggleClass(css);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssAdd(x, 'hello');
    >x;
    <[a#bills.bills.hello]
    >CssSwitch(x,'hello');
    >x;
    <[a#bills.bills]
    */
}

function CssJoin(css_args) {
    var css = null;
    for (var i = 0; i < arguments.length; i++) css = Join(css, ' ', arguments[i]);
    return Str(css);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssJoin(x);
    >"[object Object]"
    >CssJoin('hello');
    <"hello"
    */
}

function Css(css) {
    return Str(Cat(' class="', css, '"'));
    /*
    >Css('hello');
    <" class="hello""
    */
}

// Add space before String
function CssCat(css) {
    return Str(Cat(' ', css));
    /*
    >CssCat('hello');
    <" hello""
    */
}

// Add class to HTML tag
function AppCssAdd(css) {
    CssAdd('HTML', css);
    /*
    >AppCssAdd('hello');
    <<html class="hello"
    */
}

// Remove class to HTML tag
function AppCssRemove(css) {
    CssRemove('HTML', css);
    /*
    >AppCssAdd('hello');
    <<html class=" "
    */
}

// WIDTH/HEIGHT
function GetWidth(element) {
    return $(element).width();
    /*
    >var x = $('#bills');
    >GetWidth(x);
    <50
    */
}

function SetWidth(element, width) {
    $(element).width(width);
    /*
    >var x = $('#bills');
    >SetWidth(x, 200);
    >GetWidth(x);
    <200
    */
}

function GetHeight(element) {
    return $(element).height();
    /*
    >var x = $('#bills');
    >GetHeight(x);
    <50
    */
}

function SetHeight(element, height) {
    $(element).height(height);
    /*
    >var x = $('#bills');
    >SetHeight(x, 200);
    >GetHeight(x);
    <200
    */
}


// HTML/TEXT

// Format css
function HtmlCss(text, css) {
    if (css == null) return text;
    return Cat('<span class="' + Str(css) + '">', text, '</span>');
    /*
    >HtmlCss('hello world', 'hello')
    <"<span class="hello">hello world</span>"
    */
}

// Format css (use div)
function HtmlDiv(text, css) {
    if (css == null) return text;
    return Cat('<div class="' + Str(css) + '">', text, '</div>');
    /*
    >HtmlDiv('hello world', 'hello')
    <"<div class="hello">hello world</div>"
    */
}

// Div id
function HtmlDivId(id, text, css) {
    return '<div id="' + Str(id) + '" class="' + Str(css) + '">' + Str(text) + '</div>';
    /*
    >HtmlDivId('hl', 'hello world', 'hello')
    <"<div id="hl" class="hello">hello world</div>"
    */
}

// Html block of label
function HtmlLabel(label) {
    return Html(Label(label));
    /*
    >HtmlLabel('Lang');
    <"#Lang"
    */
}

// Remove text that destroys html
function HtmlText(text) {
    return Html(text);
    /*
    >HtmlText('<div>hello world</div>');
    <""&lt;div&gt;hello world&lt;&#x2F;div&gt;"
    */
}

// No wrap text
function HtmlNoWrap(text) {
    return Cat('<span class="html_nowrap">', text, '</span>');
    /*
    >HtmlNoWrap('hello');
    <"<span class="html_nowrap">hello</span>"
    */
}

// Js
function HtmlJs(js) {
    return '<script>' + Str(js) + '</script>';
    /*
    >HtmlJs(alert('hello'))
    <POPUP_ALERT => 'hello'
    <"<script></script>"
    */
}


// JS to set html
function SetHtml(element, text) {
    $(element).html(text);
    /*
    >var x = $('#bills');
    >x;
    <<a id="bills">bills</a>
    >SetHtml(x, 'hello')
    >x;
    <<a id="bills">hello</a>
    */
}

// JS to get html
function GetHtml(element) {
    return $(element).html();
    /* 
    >var x = $('#bills');
    >x;
    <<a id="bills">bills</a>
    >GetHtml(x)
    <"bills"
    */
}

// JS to append html
// element set inside html
function HtmlAppend(element, html) {
    $(element).append(html);
    /* 
    >var y = $('#page');
    >var x = $('#bills');
    >HtmlAppend(y, x)
    <<div id="page">
        <a id="bills"> bills</a>
        </div>
    */
    
}

// JS to append (before) html
function HtmlBefore(element, html) {
    $(element).before(html);
    /* 
    <<div id="page"></div>
        <a id="bills"></a>
    >var x = $('#bills');
    >var y = $('#page');
    >HtmlBefore(y, x)
    <<a id="bills"></a>
    <div id="page"></div>
    */
}


// JS to (after) html
function HtmlAfter(element, html) {
    $(element).after(html);
}

// JS to remove html element
function HtmlRemove(element) {
    $(element).remove();
}

// JS to get text
function GetText(element) {
    return $(element).prop('innerText');
    /* 
    >var x = $('#bills');
    >x;
    <<a id="bills">bills</a>
    >GetText(x)
    <"bills"
    */
}

// JS to set text
function SetText(element, text) {
    $(element).prop('innerText', text);
    /* 
    >var x = $('#bills');
    >x;
    <<a id="bills">bills</a>
    >SetText(x, 'hello')
    <<a id="bills">hello</a>
    */
}

// Br
function HtmlBr(times) {
    if (times == null) times = 1;
    return Repeat('<BR />', times);
}


// Cell -> Label/Text
function HtmlCell(cell) {
    // Bool
    if (IsBool(cell)) return Label(cell ? 'CellTrue' : 'CellFalse');
    // Text
    return HtmlText(cell);
    /*
    >HtmlCell('<div>hello world</div>')
    <"&lt;div&gt;hello world&lt;&#x2F;div&gt;"
    */
}

// Switch visible block
function HtmlSwitch(text, cut, css, etc) {
    if (Len(text) > cut) {
        return '<div class="html_switch ' + Str(css) + "\" onclick=\"CssSwitch(this, 'html_switch_all')\">" +
            Copy(text, 0, cut) +
            ((etc === null) ? '' : HtmlCss((etc === undefined) ? '...' : etc, 'html_switch_etc')) +
            HtmlCss(Copy(text, cut), 'html_switch_rest') +
            '</div>';
    } else {
        return htmlDiv(text, css);
    }
}


// LABEL

// Get text from label, see Label
// @label - label name to convert to text
// @predef - optional - predefined text when label not found
function Label(name, undef) {
    if (!name || !Label) return (undef !== undefined) ? undef : '';
    var text = eval('Label' + name);
    if (text != null) return text;
    return (undef !== undefined) ? undef : ('#' + name);
}

function HasLabel(name) {
    return Label(name, null) != null;
}





function FormatAmount(amount, format, decimals)
{
    if (amount == null) return amount;

    amount += '';
    var value = Head(amount, '.');
    if (!value)
    {
        value = 0;
    }
    var decimal = Rest(amount, '.');
    if (decimals == null) decimals = Decimals;
    if (!decimal && (decimals > 0))
    {
        decimal = 0;
    }
    return FormatPay(value, decimal, format);
}



function FormatPay(value, decimal, format, groupSep, decimals)
{
    if (value == null) return value;

    var amount = Str(Math.round(value));

    // Decimal
    if (decimals == null) decimals = Decimals;
    

    // Predef -> Amount.Format
    if ((format == null) || (format === true))
    {
        return Replace(Format, '*', amount);
    }
    else if (format !== false)
    {
        return Replace(format, '*', amount);
    }
    else
    {
        return amount;
    }
}


/*
*
* FRONTEND APP
*
*/


// LABEL/PLURAL/STR

// Get text from label, see Label
// @label - label name to convert to text
// @predef - optional - predefined text when label not found
function Label(name, undef) {
    if (!name || !Label) return (undef !== undefined) ? undef : '';
    var text = eval('Label.' + name);
    if (text != null) return text;
    return (undef !== undefined) ? undef : ('#' + name);
}
function HasLabel(name) {
    return Label(name, null) != null;
}

// Set text plural or single and call Tag after
// @value - value to check plural
// @text - plural text or single text (separated by '|')
// @tag - optional - use value to set text tag, see Tag
// Ex: Plural(1, 'texts|text') -> text
//     Plural(2, 'texts|text') -> texts
//     Plural(3, '{*} texts|text') -> 3 texts
//     Plural(4, '{tag} texts|text', 'tag') -> 4 texts
function Plural(value, text, tag) {
    var resp = null;
    if (value == 1)
    {
        resp = Rest(text, '|');

    }
    if (!resp)
    {
        resp = Head(text, '|');
    }
    return Tag(resp, value, tag);
}

// Set Plural of Label
// @value - value to check plural, see Plural
// @label - label, see Label
function PluralLabel(value, label)
{
    return Plural(value, Label(label))
}


// Cat to string
// Short for Cat
// @left - prefix of text (if exist)
// @text - text
// @right - optional - sufix of text (if exist)
function Cat(left, text, right)
{
    return Cat(left, text, right);
}

// Convert if null
// Short for Null
// @value - value to test
// @predef - optional - value if null
function Null(value, predef)
{
    return Null(value, predef);
}


// PINPAD

// Open pinpad screen
// @title - pinpad screen title
// @isAmount - is input of amount type or value type
// @options:
//      text - pinpad screen  text
//      css - pinpad screen css
//      inputCss - input css
//      pairs - pinpad screen pairs
//      sep - pinpad screen pairs separator
//      swap - pinpad C and dot swap buttons
//      confirm - pinpad next button as confirm, and pinpad disabled
//      html - pinpad html
//      min - input minimum size
//      max - input maximum size
//      minValue - input minimum value
//      maxValue - input maximum value
//      zero - input as zero permitted
//      zero2 - "00" button available
//      checkCallback - input check callback (!false)
//      box - input box size (int)
//
//      fraction - amount fraction, in decimal
//      decimals - amount decimals
//
//      size - value size or sizes (if array)
//      password - value of password type (show '*')
//      number - value of number type, no zeros at start
//      block - value block format
//      left - value left ident
//      negative - value negative available
//      empty - value with empty
//      keyboard - value of text type, with keyboard popup
//      space - text type with spaces
//      value - input start value
function Pinpad(title, isAmount, options) {
    LogDebug('Pinpad: ' + title + ' | ' + isAmount);
    LogDebug(options);

    // Options
    options = options || {};
    options.title = title;
    options.isAmount = isAmount;

    // Init
    ViewStepsInit('screen_pinpad', ScreenPinpad, options);
}

// Get pinpad input value and close
function PinpadResponse() {
    if (!IsViewSteps('screen_pinpad')) return ;
    var resp = ViewSteps.GetValue();
    ViewStepsClose();
    return resp;
}


// BUTTONS

// Open buttons screen
// @title - buttons screen title
// @items - buttons to list
// @options:
//      css - buttons screen css
//      text - buttons screen text
//      rotate - buttons page rotate (last jumps to first on next)
//      showFlow - search by flow also
//      buttonsPage - buttons per page or Frontend.ButtonsPage
//      buttonsSearch - buttons per page on search keyboard popup or Frontend.ButtonsSearch
//
//      callbackView - optional - view associated for callback
function Buttons(title, items, options) {
    LogDebug('Buttons: ' + title + ' | ' + Len(items));
    LogDebug(options);

    // Options
    options = options || {};
    options.title = title;
    options.items = items;

    // Init
    ViewStepsInit('screen_buttons', ScreenButtons, options);
}

// Get Buttton parent or null if none
function ButtonsParent() {
    if (!IsViewSteps('screen_buttons')) return ;
    return ViewSteps.Parent();
}

// Goto Button parent
function ButtonsSelectParent() {
    if (!IsViewSteps('screen_buttons')) return ;
    return ViewSteps.SelectParent();
}

// Get search text
function ButtonsSearch() {
    if (!IsViewSteps('screen_buttons')) return ;
    return ViewSteps.Search();
}

// Open search keyboard popup
function ButtonsSearchOpen() {
    if (!IsViewSteps('screen_buttons')) return ;
    return ViewSteps.SearchOpen();
}

// Open search keyboard popup if buttons exceed Frontend.SearchOpenPage
function ButtonsSearchOpenPage() {
    if (!IsViewSteps('screen_buttons')) return ;
    return ViewSteps.SearchOpenPage();
}


// CAROUSEL

// Open carousel screen
// @title - carousel screen title
// @items - carousel items
// @options:
//      css - carousel screen css
//      text - carousel screen text
//
//      callbackView - optional - view associated for callback
function Carousel(title, items, options) {
    LogDebug('Carousel: ' + title + ' | ' + Len(items));
    LogDebug(options);

    // Options
    options = options || {};
    options.title = title;
    options.items = items;

    // Init
    ViewStepsInit('screen_carousel', ScreenCarousel, options);
}


// POPUPS

// Open popup
// @title - popup title (if null and no title in message: use default title, see Label.Popup*Title)
// @message - popup text (or 'title|text' if title null)
// @callback - call after close
// @options:
//      secs - seconds open (0 - no auto close, show confirm button, see Label.PopupClose)
//      imageUrl - alternative icon
function PopupError(title, message, callback, options)
{
    Popup('warning', title, message, callback, options);
}

function PopupWarn(title, message, callback, options)
{
    Popup('warning', title, message, callback, options);
}

function PopupInfo(title, message, callback, options)
{
    Popup('info', title, message, callback, options);
}

function Popup(icon, title, message, callback, options)
{
    LogDebug('Popup: ' + icon + ' | ' + title + ' | ' + message);
    LogDebug(options);

    // Options
    options = options || {};
    var text = message;
    if (!title)
    {
        title = Head(message, '|');
        text = Rest(message, '|');
        if (text == null)
        {
            text = message;
            title = Label('PopupWarnTitle');
            switch (icon)
            {
                case 'error': title = Label('PopupErrorTitle'); break;
                case 'info': title = Label('PopupInfoTitle'); break;
            }
        }
        else if (text == '')
        {
            text = null;
        }
    }
    options.html = true;
    options.title = Html(title);
    options.text = Html(text);
    if (!options.imageUrl) options.type = icon;
    var secs = options.secs || Frontend.PopupSecs;
    if (!secs) {
        options.showConfirmButton = true;
        options.confirmButtonColor = Frontend.PopupButton;
        options.confirmButtonText = Label('PopupClose');
    }
    else options.showConfirmButton = false;

    // Popup close
    PopupClose();
    IdleStop();

    // Popup open
    PopupTimer = Timer(PopupClosing ? 250 : 0, function() {
        PopupTimer = null;
        PopupOpen = true;
        PopupClosing = false;
        PopupCss = 'popup_' + icon;
        AppCssAdd(PopupCss);

        // SweetAlert open
        swal(options);

        // Close timer
        if (secs) {
            PopupTimer = Timer(secs * 1000, function() {
                PopupClose();
                if (callback)
                {
                    callback();
                }
            });
        }
    });
}

// Open confirm popup (yes/no)
// @title - popup title (if null and no title in message: use default title)
// @message - popup text (or 'title|text' if title null)
// @confirm - confirm button text or null for default (see Label.PopupConfirmConfirm)
// @cancel - cancel button text or null for default (see Label.PopupConfirmCancel)
// @callback - call(confirm) after close with argument true if confirmed
// @options:
//      imageUrl - alternative icon
function PopupConfirm(title, message, confirm, cancel, callback, options)
{
    LogDebug('Confirm: ' + title + ' | ' + message + ' | ' + confirm + ' | ' + cancel);
    LogDebug(options);

    // Options
    options = options || {};
    var text = message;
    if (!title)
    {
        title = Head(message, '|');
        text = Rest(message, '|');
        if (text == null)
        {
            text = message;
            title = Label('PopupConfirmTitle');
        }
        else if (text == '')
        {
            text = null;
        }
    }
    if (confirm == null) confirm = Label('PopupConfirmConfirm');
    if (cancel == null) cancel = Label('PopupConfirmCancel');
    options.html = true;
    options.title = Html(title);
    options.text = Html(text);
    if (!options.imageUrl) options.type = 'warning';
    if (confirm !== '')
    {
        options.showConfirmButton = true;
        options.confirmButtonColor = Frontend.PopupButton;
        options.confirmButtonText = confirm;
    }
    else options.showConfirmButton = false;
    if (cancel !== '')
    {
        options.showCancelButton = true;
        options.cancelButtonText = cancel;
    }
    else options.showCancelButton = false;
    options.closeOnConfirm = false;
    options.closeOnCancel = false;

    // Popup close
    PopupClose();

    // Popup timer open
    PopupTimer = Timer(PopupClosing ? 250 : 0, function() {
        PopupTimer = null;
        PopupOpen = true;
        PopupClosing = false;
        PopupCss = 'popup_confirm';
        AppCssAdd(PopupCss);

        // SweetAlert open and confirm callback
        swal(options, function(confirm) {
            PopupClose();
            if (callback)
            {
                callback(confirm);
            }
        });
    });
}

// Open input popup (integer value)
// @title - popup title (if null and no title in message: use default title)
// @message - popup text (or 'title|text' if title null)
// @value - input start value
// @confirm - confirm button text or null for default (see Label.PopupInputConfirm)
// @cancel - cancel button text or null for default (see Label.PopupInputCancel)
// @callback - call(value) after confirm with argument value if confirmed or null if cancel
// @options:
//      max - max size or 7
//      negative - negative available
//      zero - zero available
function PopupInput(title, message, value, confirm, cancel, callback, options)
{
    LogDebug('Input: ' + title + ' | ' + message);
    LogDebug(options);

    // Options
    options = options || {};
    var text = message;
    if (title === null)
    {
        title = Head(message, '|');
        text = Rest(message, '|');
        if (text === null)
        {
            text = message;
            title = Label('PopupInputTitle');
        }
        else if (text == '')
        {
            text = null;
        }
    }
    if (confirm == null) confirm = Label('PopupInputConfirm');
    if (cancel == null) cancel = Label('PopupInputCancel');
    options.title = title;
    options.text = text;
    options.value = value;
    options.confirm = confirm;
    options.cancel = cancel;
    options.callback = callback;

    // PopupInput init
    PopupInit('popup_input', PopupInput, options);
}

function IsPopupInput() {
    return IsViewOpen(PopupInput);
}

// Open keyboard popup
// @callback - Callback function: callback(text, key) or callback() if close. If delete -> key = false
// @options:
//      intro - introduction text
//      prefix - prefix text
//      css - popup css
//      noSpace - hide space button
//      noDigits - hide digits buttons
//      noDel - hide delete button
//      noText - hide A to Z buttons
function PopupKeyboard(callback, options) {
    LogDebug('Keyboard:');
    LogDebug(options);

    // Options
    options = options || {};
    options.callback = callback;

    // PopupKeyboard init
    PopupInit('popup_keyboard', PopupKeyboard, options);
}

// Is popup keyboard open
function IsPopupKeyboard() {
    return IsViewOpen(PopupKeyboard);
}

// Open status popup
// @title - Popup title
// @status - Popup status (see StatusIconCss)
// @text - Popup text
// @pairs - Popup pairs
// @options - not used
function PopupStatus(title, status, text, pairs, options) {
    LogDebug('Status: ' + title + ' | ' + status);
    LogDebug(options);

    // Options
    options = options || {};
    options.title = title;
    options.status = status;
    options.text = text;
    options.pairs = pairs;

    // PopupStatus init
    PopupInit('popup_status', PopupStatus, options);
}

function IsPopupStatus() {
    return IsViewOpen(PopupStatus);
}

// Popup init (and close any popup before)
function PopupInit(viewFile, view, options) {
    // Load page view if none
    if ((viewFile != null) && (view == null))
    {
        LogDebug("Popup require: " + viewFile);
        require(['views/' + Lower(viewFile) + ''], function(view) {
            LogDebug("Popup load: " + viewFile);
            PopupInit(view ? viewFile : null, new view(), options);
        });
        return;
    }

    // Close any popup
    PopupClose();

    // Popup timer open
    PopupTimer = Timer(PopupClosing ? 250 : 0, function() {
        LogInfo("Popup init" + Cat(": ", viewFile));
        PopupTimer = null;
        PopupOpen = true;
        PopupClosing = false;
        PopupView = view;
        PopupCss = viewFile;
        AppCssAdd(PopupCss);

        // Open -> PopupOpen
        if (PopupView && PopupView.open) PopupView.open(options);
    });
}

// Open popup
function PopupOpen(template, buttons)
{
    if (PopupView)
    {
        LogDebug("Popup open");
        ViewOpen('#popup', PopupView, template, buttons);
    }
    else
    {
        LogError("View page not defined, use ViewPage first");
    }
}


// Close popup
// @doNotCloseTimerPopup - if timer popup: do not close
function PopupClose(doNotCloseTimerPopup)
{
    // Do not close popups with timer associated
    if ((PopupTimer != null) && doNotCloseTimerPopup)
    {
        return;
    }

    // Close Swal
    if (PopupTimer != null)
    {
        TimerBreak(PopupTimer);
        PopupTimer = null;
    }
    if (PopupOpen)
    {
        LogDebug('Popup close');
        PopupOpen = false;
        PopupClosing = true;
        swal.close();                   // SweetAlert
        ViewClose(PopupView);       // PopupOpen
        PopupView = null;
        Timer(250, function() {
            PopupClosing = false;
            AppCssRemove(PopupCss);
        });
    }
}


// BREADCRUMB

// Set Breadcrumb step
// @step - step to set
// @css - optional - css to set
function Breadcrumb(step, css)
{
    LogDebug('Breadcrumb: ' + step);

    SetCss('#breadcrumb', css);

    CssRemove(J_Children('#breadcrumb'), 'breadcrumb_now');
    CssRemove(J_Children('#breadcrumb'), 'breadcrumb_prev');
    CssRemove(J_Children('#breadcrumb'), 'breadcrumb_next');
    CssRemove(J_Children('#breadcrumb'), 'breadcrumb_big');

    for (var i = 0; i < step; i++)
    {
        CssAdd('#breadcrumb li:nth-child(' + i + ')', 'breadcrumb_prev');
    }
    for (var i = step + 1; i <= 4; i++)
    {
        CssAdd('#breadcrumb li:nth-child(' + i + ')', 'breadcrumb_next');
    }

    var crumb = J('#breadcrumb li:nth-child(' + step + ')');
    CssAdd(crumb, 'breadcrumb_now' + ((crumb.text().length <= Frontend.BreadcrumbBig) ? ' breadcrumb_big' : ''));
}

// Set Breadcrumb text
// @step - step to set text
// @text - text to set
// @css - optional - step css
function BreadcrumbText(step, text, css)
{
    SetHtml('#breadcrumb li:nth-child(' + step + ') .breadcrumb_text', Str(Html(crumb)));
    SetCss('#breadcrumb li:nth-child(' + step + ') .breadcrumb_text', css);
}

// Show Breadcrumb
function BreadcrumbShow() {
    Show('#breadcrumb');
}

// Hide Breadcrumb
function BreadcrumbHide() {
    Hide('#breadcrumb');
}


// VIEW

// View page open
// Used to set #page view/template and 'step_' css
// @template - html template to open
// @buttons - optional - buttons to add event, see ViewEvents
function ViewPageOpen(template, buttons)
{
    // No page defined yet -> Error
    if (!ViewPage)
    {
        LogError("View page not defined, use ViewPage first");
    }
    // New page template
    else if (template)
    {
        var step = Str(ViewPage.viewStep);
        LogDebug("Page '" + ViewPageFile + "' #page step" + Cat(": ", step));
        ViewOpen('#page', ViewPage, template, buttons);
        ViewPageCss('step_' + step);
    }
    // Clean page
    else {
        LogDebug("Page '" + ViewPageFile + "' #page clean");
        ViewOpen('#page', ViewPage, template, buttons);
        ViewPageCss();
    }
}

// View page steps template
// Used to set #page #steps template and 'step_' css
// @template - html template to open
// @buttons - optional - buttons to add click, see ViewEvents
function ViewPageStepsOpen(template, buttons)
{
    // No page defined yet -> Error
    if (!ViewPage)
    {
        LogError("View page not defined, use ViewPage first");
    }
    // New page steps template
    else if (template) {
        var step = Str(ViewPage.viewStep);
        LogDebug("Page '" + ViewPageFile + "' #steps step" + Cat(": ", step));
        ViewChild('#steps', ViewPage, template, buttons);
        ViewPageCss('step_' + step);
    }
    // Clean page steps
    else {
        LogDebug("Page '" + ViewPageFile + "' #steps clean");
        ViewChild('#steps', ViewPage, template, buttons);
        ViewPageCss();
    }
}

// View steps open
// Used to set #steps view/template and 'steps_' css
// @template - html template to open
// @buttons - optional - buttons to add click, see ViewEvents
function ViewStepsOpen(template, buttons)
{
    // No steps defined yet -> Error
    if (!ViewSteps)
    {
        LogError("View steps not defined, use ViewStep first");
    }
    // New steps template
    else if (template) {
        var step = Str(ViewPage.viewStep);
        var steps = Str(ViewSteps.viewStep);
        LogDebug("Steps '" + ViewStepsFile + "' #steps step" + Cat(": ", steps));
        ViewOpen('#steps', ViewSteps, template, buttons);
        ViewPageCss('step_' + step);
        ViewStepsCss('steps_' + steps);
    }
    // Clean steps
    else
    {
        LogDebug("Steps '" + ViewStepsFile + "' #steps clean");
        ViewOpen('#steps', ViewSteps, template, buttons);
        ViewPageCss();
        ViewStepsCss();
    }
}

// View open
// @element - html element to set view/template
// @view - view to set
// @template - html template to open
// @buttons - optional - buttons to add event, see ViewEvents
function ViewOpen(element, view, template, buttons)
{
    if (view)
    {
        view.viewOpen = true;
        view.$el.html(template);
        view.$parent = J(element);
        view.$parent.html(view.$el);
        ViewEvents(view, buttons);
    }
}

function IsViewOpen(view) {
    return (view && view.viewOpen);
}


// View child template
// @child - html element to set template (view child)
// @view - view used to find child
// @template - html template to open
// @buttons - optional - buttons to add event, see ViewEvents
function ViewChild(child, view, template, buttons)
{
    SetHtml(J_View(view, child), template);
    ViewEvents(view, buttons);
}

// View events assign
// @view - view to validate events
// @buttons - optional - buttons to add click to view event (id - html id, click - click call event)
function ViewEvents(view, buttons)
{
    if (view)
    {
        if (!view.events)
        {
            view.events = {};
        }

        if (buttons)
        {
            for (var i = 0; i < Len(buttons); i++)
            {
                if (buttons[i].click)
                {
                    view.events["click #" + buttons[i].id] = buttons[i].click;
                }
            }
        }

        view.delegateEvents();
    }
}

// View close
// Call view close() and set to closed
// @view - view to close
function ViewClose(view)
{
    if (view && view.viewOpen)
    {
        view.viewOpen = false;
        view.close();
        view.unbind();
        view.remove();
    }
}

// View page close
function ViewPageClose() {
    ViewPageClean();
    ViewClose(ViewPage);
    ViewPageCss();
    AppCssRemove(ViewPageFile);
    ViewPage = null;
}

// View steps close
function ViewStepsClose() {
    ViewClose(ViewSteps);
    ViewStepsCss();
    AppCssRemove(ViewStepsFile);
    ViewSteps = null;
}

// View page clean
function ViewPageClean() {
    ViewStepsClose();
    if (ViewPage) ViewPageStepsOpen();
}

// Init page view
function ViewPageInit(viewFile, view, isOOS)
{
    // Load page view if none
    if ((viewFile != null) && (view == null))
    {
        LogDebug("Page require: " + viewFile);
        require(['views/' + Lower(viewFile) + ''], function(view) {
            LogDebug("Page load: " + viewFile);
            ViewPageInit(view ? viewFile : null, new view());
        });
        return;
    }

    // Close popups
    PopupClose(true);

    // Close current page
    ViewPageClose();

    // Set page view and global file css
    LogInfo("Page init" + Cat(": ", viewFile));
    ViewPage = view;
    ViewPageFile = viewFile;
    AppCssAdd(viewFile);

    // Open -> ViewPageOpen
    if (ViewPage && ViewPage.open) ViewPage.open();

    // Null -> OOS (if not already)
    if ((ViewPage == null) && !isOOS)
    {
        GoOutOfService();
    }
}

// Set steps view
function ViewStepsInit(viewFile, view, options)
{
    // Load page view if none
    if ((viewFile != null) && (view == null))
    {
        LogDebug("Steps require: " + viewFile);
        require(['views/' + Lower(viewFile) + ''], function(view) {
            LogDebug("Steps load: " + viewFile);
            ViewStepsInit(view ? viewFile : null, new view());
        });
        return;
    }

    // Close current steps
    ViewStepsClose();

    // Set page view and global file css
    LogInfo("Steps init" + Cat(": ", viewFile));
    ViewSteps = view;
    ViewStepsFile = viewFile;
    AppCssAdd(viewFile);

    // Open -> ViewStepsOpen
    if (ViewSteps && ViewSteps.open) ViewSteps.open(options);
}

function IsViewPage(viewFile) {
    if (!ViewPage) return false;
    return (viewFile == null) || (ViewPageFile == viewFile);
}

function IsViewSteps(viewFile) {
    if (!ViewSteps) return false;
    return (viewFile == null) || (ViewStepsFile == viewFile);
}

// Set page css to globals
function ViewPageCss(css)
{
    AppCssRemove(ViewPageCss);
    ViewPageCss = css;
    AppCssAdd(ViewPageCss);
}

// Add page css to globals
// @css - css to add, must be 'view_*' or 'type_*'
function ViewPageCssAdd(css)
{
    ViewPageCss = CssJoin(ViewPageCss, css);
    AppCssAdd(viewCss);
}

// Set steps css to globals
function ViewStepsCss(css)
{
    AppCssRemove(ViewStepsCss);
    ViewStepsCss = css;
    AppCssAdd(ViewStepsCss);
}

// Add steps css to globals
// @css - css to add, must be 'view_*' or 'type_*'
function ViewStepsCssAdd(css)
{
    ViewStepsCss = CssJoin(ViewStepsCss, css);
    AppCssAdd(viewCss);
}


// View step check
// Check if view's viewStep is of specific step
// @view - view to check
// @step - step to check
function ViewStepCheck(view, step)
{
    // NOTE: Null -> Ok, since its optional
    if ((step != null) && !Exist(step, view.viewStep))
    {
        LogError('Step check failed: ' + view.viewStep + ' != ' + step);
        return false;
    }
    else
    {
        return true;
    }
}

// View step set
// Set view's viewStep. Optionaly, check if view is on currentStep
// @view - view to set step
// @step - step to set
// @currentStep - optional - check step before set
function ViewStep(view, step, currentStep)
{
    // Current step check
    if ((currentStep != null) && !ViewStepCheck(view, currentStep))
    {
        return false;
    }

    // Null step -> Nok
    if (step == null)
    {
        return false;
    }

    // Set viewStep (and viewLastStep)
    view.viewLastStep = view.viewStep;
    view.viewStep = step;

    // Render
    view.render();

    // Ok
    return true;
}


// SLEEP

// Sleep set and view Sleep(on) call
// @on - state
function Sleep(on)
{
    if (DEBUG) LogDebug('Sleep: ' + on);

    // Set
    Sleep = on;

    // Callback: View.Sleep -> After set so thai it can update
    if (ViewPage && ViewPage.Sleep)
    {
        ViewPage.Sleep(on);
    }
}

// Sleep page view open
// @oos - OOS view
// @sleepTemplate - sleep view template
function SleepViewOpen(oos, sleepTemplate)
{
    if (!Sleep) return;
    if (!OutOfService == oos) return;
    if (!OutOfService && !InHome()) return;

    // Stop pending sleeps
    if (SleepTimer != null)
    {
        TimerBreak(SleepTimer);
        SleepTimer = null;
    }

    // Title
    var now = new Date();
    var title = now.getDate() + "/" + Zero2(now.getMonth() + 1) + "/" + now.getFullYear() + " " + now.getHours() + ":" + Zero2(now.getMinutes()) + ":" + Zero2(now.getSeconds());

    // Sleep
    ViewPageOpen(sleepTemplate({
        css: oos ? ' type_oos' : ' type_is',
        title: title,
        text: oos ? Label('OutOfServiceSleep') : Label('Touch'),
    }));
    ViewPageCssAdd('view_sleep' + (oos ? ' type_oos' : ' type_is'));

    // Random pos
    if (!SleepLoop)
    {
        SleepLoop = 1;
        SleepX = Frontend.SleepLeft + Math.floor(Math.random() * (WinW - Frontend.SleepWidth - Frontend.SleepLeft*2));
        SleepY = Frontend.SleepTop + Math.floor(Math.random() * (WinH - Frontend.SleepHeight - Frontend.SleepTop*2));
    }
    else if (++SleepLoop >= Frontend.SleepSecs)
    {
        SleepLoop = 0;
    }

    // Pos
    SetCssValue('#viewSleep_intro', 'top', SleepY);
    SetCssValue('#viewSleep_intro', 'left', SleepX);

    // Refresh (1s)
    SleepTimer = Timer(1000, function() { SleepViewOpen(oos, sleepTemplate); });
}


// ROUTE

// Check route (url #hash)
// @route - route to check
function IsRoute(route)
{
    return GetRoute() == route;
}

// Get route (url #hash)
function GetRoute()
{
    var route = window.location.hash;
    if (route) return PrefixRest(route, '#');
    return null;
}

// Set route (url #hash)
function SetRoute(route)
{
    LogDebug("Route set: " + (route || ''));
    window.location.hash = (route ? ('#' + route) : '');
}

// Go to OOS page
// @sleep - set sleep state
function GoOutOfService(sleep)
{
    OutOfService = true;
    GoMsec = null;
    SetRoute();
    Sleep(sleep);
}

// Go to Maintenance page
function GoMaintenance()
{
    Go('maintenance');
}

// Go to Home page
// @sleep - set sleep state
function GoHome(sleep)
{
    Go('home');
    Sleep(sleep);
}

// Go to Menu page
function GoMenu() {
    Go(Frontend.Menu);
}

// Go to page/flow
// @route - page/flow to route
function Go(route) {
    if (!route) return;
    OutOfService = false;
    GoMsec = DateMsec();
    SetRoute(route);
}

// Check route
function InMaintenance() { return IsRoute('maintenance'); }
function InHome() { return IsRoute('home'); }
function InMenu() { return IsRoute(Frontend.Menu); }


// HOME

// Home button reset state
// Set BtnHome label
// @css - optional - set style
// @isHide - optional - set show/hide state (true - hide, if not '' - show)
function HomeReset(css, isHide)
{
    HomeSetup(Label('BtnHome'), css, isHide);
}
// Home button set BtnExit label and style 'type_exit' (same args as HomeReset)
function HomeExit(css, isHide)
{
    HomeSetup(Label('BtnExit'), CssJoin('type_exit', css), isHide);
}
// Home button set BtnMenu label and style 'type_menu' (same args as HomeReset)
function HomeMenu(css, isHide)
{
    HomeSetup(Label('BtnMenu'), CssJoin('type_menu', css), isHide);
}
// Home button setup
// @text - optional - set text
// @css - optional - set style (remove always last css)
// @isHide - optional - set show/hide state (true - hide, if not '' - show)
function HomeSetup(text, css, isHide)
{
    HomeCallback = null;

    if (text != null) {
        SetHtml('.btn_home_text', text);
    }

    if (HomeCss)
    {
        CssRemove('#btn_home', HomeCss);
        HomeCss = null;
    }
    if (css)
    {
        CssAdd('#btn_home', css);
        HomeCss = css;
    }

    if (isHide) HomeHide();
    else if (isHide !== '') HomeShow();
}
// Home button show
function HomeShow()
{
    Show('#btn_home');
}
// Home button hide
function HomeHide()
{
    Hide('#btn_home');
}

// Home button callback on click
// @homeCallback - call homeCallback(reason) on home click (see HomeClick for reason)
function HomeCallback(homeCallback)
{
    HomeCallback = homeCallback;
}

// Home click
// @reason - call reason (see below)
// @sleep - optional - set sleep on GoHome(sleep) call
function HomeClick(reason, sleep)
{
    LogDebug('HomeClick: ' + reason + ', ' + sleep);

    // Reason:
    // false/null - Frontend.GoMenu = true - GoMenu, else GoHome
    // true - home button click, GoHome
    // idle - idle timer over, force GoHome
    // language - language select, GoHome
    // msg - controller msg, GoHome

    // Callback: HomeCallback -> True: Treated
    if (HomeCallback && HomeCallback(reason)) return;

    // Callback: View.Home -> True: Treated
    if (ViewPage && ViewPage.Home && ViewPage.Home(reason)) return;

    // GoMenu, if no reason and Frontend.GoMenu = true
    if (!reason && Frontend.GoMenu)
    {
        GoMenu();
    }
    // GoHome
    else
    {
        GoHome(sleep);
    }
}


// BACK/NEXT

// Back button reset state
// Set BtnBack label
// @css - optional - set style
// @isHide - optional - set show/hide state (true - hide, if not '' - show)
function BackReset(css, isHide)
{
    BackSetup(Label('BtnBack'), css, isHide);
}
// Back button set BtnCancel label and style 'type_cancel' (same args as BackReset)
function BackCancel(css, isHide)
{
    BackSetup(Label('BtnCancel'), CssJoin('type_cancel', css), isHide);
}
// Back button set BtnExit label (same args as BackReset)
function BackExit(css, isHide)
{
    BackReset(Label('BtnExit'), CssJoin('type_exit', css), isHide);
}
// Back button setup
// @text - optional - set text
// @css - optional - set style (remove always last style)
// @isHide - optional - set show/hide state (true - hide, if not '' - show)
function BackSetup(text, css, isHide)
{
    if (text != null) {
        SetHtml('.btn_back_text', text);
    }
    if (BackCss)
    {
        CssRemove('#btn_back', BackCss);
        BackCss = null;
    }
    if (css)
    {
        CssAdd('#btn_back', css);
        BackCss = css;
    }

    if (isHide) {
        BackHide();
    }
    else if (isHide !== '') {
        BackShow();
    }
}
// Back button show
function BackShow()
{
    Show('#btn_back');
}
// Back button hide
function BackHide()
{
    Hide('#btn_back');
}

// Next button reset state
// Set BtnNext label
// @css - optional - set style
// @isHide - optional - set show/hide state (true - hide, if not '' - show)
function NextReset(css, isHide)
{
    NextSetup(Label('BtnNext'), css, isHide);
}
// Next button set BtnConfirm label and style 'type_confirm' (same args as NextReset)
function NextConfirm(css, isHide)
{
    NextSetup(Label('BtnConfirm'), CssJoin('type_confirm', css), isHide);
}
// Next button set BtnSearch label and style 'type_search' (same args as NextReset)
function NextSearch(css, isHide)
{
    NextSetup(Label('BtnSearch'), CssJoin('type_search', css), isHide);
}
// Next button setup
// @text - optional - set text
// @css - optional - set style (remove always last style)
// @isHide - optional - set show/hide state (true - hide, if not '' - show)
function NextSetup(text, css, isHide)
{
    if (text != null) {
        SetHtml('.btn_next_text', text);
    }
    if (NextCss) {
        CssRemove('#btn_next', NextCss);
        NextCss = null;
    }
    if (css)
    {
        CssAdd('#btn_next', css);
        NextCss = css;
    }

    if (isHide) NextHide();
    else if (isHide !== '') NextShow();
}
// Next button show
function NextShow()
{
    Show('#btn_next');
}
// Next button hide
function NextHide()
{
    Hide('#btn_next');
}


// TIMER

// Start timer
// @msec - msecs to trigger
// @callback - call callback() on timer trigger
// @return - timer handler
function Timer(msec, callback)
{
    return setTimeout(callback, msec);
}

// Break timer
// @timer - timer handler to stop
function TimerBreak(timer)
{
    clearTimeout(timer);
}

// Timer in loop
// @msec - msecs to trigger
// @callback - call callback() on timer trigger
// @now - optional - call callback() on start to
function TimerLoop(msec, callback, now) {
    if (now) callback();
    Timer(msec, function() {
        TimerLoop(msec, callback, true);
    });
}


// IDLE

// Idle reset to Frontend.IdleSecs
function IdleReset()
{
    IdleStart(Frontend.IdleSecs);
}

// Set idle timeout to Frontend.PayCashSecs
function IdlePayCash()
{
    IdleStart(Frontend.PayCashSecs);
}
// Set idle timeout to Frontend.PayCardSecs
function IdlePayCard()
{
    IdleStart(Frontend.PayCardSecs);
}
// Set idle timeout to Frontend.MaintenanceLoginSecs
function IdleMaintenanceLogin()
{
    IdleStart(Frontend.MaintenanceLoginSecs);
}
// Set idle timeout to Frontend.MaintenanceSecs
function IdleMaintenance()
{
    IdleStart(Frontend.MaintenanceSecs);
}

function IdleStart(secs)
{
    // If no secs and last not defined -> Used frontend IdleSecs
    if (!secs && !IdleSecs)
    {
        secs = Frontend.IdleSecs;
        LogWarn('Idle secs missing! Using IdleSecs as default');
    }

    // Secs defined -> Define last IdelSecs
    if (secs)
    {
        IdleSecs = secs;
    }

    IdleStop();

    IdleTimer = Timer(IdleSecs * 1000, function() { IdlePopup(10); });
}

function IdlePopup(secs)
{
    if (secs > 0)
    {
        // Css
        AppCssAdd('layer_idle');

        // Open -> ViewOpen
        LayerIdle.open({
            secs: secs
        });

        // Check in 1s
        TimerBreak(IdleTimer);
        IdleTimer = Timer(1000, function() { IdlePopup(secs - 1); });
    }
    else
    {
        // Stop timer popup
        IdleStop();

        // Timer over -> GoHome
        LogDebug("Idle timer over -> GoHome");
        HomeClick("idle");
    }
}

function IdleStop()
{
    TimerBreak(IdleTimer);
    IdleTimer = null;
    ViewClose(LayerIdle);
    AppCssRemove('layer_idle');
}

function IdleRestart()
{
    if (IdleTimer)
    {
        IdleStart();
    }
}


// ICON

// Show icon, using font-awesome
// See "fonts\font-awesome.css" for a list of available icons
function Icon(fa, click, id, css) {
    if (click)
    {
        return '<span class="fa fa-' + fa + CssCat(css) + ' icon_click" onclick="' + click + '"' + Cat(' id="', id, '"') + '></span>';
    }
    else
    {
        return '<span class="fa fa-' + fa + CssCat(css) + '"' + Cat(' id="', id, '"') + '></span>';
    }
}

// Show print icon
function IconPrint(click) {
    return Icon('print', click);
}


// JQuery

function J(element)
{
    return $(element);
}

function J_View(view, child)
{
    return view.$(child);
}

function J_Event(ev)
{
    return $(ev.currentTarget);
}

function J_Child(element, child)
{
    return $(element).find(child);
}

function J_Children(element)
{
    return $(element).children();
}

function J_Clone(element)
{
    return $(element).clone();
}


// ATTR/PROP/ID

function GetId(element)
{
    return $(element).attr('id');
}

function SetId(element, id)
{
    $(element).attr('id', id);
}

function GetAttr(element, attr)
{
    return $(element).attr(attr);
}

function SetAttr(element, attr, value)
{
    $(element).attr(attr, value);
}

function GetProp(element, prop)
{
    return $(element).prop(prop);
}

function SetProp(element, prop, value)
{
    $(element).prop(attr, value);
}


// EVENT

function EventScroll(element, callback) { EventAdd(element, 'scroll', callback); }
function EventClick(element, callback) { EventAdd(element, 'click', callback); }

function EventAdd(element, event, callback)
{
    $(element).on(event, callback);
}

function EventRemove(element, event)
{
    $(element).off(event);
}

function EventX(event)
{
    return event.pageX;
}

function EventY(event)
{
    return event.pageY;
}

function IsEventLeft(event)
{
    return (event.button == 0);
}


// SHOW/HIDE

function IsShow(element)
{
    return $(element).is(":visible");
}

function Show(element)
{
    $(element).show();
}

function Hide(element)
{
    $(element).hide();
}

function ShowHide(isShow, element)
{
    if (isShow) Show(element);
    else Hide(element);
}


// EACH

function Each(element, callback)
{
    $(element).each(callback);
}


// CSS

function HasCss(element, css)
{
    return $(element).hasClass(css);
}

function GetCss(element)
{
    return GetAttr(element, 'class');
}

function SetCss(element, css)
{
    $(element).removeClass().addClass(css);
}

function SetCssHtml(element, css)
{
    $(element).css(css);
}

function SetCssValue(element, property, css)
{
    $(element).css(property, css);
}

function CssAdd(element, css)
{
    if (css == null) return;
    $(element).addClass(css);
}

function CssRemove(element, css)
{
    if (css == null) return;
    $(element).removeClass(css);
}

function CssAddRemove(isAdd, element, css)
{
    if (isAdd) CssAdd(element, css);
    else CssRemove(element, css);
}

function CssSwitch(element, css)
{
    if (css == null) return;
    $(element).toggleClass(css);
}

function CssJoin(css_args)
{
    var css = null;
    for (var i = 0; i < arguments.length; i++) css = Join(css, ' ', arguments[i]);
    return Str(css);
}

function Css(css)
{
    return Str(Cat(' class="', css, '"'));
}

function CssCat(css)
{
    return Str(Cat(' ', css));
}

function AppCssAdd(css)
{
    CssAdd('HTML', css);
}

function AppCssRemove(css)
{
    CssRemove('HTML', css);
}


// WIDTH/HEIGHT

function GetWidth(element)
{
    return $(element).width();
}

function SetWidth(element, width)
{
    $(element).width(width);
}

function GetHeight(element)
{
    return $(element).height();
}

function SetHeight(element, height)
{
    $(element).height(height);
}


// HTML/TEXT

// Remove text that destroys html
function HtmlText(text)
{
    return Html(text);
}

// Html block of label
function HtmlLabel(label) {
    return Html(Label(label));
}


// Html block (show spaces and \n)
function Html(text) {
    return Cat('<span class="html">', text, '</span>');
}

// No wrap text
function HtmlNoWrap(text)
{
    return Cat('<span class="html_nowrap">', text, '</span>');
}

// Cell -> Label/Text
function HtmlCell(cell) {
    // Bool
    if (IsBool(cell)) return Label(cell ? 'CellTrue' : 'CellFalse');
    // Text
    return HtmlText(cell);
}

// Format css
function HtmlCss(text, css)
{
    if (css == null) return text;
    return Cat('<span class="' + Str(css) + '">', text, '</span>');
}

// Format css (use div)
function HtmlDiv(text, css)
{
    if (css == null) return text;
    return Cat('<div class="' + Str(css) + '">', text, '</div>');
}

// Div id
function HtmlDivId(id, text, css)
{
    return '<div id="' + Str(id) + '" class="' + Str(css) + '">' + Str(text) + '</div>';
}

// Js
function HtmlJs(js)
{
    return '<script>' + Str(js) + '</script>';
}

// Br
function HtmlBr(times) {
    if (times == null) times = 1;
    return Repeat('<BR />', times);
}


// Switch visible block
function HtmlSwitch(text, cut, css, etc)
{
    if (Len(text) > cut)
    {
        return '<div class="html_switch ' + Str(css) + "\" onclick=\"CssSwitch(this, 'html_switch_all')\">"
            + Copy(text, 0, cut)
            + ((etc === null) ? '' : HtmlCss((etc === undefined) ? '...' : etc, 'html_switch_etc'))
            + HtmlCss(Copy(text, cut), 'html_switch_rest')
            + '</div>';
    }
    else
    {
        return htmlDiv(text, css);
    }
}

// JS to set html
function SetHtml(element, text) {
    $(element).html(text);
}

// JS to get html
function GetHtml(element, text) {
    return $(element).html();
}

// JS to append html
function HtmlAppend(element, html)
{
    $(element).append(html);
}

// JS to append (before) html
function HtmlBefore(element, html)
{
    $(element).before(html);
}

// JS to remove html
function HtmlRemove(element)
{
    $(element).remove();
}

// JS to get text
function GetText(element)
{
    return $(element).prop('innerText');
}

// JS to set text
function SetText(element, text)
{
    $(element).prop('innerText', text);
}


// DATE

function GetDateTime(date, sep) {
    if (sep == null) sep = ' ';
    return GetDate(date) + Str(sep) + GetTime(date);
}

function GetDate(date) {
    if (date == null) date = new Date();
    return date.getFullYear() + "/" + Zero2(date.getMonth() + 1) + "/" + Zero2(date.getDate());
}

function GetTime(date) {
    if (date == null) date = new Date();
    return Zero2(date.getHours()) + ":" + Zero2(date.getMinutes()) + ":" + Zero2(date.getSeconds());
}


// LOG

function LogError(text)
{
    console.error(text);
}

function LogWarn(text)
{
    console.warn(text);
}

function LogInfo(text)
{
    console.info(text);
}

function LogShow(text)
{
    console.log(text);
}

function LogDebug(text)
{
    if (DEBUG) console.debug(text);
}

function W(text, obj)
{
    console.warn(text);
    if (obj) console.debug(obj);
}
function L(text, obj)
{
    console.log(text);
    if (obj) console.debug(obj);
}


// TABLE

function TableHeader(name, scrollWidth, borderHeight)
{
    TableHeader_Loop(name, scrollWidth, borderHeight, 0);
}
function TableHeader_Loop(element, scrollWidth, borderHeight, loop)
{
    var table = J(element);
    var w = GetWidth(table);
    var hh = GetHeight(J_Child(table, 'thead'));
    if (hh == 0)
    {
        if (loop > 5)
        {
            LogDebug("TableHeader: Cannot calculate table size");
        }
        else
        {
            Timer(loop * loop * 10, function() { TableHeader_Loop(name, scrollWidth, borderHeight, loop + 1); });   // loop^2: 0, 1, 4, 9, 25
        }
        return;
    }

    // Create table header
    var tableHeader = J_Clone(table);
    CssAdd(tableHeader, 'table_TableHeader');
    SetWidth(tableHeader, w - scrollWidth + 1); // 1 = border
    SetHeight(tableHeader, hh + borderHeight);

    // Reset the ID attribute of each element in cloned table
    Each(J_Child(tableHeader, '*'), function(index, element) {
        var id = GetId(element);
        if (id)
        {
            SetId(element, id + '_TableHeader');
        }
    });

    // Place header over table
    HtmlRemove(J('.table_TableHeader'));
    HtmlBefore(table, tableHeader);
}

function GetTableRows(rows, cols, action) {
    TableRows = rows;
    TableCols = cols;
    TableAction = action;

    var resp = [];
    for (var i = 0; i < Len(rows); i++)
    {
        var item = rows[i];
        var row = [];
        // Cols
        for (var j = 0; j < Len(cols); j++)
        {
            row.push(item[cols[j]]);
        }
        // Action
        if (IsArray(action))
        {
            for (var j = 0; j < Len(action); j++)
            {
                row.push(action[j]);
            }
        }
        else if (action != null)
        {
            row.push(action);
        }
        resp.push(row);
    }
    return resp;
}

function GetTableLine(line)
{
    if (line < Len(TableRows))
    {
        return TableRows[line];
    }
    return null;
}

function GetTableLineCol(line, col)
{
    if (line < Len(TableRows))
    {
        return TableRows[line][col];
    }
    return null;
}

function IsTableIndexCol(index, cols)
{
    if (index < Len(TableCols))
    {
        return Exist(cols, TableCols[index]);
    }
    return false;
}
function IsTableIndexAction(index)
{
    return index >= Len(TableCols);
}


// SCROLL

function ScrollDown(element) {
    ScrollDown_Loop(element, 0);
}
function ScrollDown_Loop(element, loop) {
    var item = $(element)[0];
    var h = item.scrollHeight;
    if (h == 0)
    {
        if (loop > 5)
        {
            LogDebug("ScrollDown: Cannot calculate table size");
        }
        else
        {
            Timer(loop * loop * 10, function() { ScrollDown_Loop(element, loop + 1); });   // loop^2: 0, 1, 4, 9, 25
        }
        return;
    }

    // Top = height -> Scroll down
    item.scrollTop = h;
}

function ScrollDownLogs() {
    ScrollDown('.logs_box');
}

function ScrollDownTable() {
    var table = J('.table_box');
    ScrollDown(table[HasCss(table[0], 'table_TableHeader') ? 1 : 0]);
}


// PAYMETHODS

// Pay methods show/hide icons
function PayMethods() {
    var cashIcon = J('#payMethod_Cash');
    var cardIcon = J('#payMethod_Card');

    if (cashIcon)
    {
        if (Pay.Cash)
        {
            CssAdd(cashIcon, 'active');
        }
        else
        {
            CssRemove(cashIcon, 'active');
        }
    }

    if (cardIcon)
    {
        if (Pay.Card)
        {
            CssAdd(cardIcon, 'active');
        }
        else
        {
            CssRemove(cardIcon, 'active');
        }
    }
}

// Pay methods show css
function PayMethodsCss() {
    return CssJoin(
        Frontend.Cash ? 'type_pay_cash' : null,
        Frontend.Card ? 'type_pay_card' : null,
        (Frontend.Cash && Frontend.Card) ? 'type_pay_duo' : 'type_pay_solo'
    );
}


// FLOWS

function Flows(checkCallback)
{
    // Callback: View.Flows -> True: Treated
    if (checkCallback && ViewPage && ViewPage.Flows && ViewPage.Flows()) return;

    // Find buttons and filter
    var btns = J('.button_flow');
    for (var i = 0; i < Len(btns); i++)
    {
        var btn = btns.eq(i);
        var flow = GetAttr(btn, 'button-flow');
        var show = false;
        for (var j = 0; j < Len(Flows); j++)
        {
            if ((flow == Flows[j]) || HasWord(flow, Flows[j], ','))
            {
                show = true;
                break;
            }
        }
        if (show)
        {
            Show(btn);
        }
        else
        {
            Hide(btn);
        }
    }
}


// STATUS

function Status(status, cause, detail)
{
    // Set
    Status = status;
    StatusCause = cause;
    StatusDetail = detail;

    // Callback: View.Status -> After set so that it can update
    if (ViewPage && ViewPage.Status) {
        ViewPage.Status();
    }
}

function HasStatusCause(cause)
{
    return HasWord(StatusCause, cause, '|');
}

function StatusText(status, undef) {
    if (status < 0) return Label('StatusError');
    if (status > 0) return Label('StatusWarn');
    if (status == 0) return Label('StatusOk');
    return undef;
}

function StatusIconCss(status, undef) {
    if (status < 0) return 'type_error';
    if (status > 0) return 'type_warn';
    if (status == 0) return 'type_ok';
    if (status == true) return 'type_on';
    if (status == false) return 'type_off';
    return undef;
}


// FORMAT

function FormatPay(value, decimal, format, groupSep, decimals)
{
    if (value == null) return value;

    var amount = Str(Math.round(value));

    // Group separator (thousands)
    if (groupSep == null) groupSep = Amount.GroupSep;
    if (groupSep)
    {
        amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, groupSep);
    }

    // Decimal
    if (decimals == null) decimals = Amount.Decimals;
    if ((decimal != null) && (decimals > 0))
    {
        amount += (Amount.DecimalComma ? ',' : '.') + Copy((decimal + '00000'), 0, decimals);
    }

    // Predef -> Amount.Format
    if ((format == null) || (format === true))
    {
        return Replace(Amount.Format, '*', amount);
    }
    else if (format !== false)
    {
        return Replace(format, '*', amount);
    }
    else
    {
        return amount;
    }
}

function FormatAmount(amount, format, decimals)
{
    if (amount == null) return amount;

    amount += '';
    var value = Head(amount, '.');
    if (!value)
    {
        value = 0;
    }
    var decimal = Rest(amount, '.');
    if (decimals == null) decimals = Amount.Decimals;
    if (!decimal && (decimals > 0))
    {
        decimal = 0;
    }
    return FormatPay(value, decimal, format);
}

function FormatBlock(value, block, max, left)
{
    if (!value || !block) return value;

    var resp = '';
    var len = Len(value);

    for (var i = len - 1; i >= 0; i--)
    {
        resp = FormatBlock_char(value[i], block, left ? (i + 1) : (len - 1 - i), len, max, left) + resp;
    }

    return resp;
}

function FormatBlock_char(c, block, pos, len, max, left)
{
    if (IsFunc(block))
    {
        return c + Str(block(pos, len, max));
    }
    else if (IsNumber(block) && (block > 0) && (pos > 0) && ((pos % block) == 0) && (!max || (pos <= (max - block))))
    {
        return c + ' ';
    }
    else if (HasIndex(block, pos) || HasAttr(block, pos))
    {
        return c + Str(block[pos]);
    }
    else
    {
        return c;
    }
}

function FormatPassword(value)
{
    if (value == null) return value;
    return Repeat('*', Len(value));
}

function FormatDate(date, sep)
{
    if (Len(date) == 19)
    {
        return date.substring(0, 10) + ((sep == null) ? Label('DateTimeSep') : sep) + date.substring(11);
    }
    return date;
}


// HEARTBEAT

function HeartbeatStart()
{
    HeartbeatStop();

    HeartbeatTimer = setInterval(function() {
        if (!LoaderTimer)
        {
            HeartbeatTimestamp = DateTimestamp();
            Send('HEARTBEAT', {
                Timestamp: HeartbeatTimestamp
            });
        }
    }, 30000);
}

function HeartbeatStop()
{
    if (HeartbeatTimer)
    {
        TimerBreak(HeartbeatTimer);
        HeartbeatTimer = null;
    }
}

function HeartbeatResponse(msg)
{
    if (msg.Timestamp != HeartbeatTimestamp)
    {
        HeartbeatCounter++;
        LogError('Heartbeat skipped a beat: ' + HeartbeatCounter + (DEBUG ? (" (" + msg.Timestamp + " != " + HeartbeatTimestamp + ")") : ''));
    }
}


// FILE

// Load text file
function LoadText(url, successCallback, failedCallback) {
    LogInfo("Load text file: " + url);
    $.ajax({
        url : url,
        dataType: "text",
        success : successCallback,
        error: failedCallback,
    });
}


// CURRENCY

function CurrencySetup(currency)
{
    if (!currency) return;
    if (Amount && (Currency == currency)) return;

    var amount = eval('Amount_' + currency);
    if (amount != null) {
        Amount = amount;
        Currency = Amount.Currency;
        LogInfo('Currency: ' + Currency);
    }
    else LogWarn('Unknown currency: ' + currency);
}


// LANGUAGE

function Language(text, texts) {
    if (!texts) return null;
    var textLanguage = texts[Language];
    return (textLanguage != null) ? textLanguage : text;
}

function LanguageClick(ev)
{
    // Setup
    LanguageSetup(GetAttr(J_Event(ev), 'language'));

    // GoHome
    HomeClick("language");

    // Cancel bubble
    ev.cancelBubble = true;
    return false;
}

function LanguageSetup(language)
{
    if (!language) return;
    if (Label && (Language == language)) return;

    LogInfo("Language: " + language);
    LogInfo(language);

    var obj = eval('Label_' + language);
    if (obj != null) {
        Label = obj;
        Language = Label.Language;
        LogInfo('Language: ' + Language);
    }
    else LogWarn('Unknown language: ' + language);
}

function LanguageLabel(language, label)
{
    if (!language) return;

    if (Label) Label['Language_' + language] = label;

    var languages = Frontend.Languages;
    while (languages)
    {
        var item = Head(languages, ',');
        languages = Rest(languages, ',');

        var obj = eval("Label_" + item);
        if (obj) obj['Language_' + language] = label;
    }
}


// LOADER

// Open loader
function Loader()
{
    LogDebug('Loader');

    // Css
    AppCssAdd('layer_loader');

    // Open -> ViewOpen
    LayerLoader.open();

    // Close timeout
    if (LoaderTimer)
    {
        TimerBreak(LoaderTimer);
    }
    LoaderTimer = Timer(Frontend.LoaderSecs * 1000, function() { LoaderClose(); });
}

// Close loader
function LoaderClose()
{
    if (IsViewOpen(LayerLoader))
    {
        LogDebug('Loader close');
        ViewClose(LayerLoader);
        AppCssRemove('layer_loader');
    }

    // Stop timeout
    if (LoaderTimer)
    {
        TimerBreak(LoaderTimer);
        LoaderTimer = null;
    }
}


// MESSAGE

// Send message to controller
function Send(type, msg)
{
    if (!type) return;

    if (!Connected)
    {
        LogWarn('Cannot send: ' + type);
        return;
    }

    // Lock sending
    if (Sending)
    {
        Timer(100, function() { Send(type, msg); });
        return;
    }
    Sending = true;

    try
    {
        // Debug
        var hb = IsPrefix(type, 'HEARTBEAT');
        if ((DEBUG && !hb) || (HB && hb))
        {
            var msgJson = Slice(Json(msg), 1, -1);
            LogDebug(TimeLog() + ' < ' + (msgJson ? (type + ': ' + msgJson) : type));
        }

        // Msg + Type -> MsgText
        if (!msg)
        {
            msg = { Type: type };
        }
        else
        {
            msg.Type = type;
        }
        var msgText = JSON.stringify(msg);

        // Send
        Server.Send(msgText);
    }
    catch (e)
    {
        LogError('Send failed: ' + e.message);
    }

    // Unlock sending
    Timer(100, function() { Sending = false; });
}

// Send message to controller with loader open
function SendWithLoader(type, msg)
{
    // Stop timer since it is waiting for a response
    IdleStop();
    // Loader will close on response
    Loader();
    // Send
    Send(type, msg);
}

function SendInService(sleep)
{
    // Ignore any IS response so that it will not send to GoHome
    IgnoreInService = true;
    GoMsec = DateMsec();

    Send('IN_SERVICE', {
        Version: VersionFrontend,
        Language: Language,
        Sleep: sleep,
    });
}

function SendOutOfService(sleep)
{
    if (Connected)
    {
        Send('OUT_OF_SERVICE', {
            Version: VersionFrontend,
            Language: Language,
            Sleep: sleep,
        });
    }
}

function Received(msgText)
{
    if (!msgText) return;

    var msg = null;
    var type = null;
    try
    {
        // MsgText -> Msg + Type
        msg = JSON.parse(msgText);
        if (msg.hasOwnProperty('Type'))
        {
            type = msg.Type;
            delete msg.Type;
        }

        // Debug
        var hb = IsPrefix(type, 'HEARTBEAT');
        if ((DEBUG && !hb) || (HB && hb))
        {
            var msgJson = Slice(Json(msg), 1, -1);
            LogDebug(TimeLog() + ' > ' + (msgJson ? (type + ': ' + msgJson) : type));
        }
    }
    catch (e)
    {
        LogError('Received failed: ' + e.message);
        return
    }

    // Received
    if (type)
    {
        Msg.Received(type, msg);
    }
    else
    {
        LogError('Received error: ' + msgText);
    }
}

function FlowMsg(flow, msg)
{
    if (msg)
    {
        msg.Flow = flow;
        return msg;
    }
    else
    {
        return {
            Flow: flow
        };
    }
}


// CONTROLLER

function Connect()
{
    // Set up the Alchemy client object
    Server = new Alchemy({
        Server: ServerHost,
        Port: ServerPort,

        Connected: function()
        {
            LogInfo('Connection established');
            Sending = true;
            Connected = true;

            // Delay sending
            Timer(250, function() { Sending = false; });

            // Cancel reconnect
            if (ReconnectTimer != null)
            {
                TimerBreak(ReconnectTimer);
                ReconnectTimer = null;
            }

            // Frontend
            HeartbeatStart();
            IdleStop();
            GoOutOfService();
        },

        Disconnected: function()
        {
            if (Connected)
            {
                LogInfo('Connection closed');
                Connected = false;
            }

            // Reconnect
            Reconnect(true);

            // Frontend
            HeartbeatStop();
            IdleStop();
            GoOutOfService();
        },

        MessageReceived: function(event)
        {
            Received(event.data);
        }
    });

    Server.Start();
}

function Disconnect()
{
    if (Connected)
    {
        LogDebug('Disconnect connection');
        Connected = false;
    }

    // Reconnect
    Reconnect(true);
}

function Reconnect()
{
    if (ReconnectTimer == null)
    {
        // Wait before reconnect so that Controller has time to react
        ReconnectTimer = Timer(Frontend.ReconnectSecs * 1000, function() {
            ReconnectTimer = null;
            Server.Start();
        });
    }
}

function Reset(disconnect)
{
    // Close loader
    LoaderClose();

    // Close non timer popups
    PopupClose(true);

    // Pay reset
    Pay.Reset();

    // Controller disconnect
    if (disconnect)
    {
        Disconnect();
    }
}
