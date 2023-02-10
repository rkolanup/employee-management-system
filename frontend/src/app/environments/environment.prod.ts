export const environment = {
  production: true,
  //apiUrl: 'http://localhost:3000/api'
  apiUrl: window["env"]["apiUrl"] || "default",
  debug: window["env"]["debug"] || false
};
