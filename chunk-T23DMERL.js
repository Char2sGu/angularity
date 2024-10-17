import{a as i}from"./chunk-IK7FDAWK.js";import"./chunk-73E4PGK3.js";import"./chunk-BEEPLMHP.js";import{a as s}from"./chunk-OIQWCD35.js";import"./chunk-NGRQBGZ3.js";import"./chunk-TKY5DHZR.js";import{Ba as d,Ra as c,U as n,nb as o,ob as l}from"./chunk-2P42YJQL.js";import"./chunk-TWZW5B45.js";var g='<p class="ngde">A facade interface useful for reactively interacting with a specific type of dialog within components, created by <code class="ngde ng-doc-code-with-link"><a href="api/functions/cdk-dialog/useDialog" class="ng-doc-code-anchor ngde">useDialog</a></code>.</p><section indexable="false" class="ngde"><h2 id="see-also" href="api/interfaces/cdk-dialog/DialogFacade" headinglink="true" class="ngde">See Also<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="see-also"></ng-doc-heading-anchor></h2><ul class="ng-doc-see-also ngde"><li class="ngde"><p class="ngde"><code class="ngde ng-doc-code-with-link"><a href="api/functions/cdk-dialog/useDialog" class="ng-doc-code-anchor ngde">useDialog</a></code></p></li></ul></section><h2 id="properties" href="api/interfaces/cdk-dialog/DialogFacade" headinglink="true" class="ngde">Properties<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="properties"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table sticky first-colum-highlighted ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-api-table-name ngde">Name</th><th class="ng-doc-api-table-type ngde">Type</th><th class="ng-doc-api-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde" data-slug="ref" data-slugtype="member" id="ref"><td indexable="false" class="ngde"><span class="ngde">ref <span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Readonly" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="readonly">r</span></span></span><div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link">Signal&#x3C;<a href="api/type-aliases/cdk-dialog/DialogRefOf" class="ng-doc-code-anchor ngde">DialogRefOf</a>&#x3C;T> | undefined></code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Signal containing a <code class="ngde">DialogRef</code> if the dialog is launched and not disposed, or <code class="ngde">undefined</code> otherwise.</p></td></tr></tbody></table></div><h2 id="methods" href="api/interfaces/cdk-dialog/DialogFacade" headinglink="true" class="ngde">Methods<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="methods"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="launch" href="api/interfaces/cdk-dialog/DialogFacade" headinglink="true" class="ngde">launch()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="launch"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Launch the dialog with configuration overrides</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">launch</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(config</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">?:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> <a href="api/type-aliases/cdk-dialog/DialogConfigOf" class="ng-doc-code-anchor ngde">DialogConfigOf</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">T</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> |</span><span style="color:#005CC5;--shiki-dark:#D2A6FF" class="ngde"> undefined</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">): <a href="api/type-aliases/cdk-dialog/DialogRefOf" class="ng-doc-code-anchor ngde">DialogRefOf</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">T</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">config<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="api/type-aliases/cdk-dialog/DialogConfigOf" class="ng-doc-code-anchor ngde">DialogConfigOf</a>&#x3C;T> | undefined</code></td><td class="ngde"><p class="ngde">configuration that will be shallow-merged with the default one.</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="api/type-aliases/cdk-dialog/DialogRefOf" class="ng-doc-code-anchor ngde">DialogRefOf</a>&#x3C;T></code> <span class="ngde">-</span><p class="ngde">a strictly typed <code class="ngde">DialogRef</code> object</p></div></td></tr></tbody></table></div>',r=(()=>{class e extends s{constructor(){super(),this.pageType="api",this.pageContent=g}static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275cmp=n({type:e,selectors:[["ng-doc-page-vhkr5aci"]],standalone:!0,features:[o([{provide:s,useExisting:e}]),d,l],decls:1,vars:0,template:function(a,p){a&1&&c(0,"ng-doc-page")},dependencies:[i],encapsulation:2,changeDetection:0})}}return e})(),h=[{path:"",component:r,title:"DialogFacade"}],u=h;export{r as PageComponent,u as default};
