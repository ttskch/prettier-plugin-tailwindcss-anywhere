import { format } from "prettier";
import { describe, expect, it } from "vitest";
import * as plugin from "../../src/index.js";

describe("index", () => {
  it("without options", async () => {
    const result = await format(
      `{% block foo %}<div class="items-center ms-auto flex gap-[1.5rem] flex ms-auto">{{ bar }}</div>{% endblock %}`,
      {
        parser: "anywhere",
        // @ts-ignore
        plugins: [plugin],
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "{% block foo %}<div class="ms-auto flex items-center gap-[1.5rem]">{{ bar }}</div>{% endblock %}"
    `);
  });

  it("with regex option", async () => {
    const result = await format(
      `{% block foo %}<div class="items-center ms-auto flex gap-[1.5rem] flex ms-auto {% if buz %}is-buz{% endif %}">{{ bar }}</div>{% endblock %}`,
      {
        parser: "anywhere",
        // @ts-ignore
        plugins: [plugin],
        regex: 'class="([^{}"]*)(?:"| {)',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "{% block foo %}<div class="ms-auto flex items-center gap-[1.5rem] {% if buz %}is-buz{% endif %}">{{ bar }}</div>{% endblock %}"
    `);
  });
});
