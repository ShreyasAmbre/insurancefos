// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  EnvironmentName: 'LOCAL Environment',
  base_URL : "http://localhost:9078",
  PBK: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp1C5CT6JJ4FswevuuaDP9cjp6k9G0Gg29wgLFywVLdTnHksjrVFS5TcmyOFu6oKqfuDe15jqTba12XDaWJORnfuqnPFiSxKnK1SZedzlrMpcFvfjfmOTNxXtQYYELfGXZr0JXqig+Zr23VYhgRGhdKZezzJEY5ZPUQ75YHX4IzwUeRTRKfGReDFHahGoY56Z0FlPRoFkrxVz/3wvtDWgPOyVXBHMSVe8jaOS5RHpw3sNm5aKR7ZGCRUBchxGY6bjF1oGcYHWnf/wgqkGjiBfpB7O6k3V3rLM4ZmOM+Ck83/8VrmuPbI1qIY6A27JDZDGHEC0EyVv1CEjwqYP1wUNTwIDAQAB-----END PUBLIC KEY-----',
  BaseURL2: '/api',
  loginEndPoint: 'Login',
  decryptionBlock: false
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
