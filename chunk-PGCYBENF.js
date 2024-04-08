import{a as l}from"./chunk-6ORSQ67G.js";import"./chunk-LAHBPHMM.js";import{a}from"./chunk-FHAHQJSK.js";import{L as t,Sa as p,Ta as c,ka as d,xa as i}from"./chunk-EZIACBBL.js";import"./chunk-P2VZOJAX.js";var r=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">endpoints</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="TypeAlias">TypeAlias</span></div><h1 id="generateendpoint" class="ngde">GenerateEndpoint<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/endpoints/type-aliases/GenerateEndpoint#generateendpoint"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><!-- This is a hack to make the declaration name available to the search index. --><div style="display: none" class="ngde">%%API_NAME_ANCHOR%%</div></header><section class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/endpoints/type-aliases/GenerateEndpoint#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">type</span> <span class="hljs-title class_ ngde"><a href="/references/endpoints/type-aliases/GenerateEndpoint" class="ng-doc-code-anchor ngde" data-link-type="TypeAlias" class="ngde">GenerateEndpoint</a></span> = (<span class="hljs-params ngde"></span>
</span><span class="line ngde"><span class="hljs-params ngde">  params: Schema[</span><span class="hljs-string ngde">'params'</span>] <span class="hljs-keyword ngde">extends</span><span class="hljs-params ngde"> <a href="/references/endpoints/interfaces/EndpointParamsSchema" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">EndpointParamsSchema</a></span>
</span><span class="line ngde"><span class="hljs-params ngde">    ? <a href="/references/endpoints/type-aliases/ResolveEndpointParamsSchema" class="ng-doc-code-anchor ngde" data-link-type="TypeAlias" class="ngde">ResolveEndpointParamsSchema</a>&#x3C;Schema[</span><span class="hljs-string ngde">'params'</span><span class="hljs-params ngde">]></span>
</span><span class="line ngde"><span class="hljs-params ngde">    : </span><span class="hljs-built_in ngde">void</span><span class="hljs-params ngde">,</span>
</span><span class="line ngde"><span class="hljs-params ngde"></span>) => <span class="hljs-title class_ ngde">Observable</span>&#x3C;<span class="hljs-title class_ ngde"><a href="/references/core/type-aliases/ContainedTypeOf" class="ng-doc-code-anchor ngde" data-link-type="TypeAlias" class="ngde">ContainedTypeOf</a></span>&#x3C;<span class="hljs-title class_ ngde">Schema</span>[<span class="hljs-string ngde">'response'</span>]>>;
</span></code></pre></section>`,g=(()=>{let e=class e extends a{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=r,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=t({type:e,selectors:[["ng-doc-page-references-endpoints-type-aliases-generate-endpoint"]],standalone:!0,features:[p([{provide:a,useExisting:e}]),d,c],decls:1,vars:0,template:function(s,m){s&1&&i(0,"ng-doc-page")},dependencies:[l],encapsulation:2,changeDetection:0});let n=e;return n})(),h=[{path:"",component:g,title:"GenerateEndpoint"}],u=h;export{g as DynamicComponent,u as default};
