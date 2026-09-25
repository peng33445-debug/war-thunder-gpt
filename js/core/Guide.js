import { Tank } from "../vehicle/Tank.js";
import { Movement } from "../movement/Movement.js";
import { Turret } from "../combat/Turret.js";
import { inputState } from "../input/Input.js";

const Guide = {

    modules: {

        tank: {
            create(x, y) {
                return new Tank(x, y);
            }
        },

        movement: {
            create() {
                return new Movement();
            },

            update(instance, tank, deltaTime) {
                instance.update(
                    tank,
                    inputState.movement,
                    deltaTime
                );
            }
        },

        turret: {
            create() {
                return new Turret();
            },

            update(instance, tank, deltaTime) {
                instance.update(
                    tank,
                    inputState.turret,
                    deltaTime
                );
            },

            render(instance, ctx, tank) {
                instance.draw(
                    ctx,
                    tank
                );
            }
        }

    }

};

export { Guide };
