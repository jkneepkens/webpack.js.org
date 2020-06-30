(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{322:function(n,e,a){"use strict";a.r(e),e.default='<h2 id="motivation">Motivation<a href="#motivation" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Multiple separate builds should form a single application. These separate builds should not have dependencies between each other, so they can be developed and deployed individually.</p>\n<p>This is often known as Micro-Frontends, but is not limited to that.</p>\n<h2 id="low-level-concepts">Low-level concepts<a href="#low-level-concepts" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>We distinguish between local and remote modules. Local modules are normal modules which are part of the current build. Remote modules are modules that are not part of the current build and loaded from a so-called container at the runtime.</p>\n<p>Loading remote modules is considered asynchronous operation. When using a remote module these asynchronous operations will be placed in the next chunk loading operation(s) that is between the remote module and the entrypoint. It\'s not possible to use a remote module without a chunk loading operation.</p>\n<p>A chunk loading operation is usually an <code>import()</code> call, but older constructs like <code>require.ensure</code> or <code>require([...])</code> are supported as well.</p>\n<p>A container is created through a container entry, which exposes asynchronous access to the specific modules. The exposed access is separated into two steps:</p>\n<ol>\n<li>loading the module (asynchronous)</li>\n<li>evaluating the module (synchronous).</li>\n</ol>\n<p>Step 1 will be done during the chunk loading. Step 2 will be done during the module evaluation interleaved with other (local and remote) modules. This way, evaluation order is unaffected by converting a module from local to remote or the other way around.</p>\n<p>It is possible to nest a container. Containers can use modules from other containers. Circular dependencies between container are also possible.</p>\n<h3 id="overriding">Overriding<a href="#overriding" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>A container is able to flag selected local modules as "overridable". A consumer of the container is able to provide "overrides", which are modules that replace one of the overridable modules of the container. All modules of the container will use the replacement module instead of the local module when the consumer provides one. When the consumer doesn\'t provide a replacement module, all modules of the container will use the local one.</p>\n<p>The container will manage overridable modules in a way that they do not need to be downloaded when they have been overridden by the consumer. This usually happens by placing them into separate chunks.</p>\n<p>On the other hand, the provider of the replacement modules, will only provide asynchronous loading functions. It allows the container to load replacement modules only when they are needed. The provider will manage replacement modules in a way that they do not need to be downloaded at all when they are not requested by the container. This usually happens by placing them into separate chunks.</p>\n<p>A "name" is used to identify overridable modules from the container.</p>\n<p>Overrides are provided in a similar way as the container exposes modules, separated into two steps:</p>\n<ol>\n<li>Loading (asynchronous)</li>\n<li>evaluating (asynchronous)</li>\n</ol>\n<blockquote class="warning">\n<p>When nesting is used, providing overrides to one container will automatically override the modules with the same "name" in the nested container(s).</p>\n</blockquote>\n<p>Overrides must be provided before the modules of the container are loaded. Overridables that are used in initial chunk, can only be overridden by a synchronous module override that doesn\'t use Promises. Once evaluated, overridables are no longer overridable.</p>\n<h2 id="high-level-concepts">High-level concepts<a href="#high-level-concepts" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Each build acts as container and also consumes other build as container. This way each build is able to access any other exposed module by loading it from its container.</p>\n<p>Shared modules are modules that are both overridable and provided as overrides to nested container. They usually point to the same module in each build, e.g. the same library.</p>\n<p>The <code>packageName</code> option allows setting a package name to look for a <code>requiredVersion</code>. It is automatically inferred for the module requests by default, set <code>requiredVersion</code> to <code>false</code> when automatic infer should be disabled.</p>\n<h2 id="building-blocks">Building blocks<a href="#building-blocks" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<h3 id="overridablesplugin-low-level"><code>OverridablesPlugin</code> (low level)<a href="#overridablesplugin-low-level" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>This plugin makes specific modules "overridable". A local API (<code>__webpack_override__</code>) allows to provide overrides.</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">const</span> OverridablesPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack/lib/container/OverridablesPlugin\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">new</span> <span class="token class-name">OverridablesPlugin</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        <span class="token comment">// we define an overridable module with OverridablesPlugin</span>\n        test1<span class="token punctuation">:</span> <span class="token string">\'./src/test1.js\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p><strong>src/index.js</strong></p>\n<pre><code class="hljs language-js"><span class="token function">__webpack_override__</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token comment">// here we override test1 module</span>\n  test1<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">\'I will override test1 module under src\'</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<h3 id="containerplugin-low-level"><code>ContainerPlugin</code> (low level)<a href="#containerplugin-low-level" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>This plugin creates an additional container entry with the specified exposed modules. It also uses the <code>OverridablesPlugin</code> internally and exposes the <code>override</code> API to consumer of the container.</p>\n<h3 id="containerreferenceplugin-low-level"><code>ContainerReferencePlugin</code> (low level)<a href="#containerreferenceplugin-low-level" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>This plugin adds specific references to containers as externals and allows to import remote modules from these containers. It also calls the <code>override</code> API of these containers to provide overrides to them. Local overrides (via <code>__webpack_override__</code> or <code>override</code> API when build is also a container) and specified overrides are provided to all referenced containers.</p>\n<h3 id="modulefederationplugin-high-level"><code>ModuleFederationPlugin</code> (high level)<a href="#modulefederationplugin-high-level" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>This plugin combines <code>ContainerPlugin</code> and <code>ContainerReferencePlugin</code>. Overrides and overridables are combined into a single list of specified shared modules.</p>\n<h2 id="concept-goals">Concept goals<a href="#concept-goals" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<ul>\n<li>It should be possible to expose and use any module type that webpack supports.</li>\n<li>Chunk loading should load everything needed in parallel (web: single round-trip to server).</li>\n<li>\n<p>Control from consumer to container</p>\n<ul>\n<li>Overriding modules is a one-directional operation.</li>\n<li>Sibling containers cannot override each other\'s modules.</li>\n</ul>\n</li>\n<li>\n<p>Concept should be environment-independent.</p>\n<ul>\n<li>Usable in web, Node.js, etc.</li>\n</ul>\n</li>\n<li>\n<p>Relative and absolute request in shared:</p>\n<ul>\n<li>Will always be provided, even if not used.</li>\n<li>Will resolve relative to <code>config.context</code>.</li>\n<li>Does not use a <code>requiredVersion</code> by default.</li>\n</ul>\n</li>\n<li>\n<p>Module requests in shared:</p>\n<ul>\n<li>Are only provided when they are used.</li>\n<li>Will match all used equal module requests in your build.</li>\n<li>Will provide all matching modules.</li>\n<li>Will extract <code>requiredVersion</code> from package.json at this position in the graph.</li>\n<li>Could provide and consume multiple different version when you have nested node_modules.</li>\n</ul>\n</li>\n<li>Module requests with trailing <code>/</code> in shared will match all module requests with this prefix.</li>\n</ul>\n<h2 id="use-cases">Use cases<a href="#use-cases" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<h3 id="separate-builds-per-page">Separate builds per page<a href="#separate-builds-per-page" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Each page of a Single Page Application is exposed from container build in a separate build. The application shell is also a separate build referencing all pages as remote modules. This way each page can be separately deployed. The application shell is deployed when routes are updated or new routes are added. The application shell defines commonly used libraries as shared modules to avoid duplication of them in the page builds.</p>\n<h3 id="components-library-as-container">Components library as container<a href="#components-library-as-container" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Many applications share a common components library which could be built as a container with each component exposed. Each application consumes components from the components library container. Changes to the components library can be separately deployed without the need to re-deploy all applications. The application automatically uses the up-to-date version of the components library.</p>\n<h2 id="troubleshooting">Troubleshooting<a href="#troubleshooting" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p><strong><code>Uncaught Error: Shared module is not available for eager consumption</code></strong></p>\n<p>The application is eagerly executing an application which is operating as an omnidirectional host. There are options to choose from:</p>\n<p>You can set the dependency as eager inside the advanced API of Module Federation, which doesn’t put the modules in an async chunk, but provides them synchronously. This allows us to use these shared modules in the initial chunk. But be careful as all provided and fallback modules will always be downloaded. It’s recommended to provide it only at one point of your application, e.g. the shell.</p>\n<p>We strongly recommend using an asynchronous boundary. It will split out the initialization code of a larger chunk to avoid any additional round trips and improve performance in general.</p>\n<p>For example, your entry looked like this:</p>\n<p><strong>index.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">\'./App\'</span><span class="token punctuation">;</span>\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&#x3C;</span>App <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>Let\'s create <code>bootstrap.js</code> file and move contents of the entry into it, and import that bootstrap into the entry:</p>\n<p><strong>index.js</strong></p>\n<pre><code class="hljs language-diff"><span class="token inserted">+ import(\'./bootstrap\');</span>\n<span class="token deleted">- import React from \'react\';</span>\n<span class="token deleted">- import ReactDOM from \'react-dom\';</span>\n<span class="token deleted">- import App from \'./App\';</span>\n<span class="token deleted">- ReactDOM.render(&#x3C;App />, document.getElementById(\'root\'));</span></code></pre>\n<p><strong>bootstrap.js</strong></p>\n<pre><code class="hljs language-diff"><span class="token inserted">+ import React from \'react\';</span>\n<span class="token inserted">+ import ReactDOM from \'react-dom\';</span>\n<span class="token inserted">+ import App from \'./App\';</span>\n<span class="token inserted">+ ReactDOM.render(&#x3C;App />, document.getElementById(\'root\'));</span></code></pre>\n<p>Methods mentioned below work, but can have some limits or drawbacks.</p>\n<p>Setting <code>eager: true</code> for dependency via the <code>ModuleFederationPlugin</code></p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token comment">// ...</span>\n<span class="token keyword">new</span> <span class="token class-name">ModuleFederationPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  shared<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span>deps<span class="token punctuation">,</span>\n    react<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      eager<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>Using <code>bundle-loader</code> as an alternative to setting dependencies as <code>\'eager\'</code>. This method is less performant as it will introduce additional round trips.</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token punctuation">:</span> <span class="token string">\'bundle-loader!./bootstrap.js\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>Or you can set it via module rules: <a href="https://github.com/module-federation/module-federation-examples/blob/master/basic-host-remote/app1/webpack.config.js">See Full Example</a></p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/bootstrap\\.js$/</span><span class="token punctuation">,</span>\n        loader<span class="token punctuation">:</span> <span class="token string">\'bundle-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          lazy<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>But have to change the entry point to look like this:</p>\n<p><strong>index.js</strong></p>\n<pre><code class="hljs language-diff"><span class="token deleted">- import(\'./bootstrap\');</span>\n<span class="token inserted">+ import bootstrap from \'./bootstrap\';</span>\n<span class="token inserted">+ bootstrap();</span></code></pre>\n<p><strong><code>Uncaught Error: Module "./Button" does not exist in container.</code></strong></p>\n<p>It likely does not say <code>"./Button"</code>, but the error message will look similar. This issue is typically seen if you are upgrading from webpack beta.16 to webpack beta.17.</p>\n<p>Within ModuleFederationPlugin. Change the exposes from:</p>\n<pre><code class="hljs language-diff">new ModuleFederationPlugin({\n  exposes: {\n<span class="token deleted">-   \'Button\': \'./src/Button\'</span>\n<span class="token inserted">+   \'./Button\':\'./src/Button\'</span>\n  }\n});</code></pre>\n<p><strong><code>Uncaught TypeError: fn is not a function</code></strong></p>\n<p>You are likely missing the remote container, make sure its added.\nIf you have the container loaded for the remote you are trying to consume, but still see this error, add the host container\'s remote container file to the HTML as well.</p>\n'}}]);