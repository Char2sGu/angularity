import{a as i}from"./chunk-MP3NNOXV.js";import"./chunk-OZEKEGSP.js";import{a as d}from"./chunk-Y2WVPISR.js";import{L as n,Sa as c,Ta as o,ka as t,xa as l}from"./chunk-VOAW662X.js";import"./chunk-P2VZOJAX.js";var r=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">cdk / dialog</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Class">Class</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span><div class="ng-doc-decorators-group ngde" indexable="false"><code class="ngde">@Component</code></div><span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-tag-selector">agl-animation-aware-dialog-container</span></div><h1 id="animationawaredialogcontainer" class="ngde">AnimationAwareDialogContainer<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#animationawaredialogcontainer"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><!-- This is a hack to make the declaration name available to the search index. --><div style="display: none" class="ngde">%%API_NAME_ANCHOR%%</div><div class="ng-doc-header-details ngde" indexable="false"><span class="ng-doc-header-details-label ngde">Extends</span> <code indexable="false" class="ngde">CdkDialogContainer&#x3C;DialogConfig&#x3C;unknown, unknown, BasePortalOutlet>></code></div></header><section class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></section><section class="ngde"><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-properties-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-properties-table-name ngde">Name</th><th class="ng-doc-properties-table-type ngde">Type</th><th class="ng-doc-properties-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="_ariaLabelledByQueue" data-slugtype="member" id="_ariaLabelledByQueue" class="ngde"><td indexable="false" class="ngde">_ariaLabelledByQueue<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><p class="ngde">Queue of the IDs of the dialog's label element, based on their definition order. The first ID will be used as the <code class="ngde">aria-labelledby</code> value. We use a queue here to handle the case where there are two or more titles in the DOM at a time and the first one is destroyed while the rest are present.</p></td></tr><tr data-slug="_attachedPortal" data-slugtype="member" id="_attachedPortal" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Protected" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="protected">p</span> </span>_attachedPortal<div class="ng-doc-node-details ngde">inherited from <code class="ngde">BasePortalOutlet</code></div></td><td class="ngde"><code indexable="false" class="ngde">Portal&#x3C;any> | null</code></td><td class="ngde"><p class="ngde">The portal currently attached to the host.</p></td></tr><tr data-slug="_changeDetectorRef" data-slugtype="member" id="_changeDetectorRef" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Protected, Readonly" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="protected">p</span> <span class="ng-doc-badge ngde" indexable="false" data-content="readonly">r</span> </span>_changeDetectorRef<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">ChangeDetectorRef</code></td><td class="ngde"></td></tr><tr data-slug="_closeInteractionType" data-slugtype="member" id="_closeInteractionType" class="ngde"><td indexable="false" class="ngde">_closeInteractionType<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">FocusOrigin</code></td><td class="ngde"><p class="ngde">Type of interaction that led to the dialog being closed. This is used to determine whether the focus style will be applied when returning focus to its original location after the dialog is closed.</p></td></tr><tr data-slug="_config" data-slugtype="member" id="_config" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Readonly" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="readonly">r</span> </span>_config<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">C</code></td><td class="ngde"></td></tr><tr data-slug="_document" data-slugtype="member" id="_document" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Protected" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="protected">p</span> </span>_document<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">Document</code></td><td class="ngde"></td></tr><tr data-slug="_elementRef" data-slugtype="member" id="_elementRef" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Protected" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="protected">p</span> </span>_elementRef<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">ElementRef&#x3C;any></code></td><td class="ngde"></td></tr><tr data-slug="_focusTrapFactory" data-slugtype="member" id="_focusTrapFactory" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Protected" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="protected">p</span> </span>_focusTrapFactory<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">FocusTrapFactory</code></td><td class="ngde"></td></tr><tr data-slug="_ngZone" data-slugtype="member" id="_ngZone" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Protected" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="protected">p</span> </span>_ngZone<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">NgZone</code></td><td class="ngde"></td></tr><tr data-slug="_portalOutlet" data-slugtype="member" id="_portalOutlet" class="ngde"><td indexable="false" class="ngde">_portalOutlet<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">CdkPortalOutlet</code></td><td class="ngde"><p class="ngde">The portal outlet inside of this container into which the dialog content will be loaded.</p></td></tr><tr data-slug="animationDone$" data-slugtype="member" id="animationDone$" class="ngde"><td indexable="false" class="ngde">animationDone$<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">Subject&#x3C;void></code></td><td class="ngde"></td></tr><tr data-slug="attachDomPortal" data-slugtype="member" id="attachDomPortal" class="ngde"><td indexable="false" class="ngde">attachDomPortal<div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></td><td class="ngde"><code indexable="false" class="ngde">(portal: DomPortal&#x3C;HTMLElement>) => void</code></td><td class="ngde"><p class="ngde">Attaches a DOM portal to the dialog container.</p></td></tr></tbody></table></div></section><section class="ngde"><h2 id="methods" class="ngde">Methods<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#methods"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="_addarialabelledby" class="ngde">_addAriaLabelledBy()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#_addarialabelledby"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">_addAriaLabelledBy</span>(<span class="hljs-attr ngde">id</span>: <span class="hljs-built_in ngde">string</span>): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">id<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><div class="ng-doc-modifiers-wrapper ngde" indexable="false"><span class="ng-doc-modifier ngde" indexable="false" data-content="protected">protected</span></div><h3 data-slugtype="member" id="_captureinitialfocus" class="ngde">_captureInitialFocus()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#_captureinitialfocus"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Can be used by child classes to customize the initial focus capturing behavior (e.g. if it's tied to an animation).</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">protected</span> <span class="hljs-title function_ ngde">_captureInitialFocus</span>(): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><div class="ng-doc-modifiers-wrapper ngde" indexable="false"><span class="ng-doc-modifier ngde" indexable="false" data-content="protected">protected</span></div><h3 data-slugtype="member" id="_contentattached" class="ngde">_contentAttached()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#_contentattached"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">protected</span> <span class="hljs-title function_ ngde">_contentAttached</span>(): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="_recapturefocus" class="ngde">_recaptureFocus()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#_recapturefocus"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Captures focus if it isn't already inside the dialog.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">_recaptureFocus</span>(): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="_removearialabelledby" class="ngde">_removeAriaLabelledBy()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#_removearialabelledby"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">_removeAriaLabelledBy</span>(<span class="hljs-attr ngde">id</span>: <span class="hljs-built_in ngde">string</span>): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">id<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><div class="ng-doc-modifiers-wrapper ngde" indexable="false"><span class="ng-doc-modifier ngde" indexable="false" data-content="protected">protected</span></div><h3 data-slugtype="member" id="_trapfocus" class="ngde">_trapFocus()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#_trapfocus"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Moves the focus inside the focus trap. When autoFocus is not set to 'dialog', if focus cannot be moved then focus will go to the dialog container.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">protected</span> <span class="hljs-title function_ ngde">_trapFocus</span>(): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="attach" class="ngde">attach()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#attach"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">BasePortalOutlet</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">attach</span>(<span class="hljs-attr ngde">portal</span>: <span class="hljs-title class_ ngde">ComponentPortal</span>&#x3C;T>): <span class="hljs-title class_ ngde">ComponentRef</span>&#x3C;T>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">portal<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ComponentPortal&#x3C;T></code></td><td class="ngde"></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">ComponentRef&#x3C;T></code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="attachcomponentportal" class="ngde">attachComponentPortal()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#attachcomponentportal"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Attach a ComponentPortal as content to this dialog container.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">attachComponentPortal</span>(<span class="hljs-attr ngde">portal</span>: <span class="hljs-title class_ ngde">ComponentPortal</span>&#x3C;T>): <span class="hljs-title class_ ngde">ComponentRef</span>&#x3C;T>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">portal<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ComponentPortal&#x3C;T></code></td><td class="ngde"><p class="ngde">Portal to be attached as the dialog content.</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">ComponentRef&#x3C;T></code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="attachtemplateportal" class="ngde">attachTemplatePortal()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#attachtemplateportal"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Attach a TemplatePortal as content to this dialog container.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">attachTemplatePortal</span>(<span class="hljs-attr ngde">portal</span>: <span class="hljs-title class_ ngde">TemplatePortal</span>&#x3C;T>): <span class="hljs-title class_ ngde">EmbeddedViewRef</span>&#x3C;T>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">portal<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">TemplatePortal&#x3C;T></code></td><td class="ngde"><p class="ngde">Portal to be attached as the dialog content.</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">EmbeddedViewRef&#x3C;T></code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="detach" class="ngde">detach()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#detach"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">BasePortalOutlet</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Detaches a previously attached portal.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">detach</span>(): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="dispose" class="ngde">dispose()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#dispose"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">BasePortalOutlet</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Permanently dispose of this portal host.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">dispose</span>(): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="hasattached" class="ngde">hasAttached()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#hasattached"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">BasePortalOutlet</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Whether this host has an attached portal.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">hasAttached</span>(): <span class="hljs-built_in ngde">boolean</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">boolean</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="ngondestroy" class="ngde">ngOnDestroy()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#ngondestroy"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">CdkDialogContainer</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">ngOnDestroy</span>(): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="setdisposefn" class="ngde">setDisposeFn()<a title="Link to heading" class="ng-doc-header-link ngde" href="/references/cdk-dialog/classes/AnimationAwareDialogContainer#setdisposefn"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">inherited from <code class="ngde">BasePortalOutlet</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">@docs-private</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">setDisposeFn</span>(<span class="hljs-attr ngde">fn</span>: <span class="hljs-function ngde">() =></span> <span class="hljs-built_in ngde">void</span>): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">fn<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">() => void</code></td><td class="ngde"></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div></section>`,p=(()=>{let e=class e extends d{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=r,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=n({type:e,selectors:[["ng-doc-page-references-cdk-dialog-classes-animation-aware-dialog-container"]],standalone:!0,features:[c([{provide:d,useExisting:e}]),t,o],decls:1,vars:0,template:function(s,b){s&1&&l(0,"ng-doc-page")},dependencies:[i],encapsulation:2,changeDetection:0});let a=e;return a})(),h=[{path:"",component:p,title:"AnimationAwareDialogContainer"}],u=h;export{p as DynamicComponent,u as default};
