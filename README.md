# Curtiss Annotation Nomenclature (C.A.N.)

[![NPM Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/curtiss-annotation-nomenclature)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Official NPM package for The Curtiss Annotation Nomenclature _(C.A.N.)_ System.** A TypeScript-first package providing 100 standardized CAN codes with full type safety for systematic annotating.

> **📘 Source of Truth**: This package implements [The Official CAN Guide](https://github.com/isaacwashere/curtiss-annotation-nomenclature-documentation/blob/main/CAN_Guide.pdf), which is the authoritative specification for the Curtiss Annotation Nomenclature system. For the complete methodology, philosophy, and official definitions, refer to the official guide.

---

## Table of Contents

- [What is Curtiss Annotation Nomenclature?](#what-is-curtiss-annotation-nomenclature)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Understanding CAN](#understanding-can)
- [Common Use Cases](#common-use-cases)
- [Proper CAN Formatting for UI Rendering](#proper-can-formatting-for-ui-rendering)
  - [Understanding ascii vs graphical](#understanding-ascii-vs-graphical)
- [Naming Conventions](#naming-conventions)
- [API Reference](#api-reference)
  - [Core Functions](#core-functions)
  - [CAN Emphasizer Functions](#can-emphasizer-functions)
  - [Enums and Objects](#enums-and-objects)
  - [TypeScript Types](#typescript-types)
- [Complete Usage Example](#complete-usage-example)
- [Case Sensitivity](#case-sensitivity)
- [Immutability](#immutability)
- [All Available Annotations](#all-available-annotations)
- [Relationship to Official CAN Guide](#relationship-to-official-can-guide)
- [Contributing](#contributing)
- [License](#license)
- [Quick Reference Table](#quick-reference-table)

---

## What is Curtiss Annotation Nomenclature?

**Curtiss Annotation Nomenclature _(or C.A.N.)_ is a standardized system for annotating books, articles, and documents while reading.** 

**Nomenclature** means "a system of names" — CAN provides a standardized naming system for different types of noteworthy content you encounter while reading.

### Why Use CAN?

Ever read a book and struggle to remember the key insights weeks later? CAN solves this by providing:

- **100 standardized CAN Codes** _(like `KC` for Key Concept, `Q` for QuoteWorthy)_ to categorize what you're highlighting
- **Searchable annotations** — find all "Key Concepts" or "Evidence" across all your reading materials
- **Consistent system** — use the same method across books, articles, research papers, and documents
- **Sentiment tracking** — optional CAN Emphasizers (`+`, `-`, `*`) let you mark your opinion about noteworthy content

### Who is The CAN System For?

- **Students** taking notes on textbooks and research papers
- **Researchers** analyzing academic literature systematically
- **Developers** building reading/note-taking applications
- **Avid readers** who want a systematic approach to retain what they read

### This Package

This NPM package provides TypeScript types, enums, and utilities for interacting with The CAN System. It includes:
- All 100 CAN codes with descriptions
- Type-safe enums and validation functions
- Formatting utilities for text and graphical rendering
- Immutable, deeply-frozen data structures

📘 **New to CAN?** This README contains everything you need to get started with the package.

⚠️ **Important**: [The Official CAN Guide](https://github.com/isaacwashere/curtiss-annotation-nomenclature-documentation/blob/main/CAN_Guide.pdf) _(PDF)_ is the **authoritative source of truth** for the CAN system. This package is an implementation of that specification. For the complete philosophy, methodology, official definitions, and authoritative guidance, always refer to the official guide.

---

## Installation

```bash
npm install curtiss-annotation-nomenclature
```

Or with other package managers:

```bash
yarn add curtiss-annotation-nomenclature
pnpm add curtiss-annotation-nomenclature
```

---

## Quick Start

```typescript
import {
  CurtissAnnotationNomenclatureCodeEnum,
  getCurtissAnnotationNomenclatureCode,
  CurtissAnnotationNomenclatureEmphasizerEnum,
  formatCANAnnotation,
} from "curtiss-annotation-nomenclature";

// Example scenario: User is reading a book and highlights a passage 
// they think contains a critical key concept

// 1. Get the CAN code for "Key Concept"
const code = CurtissAnnotationNomenclatureCodeEnum.KeyConcept; // "KC"

// 2. Get full details about this code (useful for displaying in UI)
const details = getCurtissAnnotationNomenclatureCode("KC");
// { code: "KC", name: "KeyConcept", description: "Key concept - central important concept..." }

// 3. Add a CAN Emphasizer to mark this as "Critical" (optional)
const emphasizer = CurtissAnnotationNomenclatureEmphasizerEnum.Critical; // "*"

// 4. Format the annotation with proper CAN formatting
// This is the 1st Key Concept annotation the user made in this section
const formatted = formatCANAnnotation({ 
  code: "KC", 
  emphasizer: "*", 
  numOccurrences: 1  // 1st Key Concept in this section/page
});

// 5a. For text/console output (plain text environments)
console.log(formatted.ascii.annotation); // "[1] (KC)*"

// 5b. For UI rendering (rich graphical environments)
const circleContent = formatted.graphical.circleContent; // "KC"
const topLeftNumber = formatted.graphical.topLeft; // "[1]"
// Now render an actual circle in your UI with "KC" inside it
```

---

## Understanding CAN

Curtiss Annotation Nomenclature provides **100 standardized CAN Codes** for marking important passages while reading. Each code is a 1-2 letter, capitalized abbreviation that represents a specific type of content or insight:

- `!` - **Surprising**: Unexpected or surprising content
- `KC` - **KeyConcept**: Central important concept
- `C` - **Claim**: A claim or argument being made
- `E` - **Evidence**: Supporting evidence or data
- `Q` - **QuoteWorthy**: A phrase worth remembering
- `FL` - **FlawInReasoning**: Logical fallacy or error

### How to Think About CAN

**CAN codes are for marking noteworthy passages**, not every instance. The goal is to:
1. Mark passages that stand out to you
2. Mark content that might be useful later
3. Add substantive notes to each annotation
4. Create a searchable, systematic record of your reading

### CAN Emphasizers (Optional Add-On)

CAN Codes tell you **WHAT** type of content it is _(e.g., `KC` = Key Concept, `E` = Evidence)_, but not your **OPINION** about it. **CAN Emphasizers** let you add your sentiment.

| Code | Name | Meaning |
|------|------|---------|
| `+` | StrongLike | I really like this |
| `-` | StrongDislike | I really don't like this |
| `*` | Critical | This is really important |

**⚠️ RULE:** You can ONLY use **ONE CAN Emphasizer per annotation**. Never use multiple Emphasizers together _(e.g., `(KC)*+` is INVALID)_. Each annotation gets zero or one Emphasizer — choose the most appropriate one.

**Example problem:** You mark a passage as `FL` _(Flaw in Reasoning)_. But is it:
- A flaw that's interesting to study? → `(FL)+` _(like the flaw)_
- A terrible flaw that undermines the argument? → `(FL)-` _(dislike the flaw)_
- A critical flaw to remember for your essay? → `(FL)*` _(important flaw)_

**CAN Emphasizers** let you add this layer of meaning AFTER the code.

**More examples:**
- `(KC)*` = Critical Key Concept
- `(Q)+` = Really like this quote
- `(C)-` = Dislike this claim
- `(E)*` = Critical piece of evidence

**Important:** CAN Codes _(alone, that is, without a CAN Emphasizer)_ mark "noteworthy" content, not necessarily "good" or "bad" content. When building CAN-enabled apps, use the `CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER` constant in your UI to explain this to users _(see [`CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER`](#curtiss_annotation_nomenclature_disclaimer-information-object))_.

---

## Common Use Cases

### 1. Building a Reading/Note-Taking App

```typescript
// User highlights text in your app and selects an annotation type
const annotation = {
  text: "This is the central thesis of the entire book...",
  code: "KC",           // Key Concept
  emphasizer: "*",      // Critical
  note: "Foundation for chapters 4-7",
  pageNumber: 42,
  numOccurrences: 1     // 1st Key Concept (pattern-specific counting)
};

// Format for display
const formatted = formatCANAnnotation({
  code: annotation.code,
  emphasizer: annotation.emphasizer,
  numOccurrences: annotation.numOccurrences
});

// Display in UI: "[1] (KC)* — This is the central thesis..."
```

### 2. Research Paper Analysis & Systematic Review

```typescript
// Automatically suggest CAN codes based on content analysis
function suggestAnnotation(text: string) {
  if (containsStatistics(text)) {
    return getCurtissAnnotationNomenclatureCode("E"); // Evidence
  }
  if (containsConclusion(text)) {
    return getCurtissAnnotationNomenclatureCode("C"); // Claim
  }
  // ... more heuristics
}

// Track and export all evidence across multiple papers
const allEvidence = papers
  .flatMap(paper => paper.annotations)
  .filter(a => a.code === "E")
  .map(a => ({ paper: a.source, text: a.text, note: a.note }));
```

### 3. Study Notes & Exam Preparation

```typescript
// Export all "Key Concepts" for flashcard review
const keyConceptsForReview = allAnnotations
  .filter(a => a.code === "KC")
  .map(a => ({
    question: `What is the key concept on page ${a.page}?`,
    answer: a.note
  }));

// Find all critical items (marked with "*")
const criticalContent = allAnnotations
  .filter(a => a.emphasizer === "*")
  .sort((a, b) => a.pageNumber - b.pageNumber);
```

### 4. Counting & Tracking Patterns

```typescript
// Pattern-specific counting: Track how many times the author uses analogies
let analogyCount = 0;

// When user marks an analogy:
analogyCount++;
const formatted = formatCANAnnotation({
  code: "A",  // Analogy
  numOccurrences: analogyCount,  // Shows "[3]" for 3rd analogy
  note: "Ship steering analogy for leadership"
});

// Or count character development moments in a novel:
let characterMoments = 0;
// Each time protagonist grows: characterMoments++
formatCANAnnotation({ 
  code: "CH",  // Character Insight
  numOccurrences: characterMoments,
  emphasizer: "+",  // Like this character moment
  note: "Protagonist overcomes fear"
});

// Track evidence in a research paper:
let evidenceCount = 0;
evidenceCount++;
formatCANAnnotation({ code: "E", numOccurrences: evidenceCount }); // [1] (E)
evidenceCount++;
formatCANAnnotation({ code: "E", numOccurrences: evidenceCount }); // [2] (E)
```

### 5. Multi-Format Export

```typescript
// Export notes as plain text (Markdown, txt files)
annotations.forEach(a => {
  const formatted = formatCANAnnotation(a);
  console.log(formatted.ascii.annotation); // "[1] (KC)*"
  console.log(formatted.ascii.note);        // "Central thesis"
});

// Render in rich UI (web, mobile app)
annotations.forEach(a => {
  const formatted = formatCANAnnotation(a);
  renderCircle(formatted.graphical.circleContent);  // "KC"
  renderTopLeft(formatted.graphical.topLeft);       // "[1]"
  renderRight(formatted.graphical.right);           // "*"
});
```

---

## Proper CAN Formatting for UI Rendering

When building applications that render CAN annotations, **proper formatting is critical** for maintaining the integrity and readability of the system across different CAN tools.

### ✅ Proper CAN Formatting Rules

When rendering annotations in a UI, follow these placement rules:

```
    [Note (if needed)]
[#] (CAN) [+/-/*]  [Note (alternative placement, if no CAN Emphasizer)]
    [Note (alternative placement)]
```

**Visual Layout:**

1. **Circle**: Draw a circle directly around the CAN Code
2. **CAN Emphasizer** (if present): Place to the **right and outside** of the circle
3. **Number** (if present): Place to the **top-left and outside** of the circle
4. **Note** (if present): Place in one of these positions (all **outside** the circle):
   - **Above** the circle (preferred if space allows)
   - **Below** the circle (common when CAN Emphasizer is present)
   - **To the right** of the circle (only if no CAN Emphasizer is present)

### Example: Proper Rendering

```
[1] (KC)*
    "This is the central thesis of the entire work"
```

- `[1]` = Number _(top-left, outside circle)_
- `(KC)` = CAN code inside circle
- `*` = CAN Emphasizer _(right, outside circle)_
- Note is below the circle _(but could also be above)_

### Example: Without CAN Emphasizer

```
  [2] (Q) "Beautiful phrasing here"
```

- `[2]` = Number _(top-left, outside circle)_
- `(Q)` = CAN code inside circle
- Note is to the right _(no CAN Emphasizer present)_

### ❌ Improper Formatting

**Do NOT:**
- Place CAN Emphasizers inside the circle: `(KC*)` ❌
- Place numbers inside the circle: `(1:KC)` ❌
- Place notes inside the circle: `(KC+note)` ❌
- Place CAN Emphasizers to the left: `*(KC)` ❌
- Place numbers anywhere except top-left: `(KC)[1]` ❌

### Why This Matters

Proper formatting ensures:
- **Consistency** across all CAN implementations
- **Readability** when scanning annotated text
- **Editability** - CAN Emphasizers can be changed without touching the circle
- **Community standards** - readers familiar with CAN can immediately understand your annotations

### Implementation Guidelines

When building a CAN annotation UI, use the **`formatCANAnnotation()`** helper function to ensure proper formatting:

```typescript
import { formatCANAnnotation, CurtissAnnotationNomenclatureCode } from "curtiss-annotation-nomenclature";

// formatCANAnnotation returns structured parts for proper positioning
const formatted = formatCANAnnotation({
  code: "KC",
  emphasizer: "*",
  numOccurrences: 1,
  note: "Important concept"
});

// ASCII parts (for text/console output):
// formatted.ascii.circle      → "(KC)" - parentheses ARE the circle
// formatted.ascii.left        → "[1]"
// formatted.ascii.right       → "*"
// formatted.ascii.note        → "Important concept"
// formatted.ascii.annotation  → "[1] (KC)* Important concept" - complete text

// Graphical parts (for UI rendering with actual circles):
// formatted.graphical.circleContent  → "KC" - put THIS inside your circle element
// formatted.graphical.topLeft        → "[1]" - render top-left, outside circle
// formatted.graphical.right          → "*" - render right, outside circle
// formatted.graphical.note           → "Important concept" - render outside circle

// Top-level reference:
// formatted.code → "KC" - convenient access to the code
```

**Why use `formatCANAnnotation()`?** It automatically formats components according to CAN rules and provides structured parts for flexible rendering in both UIs and text contexts.

**Remember:** 
- UI with graphics? Use `formatted.graphical.circleContent` inside your circle element
- Text/console output? Use `formatted.ascii.annotation` or `formatted.ascii.circle`

### Understanding `ascii` vs `graphical`

**Why two formats?** Different contexts need different representations:

**`ascii` format** — For plain text environments:
- Console/terminal output
- Plain text files (.txt, .md)
- Markdown documents
- Logs and exports
- Email or chat
- **Uses parentheses as the "circle":** `(KC)*` means "KC inside a circle with a critical Emphasizer"

**`graphical` format** — For rich UI environments:
- Web applications (HTML/CSS/SVG)
- Mobile apps (iOS, Android)
- PDF renderers with graphics
- Desktop applications
- **You draw actual circles**, so you only need the code itself: `KC`

**Rule of thumb:** If you can draw graphics → use `graphical`. If text-only → use `ascii`.

---

#### How to Use Each Format

**For text/linear rendering _(use `ascii`)_:**
- The parentheses ARE the circle: `(KC)` means "KC in a circle"
- Use `ascii.circle` property: `"(KC)"`
- Use `ascii.annotation` for complete text: `"[1] (KC)* Note"`

**For UI/graphical rendering _(use `graphical`)_:**
- Create your own actual circle element _(CSS, SVG, Canvas, etc.)_
- Put the code inside: `<div class="circle">KC</div>`
- Use `graphical.circleContent` property: `"KC"`
- DO NOT use `ascii.circle` here - that would create: `<div class="circle">(KC)</div>` ❌

```typescript
// ✅ CORRECT for text output
console.log(formatted.ascii.annotation); // "[1] (KC)* Note"
console.log(formatted.ascii.circle); // "(KC)"

// ✅ CORRECT for UI with graphics
<div className="annotation">
  <span className="number">{formatted.graphical.topLeft}</span>
  <div className="circle-element">{formatted.graphical.circleContent}</div>
  <span className="emphasizer">{formatted.graphical.right}</span>
</div>

// ❌ WRONG - Don't do this!
<div className="circle-element">{formatted.ascii.circle}</div> // Renders: (KC) inside a circle
```

The parentheses in `ascii.circle` are **not meant to be nested** inside another circle - they already represent the circle for text contexts. Use `graphical.circleContent` for UI rendering.

---

## Naming Conventions

**Why are the names so long?** To avoid naming conflicts in your codebase and make imports self-documenting.

All exports follow consistent prefixes:

- **`CurtissAnnotationNomenclature*`** — For annotation-related runtime objects and enums
  - Example: `CurtissAnnotationNomenclatureEmphasizerDescriptions`
- **`CURTISS_ANNOTATION_NOMENCLATURE_*`** — For constants and arrays (SCREAMING_SNAKE_CASE)
  - Example: `CURTISS_ANNOTATION_NOMENCLATURE_CODES`, `CURTISS_ANNOTATION_NOMENCLATURE_VERSION`

**Pro tip:** Use import aliases for brevity in your code:

```typescript
import { 
  CurtissAnnotationNomenclatureEmphasizerDescriptions as CANEmphasizerDesc,
  CurtissAnnotationNomenclatureEmphasizerEnum as CANEmphasizerEnum,
  getCurtissAnnotationNomenclatureEmphasizerByCode as getCANEmphasizer
} from "curtiss-annotation-nomenclature";

// Now you can use shorter names in your code:
const desc = CANEmphasizerDesc[CANEmphasizerEnum.Critical];
const emphasizer = getCANEmphasizer("*");
```

---

## API Reference

### Core Functions

#### `getCurtissAnnotationNomenclatureCode(code: string)`

Returns complete annotation object for a given code.

```typescript
const annotation = getCurtissAnnotationNomenclatureCode("KC");
// { code: "KC", name: "KeyConcept", description: "Key concept - central important concept..." }
```

#### `getCurtissAnnotationNomenclatureCodeByName(name: string)`

Looks up annotation by name.

```typescript
const annotation = getCurtissAnnotationNomenclatureCodeByName("Surprising");
// { code: "!", name: "Surprising", description: "Surprising or unexpected" }
```

#### `getAllCurtissAnnotationNomenclatureCodes()`

Returns all 100 annotations as an array.

```typescript
const all = getAllCurtissAnnotationNomenclatureCodes();
// [{ code: "!", name: "Surprising", ... }, { code: "?", ... }, ...]
```

#### `isValidCurtissAnnotationNomenclatureCode(value: string)`

Type guard to check if a string is a valid CAN code. **Case-sensitive.**

```typescript
isValidCurtissAnnotationNomenclatureCode("KC");  // true
isValidCurtissAnnotationNomenclatureCode("kc");  // false _(lowercase)_
```

#### `formatCANAnnotation(options)`

**New!** Formats a CAN annotation according to proper CAN formatting rules. Returns structured parts for flexible rendering.

**Parameters:**
- `code` (required): The CAN code (e.g., `"KC"`, `"Q"`, `"E"`)
- `emphasizer` (optional): **ONE** CAN Emphasizer (`"+"`, `"-"`, or `"*"`) — you can ONLY use one Emphasizer per annotation, never multiple
- `numOccurrences` (optional): A counter/tracker for counting patterns (see explanation below)
- `note` (optional): Text note or commentary

**What is `numOccurrences`?**

The `numOccurrences` parameter is an optional counter for **pattern-specific counting** — tracking occurrences of the **same annotation type**. When provided, it displays as `[N]` to the left of the annotation.

**Common uses:**
- **Count analogies** in a chapter: `[1] (AN)`, `[2] (AN)`, `[3] (AN)` = "1st, 2nd, 3rd analogy found"
- **Track character moments** in a novel: `[1] (CH)`, `[2] (CH)`, `[5] (CH)` = "1st, 2nd, 5th character development moment"
- **Number quotes** on a page: `[1] (Q)`, `[2] (Q)`, `[3] (Q)` = "1st, 2nd, 3rd quote on this page"
- **Sequence evidence** in a paper: `[1] (E)`, `[2] (E)`, `[3] (E)` = "1st, 2nd, 3rd piece of evidence"

**Note:** `numOccurrences` is for tracking occurrences of the **same code type**, not for numbering all annotations sequentially. If you need to number all annotations regardless of type, implement that tracking separately in your application.

```typescript
// Example: Pattern-specific counting (tracking analogies specifically)
let analogyCount = 0;

// First analogy found:
analogyCount++; // 1
formatCANAnnotation({ 
  code: "A",             // Analogy
  numOccurrences: analogyCount,  // Shows "[1]"
  note: "Ship steering as leadership metaphor"
});
// Output: "[1] (A) Ship steering as leadership metaphor"

// Second analogy found:
analogyCount++; // 2
formatCANAnnotation({ 
  code: "A",
  numOccurrences: analogyCount,  // Shows "[2]"
  note: "Garden growth as team building"
});
// Output: "[2] (A) Garden growth as team building"

// Third analogy found:
analogyCount++; // 3
formatCANAnnotation({ 
  code: "A",
  numOccurrences: analogyCount,  // Shows "[3]"
  note: "Chess game as strategic planning"
});
// Output: "[3] (A) Chess game as strategic planning"
```

```typescript
interface FormattedCANAnnotation {
  ascii: {
    circle: string;           // "(KC)" - parentheses ARE the circle
    left: string;             // "[1]" or ""
    right: string;            // "*" or ""
    note: string;             // Note text or ""
    annotation: string;       // Complete: "[1] (KC)* Note"
  };
  graphical: {
    circleContent: CurtissAnnotationNomenclatureCode;  // "KC" - goes INSIDE your circle element
    topLeft: string;          // "[1]" or "" - goes OUTSIDE, top-left
    right: string;            // "*" or "" - goes OUTSIDE, right
    note: string;             // Note text or "" - goes OUTSIDE
  };
  code: CurtissAnnotationNomenclatureCode;  // Raw code for reference (kept at top level)
}

// For text/console output - use ascii.annotation
const formatted = formatCANAnnotation({ code: "KC" });
console.log(formatted.ascii.annotation); // "(KC)"
console.log(formatted.ascii.circle); // "(KC)"

// With all components
const full = formatCANAnnotation({ 
  code: "KC", 
  emphasizer: "*",
  numOccurrences: 1,
  note: "This is critical"
});
console.log(full.ascii.annotation); // "[1] (KC)* This is critical"
```

**⚠️ IMPORTANT: When to use `ascii` vs `graphical`**

```typescript
// ✅ CORRECT: For UI with graphical circles - use `graphical` properties
function renderAnnotationUI(formatted: FormattedCANAnnotation) {
  return (
    <div className="annotation">
      <span className="number">{formatted.graphical.topLeft}</span>
      <div className="circle">{formatted.graphical.circleContent}</div>
      <span className="emphasizer">{formatted.graphical.right}</span>
    </div>
  );
}

// ✅ CORRECT: For text/console output - use `ascii` properties
function renderAnnotationText(formatted: FormattedCANAnnotation) {
  return formatted.ascii.annotation; // "[1] (KC)*"
  // or: formatted.ascii.circle for just the "(KC)" part
}

// ❌ INCORRECT: Don't render ascii.circle inside a circle
function renderAnnotationWrong(formatted: FormattedCANAnnotation) {
  return (
    <div className="circle">{formatted.ascii.circle}</div>  {/* NO! Creates circle around "(KC)" */}
  );
}
```

**Key points:**
- **`ascii.circle`**: Contains `(KC)` - parentheses represent the circle in **text-only** scenarios
- **`graphical.circleContent`**: Contains `KC` - use this when you can render your **own graphical circle**
- **Don't** put `ascii.circle` inside a circle element (redundant: circle around parentheses)
- **Do** use `graphical.circleContent` for UI rendering with CSS/SVG/Canvas circles

### CAN Emphasizer Functions

#### `getCurtissAnnotationNomenclatureEmphasizerByCode(code: string)`

Returns complete CAN Emphasizer object.

```typescript
const emph = getCurtissAnnotationNomenclatureEmphasizerByCode("*");
// { code: "*", name: "Critical", description: "This is really important" }
```

#### `getCurtissAnnotationNomenclatureEmphasizerByName(name: string)`

Looks up CAN Emphasizer by name.

```typescript
const emph = getCurtissAnnotationNomenclatureEmphasizerByName("StrongLike");
// { code: "+", name: "StrongLike", description: "I really like this" }
```

#### `getAllCurtissAnnotationNomenclatureEmphasizers()`

Returns all 3 CAN Emphasizers.

```typescript
const all = getAllCurtissAnnotationNomenclatureEmphasizers();
// [{ code: "+", name: "StrongLike", ... }, { code: "-", ... }, { code: "*", ... }]
```

#### `isValidCurtissAnnotationNomenclatureEmphasizerCode(value: string)`

Type guard for CAN Emphasizer codes.

```typescript
isValidCurtissAnnotationNomenclatureEmphasizerCode("+");  // true
isValidCurtissAnnotationNomenclatureEmphasizerCode("x");  // false
```

### Enums and Objects

#### `CurtissAnnotationNomenclatureCodeEnum` _(TypeScript Enum)_

Type-safe enum for CAN Codes.

```typescript
import { CurtissAnnotationNomenclatureCodeEnum } from "curtiss-annotation-nomenclature";

const code = CurtissAnnotationNomenclatureCodeEnum.KeyConcept; // "KC"
const code2 = CurtissAnnotationNomenclatureCodeEnum.Surprising; // "!"
```

#### `CurtissAnnotationNomenclatureCodeValue` _(Runtime Object)_

Runtime-friendly object mapping names to codes.

```typescript
import { CurtissAnnotationNomenclatureCodeValue } from "curtiss-annotation-nomenclature";

const code = CurtissAnnotationNomenclatureCodeValue.KeyConcept; // "KC"
```

#### `CurtissAnnotationNomenclatureCodes` _(Lookup Object)_

Maps codes to names.

```typescript
import { CurtissAnnotationNomenclatureCodes } from "curtiss-annotation-nomenclature";

const name = CurtissAnnotationNomenclatureCodes["KC"]; // "KeyConcept"
```

#### `CURTISS_ANNOTATION_NOMENCLATURE_CODES` _(Array)_

All 100 codes in order.

```typescript
import { CURTISS_ANNOTATION_NOMENCLATURE_CODES } from "curtiss-annotation-nomenclature";

console.log(CURTISS_ANNOTATION_NOMENCLATURE_CODES); // ["!", "?", "A", "AG", ...]
```

#### `CurtissAnnotationNomenclatureDescriptions` _(Lookup Object)_

Maps codes to descriptions.

```typescript
import { CurtissAnnotationNomenclatureDescriptions } from "curtiss-annotation-nomenclature";

const description = CurtissAnnotationNomenclatureDescriptions["KC"];
// "Key concept - central important concept..."
```

#### `CurtissAnnotationNomenclatureEmphasizerEnum` _(TypeScript Enum)_

Type-safe enum for CAN Emphasizers.

```typescript
import { CurtissAnnotationNomenclatureEmphasizerEnum } from "curtiss-annotation-nomenclature";

const emph = CurtissAnnotationNomenclatureEmphasizerEnum.Critical; // "*"
```

#### `CurtissAnnotationNomenclatureEmphasizerValue` _(Runtime Object)_

Runtime-friendly object mapping names to CAN Emphasizer codes.

```typescript
import { CurtissAnnotationNomenclatureEmphasizerValue } from "curtiss-annotation-nomenclature";

const emph = CurtissAnnotationNomenclatureEmphasizerValue.Critical; // "*"
```

#### `CurtissAnnotationNomenclatureEmphasizers` _(Lookup Object)_

Maps CAN Emphasizer codes to names.

```typescript
import { CurtissAnnotationNomenclatureEmphasizers } from "curtiss-annotation-nomenclature";

const name = CurtissAnnotationNomenclatureEmphasizers["*"]; // "Critical"
```

#### `CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS` _(Array)_

All 3 CAN Emphasizer codes in order.

```typescript
import { CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS } from "curtiss-annotation-nomenclature";

console.log(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS); // ["+", "-", "*"]
```

#### `CurtissAnnotationNomenclatureEmphasizerDescriptions` _(Lookup Object)_

Maps CAN Emphasizer codes to descriptions.

```typescript
import { CurtissAnnotationNomenclatureEmphasizerDescriptions } from "curtiss-annotation-nomenclature";

const description = CurtissAnnotationNomenclatureEmphasizerDescriptions["*"];
// "This is really important"
```

#### `CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO` _(Information Object)_

Contains purpose, recommendation, and usage notes for CAN Emphasizers.

```typescript
import { CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO } from "curtiss-annotation-nomenclature";

console.log(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.purpose);
// "CAN Emphasizers are entirely optional, but exist primarily because..."

console.log(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.recommendation);
// "The primary recommendation is that you only use one CAN Emphasizer per CAN Code.
//  You may change it later if needed."

console.log(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO.note);
// "CAN Emphasizers should be used sparingly - only when you really want to 
//  emphasize something..."
```

**⚠️ CRITICAL:** Remember you should only use **ONE** CAN Emphasizer per annotation. This is a core rule of the CAN system.

#### `CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER` _(Information Object)_

Contains disclaimer text for UI implementation. Use this for informational tooltips _("i" info bubbles)_, alt text, or help documentation to explain that CAN codes mark "noteworthy" content, not necessarily positive or negative content.

```typescript
import { CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER } from "curtiss-annotation-nomenclature";

// For info tooltips/bubbles - full explanation
console.log(CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER.full);
// "These annotations are for indicating 'noteworthy' content, not necessarily 
//  good or bad or likeable content. Sometimes the desire is to note something 
//  because it's weird or otherwise important to remember."

// For compact UI elements - short version
console.log(CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER.short);
// "Noteworthy, not necessarily good or bad"

// Example usage in UI
<Tooltip content={CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER.full}>
  <InfoIcon />
</Tooltip>

// Example usage as alt text
<img src="annotation-icon.png" alt={CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER.short} />
```

**Use cases:**
- Info bubbles/tooltips explaining the annotation system
- Alt text for annotation icons
- Help documentation
- Onboarding flows
- Settings/preferences explanations

#### `CURTISS_ANNOTATION_NOMENCLATURE_VERSION` _(Version String)_

The official CAN _(Curtiss Annotation Nomenclature)_ version that this package implements. This tracks the CAN system version, not the NPM package version.

```typescript
import { CURTISS_ANNOTATION_NOMENCLATURE_VERSION } from "curtiss-annotation-nomenclature";

console.log(CURTISS_ANNOTATION_NOMENCLATURE_VERSION); // "1.0.0"

// Use in your app to display which CAN version you're using
<div>Using CAN v{CURTISS_ANNOTATION_NOMENCLATURE_VERSION}</div>
```

**Important distinction:**
- **`CURTISS_ANNOTATION_NOMENCLATURE_VERSION`**: The CAN system version _(e.g., "1.0.0")_
- **NPM package version**: The NPM package version _(e.g., "1.0.0", "1.0.1", "1.0.2")_

**Why they differ:** The NPM package may receive updates (bug fixes, documentation improvements, TypeScript improvements) without the CAN system itself changing. The `CURTISS_ANNOTATION_NOMENCLATURE_VERSION` only changes when the actual CAN codes, names, or descriptions are updated.

**Example scenario:**
- Package v1.0.0: Implements CAN v1.0.0
- Package v1.0.1: Still implements CAN v1.0.0 _(just a bug fix in the package)_
- Package v1.0.2: Still implements CAN v1.0.0 _(documentation improvement)_
- Package v2.0.0: Now implements CAN v1.1.0 _(CAN system was updated)_

### TypeScript Types

#### `CurtissAnnotationNomenclatureCode`

Union type of all 100 valid codes.

```typescript
import type { CurtissAnnotationNomenclatureCode } from "curtiss-annotation-nomenclature";

function process(code: CurtissAnnotationNomenclatureCode) {
  // code must be one of 100 valid codes
}
```

#### `CurtissAnnotationNomenclatureName`

Union type of all 100 valid annotation names.

```typescript
import type { CurtissAnnotationNomenclatureName } from "curtiss-annotation-nomenclature";

function processByName(name: CurtissAnnotationNomenclatureName) {
  // name must be one of 100 valid names like "KeyConcept", "Surprising", etc.
}
```

#### `CurtissAnnotationNomenclature`

Type for full annotation object.

```typescript
import type { CurtissAnnotationNomenclature } from "curtiss-annotation-nomenclature";

const annotation: CurtissAnnotationNomenclature = {
  code: "KC",
  name: "KeyConcept",
  description: "Key concept - central important concept..."
};
```

#### `CurtissAnnotationNomenclatureEmphasizerCode`

Union type of valid CAN Emphasizer codes _(`"+"`, `"-"`, `"*"`)_.

```typescript
import type { CurtissAnnotationNomenclatureEmphasizerCode } from "curtiss-annotation-nomenclature";

function emphasize(code: CurtissAnnotationNomenclatureEmphasizerCode) {
  // code must be "+", "-", or "*"
}
```

#### `CurtissAnnotationNomenclatureEmphasizerName`

Union type of all 3 valid CAN Emphasizer names.

```typescript
import type { CurtissAnnotationNomenclatureEmphasizerName } from "curtiss-annotation-nomenclature";

function processByName(name: CurtissAnnotationNomenclatureEmphasizerName) {
  // name must be "StrongLike", "StrongDislike", or "Critical"
}
```

#### `CurtissAnnotationNomenclatureEmphasizer`

Type for full CAN Emphasizer object.

```typescript
import type { CurtissAnnotationNomenclatureEmphasizer } from "curtiss-annotation-nomenclature";

const emphasizer: CurtissAnnotationNomenclatureEmphasizer = {
  code: "*",
  name: "Critical",
  description: "This is really important"
};
```

#### `FormattedCANAnnotation`

Type for the return value of `formatCANAnnotation()`. Contains structured parts for rendering in both text and graphical contexts.

```typescript
import type { FormattedCANAnnotation } from "curtiss-annotation-nomenclature";

const formatted: FormattedCANAnnotation = formatCANAnnotation({ 
  code: "KC", 
  emphasizer: "*",
  numOccurrences: 1,
  note: "Important concept"
});

// Use formatted.ascii for text output
console.log(formatted.ascii.annotation); // "[1] (KC)* Important concept"

// Use formatted.graphical for UI rendering
<div className="circle">{formatted.graphical.circleContent}</div>
```

---

## Complete Usage Example

This comprehensive example demonstrates how to build a book annotation system using CAN codes, Emphasizers, and proper formatting for both text and HTML output.

```typescript
import {
  CurtissAnnotationNomenclatureCodeEnum,
  CurtissAnnotationNomenclatureCode,
  getCurtissAnnotationNomenclatureCode,
  CurtissAnnotationNomenclatureEmphasizerEnum,
  CurtissAnnotationNomenclatureEmphasizerCode,
  formatCANAnnotation,
} from "curtiss-annotation-nomenclature";

/**
 * Example: A simple book annotation system using CAN
 * 
 * This demonstrates how to:
 * - Store annotations grouped by page number
 * - Use CAN codes and Emphasizers
 * - Format annotations for both text and HTML output
 * - Track annotation occurrences with numOccurrences
 */
class BookAnnotator {
  // Store all annotations grouped by page number
  private annotations: Map<
    number,
    {
      code: CurtissAnnotationNomenclatureCode;
      emphasizer?: CurtissAnnotationNomenclatureEmphasizerCode;
      numOccurrences?: number;
      note: string;
    }[]
  > = new Map();

  /**
   * Add an annotation to a specific page
   * @param page - Page number
   * @param code - CAN code (e.g., "KC", "Q", "E")
   * @param note - Your note/commentary
   * @param options - Optional emphasizer and occurrence counter
   */
  addAnnotation(
    page: number,
    code: CurtissAnnotationNomenclatureCode,
    note: string,
    options?: {
      emphasizer?: CurtissAnnotationNomenclatureEmphasizerCode;
      numOccurrences?: number;
    }
  ) {
    const existing = this.annotations.get(page) || [];
    existing.push({
      code,
      emphasizer: options?.emphasizer,
      numOccurrences: options?.numOccurrences,
      note,
    });
    this.annotations.set(page, existing);
  }

  /**
   * Render all annotations for a page as plain text
   * Uses `ascii` properties for text-based output
   */
  renderPageAnnotations(page: number): string {
    const annotations = this.annotations.get(page) || [];
    let output = `Page ${page}:\n\n`;

    annotations.forEach(({ code, emphasizer, numOccurrences, note }) => {
      const details = getCurtissAnnotationNomenclatureCode(code);
      
      // Use formatCANAnnotation for proper CAN formatting
      const formatted = formatCANAnnotation({ code, emphasizer, numOccurrences, note });
      
      // For text output, use ascii.annotation
      // This gives us: "[1] (KC)* This is critical"
      output += `  ${formatted.ascii.annotation}\n`;
      output += `  (${details?.name})\n\n`;
    });

    return output;
  }
  
  /**
   * Render all annotations for a page as HTML
   * Uses `graphical` properties for UI rendering
   */
  renderPageAnnotationsHTML(page: number): string {
    const annotations = this.annotations.get(page) || [];
    let output = `<div class="page"><h3>Page ${page}</h3>`;

    annotations.forEach(({ code, emphasizer, numOccurrences, note }) => {
      const details = getCurtissAnnotationNomenclatureCode(code);
      
      // Use formatCANAnnotation for proper CAN formatting
      const formatted = formatCANAnnotation({ code, emphasizer, numOccurrences, note });
      
      // For UI/HTML, use graphical properties
      output += `<div class="annotation">`;
      
      // numOccurrences goes top-left, OUTSIDE the circle: [1]
      if (formatted.graphical.topLeft) {
        output += `<span class="number">${formatted.graphical.topLeft}</span>`;
      }
      
      // ✅ CORRECT: Use formatted.graphical.circleContent for UI circle rendering
      // This gives us just "KC" (not "(KC)") to go INSIDE your circle element
      output += `<div class="circle">${formatted.graphical.circleContent}</div>`;
      
      // Emphasizer goes right, OUTSIDE the circle: *
      if (formatted.graphical.right) {
        output += `<span class="emphasizer">${formatted.graphical.right}</span>`;
      }
      
      // Note goes to the right of everything
      if (formatted.graphical.note) {
        output += `<div class="note">${formatted.graphical.note}</div>`;
      }
      
      // Show the full name for reference
      output += `<span class="name">(${details?.name})</span>`;
      output += `</div>`;
    });

    output += `</div>`;
    return output;
  }
}

// ============================================
// Usage Example
// ============================================

const book = new BookAnnotator();

// Note: numOccurrences is used for pattern-specific counting (tracking the same annotation type).
// In this example, we track Key Concepts separately from other annotation types.

// Example 1: Critical Key Concept (1st Key Concept in the book)
book.addAnnotation(
  42,
  CurtissAnnotationNomenclatureCodeEnum.KeyConcept,
  "This is the central thesis of the entire work",
  {
    emphasizer: CurtissAnnotationNomenclatureEmphasizerEnum.Critical,
    numOccurrences: 1,  // 1st Key Concept
  }
);

// Example 2: QuoteWorthy (no counter - not tracking quotes in this example)
book.addAnnotation(
  42,
  CurtissAnnotationNomenclatureCodeEnum.QuoteWorthy,
  "Beautiful phrasing here"
  // No numOccurrences - not tracking quotes
);

// Example 3: Another Key Concept (2nd Key Concept in the book)
book.addAnnotation(
  55,
  CurtissAnnotationNomenclatureCodeEnum.KeyConcept,
  "Author's secondary argument",
  { numOccurrences: 2 }  // 2nd Key Concept
);

// Example 4: Flaw in Reasoning that we strongly dislike (1st Flaw in this book)
book.addAnnotation(
  98,
  CurtissAnnotationNomenclatureCodeEnum.FlawInReasoning,
  "Major logical fallacy - assumes causation",
  {
    emphasizer: CurtissAnnotationNomenclatureEmphasizerEnum.StrongDislike,
    numOccurrences: 1,  // 1st Flaw in Reasoning
  }
);

console.log(book.renderPageAnnotations(42));
// Output:
// Page 42:
//
//   [1] (KC)*
//   "This is the central thesis of the entire work"
//   (KeyConcept)
//
//   (Q)
//   "Beautiful phrasing here"
//   (QuoteWorthy)
```

---

## Case Sensitivity

**CAN codes are case-sensitive by design.** This ensures consistency and precision.

```typescript
import { isValidCurtissAnnotationNomenclatureCode } from "curtiss-annotation-nomenclature";

// ✅ Valid
isValidCurtissAnnotationNomenclatureCode("KC");  // true
isValidCurtissAnnotationNomenclatureCode("!");   // true

// ❌ Invalid
isValidCurtissAnnotationNomenclatureCode("kc");  // false
isValidCurtissAnnotationNomenclatureCode("Kc");  // false
```

**Why?**
- **Consistency**: Everyone uses exact same codes
- **Searchability**: Easier to find specific annotations
- **Precision**: No ambiguity

---

## Immutability

**All exported data structures are deeply frozen** using `Object.freeze()` to prevent accidental mutations.

```typescript
import { CurtissAnnotationNomenclatureCodeValue, CURTISS_ANNOTATION_NOMENCLATURE_CODES } from "curtiss-annotation-nomenclature";

// These throw errors in strict mode:
CurtissAnnotationNomenclatureCodeValue.Surprising = "HACK"; // ❌ Error
CURTISS_ANNOTATION_NOMENCLATURE_CODES[0] = "MODIFIED"; // ❌ Error
CURTISS_ANNOTATION_NOMENCLATURE_CODES.push("NEW"); // ❌ Error
```

**Why?**
- **Single source of truth**: Data cannot be corrupted
- **Thread safety**: Safe across async operations
- **Predictability**: Consistent behavior everywhere

---

## All Available Annotations

This package includes **100 annotations** across multiple categories:

**Evaluation**: `!` _(Surprising)_, `?` _(Question)_, `X` _(Disagree)_, `AG` _(Agree)_, `CF` _(Confusing)_

**Structure**: `C` _(Claim)_, `E` _(Evidence)_, `AR` _(ArgumentStructure)_, `CA` _(Counterargument)_, `CE` _(CauseEffect)_, `CN` _(Conclusion)_

**Content**: `KC` _(KeyConcept)_, `D` _(Definition)_, `EX` _(Example)_, `PR` _(Principle)_

**Literary**: `M` _(Metaphor)_, `A` _(Analogy)_, `AL` _(Allegory)_, `FH` _(Foreshadowing)_, `CH` _(CharacterInsight)_, `SY` _(Symbolism)_

**Reference**: `V` _(VerseReference)_, `CR` _(CrossReference)_, `FN` _(Footnote)_

**Action**: `AT` _(ActionTask)_, `R` _(Research)_, `TS` _(TestStudyMaterial)_

**Social/Political**: `AO` _(Abolition)_, `OP` _(Oppression)_, `RA` _(Resistance)_, `RV` _(Recovery)_, `IX` _(Intersectionality)_

**Emotional**: `J` _(Beautiful)_, `H` _(Humorous)_, `DK` _(Dark)_, `JY` _(Joy)_, `RG` _(Rage)_

**Technical**: `TC` _(TechnologyConcept)_, `TE` _(TechnicalExplanation)_, `SO` _(SourceCodeExample)_

**Philosophy/Logic**: `TH` _(ThoughtExperiment)_, `CT` _(Critique)_

...and many more! Use `getAllCurtissAnnotationNomenclatureCodes()` to see all 100 codes or refer to the [Official CAN Guide](https://github.com/isaacwashere/curtiss-annotation-nomenclature-documentation/blob/main/CAN_Guide.pdf).

---

## Relationship to Official CAN Guide

### Source of Truth

**[The Official CAN Guide](https://github.com/isaacwashere/curtiss-annotation-nomenclature-documentation/blob/main/CAN_Guide.pdf)** is the authoritative source of truth for the Curtiss Annotation Nomenclature system.

### What This Package Provides

This NPM package is an **implementation** of the official specification, providing:
- TypeScript/JavaScript access to the 100 CAN codes
- Type-safe enums and interfaces
- Validation functions
- Formatting utilities
- Developer-friendly API

### What the Official Guide Provides

The official CAN Guide is the definitive reference for:
- **Official definitions** of all 100 CAN codes
- **Philosophy and methodology** behind the system
- **Best practices** for using CAN codes
- **Examples and case studies** across different domains
- **Future evolution** of the system

### Version Alignment

- **This package version**: `1.0.0` _(NPM package version)_
- **Official CAN Guide version**: `1.0.0` _(via `CURTISS_ANNOTATION_NOMENCLATURE_VERSION` constant)_

The `CURTISS_ANNOTATION_NOMENCLATURE_VERSION` constant in this package indicates which version of the official CAN Guide is implemented.

### When in Doubt

If there's any discrepancy or question about the meaning, usage, or official definition of a CAN code, **the official CAN Guide is the authoritative source**. This package aims to faithfully implement that specification in TypeScript/JavaScript.

---

## Contributing

Suggestions for improvements to this package are welcome! Please open an issue to discuss before submitting PRs.

**Important Notes**:

1. **Source of Truth**: [The Official CAN Guide](https://github.com/isaacwashere/curtiss-annotation-nomenclature-documentation/blob/main/CAN_Guide.pdf) is the authoritative specification for the CAN system. This package implements that specification.

2. **Code Changes**: The 100 CAN codes, their names, and descriptions are defined by the official guide. Changes to the codes themselves should be proposed to the [official guide repository](https://github.com/isaacwashere/curtiss-annotation-nomenclature-documentation/issues/new) first, not to this package.

3. **Package Improvements**: Contributions related to TypeScript types, utilities, documentation, tests, and package functionality are welcome here.

4. **New CAN Codes**: The system is designed to have exactly 100 codes. If proposing new codes, this must be done through the [official CAN Guide repository](https://github.com/isaacwashere/curtiss-annotation-nomenclature-documentation/issues/new), and you should indicate which existing code(s) could be replaced/removed _(and why)_.

---

## License

MIT License - see LICENSE file for details.

**Created by Isaac Curtiss** for systematic book annotation and knowledge synthesis.

---

## Quick Reference Table

| What you need | Import this |
|---------------|-------------|
| **Annotations - Enums & Objects** |
| TypeScript enum for codes | `CurtissAnnotationNomenclatureCodeEnum` |
| Runtime object for codes | `CurtissAnnotationNomenclatureCodeValue` |
| Lookup: code → name | `CurtissAnnotationNomenclatureCodes` |
| Lookup: code → description | `CurtissAnnotationNomenclatureDescriptions` |
| All 100 codes as array | `CURTISS_ANNOTATION_NOMENCLATURE_CODES` |
| **Annotations - Functions** |
| Get annotation by code | `getCurtissAnnotationNomenclatureCode(code)` |
| Get annotation by name | `getCurtissAnnotationNomenclatureCodeByName(name)` |
| Get all annotations | `getAllCurtissAnnotationNomenclatureCodes()` |
| Validate a code | `isValidCurtissAnnotationNomenclatureCode(value)` |
| **Annotations - Types** |
| TypeScript type for codes | `CurtissAnnotationNomenclatureCode` |
| TypeScript type for names | `CurtissAnnotationNomenclatureName` |
| TypeScript type for annotation object | `CurtissAnnotationNomenclature` |
| **CAN Emphasizers - Enums & Objects** |
| TypeScript enum for CAN Emphasizers | `CurtissAnnotationNomenclatureEmphasizerEnum` |
| Runtime object for CAN Emphasizers | `CurtissAnnotationNomenclatureEmphasizerValue` |
| Lookup: emphasizer code → name | `CurtissAnnotationNomenclatureEmphasizers` |
| Lookup: emphasizer code → description | `CurtissAnnotationNomenclatureEmphasizerDescriptions` |
| All 3 CAN Emphasizer codes as array | `CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS` |
| **CAN Emphasizers - Functions** |
| Get CAN Emphasizer by code | `getCurtissAnnotationNomenclatureEmphasizerByCode(code)` |
| Get CAN Emphasizer by name | `getCurtissAnnotationNomenclatureEmphasizerByName(name)` |
| Get all CAN Emphasizers | `getAllCurtissAnnotationNomenclatureEmphasizers()` |
| Validate CAN Emphasizer code | `isValidCurtissAnnotationNomenclatureEmphasizerCode(value)` |
| **CAN Emphasizers - Types** |
| TypeScript type for CAN Emphasizer codes | `CurtissAnnotationNomenclatureEmphasizerCode` |
| TypeScript type for CAN Emphasizer names | `CurtissAnnotationNomenclatureEmphasizerName` |
| TypeScript type for CAN Emphasizer object | `CurtissAnnotationNomenclatureEmphasizer` |
| **Formatting & Metadata** |
| Format annotation with proper rules | `formatCANAnnotation(options)` |
| CAN Emphasizer info object | `CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO` |
| Disclaimer text (for UI tooltips/alt text) | `CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER` |
| CAN system version | `CURTISS_ANNOTATION_NOMENCLATURE_VERSION` |

---

**Happy Reading and Happy Annotating! 📖✨**
