/* eslint indent: ["error", "tab", { "MemberExpression": "off" }] */

const titaniumCompiler = require('titanium-vue-template-compiler');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack');

const TitaniumLoaderPlugin = require('./TitaniumLoaderPlugin');

module.exports = function (api, options) {
	const platformName = options.build.platform;
	// set target platform for titanium-vue-template-compiler
	process.env.TARGET_PLATFORM = platformName;

	api.chainWebpack(config => {
		config.resolve
			.alias
				.set('@', api.resolve('src'))
				.set('vue$', 'titanium-vue')
				.end()
			.extensions
				.merge([ '.vue' ])
				.end();

		config.module
			.noParse(/^(titanium-vue|vue-router|vuex|vuex-router-sync)$/);

		config.module
			.rule('js')
				.exclude
					.add(filepath => {
						// always transpile js in vue files
						if (/\.vue\.jsx?$/.test(filepath)) {
							return false;
						}
					})
					.end();

		config.module
			.rule('vue')
				.test(/\.vue$/)
				.use('vue')
					.loader('vue-loader')
					.options({
						compiler: titaniumCompiler
					});

		config.plugin('vue-define')
			.use(DefinePlugin, [
				{
					'process.env.TARGET_PLATFORM': JSON.stringify(platformName)
				}
			]);

		config.plugin('vue-loader')
			.use(VueLoaderPlugin);

		config.plugin('titanium-loader')
			.use(TitaniumLoaderPlugin, [
				{
					compiler: titaniumCompiler,
					diagnostics: api.context.diagnostics
				}
			]);
	});
};
