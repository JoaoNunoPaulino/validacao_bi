console.log('start frontend');

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