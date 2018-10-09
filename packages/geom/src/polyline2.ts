import { ICopy, IToHiccup } from "@thi.ng/api/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { Vec } from "@thi.ng/vectors/api";
import { Vec2 } from "@thi.ng/vectors/vec2";
import {
    Attribs,
    IArcLength,
    IArea,
    IEdges,
    IVertices,
    SamplingOpts,
    SubdivKernel
} from "./api";
import { PointContainer2 } from "./container2";
import { arcLength } from "./internal/arc-length";
import { closestPointPolyline } from "./internal/closest-point";
import { edges } from "./internal/edges";
import { Sampler } from "./sampler";
import { subdivideCurve } from "./subdiv-curve";

export class Polyline2 extends PointContainer2 implements
    IArcLength,
    IArea,
    ICopy<Polyline2>,
    IEdges<Vec2[]>,
    IVertices<Vec2, void | number | Partial<SamplingOpts>>,
    IToHiccup {

    copy() {
        return new Polyline2(this._copy(), { ...this.attribs });
    }

    edges() {
        return edges(this.points);
    }

    area() {
        return 0;
    }

    arcLength() {
        return arcLength(this.points);
    }

    closestPoint(p: Readonly<Vec2>) {
        return closestPointPolyline(p, this.points, false);
    }

    subdivide(kernel: SubdivKernel<Vec2>, iter = 1) {
        return new Polyline2(subdivideCurve(kernel, this.points, iter, false), { ...this.attribs });
    }

    vertices(opts?: number | Partial<SamplingOpts>) {
        const sampler = new Sampler(this.points);
        if (opts !== undefined) {
            if (isPlainObject(opts)) {
                return opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last !== false) :
                    sampler.sampleFixedNum(opts.num, opts.last !== false);
            }
            return sampler.sampleFixedNum(opts, true);
        } else {
            return this.points;
        }
    }

    toHiccup() {
        return this._toHiccup("polyline");
    }

    toHiccupPathSegments() {
        const res: any[] = [];
        for (let pts = this.points, n = pts.length, i = 1; i < n; i++) {
            res.push(["L", pts[i]]);
        }
        return res;
    }

    toJSON() {
        return this._toJSON("polyline2");
    }
}

export function polyline2(points: Vec, num?: number, start?: number, cstride?: number, estride?: number, attribs?: Attribs): Polyline2;
export function polyline2(points: Vec2[], attribs?: Attribs): Polyline2;
export function polyline2(points, ...args: any[]) {
    let attribs;
    if (isNumber(points[0])) {
        points = Vec2.mapBuffer(
            points,
            args[0] || points.length / 2,
            args[1] || 0,
            args[2] || 1,
            args[3] || 2
        );
        attribs = args[4];
    } else {
        attribs = args[0];
    }
    return new Polyline2(points, attribs);
}