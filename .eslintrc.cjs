const path = require('path');
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	env: {
		browser: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:react-hooks/recommended',
	],
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		// e.g. "@typescript-eslint/explicit-function-return-type": "off",
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		/* '@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off', */
		// These rules don't add much value, are better covered by TypeScript and good definition files
		'react/no-direct-mutation-state': 'off',
		'react/no-deprecated': 'off',
		'react/no-string-refs': 'off',
		'react/require-render-return': 'off',
		'prefer-const': 0,
		'no-misleading-character-class': 0,
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.jsx', '.tsx'],
			},
		], // also want to use with ".tsx"
		'react/prop-types': 'off', // Is this incompatible with TS props type?
	},
	settings: {
		react: {
			version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
		},
		linkComponents: [
			// Components used as alternatives to <a> for linking, eg. <Link to={ url } />
			'Hyperlink',
			{ name: 'Link', linkAttribute: 'to' },
		],
		defaultSeverity: 'warn',
	},
	parserOptions: {
		project: path.resolve(__dirname, 'tsconfig.json'),
		tsconfigRootDir: __dirname,
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
		},
	},
	ignorePatterns: ['.eslintrc.cjs', 'node_modules/', 'globals.ts'],
};
