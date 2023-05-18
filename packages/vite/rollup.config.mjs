import typescript from "rollup-plugin-typescript2"

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

        external: ["@storybook/types", "@storybook/builder-vite"],

        plugins: [
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        module: "ESNext",
                    },
                },
            }),
        ]
    },
    {
        input: "./src/preset.ts",

        output: [
            {
                file: `dist/preset.mjs`,
                format: "es",
                sourcemap: true
            },
            {
                file: `dist/preset.js`,
                format: "cjs",
                sourcemap: true
            },
        ],

        external: ["@storybook/types", "@storybook/builder-vite"],

        plugins: [
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        module: "ESNext",
                    },
                },
            }),
        ]
    },
]