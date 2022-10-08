import vue from "@vitejs/plugin-vue";
import {
  name,
  external
} from "./package.json";
import {
  resolve
} from "path";

function camelize(str) {
  return (str + "").replace(/-\D/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
}
export default ({
  command
}) => {
  /**
   * @type {import('vite').UserConfig}
   */
  const config = {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue(),
    ],
  };
  if (command === "build" && process.env.BUILD_MODULE === "1") {
    config.build = {
      outDir: "./dist/module",
      sourcemap: "hidden",
      lib: {
        entry: resolve(__dirname, "src/module.js"),
        // 格式必须为iife
        formats: ["umd"],
        name: camelize(name),
      },
      minify: false,
      // target: "esnext",
      rollupOptions: {
        // 为了使用同一vue对象，所有模块必须外置化vue
        external: Object.keys(external),
        // output: {
        //   globals: external,
        // },
      },
      define: {
        process: {
          env: {
            "BUILD_MODULE": "1",
            "NODE_ENV": "production"
          }
        }
      }
    };
  }
  return config;
};