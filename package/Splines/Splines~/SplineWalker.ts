import { Behaviour, GameObject } from "@needle-tools/engine";
import { Mathf } from "@needle-tools/engine";
import { serializeable } from "@needle-tools/engine";
import { getWorldPosition, setWorldPosition } from "@needle-tools/engine/src/engine/engine_three_utils";

import { Object3D } from "three"

import { SplineContainer } from "./SplineContainer";

export class SplineWalker extends Behaviour {

    //@type(UnityEngine.Splines.SplineContainer)
    @serializeable(SplineContainer)
    spline: SplineContainer | null = null;
    @serializeable(Object3D)
    object?: Object3D;

    // @type float
    @serializeable()
    get position01(): number {
        return this._position01;
    }
    set position01(v: number) {
        this._position01 = v;
        this.updateFromPosition();
    }

    @serializeable(Object3D)
    lookAt: Object3D | null = null;
    @serializeable()
    clamp: boolean = false;

    private _position01: number = 0;

    start() {
        this.updateFromPosition();
    }

    private updateFromPosition() {
        if (!this.spline || !this.spline.curve) return;
        if (!this.object) return;

        if (this.clamp) this._position01 = Mathf.clamp01(this._position01);
        else this._position01 = this._position01 % 1;

        const t = this._position01 % 1;
        const pt = this.spline.getPointAt(t);
        setWorldPosition(this.object, pt);
        if (!this.lookAt) {
            const tan = this.spline.getTangentAt(t);
            this.object.lookAt(pt.add(tan));
        }
        else this.object.lookAt(getWorldPosition(this.lookAt));
    }
}
