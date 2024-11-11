import { type ParserOptions, format } from "prettier";
import * as prettierPluginTailwindcss from "prettier-plugin-tailwindcss";
import type { AnywhereNode } from "./types.js";

export const parse = async (
  text: string,
  options: ParserOptions,
): Promise<AnywhereNode> => {
  let formattedText = text;
  const regex = options.regex as string;

  const matches = text.matchAll(new RegExp(regex, "g"));

  const map = new Map();

  for (const match of matches) {
    const original = match[0];
    const value = match[1];

    const fixedValue = (
      await format(`<div class="${value}"></div>`, {
        parser: "html",
        plugins: [prettierPluginTailwindcss],
      })
    ).match(/class="([^"]*)"/)?.[1];

    const fixed = original.replace(value, fixedValue);

    map.set(original, fixed);
  }

  for (const [original, fixed] of map) {
    formattedText = formattedText.replace(original, fixed);
  }

  return {
    body: formattedText,
    start: 0,
    end: text.length,
  };
};
