```javascript
class Camera {

    constructor() {

        this.x = 0;
        this.y = 0;

        this.width =
            window.innerWidth;

        this.height =
            window.innerHeight;

        // =========================
        // 摄像机跟随速度
        // =========================

        this.followSpeed = 5;
    }


    // =========================
    // Canvas 尺寸
    // =========================

    resize(width, height) {

        this.width = width;
        this.height = height;
    }


    // =========================
    // 立即跟随目标
    // =========================

    snapTo(target) {

        this.x =
            target.x -
            this.width / 2;

        this.y =
            target.y -
            this.height / 2;
    }


    // =========================
    // 平滑跟随
    // =========================

    follow(target, deltaTime) {

        const targetX =
            target.x -
            this.width / 2;

        const targetY =
            target.y -
            this.height / 2;

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


    // =========================
    // 世界坐标 → 屏幕坐标
    // =========================

    worldToScreen(x, y) {

        return {
            x: x - this.x,
            y: y - this.y
        };
    }


    // =========================
    // 屏幕坐标 → 世界坐标
    // =========================

    screenToWorld(x, y) {

        return {
            x: x + this.x,
            y: y + this.y
        };
    }
}


export { Camera };
```
