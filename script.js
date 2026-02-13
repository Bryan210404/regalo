const message = "Esto no es un mensaje de último minuto. He estado pensando en esto desde hace tiempo...";
let i = 0;

function type() {
    if (i < message.length) {
        document.getElementById('text').textContent += message.charAt(i);
        i++;
        setTimeout(type, 50);
    } else {
        document.getElementById('btn').classList.add('show');
    }
}

setTimeout(type, 500);

document.getElementById('btn').addEventListener('click', function () {
    document.getElementById('screen1').classList.remove('active');
    setTimeout(function () {
        document.getElementById('screen1').style.display = 'none';
        document.getElementById('screen2').classList.add('active');
    }, 500);
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        const colors = [
            'rgba(255, 105, 180,',
            'rgba(0, 217, 255,',
            'rgba(138, 43, 226,'
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();
