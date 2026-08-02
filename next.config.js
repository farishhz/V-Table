const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["geist", "highlight.js"],
  experimental: {
    optimizePackageImports: ["shiki"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "files.og-table.com",
        protocol: "https",
      },
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                ],
              },
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    // find the built-in loader
    const imageLoaderRule = config.module.rules.find((rule) => rule.loader === "next-image-loader");
    // make the loader ignore *.inline files
    imageLoaderRule.exclude = /\.inline\.(png|jpg|svg)$/i;

    // add a new URL loader for *.inline files
    config.module.rules.push({
      test: /\.inline\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "url-loader",
        },
      ],
    });

    return config;
  },
  async rewrites() {
    return []; // atau hapus fungsi rewrites() sepenuhnya
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "icon.og-table",
          },
        ],
        destination: "https://og-table/icon/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "icons.og-table",
          },
        ],
        destination: "https://og-table/icon/:path*",
        permanent: true,
      },
      {
        source: "/((?!_next|api)):path(.*)",
        has: [
          {
            type: "host",
            value: "prompts.og-table",
          },
        ],
        destination: "https://og-table/prompts/:path*",
        permanent: true,
      },
      {
        source: "/((?!_next|api)):path(.*)",
        has: [
          {
            type: "host",
            value: "presets.og-table",
          },
        ],
        destination: "https://og-table/presets/:path*",
        permanent: true,
      },
      {
        source: "/((?!_next|api)):path(.*)",
        has: [
          {
            type: "host",
            value: "snippets.og-table",
          },
        ],
        destination: "https://og-table/snippets/:path*",
        permanent: true,
      },
      {
        source: "/((?!_next|api)):path(.*)",
        has: [
          {
            type: "host",
            value: "themes.og-table",
          },
        ],
        destination: "https://og-table/themes/:path*",
        permanent: true,
      },
      {
        source: "/api/:path*",
        has: [
          {
            type: "host",
            value: "presets.og-table",
          },
        ],
        destination: "https://og-table/api/:path*",
        permanent: true,
      },
      {
        source: "/api/:path*",
        has: [
          {
            type: "host",
            value: "snippets.og-table",
          },
        ],
        destination: "https://og-table/api/:path*",
        permanent: true,
      },
      {
        source: "/api/:path*",
        has: [
          {
            type: "host",
            value: "themes.og-table",
          },
        ],
        destination: "https://og-table/api/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/shorten-url",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
