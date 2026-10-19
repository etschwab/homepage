// Beschreibt die Form der bearbeitbaren Inhalte. Wird aus den Standardwerten
// abgeleitet, damit neue Felder in den Daten automatisch im Admin erscheinen.

export type FieldSchema =
  | { kind: "string"; multiline: boolean; options?: readonly string[] }
  | { kind: "number" }
  | { kind: "boolean" }
  | { kind: "array"; item: FieldSchema }
  | { kind: "object"; fields: Record<string, FieldSchema> };

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const MULTILINE_THRESHOLD = 60;

export function deriveSchema(value: unknown): FieldSchema {
  if (typeof value === "string") {
    return { kind: "string", multiline: value.length > MULTILINE_THRESHOLD };
  }
  if (typeof value === "number") return { kind: "number" };
  if (typeof value === "boolean") return { kind: "boolean" };
  if (Array.isArray(value)) {
    const item = value
      .map(deriveSchema)
      .reduce<FieldSchema | undefined>(
        (merged, schema) => (merged ? mergeSchemas(merged, schema) : schema),
        undefined,
      );
    return { kind: "array", item: item ?? { kind: "string", multiline: false } };
  }
  if (value && typeof value === "object") {
    return {
      kind: "object",
      fields: Object.fromEntries(
        Object.entries(value)
          .filter(([, field]) => field !== undefined)
          .map(([key, field]) => [key, deriveSchema(field)]),
      ),
    };
  }
  return { kind: "string", multiline: false };
}

function mergeSchemas(a: FieldSchema, b: FieldSchema): FieldSchema {
  if (a.kind === "string" && b.kind === "string") {
    return { kind: "string", multiline: a.multiline || b.multiline };
  }
  if (a.kind === "array" && b.kind === "array") {
    return { kind: "array", item: mergeSchemas(a.item, b.item) };
  }
  if (a.kind === "object" && b.kind === "object") {
    const fields = { ...a.fields };
    for (const [key, schema] of Object.entries(b.fields)) {
      fields[key] = fields[key] ? mergeSchemas(fields[key], schema) : schema;
    }
    return { kind: "object", fields };
  }
  return a;
}

/** Hängt Auswahlwerte an ein Textfeld, z. B. ["projects", "*", "group"]. */
export function withOptions(
  schema: FieldSchema,
  path: readonly string[],
  options: readonly string[],
): FieldSchema {
  if (path.length === 0) {
    return schema.kind === "string" ? { ...schema, options } : schema;
  }
  const [head, ...rest] = path;
  if (schema.kind === "array" && head === "*") {
    return { ...schema, item: withOptions(schema.item, rest, options) };
  }
  if (schema.kind === "object" && schema.fields[head]) {
    return {
      ...schema,
      fields: { ...schema.fields, [head]: withOptions(schema.fields[head], rest, options) },
    };
  }
  return schema;
}

/** Leerer Wert für neue Listeneinträge. */
export function blankValue(schema: FieldSchema): JsonValue {
  switch (schema.kind) {
    case "string":
      return schema.options?.[0] ?? "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return Object.fromEntries(
        Object.entries(schema.fields).map(([key, field]) => [key, blankValue(field)]),
      );
  }
}

/**
 * Bringt einen gespeicherten oder gesendeten Wert in die erwartete Form.
 * Fehlende oder falsch typisierte Felder werden durch `fallback` ersetzt.
 */
export function conform(
  value: unknown,
  schema: FieldSchema,
  fallback: unknown = blankValue(schema),
): JsonValue {
  switch (schema.kind) {
    case "string": {
      if (typeof value !== "string") return conform(fallback, schema, "");
      if (schema.options && !schema.options.includes(value)) {
        return typeof fallback === "string" && schema.options.includes(fallback)
          ? fallback
          : (schema.options[0] ?? "");
      }
      return value;
    }
    case "number":
      return typeof value === "number" && Number.isFinite(value)
        ? value
        : typeof fallback === "number"
          ? fallback
          : 0;
    case "boolean":
      return typeof value === "boolean" ? value : fallback === true;
    case "array": {
      const source = Array.isArray(value) ? value : Array.isArray(fallback) ? fallback : [];
      return source.map((item) => conform(item, schema.item));
    }
    case "object": {
      const source = isRecord(value) ? value : {};
      const fallbackRecord = isRecord(fallback) ? fallback : {};
      return Object.fromEntries(
        Object.entries(schema.fields).map(([key, field]) => [
          key,
          conform(
            key in source ? source[key] : fallbackRecord[key],
            field,
            fallbackRecord[key] ?? blankValue(field),
          ),
        ]),
      );
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
