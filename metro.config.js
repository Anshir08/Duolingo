const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = withNativewind(getDefaultConfig(__dirname));

const resolvedPackageEntries = {
  "@protobuf-ts/runtime": path.resolve(
    __dirname,
    "node_modules/@protobuf-ts/runtime/build/es2015/index.js",
  ),
  "@protobuf-ts/runtime-rpc": path.resolve(
    __dirname,
    "node_modules/@protobuf-ts/runtime-rpc/build/es2015/index.js",
  ),
  "@protobuf-ts/twirp-transport": path.resolve(
    __dirname,
    "node_modules/@protobuf-ts/twirp-transport/build/es2015/index.js",
  ),
  "posthog-react-native": path.resolve(
    __dirname,
    "node_modules/posthog-react-native/dist/index.js",
  ),
};

const nativewindResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolvedEntry = resolvedPackageEntries[moduleName];

  if (resolvedEntry) {
    return { type: "sourceFile", filePath: resolvedEntry };
  }

  // Metro already passes a context whose resolveRequest points at the default resolver.
  return nativewindResolveRequest(context, moduleName, platform);
};

module.exports = config;
