class Tank {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        // 车体朝向
        this.hullAngle = 0;

        // 炮塔朝向
        this.turretAngle = 0;

        // 基础尺寸
        this.width = 70;
        this.height = 42;

        // 炮塔尺寸
        this.turretWidth = 30;
        this.turretHeight = 26;

        // 炮管长度
        this.gunLength = 42;
    }


    draw(ctx) {

        ctx.save();

        /*
         * 移动到坦克中心
         */

        ctx.translate(
            this.x,
            this.y
        );


        /*
         * =========================
         * 车体
         * =========================
         */

        ctx.save();

        ctx.rotate(this.hullAngle);

        ctx.fillStyle = "#596158";

        ctx.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );


        /*
         * 履带
         */

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


        /*
         * =========================
         * 炮塔
         * =========================
         */

        ctx.save();

        ctx.rotate(this.turretAngle);

        ctx.fillStyle = "#687067";

        ctx.fillRect(
            -this.turretWidth / 2,
            -this.turretHeight / 2,
            this.turretWidth,
            this.turretHeight
        );


        /*
         * 炮管
         */

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
