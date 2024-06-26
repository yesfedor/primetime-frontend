// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	antfu({
		typescript: true,
		vue: true,
		gitignore: false,
		yaml: false,
		toml: false,
		stylistic: {
			indent: 'tab',
			quotes: 'single',
		},
		formatters: {
			css: true,
			html: true,
			markdown: true,
		},
		// ...@antfu/eslint-config options
	}, {
		rules: {
			'curly': ['warn', 'all'],
			'style/arrow-parens': [1, 'always'],
			'style/yield-star-spacing': 'off',
			'node/prefer-global/process': 'off',
			'unicorn/prefer-node-protocol': 'off',
			'style/brace-style': ['warn', '1tbs'],
			'ts/consistent-type-definitions': 'off',
			'vue/block-order': ['error', {
				order: [['template', 'script'], 'style'],
			}],
			'unused-imports/no-unused-vars': 'off',
		},
	}),
	// ...your other rules
)
