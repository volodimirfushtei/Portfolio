import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Оптимізація React SWC
      tsDecorators: true,
      plugins: []
    }),
    tailwindcss(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Стискати файли більше 10KB
      deleteOriginFile: false
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Два проходи для кращої компресії
      },
      mangle: {
        toplevel: true,
        safari10: true,
      },
      format: {
        comments: false,
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Групування node_modules
          if (id.includes('node_modules')) {
            // Three.js та пов'язані бібліотеки
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            // GSAP анімації
            if (id.includes('gsap')) {
              return 'gsap-vendor';
            }
            // React екосистема
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            // Framer Motion
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Firebase
            if (id.includes('firebase')) {
              return 'firebase-vendor';
            }
            // UI бібліотеки
            if (id.includes('lucide-react') || id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            // Роутинг
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            // Всі інші вендори
            return 'vendor';
          }
          
          // Групування по сторінках (для лінивого завантаження)
          if (id.includes('/pages/homePage/')) {
            return 'page-home';
          }
          if (id.includes('/pages/projectsPage/')) {
            return 'page-projects';
          }
          if (id.includes('/pages/contactsPage/')) {
            return 'page-contacts';
          }
          if (id.includes('/pages/TechPage/')) {
            return 'page-tech';
          }
          
          // Групування компонентів
          if (id.includes('/Components/Model/')) {
            return 'component-model';
          }
          if (id.includes('/Components/Carusel/')) {
            return 'component-carusel';
          }
          if (id.includes('/Components/Sertificate/')) {
            return 'component-sertificate';
          }
        },
        
        // Оптимізація імен файлів
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        
        // Розділення на більш дрібні чанки
        experimentalMinChunkSize: 10000, // 10KB мінімальний розмір чанку
      },
    },
    sourcemap: false, // Вимкнути sourcemaps в production
    chunkSizeWarningLimit: 500, // 500KB warning
    cssCodeSplit: true, // Розділення CSS
    assetsInlineLimit: 4096, // Інлайн файлів менше 4KB
    reportCompressedSize: true, // Показувати стиснуті розміри
  },
  
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    // Оптимізація dev сервера
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
    },
  },
  
  // Оптимізація залежностей
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'gsap',
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ],
    exclude: [
      '@tailwindcss/vite'
    ],
    esbuildOptions: {
      target: 'es2020',
      treeShaking: true,
    },
  },
  
  // CSS оптимізація
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
    devSourcemap: false,
  },
  
  // Preview сервер для тестування продакшн білду
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
  },
  
  // Визначення глобальних констант
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __DEV__: false,
  },
});