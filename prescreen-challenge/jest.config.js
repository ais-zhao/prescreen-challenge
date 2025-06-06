module.exports = {
    "preset": "jest-expo",
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!.*)'
    ],
};