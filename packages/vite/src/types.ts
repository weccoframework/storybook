import type { StorybookConfig as StorybookConfigBase } from "@storybook/types"
import type { StorybookConfigVite, BuilderOptions } from "@storybook/builder-vite"

type FrameworkName = "@weccoframework/storybook-vite"
type BuilderName = "@storybook/builder-vite"

export type FrameworkOptions = {
  builder?: BuilderOptions
}

type StorybookConfigFramework = {
  framework:
  | FrameworkName
  | {
    name: FrameworkName
    options: FrameworkOptions
  }
  core?: StorybookConfigBase["core"] & {
    builder?:
    | BuilderName
    | {
      name: BuilderName
      options: BuilderOptions
    }
  }
}

export type StorybookConfig = Omit<
  StorybookConfigBase,
  keyof StorybookConfigVite | keyof StorybookConfigFramework
> &
  StorybookConfigVite &
  StorybookConfigFramework
