import tough from 'tough-cookie';

export type FetchCookieInit<T> = T & {
    maxRedirect?: number;
    redirectCount?: number;
};

export interface FetchCookieImpl<T1, T2, T3> {
    (input: T1, init?: FetchCookieInit<T2>): Promise<T3>;
    toughCookie: typeof tough;
}