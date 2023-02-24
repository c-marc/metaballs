const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "white";

class Ball {
  constructor(effect) {
    this.effect = effect;
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
    this.radius = Math.random() * 80 + 20;
    this.speedX = Math.random() - 0.5;
    this.speedY = Math.random() - 0.5;
    // more effects
    this.angle = 0;
    this.va = Math.random() * 0.1 - 0.05;
    this.range = Math.random() * 20;
  }
  update() {
    // bounce on border
    if (this.x < this.radius || this.x > canvas.width - this.radius)
      this.speedX *= -1;
    if (this.y < this.radius || this.y > canvas.height - this.radius)
      this.speedY *= -1;
    // this.x += this.speedX;
    // this.y += this.speedY;
    // more effects: make the speed a periodic func
    this.angle += this.va;
    this.x += this.speedX * Math.cos(this.angle) * this.range;
    this.y += this.speedY * Math.cos(this.angle) * this.range;
    //or with +
    // this.x += this.speedX + Math.cos(this.angle) * this.range
    // this.y += this.speedY + Math.cos(this.angle) * this.range
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
  // when resizing
  reset() {
    this.x = this.effect.width * 0.5;
    this.x = this.effect.height * 0.5;
  }
}

class MetaballsEffet {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.metaballsArray = [];
  }
  init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.metaballsArray.push(new Ball(this));
    }
  }
  update() {
    this.metaballsArray.forEach((metaball) => metaball.update());
  }
  draw(context) {
    this.metaballsArray.forEach((metaball) => metaball.draw(context));
  }
  reset(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
    this.metaballsArray.forEach((metaball) => metaball.reset());
  }
}

const effect = new MetaballsEffet(canvas.width, canvas.height);
effect.init(20);
console.log(effect);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.update();
  effect.draw(ctx);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // resizing also reset ctx states, so it needs to be set again
  ctx.fillStyle = "white";
  effect.reset(canvas.width, canvas.height);
});
