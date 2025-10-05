import path from 'path';
import { fileURLToPath } from 'url';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import builtins from 'builtin-modules';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    input: 'app.ts',
    output: {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        alias({
            entries: [
                { find: '@common', replacement: path.resolve(__dirname, '../common/dist') },
            ],
        }),
        // tsconfigPaths(),
        json(),
        resolve(),
        commonjs({
            ignoreDynamicRequires: true,
        }),
        typescript({ tsconfig: './tsconfig.json' })
    ],
    external: [...builtins],
};
