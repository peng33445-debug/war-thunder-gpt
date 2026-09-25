const movementJoystick = document.getElementById("movementJoystick");
const turretJoystick = document.getElementById("turretJoystick");
const fireButton = document.getElementById("fireButton");


const inputState = {

    movement: {
        x: 0,
        y: 0,
        active: false
    },

    turret: {
        x: 0,
        y: 0,
        active: false
    },

    fire: false

};


function setupJoystick(element, output) {

    let pointerId = null;

    function updateJoystick(event) {

        const rect = element.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let x = event.clientX - centerX;
        let y = event.clientY - centerY;

        const radius = rect.width / 2;

        const distance = Math.hypot(x, y);

        if (distance > radius) {

            x = x / distance * radius;
            y = y / distance * radius;

        }

        output.x = x / radius;
        output.y = y / radius;
        output.active = true;

        const inner = element.querySelector(".joystickInner");

        if (inner) {

            inner.style.left =
                `calc(50% + ${x}px)`;

            inner.style.top =
                `calc(50% + ${y}px)`;

        }

    }


    function resetJoystick() {

        pointerId = null;

        output.x = 0;
        output.y = 0;
        output.active = false;

        const inner = element.querySelector(".joystickInner");

        if (inner) {

            inner.style.left = "50%";
            inner.style.top = "50%";

        }

    }


    element.addEventListener(
        "pointerdown",
        event => {

            if (pointerId !== null) {
                return;
            }

            pointerId = event.pointerId;

            element.setPointerCapture(pointerId);

            updateJoystick(event);

        }
    );


    element.addEventListener(
        "pointermove",
        event => {

            if (event.pointerId !== pointerId) {
                return;
            }

            updateJoystick(event);

        }
    );


    element.addEventListener(
        "pointerup",
        event => {

            if (event.pointerId !== pointerId) {
                return;
            }

            resetJoystick();

        }
    );


    element.addEventListener(
        "pointercancel",
        event => {

            if (event.pointerId !== pointerId) {
                return;
            }

            resetJoystick();

        }
    );

}


setupJoystick(
    movementJoystick,
    inputState.movement
);


setupJoystick(
    turretJoystick,
    inputState.turret
);


fireButton.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();

        inputState.fire = true;

    }
);


fireButton.addEventListener(
    "pointerup",
    event => {

        event.preventDefault();

        inputState.fire = false;

    }
);


fireButton.addEventListener(
    "pointercancel",
    () => {

        inputState.fire = false;

    }
);


fireButton.addEventListener(
    "pointerleave",
    () => {

        inputState.fire = false;

    }
);


export { inputState };
