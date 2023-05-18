import type { Args, DecoratorFunction, PartialStoryFn, StoryContext } from "@storybook/csf"
import type { WeccoRenderer } from "./types"

export const allDecorators: Array<DecoratorFunction> = []

export const applyDecorators = (
  storyFn: PartialStoryFn<WeccoRenderer, Args>,
  decorators: DecoratorFunction<WeccoRenderer, Args>[]
) => {
  return decorators.reduce(
    (decoratedStoryFn, decorator) => (context: StoryContext<WeccoRenderer>) => {
      return decorator(() => decoratedStoryFn(context), context)
    },
    (context: StoryContext<WeccoRenderer>) => storyFn(context)
  )
}
