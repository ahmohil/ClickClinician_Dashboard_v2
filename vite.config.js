import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3001,
		host: true,
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
			},
		},
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
			"@utils": "/src/utils",
		},
	},
});
