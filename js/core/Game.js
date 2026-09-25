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
    }

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

        Guide.modules.enemy.render(
            this.enemy,
            this.ctx
        );

        // =========================
        // Player Tank
        // =========================

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
