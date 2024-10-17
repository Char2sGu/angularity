import{a as yt}from"./chunk-MLK7XKAI.js";import{A as pt}from"./chunk-2WOKOXKQ.js";import{$a as mt,Fa as V,G as ft,I as ut,Ja as _t,b as Zt,c as Ft,cb as Et,eb as gt,fb as xt,gb as kt,h as J,hb as Rt,ib as Ot,jb as bt,kb as Nt,mb as C}from"./chunk-YHEXN7RU.js";import{h as dt}from"./chunk-TWZW5B45.js";var Tt=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function Wt(t){return typeof t=="string"&&Tt.test(t)}var At=Wt;var A=[];for(let t=0;t<256;++t)A.push((t+256).toString(16).slice(1));function Mt(t,e=0){return A[t[e+0]]+A[t[e+1]]+A[t[e+2]]+A[t[e+3]]+"-"+A[t[e+4]]+A[t[e+5]]+"-"+A[t[e+6]]+A[t[e+7]]+"-"+A[t[e+8]]+A[t[e+9]]+"-"+A[t[e+10]]+A[t[e+11]]+A[t[e+12]]+A[t[e+13]]+A[t[e+14]]+A[t[e+15]]}function Ut(t){if(!At(t))throw TypeError("Invalid UUID");let e,r=new Uint8Array(16);return r[0]=(e=parseInt(t.slice(0,8),16))>>>24,r[1]=e>>>16&255,r[2]=e>>>8&255,r[3]=e&255,r[4]=(e=parseInt(t.slice(9,13),16))>>>8,r[5]=e&255,r[6]=(e=parseInt(t.slice(14,18),16))>>>8,r[7]=e&255,r[8]=(e=parseInt(t.slice(19,23),16))>>>8,r[9]=e&255,r[10]=(e=parseInt(t.slice(24,36),16))/1099511627776&255,r[11]=e/4294967296&255,r[12]=e>>>24&255,r[13]=e>>>16&255,r[14]=e>>>8&255,r[15]=e&255,r}var vt=Ut;function Ht(t){t=unescape(encodeURIComponent(t));let e=[];for(let r=0;r<t.length;++r)e.push(t.charCodeAt(r));return e}var zt="6ba7b810-9dad-11d1-80b4-00c04fd430c8",Kt="6ba7b811-9dad-11d1-80b4-00c04fd430c8";function it(t,e,r){function f(l,y,u,o){var h;if(typeof l=="string"&&(l=Ht(l)),typeof y=="string"&&(y=vt(y)),((h=y)===null||h===void 0?void 0:h.length)!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let _=new Uint8Array(16+l.length);if(_.set(y),_.set(l,y.length),_=r(_),_[6]=_[6]&15|e,_[8]=_[8]&63|128,u){o=o||0;for(let E=0;E<16;++E)u[o+E]=_[E];return u}return Mt(_)}try{f.name=t}catch{}return f.DNS=zt,f.URL=Kt,f}function Vt(t,e,r,f){switch(t){case 0:return e&r^~e&f;case 1:return e^r^f;case 2:return e&r^e&f^r&f;case 3:return e^r^f}}function at(t,e){return t<<e|t>>>32-e}function Gt(t){let e=[1518500249,1859775393,2400959708,3395469782],r=[1732584193,4023233417,2562383102,271733878,3285377520];if(typeof t=="string"){let u=unescape(encodeURIComponent(t));t=[];for(let o=0;o<u.length;++o)t.push(u.charCodeAt(o))}else Array.isArray(t)||(t=Array.prototype.slice.call(t));t.push(128);let f=t.length/4+2,l=Math.ceil(f/16),y=new Array(l);for(let u=0;u<l;++u){let o=new Uint32Array(16);for(let h=0;h<16;++h)o[h]=t[u*64+h*4]<<24|t[u*64+h*4+1]<<16|t[u*64+h*4+2]<<8|t[u*64+h*4+3];y[u]=o}y[l-1][14]=(t.length-1)*8/Math.pow(2,32),y[l-1][14]=Math.floor(y[l-1][14]),y[l-1][15]=(t.length-1)*8&4294967295;for(let u=0;u<l;++u){let o=new Uint32Array(80);for(let p=0;p<16;++p)o[p]=y[u][p];for(let p=16;p<80;++p)o[p]=at(o[p-3]^o[p-8]^o[p-14]^o[p-16],1);let h=r[0],_=r[1],E=r[2],g=r[3],k=r[4];for(let p=0;p<80;++p){let N=Math.floor(p/20),I=at(h,5)+Vt(N,_,E,g)+k+e[N]+o[p]>>>0;k=g,g=E,E=at(_,30)>>>0,_=h,h=I}r[0]=r[0]+h>>>0,r[1]=r[1]+_>>>0,r[2]=r[2]+E>>>0,r[3]=r[3]+g>>>0,r[4]=r[4]+k>>>0}return[r[0]>>24&255,r[0]>>16&255,r[0]>>8&255,r[0]&255,r[1]>>24&255,r[1]>>16&255,r[1]>>8&255,r[1]&255,r[2]>>24&255,r[2]>>16&255,r[2]>>8&255,r[2]&255,r[3]>>24&255,r[3]>>16&255,r[3]>>8&255,r[3]&255,r[4]>>24&255,r[4]>>16&255,r[4]>>8&255,r[4]&255]}var St=Gt;var Xt=it("v5",80,St),nt=Xt;var Ze=dt(Zt(),1),Fe=dt(Ft(),1);var st=function(){var t=function(v,a,n,c){for(n=n||{},c=v.length;c--;n[v[c]]=a);return n},e=[6,8,10,20,22,24,26,27,28],r=[1,10],f=[1,11],l=[1,12],y=[1,13],u=[1,14],o=[1,15],h=[1,21],_=[1,22],E=[1,23],g=[1,24],k=[1,25],p=[6,8,10,13,15,18,19,20,22,24,26,27,28,41,42,43,44,45],N=[1,34],I=[27,28,46,47],F=[41,42,43,44,45],W=[17,34],P=[1,54],T=[1,53],M=[17,34,36,38],R={trace:function(){},yy:{},symbols_:{error:2,start:3,ER_DIAGRAM:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,entityName:11,relSpec:12,":":13,role:14,BLOCK_START:15,attributes:16,BLOCK_STOP:17,SQS:18,SQE:19,title:20,title_value:21,acc_title:22,acc_title_value:23,acc_descr:24,acc_descr_value:25,acc_descr_multiline_value:26,ALPHANUM:27,ENTITY_NAME:28,attribute:29,attributeType:30,attributeName:31,attributeKeyTypeList:32,attributeComment:33,ATTRIBUTE_WORD:34,attributeKeyType:35,COMMA:36,ATTRIBUTE_KEY:37,COMMENT:38,cardinality:39,relType:40,ZERO_OR_ONE:41,ZERO_OR_MORE:42,ONE_OR_MORE:43,ONLY_ONE:44,MD_PARENT:45,NON_IDENTIFYING:46,IDENTIFYING:47,WORD:48,$accept:0,$end:1},terminals_:{2:"error",4:"ER_DIAGRAM",6:"EOF",8:"SPACE",10:"NEWLINE",13:":",15:"BLOCK_START",17:"BLOCK_STOP",18:"SQS",19:"SQE",20:"title",21:"title_value",22:"acc_title",23:"acc_title_value",24:"acc_descr",25:"acc_descr_value",26:"acc_descr_multiline_value",27:"ALPHANUM",28:"ENTITY_NAME",34:"ATTRIBUTE_WORD",36:"COMMA",37:"ATTRIBUTE_KEY",38:"COMMENT",41:"ZERO_OR_ONE",42:"ZERO_OR_MORE",43:"ONE_OR_MORE",44:"ONLY_ONE",45:"MD_PARENT",46:"NON_IDENTIFYING",47:"IDENTIFYING",48:"WORD"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,5],[9,4],[9,3],[9,1],[9,7],[9,6],[9,4],[9,2],[9,2],[9,2],[9,1],[11,1],[11,1],[16,1],[16,2],[29,2],[29,3],[29,3],[29,4],[30,1],[31,1],[32,1],[32,3],[35,1],[33,1],[12,3],[39,1],[39,1],[39,1],[39,1],[39,1],[40,1],[40,1],[14,1],[14,1],[14,1]],performAction:function(a,n,c,d,m,i,G){var s=i.length-1;switch(m){case 1:break;case 2:this.$=[];break;case 3:i[s-1].push(i[s]),this.$=i[s-1];break;case 4:case 5:this.$=i[s];break;case 6:case 7:this.$=[];break;case 8:d.addEntity(i[s-4]),d.addEntity(i[s-2]),d.addRelationship(i[s-4],i[s],i[s-2],i[s-3]);break;case 9:d.addEntity(i[s-3]),d.addAttributes(i[s-3],i[s-1]);break;case 10:d.addEntity(i[s-2]);break;case 11:d.addEntity(i[s]);break;case 12:d.addEntity(i[s-6],i[s-4]),d.addAttributes(i[s-6],i[s-1]);break;case 13:d.addEntity(i[s-5],i[s-3]);break;case 14:d.addEntity(i[s-3],i[s-1]);break;case 15:case 16:this.$=i[s].trim(),d.setAccTitle(this.$);break;case 17:case 18:this.$=i[s].trim(),d.setAccDescription(this.$);break;case 19:case 43:this.$=i[s];break;case 20:case 41:case 42:this.$=i[s].replace(/"/g,"");break;case 21:case 29:this.$=[i[s]];break;case 22:i[s].push(i[s-1]),this.$=i[s];break;case 23:this.$={attributeType:i[s-1],attributeName:i[s]};break;case 24:this.$={attributeType:i[s-2],attributeName:i[s-1],attributeKeyTypeList:i[s]};break;case 25:this.$={attributeType:i[s-2],attributeName:i[s-1],attributeComment:i[s]};break;case 26:this.$={attributeType:i[s-3],attributeName:i[s-2],attributeKeyTypeList:i[s-1],attributeComment:i[s]};break;case 27:case 28:case 31:this.$=i[s];break;case 30:i[s-2].push(i[s]),this.$=i[s-2];break;case 32:this.$=i[s].replace(/"/g,"");break;case 33:this.$={cardA:i[s],relType:i[s-1],cardB:i[s-2]};break;case 34:this.$=d.Cardinality.ZERO_OR_ONE;break;case 35:this.$=d.Cardinality.ZERO_OR_MORE;break;case 36:this.$=d.Cardinality.ONE_OR_MORE;break;case 37:this.$=d.Cardinality.ONLY_ONE;break;case 38:this.$=d.Cardinality.MD_PARENT;break;case 39:this.$=d.Identification.NON_IDENTIFYING;break;case 40:this.$=d.Identification.IDENTIFYING;break}},table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:9,20:r,22:f,24:l,26:y,27:u,28:o},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:16,11:9,20:r,22:f,24:l,26:y,27:u,28:o},t(e,[2,5]),t(e,[2,6]),t(e,[2,11],{12:17,39:20,15:[1,18],18:[1,19],41:h,42:_,43:E,44:g,45:k}),{21:[1,26]},{23:[1,27]},{25:[1,28]},t(e,[2,18]),t(p,[2,19]),t(p,[2,20]),t(e,[2,4]),{11:29,27:u,28:o},{16:30,17:[1,31],29:32,30:33,34:N},{11:35,27:u,28:o},{40:36,46:[1,37],47:[1,38]},t(I,[2,34]),t(I,[2,35]),t(I,[2,36]),t(I,[2,37]),t(I,[2,38]),t(e,[2,15]),t(e,[2,16]),t(e,[2,17]),{13:[1,39]},{17:[1,40]},t(e,[2,10]),{16:41,17:[2,21],29:32,30:33,34:N},{31:42,34:[1,43]},{34:[2,27]},{19:[1,44]},{39:45,41:h,42:_,43:E,44:g,45:k},t(F,[2,39]),t(F,[2,40]),{14:46,27:[1,49],28:[1,48],48:[1,47]},t(e,[2,9]),{17:[2,22]},t(W,[2,23],{32:50,33:51,35:52,37:P,38:T}),t([17,34,37,38],[2,28]),t(e,[2,14],{15:[1,55]}),t([27,28],[2,33]),t(e,[2,8]),t(e,[2,41]),t(e,[2,42]),t(e,[2,43]),t(W,[2,24],{33:56,36:[1,57],38:T}),t(W,[2,25]),t(M,[2,29]),t(W,[2,32]),t(M,[2,31]),{16:58,17:[1,59],29:32,30:33,34:N},t(W,[2,26]),{35:60,37:P},{17:[1,61]},t(e,[2,13]),t(M,[2,30]),t(e,[2,12])],defaultActions:{34:[2,27],41:[2,22]},parseError:function(a,n){if(n.recoverable)this.trace(a);else{var c=new Error(a);throw c.hash=n,c}},parse:function(a){var n=this,c=[0],d=[],m=[null],i=[],G=this.table,s="",Q=0,lt=0,Bt=2,ct=1,Ct=i.slice.call(arguments,1),b=Object.create(this.lexer),H={yy:{}};for(var $ in this.yy)Object.prototype.hasOwnProperty.call(this.yy,$)&&(H.yy[$]=this.yy[$]);b.setInput(a,H.yy),H.yy.lexer=b,H.yy.parser=this,typeof b.yylloc>"u"&&(b.yylloc={});var tt=b.yylloc;i.push(tt);var Pt=b.options&&b.options.ranges;typeof H.yy.parseError=="function"?this.parseError=H.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Yt(){var Z;return Z=d.pop()||b.lex()||ct,typeof Z!="number"&&(Z instanceof Array&&(d=Z,Z=d.pop()),Z=n.symbols_[Z]||Z),Z}for(var S,z,w,et,K={},q,Y,ht,j;;){if(z=c[c.length-1],this.defaultActions[z]?w=this.defaultActions[z]:((S===null||typeof S>"u")&&(S=Yt()),w=G[z]&&G[z][S]),typeof w>"u"||!w.length||!w[0]){var rt="";j=[];for(q in G[z])this.terminals_[q]&&q>Bt&&j.push("'"+this.terminals_[q]+"'");b.showPosition?rt="Parse error on line "+(Q+1)+`:
`+b.showPosition()+`
Expecting `+j.join(", ")+", got '"+(this.terminals_[S]||S)+"'":rt="Parse error on line "+(Q+1)+": Unexpected "+(S==ct?"end of input":"'"+(this.terminals_[S]||S)+"'"),this.parseError(rt,{text:b.match,token:this.terminals_[S]||S,line:b.yylineno,loc:tt,expected:j})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+z+", token: "+S);switch(w[0]){case 1:c.push(S),m.push(b.yytext),i.push(b.yylloc),c.push(w[1]),S=null,lt=b.yyleng,s=b.yytext,Q=b.yylineno,tt=b.yylloc;break;case 2:if(Y=this.productions_[w[1]][1],K.$=m[m.length-Y],K._$={first_line:i[i.length-(Y||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(Y||1)].first_column,last_column:i[i.length-1].last_column},Pt&&(K._$.range=[i[i.length-(Y||1)].range[0],i[i.length-1].range[1]]),et=this.performAction.apply(K,[s,lt,Q,H.yy,w[1],m,i].concat(Ct)),typeof et<"u")return et;Y&&(c=c.slice(0,-1*Y*2),m=m.slice(0,-1*Y),i=i.slice(0,-1*Y)),c.push(this.productions_[w[1]][0]),m.push(K.$),i.push(K._$),ht=G[c[c.length-2]][c[c.length-1]],c.push(ht);break;case 3:return!0}}return!0}},O=function(){var v={EOF:1,parseError:function(n,c){if(this.yy.parser)this.yy.parser.parseError(n,c);else throw new Error(n)},setInput:function(a,n){return this.yy=n||this.yy||{},this._input=a,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var n=a.match(/(?:\r\n?|\n).*/g);return n?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},unput:function(a){var n=a.length,c=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-n),this.offset-=n;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===d.length?this.yylloc.first_column:0)+d[d.length-c.length].length-c[0].length:this.yylloc.first_column-n},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-n]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),n=new Array(a.length+1).join("-");return a+this.upcomingInput()+`
`+n+"^"},test_match:function(a,n){var c,d,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),d=a[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+a[0].length},this.yytext+=a[0],this.match+=a[0],this.matches=a,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(a[0].length),this.matched+=a[0],c=this.performAction.call(this,this.yy,this,n,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),c)return c;if(this._backtrack){for(var i in m)this[i]=m[i];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,n,c,d;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),i=0;i<m.length;i++)if(c=this._input.match(this.rules[m[i]]),c&&(!n||c[0].length>n[0].length)){if(n=c,d=i,this.options.backtrack_lexer){if(a=this.test_match(c,m[i]),a!==!1)return a;if(this._backtrack){n=!1;continue}else return!1}else if(!this.options.flex)break}return n?(a=this.test_match(n,m[d]),a!==!1?a:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var n=this.next();return n||this.lex()},begin:function(n){this.conditionStack.push(n)},popState:function(){var n=this.conditionStack.length-1;return n>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(n){return n=this.conditionStack.length-1-Math.abs(n||0),n>=0?this.conditionStack[n]:"INITIAL"},pushState:function(n){this.begin(n)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(n,c,d,m){switch(d){case 0:return this.begin("acc_title"),22;case 1:return this.popState(),"acc_title_value";case 2:return this.begin("acc_descr"),24;case 3:return this.popState(),"acc_descr_value";case 4:this.begin("acc_descr_multiline");break;case 5:this.popState();break;case 6:return"acc_descr_multiline_value";case 7:return 10;case 8:break;case 9:return 8;case 10:return 28;case 11:return 48;case 12:return 4;case 13:return this.begin("block"),15;case 14:return 36;case 15:break;case 16:return 37;case 17:return 34;case 18:return 34;case 19:return 38;case 20:break;case 21:return this.popState(),17;case 22:return c.yytext[0];case 23:return 18;case 24:return 19;case 25:return 41;case 26:return 43;case 27:return 43;case 28:return 43;case 29:return 41;case 30:return 41;case 31:return 42;case 32:return 42;case 33:return 42;case 34:return 42;case 35:return 42;case 36:return 43;case 37:return 42;case 38:return 43;case 39:return 44;case 40:return 44;case 41:return 44;case 42:return 44;case 43:return 41;case 44:return 42;case 45:return 43;case 46:return 45;case 47:return 46;case 48:return 47;case 49:return 47;case 50:return 46;case 51:return 46;case 52:return 46;case 53:return 27;case 54:return c.yytext[0];case 55:return 6}},rules:[/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:[\s]+)/i,/^(?:"[^"%\r\n\v\b\\]+")/i,/^(?:"[^"]*")/i,/^(?:erDiagram\b)/i,/^(?:\{)/i,/^(?:,)/i,/^(?:\s+)/i,/^(?:\b((?:PK)|(?:FK)|(?:UK))\b)/i,/^(?:(.*?)[~](.*?)*[~])/i,/^(?:[\*A-Za-z_][A-Za-z0-9\-_\[\]\(\)]*)/i,/^(?:"[^"]*")/i,/^(?:[\n]+)/i,/^(?:\})/i,/^(?:.)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:one or zero\b)/i,/^(?:one or more\b)/i,/^(?:one or many\b)/i,/^(?:1\+)/i,/^(?:\|o\b)/i,/^(?:zero or one\b)/i,/^(?:zero or more\b)/i,/^(?:zero or many\b)/i,/^(?:0\+)/i,/^(?:\}o\b)/i,/^(?:many\(0\))/i,/^(?:many\(1\))/i,/^(?:many\b)/i,/^(?:\}\|)/i,/^(?:one\b)/i,/^(?:only one\b)/i,/^(?:1\b)/i,/^(?:\|\|)/i,/^(?:o\|)/i,/^(?:o\{)/i,/^(?:\|\{)/i,/^(?:\s*u\b)/i,/^(?:\.\.)/i,/^(?:--)/i,/^(?:to\b)/i,/^(?:optionally to\b)/i,/^(?:\.-)/i,/^(?:-\.)/i,/^(?:[A-Za-z_][A-Za-z0-9\-_]*)/i,/^(?:.)/i,/^(?:$)/i],conditions:{acc_descr_multiline:{rules:[5,6],inclusive:!1},acc_descr:{rules:[3],inclusive:!1},acc_title:{rules:[1],inclusive:!1},block:{rules:[14,15,16,17,18,19,20,21,22],inclusive:!1},INITIAL:{rules:[0,2,4,7,8,9,10,11,12,13,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55],inclusive:!0}}};return v}();R.lexer=O;function D(){this.yy={}}return D.prototype=R,R.Parser=D,new D}();st.parser=st;var Qt=st,U={},ot=[],qt={ZERO_OR_ONE:"ZERO_OR_ONE",ZERO_OR_MORE:"ZERO_OR_MORE",ONE_OR_MORE:"ONE_OR_MORE",ONLY_ONE:"ONLY_ONE",MD_PARENT:"MD_PARENT"},jt={NON_IDENTIFYING:"NON_IDENTIFYING",IDENTIFYING:"IDENTIFYING"},Dt=function(t,e=void 0){return U[t]===void 0?(U[t]={attributes:[],alias:e},V.info("Added new entity :",t)):U[t]&&!U[t].alias&&e&&(U[t].alias=e,V.info(`Add alias '${e}' to entity '${t}'`)),U[t]},Jt=()=>U,$t=function(t,e){let r=Dt(t),f;for(f=e.length-1;f>=0;f--)r.attributes.push(e[f]),V.debug("Added attribute ",e[f].attributeName)},te=function(t,e,r,f){let l={entityA:t,roleA:e,entityB:r,relSpec:f};ot.push(l),V.debug("Added new relationship :",l)},ee=()=>ot,re=function(){U={},ot=[],gt()},ie={Cardinality:qt,Identification:jt,getConfig:()=>C().er,addEntity:Dt,addAttributes:$t,getEntities:Jt,addRelationship:te,getRelationships:ee,clear:re,setAccTitle:xt,getAccTitle:kt,setAccDescription:Rt,getAccDescription:Ot,setDiagramTitle:bt,getDiagramTitle:Nt},L={ONLY_ONE_START:"ONLY_ONE_START",ONLY_ONE_END:"ONLY_ONE_END",ZERO_OR_ONE_START:"ZERO_OR_ONE_START",ZERO_OR_ONE_END:"ZERO_OR_ONE_END",ONE_OR_MORE_START:"ONE_OR_MORE_START",ONE_OR_MORE_END:"ONE_OR_MORE_END",ZERO_OR_MORE_START:"ZERO_OR_MORE_START",ZERO_OR_MORE_END:"ZERO_OR_MORE_END",MD_PARENT_END:"MD_PARENT_END",MD_PARENT_START:"MD_PARENT_START"},ae=function(t,e){let r;t.append("defs").append("marker").attr("id",L.MD_PARENT_START).attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),t.append("defs").append("marker").attr("id",L.MD_PARENT_END).attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),t.append("defs").append("marker").attr("id",L.ONLY_ONE_START).attr("refX",0).attr("refY",9).attr("markerWidth",18).attr("markerHeight",18).attr("orient","auto").append("path").attr("stroke",e.stroke).attr("fill","none").attr("d","M9,0 L9,18 M15,0 L15,18"),t.append("defs").append("marker").attr("id",L.ONLY_ONE_END).attr("refX",18).attr("refY",9).attr("markerWidth",18).attr("markerHeight",18).attr("orient","auto").append("path").attr("stroke",e.stroke).attr("fill","none").attr("d","M3,0 L3,18 M9,0 L9,18"),r=t.append("defs").append("marker").attr("id",L.ZERO_OR_ONE_START).attr("refX",0).attr("refY",9).attr("markerWidth",30).attr("markerHeight",18).attr("orient","auto"),r.append("circle").attr("stroke",e.stroke).attr("fill","white").attr("cx",21).attr("cy",9).attr("r",6),r.append("path").attr("stroke",e.stroke).attr("fill","none").attr("d","M9,0 L9,18"),r=t.append("defs").append("marker").attr("id",L.ZERO_OR_ONE_END).attr("refX",30).attr("refY",9).attr("markerWidth",30).attr("markerHeight",18).attr("orient","auto"),r.append("circle").attr("stroke",e.stroke).attr("fill","white").attr("cx",9).attr("cy",9).attr("r",6),r.append("path").attr("stroke",e.stroke).attr("fill","none").attr("d","M21,0 L21,18"),t.append("defs").append("marker").attr("id",L.ONE_OR_MORE_START).attr("refX",18).attr("refY",18).attr("markerWidth",45).attr("markerHeight",36).attr("orient","auto").append("path").attr("stroke",e.stroke).attr("fill","none").attr("d","M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27"),t.append("defs").append("marker").attr("id",L.ONE_OR_MORE_END).attr("refX",27).attr("refY",18).attr("markerWidth",45).attr("markerHeight",36).attr("orient","auto").append("path").attr("stroke",e.stroke).attr("fill","none").attr("d","M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18"),r=t.append("defs").append("marker").attr("id",L.ZERO_OR_MORE_START).attr("refX",18).attr("refY",18).attr("markerWidth",57).attr("markerHeight",36).attr("orient","auto"),r.append("circle").attr("stroke",e.stroke).attr("fill","white").attr("cx",48).attr("cy",18).attr("r",6),r.append("path").attr("stroke",e.stroke).attr("fill","none").attr("d","M0,18 Q18,0 36,18 Q18,36 0,18"),r=t.append("defs").append("marker").attr("id",L.ZERO_OR_MORE_END).attr("refX",39).attr("refY",18).attr("markerWidth",57).attr("markerHeight",36).attr("orient","auto"),r.append("circle").attr("stroke",e.stroke).attr("fill","white").attr("cx",9).attr("cy",18).attr("r",6),r.append("path").attr("stroke",e.stroke).attr("fill","none").attr("d","M21,18 Q39,0 57,18 Q39,36 21,18")},B={ERMarkers:L,insertMarkers:ae},ne=/[^\dA-Za-z](\W)*/g,x={},X=new Map,se=function(t){let e=Object.keys(t);for(let r of e)x[r]=t[r]},oe=(t,e,r)=>{let f=x.entityPadding/3,l=x.entityPadding/3,y=x.fontSize*.85,u=e.node().getBBox(),o=[],h=!1,_=!1,E=0,g=0,k=0,p=0,N=u.height+f*2,I=1;r.forEach(T=>{T.attributeKeyTypeList!==void 0&&T.attributeKeyTypeList.length>0&&(h=!0),T.attributeComment!==void 0&&(_=!0)}),r.forEach(T=>{let M=`${e.node().id}-attr-${I}`,R=0,O=_t(T.attributeType),D=t.append("text").classed("er entityLabel",!0).attr("id",`${M}-type`).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","left").style("font-family",C().fontFamily).style("font-size",y+"px").text(O),v=t.append("text").classed("er entityLabel",!0).attr("id",`${M}-name`).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","left").style("font-family",C().fontFamily).style("font-size",y+"px").text(T.attributeName),a={};a.tn=D,a.nn=v;let n=D.node().getBBox(),c=v.node().getBBox();if(E=Math.max(E,n.width),g=Math.max(g,c.width),R=Math.max(n.height,c.height),h){let d=T.attributeKeyTypeList!==void 0?T.attributeKeyTypeList.join(","):"",m=t.append("text").classed("er entityLabel",!0).attr("id",`${M}-key`).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","left").style("font-family",C().fontFamily).style("font-size",y+"px").text(d);a.kn=m;let i=m.node().getBBox();k=Math.max(k,i.width),R=Math.max(R,i.height)}if(_){let d=t.append("text").classed("er entityLabel",!0).attr("id",`${M}-comment`).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","left").style("font-family",C().fontFamily).style("font-size",y+"px").text(T.attributeComment||"");a.cn=d;let m=d.node().getBBox();p=Math.max(p,m.width),R=Math.max(R,m.height)}a.height=R,o.push(a),N+=R+f*2,I+=1});let F=4;h&&(F+=2),_&&(F+=2);let W=E+g+k+p,P={width:Math.max(x.minEntityWidth,Math.max(u.width+x.entityPadding*2,W+l*F)),height:r.length>0?N:Math.max(x.minEntityHeight,u.height+x.entityPadding*2)};if(r.length>0){let T=Math.max(0,(P.width-W-l*F)/(F/2));e.attr("transform","translate("+P.width/2+","+(f+u.height/2)+")");let M=u.height+f*2,R="attributeBoxOdd";o.forEach(O=>{let D=M+f+O.height/2;O.tn.attr("transform","translate("+l+","+D+")");let v=t.insert("rect","#"+O.tn.node().id).classed(`er ${R}`,!0).attr("x",0).attr("y",M).attr("width",E+l*2+T).attr("height",O.height+f*2),a=parseFloat(v.attr("x"))+parseFloat(v.attr("width"));O.nn.attr("transform","translate("+(a+l)+","+D+")");let n=t.insert("rect","#"+O.nn.node().id).classed(`er ${R}`,!0).attr("x",a).attr("y",M).attr("width",g+l*2+T).attr("height",O.height+f*2),c=parseFloat(n.attr("x"))+parseFloat(n.attr("width"));if(h){O.kn.attr("transform","translate("+(c+l)+","+D+")");let d=t.insert("rect","#"+O.kn.node().id).classed(`er ${R}`,!0).attr("x",c).attr("y",M).attr("width",k+l*2+T).attr("height",O.height+f*2);c=parseFloat(d.attr("x"))+parseFloat(d.attr("width"))}_&&(O.cn.attr("transform","translate("+(c+l)+","+D+")"),t.insert("rect","#"+O.cn.node().id).classed(`er ${R}`,"true").attr("x",c).attr("y",M).attr("width",p+l*2+T).attr("height",O.height+f*2)),M+=O.height+f*2,R=R==="attributeBoxOdd"?"attributeBoxEven":"attributeBoxOdd"})}else P.height=Math.max(x.minEntityHeight,N),e.attr("transform","translate("+P.width/2+","+P.height/2+")");return P},le=function(t,e,r){let f=Object.keys(e),l;return f.forEach(function(y){let u=pe(y,"entity");X.set(y,u);let o=t.append("g").attr("id",u);l=l===void 0?u:l;let h="text-"+u,_=o.append("text").classed("er entityLabel",!0).attr("id",h).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","middle").style("font-family",C().fontFamily).style("font-size",x.fontSize+"px").text(e[y].alias??y),{width:E,height:g}=oe(o,_,e[y].attributes),p=o.insert("rect","#"+h).classed("er entityBox",!0).attr("x",0).attr("y",0).attr("width",E).attr("height",g).node().getBBox();r.setNode(u,{width:p.width,height:p.height,shape:"rect",id:u})}),l},ce=function(t,e){e.nodes().forEach(function(r){r!==void 0&&e.node(r)!==void 0&&t.select("#"+r).attr("transform","translate("+(e.node(r).x-e.node(r).width/2)+","+(e.node(r).y-e.node(r).height/2)+" )")})},Lt=function(t){return(t.entityA+t.roleA+t.entityB).replace(/\s/g,"")},he=function(t,e){return t.forEach(function(r){e.setEdge(X.get(r.entityA),X.get(r.entityB),{relationship:r},Lt(r))}),t},It=0,de=function(t,e,r,f,l){It++;let y=r.edge(X.get(e.entityA),X.get(e.entityB),Lt(e)),u=ft().x(function(N){return N.x}).y(function(N){return N.y}).curve(ut),o=t.insert("path","#"+f).classed("er relationshipLine",!0).attr("d",u(y.points)).style("stroke",x.stroke).style("fill","none");e.relSpec.relType===l.db.Identification.NON_IDENTIFYING&&o.attr("stroke-dasharray","8,8");let h="";switch(x.arrowMarkerAbsolute&&(h=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,h=h.replace(/\(/g,"\\("),h=h.replace(/\)/g,"\\)")),e.relSpec.cardA){case l.db.Cardinality.ZERO_OR_ONE:o.attr("marker-end","url("+h+"#"+B.ERMarkers.ZERO_OR_ONE_END+")");break;case l.db.Cardinality.ZERO_OR_MORE:o.attr("marker-end","url("+h+"#"+B.ERMarkers.ZERO_OR_MORE_END+")");break;case l.db.Cardinality.ONE_OR_MORE:o.attr("marker-end","url("+h+"#"+B.ERMarkers.ONE_OR_MORE_END+")");break;case l.db.Cardinality.ONLY_ONE:o.attr("marker-end","url("+h+"#"+B.ERMarkers.ONLY_ONE_END+")");break;case l.db.Cardinality.MD_PARENT:o.attr("marker-end","url("+h+"#"+B.ERMarkers.MD_PARENT_END+")");break}switch(e.relSpec.cardB){case l.db.Cardinality.ZERO_OR_ONE:o.attr("marker-start","url("+h+"#"+B.ERMarkers.ZERO_OR_ONE_START+")");break;case l.db.Cardinality.ZERO_OR_MORE:o.attr("marker-start","url("+h+"#"+B.ERMarkers.ZERO_OR_MORE_START+")");break;case l.db.Cardinality.ONE_OR_MORE:o.attr("marker-start","url("+h+"#"+B.ERMarkers.ONE_OR_MORE_START+")");break;case l.db.Cardinality.ONLY_ONE:o.attr("marker-start","url("+h+"#"+B.ERMarkers.ONLY_ONE_START+")");break;case l.db.Cardinality.MD_PARENT:o.attr("marker-start","url("+h+"#"+B.ERMarkers.MD_PARENT_START+")");break}let _=o.node().getTotalLength(),E=o.node().getPointAtLength(_*.5),g="rel"+It,p=t.append("text").classed("er relationshipLabel",!0).attr("id",g).attr("x",E.x).attr("y",E.y).style("text-anchor","middle").style("dominant-baseline","middle").style("font-family",C().fontFamily).style("font-size",x.fontSize+"px").text(e.roleA).node().getBBox();t.insert("rect","#"+g).classed("er relationshipLabelBox",!0).attr("x",E.x-p.width/2).attr("y",E.y-p.height/2).attr("width",p.width).attr("height",p.height)},fe=function(t,e,r,f){x=C().er,V.info("Drawing ER diagram");let l=C().securityLevel,y;l==="sandbox"&&(y=J("#i"+e));let o=(l==="sandbox"?J(y.nodes()[0].contentDocument.body):J("body")).select(`[id='${e}']`);B.insertMarkers(o,x);let h;h=new pt({multigraph:!0,directed:!0,compound:!1}).setGraph({rankdir:x.layoutDirection,marginx:20,marginy:20,nodesep:100,edgesep:100,ranksep:100}).setDefaultEdgeLabel(function(){return{}});let _=le(o,f.db.getEntities(),h),E=he(f.db.getRelationships(),h);yt(h),ce(o,h),E.forEach(function(I){de(o,I,h,_,f)});let g=x.diagramPadding;mt.insertTitle(o,"entityTitleText",x.titleTopMargin,f.db.getDiagramTitle());let k=o.node().getBBox(),p=k.width+g*2,N=k.height+g*2;Et(o,N,p,x.useMaxWidth),o.attr("viewBox",`${k.x-g} ${k.y-g} ${p} ${N}`)},ue="28e9f9db-3c8d-5aa5-9faf-44286ae5937c";function pe(t="",e=""){let r=t.replace(ne,"");return`${wt(e)}${wt(r)}${nt(t,ue)}`}function wt(t=""){return t.length>0?`${t}-`:""}var ye={setConf:se,draw:fe},_e=t=>`
  .entityBox {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
  }

  .attributeBoxOdd {
    fill: ${t.attributeBackgroundColorOdd};
    stroke: ${t.nodeBorder};
  }

  .attributeBoxEven {
    fill:  ${t.attributeBackgroundColorEven};
    stroke: ${t.nodeBorder};
  }

  .relationshipLabelBox {
    fill: ${t.tertiaryColor};
    opacity: 0.7;
    background-color: ${t.tertiaryColor};
      rect {
        opacity: 0.5;
      }
  }

    .relationshipLine {
      stroke: ${t.lineColor};
    }

  .entityTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }    
  #MD_PARENT_START {
    fill: #f5f5f5 !important;
    stroke: ${t.lineColor} !important;
    stroke-width: 1;
  }
  #MD_PARENT_END {
    fill: #f5f5f5 !important;
    stroke: ${t.lineColor} !important;
    stroke-width: 1;
  }
  
`,me=_e,Ue={parser:Qt,db:ie,renderer:ye,styles:me};export{Ue as diagram};
