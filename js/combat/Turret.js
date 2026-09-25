class Turret {

    update(tank, input, deltaTime) {

        if (!input.active) {
            return;
        }

        const targetAngle =
            Math.atan2(
                input.y,
                input.x
            );

        let angleDifference =
            targetAngle -
            tank.turretAngle;

        while (angleDifference > Math.PI) {
            angleDifference -= Math.PI * 2;
        }

        while (angleDifference < -Math.PI) {
            angleDifference += Math.PI * 2;
        }

        const rotationSpeed =
            tank.turretTurnSpeed;

        const maxRotation =
            rotationSpeed * deltaTime;

        if (Math.abs(angleDifference) <= maxRotation) {

            tank.turretAngle =
                targetAngle;

        } else {

            tank.turretAngle +=
                Math.sign(angleDifference) *
                maxRotation;

        }
    }
}

export { Turret };
