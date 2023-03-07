export class ConfigSearch {
  public static searchConfig(cloudId: string, pass: string): any {
    return {
      cloud: {
        id: String(cloudId),
      },
      auth: {
        username: 'elastic',
        password: String(pass),
      },
      maxRetries: 5,
      requestTimeout: 60000,
      sniffOnStart: false,
    };
  }
}
