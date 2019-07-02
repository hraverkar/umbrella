import {
    BVec,
    FloatTerm,
    FnCall,
    IntTerm,
    IVec,
    IVec2Term,
    IVec3Term,
    Mat,
    Prim,
    Sampler,
    Sampler2DSym,
    Sampler3DSym,
    SamplerCubeSym,
    Sym,
    Term,
    Vec,
    Vec2Term,
    Vec3Term,
    Vec4Term
} from "./api";
import { builtinCall, FLOAT0, INT0 } from "./ast";

const primOp1 = (name: string) => <T extends Prim>(a: Term<T>) =>
    builtinCall(name, a.type, a);

const primOp2 = (name: string) => <A extends Prim, B extends A>(
    a: Term<A>,
    b: Term<B>
) => builtinCall(name, a.type, a, b);

const primOp3 = (name: string) => <A extends Prim, B extends A, C extends B>(
    a: Term<A>,
    b: Term<B>,
    c: Term<C>
) => builtinCall(name, a.type, a, b, c);

const $bvec = (t: string) => <any>("bvec" + t[t.length - 1]);

/**
 * Returns normalized version of given vector.
 *
 * @param v
 */
export const normalize = <T extends Vec>(v: Term<T>) =>
    builtinCall("normalize", v.type, v);

/**
 * Returns length / magnitude of given vector.
 *
 * @param v
 */
export const length = <T extends Vec>(v: Term<T>) =>
    builtinCall("length", "float", v);

export const distance = <A extends Vec, B extends A>(a: Term<A>, b: Term<B>) =>
    builtinCall("distance", "float", a, b);

/**
 * Returns dot product of given vectors.
 *
 * @param a
 * @param b
 */
export const dot = <A extends Vec, B extends A>(a: Term<A>, b: Term<B>) =>
    builtinCall("dot", "float", a, b);

/**
 * Returns cross product of given 3D vectors.
 *
 * @param a
 * @param b
 */
export const cross = (a: Vec3Term, b: Vec3Term) =>
    builtinCall("cross", a.type, a, b);

export const reflect = <I extends Vec, N extends I>(i: Term<I>, n: Term<N>) =>
    builtinCall("reflect", i.type, i, n);

export const refract = <I extends Vec, N extends I>(
    i: Term<I>,
    n: Term<N>,
    ior: FloatTerm
) => builtinCall("refract", i.type, i, n, ior);

export const faceForward = <I extends Vec, N extends I, R extends I>(
    i: Term<I>,
    n: Term<N>,
    nref: Term<R>
) => builtinCall("faceForward", i.type, i, n, nref);

export const min = primOp2("min");
export const max = primOp2("max");
export const clamp = primOp3("clamp");

export const step = primOp2("step");
export const smoothstep = primOp3("smoothstep");

export const radians = primOp1("radians");
export const degrees = primOp1("degrees");

export const cos = primOp1("cos");
export const sin = primOp1("sin");
export const tan = primOp1("tan");
export const acos = primOp1("acos");
export const asin = primOp1("asin");
export const atan = primOp1("atan");

export const pow = primOp2("pow");
export const exp = primOp1("exp");
export const log = primOp1("log");
export const exp2 = primOp1("exp2");
export const log2 = primOp1("log2");
export const sqrt = primOp1("sqrt");
export const inversesqrt = primOp1("inversesqrt");

export const abs = primOp1("abs");
export const sign = primOp1("sign");
export const floor = primOp1("floor");
export const ceil = primOp1("ceil");
export const fract = primOp1("fract");

// prettier-ignore
export function mod<A extends Prim, B extends A>(a: Term<A>, b: Term<B>): FnCall<A>;
export function mod<A extends Prim>(a: Term<A>, b: FloatTerm): FnCall<A>;
export function mod(a: Term<any>, b: Term<any>): FnCall<any> {
    const f = builtinCall("mod", a.type, a, b);
    b.type === "float" && (f.info = "n");
    return f;
}

// prettier-ignore
export function mix<A extends Prim, B extends A, C extends B>(a: Term<A>, b: Term<B>, c: Term<C>): FnCall<A>;
// prettier-ignore
export function mix<A extends Prim, B extends A>(a: Term<A>, b: Term<B>, c: FloatTerm): FnCall<A>;
export function mix(a: Term<any>, b: Term<any>, c: Term<any>): FnCall<any> {
    const f = builtinCall("mix", a.type, a, b, c);
    c.type === "float" && (f.info = "n");
    return f;
}

// prettier-ignore
export const matrixCompMult = <A extends Mat, B extends A>(a: Term<A>, b: Term<B>) =>
    builtinCall("matrixCompMult", a.type, a, b);

// prettier-ignore
export function lessThan<A extends "vec2" | "ivec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function lessThan<A extends "vec3" | "ivec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function lessThan<A extends "vec4" | "ivec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function lessThan(a: Term<any>, b: Term<any>) {
    return builtinCall("lessThan", $bvec(a.type), a, b);
}

// prettier-ignore
export function lessThanEqual<A extends "vec2" | "ivec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function lessThanEqual<A extends "vec3" | "ivec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function lessThanEqual<A extends "vec4" | "ivec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function lessThanEqual(a: Term<any>, b: Term<any>) {
    return builtinCall("lessThanEqual", $bvec(a.type), a, b);
}

// prettier-ignore
export function greaterThan<A extends "vec2" | "ivec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function greaterThan<A extends "vec3" | "ivec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function greaterThan<A extends "vec4" | "ivec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function greaterThan(a: Term<any>, b: Term<any>) {
    return builtinCall("greaterThan", $bvec(a.type), a, b);
}

// prettier-ignore
export function greaterThanEqual<A extends "vec2" | "ivec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function greaterThanEqual<A extends "vec3" | "ivec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function greaterThanEqual<A extends "vec4" | "ivec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function greaterThanEqual(a: Term<any>, b: Term<any>) {
    return builtinCall("greaterThanEqual", $bvec(a.type), a, b);
}

// prettier-ignore
export function equal<A extends "vec2" | "ivec2" | "bvec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function equal<A extends "vec3" | "ivec3" | "bvec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function equal<A extends "vec4" | "ivec4" | "bvec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function equal(a: Term<any>, b: Term<any>) {
    return builtinCall("equal", $bvec(a.type), a, b);
}

// prettier-ignore
export function notEqual<A extends "vec2" | "ivec2" | "bvec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function notEqual<A extends "vec3" | "ivec3" | "bvec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function notEqual<A extends "vec4" | "ivec4" | "bvec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function notEqual(a: Term<any>, b: Term<any>) {
    return builtinCall("notEqual", $bvec(a.type), a, b);
}

export const _any = (v: Term<BVec>): FnCall<"bool"> =>
    builtinCall("any", "bool", v);

export const all = (v: Term<BVec>): FnCall<"bool"> =>
    builtinCall("all", "bool", v);

export const _not = <T extends BVec>(v: Term<T>) =>
    builtinCall("all", v.type, v);

const texRetType = (sampler: Sym<Sampler>) =>
    sampler.type.indexOf("Shadow") > 0 ? "float" : "vec4";

// prettier-ignore
export function textureSize(sampler: Sampler2DSym, lod: IntTerm): FnCall<"ivec2">;
// prettier-ignore
export function textureSize(sampler: Sampler3DSym, lod: IntTerm): FnCall<"ivec3">;
// prettier-ignore
export function textureSize(sampler: SamplerCubeSym, lod: IntTerm): FnCall<"ivec2">;
// prettier-ignore
export function textureSize(sampler: Sym<"sampler2DShadow">, lod: IntTerm): FnCall<"ivec2">;
// prettier-ignore
export function textureSize(sampler: Sym<"samplerCubeShadow">, lod: IntTerm): FnCall<"ivec2">;
// prettier-ignore
export function textureSize(sampler: Sym<Sampler>, lod: IntTerm): FnCall<any> {
    return builtinCall(
        "textureSize",
        sampler.type.indexOf("3D") > 0 ? "ivec3" : "ivec2",
        sampler,
        lod
    );
}

// prettier-ignore
export function texture(sampler: Sampler2DSym, uv: Vec2Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function texture(sampler: Sampler3DSym, uvw: Vec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function texture(sampler: SamplerCubeSym, uvw: Vec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function texture(sampler: Sym<"sampler2DShadow">, uvw: Vec3Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function texture(sampler: Sym<"samplerCubeShadow">, uvw: Vec4Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function texture(sampler: Sym<Sampler>, uv: Term<Vec>, bias?: FloatTerm): FnCall<any> {
    const f = builtinCall(
        "texture",
        texRetType(sampler),
        sampler,
        uv,
        bias || FLOAT0
    );
    f.type === "float" && (f.info = "n");
    return f;
}

// prettier-ignore
export function textureProj(sampler: Sampler2DSym, uvw: Term<"vec3" | "vec4">, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProj(sampler: Sampler3DSym, uvw: Vec4Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProj(sampler: Sym<"sampler2DShadow">, uvw: Vec4Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function textureProj(sampler: Sym<Sampler>, uv: Term<Vec>, bias?: FloatTerm): FnCall<any> {
    const f = builtinCall(
        "textureProj",
        texRetType(sampler),
        sampler,
        uv,
        bias || FLOAT0
    );
    f.type === "float" && (f.info = "n");
    return f;
}

// prettier-ignore
export function textureLod(sampler: Sampler2DSym, uv: Vec2Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureLod(sampler: Sampler3DSym, uvw: Vec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureLod(sampler: SamplerCubeSym, uvw: Vec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureLod(sampler: Sym<"sampler2DShadow">, uvw: Vec3Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function textureLod(sampler: Sym<Sampler>, uv: Term<Vec>, bias?: FloatTerm): FnCall<any> {
    const f = builtinCall(
        "textureLod",
        texRetType(sampler),
        sampler,
        uv,
        bias || FLOAT0
    );
    f.type === "float" && (f.info = "n");
    return f;
}

// prettier-ignore
export function textureOffset(sampler: Sampler2DSym, uvw: Vec2Term, off: IVec2Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureOffset(sampler: Sampler3DSym, uvw: Vec3Term, off: IVec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureOffset(sampler: Sym<"sampler2DShadow">, uvw: Vec3Term, off: IVec2Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function textureOffset(sampler: Sym<Sampler>, uv: Term<Vec>, off: Term<IVec>, bias?: FloatTerm): FnCall<any> {
    const f = builtinCall(
        "textureOffset",
        texRetType(sampler),
        sampler,
        uv,
        off,
        bias || FLOAT0
    );
    f.type === "float" && (f.info = "n");
    return f;
}

// prettier-ignore
export function texelFetch(sampler: Sampler2DSym, uv: IVec2Term, lod?: IntTerm): FnCall<"vec4">;
// prettier-ignore
export function texelFetch(sampler: Sampler3DSym, uvw: IVec3Term, lod?: IntTerm): FnCall<"vec4">;
// prettier-ignore
export function texelFetch(sampler: Sym<Sampler>, uv: Term<IVec>, lod?: IntTerm): FnCall<"vec4"> {
    return builtinCall(
        "texelFetch",
        "vec4",
        sampler,
        uv,
        lod || INT0
    );
}

export const dFdx = <T extends Prim>(sym: Sym<T>) =>
    builtinCall("dFdx", sym.type, sym);

export const dFdy = <T extends Prim>(sym: Sym<T>) =>
    builtinCall("dFdy", sym.type, sym);

export const fwidth = <T extends Prim>(sym: Sym<T>) =>
    builtinCall("fwidth", sym.type, sym);
