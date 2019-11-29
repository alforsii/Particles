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
    this.velocity = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
    };
    this.radius = r;
    this.color = color;
    // this.elasticVelocity = new ElasticVelocity();
    this.mass = 1;
  }

  update(particles) {
    this.draw();
    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;
      let distance = getDistance(
        this.x,
        this.y,
        particles[i].x,
        particles[i].y
      );
      if (distance < this.radius * 2) {
        console.log('has collide');
        //https://en.wikipedia.org/wiki/Elastic_collision
        //we need to do elastic collision in here.
        // this.velocity.x = -this.velocity.x;
        // this.velocity.y = -this.velocity.y;

        resolveCollision(this, particles[i]);
      }
    }

    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
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
    let radius = 45;
    let color = 'blue';
    // let x = Math.random() * canvas.width;
    // let y = Math.random() * canvas.height;
    //we'll switch our random x and y to keep particles inside the canvas.
    let x = randomWithinBoundaries(radius, canvas.width - radius);
    let y = randomWithinBoundaries(radius, canvas.height - radius);
    //second loop we wont to check for collision detection if one particle is not overlapping on top another.
    //first iteration we want to skip to have fist particle in our array to compare with.
    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        //we'll our function getDistance() in line 64,to calculate distance and compare for collision.
        //lets get distance between first and second particles.
        let distance = getDistance(x, y, particles[j].x, particles[j].y);
        if (distance < radius * 2) {
          x = randomWithinBoundaries(radius, canvas.width - radius);
          y = randomWithinBoundaries(radius, canvas.height - radius);
          j = -1;
        }
        //or ==>>
        // if(distance - radius*2<0){}
      }
    }
    particles.push(new Particle(x, y, radius, color));
  }
}

//Create a function to create a random number that will
//keep our particles within our canvas height and width.
function randomWithinBoundaries(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Create animation function to draw circles.

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update(particles);
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
