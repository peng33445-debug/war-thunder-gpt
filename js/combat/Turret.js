
class Turret {

    update(tank, input, deltaTime) {

        if (!input.active) {
            return;
        }

        /*
         * 右摇杆左右控制炮塔。
         *
         * turretAngle：
         * 炮塔相对于车体的角度。
         *
         * x > 0：向右
         * x < 0：向左
         */

        const rotationInput =
            input.x;

        const rotationSpeed =
            tank.turretTurnSpeed;

        tank.turretAngle +=
            rotationInput *
            rotationSpeed *
            deltaTime;
    }

    draw(ctx, tank) {

        ctx.save();

        /*
         * 先进入坦克的位置。
         */

        ctx.translate(
            tank.x,
            tank.y
        );

        /*
         * 先进入车体坐标系。
         *
         * 这意味着：
         *
         * turretAngle = 相对于车体的角度
         */

        ctx.rotate(
            tank.hullAngle
        );

        /*
         * 再旋转炮塔自己的相对角度。
         */

        ctx.rotate(
            tank.turretAngle
        );

        // =========================
        // 炮塔
        // =========================

        ctx.fillStyle = "#687067";

        ctx.fillRect(
            -tank.turretWidth / 2,
            -tank.turretHeight / 2,
            tank.turretWidth,
            tank.turretHeight
        );

        // =========================
        // 炮管
        // =========================

        ctx.fillStyle = "#343934";

        ctx.fillRect(
            0,
            -4,
            tank.gunLength,
            8
        );

        ctx.restore();
    }
}

export { Turret };
