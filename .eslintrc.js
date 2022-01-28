module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'airbnb', 'prettier', 'plugin:react/recommended'],
    //   extends: ['eslint:recommended', 'airbnb', 'prettier', 'prettier/react'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        // indent: 'off',
        // 'comma-dangle': ['error', 'always-multiline'],
        // 'no-tabs': 'off',
        // 'no-continue': 'off',
        // 'no-unused-expressions': [
            // 'error',
            // {
                // allowShortCircuit: true // allow: a && a()
            // }
        // ],
        // 'no-underscore-dangle': 'off',
        // 'no-console': 'off',
        // 'react/destructuring-assignment': 'off',
        // 'react/jsx-props-no-spreading': 'off',
        // 'react/prop-types': 'off',
        // 'react/no-did-update-set-state': 'off',
        "react/function-component-definition": 'off',
        // 'jsx-a11y/click-events-have-key-events': 'off',
        // 'import/no-extraneous-dependencies': 'off',
        // 'import/no-dynamic-require': 'off',
        // 'prettier/prettier': 'error',
        // 'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['^draft'] }] // Allow immer.produce() pattern
    }
};
