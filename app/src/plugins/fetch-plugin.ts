import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

/**
 * Creates a file cache instance using localForage.
 */
const fileCache = localForage.createInstance({
  name: 'filecache'
});

/**
 * A plugin for esbuild to fetch and load code from external sources.
 * @param {string} inputCode - The input code to load as the entry file.
 * @returns {esbuild.Plugin} - The esbuild plugin for fetching and loading code.
 */
export const fetchPlugin = (inputCode: string): esbuild.Plugin => {
  return {
    name: 'fetch-plugin',
    /**
     * Setup function for the fetch plugin.
     * @param {esbuild.PluginBuild} build - The esbuild PluginBuild object.
     */
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) {
          return cachedResult;
        }
      });
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style)
          `;
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        };
        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) {
          return cachedResult;
        }
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    }
  };
};
