
import { Tank } from "../vehicle/Tank.js";
import { Movement } from "../movement/Movement.js";
import { Turret } from "../combat/Turret.js";
import { inputState } from "../input/Input.js";

class Game {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.lastTime = 0;
        this.started = false;

        this.playerTank = new Tank(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        this.movement = new Movement();
        this.turret = new Turret();

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
    }

    update(deltaTime) {

        if (!this.started) {
            return;
        }

        // =========================
        // 004 Movement
        // =========================

        this.movement.update(
            this.playerTank,
            inputState.movement,
            deltaTime
        );

        // =========================
        // 005 Turret
        // =========================

        this.turret.update(
            this.playerTank,
            inputState.turret,
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
        // Tank
        // =========================

        this.playerTank.draw(
            this.ctx
        );

        // =========================
        // Turret
        // =========================

        this.turret.draw(
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
