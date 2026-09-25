class Camera {

    constructor() {

        this.x = 0;
        this.y = 0;

        this.width =
            window.innerWidth;

        this.height =
            window.innerHeight;
    }

    resize(width, height) {

        this.width = width;
        this.height = height;
    }

    follow(target) {

        this.x =
            target.x -
            this.width / 2;

        this.y =
            target.y -
            this.height / 2;
    }

    worldToScreen(x, y) {

        return {
            x: x - this.x,
            y: y - this.y
        };
    }

    screenToWorld(x, y) {

        return {
            x: x + this.x,
            y: y + this.y
        };
    }
}

export { Camera };
