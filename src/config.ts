import Constants from "expo-constants";

const config = {
  serverUrl: Constants.manifest.extra?.serverUrl,
  defaultPollInterval: Constants.manifest.extra?.pollInterval ?? 500,
};

export default config;
