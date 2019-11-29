//1.Step - get canvas and context.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// // this is just for reference if you want to
//set canvas with and height to your web browser size.
//___________________________
// canvas.width = innerWidth;
// canvas.height = innerHeight;

//Create a class to make Particle.
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
    // ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    // ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

let particles;
function getParticles(particlesNum) {
  particles = [];
  //first loop is to create particles
  for (let i = 0; i < particlesNum; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let radius = 45;
    let color = 'blue';
    //second loop we wont to check for collision detection if one particle is not overlapping on top another.
    //first iteration we want to skip to have fist particle in our array to compare with.
    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        //we'll our function getDistance() in line 64,to calculate distance and compare for collision.
        //lets get distance between first and second particles.
        let distance = getDistance(x, y, particles[j].x, particles[j].y);
        if (distance < radius * 2) {
          x = Math.random() * canvas.width;
          y = Math.random() * canvas.height;
          j = -1;
        }
        //or ==>>
        // if(distance - radius*2<0){}
      }
    }
    particles.push(new Particle(x, y, radius, color));
  }
}

// Create animation function to draw circles.

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.draw();
  });
}

//Use pythagorean theorem to find the distance.
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
getParticles(7);
animate();
