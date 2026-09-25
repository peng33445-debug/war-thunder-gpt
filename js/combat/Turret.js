class Turret {

    update(tank, input, deltaTime) {

        if (!input.active) {
            return;
        }

        /*
         * 右摇杆方向是世界方向。
         */
        const targetWorldAngle =
            Math.atan2(
                input.y,
                input.x
            );

        /*
         * 把世界方向转换成
         * 相对于坦克车体的方向。
         */
        let targetRelativeAngle =
            targetWorldAngle -
            tank.hullAngle;

        while (targetRelativeAngle > Math.PI) {
            targetRelativeAngle -= Math.PI * 2;
        }

        while (targetRelativeAngle < -Math.PI) {
            targetRelativeAngle += Math.PI * 2;
        }

        /*
         * 炮塔当前角度就是
         * 相对于车体的角度。
         */
        let angleDifference =
            targetRelativeAngle -
            tank.turretAngle;

        while (angleDifference > Math.PI) {
            angleDifference -= Math.PI * 2;
        }

        while (angleDifference < -Math.PI) {
            angleDifference += Math.PI * 2;
        }

        /*
         * 当前 V0.1 测试坦克的炮塔转速。
         * 以后这里会从坦克自己的数据读取。
         */
        const rotationSpeed =
            tank.turretTurnSpeed;

        const maxRotation =
            rotationSpeed * deltaTime;

        if (Math.abs(angleDifference) <= maxRotation) {

            tank.turretAngle =
                targetRelativeAngle;

        } else {

            tank.turretAngle +=
                Math.sign(angleDifference) *
                maxRotation;
        }
    }
}

export { Turret };
