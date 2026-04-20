// vite.config.js
import { defineConfig } from "file:///C:/Users/User/Projects/Portfolio/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/User/Projects/Portfolio/node_modules/@vitejs/plugin-react-swc/index.js";
import tailwindcss from "file:///C:/Users/User/Projects/Portfolio/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Тимчасово вимикаємо ручне розділення для уникнення циклів
    rollupOptions: {
      output: {
        // Автоматичне розділення
        manualChunks: void 0,
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js"
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1e3
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/Components",
      "@pages": "/src/pages",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@styles": "/src/styles",
      "@assets": "/src/assets"
    },
    dedupe: ["react", "react-dom", "three"]
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "three",
      "@react-three/fiber",
      "@react-three/drei"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXFByb2plY3RzXFxcXFBvcnRmb2xpb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxQcm9qZWN0c1xcXFxQb3J0Zm9saW9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1VzZXIvUHJvamVjdHMvUG9ydGZvbGlvL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdGFpbHdpbmRjc3Mvdml0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgdGFpbHdpbmRjc3MoKV0sXHJcbiAgXHJcbiAgYnVpbGQ6IHtcclxuICAgIHRhcmdldDogJ2VzMjAyMCcsXHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gXHUwNDIyXHUwNDM4XHUwNDNDXHUwNDQ3XHUwNDMwXHUwNDQxXHUwNDNFXHUwNDMyXHUwNDNFIFx1MDQzMlx1MDQzOFx1MDQzQ1x1MDQzOFx1MDQzQVx1MDQzMFx1MDQ1NFx1MDQzQ1x1MDQzRSBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0MzUgXHUwNDQwXHUwNDNFXHUwNDM3XHUwNDM0XHUwNDU2XHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRGIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0NDNcdTA0M0RcdTA0MzhcdTA0M0FcdTA0M0RcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEYgXHUwNDQ2XHUwNDM4XHUwNDNBXHUwNDNCXHUwNDU2XHUwNDMyXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzRFx1MDQzNSBcdTA0NDBcdTA0M0VcdTA0MzdcdTA0MzRcdTA0NTZcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEZcclxuICAgICAgICBtYW51YWxDaHVua3M6IHVuZGVmaW5lZCxcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDBcclxuICB9LFxyXG4gIFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcHJveHk6IHtcclxuICAgICAgXCIvYXBpXCI6IHtcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwXCIsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogJy9zcmMnLFxyXG4gICAgICAnQGNvbXBvbmVudHMnOiAnL3NyYy9Db21wb25lbnRzJyxcclxuICAgICAgJ0BwYWdlcyc6ICcvc3JjL3BhZ2VzJyxcclxuICAgICAgJ0Bob29rcyc6ICcvc3JjL2hvb2tzJyxcclxuICAgICAgJ0B1dGlscyc6ICcvc3JjL3V0aWxzJyxcclxuICAgICAgJ0BzdHlsZXMnOiAnL3NyYy9zdHlsZXMnLFxyXG4gICAgICAnQGFzc2V0cyc6ICcvc3JjL2Fzc2V0cycsXHJcbiAgICB9LFxyXG4gICAgZGVkdXBlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICd0aHJlZSddXHJcbiAgfSxcclxuICBcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGluY2x1ZGU6IFtcclxuICAgICAgJ3JlYWN0JyxcclxuICAgICAgJ3JlYWN0LWRvbScsXHJcbiAgICAgICd0aHJlZScsXHJcbiAgICAgICdAcmVhY3QtdGhyZWUvZmliZXInLFxyXG4gICAgICAnQHJlYWN0LXRocmVlL2RyZWknXHJcbiAgICBdXHJcbiAgfVxyXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQTRSLFNBQVMsb0JBQW9CO0FBQ3pULE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUV4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztBQUFBLEVBRWhDLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBO0FBQUEsUUFFTixjQUFjO0FBQUEsUUFDZCxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsZUFBZTtBQUFBLE1BQ2YsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLFFBQVEsQ0FBQyxTQUFTLGFBQWEsT0FBTztBQUFBLEVBQ3hDO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
