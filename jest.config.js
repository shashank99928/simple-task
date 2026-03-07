export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            diagnostics: false,
            tsconfig: {
                jsx: 'react-jsx',
                module: 'CommonJS',
                verbatimModuleSyntax: false,
                esModuleInterop: true
            }
        }]
    },
};
