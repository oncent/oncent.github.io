var m={exports:{}};(function(h){var n={};n.generateIdentifier=function(){return Math.random().toString(36).substr(2,10)},n.localCName=n.generateIdentifier(),n.splitLines=function(r){return r.trim().split(`
`).map(function(e){return e.trim()})},n.splitSections=function(r){var e=r.split(`
m=`);return e.map(function(t,s){return(s>0?"m="+t:t).trim()+`\r
`})},n.getDescription=function(r){var e=n.splitSections(r);return e&&e[0]},n.getMediaSections=function(r){var e=n.splitSections(r);return e.shift(),e},n.matchPrefix=function(r,e){return n.splitLines(r).filter(function(t){return t.indexOf(e)===0})},n.parseCandidate=function(r){var e;r.indexOf("a=candidate:")===0?e=r.substring(12).split(" "):e=r.substring(10).split(" ");for(var t={foundation:e[0],component:parseInt(e[1],10),protocol:e[2].toLowerCase(),priority:parseInt(e[3],10),ip:e[4],address:e[4],port:parseInt(e[5],10),type:e[7]},s=8;s<e.length;s+=2)switch(e[s]){case"raddr":t.relatedAddress=e[s+1];break;case"rport":t.relatedPort=parseInt(e[s+1],10);break;case"tcptype":t.tcpType=e[s+1];break;case"ufrag":t.ufrag=e[s+1],t.usernameFragment=e[s+1];break;default:t[e[s]]=e[s+1];break}return t},n.writeCandidate=function(r){var e=[];e.push(r.foundation),e.push(r.component),e.push(r.protocol.toUpperCase()),e.push(r.priority),e.push(r.address||r.ip),e.push(r.port);var t=r.type;return e.push("typ"),e.push(t),t!=="host"&&r.relatedAddress&&r.relatedPort&&(e.push("raddr"),e.push(r.relatedAddress),e.push("rport"),e.push(r.relatedPort)),r.tcpType&&r.protocol.toLowerCase()==="tcp"&&(e.push("tcptype"),e.push(r.tcpType)),(r.usernameFragment||r.ufrag)&&(e.push("ufrag"),e.push(r.usernameFragment||r.ufrag)),"candidate:"+e.join(" ")},n.parseIceOptions=function(r){return r.substr(14).split(" ")},n.parseRtpMap=function(r){var e=r.substr(9).split(" "),t={payloadType:parseInt(e.shift(),10)};return e=e[0].split("/"),t.name=e[0],t.clockRate=parseInt(e[1],10),t.channels=e.length===3?parseInt(e[2],10):1,t.numChannels=t.channels,t},n.writeRtpMap=function(r){var e=r.payloadType;r.preferredPayloadType!==void 0&&(e=r.preferredPayloadType);var t=r.channels||r.numChannels||1;return"a=rtpmap:"+e+" "+r.name+"/"+r.clockRate+(t!==1?"/"+t:"")+`\r
`},n.parseExtmap=function(r){var e=r.substr(9).split(" ");return{id:parseInt(e[0],10),direction:e[0].indexOf("/")>0?e[0].split("/")[1]:"sendrecv",uri:e[1]}},n.writeExtmap=function(r){return"a=extmap:"+(r.id||r.preferredId)+(r.direction&&r.direction!=="sendrecv"?"/"+r.direction:"")+" "+r.uri+`\r
`},n.parseFmtp=function(r){for(var e={},t,s=r.substr(r.indexOf(" ")+1).split(";"),a=0;a<s.length;a++)t=s[a].trim().split("="),e[t[0].trim()]=t[1];return e},n.writeFmtp=function(r){var e="",t=r.payloadType;if(r.preferredPayloadType!==void 0&&(t=r.preferredPayloadType),r.parameters&&Object.keys(r.parameters).length){var s=[];Object.keys(r.parameters).forEach(function(a){r.parameters[a]?s.push(a+"="+r.parameters[a]):s.push(a)}),e+="a=fmtp:"+t+" "+s.join(";")+`\r
`}return e},n.parseRtcpFb=function(r){var e=r.substr(r.indexOf(" ")+1).split(" ");return{type:e.shift(),parameter:e.join(" ")}},n.writeRtcpFb=function(r){var e="",t=r.payloadType;return r.preferredPayloadType!==void 0&&(t=r.preferredPayloadType),r.rtcpFeedback&&r.rtcpFeedback.length&&r.rtcpFeedback.forEach(function(s){e+="a=rtcp-fb:"+t+" "+s.type+(s.parameter&&s.parameter.length?" "+s.parameter:"")+`\r
`}),e},n.parseSsrcMedia=function(r){var e=r.indexOf(" "),t={ssrc:parseInt(r.substr(7,e-7),10)},s=r.indexOf(":",e);return s>-1?(t.attribute=r.substr(e+1,s-e-1),t.value=r.substr(s+1)):t.attribute=r.substr(e+1),t},n.parseSsrcGroup=function(r){var e=r.substr(13).split(" ");return{semantics:e.shift(),ssrcs:e.map(function(t){return parseInt(t,10)})}},n.getMid=function(r){var e=n.matchPrefix(r,"a=mid:")[0];if(e)return e.substr(6)},n.parseFingerprint=function(r){var e=r.substr(14).split(" ");return{algorithm:e[0].toLowerCase(),value:e[1]}},n.getDtlsParameters=function(r,e){var t=n.matchPrefix(r+e,"a=fingerprint:");return{role:"auto",fingerprints:t.map(n.parseFingerprint)}},n.writeDtlsParameters=function(r,e){var t="a=setup:"+e+`\r
`;return r.fingerprints.forEach(function(s){t+="a=fingerprint:"+s.algorithm+" "+s.value+`\r
`}),t},n.parseCryptoLine=function(r){var e=r.substr(9).split(" ");return{tag:parseInt(e[0],10),cryptoSuite:e[1],keyParams:e[2],sessionParams:e.slice(3)}},n.writeCryptoLine=function(r){return"a=crypto:"+r.tag+" "+r.cryptoSuite+" "+(typeof r.keyParams=="object"?n.writeCryptoKeyParams(r.keyParams):r.keyParams)+(r.sessionParams?" "+r.sessionParams.join(" "):"")+`\r
`},n.parseCryptoKeyParams=function(r){if(r.indexOf("inline:")!==0)return null;var e=r.substr(7).split("|");return{keyMethod:"inline",keySalt:e[0],lifeTime:e[1],mkiValue:e[2]?e[2].split(":")[0]:void 0,mkiLength:e[2]?e[2].split(":")[1]:void 0}},n.writeCryptoKeyParams=function(r){return r.keyMethod+":"+r.keySalt+(r.lifeTime?"|"+r.lifeTime:"")+(r.mkiValue&&r.mkiLength?"|"+r.mkiValue+":"+r.mkiLength:"")},n.getCryptoParameters=function(r,e){var t=n.matchPrefix(r+e,"a=crypto:");return t.map(n.parseCryptoLine)},n.getIceParameters=function(r,e){var t=n.matchPrefix(r+e,"a=ice-ufrag:")[0],s=n.matchPrefix(r+e,"a=ice-pwd:")[0];return t&&s?{usernameFragment:t.substr(12),password:s.substr(10)}:null},n.writeIceParameters=function(r){return"a=ice-ufrag:"+r.usernameFragment+`\r
a=ice-pwd:`+r.password+`\r
`},n.parseRtpParameters=function(r){for(var e={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},t=n.splitLines(r),s=t[0].split(" "),a=3;a<s.length;a++){var i=s[a],p=n.matchPrefix(r,"a=rtpmap:"+i+" ")[0];if(p){var f=n.parseRtpMap(p),l=n.matchPrefix(r,"a=fmtp:"+i+" ");switch(f.parameters=l.length?n.parseFmtp(l[0]):{},f.rtcpFeedback=n.matchPrefix(r,"a=rtcp-fb:"+i+" ").map(n.parseRtcpFb),e.codecs.push(f),f.name.toUpperCase()){case"RED":case"ULPFEC":e.fecMechanisms.push(f.name.toUpperCase());break}}}return n.matchPrefix(r,"a=extmap:").forEach(function(u){e.headerExtensions.push(n.parseExtmap(u))}),e},n.writeRtpDescription=function(r,e){var t="";t+="m="+r+" ",t+=e.codecs.length>0?"9":"0",t+=" UDP/TLS/RTP/SAVPF ",t+=e.codecs.map(function(a){return a.preferredPayloadType!==void 0?a.preferredPayloadType:a.payloadType}).join(" ")+`\r
`,t+=`c=IN IP4 0.0.0.0\r
`,t+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,e.codecs.forEach(function(a){t+=n.writeRtpMap(a),t+=n.writeFmtp(a),t+=n.writeRtcpFb(a)});var s=0;return e.codecs.forEach(function(a){a.maxptime>s&&(s=a.maxptime)}),s>0&&(t+="a=maxptime:"+s+`\r
`),t+=`a=rtcp-mux\r
`,e.headerExtensions&&e.headerExtensions.forEach(function(a){t+=n.writeExtmap(a)}),t},n.parseRtpEncodingParameters=function(r){var e=[],t=n.parseRtpParameters(r),s=t.fecMechanisms.indexOf("RED")!==-1,a=t.fecMechanisms.indexOf("ULPFEC")!==-1,i=n.matchPrefix(r,"a=ssrc:").map(function(o){return n.parseSsrcMedia(o)}).filter(function(o){return o.attribute==="cname"}),p=i.length>0&&i[0].ssrc,f,l=n.matchPrefix(r,"a=ssrc-group:FID").map(function(o){var c=o.substr(17).split(" ");return c.map(function(d){return parseInt(d,10)})});l.length>0&&l[0].length>1&&l[0][0]===p&&(f=l[0][1]),t.codecs.forEach(function(o){if(o.name.toUpperCase()==="RTX"&&o.parameters.apt){var c={ssrc:p,codecPayloadType:parseInt(o.parameters.apt,10)};p&&f&&(c.rtx={ssrc:f}),e.push(c),s&&(c=JSON.parse(JSON.stringify(c)),c.fec={ssrc:p,mechanism:a?"red+ulpfec":"red"},e.push(c))}}),e.length===0&&p&&e.push({ssrc:p});var u=n.matchPrefix(r,"b=");return u.length&&(u[0].indexOf("b=TIAS:")===0?u=parseInt(u[0].substr(7),10):u[0].indexOf("b=AS:")===0?u=parseInt(u[0].substr(5),10)*1e3*.95-50*40*8:u=void 0,e.forEach(function(o){o.maxBitrate=u})),e},n.parseRtcpParameters=function(r){var e={},t=n.matchPrefix(r,"a=ssrc:").map(function(i){return n.parseSsrcMedia(i)}).filter(function(i){return i.attribute==="cname"})[0];t&&(e.cname=t.value,e.ssrc=t.ssrc);var s=n.matchPrefix(r,"a=rtcp-rsize");e.reducedSize=s.length>0,e.compound=s.length===0;var a=n.matchPrefix(r,"a=rtcp-mux");return e.mux=a.length>0,e},n.parseMsid=function(r){var e,t=n.matchPrefix(r,"a=msid:");if(t.length===1)return e=t[0].substr(7).split(" "),{stream:e[0],track:e[1]};var s=n.matchPrefix(r,"a=ssrc:").map(function(a){return n.parseSsrcMedia(a)}).filter(function(a){return a.attribute==="msid"});if(s.length>0)return e=s[0].value.split(" "),{stream:e[0],track:e[1]}},n.parseSctpDescription=function(r){var e=n.parseMLine(r),t=n.matchPrefix(r,"a=max-message-size:"),s;t.length>0&&(s=parseInt(t[0].substr(19),10)),isNaN(s)&&(s=65536);var a=n.matchPrefix(r,"a=sctp-port:");if(a.length>0)return{port:parseInt(a[0].substr(12),10),protocol:e.fmt,maxMessageSize:s};var i=n.matchPrefix(r,"a=sctpmap:");if(i.length>0){var p=n.matchPrefix(r,"a=sctpmap:")[0].substr(10).split(" ");return{port:parseInt(p[0],10),protocol:p[1],maxMessageSize:s}}},n.writeSctpDescription=function(r,e){var t=[];return r.protocol!=="DTLS/SCTP"?t=["m="+r.kind+" 9 "+r.protocol+" "+e.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+e.port+`\r
`]:t=["m="+r.kind+" 9 "+r.protocol+" "+e.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+e.port+" "+e.protocol+` 65535\r
`],e.maxMessageSize!==void 0&&t.push("a=max-message-size:"+e.maxMessageSize+`\r
`),t.join("")},n.generateSessionId=function(){return Math.random().toString().substr(2,21)},n.writeSessionBoilerplate=function(r,e,t){var s,a=e!==void 0?e:2;r?s=r:s=n.generateSessionId();var i=t||"thisisadapterortc";return`v=0\r
o=`+i+" "+s+" "+a+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`},n.writeMediaSection=function(r,e,t,s){var a=n.writeRtpDescription(r.kind,e);if(a+=n.writeIceParameters(r.iceGatherer.getLocalParameters()),a+=n.writeDtlsParameters(r.dtlsTransport.getLocalParameters(),t==="offer"?"actpass":"active"),a+="a=mid:"+r.mid+`\r
`,r.direction?a+="a="+r.direction+`\r
`:r.rtpSender&&r.rtpReceiver?a+=`a=sendrecv\r
`:r.rtpSender?a+=`a=sendonly\r
`:r.rtpReceiver?a+=`a=recvonly\r
`:a+=`a=inactive\r
`,r.rtpSender){var i="msid:"+s.id+" "+r.rtpSender.track.id+`\r
`;a+="a="+i,a+="a=ssrc:"+r.sendEncodingParameters[0].ssrc+" "+i,r.sendEncodingParameters[0].rtx&&(a+="a=ssrc:"+r.sendEncodingParameters[0].rtx.ssrc+" "+i,a+="a=ssrc-group:FID "+r.sendEncodingParameters[0].ssrc+" "+r.sendEncodingParameters[0].rtx.ssrc+`\r
`)}return a+="a=ssrc:"+r.sendEncodingParameters[0].ssrc+" cname:"+n.localCName+`\r
`,r.rtpSender&&r.sendEncodingParameters[0].rtx&&(a+="a=ssrc:"+r.sendEncodingParameters[0].rtx.ssrc+" cname:"+n.localCName+`\r
`),a},n.getDirection=function(r,e){for(var t=n.splitLines(r),s=0;s<t.length;s++)switch(t[s]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return t[s].substr(2)}return e?n.getDirection(e):"sendrecv"},n.getKind=function(r){var e=n.splitLines(r),t=e[0].split(" ");return t[0].substr(2)},n.isRejected=function(r){return r.split(" ",2)[1]==="0"},n.parseMLine=function(r){var e=n.splitLines(r),t=e[0].substr(2).split(" ");return{kind:t[0],port:parseInt(t[1],10),protocol:t[2],fmt:t.slice(3).join(" ")}},n.parseOLine=function(r){var e=n.matchPrefix(r,"o=")[0],t=e.substr(2).split(" ");return{username:t[0],sessionId:t[1],sessionVersion:parseInt(t[2],10),netType:t[3],addressType:t[4],address:t[5]}},n.isValidSDP=function(r){if(typeof r!="string"||r.length===0)return!1;for(var e=n.splitLines(r),t=0;t<e.length;t++)if(e[t].length<2||e[t].charAt(1)!=="=")return!1;return!0},h.exports=n})(m);const g=m.exports;export{g as S,m as s};