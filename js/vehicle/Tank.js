class Tank {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        // =========================
        // 车辆状态
        // =========================

        this.hullAngle = 0;
        this.turretAngle = 0;

        // =========================
        // V0.1 测试坦克数据
        // =========================

        this.width = 70;
        this.height = 42;

        this.turretWidth = 30;
        this.turretHeight = 26;

        this.gunLength = 42;

        this.turretTurnSpeed = 1.5;
    }

    draw(ctx) {

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(
            this.hullAngle
        );

        // =========================
        // 车体
        // =========================

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
    }
}

export { Tank };
