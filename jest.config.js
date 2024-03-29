const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/shared/data',
    '<rootDir>/libs/shared/ui',
    '<rootDir>/libs/shared/form',
    '<rootDir>/libs/shared/layout',
    '<rootDir>/libs/domain/home',
    '<rootDir>/libs/domain/search',
    '<rootDir>/libs/domain/search-box',
    '<rootDir>/libs/domain/auth',
    '<rootDir>/apps/www',
    '<rootDir>/libs/domain/not-found',
    '<rootDir>/libs/shared/global',
    '<rootDir>/libs/domain/category',
    '<rootDir>/libs/domain/resource',
    '<rootDir>/libs/domain/resource-new',
    '<rootDir>/libs/domain/about',
    '<rootDir>/libs/domain/contact',
  ],
};
