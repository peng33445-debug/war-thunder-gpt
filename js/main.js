import { Game } from "./core/Game.js";

const canvas =
    document.getElementById("gameCanvas");

const game =
    new Game(canvas);

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

game.run();
