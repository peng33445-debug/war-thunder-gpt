class Turret {

    update(tank, input, deltaTime) {

        if (!input.active) {
            return;
        }

        /*
         * 只使用右摇杆的左右方向。
         *
         * x > 0：向右旋转
         * x < 0：向左旋转
         *
         * y 不参与炮塔旋转。
         */

        const rotationInput =
            input.x;

        /*
         * 摇杆越往左右推，
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
