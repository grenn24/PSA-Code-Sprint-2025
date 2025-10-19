import path from 'path';
import { fileURLToPath } from 'url';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import builtins from 'builtin-modules';
import esbuild from 'rollup-plugin-esbuild';
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
        alias({ entries: [{ find: '@common', replacement: path.resolve(__dirname, '../common/dist') }] }),
        // typescript({ tsconfig: './tsconfig.json' }),
        esbuild({ target: 'es2024', minify: false }),
        json(),
        resolve(),
        commonjs({ ignoreDynamicRequires: true }),
    ],
    onwarn(warning, warn) {
        console.log('Rollup warning:', warning);
        warn(warning);
    },
    external: [...builtins, 'mongodb', 'mongoose', 'winston', 'semver', "mock-aws-s3", 'aws-sdk', 'nock', 'sqlite3', 'canvas', 'grpc', '@tensorflow/tfjs-node', '@aws-sdk/*', /^@aws-sdk\//],
};
