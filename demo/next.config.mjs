import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages configuration
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.REPO_NAME || "react-embeds";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // Base path for GitHub Pages (repo name)
  basePath: isGitHubPages ? `/${repoName}` : "",

  // Asset prefix for GitHub Pages
  assetPrefix: isGitHubPages ? `/${repoName}/` : "",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slashes for static hosting compatibility
  trailingSlash: true,

  turbopack: {},
  webpack: (config) => {
    config.resolve.alias["react-embeds"] = path.resolve(__dirname, "../src");
    const demoNodeModules = path.resolve(__dirname, "node_modules");
    config.resolve.modules = [...(config.resolve.modules || []), demoNodeModules];
    config.resolve.alias["react"] = path.join(demoNodeModules, "react");
    config.resolve.alias["react-dom"] = path.join(demoNodeModules, "react-dom");
    config.resolve.alias["react/jsx-runtime"] = path.join(demoNodeModules, "react/jsx-runtime.js");
    config.resolve.alias["react/jsx-dev-runtime"] = path.join(
      demoNodeModules,
      "react/jsx-dev-runtime.js"
    );
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: path.resolve(__dirname, "../src"),
      use: [
        {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true
              },
              transform: {
                react: {
                  runtime: "automatic"
                }
              }
            }
          }
        }
      ]
    });
    return config;
  }
};

export default nextConfig;

