import Constants from 'expo-constants';

const ENVs = {
  dev: {
    environment: 'development' as 'development' | 'staging' | 'production',
    baseUrl: 'http://192.168.1.9:5000/' as string,
    clientId:
      '984919890336-1e2982lmg8faeha9h63d17t4utlon121.apps.googleusercontent.com' as string,
  },
  staging: {
    environment: 'staging' as 'development' | 'staging' | 'production',
    baseUrl: 'http://192.168.1.20:5000/' as string,
    clientId:
      '984919890336-1e2982lmg8faeha9h63d17t4utlon121.apps.googleusercontent.com' as string,
  },
  production: {
    environment: 'production' as 'development' | 'staging' | 'production',
    baseUrl:
      'https://m0pgdq76u5.execute-api.us-east-1.amazonaws.com/develop/api/' as string,
    clientId:
      '984919890336-1e2982lmg8faeha9h63d17t4utlon121.apps.googleusercontent.com' as string,
  },
};

function getEnvVars() {
  const options = Constants?.manifest?.packagerOpts;
  const channel = Constants?.manifest?.releaseChannel;
  const isDev = options != null ? options.dev : true;
  if (isDev) {
    return ENVs.dev;
  } else {
    if (channel === 'production') {
      return ENVs.production;
    } else {
      return ENVs.staging;
    }
  }
}

export const ENV_VAR = getEnvVars();
