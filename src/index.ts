import type {
  Options,
  Parser,
  Printer,
  SupportLanguage,
  SupportOption,
} from "prettier";
import { parse } from "./parser.js";
import { print } from "./printer.js";

/**
 * @see https://prettier.io/docs/en/plugins#languages
 */
export const languages: Partial<SupportLanguage>[] = [
  {
    name: "Any HTML-like Languages",
    parsers: ["anywhere"],
    aceMode: "text",
  },
];

/**
 * @see https://prettier.io/docs/en/plugins#parsers
 */
export const parsers: Record<string, Parser> = {
  anywhere: {
    parse,
    astFormat: "anywhere",
    // there's only a single node
    locStart(node) {
      return node.start;
    },
    locEnd(node) {
      return node.end;
    },
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
    category: "Anywhere",
    default: 'class="([^{}"]*)"',
    description: "regex to match class attribute",
  },
};

/**
 * @see https://prettier.io/docs/en/plugins#defaultoptions
 */
export const defaultOptions: Options = {};
