import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build'
  },
  assetsInclude: ['**/*.png'],
  server: { port: 8080 },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        icon: true
        // ...svgr options (https://react-svgr.com/docs/options/)
      }
    }),
    visualizer()
  ],
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material' // Assuming you use icons too
      // Any other specific parts of MUI or related dependencies
    ]
  }
});
