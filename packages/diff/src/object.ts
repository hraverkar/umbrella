import { IObjectOf, Predicate2 } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import { DiffMode, ObjectDiff } from "./api";

export const diffObject = <T>(
    a: IObjectOf<T> | undefined | null,
    b: IObjectOf<T> | undefined | null,
    mode = DiffMode.FULL,
    _equiv: Predicate2<any> = equiv
): ObjectDiff<T> =>
    a === b
        ? { distance: 0 }
        : mode === DiffMode.ONLY_DISTANCE
        ? diffObjectDist(a, b, _equiv)
        : diffObjectFull(a, b, _equiv);

const diffObjectDist = (
    a: IObjectOf<any> | undefined | null,
    b: IObjectOf<any> | undefined | null,
    _equiv: Predicate2<any>
) => {
    if (!a) a = {};
    if (!b) b = {};
    let d = 0;
    for (let k in a) {
        const vb = b[k];
        (vb === undefined || !_equiv(a[k], vb)) && d++;
    }
    for (let k in b) {
        !(k in a) && d++;
    }
    return { distance: d };
};

const diffObjectFull = (
    a: IObjectOf<any> | undefined | null,
    b: IObjectOf<any> | undefined | null,
    _equiv: Predicate2<any>
) => {
    if (!a) a = {};
    if (!b) b = {};
    let d = 0;
    const adds = [];
    const dels = [];
    const edits = [];
    for (let k in a) {
        const vb = b[k];
        if (vb === undefined) {
            dels.push(k);
            d++;
        } else if (!_equiv(a[k], vb)) {
            edits.push(k, vb);
            d++;
        }
    }
    for (let k in b) {
        if (!(k in a)) {
            adds.push(k);
            d++;
        }
    }
    return { distance: d, adds, dels, edits };
};
