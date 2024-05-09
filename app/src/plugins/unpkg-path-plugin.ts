import * as esbuild from 'esbuild-wasm';
/**
 * Plugin for esbuild to resolve paths for UNPKG.
 * @returns {esbuild.Plugin} - The esbuild plugin for resolving UNPKG paths.
 */
export const unpkgPathPlugin = (): esbuild.Plugin => {
  return {
    name: 'unpkg-path-plugin',
    /**
     * Setup function for the UNPKG path plugin.
     * @param {esbuild.PluginBuild} build - The esbuild PluginBuild object.
     */
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });
      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        const seeURL = new URL(
          args.path,
          'https://unpkg.com' + args.resolveDir + '/'
        ).href;
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href
        };
      });
      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };
      });
    }
  };
};
