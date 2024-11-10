# prettier-plugin-tailwindcss-anywhere

[![](https://github.com/ttskch/prettier-plugin-tailwindcss-anywhere/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/ttskch/prettier-plugin-tailwindcss-anywhere/actions/workflows/ci.yaml?query=branch:main)
[![codecov](https://codecov.io/gh/ttskch/prettier-plugin-tailwindcss-anywhere/graph/badge.svg?token=GEZ1cdUmSx)](https://codecov.io/gh/ttskch/prettier-plugin-tailwindcss-anywhere)
[![NPM Version](https://img.shields.io/npm/v/%40ttskch%2Fprettier-plugin-tailwindcss-anywhere)](https://www.npmjs.com/package/@ttskch/prettier-plugin-tailwindcss-anywhere)
[![NPM Downloads](https://img.shields.io/npm/dm/%40ttskch%2Fprettier-plugin-tailwindcss-anywhere)](https://www.npmjs.com/package/@ttskch/prettier-plugin-tailwindcss-anywhere)

A Prettier plugin for sorting TailwindCSS classes **in any HTML-like language, like Twig etc**⚡

## Installation

```shell
npm install -D prettier \
               prettier-plugin-tailwindcss \
               @ttskch/prettier-plugin-tailwindcss-anywhere
```

## Usage

This plugin is intended to be used in conjunction with [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).

For example, by setting `.prettierrc` as follows, you can sort classes even in files of template engines such as [Twig](https://twig.symfony.com/) that cannot be processed by prettier-plugin-tailwindcss.

```json5
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss", "@ttskch/prettier-plugin-tailwindcss-anywhere"],
  "overrides": [
    {
      "files": "*.html.twig",
      "options": {
        "parser": "anywhere",
      }
    }
  ]
}
```

### Before

```twig
{% extends 'base.html.twig %}
  {% block content %}
    <div class="space-y-4 flex-col flex">
      <div class="p-4 rounded-lg bg-blue-500 text-white rounded-lg p-4">
        Hello, {{ name }}!
      </div>
    </div>
  {% endblock %}
{% endblock %}
```

### After

```diff
  {% extends 'base.html.twig %}
    {% block content %}
-     <div class="space-y-4 flex-col flex">
+     <div class="flex flex-col space-y-4">
-       <div class="p-4 rounded-lg bg-blue-500 text-white rounded-lg p-4">
+       <div class="rounded-lg bg-blue-500 p-4 text-white">
          Hello, {{ name }}!
        </div>
      </div>
    {% endblock %}
  {% endblock %}
```

## Options

### `regex` 

**default:** `class="([^"]*)"`

The `regex` option allows you to specify the part that corresponds to the value of the class attribute using a regular expression.

For example, if you have the following text:

```twig
<div class="space-y-4 flex-col flex {% if foo %}is-foo{% endif %}">
```

In this case, you can specify the following `regex` to sort only the part before `{% if foo %}`.

```json5
{
  "options": {
    "parser": "anywhere",
    "regex": "class=\"([^{}\"]*)(?:\"| {)", // <-- here
  }
}
```

```diff
- <div class="space-y-4 flex-col flex {% if foo %}is-foo{% endif %}">
+ <div class="flex flex-col space-y-4 {% if foo %}is-foo{% endif %}">
```

> [!NOTE]
> Note that you need to surround the part you want to see as the class attribute value with `()` so that the plugin can backreference it.

## Getting involved

```shell
pnpm install

# Develop...

pnpm check
pnpm test
pnpm build
```

Thanks! 🎉
