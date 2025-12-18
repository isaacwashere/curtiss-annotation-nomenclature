/**
 * Curtiss Annotation Nomenclature - Usage Examples
 *
 * Demonstrates how to import and use the package in different scenarios
 */

// ============================================================================
// IMPORTS - All in one place
// ============================================================================

import {
  CurtissAnnotationNomenclatureCodeEnum,
  CurtissAnnotationNomenclatureCodeValue,
  CurtissAnnotationNomenclatureCodes,
  CurtissAnnotationNomenclatureDescriptions,
  CURTISS_ANNOTATION_NOMENCLATURE_CODES,
  getCurtissAnnotationNomenclatureCode,
  getCurtissAnnotationNomenclatureCodeByName,
  getAllCurtissAnnotationNomenclatureCodes,
  isValidCurtissAnnotationNomenclatureCode,
  formatCANAnnotation,
  CURTISS_ANNOTATION_NOMENCLATURE_VERSION,
  type CurtissAnnotationNomenclatureCode,
  type CurtissAnnotationNomenclature,
  CurtissAnnotationNomenclatureEmphasizerValue,
  getCurtissAnnotationNomenclatureEmphasizerByCode,
  getAllCurtissAnnotationNomenclatureEmphasizers,
  isValidCurtissAnnotationNomenclatureEmphasizerCode,
  CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO,
  type CurtissAnnotationNomenclatureEmphasizerCode,
} from "./curtiss-annotation-nomenclature";

// ============================================================================
// 1. USING THE TYPESCRIPT ENUM (Most Type-Safe)
// ============================================================================

// Use when you want strictest type checking
const annotation: CurtissAnnotationNomenclatureCodeEnum =
  CurtissAnnotationNomenclatureCodeEnum.Surprising; // "!"

function logAnnotation(code: CurtissAnnotationNomenclatureCodeEnum) {
  console.log(`Annotation: ${code}`);
}

logAnnotation(CurtissAnnotationNomenclatureCodeEnum.KeyConcept); // ✅ Valid
// logAnnotation("KC"); // ❌ Type error

// ============================================================================
// 2. USING THE ENUM-LIKE OBJECT (Runtime-Friendly)
// ============================================================================

// Use for configuration objects or when you need runtime flexibility
const annotationConfig = {
  important: CurtissAnnotationNomenclatureCodeValue.KeyConcept, // "KC"
  action: CurtissAnnotationNomenclatureCodeValue.ActionTask, // "AT"
  surprising: CurtissAnnotationNomenclatureCodeValue.Surprising, // "!"
};

// ============================================================================
// 3. LOOKUP OBJECTS - Quick Access to Names and Descriptions
// ============================================================================

// Get name from code
const name = CurtissAnnotationNomenclatureCodes["!"]; // "Surprising"

// Get description from code
const desc = CurtissAnnotationNomenclatureDescriptions["KC"];
// "Key concept - central important concept"

// Get all codes as array
const allCodes = CURTISS_ANNOTATION_NOMENCLATURE_CODES; // ["!", "?", "A", "AG", ...]

// ============================================================================
// 4. HELPER FUNCTIONS - Full Annotation Lookups
// ============================================================================

// Get complete annotation object by code
const fullAnnotation = getCurtissAnnotationNomenclatureCode("!");
// { code: "!", name: "Surprising", description: "Surprising or unexpected" }

// Get annotation by name
const byName = getCurtissAnnotationNomenclatureCodeByName("KeyConcept");
// { code: "KC", name: "KeyConcept", description: "..." }

// Get all annotations (useful for building UIs)
const allAnnotations = getAllCurtissAnnotationNomenclatureCodes();

// ============================================================================
// 5. TYPE-SAFE FUNCTIONS
// ============================================================================

// Function that only accepts valid annotation codes
function processCode(code: CurtissAnnotationNomenclatureCode) {
  console.log(`Processing: ${code}`);
}

processCode("!"); // ✅ Valid
// processCode("INVALID"); // ❌ Type error

// Function that returns annotation details
function getAnnotationInfo(
  code: CurtissAnnotationNomenclatureCode
): CurtissAnnotationNomenclature | undefined {
  return getCurtissAnnotationNomenclatureCode(code);
}

// ============================================================================
// 6. PRACTICAL PATTERNS
// ============================================================================

// Pattern 1: Build options for UI dropdowns
const annotationOptions = getAllCurtissAnnotationNomenclatureCodes().map((ann) => ({
  label: `${ann.code} - ${ann.name}`,
  value: ann.code,
  description: ann.description,
}));

// Pattern 2: Group annotations by category
const groupedAnnotations = {
  structure: getAllCurtissAnnotationNomenclatureCodes().filter((a) =>
    ["C", "AR", "CA", "FR"].includes(a.code)
  ),
  evaluation: getAllCurtissAnnotationNomenclatureCodes().filter((a) =>
    ["!", "?", "X", "AG"].includes(a.code)
  ),
};

// Pattern 3: Search annotations
function searchAnnotations(query: string): CurtissAnnotationNomenclature[] {
  const q = query.toLowerCase();
  return getAllCurtissAnnotationNomenclatureCodes().filter(
    (ann) =>
      ann.code.toLowerCase().includes(q) ||
      ann.name.toLowerCase().includes(q) ||
      ann.description.toLowerCase().includes(q)
  );
}

// ============================================================================
// 7. REAL-WORLD EXAMPLE: Book Annotation Tracker
// ============================================================================

class BookAnnotator {
  private annotations = new Map<
    string,
    Array<{ code: CurtissAnnotationNomenclatureCode; note: string }>
  >();

  // Add annotation to a page
  addAnnotation(page: string, code: CurtissAnnotationNomenclatureCode, note: string) {
    const pageAnnotations = this.annotations.get(page) || [];
    pageAnnotations.push({ code, note });
    this.annotations.set(page, pageAnnotations);
  }

  // Get all annotations for a page with full details
  getPageAnnotations(page: string) {
    return (this.annotations.get(page) || []).map(({ code, note }) => {
      const details = getCurtissAnnotationNomenclatureCode(code);
      return { ...details, note };
    });
  }

  // Export as markdown
  exportMarkdown(): string {
    let md = "# Reading Annotations\n\n";
    for (const [page, annotations] of this.annotations) {
      md += `## Page ${page}\n`;
      annotations.forEach(({ code, note }) => {
        const details = getCurtissAnnotationNomenclatureCode(code);
        md += `- **${code}** (${details?.name}): ${note}\n`;
      });
      md += "\n";
    }
    return md;
  }
}

// Usage example
const book = new BookAnnotator();
book.addAnnotation(
  "42",
  CurtissAnnotationNomenclatureCodeEnum.Surprising,
  "Plot twist!"
);
book.addAnnotation(
  "42",
  CurtissAnnotationNomenclatureCodeEnum.KeyConcept,
  "Main thesis"
);
book.addAnnotation(
  "98",
  CurtissAnnotationNomenclatureCodeEnum.QuoteWorthy,
  "Beautiful prose"
);

console.log(book.exportMarkdown());

// ============================================================================
// 8. CAN EMPHASIZERS - Using CAN Emphasizers to add emphasis to annotations
// ============================================================================

// CAN Emphasizers are optional symbols that can be added to annotations to convey
// additional sentiment: + (really like), - (really dislike), * (really important)

console.log("\n=== EMPHASIZER USAGE ===\n");
console.log("Purpose:", CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.purpose);
console.log("Recommendation:", CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.recommendation);
console.log("Note:", CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.note);

// 1. Using the TypeScript enum
const emphasize = CurtissAnnotationNomenclatureEmphasizerValue.StrongLike; // "+"

// 2. Get full details about an emphasizer
const emphDetails = getCurtissAnnotationNomenclatureEmphasizerByCode("+");
console.log("\nEmphasizer +:", emphDetails);
// { code: "+", name: "StrongLike", description: "I really like this" }

// 3. All available emphasizers
const allEmphasizers = getAllCurtissAnnotationNomenclatureEmphasizers();
console.log("\nAll emphasizers:");
allEmphasizers.forEach((emph) => {
  console.log(`  ${emph.code} - ${emph.name}: ${emph.description}`);
});

// ============================================================================
// 9. REAL-WORLD EXAMPLE: Book Annotator with CAN Emphasizers
// ============================================================================

class AdvancedBookAnnotator {
  private annotations = new Map<
    string,
    Array<{
      code: CurtissAnnotationNomenclatureCode;
      emphasizer?: CurtissAnnotationNomenclatureEmphasizerCode;
      note: string;
    }>
  >();

  // Add annotation with optional emphasizer
  addAnnotation(
    page: string,
    code: CurtissAnnotationNomenclatureCode,
    note: string,
    emphasizer?: CurtissAnnotationNomenclatureEmphasizerCode
  ) {
    const pageAnnotations = this.annotations.get(page) || [];
    pageAnnotations.push({ code, emphasizer, note });
    this.annotations.set(page, pageAnnotations);
  }

  // Get all annotations for a page with full details
  getPageAnnotations(page: string) {
    return (this.annotations.get(page) || []).map(
      ({ code, emphasizer, note }) => {
        const details = getCurtissAnnotationNomenclatureCode(code);
        const emphDetails = emphasizer
          ? getCurtissAnnotationNomenclatureEmphasizerByCode(emphasizer)
          : undefined;
        return {
          ...details,
          emphasizer: emphDetails,
          note,
        };
      }
    );
  }

  // Export as markdown with emphasizers
  exportMarkdown(): string {
    let md = "# Reading Annotations\n\n";
    for (const [page, annotations] of this.annotations) {
      md += `## Page ${page}\n`;
      annotations.forEach(({ code, emphasizer, note }) => {
        const details = getCurtissAnnotationNomenclatureCode(code);
        const emphDetails = emphasizer
          ? getCurtissAnnotationNomenclatureEmphasizerByCode(emphasizer)
          : undefined;

        // Format: [emphasizer]code (name): note
        const prefix = emphDetails ? `${emphDetails.code}` : "";
        md += `- **${prefix}${code}** (${details?.name}): ${note}`;
        if (emphDetails) {
          md += ` _[${emphDetails.description}]_`;
        }
        md += "\n";
      });
      md += "\n";
    }
    return md;
  }
}

// Usage example with emphasizers
const advancedBook = new AdvancedBookAnnotator();

// Regular annotation without emphasizer
advancedBook.addAnnotation(
  "23",
  CurtissAnnotationNomenclatureCodeEnum.KeyConcept,
  "Main thesis introduced"
);

// Annotation with "really like" emphasizer
advancedBook.addAnnotation(
  "23",
  CurtissAnnotationNomenclatureCodeEnum.QuoteWorthy,
  "Beautiful prose describing nature",
  CurtissAnnotationNomenclatureEmphasizerValue.StrongLike // +
);

// Annotation with "really important" emphasizer
advancedBook.addAnnotation(
  "45",
  CurtissAnnotationNomenclatureCodeEnum.Claim,
  "Author's central argument",
  CurtissAnnotationNomenclatureEmphasizerValue.Critical // *
);

// Annotation with "really dislike" emphasizer
advancedBook.addAnnotation(
  "67",
  CurtissAnnotationNomenclatureCodeEnum.FlawInReasoning,
  "Logical fallacy in this section and it makes this entire section worthless",
  CurtissAnnotationNomenclatureEmphasizerValue.StrongDislike // -
);

console.log("\n=== MARKDOWN EXPORT WITH EMPHASIZERS ===\n");
console.log(advancedBook.exportMarkdown());

// ============================================================================
// 10. PRACTICAL PATTERNS WITH EMPHASIZERS
// ============================================================================

// Pattern 1: Validate emphasizer codes
function addEmphasizedNote(
  annotationCode: CurtissAnnotationNomenclatureCode,
  emphasizerCode?: string,
  note?: string
) {
  // Validate emphasizer if provided
  if (emphasizerCode && !isValidCurtissAnnotationNomenclatureEmphasizerCode(emphasizerCode)) {
    throw new Error(`Invalid emphasizer code: ${emphasizerCode}`);
  }

  const annotation = getCurtissAnnotationNomenclatureCode(annotationCode);
  const emphasizer = emphasizerCode
    ? getCurtissAnnotationNomenclatureEmphasizerByCode(emphasizerCode)
    : undefined;

  return {
    fullCode: emphasizer ? `${emphasizer.code}${annotationCode}` : annotationCode,
    annotation,
    emphasizer,
    note,
  };
}

// Pattern 2: Build options for UI with emphasizers
const emphasizerOptions = getAllCurtissAnnotationNomenclatureEmphasizers().map((emph) => ({
  label: `${emph.code} - ${emph.name}`,
  value: emph.code,
  description: emph.description,
}));

console.log("\n=== EMPHASIZER OPTIONS FOR UI ===");
console.log(emphasizerOptions);

// Pattern 3: Group annotations by emphasis level
function groupByEmphasis(
  annotations: Array<{
    code: CurtissAnnotationNomenclatureCode;
    emphasizer?: CurtissAnnotationNomenclatureEmphasizerCode;
    note: string;
  }>
) {
  return {
    critical: annotations.filter((a) => a.emphasizer === "*"),
    liked: annotations.filter((a) => a.emphasizer === "+"),
    disliked: annotations.filter((a) => a.emphasizer === "-"),
    neutral: annotations.filter((a) => !a.emphasizer),
  };
}

// ============================================================================
// 11. COMBINING ANNOTATIONS AND EMPHASIZERS
// ============================================================================

// Real-world example: Parse combined code like "+KC" or "*C"
function parseCombinedCode(combinedCode: string): {
  emphasizer?: CurtissAnnotationNomenclatureEmphasizerCode;
  annotation: CurtissAnnotationNomenclatureCode;
} | null {
  // Check if first character is an emphasizer
  const firstChar = combinedCode[0];
  const isEmphasized = isValidCurtissAnnotationNomenclatureEmphasizerCode(firstChar);

  if (isEmphasized) {
    const annotationCode = combinedCode.slice(1);
    if (isValidCurtissAnnotationNomenclatureCode(annotationCode)) {
      return {
        emphasizer: firstChar as CurtissAnnotationNomenclatureEmphasizerCode,
        annotation: annotationCode as CurtissAnnotationNomenclatureCode,
      };
    }
  } else {
    // No emphasizer, just annotation
    if (isValidCurtissAnnotationNomenclatureCode(combinedCode)) {
      return {
        annotation: combinedCode as CurtissAnnotationNomenclatureCode,
      };
    }
  }

  return null;
}

// Test the parser
console.log("\n=== PARSING COMBINED CODES ===");
console.log("'+KC':", parseCombinedCode("+KC")); // { emphasizer: "+", annotation: "KC" }
console.log("'*C':", parseCombinedCode("*C")); // { emphasizer: "*", annotation: "C" }
console.log("'KC':", parseCombinedCode("KC")); // { annotation: "KC" }
console.log("'INVALID':", parseCombinedCode("INVALID")); // null

// ============================================================================
// 12. FORMATTING CAN ANNOTATIONS (NEW!)
// ============================================================================

console.log("\n=== FORMATTING CAN ANNOTATIONS ===");

// Format a basic annotation
const basicFormat = formatCANAnnotation({ code: "KC" });
console.log("Basic:", basicFormat.ascii.annotation); // "(KC)"
console.log("  - ascii.circle:", basicFormat.ascii.circle); // "(KC)" - for text output
console.log("  - graphical.circleContent:", basicFormat.graphical.circleContent); // "KC" - for UI circle rendering
console.log("  - code:", basicFormat.code); // "KC" - top-level reference

// Format with emphasizer
const withEmph = formatCANAnnotation({ 
  code: "KC", 
  emphasizer: "*" 
});
console.log("\nWith emphasizer:", withEmph.ascii.annotation); // "(KC)*"
console.log("  - ascii.circle:", withEmph.ascii.circle); // "(KC)"
console.log("  - ascii.right:", withEmph.ascii.right); // "*"
console.log("  - graphical.circleContent:", withEmph.graphical.circleContent); // "KC"
console.log("  - graphical.right:", withEmph.graphical.right); // "*"

// Format with all components
const fullFormat = formatCANAnnotation({
  code: "KC",
  emphasizer: "*",
  numOccurrences: 1,
  note: "This is critical"
});
console.log("\nFull annotation:", fullFormat.ascii.annotation); 
// "[1] (KC)* This is critical"
console.log("  ASCII parts:");
console.log("    - left:", fullFormat.ascii.left); // "[1]"
console.log("    - circle:", fullFormat.ascii.circle); // "(KC)"
console.log("    - right:", fullFormat.ascii.right); // "*"
console.log("    - note:", fullFormat.ascii.note); // "This is critical"
console.log("  Graphical parts:");
console.log("    - topLeft:", fullFormat.graphical.topLeft); // "[1]"
console.log("    - circleContent:", fullFormat.graphical.circleContent); // "KC"
console.log("    - right:", fullFormat.graphical.right); // "*"
console.log("    - note:", fullFormat.graphical.note); // "This is critical"
console.log("  Top-level:");
console.log("    - code:", fullFormat.code); // "KC"

// IMPORTANT: ascii vs graphical rendering
console.log("\n=== RENDERING: ascii vs graphical ===");
const renderExample = formatCANAnnotation({
  code: "Q",
  emphasizer: "+",
  numOccurrences: 2,
  note: "Beautiful quote"
});

console.log("\n✅ CORRECT for TEXT/CONSOLE output:");
console.log(`  Use ascii.annotation: ${renderExample.ascii.annotation}`);
console.log(`  Or ascii.circle for just the circle: ${renderExample.ascii.circle}`);

console.log("\n✅ CORRECT for UI with graphical circle:");
console.log(`  <div className="annotation">`);
console.log(`    <span className="number">${renderExample.graphical.topLeft}</span>`);
console.log(`    <div className="circle">${renderExample.graphical.circleContent}</div>  ← Use 'circleContent'`);
console.log(`    <span className="emphasizer">${renderExample.graphical.right}</span>`);
console.log(`  </div>`);

console.log("\n❌ INCORRECT - Don't do this:");
console.log(`  <div className="circle">${renderExample.ascii.circle}</div>`);
console.log(`  ↑ This creates a circle around "(Q)" which is wrong!`);
console.log(`  The parentheses in ascii.circle already represent the circle for text contexts.`);
console.log(`  Use graphical.circleContent instead: <div className="circle">${renderExample.graphical.circleContent}</div>`);

// ============================================================================
// 13. CHECKING PACKAGE VERSION
// ============================================================================

console.log(`\nUsing version: ${CURTISS_ANNOTATION_NOMENCLATURE_VERSION}`);
