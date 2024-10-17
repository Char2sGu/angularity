import{a as k}from"./chunk-46TJBTHP.js";import{a as p}from"./chunk-IK7FDAWK.js";import"./chunk-73E4PGK3.js";import"./chunk-BEEPLMHP.js";import{a as n}from"./chunk-OIQWCD35.js";import{X as C}from"./chunk-NGRQBGZ3.js";import"./chunk-TKY5DHZR.js";import{Ba as c,Ra as r,U as o,nb as t,ob as d}from"./chunk-2P42YJQL.js";import{a as l,b as i,h as B}from"./chunk-TWZW5B45.js";var y=B(C());var D={category:k,title:"Type Container",mdFile:"./index.md"},a=D;var g=[];var f={},h=f;var b=`<p class="ngde">Type Containers are widely used in Angularity for advanced type gymnastics.</p><p class="ngde">A Type Container is an empty object but carries specific TypeScript type information, enabling infinite possibilities of advanced type inferences and manipulations.</p><p class="ngde">The <code class="ngde ng-doc-code-with-link"><a href="api/variables/core/$type" class="ng-doc-code-anchor ngde">$type</a></code> function produces a type container:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-ts"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">const</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> $payload</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> =</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> <a href="api/variables/core/$type" class="ng-doc-code-anchor ngde">$type</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;{ </span><span style="color:#E36209;--shiki-dark:#BFBDB6" class="ngde">id</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> }>()</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">// The type of \`$payload\` is \`<a href="api/type-aliases/core/TypeContainer" class="ng-doc-code-anchor ngde">TypeContainer</a>&#x3C;{ id: string }>\`.</span></span></code></pre><ng-doc-blockquote class="ngde"><p class="ngde">Conventionally, type container variables are prefixed with a <code class="ngde">$</code> symbol.</p></ng-doc-blockquote><p class="ngde">To extract the type information from a type container, use the <code class="ngde ng-doc-code-with-link"><a href="api/type-aliases/core/ContainedTypeOf" class="ng-doc-code-anchor ngde">ContainedTypeOf</a></code> type:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-ts"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">const</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> $payload</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> =</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> <a href="api/variables/core/$type" class="ng-doc-code-anchor ngde">$type</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;{ </span><span style="color:#E36209;--shiki-dark:#BFBDB6" class="ngde">id</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> }>()</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">type</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> Payload</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> =</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> <a href="api/type-aliases/core/ContainedTypeOf" class="ng-doc-code-anchor ngde">ContainedTypeOf</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">typeof</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> $payload></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">// \`Payload\` is \`{ id: string }\`.</span></span></code></pre><p class="ngde">A typical use case of type containers is to infer generics from a mix of tangible values and type containers:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-ts"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">declare</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> function</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> createActionFactory</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">N</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> extends</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> P</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> extends</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> object</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">>(</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  name</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> N</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  $payload</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> <a href="api/type-aliases/core/TypeContainer" class="ng-doc-code-anchor ngde">TypeContainer</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">P</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> ActionFactory</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">N</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> P</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-ts"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">createActionFactory</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">'FetchBook'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> <a href="api/variables/core/$type" class="ng-doc-code-anchor ngde">$type</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;{ </span><span style="color:#E36209;--shiki-dark:#BFBDB6" class="ngde">id</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> }>())</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">// generic N is inferred as "FetchBook"</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">// generic P is inferred as { id: string }</span></span></code></pre><p class="ngde">In comparison, without type containers, it is not possible to leverage the power of TypeScript generic inference, so all the generics have to be manually supplied:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-ts"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">declare</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> function</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> createActionFactory</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">N</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> extends</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> P</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> extends</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> object</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">>(</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  name</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> ActionFactory</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">N</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> P</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-ts"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">createActionFactory</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">'FetchBook'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> { </span><span style="color:#E36209;--shiki-dark:#BFBDB6" class="ngde">id</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> }>(</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">'FetchBook'</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><p class="ngde">Note that the string literal <code class="ngde">'FetchBook'</code> is repeated twice because of the lack of generic inference. When the generics are complicated, it could be impossible to manually supply all the generic, and that's when Type Containers come handy.</p>`,u=(()=>{class s extends n{constructor(){super(),this.pageType="guide",this.pageContent=b,this.page=a,this.demoAssets=h}static{this.\u0275fac=function(e){return new(e||s)}}static{this.\u0275cmp=o({type:s,selectors:[["ng-doc-page-rmloqfw6"]],standalone:!0,features:[t([{provide:n,useExisting:s},g,a.providers??[]]),c,d],decls:1,vars:0,template:function(e,E){e&1&&r(0,"ng-doc-page")},dependencies:[p],encapsulation:2,changeDetection:0})}}return s})(),A=[i(l({},(0,y.isRoute)(a.route)?a.route:{}),{path:"",component:u,title:"Type Container"})],S=A;export{u as PageComponent,S as default};
