import { Tank } from "./vehicle/Tank.js";
import { inputState } from "./input/Input.js";


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let lastTime = 0;


/* =========================
   Canvas 尺寸
   ========================= */

function resizeCanvas() {

    const dpr = window.devicePixelRatio || 1;

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* =========================
   003 坦克
   ========================= */

const playerTank = new Tank(
    window.innerWidth / 2,
    window.innerHeight / 2
);


/* =========================
   游戏更新
   ========================= */

function update(deltaTime) {

    /*
     * 当前阶段暂时不移动坦克。
     *
     * 左摇杆已经由 002 Input 接收，
     * 下一阶段再交给 004 Movement。
     */

}


/* =========================
   游戏渲染
   ========================= */

function render() {

    const width = window.innerWidth;
    const height = window.innerHeight;


    /*
     * 清空画面
     */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /*
     * 测试场背景
     */

    ctx.fillStyle = "#202020";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
     * 绘制玩家坦克
     */

    playerTank.draw(ctx);

}


/* =========================
   游戏主循环
   ========================= */

function gameLoop(timestamp) {

    if (!lastTime) {

        lastTime = timestamp;

    }

    const deltaTime =
        (timestamp - lastTime) / 1000;

    lastTime = timestamp;


    update(deltaTime);

    render();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================
   启动游戏
   ========================= */

requestAnimationFrame(
    gameLoop
);
