import { Tank } from "../vehicle/Tank.js";
import { Movement } from "../vehicle/Movement.js";

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

        this.playerMovement =
            new Movement(
                this.playerTank
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

        this.playerMovement.speed = 0;
    }

    update(deltaTime) {
        if (!this.started) {
            return;
        }

        this.playerMovement.update(
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

        if (this.started) {
            this.playerTank.draw(
                this.ctx
            );
        }
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
