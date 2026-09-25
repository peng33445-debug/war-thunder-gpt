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

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


/* =========================
   游戏更新
   ========================= */

function update(deltaTime) {

    // 以后：
    // 移动
    // 炮塔
    // 敌人
    // 炮弹
    // 地图
    // 伤害
    // 都会在这里连接进来

}


/* =========================
   游戏渲染
   ========================= */

function render() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    /*
     * 当前只是测试 Canvas 是否正常工作。
     * 正式地图和坦克之后再接入。
     */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    ctx.fillStyle = "#202020";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

    /*
     * Canvas 中央测试点
     */

    ctx.fillStyle = "#ffffff";

    ctx.beginPath();

    ctx.arc(
        width / 2,
        height / 2,
        4,
        0,
        Math.PI * 2
    );

    ctx.fill();
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

    requestAnimationFrame(gameLoop);
}


/* =========================
   启动游戏
   ========================= */

requestAnimationFrame(gameLoop);
