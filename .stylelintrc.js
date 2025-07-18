export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
  ],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'media-query-no-invalid': null,
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': '^-?[a-z][a-z0-9]*(--?[a-z0-9]+)*$',
    'scss/no-global-function-names': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'no-empty-source': null,
    'alpha-value-notation': null,
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'color-hex-length': null,
    'scss/dollar-variable-empty-line-before': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'block-no-empty': null,
    'at-rule-empty-line-before': null,
    'no-duplicate-selectors': null,
    'font-family-name-quotes': null,
  },
}
