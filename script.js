const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray;

// create constructor function
function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

// add a draw method to particle prototype
Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}


// const particle1 = new Particle(100, 50, 20, 0, 20, 'red');
// particle1.draw();

// add update method to particle prototype

Particle.prototype.update = function () {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
}

// let r_a = .8;
// GRADIENT//////////////////////////////////////////
/* let gradient = ctx.createRadialGradient(100,10,210, 200,100,70);
gradient.addColorStop(0, 'pink');
gradient.addColorStop(.9, 'white');
gradient.addColorStop(1, 'black');
*/

let gradient = ctx.createRadialGradient(200,100,200, 200,100,70000);
// Add three color stops
gradient.addColorStop(0, 'black');
gradient.addColorStop(0, 'white');
gradient.addColorStop(.5, 'black');

// create particle array
function init() {
    particleArray = [];
    for (let i = 0; i < 100; i++) {
        let size = Math.random() * 3.7 ;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * 2.4) - 1.2;
        let directionY = (Math.random() * 1.4) - 2.2;
        //let color = "rgba(122, 35, 221, " + r_a + ")"; 
        let color = gradient; 

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, innerWidth, innerHeight);
    

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

setInterval(() => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

}, 15000);
init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setInterval(() => {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    }, 10);
    init();  
    
});