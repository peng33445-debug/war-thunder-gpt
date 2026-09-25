import { Game } from "./core/Game.js";


/* =========================
   Canvas
   ========================= */

const canvas =
    document.getElementById("gameCanvas");


/* =========================
   Game Core
   ========================= */

const game =
    new Game(canvas);


/* =========================
   试车场按钮
   ========================= */

const testFieldButton =
    document.getElementById("testFieldButton");

const mainMenu =
    document.getElementById("mainMenu");

const gameUI =
    document.getElementById("gameUI");


testFieldButton.addEventListener(
    "click",
    () => {

        mainMenu.style.display = "none";

        gameUI.style.display = "block";

        game.start();

    }
);


/* =========================
   启动游戏核心
   ========================= */

game.run();
