module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: [ '<rootDir>/lib/**/*.test.ts' ],
	collectCoverageFrom: [ '<rootDir>/lib/**' ],
	coverageReporters: [ 'lcov', 'text', 'html' ],
};
