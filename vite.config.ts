import { AliasOptions, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

const root = path.resolve(__dirname, "src");

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
  server: {
    host: true
  }
});
