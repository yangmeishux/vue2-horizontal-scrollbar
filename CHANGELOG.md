# Changelog

## [0.0.9] - 2025-01-27

### Added

- Added support for ref names (targetRef, contentRef) as alternatives to selectors
- Made targetSelector and contentSelector optional
- Added getElementByRef method to find elements by ref names
- Updated documentation with ref usage examples

### Changed

- Improved error messages to guide users on proper usage
- Updated README with recommended ref-based usage

## [0.0.8] - 2025-01-27

### Fixed

- Fixed webpack compatibility issues by targeting ES5/ES2015
- Removed optional chaining operators for better browser compatibility
- Updated build configuration to generate more compatible code
- Added terser minification for smaller bundle size

## [0.0.7] - 2025-01-27

### Changed

- **BREAKING CHANGE**: Migrated from Vue 3 to Vue 2 support
- Replaced Composition API with Options API
- Removed Teleport and Transition components for Vue 2 compatibility
- Updated all dependencies to support Vue 2.x
- Changed from lodash-es to lodash for better Vue 2 compatibility
- Updated build configuration to use @vitejs/plugin-vue2
- Updated test configuration for Vue 2 compatibility

### Removed

- Vue 3 specific features (Teleport, Transition, Composition API)
- lodash-es dependency
- @vitejs/plugin-vue dependency

### Added

- Full Vue 2.x support
- lodash dependency
- @vitejs/plugin-vue2 dependency
- vue-template-compiler for Vue 2 compatibility

## [0.0.1] - 2025-06-27

### Added

- Initial release of Vue Horizontal Scrollbar
- Customizable horizontal scrollbar component
- Support for keyboard navigation
- Responsive design with resize observer
- Flexible positioning with offset props
