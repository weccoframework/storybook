# Storybook for `@weccoframework`

This repo contains framework support for `@weccoframework` when using _Storybook_. The repo contains
a vite builder package as well as a renderer package. The packages support Storybook >= 7.x. 

**Notice**: The sources contained in this repo are in an early development phase. The repo provides very
usable storybook support for `@weccoframework` based on the author's experience. Nevertheless, bugs and
missing features are likely to be found. Use with care.

# Installation

We recommend using `npx init storybook` to bootstrap a storybook project. Choose `html` as the framework
and `vite` as the builder to use. 

Replace the content of the generated `.storybook/main.ts` with the following

```typescript
import type { StorybookConfig } from "@weccoframework/storybook-vite"

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@weccoframework/storybook-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  features: {
    storyStoreV7: true,
  },
}

export default config
```

Adopt the paths to your stories as needed.

Replace the content of the generated `.storybook/preview.ts` with the following

```typescript
import "../src/stories/index.css"

import type { Preview } from "@weccoframework/storybook-renderer"
import { withThemeByDataAttribute } from "@storybook/addon-styling"

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
    attributeName: "data-mode",
  }),
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
```

Again, adopt the imported styles and the theme switching as needed.

# Writing Stories

The renderer assumes the output of any `render` function to be of type `wecco.ElementUpdate`. Here is
an example for an imaginary `button` story:

```typescript
import type { Meta } from "@weccoframework/storybook-renderer"

import { button, ButtonOptions } from "../button"

const meta: Meta<ButtonOptions> = {
  title: "wui/Button",

  render: (args: ButtonOptions) => {
    return button(args)
  },

  argTypes: {
    label: {
      name: "Label",
      control: "text",
      description: "The label shown on the button",
    },
    kind: {
      name: "Kind",
      control: "select",
      options: ["default", "primary", "success", "danger"],
    },
    disabled: {
      name: "Disabled",
      control: "boolean",
    },
    rounded: {
      name: "Rounded",
      control: "boolean",
    },
    onClick: {},
  },
}

export default meta

export const Primary = {
  args: {
    label: "Primary button",
    kind: "primary",
  },
}

export const Default = {
  args: {
    label: "Default button",
    kind: "default",
  },
}
```

# License

Copyright 2023 wecco authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.