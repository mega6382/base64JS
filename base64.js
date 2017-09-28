
module.exports = 
{
	codes: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    decode: function(input)
	{
		var codes = this.codes;
		if(input == null)
		{
			console.log("INPUT IS NULL");
			return;
		}
		if (input.length % 4 != 0)
		{
			console.log("INVALID BASE64 STRING");
			return;
		}
		var decoded = [];
        decoded.push(((input.length * 3) / 4) - (input.indexOf('=') > 0 ? (input.length - input.indexOf('=')) : 0));
        var inChars = input.split("");
        var j = 0;
        var b = [];
        for (var i = 0; i < inChars.length; i += 4)
		{
            b[0] = codes.indexOf(inChars[i]);
            b[1] = codes.indexOf(inChars[i + 1]);
            b[2] = codes.indexOf(inChars[i + 2]);
            b[3] = codes.indexOf(inChars[i + 3]);
            decoded[j++] = ((b[0] << 2) | (b[1] >> 4));
            if (b[2] < 64)      {
                decoded[j++] = ((b[1] << 4) | (b[2] >> 2));
                if (b[3] < 64)  {
                    decoded[j++] = ((b[2] << 6) | b[3]);
	        }
            }
        }
		var decodedstr = '';
		for(var i=0;i<decoded.length;i++)
		{
			decodedstr += String.fromCharCode(decoded[i] % 256);

		}
        return decodedstr;
    },
    encode: function(input){
		var codes = this.codes;
		var inputlen = input.length;
		input = input.split("");
		var out = '';
        var b = '';
        for (var i = 0; i < inputlen; i += 3)  {
            b = (input[i].charCodeAt() & 0xFC) >> 2;
            out += (codes[b]);
            b = (input[i].charCodeAt() & 0x03) << 4;
            if (i + 1 < inputlen) {
                b |= (input[i + 1].charCodeAt() & 0xF0) >> 4;
                out += (codes[b]);
                b = (input[i + 1].charCodeAt() & 0x0F) << 2;
                if (i + 2 < inputlen)  {
                    b |= (input[i + 2].charCodeAt() & 0xC0) >> 6;
                    out += (codes[b]);
                    b = input[i + 2].charCodeAt() & 0x3F;
                    out += (codes[b]);
                } else  {
                    out += (codes[b]);
                    out += ('=');
                }
            } else{
                out += (codes[b]);
                out += ("==");
            }
        }

        return out;
    }

}