import typescript from "@rollup/plugin-typescript"

export default [
    {
        input: "./src/index.ts",

        output: [
            {
                file: `dist/index.mjs`,
                format: "es",
                sourcemap: true
            },
            {
                file: `dist/index.js`,
                format: "cjs",
                sourcemap: true
            },
        ],

        external: ["@storybook/types", "@storybook/preview-api", "@weccoframework/core"],

        plugins: [
            typescript({
                compilerOptions: {
                    module: "ESNext",
                },
            }),
        ]
    },
    {
        input: "./src/previewAnnotations.ts",

        output: [
            {
                file: `dist/previewAnnotations.mjs`,
                format: "es",
                sourcemap: true
            },
            {
                file: `dist/previewAnnotations.js`,
                format: "cjs",
                sourcemap: true
            },
        ],

        external: ["@storybook/types", "@storybook/preview-api", "@weccoframework/core"],

        plugins: [
            typescript({
                compilerOptions: {
                    module: "ESNext",
                },
            }),
        ]
    },
]