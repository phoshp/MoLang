var MoLang=function(e){"use strict";class t{}class s extends t{constructor(e){super(),this.value=e,this.type="NumberExpression"}isStatic(){return!0}eval(){return this.value}}class r extends t{constructor(e,t,s){super(),this.left=e,this.right=t,this.evalHelper=s,this.type="GenericOperatorExpression"}isStatic(){return this.left.isStatic()&&this.right.isStatic()}eval(){return this.evalHelper()}}class n{constructor(e=0){this.precedence=e}parse(e,t,s){const n=e.parseExpression(this.precedence);switch(s[1]){case"+":return new r(t,n,()=>{const e=t.eval(),r=n.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof r&&"boolean"!=typeof r)throw new Error(`Cannot use numeric operators for expression "${e} ${s[1]} ${r}"`);return e+r});case"-":return new r(t,n,()=>{const e=t.eval(),r=n.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof r&&"boolean"!=typeof r)throw new Error(`Cannot use numeric operators for expression "${e} ${s[1]} ${r}"`);return e-r});case"*":return new r(t,n,()=>{const e=t.eval(),r=n.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof r&&"boolean"!=typeof r)throw new Error(`Cannot use numeric operators for expression "${e} ${s[1]} ${r}"`);return e*r});case"/":return new r(t,n,()=>{const e=t.eval(),r=n.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof r&&"boolean"!=typeof r)throw new Error(`Cannot use numeric operators for expression "${e} ${s[1]} ${r}"`);return e/r});case"&&":return new r(t,n,()=>t.eval()&&n.eval());case"||":return new r(t,n,()=>t.eval()||n.eval());case"<":return new r(t,n,()=>t.eval()<n.eval());case"<=":return new r(t,n,()=>t.eval()<=n.eval());case">":return new r(t,n,()=>t.eval()>n.eval());case">=":return new r(t,n,()=>t.eval()>=n.eval());case"==":return new r(t,n,()=>t.eval()===n.eval());case"!=":return new r(t,n,()=>t.eval()!==n.eval());case"??":return new r(t,n,()=>t.eval()??n.eval());case"=":return new r(t,n,()=>{if(t.setPointer)return t.setPointer(n.eval()),0;throw Error(`Cannot assign to "${t.eval()}"`)});default:throw new Error("Operator not implemented")}}}var i;!function(e){e[e.SCOPE=1]="SCOPE",e[e.STATEMENT=2]="STATEMENT",e[e.PROPERTY_ACCESS=3]="PROPERTY_ACCESS",e[e.ARRAY_ACCESS=4]="ARRAY_ACCESS",e[e.ASSIGNMENT=5]="ASSIGNMENT",e[e.CONDITIONAL=6]="CONDITIONAL",e[e.NULLISH_COALESCING=7]="NULLISH_COALESCING",e[e.AND=8]="AND",e[e.OR=9]="OR",e[e.COMPARE=10]="COMPARE",e[e.SUM=11]="SUM",e[e.PRODUCT=12]="PRODUCT",e[e.EXPONENT=13]="EXPONENT",e[e.PREFIX=14]="PREFIX",e[e.POSTFIX=15]="POSTFIX",e[e.FUNCTION=16]="FUNCTION"}(i||(i={}));class o extends t{constructor(e,t){super(),this.tokenType=e,this.expression=t,this.type="PrefixExpression"}isStatic(){return this.expression.isStatic()}eval(){const e=this.expression.eval();switch(this.tokenType){case"MINUS":if("number"!=typeof e)throw new Error(`Cannot use "-" operator in front of ${typeof e}: "-${e}"`);return-e;case"BANG":if("string"==typeof e)throw new Error(`Cannot use "!" operator in front of string: "!${e}"`);return!e}}}class a{constructor(e=0){this.precedence=e}parse(e,t){return new o(t[0],e.parseExpression(this.precedence))}}class h{constructor(e=0){this.precedence=e}parse(e,t){return new s(Number(t[1]))}}const c=(e,t)=>e+Math.random()*(t-e),u=(e,t)=>Math.round(e+Math.random()*(t-e)),p={"math.abs":Math.abs,"math.acos":Math.acos,"math.asin":Math.asin,"math.atan":Math.atan,"math.atan2":Math.atan2,"math.ceil":Math.ceil,"math.clamp":(e,t,s)=>"number"!=typeof e||Number.isNaN(e)?t:e>s?s:e<t?t:e,"math.cos":Math.cos,"math.die_roll":(e,t,s)=>{let r=0;for(;0<e;)r+=c(t,s);return r},"math.die_roll_integer":(e,t,s)=>{let r=0;for(;0<e;)r+=u(t,s);return r},"math.exp":Math.exp,"math.floor":Math.floor,"math.hermite_blend":e=>3*e^2-2*e^3,"math.lerp":(e,t,s)=>(s<0?s=0:s>1&&(s=1),e+(t-e)*s),"math.lerp_rotate":(e,t,s)=>{const r=e=>((e+180)%360+180)%360;if((e=r(e))>(t=r(t))){let s=e;e=t,t=s}return t-e>180?r(t+s*(360-(t-e))):e+s*(t-e)},"math.ln":Math.log,"math.max":Math.max,"math.min":Math.min,"math.mod":(e,t)=>e%t,"math.pi":Math.PI,"math.pow":Math.pow,"math.random":c,"math.random_integer":u,"math.round":Math.round,"math.sin":Math.sin,"math.sqrt":Math.sqrt,"math.trunc":Math.trunc};let l={};function f(e,t="",s={}){for(let r in e)"object"!=typeof e[r]||Array.isArray(e[r])?s[`${t}${r}`]=e[r]:f(e[r],`${t}${r}.`,s);return s}function E(e){l={...p,...f(e)}}class x extends t{constructor(e,t=!1){super(),this.name=e,this.isFunctionCall=t,this.type="NameExpression"}isStatic(){return!1}setPointer(e){!function(e,t){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);break;case"t":e="temp"+e.substring(1,e.length);break;case"v":e="variable"+e.substring(1,e.length);break;case"c":e="context"+e.substring(1,e.length);break;case"f":e="function"+e.substring(1,e.length)}l[e]=t}(this.name,e)}setFunctionCall(e=!0){this.isFunctionCall=e}eval(){const e=function(e){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);break;case"t":e="temp"+e.substring(1,e.length);break;case"v":e="variable"+e.substring(1,e.length);break;case"c":e="context"+e.substring(1,e.length);break;case"f":e="function"+e.substring(1,e.length)}return l[e]}(this.name);return this.isFunctionCall||"function"!=typeof e?e:e()}}class w{constructor(e=0){this.precedence=e}parse(e,t){return new x(t[1])}}class m{constructor(e=0){this.precedence=e}parse(e,t){const s=e.parseExpression(this.precedence);return e.consume("RIGHT_PARENT"),s}}class R extends t{constructor(e,t,s){super(),this.leftExpression=e,this.thenExpression=t,this.elseExpression=s,this.type="TernaryExpression"}get isReturn(){return this.leftResult?this.thenExpression.isReturn:this.elseExpression.isReturn}get isContinue(){return this.leftResult?this.thenExpression.isContinue:this.elseExpression.isContinue}get isBreak(){return this.leftResult?this.thenExpression.isBreak:this.elseExpression.isBreak}isStatic(){return this.leftExpression.isStatic()&&this.thenExpression.isStatic()&&this.elseExpression.isStatic()}eval(){return this.leftResult=this.leftExpression.eval(),this.leftResult?this.thenExpression.eval():this.elseExpression.eval()}}class g{constructor(e=0){this.precedence=e,this.exprName="Ternary"}parse(e,t,r){let n,i=e.parseExpression(this.precedence-1);if(e.match("COLON"))n=e.parseExpression(this.precedence-1);else{if(!e.match("SEMICOLON",!1))throw new Error("Binary conditional operator without ending semicolon.");n=new s(0)}return new R(t,i,n)}}class S extends t{constructor(e){super(),this.expression=e,this.type="ReturnExpression",this.isReturn=!0}isStatic(){return!1}eval(){return this.expression.eval()}}class d{constructor(e=0){this.precedence=e}parse(e,t){const r=e.parseExpression(i.STATEMENT);return new S(e.match("SEMICOLON")?r:new s(0))}}class A extends t{constructor(e){super(),this.expressions=e,this.type="StatementExpression",this.didReturn=!1,this.wasLoopBroken=!1,this.wasLoopContinued=!1}get isReturn(){return this.didReturn}get isBreak(){return!!this.wasLoopBroken&&(this.wasLoopBroken=!1,!0)}get isContinue(){return!!this.wasLoopContinued&&(this.wasLoopContinued=!1,!0)}isStatic(){let e=0;for(;e<this.expressions.length;){if(!this.expressions[e].isStatic())return!1;e++}return!0}eval(){this.didReturn=!1,this.wasLoopBroken=!1,this.wasLoopContinued=!1;let e=0;for(;e<this.expressions.length;){let t=this.expressions[e].eval();if(this.expressions[e].isReturn)return this.didReturn=!0,t;if(this.expressions[e].isContinue)return void(this.wasLoopContinued=!0);if(this.expressions[e].isBreak)return void(this.wasLoopBroken=!0);e++}return 0}getExpression(){return this.expressions[0]}}class v extends t{constructor(e,t=!1){super(),this.value=e,this.isReturn=t,this.type="StaticExpression"}isStatic(){return!0}eval(){return this.value}}class C{constructor(e=0){this.precedence=e}parse(e,t,s){if(e.useOptimizer&&(t.isStatic()&&(t=new v(t.eval(),t.isReturn)),t.isReturn))return t;let r,n=[t];do{if(r=e.parseExpression(this.precedence),e.useOptimizer){if(r.isStatic()){if(!r.isReturn&&e.agressiveStaticOptimizer)continue;r=new v(r.eval(),r.isReturn)}if(r.isReturn){n.push(r);break}}n.push(r)}while(e.match("SEMICOLON")||r.isReturn);return new A(n)}}class N extends t{constructor(e){super(),this.name=e,this.type="StringExpression"}isStatic(){return!0}eval(){return this.name.substring(1,this.name.length-1)}}class T{constructor(e=0){this.precedence=e}parse(e,t){return new N(t[1])}}class I extends t{constructor(e,t){super(),this.name=e,this.args=t,this.type="FunctionExpression"}isStatic(){return!1}eval(){const e=[];let t=0;for(;t<this.args.length;)e.push(this.args[t++].eval());return this.name.eval()(...e)}}class O{constructor(e=0){this.precedence=e}parse(e,t,s){const r=[];if(!t.setFunctionCall)throw new Error(`${t.type?t.type+" ":""}Expression ${t.type?"":`"${t.eval()}" `}is not callable!`);if(t.setFunctionCall(!0),!e.match("RIGHT_PARENT")){do{r.push(e.parseExpression())}while(e.match("COMMA"));e.consume("RIGHT_PARENT")}return new I(t,r)}}class P extends t{constructor(e,t){super(),this.name=e,this.lookup=t,this.type="ArrayAccessExpression"}isStatic(){return!1}setPointer(e){this.name.eval()[this.lookup.eval()]=e}eval(){return this.name.eval()[this.lookup.eval()]}}class L{constructor(e=0){this.precedence=e}parse(e,t,s){const r=e.parseExpression(this.precedence-1);if(!t.setPointer)throw new Error(`"${t.eval()}" is not an array`);if(!e.match("ARRAY_RIGHT"))throw new Error(`No closing bracket for opening bracket "[${r.eval()}"`);return new P(t,r)}}class b{constructor(e=0){this.precedence=e}parse(e,t){let s,r=!1,n=[];do{if(e.match("CURLY_RIGHT")){r=!0;break}if(s=e.parseExpression(i.STATEMENT),e.useOptimizer&&(s.isStatic()&&(s=new v(s.eval(),s.isReturn)),s.isReturn)){n.push(s);break}n.push(s)}while(e.match("SEMICOLON")||s.isReturn);if(!r&&!e.match("CURLY_RIGHT"))throw new Error("Missing closing curly bracket");return new A(n)}}class M extends t{constructor(e,t){super(),this.count=e,this.expression=t,this.type="LoopExpression"}get isReturn(){return this.expression.isReturn}isStatic(){return this.count.isStatic()&&this.expression.isStatic()}eval(){const e=Number(this.count.eval());if(Number.isNaN(e))throw new Error(`First loop() argument must be of type number, received "${typeof this.count.eval()}"`);if(e>1024)throw new Error(`Cannot loop more than 1024x times, received "${e}"`);let t=0;for(;t<e;){t++;const e=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return e}return 0}}class y{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const s=[];if(e.match("RIGHT_PARENT"))throw new Error("loop() called without arguments");do{s.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),2!==s.length)throw new Error("There must be exactly two loop() arguments; found "+s.length);return new M(s[0],s[1])}}class _ extends t{constructor(e,t,s){if(super(),this.variable=e,this.arrayExpression=t,this.expression=s,this.type="ForEachExpression",!this.variable.setPointer)throw new Error(`First for_each() argument must be a variable, received "${typeof this.variable.eval()}"`)}get isReturn(){return this.expression.isReturn}isStatic(){return this.variable.isStatic()&&this.arrayExpression.isStatic()&&this.expression.isStatic()}eval(){const e=this.arrayExpression.eval();if(!Array.isArray(e))throw new Error(`Second for_each() argument must be an array, received "${typeof e}"`);let t=0;for(;t<e.length;){this.variable.setPointer(e[t++]);const s=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return s}return 0}}class k{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const s=[];if(e.match("RIGHT_PARENT"))throw new Error("for_each() called without arguments");do{s.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),3!==s.length)throw new Error("There must be exactly three for_each() arguments; found "+s.length);return new _(s[0],s[1],s[2])}}class U extends t{constructor(){super(),this.type="ContinueExpression",this.isContinue=!0}isStatic(){return!1}eval(){return 0}}class F{constructor(e=0){this.precedence=e}parse(e,t){return new U}}class G extends t{constructor(){super(),this.type="BreakExpression",this.isBreak=!0}isStatic(){return!1}eval(){return 0}}class ${constructor(e=0){this.precedence=e}parse(e,t){return new G}}class H extends t{constructor(e){super(),this.value=e,this.type="BooleanExpression"}isStatic(){return!0}eval(){return this.value}}class B{constructor(e=0){this.precedence=e}parse(e,t){return new H("true"===t[1])}}class Y extends class{constructor(e,t=!1,s=!0,r=!1){this.tokenIterator=e,this.useOptimizer=t,this.agressiveStaticOptimizer=s,this.partialResolveOnParse=r,this.prefixParselets=new Map,this.infixParselets=new Map,this.readTokens=[],this.lastConsumed=["SOF",""]}parseExpression(e=0){let t=this.consume();if("EOF"===t[0])return new s(0);const r=this.prefixParselets.get(t[0]);if(!r)throw new Error(`Cannot parse ${t[0]} expression "${t[1]}"`);let n=r.parse(this,t);return n.isReturn?n:this.parseInfixExpression(n,e)}parseInfixExpression(e,t=0){let s;for(;t<this.getPrecedence();){s=this.consume();e=this.infixParselets.get(s[0]).parse(this,e,s)}return e}getPrecedence(){const e=this.infixParselets.get(this.lookAhead(0)?.[0]);return e?.precedence??0}getLastConsumed(){return this.lastConsumed}consume(e){this.tokenIterator.step();const t=this.lookAhead(0);if(e){if(t[0]!==e)throw new Error(`Expected token "${e}" and found "${t[0]}"`);this.consume()}return this.lastConsumed=this.readTokens.pop(),this.lastConsumed}match(e,t=!0){return this.lookAhead(0)[0]===e&&(t&&this.consume(),!0)}lookAhead(e){for(;e>=this.readTokens.length;)this.readTokens.push(this.tokenIterator.next());return this.readTokens[e]}registerInfix(e,t){this.infixParselets.set(e,t)}registerPrefix(e,t){this.prefixParselets.set(e,t)}getInfix(e){return this.infixParselets.get(e)}getPrefix(e){return this.prefixParselets.get(e)}getTokenizerPosition(){return this.tokenIterator.getPosition()}}{constructor(e,t=!0,s=!0){super(e,t,s),this.registerPrefix("NAME",new w),this.registerPrefix("STRING",new T),this.registerPrefix("NUMBER",new h),this.registerPrefix("TRUE",new B(i.PREFIX)),this.registerPrefix("FALSE",new B(i.PREFIX)),this.registerPrefix("RETURN",new d),this.registerPrefix("CONTINUE",new F),this.registerPrefix("BREAK",new $),this.registerPrefix("LOOP",new y),this.registerPrefix("FOR_EACH",new k),this.registerInfix("QUESTION",new g(i.CONDITIONAL)),this.registerPrefix("LEFT_PARENT",new m),this.registerInfix("LEFT_PARENT",new O(i.FUNCTION)),this.registerInfix("ARRAY_LEFT",new L(i.ARRAY_ACCESS)),this.registerPrefix("CURLY_LEFT",new b(i.SCOPE)),this.registerInfix("SEMICOLON",new C(i.STATEMENT)),this.registerPrefix("MINUS",new a(i.PREFIX)),this.registerPrefix("BANG",new a(i.PREFIX)),this.registerInfix("PLUS",new n(i.SUM)),this.registerInfix("MINUS",new n(i.SUM)),this.registerInfix("ASTERISK",new n(i.PRODUCT)),this.registerInfix("SLASH",new n(i.PRODUCT)),this.registerInfix("EQUALS",new n(i.COMPARE)),this.registerInfix("NOT_EQUALS",new n(i.COMPARE)),this.registerInfix("GREATER_OR_EQUALS",new n(i.COMPARE)),this.registerInfix("GREATER",new n(i.COMPARE)),this.registerInfix("SMALLER_OR_EQUALS",new n(i.COMPARE)),this.registerInfix("SMALLER",new n(i.COMPARE)),this.registerInfix("AND",new n(i.AND)),this.registerInfix("OR",new n(i.OR)),this.registerInfix("NULLISH_COALESCING",new n(i.NULLISH_COALESCING)),this.registerInfix("ASSIGN",new n(i.ASSIGNMENT))}}const z=new Map([["==","EQUALS"],["!=","NOT_EQUALS"],["??","NULLISH_COALESCING"],["&&","AND"],["||","OR"],[">=","GREATER_OR_EQUALS"],["<=","SMALLER_OR_EQUALS"],[">","GREATER"],["<","SMALLER"],["(","LEFT_PARENT"],[")","RIGHT_PARENT"],["[","ARRAY_LEFT"],["]","ARRAY_RIGHT"],["{","CURLY_LEFT"],["}","CURLY_RIGHT"],[",","COMMA"],["=","ASSIGN"],["+","PLUS"],["-","MINUS"],["*","ASTERISK"],["/","SLASH"],["?","QUESTION"],[":","COLON"],[";","SEMICOLON"],["!","BANG"]]),D=new Set(["return","continue","break","for_each","loop","false","true"]);function Q(e,t){let s,r=0,n=0,i=0,o=0;return s=t?new Set([...D,...t]):new Set([...D]),{getPosition:()=>({startLineNumber:o,endLineNumber:i,startColumn:n,endColumn:r}),step(){n=r,o=i},next(){for(;r<e.length;){let t=r+1<e.length?z.get(e[r]+e[r+1]):void 0;if(t)return r++,[t,e[r-1]+e[r++]];if(t=z.get(e[r]),t)return[t,e[r++]];if("'"===e[r]){let t=r+1;for(;t<e.length&&"'"!==e[t];)t++;t++;const s=["STRING",e.substring(r,t)];return r=t,s}if(X(e[r])){let t=r+1;for(;t<e.length&&(X(e[t])||q(e[t])||"_"===e[t]||"."===e[t]);)t++;const n=e.substring(r,t).toLowerCase(),i=[s.has(n)?n.toUpperCase():"NAME",n];return r=t,i}if(q(e[r])){let t=r+1,s=!1;for(;t<e.length&&(q(e[t])||"."===e[t]&&!s);)"."===e[t]&&(s=!0),t++;const n=["NUMBER",e.substring(r,t)];return r=t,n}"\n"!==e[r]&&"\r"!==e[r]||i++,r++}return["EOF",""]},hasNext:()=>r<e.length}}function X(e){return e>="a"&&e<="z"}function q(e){return e>="0"&&e<="9"}let K={},j=0;function J(){K={}}function V(e,{useCache:t=!0,useOptimizer:s=!0,useAgressiveStaticOptimizer:r=!0,maxCacheSize:n=256,tokenizer:i=Q(e)}={}){if(t){const t=K[e];if(t)return t}const o=new Y(i,s,r).parseExpression();return t&&(j>n&&J(),K[e]=s&&o.isStatic()?new v(o.eval()):o,j++),o}return e.clearCache=J,e.execute=function(e,t,s={}){t&&E(t);const r=V(e,s).eval();return void 0===r?0:"boolean"==typeof r?Number(r):r},e.parse=V,e.setEnv=E,e.tokenize=Q,e}({});
