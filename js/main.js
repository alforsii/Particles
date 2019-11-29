//1.Step - get canvas and context.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// // this is just for reference if you want to
//set canvas with and height to your web browser size.
//___________________________
// canvas.width = innerWidth;
// canvas.height = innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
document.addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

//Create a class to make Particle.
class Particle {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5,
    };
    this.radius = r;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
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
        // console.log('has collide');
        //https://en.wikipedia.org/wiki/Elastic_collision
        //we need to do elastic collision in here.
        // this.velocity.x = -this.velocity.x;
        // this.velocity.y = -this.velocity.y;

        resolveCollision(this, particles[i]);
      }
    }
    // this where we change particles velocity when they hit the wall,
    // in order to keep them inside the canvas.
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y;
    }

    //mouse detection on hovering. Below in getDistance number 80 is a radius if you check getDistance()
    if (
      getDistance(mouse.x, mouse.y, this.x, this.y) < 80 &&
      this.opacity <= 0.3
    ) {
      // console.log('hovered');
      //lets create first fill color in draw().
      this.opacity += 0.05;
      //to restrict opacity we add to our if statement above (&& this.opacity<=any number) restrict to
      //so when we hover particles will get fill up to color opacity we provide.
    } else if (this.opacity > 0) {
      this.opacity -= 0.01;
      //this will make our opacity go below (opacity<0)
      //which we don't want, to avoid this issue we gotta make sure
      //that opacity >0
      this.opacity = Math.max(0, this.opacity);
      //Math.max what it does,is that it returns 0 or current opacity if it's > 0.
    }

    //move particles
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  //draw circle for a particle.
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.save(); //we save color to restore after opacity and fill() to restore border color for stroke()
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }
}

//colors
const colors = [
  '#00f', //purple
  '#0f0', //green
  '#0ff', //lightBlue
  '#f0f', //red
  // '#ff0', //yellow
];

//get random color
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

//here we create bunch of particles.
let particles;
function getParticles(particlesNum) {
  particles = [];
  //first loop is to create particles
  for (let i = 0; i < particlesNum; i++) {
    let radius = 15;
    let color = randomColor(colors);
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
getParticles(150);
animate();
