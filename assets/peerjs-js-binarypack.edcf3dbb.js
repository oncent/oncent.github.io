var s={exports:{}};(function(e){var t={};t.useBlobBuilder=function(){try{return new Blob([]),!1}catch{return!0}}(),t.useArrayBufferView=!t.useBlobBuilder&&function(){try{return new Blob([new Uint8Array([])]).size===0}catch{return!0}}(),e.exports.binaryFeatures=t;var r=e.exports.BlobBuilder;typeof window<"u"&&(r=e.exports.BlobBuilder=window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder||window.BlobBuilder);function f(){this._pieces=[],this._parts=[]}f.prototype.append=function(i){typeof i=="number"?this._pieces.push(i):(this.flush(),this._parts.push(i))},f.prototype.flush=function(){if(this._pieces.length>0){var i=new Uint8Array(this._pieces);t.useArrayBufferView||(i=i.buffer),this._parts.push(i),this._pieces=[]}},f.prototype.getBuffer=function(){if(this.flush(),t.useBlobBuilder){for(var i=new r,p=0,u=this._parts.length;p<u;p++)i.append(this._parts[p]);return i.getBlob()}else return new Blob(this._parts)},e.exports.BufferBuilder=f})(s);var d=s.exports.BufferBuilder,h=s.exports.binaryFeatures,o={unpack:function(e){var t=new n(e);return t.unpack()},pack:function(e){var t=new a;t.pack(e);var r=t.getBuffer();return r}},k=o;function n(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}n.prototype.unpack=function(){var e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;var t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}};n.prototype.unpack_uint8=function(){var e=this.dataView[this.index]&255;return this.index++,e};n.prototype.unpack_uint16=function(){var e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t};n.prototype.unpack_uint32=function(){var e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t};n.prototype.unpack_uint64=function(){var e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t};n.prototype.unpack_int8=function(){var e=this.unpack_uint8();return e<128?e:e-(1<<8)};n.prototype.unpack_int16=function(){var e=this.unpack_uint16();return e<32768?e:e-(1<<16)};n.prototype.unpack_int32=function(){var e=this.unpack_uint32();return e<Math.pow(2,31)?e:e-Math.pow(2,32)};n.prototype.unpack_int64=function(){var e=this.unpack_uint64();return e<Math.pow(2,63)?e:e-Math.pow(2,64)};n.prototype.unpack_raw=function(e){if(this.length<this.index+e)throw new Error("BinaryPackFailure: index is out of range "+this.index+" "+e+" "+this.length);var t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t};n.prototype.unpack_string=function(e){for(var t=this.read(e),r=0,f="",i,p;r<e;)i=t[r],i<128?(f+=String.fromCharCode(i),r++):(i^192)<32?(p=(i^192)<<6|t[r+1]&63,f+=String.fromCharCode(p),r+=2):(p=(i&15)<<12|(t[r+1]&63)<<6|t[r+2]&63,f+=String.fromCharCode(p),r+=3);return this.index+=e,f};n.prototype.unpack_array=function(e){for(var t=new Array(e),r=0;r<e;r++)t[r]=this.unpack();return t};n.prototype.unpack_map=function(e){for(var t={},r=0;r<e;r++){var f=this.unpack(),i=this.unpack();t[f]=i}return t};n.prototype.unpack_float=function(){var e=this.unpack_uint32(),t=e>>31,r=(e>>23&255)-127,f=e&8388607|8388608;return(t===0?1:-1)*f*Math.pow(2,r-23)};n.prototype.unpack_double=function(){var e=this.unpack_uint32(),t=this.unpack_uint32(),r=e>>31,f=(e>>20&2047)-1023,i=e&1048575|1048576,p=i*Math.pow(2,f-20)+t*Math.pow(2,f-52);return(r===0?1:-1)*p};n.prototype.read=function(e){var t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")};function a(){this.bufferBuilder=new d}a.prototype.getBuffer=function(){return this.bufferBuilder.getBuffer()};a.prototype.pack=function(e){var t=typeof e;if(t==="string")this.pack_string(e);else if(t==="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(t==="boolean")e===!0?this.bufferBuilder.append(195):e===!1&&this.bufferBuilder.append(194);else if(t==="undefined")this.bufferBuilder.append(192);else if(t==="object")if(e===null)this.bufferBuilder.append(192);else{var r=e.constructor;if(r==Array)this.pack_array(e);else if(r==Blob||r==File||e instanceof Blob||e instanceof File)this.pack_bin(e);else if(r==ArrayBuffer)h.useArrayBufferView?this.pack_bin(new Uint8Array(e)):this.pack_bin(e);else if("BYTES_PER_ELEMENT"in e)h.useArrayBufferView?this.pack_bin(new Uint8Array(e.buffer)):this.pack_bin(e.buffer);else if(r==Object||r.toString().startsWith("class"))this.pack_object(e);else if(r==Date)this.pack_string(e.toString());else if(typeof e.toBinaryPack=="function")this.bufferBuilder.append(e.toBinaryPack());else throw new Error('Type "'+r.toString()+'" not yet supported')}else throw new Error('Type "'+t+'" not yet supported');this.bufferBuilder.flush()};a.prototype.pack_bin=function(e){var t=e.length||e.byteLength||e.size;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this.bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this.bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this.bufferBuilder.append(e)};a.prototype.pack_string=function(e){var t=x(e);if(t<=15)this.pack_uint8(176+t);else if(t<=65535)this.bufferBuilder.append(216),this.pack_uint16(t);else if(t<=4294967295)this.bufferBuilder.append(217),this.pack_uint32(t);else throw new Error("Invalid length");this.bufferBuilder.append(e)};a.prototype.pack_array=function(e){var t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this.bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this.bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");for(var r=0;r<t;r++)this.pack(e[r])};a.prototype.pack_integer=function(e){if(e>=-32&&e<=127)this.bufferBuilder.append(e&255);else if(e>=0&&e<=255)this.bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this.bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this.bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this.bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this.bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this.bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this.bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this.bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")};a.prototype.pack_double=function(e){var t=0;e<0&&(t=1,e=-e);var r=Math.floor(Math.log(e)/Math.LN2),f=e/Math.pow(2,r)-1,i=Math.floor(f*Math.pow(2,52)),p=Math.pow(2,32),u=t<<31|r+1023<<20|i/p&1048575,c=i%p;this.bufferBuilder.append(203),this.pack_int32(u),this.pack_int32(c)};a.prototype.pack_object=function(e){var t=Object.keys(e),r=t.length;if(r<=15)this.pack_uint8(128+r);else if(r<=65535)this.bufferBuilder.append(222),this.pack_uint16(r);else if(r<=4294967295)this.bufferBuilder.append(223),this.pack_uint32(r);else throw new Error("Invalid length");for(var f in e)e.hasOwnProperty(f)&&(this.pack(f),this.pack(e[f]))};a.prototype.pack_uint8=function(e){this.bufferBuilder.append(e)};a.prototype.pack_uint16=function(e){this.bufferBuilder.append(e>>8),this.bufferBuilder.append(e&255)};a.prototype.pack_uint32=function(e){var t=e&4294967295;this.bufferBuilder.append((t&4278190080)>>>24),this.bufferBuilder.append((t&16711680)>>>16),this.bufferBuilder.append((t&65280)>>>8),this.bufferBuilder.append(t&255)};a.prototype.pack_uint64=function(e){var t=e/Math.pow(2,32),r=e%Math.pow(2,32);this.bufferBuilder.append((t&4278190080)>>>24),this.bufferBuilder.append((t&16711680)>>>16),this.bufferBuilder.append((t&65280)>>>8),this.bufferBuilder.append(t&255),this.bufferBuilder.append((r&4278190080)>>>24),this.bufferBuilder.append((r&16711680)>>>16),this.bufferBuilder.append((r&65280)>>>8),this.bufferBuilder.append(r&255)};a.prototype.pack_int8=function(e){this.bufferBuilder.append(e&255)};a.prototype.pack_int16=function(e){this.bufferBuilder.append((e&65280)>>8),this.bufferBuilder.append(e&255)};a.prototype.pack_int32=function(e){this.bufferBuilder.append(e>>>24&255),this.bufferBuilder.append((e&16711680)>>>16),this.bufferBuilder.append((e&65280)>>>8),this.bufferBuilder.append(e&255)};a.prototype.pack_int64=function(e){var t=Math.floor(e/Math.pow(2,32)),r=e%Math.pow(2,32);this.bufferBuilder.append((t&4278190080)>>>24),this.bufferBuilder.append((t&16711680)>>>16),this.bufferBuilder.append((t&65280)>>>8),this.bufferBuilder.append(t&255),this.bufferBuilder.append((r&4278190080)>>>24),this.bufferBuilder.append((r&16711680)>>>16),this.bufferBuilder.append((r&65280)>>>8),this.bufferBuilder.append(r&255)};function l(e){var t=e.charCodeAt(0);return t<=2047?"00":t<=65535?"000":t<=2097151?"0000":t<=67108863?"00000":"000000"}function x(e){return e.length>600?new Blob([e]).size:e.replace(/[^\u0000-\u007F]/g,l).length}export{k as b};
