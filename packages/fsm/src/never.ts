import { LitCallback, Match, Matcher } from "./api";
import { result } from "./result";

/**
 * Returns a matcher which always fails (produces a `Match.FAIL` result)
 * for any given input. Use `always()` for the opposite effect.
 */
export const never = <T, C, R>(
    callback?: LitCallback<T, C, R>
): Matcher<T, C, R> => () => (ctx, x) =>
    result(callback && callback(ctx, x), Match.FAIL);
