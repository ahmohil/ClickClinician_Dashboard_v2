// vite.config.js
import { defineConfig } from "file:///C:/MD_Internal/split-mart/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/MD_Internal/split-mart/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true
  },
  build: {
    outDir: "../build",
    emptyOutDir: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      }
    }
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@constants": "/src/constants",
      "@directives": "/src/directives",
      "@hooks": "/src/hooks",
      "@modals": "/src/Modals",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@socket": "/src/socket",
      "@store": "/src/store",
      "@transformers": "/src/transformers",
      "@utils": "/src/utils"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxNRF9JbnRlcm5hbFxcXFxzcGxpdC1tYXJ0XFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcTURfSW50ZXJuYWxcXFxcc3BsaXQtbWFydFxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L01EX0ludGVybmFsL3NwbGl0LW1hcnQvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRwbHVnaW5zOiBbcmVhY3QoKV0sXHJcblx0c2VydmVyOiB7XHJcblx0XHRwb3J0OiAzMDAxLFxyXG5cdFx0aG9zdDogdHJ1ZSxcclxuXHR9LFxyXG5cdGJ1aWxkOiB7XHJcblx0XHRvdXREaXI6IFwiLi4vYnVpbGRcIixcclxuXHRcdGVtcHR5T3V0RGlyOiB0cnVlLFxyXG5cdFx0cm9sbHVwT3B0aW9uczoge1xyXG5cdFx0XHRvbndhcm4od2FybmluZywgd2Fybikge1xyXG5cdFx0XHRcdGlmICh3YXJuaW5nLmNvZGUgPT09IFwiTU9EVUxFX0xFVkVMX0RJUkVDVElWRVwiKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHdhcm4od2FybmluZyk7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0cmVzb2x2ZToge1xyXG5cdFx0YWxpYXM6IHtcclxuXHRcdFx0XCJAY29tcG9uZW50c1wiOiBcIi9zcmMvY29tcG9uZW50c1wiLFxyXG5cdFx0XHRcIkBjb25zdGFudHNcIjogXCIvc3JjL2NvbnN0YW50c1wiLFxyXG5cdFx0XHRcIkBkaXJlY3RpdmVzXCI6IFwiL3NyYy9kaXJlY3RpdmVzXCIsXHJcblx0XHRcdFwiQGhvb2tzXCI6IFwiL3NyYy9ob29rc1wiLFxyXG5cdFx0XHRcIkBtb2RhbHNcIjogXCIvc3JjL01vZGFsc1wiLFxyXG5cdFx0XHRcIkBwYWdlc1wiOiBcIi9zcmMvcGFnZXNcIixcclxuXHRcdFx0XCJAc2VydmljZXNcIjogXCIvc3JjL3NlcnZpY2VzXCIsXHJcblx0XHRcdFwiQHNvY2tldFwiOiBcIi9zcmMvc29ja2V0XCIsXHJcblx0XHRcdFwiQHN0b3JlXCI6IFwiL3NyYy9zdG9yZVwiLFxyXG5cdFx0XHRcIkB0cmFuc2Zvcm1lcnNcIjogXCIvc3JjL3RyYW5zZm9ybWVyc1wiLFxyXG5cdFx0XHRcIkB1dGlsc1wiOiBcIi9zcmMvdXRpbHNcIixcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFIsU0FBUyxvQkFBb0I7QUFDdlQsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLE1BQ2QsT0FBTyxTQUFTLE1BQU07QUFDckIsWUFBSSxRQUFRLFNBQVMsMEJBQTBCO0FBQzlDO0FBQUEsUUFDRDtBQUNBLGFBQUssT0FBTztBQUFBLE1BQ2I7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsVUFBVTtBQUFBLElBQ1g7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
