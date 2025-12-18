/**
 * Version
 */
export const CURTISS_ANNOTATION_NOMENCLATURE_VERSION = "1.0.0";

/**
 * Deep freeze helper - recursively freezes objects, arrays, and Maps
 */
function deepFreeze<T>(obj: T): T {
  // Freeze the object itself
  Object.freeze(obj);

  // Freeze all properties
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });

  // If it's a Map, freeze its entries
  if (obj instanceof Map) {
    obj.forEach((value) => {
      if (value && typeof value === "object" && !Object.isFrozen(value)) {
        deepFreeze(value);
      }
    });
  }

  return obj;
}

/**
 * Curtiss Annotation Nomenclature _(CAN)_
 *
 * Single source of truth for annotation codes and descriptions.
 * All other exports are automatically derived from this array.
 *
 */
const CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL = [
  { code: "!", name: "Surprising", description: "Surprising or unexpected" },
  {
    code: "?",
    name: "Question",
    description:
      "Question validity or accuracy (doubt correctness, not comprehension - use CF if confused)",
  },
  {
    code: "A",
    name: "Analogy",
    description: "Noteworthy (i.e. good, bad, peculiar etc.) analogy",
  },
  { code: "AG", name: "Agree", description: "Agree with this" },
  {
    code: "AL",
    name: "Allegory",
    description: "Allegory - entire story has symbolic deeper meaning",
  },
  {
    code: "AO",
    name: "Abolition",
    description:
      "Abolition - abolitionist thinking, dismantling oppressive systems",
  },
  {
    code: "AP",
    name: "Application",
    description:
      "Application - how to apply concept in practice (includes pastoral application)",
  },
  {
    code: "AR",
    name: "ArgumentStructure",
    description:
      "Argument structure or logical progression - how argument is built (not the claim itself - use C for that)",
  },
  {
    code: "AS",
    name: "Assumption",
    description:
      "Assumption - stated or unstated, foundational or questionable (includes premises, limitations, caveats)",
  },
  {
    code: "AT",
    name: "ActionTask",
    description:
      "Action/Task/To Do - something you want to remember to do or implement",
  },
  {
    code: "AU",
    name: "Allusion",
    description: "Allusion - indirect reference to other works or events",
  },
  {
    code: "B",
    name: "Breakthrough",
    description:
      "Breakthrough - author's major insight or discovery (not yours - use IN for that)",
  },
  {
    code: "BG",
    name: "BackgroundContext",
    description:
      "Background context - historical, cultural, technical, geographical (includes community, diaspora themes)",
  },
  {
    code: "BV",
    name: "Behavior",
    description:
      "Behavior - behavioral patterns, behavioral economics, habits, actions (psychology, economics, sociology)",
  },
  { code: "C", name: "Claim", description: "Claim or argument being made" },
  {
    code: "CA",
    name: "Counterargument",
    description:
      "Counterargument - addresses opposing views (includes dissents, alternative positions)",
  },
  {
    code: "CB",
    name: "Callback",
    description: "Callback - references earlier moment in text",
  },
  {
    code: "CE",
    name: "CauseEffect",
    description: "Cause and effect relationship",
  },
  {
    code: "CF",
    name: "Confusing",
    description:
      "Confusing or unclear (comprehension issue, not doubt - use ? if questioning accuracy)",
  },
  {
    code: "CH",
    name: "CharacterInsight",
    description:
      "Character insight or development (works for biographical subjects, note 'first appearance' for introductions)",
  },
  {
    code: "CN",
    name: "Conclusion",
    description: "Conclusion - main takeaway or final conclusion",
  },
  {
    code: "CO",
    name: "Connect",
    description:
      "Connect to another book, current events, or personal experience",
  },
  {
    code: "CR",
    name: "CrossReference",
    description:
      "Cross-reference - author explicitly cites another passage, book, or verse (includes source quality notes)",
  },
  {
    code: "CT",
    name: "Critique",
    description:
      "Critique - author critiques another idea, philosopher, or theory",
  },
  {
    code: "CX",
    name: "ContextCrucial",
    description:
      "Context crucial - requires cultural or historical background to understand",
  },
  {
    code: "D",
    name: "Definition",
    description: "Definition - term explicitly defined",
  },
  {
    code: "DI",
    name: "Dialogue",
    description:
      "Dialogue - particularly noteworthy (i.e. good, bad, peculiar etc.) character speech",
  },
  {
    code: "DK",
    name: "Dark",
    description:
      "Dark, distressing - depressing, sad, bleak, traumatic, grief (all heavy negative affect)",
  },
  {
    code: "DL",
    name: "Dialectic",
    description:
      "Dialectic - dialectical method, Socratic questioning, thesis-antithesis-synthesis",
  },
  {
    code: "DO",
    name: "Doctrine",
    description:
      "Doctrine - doctrinal position (includes ecclesiology, eschatology)",
  },
  {
    code: "DT",
    name: "DateTimeline",
    description:
      "Date or timeline marker - important chronological information",
  },
  {
    code: "E",
    name: "Evidence",
    description:
      "Evidence or data - supports argument (includes statistics, qualitative evidence, all data types)",
  },
  {
    code: "ER",
    name: "Erasure",
    description:
      "Erasure or silence - historical erasure, archival silence, what's missing",
  },
  {
    code: "ET",
    name: "EthicalTeaching",
    description: "Ethical teaching - moral instruction (works in philosophy)",
  },
  {
    code: "EX",
    name: "Example",
    description:
      "Example or illustration - clarifying example (pedagogical purpose)",
  },
  {
    code: "FH",
    name: "Foreshadowing",
    description:
      "Foreshadowing - hints at future events (works in narrative nonfiction)",
  },
  {
    code: "FL",
    name: "FlawInReasoning",
    description:
      "Flaw in reasoning - logical fallacy, methodology error, code bug (includes contradictions, inconsistencies)",
  },
  {
    code: "FN",
    name: "Footnote",
    description:
      "Footnote or note - important footnote, endnote, or marginal note",
  },
  {
    code: "FO",
    name: "FormulaEquation",
    description:
      "Formula or equation - important to know (financial, scientific, mathematical)",
  },
  {
    code: "FR",
    name: "FramingArgument",
    description: "Framing argument - sets up later argument",
  },
  { code: "H", name: "Humorous", description: "Humorous or funny" },
  {
    code: "HF",
    name: "HistoricalFact",
    description: "Historical fact - factual event or date",
  },
  {
    code: "HG",
    name: "Hegemony",
    description:
      "Hegemony - dominant ideology or power structure (white supremacy, patriarchy, heteronormativity, etc.)",
  },
  { code: "HY", name: "Hyperbole", description: "Hyperbole or exaggeration" },
  { code: "I", name: "Ironic", description: "Ironic" },
  {
    code: "IN",
    name: "Insight",
    description:
      "Insight - your personal realization (not author's discovery - use B for that)",
  },
  {
    code: "IS",
    name: "Institution",
    description:
      "Institution or structure - institutional racism, structures (includes coloniality, surveillance)",
  },
  {
    code: "IX",
    name: "Intersectionality",
    description:
      "Intersectionality - race, gender, class, sexuality intersection (includes embodiment themes)",
  },
  { code: "J", name: "Beautiful", description: "Beautiful or moving" },
  {
    code: "JX",
    name: "Juxtaposition",
    description:
      "Juxtaposition or contrast - comparing opposites (works for theoretical comparisons)",
  },
  {
    code: "JY",
    name: "Joy",
    description:
      "Joy or pleasure - joy, pleasure, life-making (works across contexts)",
  },
  {
    code: "KC",
    name: "KeyConcept",
    description:
      "Key concept - central important concept (use for major policies, frameworks)",
  },
  {
    code: "LG",
    name: "LawLegal",
    description:
      "Law or legal - legal structures, legislation, case law, treaties (includes international agreements)",
  },
  {
    code: "LN",
    name: "Language",
    description:
      "Language - any language word or grammar note (Greek, Hebrew, French, Spanish, Arabic, etc.)",
  },
  {
    code: "M",
    name: "Metaphor",
    description:
      "Metaphor - noteworthy (i.e. good, bad, peculiar etc.) metaphor or direct comparison",
  },
  {
    code: "MI",
    name: "MassiveImplications",
    description:
      "Massive implications - far-reaching consequences or importance",
  },
  {
    code: "MO",
    name: "ModelFramework",
    description:
      "Model or framework - theoretical model, diagram, organizational framework (business, scientific, conceptual)",
  },
  {
    code: "NL",
    name: "Neologism",
    description:
      "Neologism - invented term, creative wordplay, or technical redefinition",
  },
  {
    code: "NT",
    name: "CounterNarrative",
    description: "Counter-narrative - challenges dominant narrative",
  },
  {
    code: "OP",
    name: "Oppression",
    description:
      "Oppression - theorization of oppression (anti-Blackness, sexism, ableism, homophobia, etc.)",
  },
  {
    code: "PA",
    name: "Pattern",
    description: "Pattern - recurring theme, design pattern, or motif",
  },
  {
    code: "PF",
    name: "ProofDerivation",
    description: "Proof or derivation - mathematical or logical proof step",
  },
  {
    code: "PP",
    name: "Perspective",
    description:
      "Perspective or point of view - whose narrative or viewpoint (includes standpoint epistemology)",
  },
  {
    code: "PR",
    name: "Principle",
    description:
      "Principle - foundational rule or teaching (actionable, works across disciplines)",
  },
  {
    code: "PX",
    name: "Paradox",
    description:
      "Paradox or mystery - contradictory statement revealing truth (logical paradox or theological mystery)",
  },
  {
    code: "Q",
    name: "QuoteWorthy",
    description:
      "Quotable - a noteworthy (i.e. good, bad, peculiar etc.) phrase that you would use (with or without some variation) in your own writing, everyday life, or just want to remember this",
  },
  {
    code: "R",
    name: "Research",
    description:
      "Research, review, or link - return to this for any reason (note: external research, reread, or topic link)",
  },
  {
    code: "RA",
    name: "Resistance",
    description:
      "Resistance or agency - acts of resistance, refusal, fugitivity, escape",
  },
  {
    code: "RG",
    name: "Rage",
    description:
      "Rage or anger - righteous anger, political anger (works in memoir, biography)",
  },
  {
    code: "RH",
    name: "RhetoricalDevice",
    description:
      "Rhetorical device - effective persuasion technique (catch-all for devices without specific codes)",
  },
  {
    code: "RK",
    name: "Risk",
    description:
      "Risk - risk analysis, risk/reward, risk management (finance, business, psychology, medicine)",
  },
  {
    code: "RV",
    name: "Recovery",
    description: "Recovery - historical recovery or reclamation",
  },
  {
    code: "S",
    name: "Setting",
    description:
      "Setting or environment building - physical or atmospheric (historical setting in nonfiction)",
  },
  {
    code: "SB",
    name: "Sidebar",
    description:
      "Sidebar or box - key information in sidebar, callout, or boxed text",
  },
  {
    code: "SC",
    name: "SchoolOfThought",
    description:
      "School of thought - philosophical tradition, political ideology (Stoic, Marxist, etc.)",
  },
  {
    code: "SO",
    name: "SourceCodeExample",
    description:
      "Source code example - particularly noteworthy (i.e. good, bad, peculiar etc.) implementation",
  },
  {
    code: "SP",
    name: "Speculation",
    description:
      "Speculation or imagination - what-if, critical fabulation, radical imagination, alternative futures",
  },
  {
    code: "SS",
    name: "SoundStyle",
    description:
      "Sound or style technique - alliteration, rhythm, sentence structure (includes epic conventions)",
  },
  {
    code: "ST",
    name: "Story",
    description:
      "Story - retellable narrative (includes personal anecdotes, parables, case studies, illustrations)",
  },
  {
    code: "SU",
    name: "SummarySynthesis",
    description: "Summary or synthesis - author compresses complex idea",
  },
  {
    code: "SY",
    name: "Symbolic",
    description:
      "Symbolic or figurative - non-literal interpretation (includes typology, allegory interpretation)",
  },
  {
    code: "T",
    name: "Thematic",
    description: "Thematic statement - central theme or thematic claim",
  },
  {
    code: "TC",
    name: "TechnologyConcept",
    description:
      "Technology or concept - interesting tech or scientific idea (even if not central)",
  },
  {
    code: "TE",
    name: "TechnicalExplanation",
    description:
      "Technical explanation - algorithm, architecture, process, philosophical system (broadly technical)",
  },
  {
    code: "TH",
    name: "ThoughtExperiment",
    description:
      "Thought experiment - philosophical hypothetical or gedankenexperiment",
  },
  {
    code: "TM",
    name: "Terminology",
    description:
      "Terminology - specific technical term used (not necessarily defined - use D for definitions)",
  },
  {
    code: "TP",
    name: "TurningPoint",
    description:
      "Turning point or pivotal moment (works for arguments and narratives, note 'evolution' for gradual shifts)",
  },
  {
    code: "TS",
    name: "TestStudyMaterial",
    description: "Test or study material - likely exam material, must know",
  },
  {
    code: "TV",
    name: "TextVariant",
    description: "Text variant - different manuscript readings",
  },
  {
    code: "TX",
    name: "TranslationIssue",
    description: "Translation issue - English obscures original meaning",
  },
  {
    code: "V",
    name: "VerseReference",
    description: "Verse reference - important scripture citation",
  },
  {
    code: "VI",
    name: "VividImagery",
    description:
      "Vivid imagery - striking visual description (any subject, not just settings)",
  },
  {
    code: "VL",
    name: "Violence",
    description:
      "Violence - structural violence or state violence (works in political science, history)",
  },
  {
    code: "VZ",
    name: "Visual",
    description: "Visual - important diagram, chart, graph, table, or image",
  },
  {
    code: "W",
    name: "LovedWording",
    description: "Loved the wording - excellent word choice or phrasing",
  },
  {
    code: "WB",
    name: "WorldBuilding",
    description: "WorldBuilding - creating unique fictional universe rules",
  },
  {
    code: "WS",
    name: "WordStudy",
    description: "Word study - etymology, semantic range, nuance",
  },
  {
    code: "WT",
    name: "WitnessingTestimony",
    description:
      "Witnessing or testimony - first-person accounts with evidentiary weight",
  },
  {
    code: "WV",
    name: "WorldviewRevealed",
    description:
      "Worldview revealed - author's fundamental beliefs showing through",
  },
  { code: "X", name: "Disagree", description: "Disagree with this" },
] as const;

// Deep freeze the annotations array and all its objects
deepFreeze(CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL);

const CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL = [
  { code: "+", name: "StrongLike", description: "I really like this" },
  { code: "-", name: "StrongDislike", description: "I really don't like this" },
  { code: "*", name: "Critical", description: "This is really important" },
] as const;

// Deep freeze the emphasizers array and all its objects
deepFreeze(CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL);

/**
 * All the annotations are for noting "noteworthy" content, not necessarily good or bad or likeable content. Sometimes the desire is to
 * note something because it's weird, troubling, disturbing, or otherwise important to remember. Feel free to include this disclaimer in your
 * own usage.
 */
export const CURTISS_ANNOTATION_NOMENCLATURE_DISCLAIMER = Object.freeze({
  full: "These annotations are for indicating 'noteworthy' content, not necessarily good or bad or likeable content. Sometimes the desire is to note something because it's weird or otherwise important to remember.",
  short: "Noteworthy, not necessarily good or bad",
} as const);

/**
 * ⚠️ CRITICAL: Only ONE CAN Emphasizer per annotation
 * 
 * Information about CAN Emphasizers including their purpose, usage recommendations, and rules.
 * 
 * RULE: You can NEVER use multiple CAN Emphasizers on the same annotation. Each annotation
 * may have zero or one Emphasizer — choose the most appropriate one. Examples like "(KC)*+"
 * or "(KC)-*" are INVALID and should never be used.
 */
export const CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_INFO = Object.freeze({
  purpose:
    "CAN Emphasizers are entirely optional, but exist primarily because CAN Codes are often meant to communicate something only noteworthy. This means there is a gap that can be solved by adding a CAN Emphasizer to eliminate the necessity for verbose comments.",
  recommendation:
    "The primary recommendation is that you only use one CAN Emphasizer per CAN Code. You may change it later if needed.",
  note: "CAN Emphasizers should be used sparingly - only when you really want to emphasize something. Use them to communicate a 'strong' dislike, 'strong' like, or 'strong' belief that something is important.",
} as const);

/**
 * Build all lookup structures in a single pass for efficiency
 */
const CURTISS_ANNOTATION_NOMENCLATURE_LOOKUPS = (() => {
  const enumObj: Record<string, string> = {};
  const codes: Record<string, string> = {};
  const descriptions: Record<string, string> = {};
  const codeArray: string[] = [];
  const codeMap = new Map<string, (typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]>();
  const nameMap = new Map<string, (typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]>();

  for (const annotation of CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL) {
    enumObj[annotation.name] = annotation.code;
    codes[annotation.code] = annotation.name;
    descriptions[annotation.code] = annotation.description;
    codeArray.push(annotation.code);
    codeMap.set(annotation.code, annotation);
    nameMap.set(annotation.name, annotation);
  }

  // Deep freeze all lookup structures
  return deepFreeze({ enumObj, codes, descriptions, codeArray, codeMap, nameMap });
})();

/**
 * Build all CAN Emphasizer lookup structures
 */
const CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_LOOKUPS = (() => {
  const enumObj: Record<string, string> = {};
  const codes: Record<string, string> = {};
  const descriptions: Record<string, string> = {};
  const codeArray: string[] = [];
  const codeMap = new Map<string, (typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]>();
  const nameMap = new Map<string, (typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]>();

  for (const emphasizer of CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL) {
    enumObj[emphasizer.name] = emphasizer.code;
    codes[emphasizer.code] = emphasizer.name;
    descriptions[emphasizer.code] = emphasizer.description;
    codeArray.push(emphasizer.code);
    codeMap.set(emphasizer.code, emphasizer);
    nameMap.set(emphasizer.name, emphasizer);
  }

  // Deep freeze all lookup structures
  return deepFreeze({ enumObj, codes, descriptions, codeArray, codeMap, nameMap });
})();

/**
 * TypeScript enum for strictest type checking
 */
export enum CurtissAnnotationNomenclatureCodeEnum {
  Surprising = "!",
  Question = "?",
  Analogy = "A",
  Agree = "AG",
  Allegory = "AL",
  Abolition = "AO",
  Application = "AP",
  ArgumentStructure = "AR",
  Assumption = "AS",
  ActionTask = "AT",
  Allusion = "AU",
  Breakthrough = "B",
  BackgroundContext = "BG",
  Behavior = "BV",
  Claim = "C",
  Counterargument = "CA",
  Callback = "CB",
  CauseEffect = "CE",
  Confusing = "CF",
  CharacterInsight = "CH",
  Conclusion = "CN",
  Connect = "CO",
  CrossReference = "CR",
  Critique = "CT",
  ContextCrucial = "CX",
  Definition = "D",
  Dialogue = "DI",
  Dark = "DK",
  Dialectic = "DL",
  Doctrine = "DO",
  DateTimeline = "DT",
  Evidence = "E",
  Erasure = "ER",
  EthicalTeaching = "ET",
  Example = "EX",
  Foreshadowing = "FH",
  FlawInReasoning = "FL",
  Footnote = "FN",
  FormulaEquation = "FO",
  FramingArgument = "FR",
  Humorous = "H",
  HistoricalFact = "HF",
  Hegemony = "HG",
  Hyperbole = "HY",
  Ironic = "I",
  Insight = "IN",
  Institution = "IS",
  Intersectionality = "IX",
  Beautiful = "J",
  Juxtaposition = "JX",
  Joy = "JY",
  KeyConcept = "KC",
  LawLegal = "LG",
  Language = "LN",
  Metaphor = "M",
  MassiveImplications = "MI",
  ModelFramework = "MO",
  Neologism = "NL",
  CounterNarrative = "NT",
  Oppression = "OP",
  Pattern = "PA",
  ProofDerivation = "PF",
  Perspective = "PP",
  Principle = "PR",
  Paradox = "PX",
  QuoteWorthy = "Q",
  Research = "R",
  Resistance = "RA",
  Rage = "RG",
  RhetoricalDevice = "RH",
  Risk = "RK",
  Recovery = "RV",
  Setting = "S",
  Sidebar = "SB",
  SchoolOfThought = "SC",
  SourceCodeExample = "SO",
  Speculation = "SP",
  SoundStyle = "SS",
  Story = "ST",
  SummarySynthesis = "SU",
  Symbolic = "SY",
  Thematic = "T",
  TechnologyConcept = "TC",
  TechnicalExplanation = "TE",
  ThoughtExperiment = "TH",
  Terminology = "TM",
  TurningPoint = "TP",
  TestStudyMaterial = "TS",
  TextVariant = "TV",
  TranslationIssue = "TX",
  VerseReference = "V",
  VividImagery = "VI",
  Violence = "VL",
  Visual = "VZ",
  LovedWording = "W",
  WorldBuilding = "WB",
  WordStudy = "WS",
  WitnessingTestimony = "WT",
  WorldviewRevealed = "WV",
  Disagree = "X",
}

/**
 * Enum-like object for accessing CAN codes: CurtissAnnotationNomenclatureCodeValue.Surprising, CurtissAnnotationNomenclatureCodeValue.KeyConcept, etc.
 */
export const CurtissAnnotationNomenclatureCodeValue =
  CURTISS_ANNOTATION_NOMENCLATURE_LOOKUPS.enumObj as Readonly<
    Record<
      (typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]["name"],
      (typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]["code"]
    >
  >;

export enum CurtissAnnotationNomenclatureEmphasizerEnum {
  StrongLike = "+",
  StrongDislike = "-",
  Critical = "*",
}

/**
 * Enum-like object for accessing CAN Emphasizer codes: CurtissAnnotationNomenclatureEmphasizerValue.StrongLike, etc.
 */
export const CurtissAnnotationNomenclatureEmphasizerValue =
  CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_LOOKUPS.enumObj as Readonly<
    Record<
      (typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]["name"],
      (typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]["code"]
    >
  >;

/**
 * Description lookup object: get the description for any code
 * Example: CurtissAnnotationNomenclatureDescriptions["!"] => "Surprising or unexpected"
 */
export const CurtissAnnotationNomenclatureDescriptions =
  CURTISS_ANNOTATION_NOMENCLATURE_LOOKUPS.descriptions as Readonly<
    Record<(typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]["code"], string>
  >;

/**
 * Get annotation by code
 * Example: getCurtissAnnotationNomenclatureCode("!") => { code: "!", name: "Surprising", description: "..." }
 */
export function getCurtissAnnotationNomenclatureCode(code: string) {
  return CURTISS_ANNOTATION_NOMENCLATURE_LOOKUPS.codeMap.get(code);
}

/**
 * Get annotation by name
 * Example: getCurtissAnnotationNomenclatureCodeByName("Surprising") => { code: "!", name: "Surprising", ... }
 */
export function getCurtissAnnotationNomenclatureCodeByName(name: string) {
  return CURTISS_ANNOTATION_NOMENCLATURE_LOOKUPS.nameMap.get(name);
}

/**
 * List all Curtiss Annotation Nomenclature Codes
 */
let cachedCurtissAnnotationNomenclatureCodesCopy: ReadonlyArray<(typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]> | null = null;
export function getAllCurtissAnnotationNomenclatureCodes(): ReadonlyArray<(typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]> {
  if (!cachedCurtissAnnotationNomenclatureCodesCopy) {
    cachedCurtissAnnotationNomenclatureCodesCopy = Object.freeze([...CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL]);
  }
  return cachedCurtissAnnotationNomenclatureCodesCopy;
}

/**
 * Lookup map for code to name
 * Example: CurtissAnnotationNomenclatureCodes["!"] => "Surprising"
 */
export const CurtissAnnotationNomenclatureCodes =
  CURTISS_ANNOTATION_NOMENCLATURE_LOOKUPS.codes as Readonly<
    Record<(typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]["code"], string>
  >;

/**
 * Array of all annotation codes
 * Example: ["!", "?", "A", "AG", ...]
 */
export const CURTISS_ANNOTATION_NOMENCLATURE_CODES =
  CURTISS_ANNOTATION_NOMENCLATURE_LOOKUPS.codeArray as ReadonlyArray<
    (typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]["code"]
  >;

/**
 * Set for validation checks
 */
const VALID_CURTISS_ANNOTATION_NOMENCLATURE_CODES_SET: Set<string> = new Set(CURTISS_ANNOTATION_NOMENCLATURE_CODES);

/**
 * Type guard to check if a value is a valid annotation code
 */
export function isValidCurtissAnnotationNomenclatureCode(
  value: string
): value is CurtissAnnotationNomenclatureCode {
  return VALID_CURTISS_ANNOTATION_NOMENCLATURE_CODES_SET.has(value);
}

/**
 * Description lookup object: get the description for any CAN Emphasizer code
 * Example: CurtissAnnotationNomenclatureEmphasizerDescriptions["+"] => "I really like this"
 */
export const CurtissAnnotationNomenclatureEmphasizerDescriptions =
  CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_LOOKUPS.descriptions as Readonly<
    Record<(typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]["code"], string>
  >;

/**
 * Lookup map for CAN Emphasizer code to name
 * Example: CurtissAnnotationNomenclatureEmphasizers["+"] => "StrongLike"
 */
export const CurtissAnnotationNomenclatureEmphasizers =
  CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_LOOKUPS.codes as Readonly<
    Record<(typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]["code"], string>
  >;

/**
 * Array of all CAN Emphasizer codes
 * Example: ["+", "-", "*"]
 */
export const CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS =
  CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_LOOKUPS.codeArray as ReadonlyArray<
    (typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]["code"]
  >;

/**
 * Set for validation checks
 */
const VALID_CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_SET: Set<string> = new Set(
  CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL.map(e => e.code)
);

/**
 * Formatted CAN annotation with structured parts for rendering.
 * 
 * IMPORTANT: When rendering in a UI with graphical capabilities:
 * - Use `graphical.circleContent` to render inside your own circle element (e.g., <div class="circle">{graphical.circleContent}</div>)
 * - Do NOT render `ascii.circle` inside a circle (that would be redundant: a circle around "(KC)")
 * 
 * Use `ascii.circle` ONLY for:
 * - Linear text rendering (console output, plain text files, logs)
 * - Scenarios where you cannot create actual circle graphics
 * - Simple text-based displays
 * 
 * Use `graphical.circleContent` for:
 * - UI rendering where you can create your own circle element
 * - SVG/Canvas rendering
 * - HTML/CSS circle styling
 */
export interface FormattedCANAnnotation {
  ascii: {
    circle: string;           // "(KC)" - parentheses ARE the circle
    left: string;             // "[1]" or ""
    right: string;            // "*" or ""
    note: string;             // Note text or ""
    annotation: string;       // Complete: "[1] (KC)* Note" - (circle and CAN Emphasizer touch)
  };
  graphical: {
    circleContent: CurtissAnnotationNomenclatureCode;  // "KC" - goes INSIDE your circle element
    topLeft: string;          // "[1]" or "" - goes OUTSIDE, top-left
    right: string;            // "*" or "" - goes OUTSIDE, right
    note: string;             // Note text or "" - goes OUTSIDE
  };
  code: CurtissAnnotationNomenclatureCode;  // Raw code for reference (kept at top level)
}


/**
 * Formats a CAN annotation according to proper CAN formatting rules.
 * 
 * Returns structured parts for flexible rendering:
 * - For text/console: use `ascii.annotation` or `ascii.circle`
 * - For UI with graphics: use `graphical.circleContent` inside your own circle element
 * 
 * Example UI rendering (correct):
 * ```tsx
 * const formatted = formatCANAnnotation({ code: "KC", emphasizer: "*", numOccurrences: 1 });
 * return (
 *   <div className="annotation">
 *     <span className="number">{formatted.graphical.topLeft}</span>
 *     <div className="circle">{formatted.graphical.circleContent}</div>
 *     <span className="emphasizer">{formatted.graphical.right}</span>
 *   </div>
 * );
 * ```
 * 
 * Example text rendering (correct):
 * ```typescript
 * const formatted = formatCANAnnotation({ code: "KC", emphasizer: "*", numOccurrences: 1 });
 * console.log(formatted.ascii.annotation);  // ✅ "[1] (KC)*"
 * ```
 * 
 * INCORRECT UI rendering (don't do this):
 * ```tsx
 * <div className="circle">{formatted.ascii.circle}</div>  // ❌ Creates circle around "(KC)"
 * ```
 */
export function formatCANAnnotation(options: {
  code: CurtissAnnotationNomenclatureCode;
  emphasizer?: CurtissAnnotationNomenclatureEmphasizerCode;
  numOccurrences?: number;
  note?: string;
}): FormattedCANAnnotation {
  const leftText = options.numOccurrences ? `[${options.numOccurrences}]` : "";
  const rightText = options.emphasizer || "";
  const noteText = options.note || "";
  const circleText = `(${options.code})`;
  
  // Build annotation with circle and emphasizer touching (no space between them)
  const circleWithEmphasizer = circleText + rightText;
  const parts = [leftText, circleWithEmphasizer, noteText].filter(Boolean);
  
  return {
    ascii: {
      circle: circleText,
      left: leftText,
      right: rightText,
      note: noteText,
      annotation: parts.join(" "),
    },
    graphical: {
      circleContent: options.code,
      topLeft: leftText, 
      right: rightText,
      note: noteText,
    },
    code: options.code,
  };
}

/**
 * Get CAN Emphasizer by code
 * Example: getCurtissAnnotationNomenclatureEmphasizerByCode("+") => { code: "+", name: "StrongLike", description: "..." }
 */
export function getCurtissAnnotationNomenclatureEmphasizerByCode(code: string) {
  return CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_LOOKUPS.codeMap.get(code);
}

/**
 * Get CAN Emphasizer by name
 * Example: getCurtissAnnotationNomenclatureEmphasizerByName("StrongLike") => { code: "+", name: "StrongLike", ... }
 */
export function getCurtissAnnotationNomenclatureEmphasizerByName(name: string) {
  return CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZER_LOOKUPS.nameMap.get(name);
}

/**
 * List all CAN Emphasizers
 */
let cachedCurtissAnnotationNomenclatureEmphasizersCopy: ReadonlyArray<(typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]> | null =
  null;
export function getAllCurtissAnnotationNomenclatureEmphasizers(): ReadonlyArray<(typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]> {
  if (!cachedCurtissAnnotationNomenclatureEmphasizersCopy) {
    cachedCurtissAnnotationNomenclatureEmphasizersCopy = Object.freeze([...CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL]);
  }
  return cachedCurtissAnnotationNomenclatureEmphasizersCopy;
}

/**
 * Type guard to check if a value is a valid CAN Emphasizer code
 */
export function isValidCurtissAnnotationNomenclatureEmphasizerCode(
  value: string
): value is CurtissAnnotationNomenclatureEmphasizerCode {
  return VALID_CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_SET.has(value);
}

/**
 * Type definitions for annotations
 */
export type CurtissAnnotationNomenclatureCode =
  (typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]["code"];
export type CurtissAnnotationNomenclatureName =
  (typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number]["name"];
export type CurtissAnnotationNomenclature = (typeof CURTISS_ANNOTATION_NOMENCLATURE_CODES_INTERNAL)[number];

/**
 * Type definitions for CAN Emphasizers
 */
export type CurtissAnnotationNomenclatureEmphasizerCode = (typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]["code"];
export type CurtissAnnotationNomenclatureEmphasizerName = (typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number]["name"];
export type CurtissAnnotationNomenclatureEmphasizer = (typeof CURTISS_ANNOTATION_NOMENCLATURE_EMPHASIZERS_INTERNAL)[number];
