```javascript
import { Guide } from "./Guide.js";

class Game {

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.lastTime = 0;
        this.started = false;

        this.modules =
            Guide.modules;

        this.createGameObjects();

        this.resizeCanvas();

        window.addEventListener(
            "resize",
            () => this.resizeCanvas()
        );
    }


    // =========================
    // 创建游戏对象
    // =========================

    createGameObjects() {

        this.playerTank =
            this.modules.tank.create(
                window.innerWidth / 2,
                window.innerHeight / 2
            );

        this.movement =
            this.modules.movement.create();

        this.turret =
            this.modules.turret.create();

        this.enemy =
            this.modules.enemy.create(
                window.innerWidth * 0.72,
                window.innerHeight / 2
            );
    }


    // =========================
    // Canvas
    // =========================

    resizeCanvas() {

        const dpr =
            window.devicePixelRatio || 1;

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;

        this.canvas.width =
            Math.floor(width * dpr);

        this.canvas.height =
            Math.floor(height * dpr);

        this.canvas.style.width =
            width + "px";

        this.canvas.style.height =
            height + "px";

        this.ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );
    }


    // =========================
    // 游戏开始
    // =========================

    start() {

        this.started = true;

        this.playerTank.x =
            window.innerWidth / 2;

        this.playerTank.y =
            window.innerHeight / 2;

        this.movement.reset();

        this.enemy.x =
            window.innerWidth * 0.72;

        this.enemy.y =
            window.innerHeight / 2;
    }


    // =========================
    // 游戏更新
    // =========================

    update(deltaTime) {

        if (!this.started) {
            return;
        }

        this.modules.movement.update(
            this.movement,
            this.playerTank,
            deltaTime
        );

        this.modules.turret.update(
            this.turret,
            this.playerTank,
            deltaTime
        );

        this.modules.enemy.update(
            this.enemy
        );
    }


    // =========================
    // 游戏渲染
    // =========================

    render() {

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;

        this.ctx.clearRect(
            0,
            0,
            width,
            height
        );

        this.ctx.fillStyle =
            "#202020";

        this.ctx.fillRect(
            0,
            0,
            width,
            height
        );

        if (!this.started) {
            return;
        }

        this.modules.enemy.render(
            this.enemy,
            this.ctx
        );

        this.playerTank.draw(
            this.ctx
        );

        this.modules.turret.render(
            this.turret,
            this.ctx,
            this.playerTank
        );
    }


    // =========================
    // 游戏循环
    // =========================

    gameLoop(timestamp) {

        if (!this.lastTime) {
            this.lastTime =
                timestamp;
        }

        const deltaTime =
            (timestamp - this.lastTime) / 1000;

        this.lastTime =
            timestamp;

        this.update(deltaTime);

        this.render();

        requestAnimationFrame(
            (time) =>
                this.gameLoop(time)
        );
    }


    // =========================
    // 运行
    // =========================

    run() {

        requestAnimationFrame(
            (time) =>
                this.gameLoop(time)
        );
    }
}

export { Game };
```
