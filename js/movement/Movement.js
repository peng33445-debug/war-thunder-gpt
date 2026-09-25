class Movement {

    constructor() {
        this.speed = 0;

        this.maxSpeed = 180;
        this.acceleration = 420;
        this.deceleration = 520;

        this.turnSpeed = 2;
    }

    reset() {
        this.speed = 0;
    }

    update(tank, input, deltaTime) {

        const movementInput = input;

        if (movementInput.active) {

            this.speed +=
                this.acceleration *
                deltaTime;

            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            }

            const targetAngle =
                Math.atan2(
                    movementInput.y,
                    movementInput.x
                );

            let angleDifference =
                targetAngle -
                tank.hullAngle;

            while (angleDifference > Math.PI) {
                angleDifference -= Math.PI * 2;
            }

            while (angleDifference < -Math.PI) {
                angleDifference += Math.PI * 2;
            }

            tank.hullAngle +=
                angleDifference *
                Math.min(
                    1,
                    this.turnSpeed * deltaTime
                );

        } else {

            this.speed -=
                this.deceleration *
                deltaTime;

            if (this.speed < 0) {
                this.speed = 0;
            }
        }

        tank.x +=
            Math.cos(
                tank.hullAngle
            ) *
            this.speed *
            deltaTime;

        tank.y +=
            Math.sin(
                tank.hullAngle
            ) *
            this.speed *
            deltaTime;
    }
}

export { Movement };
