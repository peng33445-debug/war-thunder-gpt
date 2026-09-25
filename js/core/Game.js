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

    start() {

        this.started = true;

        // =========================
        // Player Position
        // =========================

        this.playerTank.x =
            window.innerWidth / 2;

        this.playerTank.y =
            window.innerHeight / 2;

        this.movement.reset();

        // =========================
        // Enemy Position
        // =========================

        this.enemy.x =
            this.playerTank.x +
            260;

        this.enemy.y =
            this.playerTank.y;

        // =========================
        // Camera 初始位置
        // =========================

        this.camera.x =
            this.playerTank.x -
            window.innerWidth / 2;

        this.camera.y =
            this.playerTank.y -
            window.innerHeight / 2;
    }

    update(deltaTime) {

        if (!this.started) {
            return;
        }

        // =========================
        // Movement
        // =========================

        Guide.modules.movement.update(
            this.movement,
            this.playerTank,
            deltaTime
        );

        // =========================
        // Turret
        // =========================

        Guide.modules.turret.update(
            this.turret,
            this.playerTank,
            deltaTime
        );

        // =========================
        // Enemy
        // =========================

        Guide.modules.enemy.update(
            this.enemy
        );

        // =========================
        // Camera
        // =========================

        Guide.modules.camera.follow(
            this.camera,
            this.playerTank,
            deltaTime
        );
    }

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

        // =========================
        // Enemy
        // =========================

        const enemyScreen =
            Guide.modules.camera.worldToScreen(
                this.camera,
                this.enemy.x,
                this.enemy.y
            );

        this.ctx.save();

        this.ctx.translate(
            enemyScreen.x - this.enemy.x,
            enemyScreen.y - this.enemy.y
        );

        Guide.modules.enemy.render(
            this.enemy,
            this.ctx
        );

        this.ctx.restore();

        // =========================
        // Player Tank
        // =========================

        const playerScreen =
            Guide.modules.camera.worldToScreen(
                this.camera,
                this.playerTank.x,
                this.playerTank.y
            );

        this.ctx.save();

        this.ctx.translate(
            playerScreen.x - this.playerTank.x,
            playerScreen.y - this.playerTank.y
        );

        this.playerTank.draw(
            this.ctx
        );

        // =========================
        // Turret
        // =========================

        Guide.modules.turret.render(
            this.turret,
            this.ctx,
            this.playerTank
        );

        this.ctx.restore();
    }

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

    run() {

        requestAnimationFrame(
            (time) =>
                this.gameLoop(time)
        );
    }
}

export { Game };
