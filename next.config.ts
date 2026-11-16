import type { NextConfig } from "next";

import { retiredPaths } from "./lib/retired-pages";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    // Temporary (307) so the old pages can be restored without browsers having cached a permanent redirect.
    return retiredPaths.map((source) => ({ destination: "/", permanent: false, source }));
  },
};

export default nextConfig;
