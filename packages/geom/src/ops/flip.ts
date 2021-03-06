import { IObjectOf } from "@thi.ng/api";
import { DEFAULT, defmulti, Implementation1 } from "@thi.ng/defmulti";
import { IShape, PCLike, Type } from "@thi.ng/geom-api";
import { neg } from "@thi.ng/vectors";
import { Arc } from "../api/arc";
import { Group } from "../api/group";
import { Path } from "../api/path";
import { Ray } from "../api/ray";
import { dispatch } from "../internal/dispatch";

export const flip = defmulti<IShape, IShape>(dispatch);
flip.add(DEFAULT, ($) => $);

flip.addAll(<IObjectOf<Implementation1<unknown, IShape>>>{
    [Type.ARC]: ($: Arc) => {
        const t = $.start;
        $.start = $.end;
        $.end = t;
        $.cw = !$.cw;
        return $;
    },

    [Type.GROUP]: ($: Group) => {
        $.children.forEach(flip);
        return $;
    },

    [Type.PATH]: ($: Path) => {
        // TODO
        return $;
    },

    [Type.POINTS]: ($: PCLike) => {
        $.points.reverse();
        return $;
    },

    [Type.RAY]: ($: Ray) => {
        $.dir = neg(null, $.dir);
        return $;
    }
});

flip.isa(Type.CUBIC, Type.POINTS);
flip.isa(Type.LINE, Type.POINTS);
flip.isa(Type.POLYGON, Type.POINTS);
flip.isa(Type.POLYLINE, Type.POINTS);
flip.isa(Type.QUAD, Type.POINTS);
flip.isa(Type.QUADRATIC, Type.POINTS);
flip.isa(Type.TRIANGLE, Type.POINTS);
