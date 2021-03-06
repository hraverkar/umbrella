import { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { Group } from "../api/group";

export const group = (attribs: Attribs = {}, children?: IHiccupShape[]) =>
    new Group(attribs, children);
