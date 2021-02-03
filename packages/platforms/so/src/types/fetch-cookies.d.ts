declare module "fetch-cookie/node-fetch" {
  declare function c(fetch: Function, jar?: c.CookieJar, ignoreError?: boolean): ((input: RequestInfo, init?: RequestInit) => Promise<Response>);

  export = c;
}

