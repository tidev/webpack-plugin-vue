const RuleSet = require('webpack/lib/RuleSet');

module.exports = class TitaniumLoaderPlugin {
	constructor(options) {
    this.diagnostics = options.diagnostics;
    this.compiler = options.compiler;
	}

	apply(compiler) {
    const rawRules = compiler.options.module.rules;
    const { rules } = new RuleSet(rawRules);

    let vueRuleIndex = rules.findIndex(rule => rule.use && rule.use.find(u => u.loader === 'vue-loader'));
    if (vueRuleIndex === -1) {
      throw new Error(
        '[TitaniumLoaderPlugin Error] No matching rule for vue-loader found.\n'
        + 'Make sure there is at least one root-level rule that uses vue-loader.'
      );
    }

    const vueRule = rules[vueRuleIndex];
    vueRule.use.unshift({
      loader: require.resolve('./titanium-vue-loader'),
      options: {
        diagnostics: this.diagnostics,
        compiler: this.compiler
      }
    });

    compiler.options.module.rules = rules;
	}
};
