import { implementsFunction } from "@thi.ng/checks";

/**
 * Takes an arbitrary `ctx` object and array of `keys`. Attempts to call
 * `.deref()` on all given keys' values and stores result values instead
 * of original. Returns updated copy of `ctx` or original if `ctx` is
 * `null` or no keys were given.
 *
 * @param ctx
 * @param keys
 */
export const derefContext = (ctx: any, keys: PropertyKey[] | undefined) => {
    if (ctx == null || !keys || !keys.length) return ctx;
    const res = { ...ctx };
    for (let k of keys) {
        const v = res[k];
        implementsFunction(v, "deref") && (res[k] = v.deref());
    }
    return res;
};
