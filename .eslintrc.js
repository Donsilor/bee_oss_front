module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ['plugin:vue/recommended', 'eslint:recommended'],
	// add your custom rules here
	//it is base on https://github.com/vuejs/eslint-config-vue
	rules: {
		'arrow-parens': 0,
		'no-console': 0,
		semi: [2, 'never'],
		'space-before-function-paren': [2, 'never'],
		'no-new': 0,
		'no-undef': 0,
		'comma-spacing': 0,
		'space-infix-ops': 0,
		'space-in-parens': 0,
		'spaced-comment': 0,
		'no-tabs': 0,
		'no-mixed-spaces-and-tabs': 0,
		indent: [2, 2],
		'operator-linebreak': 0,
		'space-before-blocks': 0,
		'comma-dangle': 0,
		'no-mixed-operators': 0,
		'eol-last': 0,
		'prefer-promise-reject-errors': 0,
		'vue/require-prop-types': 0,
		'vue/require-v-for-key': 0,
		'no-unused-vars': 0,
		'vue/no-parsing-error': 0
	}
}
