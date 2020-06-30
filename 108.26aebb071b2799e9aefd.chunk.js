(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{401:function(n,a,s){"use strict";s.r(a),a.default='<p><a href="https://npmjs.com/package/node-loader"><img src="https://img.shields.io/npm/v/node-loader.svg" alt="npm"></a>\n<a href="https://nodejs.org/"><img src="https://img.shields.io/node/v/node-loader.svg" alt="node"></a>\n<a href="https://david-dm.org/webpack-contrib/node-loader"><img src="https://david-dm.org/webpack-contrib/node-loader.svg" alt="deps"></a>\n<a href="https://github.com/webpack-contrib/node-loader/actions"><img src="https://github.com/webpack-contrib/node-loader/workflows/node-loader/badge.svg" alt="tests"></a>\n<a href="https://codecov.io/gh/webpack-contrib/node-loader"><img src="https://codecov.io/gh/webpack-contrib/node-loader/branch/master/graph/badge.svg" alt="coverage"></a>\n<a href="https://gitter.im/webpack/webpack"><img src="https://badges.gitter.im/webpack/webpack.svg" alt="chat"></a>\n<a href="https://packagephobia.now.sh/result?p=node-loader"><img src="https://packagephobia.now.sh/badge?p=node-loader" alt="size"></a></p>\n<p>A <a href="https://nodejs.org/dist/latest/docs/api/addons.html">Node.js add-ons</a> loader.</p>\n<p>Allows to connect native node modules with <code>.node</code> extension.</p>\n<blockquote>\n<p>⚠ <code>node-loader</code> only works on the <code>node</code>/<code>electron-main</code>/<code>electron-main</code> targets.</p>\n</blockquote>\n<h2 id="getting-started">Getting Started<a href="#getting-started" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>To begin, you\'ll need to install <code>node-loader</code>:</p>\n<pre><code class="hljs language-console">$ npm install node-loader --save-dev\n</code></pre>\n<p>Setup the <code>target</code> option to <code>node</code>/<code>electron-main</code>/<code>electron-main</code> value and do not mock the <code>__dirname</code> global variable.</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  target<span class="token punctuation">:</span> <span class="token string">\'node\'</span><span class="token punctuation">,</span>\n  node<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    __dirname<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.node$/</span><span class="token punctuation">,</span>\n        loader<span class="token punctuation">:</span> <span class="token string">\'node-loader\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3 id="inline">Inline<a href="#inline" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p><strong>index.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> node <span class="token keyword">from</span> <span class="token string">\'node-loader!./file.node\'</span><span class="token punctuation">;</span></code></pre>\n<p>And run <code>webpack</code> via your preferred method.</p>\n<h3 id="configuration">Configuration<a href="#configuration" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p><strong>index.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> node <span class="token keyword">from</span> <span class="token string">\'file.node\'</span><span class="token punctuation">;</span></code></pre>\n<p>Then add the loader to your <code>webpack</code> config. For example:</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  target<span class="token punctuation">:</span> <span class="token string">\'node\'</span><span class="token punctuation">,</span>\n  node<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    __dirname<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.node$/</span><span class="token punctuation">,</span>\n        loader<span class="token punctuation">:</span> <span class="token string">\'node-loader\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>And run <code>webpack</code> via your preferred method.</p>\n<h2 id="options">Options<a href="#options" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<table>\n<thead>\n<tr>\n<th align="center">Name</th>\n<th align="center">Type</th>\n<th align="center">Default</th>\n<th align="left">Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><a href="#flags"><code>flags</code></a></strong><p class="description mobile"><code>{Number}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{Number}</code></td>\n<td align="center"><code>undefined</code></td>\n<td align="left">Enables/Disables \n<code>url</code>\n/\n<code>image-set</code>\n functions handling</td>\n</tr>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><a href="#name"><code>name</code></a></strong><p class="description mobile"><code>{String\\|Function}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{String\\|Function}</code></td>\n<td align="center"><code>\'[contenthash].[ext]\'</code></td>\n<td align="left">Specifies a custom filename template for the target file(s).</td>\n</tr>\n</tbody>\n</table>\n<h3 id="flags"><code>flags</code><a href="#flags" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Type: <code>Number</code>\nDefault: <code>undefined</code></p>\n<p>The <code>flags</code> argument is an integer that allows to specify dlopen behavior.\nSee the <a href=""><code>process.dlopen</code></a> documentation for details.</p>\n<p><strong>index.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> node <span class="token keyword">from</span> <span class="token string">\'file.node\'</span><span class="token punctuation">;</span></code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">const</span> os <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'os\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  target<span class="token punctuation">:</span> <span class="token string">\'node\'</span><span class="token punctuation">,</span>\n  node<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    __dirname<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.node$/</span><span class="token punctuation">,</span>\n        loader<span class="token punctuation">:</span> <span class="token string">\'node-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          flags<span class="token punctuation">:</span> os<span class="token punctuation">.</span>constants<span class="token punctuation">.</span>dlopen<span class="token punctuation">.</span><span class="token constant">RTLD_NOW</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3 id="name"><code>name</code><a href="#name" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Type: <code>String|Function</code>\nDefault: <code>\'[contenthash].[ext]\'</code></p>\n<p>Specifies a custom filename template for the target file(s).</p>\n<h4 id="string"><code>String</code><a href="#string" aria-hidden="true"><span class="icon icon-link"></span></a></h4>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  target<span class="token punctuation">:</span> <span class="token string">\'node\'</span><span class="token punctuation">,</span>\n  node<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    __dirname<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.node$/</span><span class="token punctuation">,</span>\n        loader<span class="token punctuation">:</span> <span class="token string">\'node-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          name<span class="token punctuation">:</span> <span class="token string">\'[path][name].[ext]\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h4 id="function"><code>Function</code><a href="#function" aria-hidden="true"><span class="icon icon-link"></span></a></h4>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  target<span class="token punctuation">:</span> <span class="token string">\'node\'</span><span class="token punctuation">,</span>\n  node<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    __dirname<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.node$/</span><span class="token punctuation">,</span>\n        loader<span class="token punctuation">:</span> <span class="token string">\'node-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          <span class="token function">name</span><span class="token punctuation">(</span>resourcePath<span class="token punctuation">,</span> resourceQuery<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// `resourcePath` - `/absolute/path/to/file.js`</span>\n            <span class="token comment">// `resourceQuery` - `?foo=bar`</span>\n\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">\'development\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n              <span class="token keyword">return</span> <span class="token string">\'[path][name].[ext]\'</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n\n            <span class="token keyword">return</span> <span class="token string">\'[contenthash].[ext]\'</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h2 id="contributing">Contributing<a href="#contributing" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Please take a moment to read our contributing guidelines if you haven\'t yet done so.</p>\n<p><a href="https://github.com/webpack-contrib/node-loader/blob/master/.github/CONTRIBUTING.md">CONTRIBUTING</a></p>\n<h2 id="license">License<a href="#license" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p><a href="https://github.com/webpack-contrib/node-loader/blob/master/LICENSE">MIT</a></p>\n'}}]);