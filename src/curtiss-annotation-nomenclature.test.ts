/**
 * Curtiss Annotation Nomenclature - Comprehensive Test Suite
 *
 * This test suite ensures the integrity of all annotation data structures.
 * The CRITICAL TEST at the top enforces that exactly 100 annotations exist
 * across all exports (enum, objects, arrays, functions, types).
 *
 * If you add or remove annotations, this test will fail unless you update
 * the EXPECTED_COUNT. This is intentional - it prevents accidental changes
 * to the total annotation count.
 */

import { test } from "uvu";
import * as assert from "uvu/assert";
import {
  CurtissAnnotationNomenclatureCodeEnum,
  CurtissAnnotationNomenclatureCodeValue,
  CurtissAnnotationNomenclatureDescriptions,
  CurtissAnnotationNomenclatureCodes,
  CURTISS_ANNOTATION_NOMENCLATURE_CODES,
  getCurtissAnnotationNomenclatureCode,
  getAllCurtissAnnotationNomenclatureCodes,
  getCurtissAnnotationNomenclatureCodeByName,
  isValidCurtissAnnotationNomenclatureCode,
  CURTISS_ANNOTATION_NOMENCLATURE_VERSION,
  CurtissAnnotationNomenclatureEmphasizerEnum,
  CurtissAnnotationNomenclatureEmphasizerValue,
  CurtissAnnotationNomenclatureEmphasizerDescriptions,
  CurtissAnnotationNomenclatureEmphasizers,
  CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS,
  getCurtissAnnotationNomenclatureEmphasizerByCode,
  getAllCurtissAnnotationNomenclatureEmphasizers,
  getCurtissAnnotationNomenclatureEmphasizerByName,
  isValidCurtissAnnotationNomenclatureEmphasizerCode,
  CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO,
  CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER,
  formatCANAnnotation,
  CurtissAnnotationNomenclatureCode,
} from "./curtiss-annotation-nomenclature";

// ============================================================================
// CRITICAL TEST: Verify exactly 100 annotations exist across ALL data structures
//
// This test enforces that the package contains exactly 100 annotations.
// It validates:
//   - getAllCurtissAnnotationNomenclatureCodes() array length
//   - CURTISS_ANNOTATION_NOMENCLATURE_CODES array length
//   - CurtissAnnotationNomenclature enum (values and keys)
//   - CurtissAnnotationNomenclatureCodeValue object size
//   - CurtissAnnotationNomenclatureCodes object size
//   - CurtissAnnotationNomenclatureDescriptions object size
//   - No duplicate codes or names
//   - All data structures contain identical code sets
//
// ============================================================================
test("CRITICAL: Exactly 100 annotations exist across all data structures", () => {
  const EXPECTED_COUNT = 100;

  // Test 1: getAllCurtissAnnotationNomenclatureCodes() returns exactly 100 items
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();
  assert.equal(
    allAnnotations.length,
    EXPECTED_COUNT,
    `getAllCurtissAnnotationNomenclatureCodes() must return exactly ${EXPECTED_COUNT} annotations`
  );

  // Test 2: CURTISS_ANNOTATION_NOMENCLATURE_CODES array has exactly 100 items
  assert.equal(
    CURTISS_ANNOTATION_NOMENCLATURE_CODES.length,
    EXPECTED_COUNT,
    `CURTISS_ANNOTATION_NOMENCLATURE_CODES must have exactly ${EXPECTED_COUNT} codes`
  );

  // Test 3: TypeScript enum has exactly 100 unique values
  const enumValues = Object.values(CurtissAnnotationNomenclatureCodeEnum);
  const uniqueEnumValues = [...new Set(enumValues)];
  assert.equal(
    uniqueEnumValues.length,
    EXPECTED_COUNT,
    `CurtissAnnotationNomenclature enum must have exactly ${EXPECTED_COUNT} unique values`
  );

  // Test 4: TypeScript enum has exactly 100 keys (excluding reverse mappings)
  const enumKeys = Object.keys(CurtissAnnotationNomenclatureCodeEnum).filter((key) =>
    isNaN(Number(key))
  );
  assert.equal(
    enumKeys.length,
    EXPECTED_COUNT,
    `CurtissAnnotationNomenclature enum must have exactly ${EXPECTED_COUNT} keys`
  );

  // Test 5: CurtissAnnotationNomenclatureCodeValue object has exactly 100 entries
  const enumObjectKeys = Object.keys(CurtissAnnotationNomenclatureCodeValue);
  assert.equal(
    enumObjectKeys.length,
    EXPECTED_COUNT,
    `CurtissAnnotationNomenclatureCodeValue must have exactly ${EXPECTED_COUNT} entries`
  );

  // Test 6: CurtissAnnotationNomenclatureCodes object has exactly 100 entries
  const codesObjectKeys = Object.keys(CurtissAnnotationNomenclatureCodes);
  assert.equal(
    codesObjectKeys.length,
    EXPECTED_COUNT,
    `CurtissAnnotationNomenclatureCodes must have exactly ${EXPECTED_COUNT} entries`
  );

  // Test 7: CurtissAnnotationNomenclatureDescriptions object has exactly 100 entries
  const descriptionsObjectKeys = Object.keys(
    CurtissAnnotationNomenclatureDescriptions
  );
  assert.equal(
    descriptionsObjectKeys.length,
    EXPECTED_COUNT,
    `CurtissAnnotationNomenclatureDescriptions must have exactly ${EXPECTED_COUNT} entries`
  );

  // Test 8: Verify all codes are unique (no duplicates)
  const codes = allAnnotations.map((a) => a.code);
  const uniqueCodes = new Set(codes);
  assert.equal(
    uniqueCodes.size,
    EXPECTED_COUNT,
    `All ${EXPECTED_COUNT} codes must be unique (no duplicates)`
  );

  // Test 9: Verify all names are unique (no duplicates)
  const names = allAnnotations.map((a) => a.name);
  const uniqueNames = new Set(names);
  assert.equal(
    uniqueNames.size,
    EXPECTED_COUNT,
    `All ${EXPECTED_COUNT} names must be unique (no duplicates)`
  );

  // Test 10: Cross-verify all data structures contain the same codes
  const codesFromArray = new Set(CURTISS_ANNOTATION_NOMENCLATURE_CODES);
  const codesFromAnnotations = new Set(allAnnotations.map((a) => a.code));
  const codesFromEnum = new Set(uniqueEnumValues);
  const codesFromCodesObject = new Set(
    Object.keys(CurtissAnnotationNomenclatureCodes)
  );
  const codesFromDescriptions = new Set(
    Object.keys(CurtissAnnotationNomenclatureDescriptions)
  );

  assert.equal(
    codesFromArray.size,
    EXPECTED_COUNT,
    "CURTISS_ANNOTATION_NOMENCLATURE_CODES must contain 100 unique codes"
  );
  assert.equal(
    codesFromAnnotations.size,
    EXPECTED_COUNT,
    "Annotations array must contain 100 unique codes"
  );
  assert.equal(
    codesFromEnum.size,
    EXPECTED_COUNT,
    "Enum must contain 100 unique codes"
  );
  assert.equal(
    codesFromCodesObject.size,
    EXPECTED_COUNT,
    "CurtissAnnotationNomenclatureCodes must contain 100 unique codes"
  );
  assert.equal(
    codesFromDescriptions.size,
    EXPECTED_COUNT,
    "CurtissAnnotationNomenclatureDescriptions must contain 100 unique codes"
  );

  // Verify all sets contain identical codes
  const allCodesMatch = [...codesFromArray].every((code) => {
    return (
      codesFromAnnotations.has(code) &&
      codesFromEnum.has(code as CurtissAnnotationNomenclatureCodeEnum) &&
      codesFromCodesObject.has(code) &&
      codesFromDescriptions.has(code)
    );
  });

  assert.ok(
    allCodesMatch,
    "All data structures must contain the exact same 100 codes"
  );
});

// ============================================================================
// Test 1: Verify all codes in CURTISS_ANNOTATIONS are represented in the enum
// ============================================================================
test("TypeScript enum contains all codes from CURTISS_ANNOTATIONS", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();
  const enumValues = Object.values(CurtissAnnotationNomenclatureCodeEnum);

  assert.equal(
    allAnnotations.length,
    enumValues.length,
    "Enum should have same number of entries as CURTISS_ANNOTATIONS"
  );

  // Check each annotation code exists in enum
  for (const annotation of allAnnotations) {
    const enumHasCode = enumValues.includes(
      annotation.code as CurtissAnnotationNomenclatureCodeEnum
    );
    assert.ok(
      enumHasCode,
      `Enum should contain code "${annotation.code}" for "${annotation.name}"`
    );
  }
});

// ============================================================================
// Test 2: Verify enum keys match annotation names exactly (case-sensitive)
// ============================================================================
test("Enum keys match annotation names exactly (case-sensitive)", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();
  const enumKeys = Object.keys(CurtissAnnotationNomenclatureCodeEnum).filter(
    (key) => isNaN(Number(key)) // Filter out reverse mapping keys in TypeScript enums
  );

  for (const annotation of allAnnotations) {
    assert.ok(
      enumKeys.includes(annotation.name),
      `Enum should have key "${annotation.name}" (case-sensitive)`
    );

    // Verify the value is correct
    assert.equal(
      CurtissAnnotationNomenclatureCodeEnum[
        annotation.name as keyof typeof CurtissAnnotationNomenclatureCodeEnum
      ],
      annotation.code,
      `Enum value for "${annotation.name}" should be "${annotation.code}"`
    );
  }
});

// ============================================================================
// Test 3: Verify CurtissAnnotationNomenclatureCodeValue object
// ============================================================================
test("CurtissAnnotationNomenclatureCodeValue contains all name->code mappings", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();

  // Check all names are present
  for (const annotation of allAnnotations) {
    assert.ok(
      annotation.name in CurtissAnnotationNomenclatureCodeValue,
      `CurtissAnnotationNomenclatureCodeValue should contain "${annotation.name}"`
    );

    // Verify the code is correct
    assert.equal(
      CurtissAnnotationNomenclatureCodeValue[
        annotation.name as keyof typeof CurtissAnnotationNomenclatureCodeValue
      ],
      annotation.code,
      `CurtissAnnotationNomenclatureCodeValue["${annotation.name}"] should equal "${annotation.code}"`
    );
  }
});

// ============================================================================
// Test 4: Verify CurtissAnnotationNomenclatureDescriptions
// ============================================================================
test("CurtissAnnotationNomenclatureDescriptions contains all code->description mappings", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();

  for (const annotation of allAnnotations) {
    assert.ok(
      annotation.code in CurtissAnnotationNomenclatureDescriptions,
      `CurtissAnnotationNomenclatureDescriptions should contain code "${annotation.code}"`
    );

    // Verify description is correct and exact (case-sensitive)
    assert.equal(
      CurtissAnnotationNomenclatureDescriptions[
        annotation.code as keyof typeof CurtissAnnotationNomenclatureDescriptions
      ],
      annotation.description,
      `Description for "${annotation.code}" should match exactly`
    );
  }
});

// ============================================================================
// Test 5: Verify CurtissAnnotationNomenclatureCodes
// ============================================================================
test("CurtissAnnotationNomenclatureCodes contains all code->name mappings", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();

  for (const annotation of allAnnotations) {
    assert.ok(
      annotation.code in CurtissAnnotationNomenclatureCodes,
      `CurtissAnnotationNomenclatureCodes should contain code "${annotation.code}"`
    );

    // Verify name is correct and exact (case-sensitive)
    assert.equal(
      CurtissAnnotationNomenclatureCodes[
        annotation.code as keyof typeof CurtissAnnotationNomenclatureCodes
      ],
      annotation.name,
      `Name for "${annotation.code}" should match exactly`
    );
  }
});

// ============================================================================
// Test 6: Verify CURTISS_ANNOTATION_NOMENCLATURE_CODES array
// ============================================================================
test("CURTISS_ANNOTATION_NOMENCLATURE_CODES contains all codes in correct order", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();

  assert.equal(
    CURTISS_ANNOTATION_NOMENCLATURE_CODES.length,
    allAnnotations.length,
    "CURTISS_ANNOTATION_NOMENCLATURE_CODES should have same length as CURTISS_ANNOTATIONS"
  );

  // Verify each code is present and in the same order
  for (let i = 0; i < allAnnotations.length; i++) {
    assert.equal(
      CURTISS_ANNOTATION_NOMENCLATURE_CODES[i],
      allAnnotations[i].code,
      `Code at index ${i} should be "${allAnnotations[i].code}"`
    );
  }
});

// ============================================================================
// Test 7: Verify no duplicate codes
// ============================================================================
test("No duplicate codes in CURTISS_ANNOTATIONS", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();
  const codes = allAnnotations.map((a) => a.code);
  const uniqueCodes = new Set(codes);

  assert.equal(
    codes.length,
    uniqueCodes.size,
    "All codes should be unique (no duplicates)"
  );
});

// ============================================================================
// Test 8: Verify no duplicate names
// ============================================================================
test("No duplicate names in CURTISS_ANNOTATIONS", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();
  const names = allAnnotations.map((a) => a.name);
  const uniqueNames = new Set(names);

  assert.equal(
    names.length,
    uniqueNames.size,
    "All names should be unique (no duplicates)"
  );
});

// ============================================================================
// Test 9: Verify getCurtissAnnotationNomenclatureCode function
// ============================================================================
test("getCurtissAnnotationNomenclatureCode returns correct annotation by code", () => {
  // Test with known codes
  const surprisingAnnotation = getCurtissAnnotationNomenclatureCode("!");
  assert.ok(surprisingAnnotation, "Should find annotation with code '!'");
  assert.equal(surprisingAnnotation?.code, "!");
  assert.equal(surprisingAnnotation?.name, "Surprising");
  assert.equal(surprisingAnnotation?.description, "Surprising or unexpected");

  const agreeAnnotation = getCurtissAnnotationNomenclatureCode("AG");
  assert.ok(agreeAnnotation, "Should find annotation with code 'AG'");
  assert.equal(agreeAnnotation?.code, "AG");
  assert.equal(agreeAnnotation?.name, "Agree");

  // Test with non-existent code
  const nonExistent = getCurtissAnnotationNomenclatureCode("INVALID");
  assert.equal(
    nonExistent,
    undefined,
    "Should return undefined for invalid code"
  );
});

// ============================================================================
// Test 10: Verify getCurtissAnnotationNomenclatureCodeByName function
// ============================================================================
test("getCurtissAnnotationNomenclatureCodeByName returns correct annotation (case-sensitive)", () => {
  // Test with known names
  const surprisingAnnotation = getCurtissAnnotationNomenclatureCodeByName("Surprising");
  assert.ok(
    surprisingAnnotation,
    "Should find annotation with name 'Surprising'"
  );
  assert.equal(surprisingAnnotation?.name, "Surprising");
  assert.equal(surprisingAnnotation?.code, "!");

  const agreeAnnotation = getCurtissAnnotationNomenclatureCodeByName("Agree");
  assert.ok(agreeAnnotation, "Should find annotation with name 'Agree'");
  assert.equal(agreeAnnotation?.name, "Agree");
  assert.equal(agreeAnnotation?.code, "AG");

  // Test case sensitivity
  const wrongCase = getCurtissAnnotationNomenclatureCodeByName("surprising");
  assert.equal(
    wrongCase,
    undefined,
    "Should be case-sensitive (lowercase should fail)"
  );

  const wrongCase2 = getCurtissAnnotationNomenclatureCodeByName("SURPRISING");
  assert.equal(
    wrongCase2,
    undefined,
    "Should be case-sensitive (uppercase should fail)"
  );

  // Test with non-existent name
  const nonExistent = getCurtissAnnotationNomenclatureCodeByName("InvalidName");
  assert.equal(
    nonExistent,
    undefined,
    "Should return undefined for invalid name"
  );
});

// ============================================================================
// Test 11: Verify getCurtissAnnotationNomenclatureCode function (lookup by code)
// ============================================================================
test("getCurtissAnnotationNomenclatureCode returns correct annotation by code (case-sensitive)", () => {
  // Test with known codes
  const surprisingAnnotation = getCurtissAnnotationNomenclatureCode("!");
  assert.ok(surprisingAnnotation, "Should find annotation with code '!'");
  assert.equal(surprisingAnnotation?.code, "!");
  assert.equal(surprisingAnnotation?.name, "Surprising");

  const agAnnotation = getCurtissAnnotationNomenclatureCode("AG");
  assert.ok(agAnnotation, "Should find annotation with code 'AG'");
  assert.equal(agAnnotation?.code, "AG");
  assert.equal(agAnnotation?.name, "Agree");

  // Test case sensitivity for codes
  const wrongCase = getCurtissAnnotationNomenclatureCode("ag");
  assert.equal(
    wrongCase,
    undefined,
    "Should be case-sensitive (lowercase should fail)"
  );

  // Test with non-existent code
  const nonExistent = getCurtissAnnotationNomenclatureCode("ZZZ");
  assert.equal(
    nonExistent,
    undefined,
    "Should return undefined for invalid code"
  );
});

// ============================================================================
// Test 12: Verify getAllCurtissAnnotationNomenclatureCodes returns consistent data
// ============================================================================
test("getAllCurtissAnnotationNomenclatureCodes returns consistent data", () => {
  const annotations1 = getAllCurtissAnnotationNomenclatureCodes();
  const annotations2 = getAllCurtissAnnotationNomenclatureCodes();

  // Should have same content
  assert.equal(
    annotations1.length,
    annotations2.length,
    "Both calls should return same length"
  );

  // Verify content is identical
  for (let i = 0; i < annotations1.length; i++) {
    assert.equal(
      annotations1[i].code,
      annotations2[i].code,
      "Codes should match"
    );
    assert.equal(
      annotations1[i].name,
      annotations2[i].name,
      "Names should match"
    );
  }
});

// ============================================================================
// Test 13: Verify isValidCurtissAnnotationNomenclatureCode function
// ============================================================================
test("isValidCurtissAnnotationNomenclatureCode validates codes correctly", () => {
  // Test valid codes
  assert.ok(isValidCurtissAnnotationNomenclatureCode("!"), "Should validate '!'");
  assert.ok(isValidCurtissAnnotationNomenclatureCode("AG"), "Should validate 'AG'");
  assert.ok(isValidCurtissAnnotationNomenclatureCode("X"), "Should validate 'X'");

  // Test invalid codes
  assert.not.ok(
    isValidCurtissAnnotationNomenclatureCode("INVALID"),
    "Should not validate 'INVALID'"
  );
  assert.not.ok(
    isValidCurtissAnnotationNomenclatureCode("ag"),
    "Should not validate lowercase 'ag'"
  );
  assert.not.ok(
    isValidCurtissAnnotationNomenclatureCode(""),
    "Should not validate empty string"
  );

  // Test all valid codes
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();
  for (const annotation of allAnnotations) {
    assert.ok(
      isValidCurtissAnnotationNomenclatureCode(annotation.code),
      `Should validate code "${annotation.code}"`
    );
  }
});

// ============================================================================
// Test 14: Verify all annotations have required properties
// ============================================================================
test("All annotations have required properties (code, name, description)", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();

  for (const annotation of allAnnotations) {
    assert.ok(annotation.code, `Annotation should have a code`);
    assert.ok(annotation.name, `Annotation should have a name`);
    assert.ok(annotation.description, `Annotation should have a description`);

    // Check types
    assert.type(annotation.code, "string", "Code should be a string");
    assert.type(annotation.name, "string", "Name should be a string");
    assert.type(
      annotation.description,
      "string",
      "Description should be a string"
    );

    // Check not empty
    assert.ok(
      annotation.code.length > 0,
      `Code should not be empty for "${annotation.name}"`
    );
    assert.ok(
      annotation.name.length > 0,
      `Name should not be empty for code "${annotation.code}"`
    );
    assert.ok(
      annotation.description.length > 0,
      `Description should not be empty for "${annotation.name}"`
    );
  }
});

// ============================================================================
// Test 15: Verify version constant
// ============================================================================
test("Version constant is defined and follows semantic versioning", () => {
  assert.ok(
    CURTISS_ANNOTATION_NOMENCLATURE_VERSION,
    "Version should be defined"
  );
  assert.type(
    CURTISS_ANNOTATION_NOMENCLATURE_VERSION,
    "string",
    "Version should be a string"
  );

  // Check it matches semantic versioning pattern (e.g., "1.0.0")
  const semverPattern = /^\d+\.\d+\.\d+$/;
  assert.ok(
    semverPattern.test(CURTISS_ANNOTATION_NOMENCLATURE_VERSION),
    `Version "${CURTISS_ANNOTATION_NOMENCLATURE_VERSION}" should follow semantic versioning (e.g., 1.0.0)`
  );
});

// ============================================================================
// Test 16: Comprehensive cross-validation between all exports
// ============================================================================
test("All exports are in sync with CURTISS_ANNOTATIONS", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();

  for (const annotation of allAnnotations) {
    const { code, name, description } = annotation;

    // Check enum
    assert.equal(
      CurtissAnnotationNomenclatureCodeEnum[
        name as keyof typeof CurtissAnnotationNomenclatureCodeEnum
      ],
      code,
      `Enum: ${name} -> ${code}`
    );

    // Check enum object
    assert.equal(
      CurtissAnnotationNomenclatureCodeValue[
        name as keyof typeof CurtissAnnotationNomenclatureCodeValue
      ],
      code,
      `EnumObject: ${name} -> ${code}`
    );

    // Check descriptions
    assert.equal(
      CurtissAnnotationNomenclatureDescriptions[
        code as keyof typeof CurtissAnnotationNomenclatureDescriptions
      ],
      description,
      `Descriptions: ${code} -> ${description}`
    );

    // Check codes object
    assert.equal(
      CurtissAnnotationNomenclatureCodes[
        code as keyof typeof CurtissAnnotationNomenclatureCodes
      ],
      name,
      `Codes: ${code} -> ${name}`
    );

    // Check codes array
    assert.ok(
      CURTISS_ANNOTATION_NOMENCLATURE_CODES.includes(code),
      `CURTISS_ANNOTATION_NOMENCLATURE_CODES should include "${code}"`
    );

    // Check utility functions
    assert.equal(
      getCurtissAnnotationNomenclatureCode(code)?.code,
      code,
      `getCurtissAnnotationNomenclatureCode("${code}") should return annotation with code "${code}"`
    );
    assert.equal(
      getCurtissAnnotationNomenclatureCodeByName(name)?.name,
      name,
      `getCurtissAnnotationNomenclatureCodeByName("${name}") should return annotation with name "${name}"`
    );
    assert.equal(
      getCurtissAnnotationNomenclatureCode(code)?.code,
      code,
      `getCurtissAnnotationNomenclatureCode("${code}") should return annotation with code "${code}"`
    );
    assert.ok(
      isValidCurtissAnnotationNomenclatureCode(code),
      `isValidCurtissAnnotationNomenclatureCode("${code}") should return true`
    );
  }
});

// ============================================================================
// Test 17: Verify specific known annotations (sanity check)
// ============================================================================
test("Specific well-known annotations are present and correct", () => {
  // Test a selection of annotations to ensure they're correct
  const testCases = [
    {
      code: "!",
      name: "Surprising",
      descriptionSnippet: "Surprising or unexpected",
    },
    { code: "?", name: "Question", descriptionSnippet: "Question validity" },
    { code: "A", name: "Analogy", descriptionSnippet: "analogy" },
    { code: "AG", name: "Agree", descriptionSnippet: "Agree with this" },
    { code: "C", name: "Claim", descriptionSnippet: "Claim or argument" },
    { code: "X", name: "Disagree", descriptionSnippet: "Disagree with this" },
  ];

  for (const testCase of testCases) {
    const annotation = getCurtissAnnotationNomenclatureCode(testCase.code);
    assert.ok(annotation, `Should find annotation for code "${testCase.code}"`);
    assert.equal(
      annotation?.name,
      testCase.name,
      `Name should match for code "${testCase.code}"`
    );
    assert.ok(
      annotation?.description.includes(testCase.descriptionSnippet),
      `Description for "${testCase.code}" should contain "${testCase.descriptionSnippet}"`
    );
  }
});

// ============================================================================
// Test 18: Verify no leading/trailing whitespace in codes, names, descriptions
// ============================================================================
test("No leading or trailing whitespace in codes, names, or descriptions", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();

  for (const annotation of allAnnotations) {
    assert.equal(
      annotation.code.trim(),
      annotation.code,
      `Code "${annotation.code}" should not have leading/trailing whitespace`
    );
    assert.equal(
      annotation.name.trim(),
      annotation.name,
      `Name "${annotation.name}" should not have leading/trailing whitespace`
    );
    assert.equal(
      annotation.description.trim(),
      annotation.description,
      `Description for "${annotation.name}" should not have leading/trailing whitespace`
    );
  }
});

// ============================================================================
// Test 19: Verify consistent count across all structures
// ============================================================================
test("All data structures have the same count of annotations", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();
  const expectedCount = allAnnotations.length;

  // Count enum values (filter out reverse mappings)
  const enumCount = Object.keys(CurtissAnnotationNomenclatureCodeEnum).filter((key) =>
    isNaN(Number(key))
  ).length;
  assert.equal(enumCount, expectedCount, "Enum should have correct count");

  // Count enum object
  const enumObjectCount = Object.keys(CurtissAnnotationNomenclatureCodeValue).length;
  assert.equal(
    enumObjectCount,
    expectedCount,
    "Enum object should have correct count"
  );

  // Count descriptions
  const descriptionsCount = Object.keys(
    CurtissAnnotationNomenclatureDescriptions
  ).length;
  assert.equal(
    descriptionsCount,
    expectedCount,
    "Descriptions object should have correct count"
  );

  // Count codes object
  const codesObjectCount = Object.keys(
    CurtissAnnotationNomenclatureCodes
  ).length;
  assert.equal(
    codesObjectCount,
    expectedCount,
    "Codes object should have correct count"
  );

  // Count codes array
  assert.equal(
    CURTISS_ANNOTATION_NOMENCLATURE_CODES.length,
    expectedCount,
    "Codes array should have correct count"
  );
});

// ============================================================================
// Test 20: Verify TypeScript readonly types are enforced
// ============================================================================
test("Exported arrays maintain consistent length", () => {
  // Verify the exported array has the expected length
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();

  assert.equal(
    CURTISS_ANNOTATION_NOMENCLATURE_CODES.length,
    allAnnotations.length,
    "CURTISS_ANNOTATION_NOMENCLATURE_CODES should have correct length"
  );

  // Verify codes array contents match
  for (let i = 0; i < allAnnotations.length; i++) {
    assert.equal(
      CURTISS_ANNOTATION_NOMENCLATURE_CODES[i],
      allAnnotations[i].code,
      `Code at index ${i} should match`
    );
  }
});

// ============================================================================
// EMPHASIZER TESTS - Comprehensive test suite for the emphasizer feature
// ============================================================================

// ============================================================================
// Test 21: Verify exactly 3 emphasizers exist across all data structures
// ============================================================================
test("Exactly 3 emphasizers exist across all data structures", () => {
  const EXPECTED_COUNT = 3;

  // Test 1: getAllCurtissAnnotationNomenclatureEmphasizers() returns exactly 3 items
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();
  assert.equal(
    allEmphasizers.length,
    EXPECTED_COUNT,
    `getAllCurtissAnnotationNomenclatureEmphasizers() must return exactly ${EXPECTED_COUNT} emphasizers`
  );

  // Test 2: CURTISS_EMPHASIZER_CODES array has exactly 3 items
  assert.equal(
    CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS.length,
    EXPECTED_COUNT,
    `CURTISS_EMPHASIZER_CODES must have exactly ${EXPECTED_COUNT} codes`
  );

  // Test 3: TypeScript enum has exactly 3 unique values
  const enumValues = Object.values(CurtissAnnotationNomenclatureEmphasizerValue);
  const uniqueEnumValues = [...new Set(enumValues)];
  assert.equal(
    uniqueEnumValues.length,
    EXPECTED_COUNT,
    `CurtissAnnotationNomenclatureEmphasizerValue enum must have exactly ${EXPECTED_COUNT} unique values`
  );

  // Test 4: CurtissAnnotationNomenclatureEmphasizerValue object has exactly 3 entries
  const enumObjectKeys = Object.keys(CurtissAnnotationNomenclatureEmphasizerValue);
  assert.equal(
    enumObjectKeys.length,
    EXPECTED_COUNT,
    `CurtissAnnotationNomenclatureEmphasizerValue must have exactly ${EXPECTED_COUNT} entries`
  );

  // Test 5: CurtissAnnotationNomenclatureEmphasizers object has exactly 3 entries
  const codesObjectKeys = Object.keys(CurtissAnnotationNomenclatureEmphasizers);
  assert.equal(
    codesObjectKeys.length,
    EXPECTED_COUNT,
    `CurtissAnnotationNomenclatureEmphasizers must have exactly ${EXPECTED_COUNT} entries`
  );

  // Test 6: CurtissAnnotationNomenclatureEmphasizerDescriptions object has exactly 3 entries
  const descriptionsObjectKeys = Object.keys(
    CurtissAnnotationNomenclatureEmphasizerDescriptions
  );
  assert.equal(
    descriptionsObjectKeys.length,
    EXPECTED_COUNT,
    `CurtissAnnotationNomenclatureEmphasizerDescriptions must have exactly ${EXPECTED_COUNT} entries`
  );

  // Test 7: Verify all codes are unique (no duplicates)
  const codes = allEmphasizers.map((e) => e.code);
  const uniqueCodes = new Set(codes);
  assert.equal(
    uniqueCodes.size,
    EXPECTED_COUNT,
    `All ${EXPECTED_COUNT} emphasizer codes must be unique (no duplicates)`
  );

  // Test 8: Verify all names are unique (no duplicates)
  const names = allEmphasizers.map((e) => e.name);
  const uniqueNames = new Set(names);
  assert.equal(
    uniqueNames.size,
    EXPECTED_COUNT,
    `All ${EXPECTED_COUNT} emphasizer names must be unique (no duplicates)`
  );
});

// ============================================================================
// Test 22: Verify TypeScript enum contains all emphasizer codes
// ============================================================================
test("TypeScript enum contains all codes from CURTISS_EMPHASIZERS", () => {
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();
  const enumValues = Object.values(CurtissAnnotationNomenclatureEmphasizerValue);

  assert.equal(
    allEmphasizers.length,
    enumValues.length,
    "CAN Emphasizer enum should have same number of entries as CURTISS_EMPHASIZERS"
  );

  // Check each emphasizer code exists in enum
  for (const emphasizer of allEmphasizers) {
    const enumHasCode = enumValues.includes(
      emphasizer.code as CurtissAnnotationNomenclatureEmphasizerEnum
    );
    assert.ok(
      enumHasCode,
      `Enum should contain code "${emphasizer.code}" for "${emphasizer.name}"`
    );
  }
});

// ============================================================================
// Test 23: Verify emphasizer enum keys match names exactly
// ============================================================================
test("CAN Emphasizer enum keys match CAN Emphasizer names exactly (case-sensitive)", () => {
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();
  const enumKeys = Object.keys(CurtissAnnotationNomenclatureEmphasizerValue).filter(
    (key) => isNaN(Number(key))
  );

  for (const emphasizer of allEmphasizers) {
    assert.ok(
      enumKeys.includes(emphasizer.name),
      `Enum should have key "${emphasizer.name}" (case-sensitive)`
    );

    // Verify the value is correct
    assert.equal(
      CurtissAnnotationNomenclatureEmphasizerValue[
        emphasizer.name as keyof typeof CurtissAnnotationNomenclatureEmphasizerValue
      ],
      emphasizer.code,
      `Enum value for "${emphasizer.name}" should be "${emphasizer.code}"`
    );
  }
});

// ============================================================================
// Test 24: Verify CurtissAnnotationNomenclatureEmphasizerValue object
// ============================================================================
test("CurtissAnnotationNomenclatureEmphasizerValue contains all name->code mappings", () => {
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();

  for (const emphasizer of allEmphasizers) {
    assert.ok(
      emphasizer.name in CurtissAnnotationNomenclatureEmphasizerValue,
      `CurtissAnnotationNomenclatureEmphasizerValue should contain "${emphasizer.name}"`
    );

    assert.equal(
      CurtissAnnotationNomenclatureEmphasizerValue[
        emphasizer.name as keyof typeof CurtissAnnotationNomenclatureEmphasizerValue
      ],
      emphasizer.code,
      `CurtissAnnotationNomenclatureEmphasizerValue["${emphasizer.name}"] should equal "${emphasizer.code}"`
    );
  }
});

// ============================================================================
// Test 25: Verify CurtissAnnotationNomenclatureEmphasizerDescriptions
// ============================================================================
test("CurtissAnnotationNomenclatureEmphasizerDescriptions contains all code->description mappings", () => {
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();

  for (const emphasizer of allEmphasizers) {
    assert.ok(
      emphasizer.code in CurtissAnnotationNomenclatureEmphasizerDescriptions,
      `CurtissAnnotationNomenclatureEmphasizerDescriptions should contain code "${emphasizer.code}"`
    );

    assert.equal(
      CurtissAnnotationNomenclatureEmphasizerDescriptions[
        emphasizer.code as keyof typeof CurtissAnnotationNomenclatureEmphasizerDescriptions
      ],
      emphasizer.description,
      `Description for "${emphasizer.code}" should match exactly`
    );
  }
});

// ============================================================================
// Test 26: Verify CurtissAnnotationNomenclatureEmphasizers
// ============================================================================
test("CurtissAnnotationNomenclatureEmphasizers contains all code->name mappings", () => {
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();

  for (const emphasizer of allEmphasizers) {
    assert.ok(
      emphasizer.code in CurtissAnnotationNomenclatureEmphasizers,
      `CurtissAnnotationNomenclatureEmphasizers should contain code "${emphasizer.code}"`
    );

    assert.equal(
      CurtissAnnotationNomenclatureEmphasizers[
        emphasizer.code as keyof typeof CurtissAnnotationNomenclatureEmphasizers
      ],
      emphasizer.name,
      `Name for "${emphasizer.code}" should match exactly`
    );
  }
});

// ============================================================================
// Test 27: Verify CURTISS_EMPHASIZER_CODES array
// ============================================================================
test("CURTISS_EMPHASIZER_CODES contains all codes in correct order", () => {
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();

  assert.equal(
    CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS.length,
    allEmphasizers.length,
    "CURTISS_EMPHASIZER_CODES should have same length as CURTISS_EMPHASIZERS"
  );

  for (let i = 0; i < allEmphasizers.length; i++) {
    assert.equal(
      CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS[i],
      allEmphasizers[i].code,
      `Code at index ${i} should be "${allEmphasizers[i].code}"`
    );
  }
});

// ============================================================================
// Test 28: Verify getCurtissAnnotationNomenclatureEmphasizerByCode function
// ============================================================================
test("getCurtissAnnotationNomenclatureEmphasizerByCode returns correct emphasizer by code", () => {
  // Test with known codes
  const strongLike = getCurtissAnnotationNomenclatureEmphasizerByCode("+");
  assert.ok(strongLike, "Should find emphasizer with code '+'");
  assert.equal(strongLike?.code, "+");
  assert.equal(strongLike?.name, "StrongLike");
  assert.equal(strongLike?.description, "I really like this");

  const strongDislike = getCurtissAnnotationNomenclatureEmphasizerByCode("-");
  assert.ok(strongDislike, "Should find emphasizer with code '-'");
  assert.equal(strongDislike?.code, "-");
  assert.equal(strongDislike?.name, "StrongDislike");

  const critical = getCurtissAnnotationNomenclatureEmphasizerByCode("*");
  assert.ok(critical, "Should find emphasizer with code '*'");
  assert.equal(critical?.code, "*");
  assert.equal(critical?.name, "Critical");

  // Test with non-existent code
  const nonExistent = getCurtissAnnotationNomenclatureEmphasizerByCode("INVALID");
  assert.equal(
    nonExistent,
    undefined,
    "Should return undefined for invalid code"
  );
});

// ============================================================================
// Test 29: Verify getCurtissAnnotationNomenclatureEmphasizerByName function
// ============================================================================
test("getCurtissAnnotationNomenclatureEmphasizerByName returns correct emphasizer (case-sensitive)", () => {
  // Test with known names
  const strongLike = getCurtissAnnotationNomenclatureEmphasizerByName("StrongLike");
  assert.ok(strongLike, "Should find emphasizer with name 'StrongLike'");
  assert.equal(strongLike?.name, "StrongLike");
  assert.equal(strongLike?.code, "+");

  const strongDislike = getCurtissAnnotationNomenclatureEmphasizerByName("StrongDislike");
  assert.ok(strongDislike, "Should find emphasizer with name 'StrongDislike'");
  assert.equal(strongDislike?.name, "StrongDislike");
  assert.equal(strongDislike?.code, "-");

  // Test case sensitivity
  const wrongCase = getCurtissAnnotationNomenclatureEmphasizerByName("stronglike");
  assert.equal(
    wrongCase,
    undefined,
    "Should be case-sensitive (lowercase should fail)"
  );

  // Test with non-existent name
  const nonExistent = getCurtissAnnotationNomenclatureEmphasizerByName("InvalidName");
  assert.equal(
    nonExistent,
    undefined,
    "Should return undefined for invalid name"
  );
});

// ============================================================================
// Test 30: Verify isValidCurtissAnnotationNomenclatureEmphasizerCode function
// ============================================================================
test("isValidCurtissAnnotationNomenclatureEmphasizerCode validates codes correctly", () => {
  // Test valid codes
  assert.ok(isValidCurtissAnnotationNomenclatureEmphasizerCode("+"), "Should validate '+'");
  assert.ok(isValidCurtissAnnotationNomenclatureEmphasizerCode("-"), "Should validate '-'");
  assert.ok(isValidCurtissAnnotationNomenclatureEmphasizerCode("*"), "Should validate '*'");

  // Test invalid codes
  assert.not.ok(
    isValidCurtissAnnotationNomenclatureEmphasizerCode("INVALID"),
    "Should not validate 'INVALID'"
  );
  assert.not.ok(
    isValidCurtissAnnotationNomenclatureEmphasizerCode("!"),
    "Should not validate '!' (annotation code, not emphasizer)"
  );
  assert.not.ok(
    isValidCurtissAnnotationNomenclatureEmphasizerCode(""),
    "Should not validate empty string"
  );

  // Test all valid codes
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();
  for (const emphasizer of allEmphasizers) {
    assert.ok(
      isValidCurtissAnnotationNomenclatureEmphasizerCode(emphasizer.code),
      `Should validate code "${emphasizer.code}"`
    );
  }
});

// ============================================================================
// Test 31: Verify all emphasizers have required properties
// ============================================================================
test("All emphasizers have required properties (code, name, description)", () => {
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();

  for (const emphasizer of allEmphasizers) {
    assert.ok(emphasizer.code, `CAN Emphasizer should have a code`);
    assert.ok(emphasizer.name, `CAN Emphasizer should have a name`);
    assert.ok(
      emphasizer.description,
      `CAN Emphasizer should have a description`
    );

    // Check types
    assert.type(emphasizer.code, "string", "Code should be a string");
    assert.type(emphasizer.name, "string", "Name should be a string");
    assert.type(
      emphasizer.description,
      "string",
      "Description should be a string"
    );

    // Check not empty
    assert.ok(
      emphasizer.code.length > 0,
      `Code should not be empty for "${emphasizer.name}"`
    );
    assert.ok(
      emphasizer.name.length > 0,
      `Name should not be empty for code "${emphasizer.code}"`
    );
    assert.ok(
      emphasizer.description.length > 0,
      `Description should not be empty for "${emphasizer.name}"`
    );
  }
});

// ============================================================================
// Test 32: Verify specific known emphasizers
// ============================================================================
test("Specific well-known emphasizers are present and correct", () => {
  const testCases = [
    {
      code: "+",
      name: "StrongLike",
      description: "I really like this",
    },
    {
      code: "-",
      name: "StrongDislike",
      description: "I really don't like this",
    },
    {
      code: "*",
      name: "Critical",
      description: "This is really important",
    },
  ];

  for (const testCase of testCases) {
    const emphasizer = getCurtissAnnotationNomenclatureEmphasizerByCode(testCase.code);
    assert.ok(emphasizer, `Should find emphasizer for code "${testCase.code}"`);
    assert.equal(
      emphasizer?.name,
      testCase.name,
      `Name should match for code "${testCase.code}"`
    );
    assert.equal(
      emphasizer?.description,
      testCase.description,
      `Description should match for code "${testCase.code}"`
    );
  }
});

// ============================================================================
// Test 33: Verify no overlap between annotation and emphasizer codes
// ============================================================================
test("No code overlap between annotations and emphasizers", () => {
  const annotationCodes = new Set<string>(CURTISS_ANNOTATION_NOMENCLATURE_CODES);
  const emphasizerCodes = new Set<string>(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS);

  for (const emphasizerCode of emphasizerCodes) {
    assert.not.ok(
      annotationCodes.has(emphasizerCode),
      `CAN Emphasizer code "${emphasizerCode}" should not exist in annotation codes`
    );
  }
});

// ============================================================================
// Test 34: Verify EMPHASIZER_INFO constant exists and is complete
// ============================================================================
test("EMPHASIZER_INFO constant exists with all required fields", () => {
  assert.ok(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO, "EMPHASIZER_INFO should be defined");
  assert.ok(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.purpose, "EMPHASIZER_INFO.purpose should exist");
  assert.ok(
    CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.recommendation,
    "EMPHASIZER_INFO.recommendation should exist"
  );
  assert.ok(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.note, "EMPHASIZER_INFO.note should exist");

  // Verify types
  assert.type(
    CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.purpose,
    "string",
    "purpose should be a string"
  );
  assert.type(
    CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.recommendation,
    "string",
    "recommendation should be a string"
  );
  assert.type(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.note, "string", "note should be a string");

  // Verify not empty
  assert.ok(
    CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.purpose.length > 0,
    "purpose should not be empty"
  );
  assert.ok(
    CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.recommendation.length > 0,
    "recommendation should not be empty"
  );
  assert.ok(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.note.length > 0, "note should not be empty");
});

// ============================================================================
// Test 35: Verify getAllCurtissAnnotationNomenclatureEmphasizers returns consistent data
// ============================================================================
test("getAllCurtissAnnotationNomenclatureEmphasizers returns consistent data", () => {
  const emphasizers1 = getAllCurtissAnnotationNomenclatureEmphasizers();
  const emphasizers2 = getAllCurtissAnnotationNomenclatureEmphasizers();

  assert.equal(
    emphasizers1.length,
    emphasizers2.length,
    "Both calls should return same length"
  );

  for (let i = 0; i < emphasizers1.length; i++) {
    assert.equal(
      emphasizers1[i].code,
      emphasizers2[i].code,
      "Codes should match"
    );
    assert.equal(
      emphasizers1[i].name,
      emphasizers2[i].name,
      "Names should match"
    );
  }
});

// ============================================================================
// IMMUTABILITY TESTS - Verify all structures are frozen
// ============================================================================

test("Immutability: CurtissAnnotationNomenclatureCodeValue is frozen", () => {
  assert.ok(Object.isFrozen(CurtissAnnotationNomenclatureCodeValue), "Enum should be frozen");
  
  // Attempt to modify should fail silently or throw in strict mode
  const originalValue = CurtissAnnotationNomenclatureCodeValue.Surprising;
  try {
    (CurtissAnnotationNomenclatureCodeValue as any).Surprising = "HACKED";
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(CurtissAnnotationNomenclatureCodeValue.Surprising, originalValue, "Value should remain unchanged");
  
  // Attempt to add property should fail
  try {
    (CurtissAnnotationNomenclatureCodeValue as any).NewProperty = "NEW";
  } catch (e) {
    // Expected in strict mode
  }
  assert.is((CurtissAnnotationNomenclatureCodeValue as any).NewProperty, undefined, "New property should not be added");
});

test("Immutability: CURTISS_ANNOTATION_NOMENCLATURE_CODES array is frozen", () => {
  assert.ok(Object.isFrozen(CURTISS_ANNOTATION_NOMENCLATURE_CODES), "Array should be frozen");
  
  const originalLength = CURTISS_ANNOTATION_NOMENCLATURE_CODES.length;
  const originalFirstElement = CURTISS_ANNOTATION_NOMENCLATURE_CODES[0];
  
  // Attempt to modify element
  try {
    (CURTISS_ANNOTATION_NOMENCLATURE_CODES as any)[0] = "HACKED";
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(CURTISS_ANNOTATION_NOMENCLATURE_CODES[0], originalFirstElement, "Element should remain unchanged");
  
  // Attempt to push
  try {
    (CURTISS_ANNOTATION_NOMENCLATURE_CODES as any).push("NEW");
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(CURTISS_ANNOTATION_NOMENCLATURE_CODES.length, originalLength, "Array length should remain unchanged");
  
  // Attempt to pop
  try {
    (CURTISS_ANNOTATION_NOMENCLATURE_CODES as any).pop();
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(CURTISS_ANNOTATION_NOMENCLATURE_CODES.length, originalLength, "Array length should remain unchanged after pop");
});

test("Immutability: CurtissAnnotationNomenclatureCodes is frozen", () => {
  assert.ok(Object.isFrozen(CurtissAnnotationNomenclatureCodes), "Codes object should be frozen");
  
  const originalValue = CurtissAnnotationNomenclatureCodes["!"];
  
  // Attempt to modify
  try {
    (CurtissAnnotationNomenclatureCodes as any)["!"] = "HACKED";
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(CurtissAnnotationNomenclatureCodes["!"], originalValue, "Value should remain unchanged");
  
  // Attempt to add new property
  try {
    (CurtissAnnotationNomenclatureCodes as any)["NEW"] = "NewCode";
  } catch (e) {
    // Expected in strict mode
  }
  assert.is((CurtissAnnotationNomenclatureCodes as any)["NEW"], undefined, "New property should not be added");
});

test("Immutability: CurtissAnnotationNomenclatureDescriptions is frozen", () => {
  assert.ok(Object.isFrozen(CurtissAnnotationNomenclatureDescriptions), "Descriptions object should be frozen");
  
  const originalValue = CurtissAnnotationNomenclatureDescriptions["!"];
  
  // Attempt to modify
  try {
    (CurtissAnnotationNomenclatureDescriptions as any)["!"] = "HACKED";
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(CurtissAnnotationNomenclatureDescriptions["!"], originalValue, "Description should remain unchanged");
});

test("Immutability: getAllCurtissAnnotationNomenclatureCodes() returns frozen array", () => {
  const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();
  assert.ok(Object.isFrozen(allAnnotations), "Returned array should be frozen");
  
  const originalLength = allAnnotations.length;
  
  // Attempt to modify array
  try {
    (allAnnotations as any).push({ code: "X", name: "Bad", description: "Evil" });
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(allAnnotations.length, originalLength, "Array length should remain unchanged");
});

test("Immutability: Annotation objects are deeply frozen", () => {
  const annotation = getCurtissAnnotationNomenclatureCode("!");
  assert.ok(annotation, "Annotation should exist");
  assert.ok(Object.isFrozen(annotation), "Annotation object should be frozen");
  
  const originalCode = annotation!.code;
  const originalName = annotation!.name;
  
  // Attempt to modify properties
  try {
    (annotation as any).code = "HACKED";
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(annotation!.code, originalCode, "Code should remain unchanged");
  
  try {
    (annotation as any).name = "HACKED";
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(annotation!.name, originalName, "Name should remain unchanged");
});

test("Immutability: CAN Emphasizer structures are frozen", () => {
  // Test enum
  assert.ok(Object.isFrozen(CurtissAnnotationNomenclatureEmphasizerValue), "CAN Emphasizer enum should be frozen");
  
  // Test array
  assert.ok(Object.isFrozen(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS), "CAN Emphasizer array should be frozen");
  
  // Test codes object
  assert.ok(Object.isFrozen(CurtissAnnotationNomenclatureEmphasizers), "CAN Emphasizers lookup should be frozen");
  
  // Test descriptions object
  assert.ok(Object.isFrozen(CurtissAnnotationNomenclatureEmphasizerDescriptions), "CAN Emphasizer descriptions should be frozen");
  
  // Test returned array
  const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();
  assert.ok(Object.isFrozen(allEmphasizers), "Returned CAN Emphasizer array should be frozen");
  
  // Test individual emphasizer objects
  const emphasizer = getCurtissAnnotationNomenclatureEmphasizerByCode("+");
  assert.ok(emphasizer, "CAN Emphasizer should exist");
  assert.ok(Object.isFrozen(emphasizer), "CAN Emphasizer object should be frozen");
});

test("Immutability: DISCLAIMER and EMPHASIZER_INFO are frozen", () => {
  assert.ok(Object.isFrozen(CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER), "DISCLAIMER should be frozen");
  assert.ok(Object.isFrozen(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO), "EMPHASIZER_INFO should be frozen");
  
  const originalDisclaimer = CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER.full;
  
  // Attempt to modify
  try {
    (CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER as any).full = "HACKED";
  } catch (e) {
    // Expected in strict mode
  }
  assert.is(CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER.full, originalDisclaimer, "Disclaimer should remain unchanged");
});

test("Immutability: Returned array from getAllCurtissAnnotationNomenclatureCodes is same reference when called multiple times", () => {
  const first = getAllCurtissAnnotationNomenclatureCodes();
  const second = getAllCurtissAnnotationNomenclatureCodes();
  
  // Should return the same frozen cached array
  assert.is(first, second, "Should return same cached array reference");
  assert.ok(Object.isFrozen(first), "First call should return frozen array");
  assert.ok(Object.isFrozen(second), "Second call should return frozen array");
});

test("Immutability: Returned array from getAllCurtissAnnotationNomenclatureEmphasizers is same reference when called multiple times", () => {
  const first = getAllCurtissAnnotationNomenclatureEmphasizers();
  const second = getAllCurtissAnnotationNomenclatureEmphasizers();
  
  // Should return the same frozen cached array
  assert.is(first, second, "Should return same cached array reference");
  assert.ok(Object.isFrozen(first), "First call should return frozen array");
  assert.ok(Object.isFrozen(second), "Second call should return frozen array");
});

test("Internal validation Sets are safe despite not being frozen", () => {
  // Note: There are two internal Sets used for validation:
  // - VALID_CURTISS_ANNOTATION_NOMENCLATURE_CODES_SET (for annotation codes)
  // - VALID_CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_SET (for emphasizer codes)
  //
  // These Sets are NOT frozen because Object.freeze() does not prevent Set mutations.
  // Sets store data in internal [[SetData]] slots, not regular properties, so
  // Object.freeze() has no effect on add/delete/clear operations.
  //
  // However, these Sets are safe because:
  // 1. They are not exported (internal implementation details)
  // 2. They are declared as const (cannot be reassigned)
  // 3. The codebase only uses read operations (has() method)
  // 4. No code path calls add(), delete(), or clear() on them
  
  // Verify isValidCurtissAnnotationNomenclatureCode uses the internal Set correctly
  assert.ok(
    isValidCurtissAnnotationNomenclatureCode("!"),
    "Internal Set correctly validates valid annotation code"
  );
  assert.not.ok(
    isValidCurtissAnnotationNomenclatureCode("INVALID"),
    "Internal Set correctly rejects invalid annotation code"
  );
  
  // Verify isValidCurtissAnnotationNomenclatureEmphasizerCode uses the internal Set correctly
  assert.ok(
    isValidCurtissAnnotationNomenclatureEmphasizerCode("+"),
    "Internal Set correctly validates valid emphasizer code"
  );
  assert.not.ok(
    isValidCurtissAnnotationNomenclatureEmphasizerCode("INVALID"),
    "Internal Set correctly rejects invalid emphasizer code"
  );
  
  // Test that validation remains consistent across multiple calls (proving immutability in practice)
  const results = [];
  for (let i = 0; i < 100; i++) {
    results.push(isValidCurtissAnnotationNomenclatureCode("!"));
    results.push(isValidCurtissAnnotationNomenclatureCode("INVALID"));
  }
  
  assert.ok(
    results.every((r, i) => r === (i % 2 === 0)),
    "Validation results are consistent across 100 calls"
  );
});

// ============================================================
// FORMAT CAN ANNOTATION TESTS
// ============================================================

test("formatCANAnnotation - basic code only", () => {
  const result = formatCANAnnotation({ code: "KC" });
  
  // ASCII properties
  assert.equal(result.ascii.left, "", "ascii.left should be empty");
  assert.equal(result.ascii.circle, "(KC)", "ascii.circle should contain code in parentheses");
  assert.equal(result.ascii.right, "", "ascii.right should be empty");
  assert.equal(result.ascii.note, "", "ascii.note should be empty");
  assert.equal(result.ascii.annotation, "(KC)", "ascii.annotation should be just the code in parentheses");
  
  // Graphical properties
  assert.equal(result.graphical.circleContent, "KC", "graphical.insideTheCircle should be the code");
  assert.equal(result.graphical.topLeft, "", "graphical.topLeft should be empty");
  assert.equal(result.graphical.right, "", "graphical.right should be empty");
  assert.equal(result.graphical.note, "", "graphical.note should be empty");
  
  // Top-level code
  assert.equal(result.code, "KC", "code should be the original code");
});

test("formatCANAnnotation - code with emphasizer", () => {
  const result = formatCANAnnotation({ code: "KC", emphasizer: "*" });
  
  // ASCII properties
  assert.equal(result.ascii.left, "", "ascii.left should be empty");
  assert.equal(result.ascii.circle, "(KC)", "ascii.circle should contain code");
  assert.equal(result.ascii.right, "*", "ascii.right should contain emphasizer");
  assert.equal(result.ascii.note, "", "ascii.note should be empty");
  assert.equal(result.ascii.annotation, "(KC)*", "ascii.annotation should combine code and emphasizer");
  
  // Graphical properties
  assert.equal(result.graphical.circleContent, "KC", "graphical.insideTheCircle should be the code");
  assert.equal(result.graphical.right, "*", "graphical.right should contain emphasizer");
  
  assert.equal(result.code, "KC", "code should be the original code");
});

test("formatCANAnnotation - code with number", () => {
  const result = formatCANAnnotation({ code: "Q", numOccurrences: 1 });
  
  // ASCII properties
  assert.equal(result.ascii.left, "[1]", "ascii.left should contain number in brackets");
  assert.equal(result.ascii.circle, "(Q)", "ascii.circle should contain code");
  assert.equal(result.ascii.right, "", "ascii.right should be empty");
  assert.equal(result.ascii.note, "", "ascii.note should be empty");
  assert.equal(result.ascii.annotation, "[1] (Q)", "ascii.annotation should combine number and code");
  
  // Graphical properties
  assert.equal(result.graphical.topLeft, "[1]", "graphical.topLeft should contain number");
  assert.equal(result.graphical.circleContent, "Q", "graphical.insideTheCircle should be the code");
  
  assert.equal(result.code, "Q", "code should be the original code");
});

test("formatCANAnnotation - code with note", () => {
  const result = formatCANAnnotation({ 
    code: "FL", 
    note: "Logical fallacy here" 
  });
  
  // ASCII properties
  assert.equal(result.ascii.left, "", "ascii.left should be empty");
  assert.equal(result.ascii.circle, "(FL)", "ascii.circle should contain code");
  assert.equal(result.ascii.right, "", "ascii.right should be empty");
  assert.equal(result.ascii.note, "Logical fallacy here", "ascii.note should contain the note text");
  assert.equal(result.ascii.annotation, "(FL) Logical fallacy here", "ascii.annotation should combine code and note");
  
  // Graphical properties
  assert.equal(result.graphical.circleContent, "FL", "graphical.insideTheCircle should be the code");
  assert.equal(result.graphical.note, "Logical fallacy here", "graphical.note should contain the note text");
  
  assert.equal(result.code, "FL", "code should be the original code");
});

test("formatCANAnnotation - all components", () => {
  const result = formatCANAnnotation({ 
    code: "KC", 
    emphasizer: "*",
    numOccurrences: 5,
    note: "This is the central thesis"
  });
  
  // ASCII properties
  assert.equal(result.ascii.left, "[5]", "ascii.left should contain number");
  assert.equal(result.ascii.circle, "(KC)", "ascii.circle should contain code");
  assert.equal(result.ascii.right, "*", "ascii.right should contain emphasizer");
  assert.equal(result.ascii.note, "This is the central thesis", "ascii.note should contain note text");
  assert.equal(
    result.ascii.annotation, 
    "[5] (KC)* This is the central thesis", 
    "ascii.annotation should combine all components"
  );
  
  // Graphical properties
  assert.equal(result.graphical.topLeft, "[5]", "graphical.topLeft should contain number");
  assert.equal(result.graphical.circleContent, "KC", "graphical.insideTheCircle should be the code");
  assert.equal(result.graphical.right, "*", "graphical.right should contain emphasizer");
  assert.equal(result.graphical.note, "This is the central thesis", "graphical.note should contain note text");
  
  assert.equal(result.code, "KC", "code should be the original code");
});

test("formatCANAnnotation - with StrongLike emphasizer", () => {
  const result = formatCANAnnotation({ code: "Q", emphasizer: "+" });
  
  assert.equal(result.ascii.circle, "(Q)", "ascii.circle should contain code");
  assert.equal(result.ascii.right, "+", "ascii.right should contain + emphasizer");
  assert.equal(result.ascii.annotation, "(Q)+", "ascii.annotation should show code with + emphasizer");
  
  assert.equal(result.graphical.circleContent, "Q", "graphical.insideTheCircle should be the code");
  assert.equal(result.graphical.right, "+", "graphical.right should contain + emphasizer");
  
  assert.equal(result.code, "Q", "code should be the original code");
});

test("formatCANAnnotation - with StrongDislike emphasizer", () => {
  const result = formatCANAnnotation({ code: "FL", emphasizer: "-" });
  
  assert.equal(result.ascii.circle, "(FL)", "ascii.circle should contain code");
  assert.equal(result.ascii.right, "-", "ascii.right should contain - emphasizer");
  assert.equal(result.ascii.annotation, "(FL)-", "ascii.annotation should show code with - emphasizer");
  
  assert.equal(result.graphical.circleContent, "FL", "graphical.insideTheCircle should be the code");
  assert.equal(result.graphical.right, "-", "graphical.right should contain - emphasizer");
  
  assert.equal(result.code, "FL", "code should be the original code");
});

test("formatCANAnnotation - number zero", () => {
  const result = formatCANAnnotation({ code: "C", numOccurrences: 0 });
  
  // number: 0 is falsy, so it should be treated as empty
  assert.equal(result.ascii.left, "", "ascii.left should be empty for number 0");
  assert.equal(result.ascii.annotation, "(C)", "ascii.annotation should not include [0]");
  assert.equal(result.graphical.topLeft, "", "graphical.topLeft should be empty for number 0");
});

test("formatCANAnnotation - empty note string", () => {
  const result = formatCANAnnotation({ code: "E", note: "" });
  
  assert.equal(result.ascii.note, "", "ascii.note should be empty string");
  assert.equal(result.ascii.annotation, "(E)", "ascii.annotation should not include empty note");
  assert.equal(result.graphical.note, "", "graphical.note should be empty string");
});

test("formatCANAnnotation - note with special characters", () => {
  const result = formatCANAnnotation({ 
    code: "Q", 
    note: "Quote: \"Amazing!\" & <important>" 
  });
  
  assert.equal(
    result.ascii.note, 
    "Quote: \"Amazing!\" & <important>",
    "ascii.note should preserve special characters"
  );
  assert.equal(
    result.ascii.annotation, 
    "(Q) Quote: \"Amazing!\" & <important>",
    "ascii.annotation should include note with special characters"
  );
  assert.equal(
    result.graphical.note, 
    "Quote: \"Amazing!\" & <important>",
    "graphical.note should preserve special characters"
  );
});

test("formatCANAnnotation - immutability and purity check", () => {
  const options = { code: "KC" as const, emphasizer: "*" as const, numOccurrences: 1, note: "Test" };
  const result1 = formatCANAnnotation(options);
  const result2 = formatCANAnnotation(options);
  
  // Results should be equal (pure function)
  assert.equal(result1.ascii.annotation, result2.ascii.annotation, "Multiple calls should produce equal ascii.annotation");
  assert.equal(result1.ascii.left, result2.ascii.left, "ascii.left should be equal");
  assert.equal(result1.ascii.circle, result2.ascii.circle, "ascii.circle should be equal");
  assert.equal(result1.ascii.right, result2.ascii.right, "ascii.right should be equal");
  assert.equal(result1.ascii.note, result2.ascii.note, "ascii.note should be equal");
  
  assert.equal(result1.graphical.topLeft, result2.graphical.topLeft, "graphical.topLeft should be equal");
  assert.equal(result1.graphical.circleContent, result2.graphical.circleContent, "graphical.insideTheCircle should be equal");
  assert.equal(result1.graphical.right, result2.graphical.right, "graphical.right should be equal");
  assert.equal(result1.graphical.note, result2.graphical.note, "graphical.note should be equal");
  
  assert.equal(result1.code, result2.code, "code should be equal");
  
  // Modifying the input options should not affect previous results
  options.note = "Changed";
  assert.equal(result1.ascii.note, "Test", "Previous result should not be affected by input mutation");
});

test("formatCANAnnotation - various CAN codes", () => {
  const codes = ["!", "?", "A", "AG", "KC", "FL", "Q", "E", "C"];
  
  codes.forEach(code => {
    const result = formatCANAnnotation({ code: code as CurtissAnnotationNomenclatureCode });
    assert.equal(result.ascii.circle, `(${code})`, `ascii.circle should correctly format ${code}`);
    assert.equal(result.graphical.circleContent, code, `graphical.insideTheCircle should be ${code}`);
    assert.equal(result.code, code, `code should be ${code}`);
  });
});

test("formatCANAnnotation - large number", () => {
  const result = formatCANAnnotation({ code: "KC", numOccurrences: 999 });
  
  assert.equal(result.ascii.left, "[999]", "ascii.left should handle large numbers");
  assert.equal(result.ascii.annotation, "[999] (KC)", "ascii.annotation should include large number");
  assert.equal(result.graphical.topLeft, "[999]", "graphical.topLeft should handle large numbers");
});

test("formatCANAnnotation - long note", () => {
  const longNote = "This is a very long note that contains a lot of text to ensure that the function can handle notes of various lengths without any issues.";
  const result = formatCANAnnotation({ code: "KC", note: longNote });
  
  assert.equal(result.ascii.note, longNote, "ascii.note should handle long text");
  assert.ok(result.ascii.annotation.includes(longNote), "ascii.annotation should include the full long note");
  assert.equal(result.graphical.note, longNote, "graphical.note should handle long text");
});

test("formatCANAnnotation - all emphasizers with same code", () => {
  const emphasizers = ["+", "-", "*"] as const;
  
  emphasizers.forEach(emph => {
    const result = formatCANAnnotation({ code: "KC", emphasizer: emph });
    assert.equal(result.ascii.circle, "(KC)", `ascii.circle should be (KC) for ${emph}`);
    assert.equal(result.ascii.right, emph, `ascii.right should contain ${emph} emphasizer`);
    assert.equal(result.ascii.annotation, `(KC)${emph}`, `ascii.annotation should show code with ${emph}`);
    
    assert.equal(result.graphical.circleContent, "KC", `graphical.insideTheCircle should be KC for ${emph}`);
    assert.equal(result.graphical.right, emph, `graphical.right should contain ${emph} emphasizer`);
    
    assert.equal(result.code, "KC", `code should be KC for ${emph}`);
  });
});

test.run();
