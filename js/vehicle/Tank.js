
class Tank {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.hullAngle = 0;
        this.turretAngle = 0;

        this.width = 70;
        this.height = 42;

        this.turretWidth = 30;
        this.turretHeight = 26;

        this.gunLength = 42;

        // V0.1 测试坦克基础数据
        this.turretTurnSpeed = 1.5;
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        /*
         * 车体坐标系
         *
         * 炮塔的角度以车体为基准。
         */
        ctx.rotate(this.hullAngle);

        // =========================
        // 车体
        // =========================

        ctx.save();

        ctx.fillStyle = "#596158";

        ctx.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.fillStyle = "#292d2a";

        ctx.fillRect(
            -this.width / 2,
            -this.height / 2 - 6,
            this.width,
            6
        );

        ctx.fillRect(
            -this.width / 2,
            this.height / 2,
            this.width,
            6
        );

        ctx.restore();

        // =========================
        // 炮塔
        // =========================

        ctx.save();

        /*
         * turretAngle 是相对于车体的角度。
         *
         * 因为这里已经处于 hullAngle
         * 的坐标系中，所以炮塔会随着
         * 车体一起转动，同时还能独立旋转。
         */
        ctx.rotate(this.turretAngle);

        ctx.fillStyle = "#687067";

        ctx.fillRect(
            -this.turretWidth / 2,
            -this.turretHeight / 2,
            this.turretWidth,
            this.turretHeight
        );

        ctx.fillStyle = "#343934";

        ctx.fillRect(
            0,
            -4,
            this.gunLength,
            8
        );

        ctx.restore();

        ctx.restore();
    }
}

export { Tank };
