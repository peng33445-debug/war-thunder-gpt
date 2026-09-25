import { Tank } from "../vehicle/Tank.js";
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

        this.speed = 0;
        this.maxSpeed = 180;
        this.acceleration = 420;
        this.deceleration = 520;

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

        this.speed = 0;
    }

    update(deltaTime) {
        if (!this.started) {
            return;
        }

        const input =
            inputState.movement;

        if (input.active) {

            this.speed +=
                this.acceleration *
                deltaTime;

            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            }

            const targetAngle =
                Math.atan2(
                    input.y,
                    input.x
                );

            let angleDifference =
                targetAngle -
                this.playerTank.hullAngle;

            while (angleDifference > Math.PI) {
                angleDifference -= Math.PI * 2;
            }

            while (angleDifference < -Math.PI) {
                angleDifference += Math.PI * 2;
            }

            const turnSpeed = 7;

            this.playerTank.hullAngle +=
                angleDifference *
                Math.min(
                    1,
                    turnSpeed * deltaTime
                );

        } else {

            this.speed -=
                this.deceleration *
                deltaTime;

            if (this.speed < 0) {
                this.speed = 0;
            }
        }

        this.playerTank.x +=
            Math.cos(
                this.playerTank.hullAngle
            ) *
            this.speed *
            deltaTime;

        this.playerTank.y +=
            Math.sin(
                this.playerTank.hullAngle
            ) *
            this.speed *
            deltaTime;
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
