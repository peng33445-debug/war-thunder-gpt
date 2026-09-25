```javascript
import { Tank } from "../vehicle/Tank.js";
import { Movement } from "../movement/Movement.js";

import { Turret } from "../combat/Turret.js";

import { Enemy } from "../enemy/Enemy.js";

import { Camera } from "../camera/Camera.js";

import { inputState } from "../input/Input.js";


const Guide = {

    modules: {

        // =========================
        // Tank
        // =========================

        tank: {

            create(x, y) {

                return new Tank(x, y);
            }

        },


        // =========================
        // Movement
        // =========================

        movement: {

            create() {

                return new Movement();
            },

            update(
                instance,
                tank,
                deltaTime
            ) {

                instance.update(
                    tank,
                    inputState.movement,
                    deltaTime
                );
            }

        },


        // =========================
        // Turret
        // =========================

        turret: {

            create() {

                return new Turret();
            },

            update(
                instance,
                tank,
                deltaTime
            ) {

                instance.update(
                    tank,
                    inputState.turret,
                    deltaTime
                );
            },

            render(
                instance,
                ctx,
                tank
            ) {

                instance.draw(
                    ctx,
                    tank
                );
            }

        },


        // =========================
        // Enemy
        // =========================

        enemy: {

            create(x, y) {

                return new Enemy(x, y);
            },

            update(instance) {

                instance.update();
            },

            render(
                instance,
                ctx
            ) {

                instance.draw(ctx);
            }

        },


        // =========================
        // Camera
        // =========================

        camera: {

            create() {

                return new Camera();
            },

            resize(
                instance,
                width,
                height
            ) {

                instance.resize(
                    width,
                    height
                );
            },

            snapTo(
                instance,
                target
            ) {

                instance.snapTo(
                    target
                );
            },

            follow(
                instance,
                target,
                deltaTime
            ) {

                instance.follow(
                    target,
                    deltaTime
                );
            },

            worldToScreen(
                instance,
                x,
                y
            ) {

                return instance.worldToScreen(
                    x,
                    y
                );
            },

            screenToWorld(
                instance,
                x,
                y
            ) {

                return instance.screenToWorld(
                    x,
                    y
                );
            }

        }

    }

};


export { Guide };
```
