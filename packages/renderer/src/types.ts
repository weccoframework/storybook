import * as wecco from "@weccoframework/core"

import {
    ArgsStoryFn,
    WebRenderer,
    StoryContext as DefaultStoryContext,
} from "@storybook/types"


export interface WeccoRenderer extends WebRenderer {
    component: string | HTMLElement | ArgsStoryFn<WeccoRenderer>;
    storyResult: wecco.ElementUpdate;
}

export type StoryContext = DefaultStoryContext<WeccoRenderer> & {
    parameters: DefaultStoryContext<WeccoRenderer>["parameters"] // & typeof parameters;
};
