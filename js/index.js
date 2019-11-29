//1.Step - get canvas and context.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// // this is just for reference if you want to
//set canvas with and height to your web browser size.
//___________________________
// canvas.width = innerWidth;
// canvas.height = innerHeight;

//2.Create a class to make Circles.
class Particle {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

let particles;
function init() {
  particles = [];
}

//5. Create animation function to draw circles.

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // bigCircle.draw();
  // smallCircle.draw();
  // smallCircle.x = mouse.x;
  // smallCircle.y = mouse.y;
  // let distance = getDistance(
  //   smallCircle.x,
  //   smallCircle.y,
  //   bigCircle.x,
  //   bigCircle.y
  // );
  // if (distance < smallCircle.radius + bigCircle.radius) {
  //   bigCircle.color = 'red';
  // } else {
  //   bigCircle.color = 'black';
  // }

  //   console.log('Output for: animate -> timer', timer);
}

//6.Use pythagorean theorem to find the distance.
// distance^2 === (x2-x1)^2 + (y2-y1)^2 ;
// distance === Math.sqrt((x2-x1)^2 + (y2-y1)^2);
//Math.pow(base,exponent);
//The Math.pow() function returns the base to the exponent power, that is: base^exponent.
function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// call functions we need to animate our circles.
init();
animate();
