class Enemy {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.hullAngle = 0;

        this.width = 70;
        this.height = 42;

        this.turretAngle = 0;

        this.turretWidth = 30;
        this.turretHeight = 26;

        this.gunLength = 42;

        this.hp = 100;

        this.active = true;
    }

    update() {
        // V0.1：敌方坦克暂时保持静止
    }

    draw(ctx) {

        if (!this.active) {
            return;
        }

        // =========================
        // 车体
        // =========================

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(
            this.hullAngle
        );

        ctx.fillStyle = "#6b5148";

        ctx.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        // 履带

        ctx.fillStyle = "#252525";

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

        // 车体细节

        ctx.fillStyle = "#8a675a";

        ctx.fillRect(
            -20,
            -12,
            28,
            24
        );

        ctx.restore();


        // =========================
        // 炮塔
        // =========================

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(
            this.hullAngle
        );

        ctx.rotate(
            this.turretAngle
        );

        ctx.fillStyle = "#795a4e";

        ctx.fillRect(
            -this.turretWidth / 2,
            -this.turretHeight / 2,
            this.turretWidth,
            this.turretHeight
        );

        // 炮管

        ctx.fillStyle = "#302a28";

        ctx.fillRect(
            0,
            -4,
            this.gunLength,
            8
        );

        ctx.restore();
    }
}

export { Enemy };
