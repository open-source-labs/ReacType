import * as esbuild from 'esbuild-wasm';

/* Singleton pattern for initializing esbuild */
/* This ensures that esbuild is only initialized once, regardless of how many times CodePreview is mounted and unmounted */
let isEsbuildInitialized = false;

export const initializeEsbuild = async () => {
  if (!isEsbuildInitialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
    isEsbuildInitialized = true;
  }
};
