
class Turret {

    update(tank, input, deltaTime) {

        if (!input.active) {
            return;
        }

        /*
         * 右摇杆左右控制炮塔。
         *
         * turretAngle 是相对于车体的角度。
         *
         * x > 0：向右旋转
         * x < 0：向左旋转
         *
         * y 不参与炮塔旋转。
         */

        const rotationInput =
            input.x;

        /*
         * 摇杆推得越远，
         * 炮塔旋转越快。
         */

        const rotationSpeed =
            tank.turretTurnSpeed;

        tank.turretAngle +=
            rotationInput *
            rotationSpeed *
            deltaTime;
    }
}

export { Turret };
