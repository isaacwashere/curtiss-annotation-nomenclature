# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-18

### Added

- Initial release of the Official Curtiss Annotation Nomenclature NPM Package
- 100 standardized CAN Codes for systematic reading and note-taking
- 3 CAN Emphasizers (`+`, `-`, `*`) for adding sentiment to annotations
- TypeScript type safety with enums, objects, types, and helper functions
- Complete annotation metadata (code, name, description) for all 100 codes
- Multiple access patterns: TypeScript enums, runtime objects, lookup maps, and functions
- Deep immutability - all data structures are frozen at runtime
- Comprehensive test suite with 62 tests covering all functionality
- Full documentation with examples, quick reference guide, and architecture docs

### Core Exports

**Annotation Codes (100 codes):**
- `CurtissAnnotationNomenclatureCodeEnum` - TypeScript enum for strictest type checking
- `CurtissAnnotationNomenclatureCodeValue` - Runtime-friendly enum-like object
- `CurtissAnnotationNomenclatureCodes` - Lookup map: code → name
- `CurtissAnnotationNomenclatureDescriptions` - Lookup map: code → description
- `CURTISS_ANNOTATION_NOMENCLATURE_CODES` - Array of all 100 codes

**CAN Emphasizers (3 codes):**
- `CurtissAnnotationNomenclatureEmphasizerEnum` - TypeScript enum for emphasizers
- `CurtissAnnotationNomenclatureEmphasizerValue` - Runtime-friendly emphasizer object
- `CurtissAnnotationNomenclatureEmphasizers` - Lookup map: emphasizer code → name
- `CurtissAnnotationNomenclatureEmphasizerDescriptions` - Lookup map: emphasizer code → description
- `CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS` - Array of all 3 emphasizer codes
- `CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO` - Metadata about emphasizer usage

**Helper Functions:**
- `getCurtissAnnotationNomenclatureCode(code)` - Get annotation by code
- `getCurtissAnnotationNomenclatureCodeByName(name)` - Get annotation by name
- `getAllCurtissAnnotationNomenclatureCodes()` - Get all annotations
- `isValidCurtissAnnotationNomenclatureCode(value)` - Validate annotation code
- `getCurtissAnnotationNomenclatureEmphasizerByCode(code)` - Get emphasizer by code
- `getCurtissAnnotationNomenclatureEmphasizerByName(name)` - Get emphasizer by name
- `getAllCurtissAnnotationNomenclatureEmphasizers()` - Get all emphasizers
- `isValidCurtissAnnotationNomenclatureEmphasizerCode(value)` - Validate emphasizer code
- `formatCANAnnotation(options)` - Format annotations with proper CAN formatting rules

**Types:**
- `CurtissAnnotationNomenclatureCode` - Union type of all 100 valid codes
- `CurtissAnnotationNomenclatureName` - Union type of all 100 valid names
- `CurtissAnnotationNomenclature` - Type for full annotation objects
- `CurtissAnnotationNomenclatureEmphasizerCode` - Union type of all 3 emphasizer codes
- `CurtissAnnotationNomenclatureEmphasizerName` - Union type of all 3 emphasizer names
- `CurtissAnnotationNomenclatureEmphasizer` - Type for full emphasizer objects
- `FormattedCANAnnotation` - Type for formatted annotation output

**Metadata & Constants:**
- `CURTISS_ANNOTATION_NOMENCLATURE_VERSION` - CAN system version (1.0.0)
- `CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER` - Usage disclaimer for UIs

### Features

- **Single Source of Truth Architecture** - All data derives from internal arrays automatically
- **Deep Immutability** - All exported structures are deeply frozen using `Object.freeze()`
- **Comprehensive Type Safety** - Full TypeScript support with strict typing
- **Multiple Access Patterns** - Use enums, objects, functions, or types - whatever fits your codebase
- **CAN Formatting Utilities** - `formatCANAnnotation()` provides structured output for both text and graphical rendering
- **Case-Sensitive Validation** - Ensures consistency across all usage
- **Zero Dependencies** - Lightweight package with no external dependencies
- **ES2020 Target** - Modern JavaScript with CommonJS module format
- **Proper NPM Exports** - Configured for optimal tree-shaking and module resolution

[1.0.0]: https://github.com/isaacwashere/curtiss-annotation-nomenclature/releases/tag/v1.0.0
