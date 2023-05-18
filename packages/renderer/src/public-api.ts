import { start } from "@storybook/preview-api"
import {
    ArgsStoryFn,
    RenderContext, 
    RenderToCanvas, 
    WebRenderer, 
    Addon_ClientStoryApi, 
    Addon_Loadable
} from "@storybook/types"
import { WeccoRenderer } from "./types"
import * as wecco from "@weccoframework/core"

// --

export const renderToCanvas: RenderToCanvas<WeccoRenderer> = (
    { storyFn, name, showMain, showError, forceRemount }: RenderContext<WeccoRenderer>,
    canvasElement: WebRenderer["canvasElement"]
) => {
    const element = storyFn() as wecco.ElementUpdate
    const wrapper = wecco.html`<div @update=${showMain}>${element}</div>`
    wecco.updateElement(canvasElement, wrapper)
}

export const render: ArgsStoryFn<WeccoRenderer> = (args, context) => {
    const { component } = context;

    const div = document.createElement("div")
    div.innerText = `${component}`
    return div
}

// --

const RENDERER = "@weccoframework/storybook/renderer";

interface ClientApi extends Addon_ClientStoryApi<WeccoRenderer["storyResult"]> {
    configure(loader: Addon_Loadable, module: NodeModule): void;
    forceReRender(): void;
    raw: () => any; // todo add type
}

const api = start<WeccoRenderer>(renderToCanvas, { render });

export const storiesOf: ClientApi["storiesOf"] = (kind, m) => {
    return (api.clientApi.storiesOf(kind, m) as ReturnType<ClientApi["storiesOf"]>).addParameters({
        renderer: RENDERER,
    });
};

export const configure: ClientApi["configure"] = (...args) => api.configure(RENDERER, ...args);
export const forceReRender: ClientApi["forceReRender"] = api.forceReRender;
export const raw: ClientApi["raw"] = api.clientApi.raw;
