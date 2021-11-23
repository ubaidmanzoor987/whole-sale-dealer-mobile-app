export function Config() {
  const ENV_NAME = 'development' as 'development' | 'production';
  if (ENV_NAME === 'production') {
    return {
      clientId:
        '984919890336-1e2982lmg8faeha9h63d17t4utlon121.apps.googleusercontent.com',
      baseUrl: 'http://192.168.1.14:5000/api/',
    };
  } else {
    return {
      clientId:
        '984919890336-jjfhq7oceu2qlhir0l5mdrhodj79386v.apps.googleusercontent.com',
      baseUrl: 'http://192.168.1.14:5000/api/',
    };
  }
}
