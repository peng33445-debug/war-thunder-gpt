class Camera {

    constructor() {

        this.x = 0;
        this.y = 0;

        this.width =
            window.innerWidth;

        this.height =
            window.innerHeight;

        // =========================
        // 摄像机跟随惯性
        // =========================

        this.followSpeed = 5;
    }

    resize(width, height) {

        this.width = width;
        this.height = height;
    }

    follow(target, deltaTime) {

        const targetX =
            target.x -
            this.width / 2;

        const targetY =
            target.y -
            this.height / 2;

        // =========================
        // 平滑跟随
        // =========================

        const amount =
            1 -
            Math.exp(
                -this.followSpeed *
                deltaTime
            );

        this.x +=
            (targetX - this.x) *
            amount;

        this.y +=
            (targetY - this.y) *
            amount;
    }

    worldToScreen(x, y) {

        return {
            x: x - this.x,
            y: y - this.y
        };
    }

    screenToWorld(x, y) {

        return {
            x: x + this.x,
            y: y + this.y
        };
    }
}

export { Camera };
