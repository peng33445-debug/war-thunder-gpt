```javascript
import { Guide } from "./Guide.js";


class Game {

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.lastTime = 0;
        this.started = false;

        // =========================
        // Guide
        // =========================

        const modules =
            Guide.modules;


        // =========================
        // Player Tank
        // =========================

        this.playerTank =
            modules.tank.create(
                window.innerWidth / 2,
                window.innerHeight / 2
            );


        // =========================
        // Movement
        // =========================

        this.movement =
            modules.movement.create();


        // =========================
        // Turret
        // =========================

        this.turret =
            modules.turret.create();


        // =========================
        // Enemy
        // =========================

        this.enemy =
            modules.enemy.create(
                window.innerWidth * 0.72,
                window.innerHeight / 2
            );


        // =========================
        // Camera
        // =========================

        this.camera =
            modules.camera.create();


        this.resizeCanvas();

        window.addEventListener(
            "resize",
            () => this.resizeCanvas()
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


        // =========================
        // Camera 尺寸
        // =========================

        Guide.modules.camera.resize(
            this.camera,
            width,
            height
        );
    }


    // =========================
    // 游戏开始
    // =========================

    start() {

        this.started = true;


        // =========================
        // Player Position
        // =========================

        this.playerTank.x =
            window.innerWidth / 2;

        this.playerTank.y =
            window.innerHeight / 2;


        // =========================
        // Movement
        // =========================

        this.movement.reset();


        // =========================
        // Enemy Position
        // =========================

        this.enemy.x =
            window.innerWidth * 0.72;

        this.enemy.y =
            window.innerHeight / 2;


        // =========================
        // Camera 初始位置
        // =========================

        Guide.modules.camera.snapTo(
            this.camera,
            this.playerTank
        );
    }


    // =========================
    // 游戏更新
    // =========================

    update(deltaTime) {

        if (!this.started) {
            return;
        }


        // =========================
        // Guide → Movement
        // =========================

        Guide.modules.movement.update(
            this.movement,
            this.playerTank,
            deltaTime
        );


        // =========================
        // Guide → Turret
        // =========================

        Guide.modules.turret.update(
            this.turret,
            this.playerTank,
            deltaTime
        );


        // =========================
        // Guide → Enemy
        // =========================

        Guide.modules.enemy.update(
            this.enemy
        );


        // =========================
        // Guide → Camera
        // =========================

        Guide.modules.camera.follow(
            this.camera,
            this.playerTank,
            deltaTime
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


        // =========================
        // 清除画面
        // =========================

        this.ctx.clearRect(
            0,
            0,
            width,
            height
        );


        // =========================
        // 背景
        // =========================

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


        // =========================
        // 世界坐标开始
        // =========================

        this.ctx.save();

        this.ctx.translate(
            -this.camera.x,
            -this.camera.y
        );


        // =========================
        // Enemy
        // =========================

        Guide.modules.enemy.render(
            this.enemy,
            this.ctx
        );


        // =========================
        // Tank
        // =========================

        this.playerTank.draw(
            this.ctx
        );


        // =========================
        // Guide → Turret
        // =========================

        Guide.modules.turret.render(
            this.turret,
            this.ctx,
            this.playerTank
        );


        // =========================
        // 世界坐标结束
        // =========================

        this.ctx.restore();
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
