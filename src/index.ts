import type {
  Options,
  Parser,
  Printer,
  SupportLanguage,
  SupportOption,
} from "prettier";
import { parse } from "./parser.js";
import { print } from "./printer.js";
import type { AnywhereNode } from "./types.js";

/**
 * @see https://prettier.io/docs/en/plugins#languages
 */
export const languages: Partial<SupportLanguage>[] = [
  {
    name: "Any HTML-like Languages",
    parsers: ["anywhere"],
  },
];

/**
 * @see https://prettier.io/docs/en/plugins#parsers
 */
export const parsers: Record<string, Parser> = {
  anywhere: {
    parse,
    astFormat: "anywhere",
    locStart: (node: AnywhereNode) => node.start,
    locEnd: (node: AnywhereNode) => node.end,
  },
};

/**
 * @see https://prettier.io/docs/en/plugins#printers
 */
export const printers: Record<string, Printer> = {
  anywhere: {
    print,
  },
};

/**
 * @see https://prettier.io/docs/en/plugins.html#options
 */
export const options: Record<string, SupportOption> = {
  regex: {
    type: "string",
    category: "Format",
    default: 'class="([^"]*)"',
    description: "regex to match class attribute",
  },
};

/**
 * @see https://prettier.io/docs/en/plugins#defaultoptions
 */
export const defaultOptions: Options = {};
