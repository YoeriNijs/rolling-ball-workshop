const SENSITIVITY = 0.001;
const BOUNCE_FACTOR = 0.4;

const GRAVITY = { x: 0, y: 25 };

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
}

class Ball {
    constructor(element) {
        this.element = element;
        this.speed = { x: 80, y: 0 };
        this.position = { x: 5, y: 5 };
        this.size = {x: 0, y: 0};
    }

    update(miliseconds) {
        this.size.x = this.element.clientWidth;
        this.size.y = this.element.clientHeight;

        this.speed.x += GRAVITY.x;
        this.speed.y += GRAVITY.y;

        // rolweerstand
        this.speed.x *= 0.99;
        this.speed.y *= 0.99;

        this.position.x += this.speed.x * (miliseconds * SENSITIVITY);
        this.position.y += this.speed.y * (miliseconds * SENSITIVITY);
    }

    paint() {
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
        this.element.style.backgroundPosition = `${this.position.x}px ${this.position.y}px`;
    }
}

class World {
    constructor(element, ...balls) {
        this.balls = balls;
        this.element = element;
        this.size = {x: 0, y: 0};
    }

    update(miliseconds) {
        this.size.x = this.element.clientWidth;
        this.size.y = this.element.clientHeight;

        this.balls.forEach(b => {
            // bounce at the edge
            if (b.position.x <= 0 || (b.position.x + b.size.x) >= this.size.x) {
                b.speed.x *= (-1 * BOUNCE_FACTOR);
            }

            if (b.position.y <= 0 || (b.position.y + b.size.x) >= this.size.y) {
                b.speed.y *= (-1 * BOUNCE_FACTOR);
            }

            b.update(miliseconds);

            b.position.x = Math.max(0, b.position.x);
            b.position.x = Math.min(this.size.x - b.size.x, b.position.x);
            b.position.y = Math.max(0, b.position.y);
            b.position.y = Math.min(this.size.y - b.size.y, b.position.y);
        });
    }

    paint() {
        this.balls.forEach(b => b.paint());
    }
}

const ball = new Ball(document.querySelector('.ball'));
const world = new World(document.querySelector('.world'), ball);

let lastTime = new Date();

function advance() {
    const now = new Date();
    const timeDiff = now.getTime() - lastTime.getTime();

    world.update(timeDiff);
    world.paint();

    lastTime = new Date();
    requestAnimationFrame(() => advance());
}

requestAnimationFrame(() => advance());

// Device Orientation API
window.addEventListener('deviceorientation', event => {
    GRAVITY.x = event.gamma;
    GRAVITY.y = event.beta;
});