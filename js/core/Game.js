import { Tank } from "../vehicle/Tank.js";
import { Movement } from "../vehicle/Movement.js";


class Game {

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.lastTime = 0;

        this.started = false;


        /*
         * 玩家坦克
         */

        this.playerTank = new Tank(
            window.innerWidth / 2,
            window.innerHeight / 2
        );


        /*
         * 玩家移动
         */

        this.playerMovement =
            new Movement(
                this.playerTank
            );


        /*
         * Canvas 尺寸
         */

        this.resizeCanvas();

        window.addEventListener(
            "resize",
            () => this.resizeCanvas()
        );

    }


    /* =========================
       Canvas 尺寸
       ========================= */

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


    /* =========================
       开始游戏
       ========================= */

    start() {

        this.started = true;

        this.playerTank.x =
            window.innerWidth / 2;

        this.playerTank.y =
            window.innerHeight / 2;

        this.playerMovement.speed = 0;

    }


    /* =========================
       游戏更新
       ========================= */

    update(deltaTime) {

        if (!this.started) {
            return;
        }


        /*
         * 004 Movement
         *
         * 当前先接入移动模块。
         */

        this.playerMovement.update(
            deltaTime
        );

    }


    /* =========================
       游戏渲染
       ========================= */

    render() {

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;


        /*
         * 清空画面
         */

        this.ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /*
         * 测试场背景
         */

        this.ctx.fillStyle =
            "#202020";

        this.ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /*
         * 玩家坦克
         */

        if (this.started) {

            this.playerTank.draw(
                this.ctx
            );

        }

    }


    /* =========================
       游戏循环
       ========================= */

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


    /* =========================
       运行
       ========================= */

    run() {

        requestAnimationFrame(
            (time) =>
                this.gameLoop(time)
        );

    }

}


export { Game };
