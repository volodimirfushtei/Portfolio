import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
import purgecss from 'vite-plugin-purgecss'

export default defineConfig({
  plugins: [react(), purgecss({
    content: ['**/*.html', '**/*.jsx', '**/*.tsx'],
    css: ['**/*.css'],
    safelist: {
      standard: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^cursor-/,
        /^data-/,
        /^el-/,
        /^v-/,
        /^gsap-/,
        /^motion-/,
        /^cursor-/,
      ],
    },
  })],

  // ✅ Виправлено: одна зірочка замість двох
  assetsInclude: ['**/fonts/*.woff2', '**/fonts/*.woff', '**/fonts/*.ttf'],

  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/fonts/[name][extname]', // ✅ Шлях для шрифтів
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/Components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
    dedupe: ['react', 'react-dom', 'three'],
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
})