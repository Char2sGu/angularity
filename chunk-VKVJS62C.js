import{a as c}from"./chunk-IK7FDAWK.js";import"./chunk-73E4PGK3.js";import"./chunk-BEEPLMHP.js";import{a as e}from"./chunk-OIQWCD35.js";import"./chunk-NGRQBGZ3.js";import"./chunk-TKY5DHZR.js";import{Ba as d,Ra as l,U as n,nb as o,ob as t}from"./chunk-2P42YJQL.js";import"./chunk-TWZW5B45.js";var r=`<p class="ngde">Higher level abstraction of <code class="ngde">BreakpointObserver</code> from Angular CDK, allowing observing multiple named breakpoints.</p><h2 id="properties" href="api/classes/cdk-layout/NamedBreakpointObserver" headinglink="true" class="ngde">Properties<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="properties"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table sticky first-colum-highlighted ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-api-table-name ngde">Name</th><th class="ng-doc-api-table-type ngde">Type</th><th class="ng-doc-api-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde" data-slug="observer" data-slugtype="member" id="observer"><td indexable="false" class="ngde"><span class="ngde">observer <span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Protected" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="protected">p</span></span></span><div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">BreakpointObserver</code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div></td></tr></tbody></table></div><h2 id="methods" href="api/classes/cdk-layout/NamedBreakpointObserver" headinglink="true" class="ngde">Methods<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="methods"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="observe" href="api/classes/cdk-layout/NamedBreakpointObserver" headinglink="true" class="ngde">observe()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="observe"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Observes the given breakpoints and returns an observable map of their states.</p><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Notes</h5><p class="ngde">The return type carries type information about the breakpoint names, allowing for type-safe access to the breakpoint states.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">observe</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(<a href="https://rxjs.dev/api/index/const/config" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the RxJS documentation.">config</a>: <a href="api/type-aliases/cdk-layout/BreakpointConfig" class="ng-doc-code-anchor ngde">BreakpointConfig</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">BreakpointName</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">): <a href="https://rxjs.dev/api/index/class/Observable" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the RxJS documentation.">Observable</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"><a href="api/type-aliases/cdk-layout/BreakpointMap" class="ng-doc-code-anchor ngde">BreakpointMap</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">BreakpointName</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">>></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">config<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="api/type-aliases/cdk-layout/BreakpointConfig" class="ng-doc-code-anchor ngde">BreakpointConfig</a>&#x3C;BreakpointName></code></td><td class="ngde"><p class="ngde">a map of breakpoint names and their corresponding queries</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="https://rxjs.dev/api/index/class/Observable" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the RxJS documentation.">Observable</a>&#x3C;<a href="api/type-aliases/cdk-layout/BreakpointMap" class="ng-doc-code-anchor ngde">BreakpointMap</a>&#x3C;BreakpointName>></code> <span class="ngde">-</span><p class="ngde">an <code class="ngde ng-doc-code-with-link"><a href="https://rxjs.dev/api/index/class/Observable" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the RxJS documentation.">Observable</a></code> emitting the current state of each of the configured breakpoints.</p></div></td></tr><tr indexable="false" class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Example usage</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-ts"><span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">observer</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">observe</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  small</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> '(max-width: 599px)'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  medium</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> '(min-width: 600px) and (max-width: 959px)'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  large</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> '(min-width: 960px)'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">})</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">subscribe</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">((</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde"><a href="https://angular.dev/api/animations/state" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the Angular documentation.">state</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  <a href="https://angular.dev/api/animations/state" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the Angular documentation.">state</a></span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">small</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  <a href="https://angular.dev/api/animations/state" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the Angular documentation.">state</a></span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">medium</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  <a href="https://angular.dev/api/animations/state" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the Angular documentation.">state</a></span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">large</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">})</span></span></code></pre></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><div class="ng-doc-modifiers-wrapper ngde" indexable="false"><span class="ng-doc-modifier ngde" indexable="false" data-content="protected">protected</span></div><h3 data-slugtype="member" id="parsestate" href="api/classes/cdk-layout/NamedBreakpointObserver" headinglink="true" class="ngde">parseState()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="parsestate"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">protected </span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">parseState</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(<a href="https://rxjs.dev/api/index/const/config" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the RxJS documentation.">config</a>: <a href="api/type-aliases/cdk-layout/BreakpointConfig" class="ng-doc-code-anchor ngde">BreakpointConfig</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">BreakpointName</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> <a href="https://angular.dev/api/animations/state" class="ng-doc-code-anchor ngde" ngDocTooltip="External link the Angular documentation.">state</a>: BreakpointState): <a href="api/type-aliases/cdk-layout/BreakpointMap" class="ng-doc-code-anchor ngde">BreakpointMap</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">BreakpointName</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">config<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="api/type-aliases/cdk-layout/BreakpointConfig" class="ng-doc-code-anchor ngde">BreakpointConfig</a>&#x3C;BreakpointName></code></td><td class="ngde"></td></tr><tr class="ngde"><td indexable="false" class="ngde">state<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">BreakpointState</code></td><td class="ngde"></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="api/type-aliases/cdk-layout/BreakpointMap" class="ng-doc-code-anchor ngde">BreakpointMap</a>&#x3C;BreakpointName></code></div></td></tr></tbody></table></div>`,g=(()=>{class a extends e{constructor(){super(),this.pageType="api",this.pageContent=r}static{this.\u0275fac=function(s){return new(s||a)}}static{this.\u0275cmp=n({type:a,selectors:[["ng-doc-page-2kqf63yk"]],standalone:!0,features:[o([{provide:e,useExisting:a}]),d,t],decls:1,vars:0,template:function(s,h){s&1&&l(0,"ng-doc-page")},dependencies:[c],encapsulation:2,changeDetection:0})}}return a})(),p=[{path:"",component:g,title:"NamedBreakpointObserver"}],b=p;export{g as PageComponent,b as default};
