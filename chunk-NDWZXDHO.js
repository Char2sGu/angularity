import{a as h}from"./chunk-46TJBTHP.js";import{a as g}from"./chunk-6ORSQ67G.js";import"./chunk-LAHBPHMM.js";import{a as t}from"./chunk-FHAHQJSK.js";import{L as i,Sa as d,Ta as r,Yb as C,ka as o,xa as p}from"./chunk-EZIACBBL.js";import{a as c,b as l,g as j}from"./chunk-P2VZOJAX.js";var m=j(C());var b={category:h,title:"Type Container",mdFile:"./index.md"},s=b;var y=[];var k={},f=k;var x=`<h1 id="type-container" class="ngde">Type Container<a title="Link to heading" class="ng-doc-header-link ngde" href="/core/type-container#type-container"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">Type Containers are widely used in Angularity for advanced type gymnastics.</p><p class="ngde">A Type Container is an empty object but carries specific TypeScript type information, enabling infinite possibilities of advanced type inferences and manipulations.</p><p class="ngde">The <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/references/core/variables/$type" class="ng-doc-code-anchor ngde" data-link-type="Variable" class="ngde">$type</a></code> function produces a type container:</p><pre class="ngde hljs"><code class="hljs language-ts code-lines ngde" lang="ts" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">const</span> $payload = <a href="/references/core/variables/$type" class="ng-doc-code-anchor ngde" data-link-type="Variable" class="ngde">$type</a>&#x3C;{ <span class="hljs-attr ngde">id</span>: <span class="hljs-built_in ngde">string</span> }>();
</span><span class="line ngde"><span class="hljs-comment ngde">// The type of \`$payload\` is \`<a href="/references/core/interfaces/TypeContainer" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">TypeContainer</a>&#x3C;{ id: string }>\`.</span>
</span></code></pre><ng-doc-blockquote class="ngde"><p class="ngde">Conventionally, type container variables are prefixed with a <code class="ngde">$</code> symbol.</p></ng-doc-blockquote><p class="ngde">To extract the type information from a type container, use the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/references/core/type-aliases/ContainedTypeOf" class="ng-doc-code-anchor ngde" data-link-type="TypeAlias" class="ngde">ContainedTypeOf</a></code> type:</p><pre class="ngde hljs"><code class="hljs language-ts code-lines ngde" lang="ts" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">const</span> $payload = <a href="/references/core/variables/$type" class="ng-doc-code-anchor ngde" data-link-type="Variable" class="ngde">$type</a>&#x3C;{ <span class="hljs-attr ngde">id</span>: <span class="hljs-built_in ngde">string</span> }>();
</span><span class="line ngde"><span class="hljs-keyword ngde">type</span> <span class="hljs-title class_ ngde">Payload</span> = <span class="hljs-title class_ ngde"><a href="/references/core/type-aliases/ContainedTypeOf" class="ng-doc-code-anchor ngde" data-link-type="TypeAlias" class="ngde">ContainedTypeOf</a></span>&#x3C;<span class="hljs-keyword ngde">typeof</span> $payload>;
</span><span class="line ngde"><span class="hljs-comment ngde">// \`Payload\` is \`{ id: string }\`.</span>
</span></code></pre><p class="ngde">A typical use case of type containers is to infer generics from a mix of tangible values and type containers:</p><pre class="ngde hljs"><code class="hljs language-ts code-lines ngde" lang="ts" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">declare</span> <span class="hljs-keyword ngde">function</span> createActionFactory&#x3C;N <span class="hljs-keyword ngde">extends</span> <span class="hljs-built_in ngde">string</span>, P <span class="hljs-keyword ngde">extends</span> <span class="hljs-built_in ngde">object</span>>(
</span><span class="line ngde">  <span class="hljs-attr ngde">name</span>: N,
</span><span class="line ngde">  <span class="hljs-attr ngde">$payload</span>: <span class="hljs-title class_ ngde"><a href="/references/core/interfaces/TypeContainer" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">TypeContainer</a></span>&#x3C;P>,
</span><span class="line ngde">): <span class="hljs-title class_ ngde">ActionFactory</span>&#x3C;N, P>;
</span></code></pre><pre class="ngde hljs"><code class="hljs language-ts code-lines ngde" lang="ts" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-title function_ ngde">createActionFactory</span>(<span class="hljs-string ngde">'FetchBook'</span>, <a href="/references/core/variables/$type" class="ng-doc-code-anchor ngde" data-link-type="Variable" class="ngde">$type</a>&#x3C;{ <span class="hljs-attr ngde">id</span>: <span class="hljs-built_in ngde">string</span> }>());
</span><span class="line ngde"><span class="hljs-comment ngde">// generic N is inferred as "FetchBook"</span>
</span><span class="line ngde"><span class="hljs-comment ngde">// generic P is inferred as { id: string }</span>
</span></code></pre><p class="ngde">In comparison, without type containers, it is not possible to leverage the power of TypeScript generic inference, so all the generics have to be manually supplied:</p><pre class="ngde hljs"><code class="hljs language-ts code-lines ngde" lang="ts" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">declare</span> <span class="hljs-keyword ngde">function</span> createActionFactory&#x3C;N <span class="hljs-keyword ngde">extends</span> <span class="hljs-built_in ngde">string</span>, P <span class="hljs-keyword ngde">extends</span> <span class="hljs-built_in ngde">object</span>>(
</span><span class="line ngde">  <span class="hljs-attr ngde">name</span>: <span class="hljs-built_in ngde">string</span>,
</span><span class="line ngde">): <span class="hljs-title class_ ngde">ActionFactory</span>&#x3C;N, P>;
</span></code></pre><pre class="ngde hljs"><code class="hljs language-ts code-lines ngde" lang="ts" name="" icon="" highlightedlines="[]"><span class="line ngde">createActionFactory&#x3C;<span class="hljs-string ngde">'FetchBook'</span>, { <span class="hljs-attr ngde">id</span>: <span class="hljs-built_in ngde">string</span> }>(<span class="hljs-string ngde">'FetchBook'</span>);
</span></code></pre><p class="ngde">Note that the string literal <code class="ngde">'FetchBook'</code> is repeated twice because of the lack of generic inference. When the generics are complicated, it could be impossible to manually supply all the generic, and that's when Type Containers come handy.</p>`,T=(()=>{let e=class e extends t{constructor(){super(),this.routePrefix="",this.pageType="guide",this.pageContent=x,this.page=s,this.demoAssets=f}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=i({type:e,selectors:[["ng-doc-page-core-type-container"]],standalone:!0,features:[d([{provide:t,useExisting:e},y,s.providers??[]]),o,r],decls:1,vars:0,template:function(a,P){a&1&&p(0,"ng-doc-page")},dependencies:[g],encapsulation:2,changeDetection:0});let n=e;return n})(),w=[l(c({},(0,m.isRoute)(s.route)?s.route:{}),{path:"",component:T,title:"Type Container"})],E=w;export{T as DynamicComponent,E as default};
