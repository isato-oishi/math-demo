// Fractal drawing
const fractalCanvas = document.getElementById("fractalCanvas");
const fractalCtx = fractalCanvas.getContext("2d");

function resizeCanvas(canvas) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas(fractalCanvas);

function drawFractal(x, y, size, depth) {
  if (depth === 0) return;

  fractalCtx.strokeStyle = `hsl(${depth * 30}, 100%, 50%)`;
  fractalCtx.beginPath();
  fractalCtx.moveTo(x, y);
  fractalCtx.lineTo(x + size, y);
  fractalCtx.lineTo(x + size / 2, y - (size * Math.sqrt(3)) / 2);
  fractalCtx.closePath();
  fractalCtx.stroke();

  drawFractal(x, y, size / 2, depth - 1);
  drawFractal(x + size / 2, y, size / 2, depth - 1);
  drawFractal(x + size / 4, y - (size * Math.sqrt(3)) / 4, size / 2, depth - 1);
}

// Wave function drawing
const waveCanvas = document.getElementById("waveCanvas");
const waveCtx = waveCanvas.getContext("2d");

resizeCanvas(waveCanvas);

let time = 0;
function animateWave() {
  waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

  const centerY = waveCanvas.height / 2;
  waveCtx.beginPath();
  waveCtx.strokeStyle = "#4CAF50";
  waveCtx.lineWidth = 2;

  for (let x = 0; x < waveCanvas.width; x++) {
    const y = centerY + Math.sin(x * 0.02 + time) * 50;
    if (x === 0) {
      waveCtx.moveTo(x, y);
    } else {
      waveCtx.lineTo(x, y);
    }
  }

  waveCtx.stroke();
  time += 0.05;
  requestAnimationFrame(animateWave);
}

// Mandelbrot Set drawing
const mandelbrotCanvas = document.getElementById("mandelbrotCanvas");
const mandelbrotCtx = mandelbrotCanvas.getContext("2d");

resizeCanvas(mandelbrotCanvas);

function drawMandelbrot() {
  const width = mandelbrotCanvas.width;
  const height = mandelbrotCanvas.height;
  const maxIterations = 100;
  const zoom = 200;
  const offsetX = width / 2;
  const offsetY = height / 2;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = (x - offsetX) / zoom;
      let b = (y - offsetY) / zoom;
      let ca = a;
      let cb = b;
      let n = 0;

      while (n < maxIterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 4) break;
        n++;
      }

      const hue = (n / maxIterations) * 360;
      mandelbrotCtx.fillStyle =
        n === maxIterations ? "#000" : `hsl(${hue}, 100%, 50%)`;
      mandelbrotCtx.fillRect(x, y, 1, 1);
    }
  }
}

// Lissajous Figure drawing
const lissajousCanvas = document.getElementById("lissajousCanvas");
const lissajousCtx = lissajousCanvas.getContext("2d");

resizeCanvas(lissajousCanvas);

let lissajousTime = 0;
function drawLissajous() {
  lissajousCtx.clearRect(0, 0, lissajousCanvas.width, lissajousCanvas.height);

  const centerX = lissajousCanvas.width / 2;
  const centerY = lissajousCanvas.height / 2;
  const radius = Math.min(centerX, centerY) * 0.8;

  lissajousCtx.beginPath();
  lissajousCtx.strokeStyle = "#FF4081";
  lissajousCtx.lineWidth = 2;

  for (let t = 0; t < Math.PI * 2; t += 0.01) {
    const x = centerX + radius * Math.sin(3 * t + lissajousTime);
    const y = centerY + radius * Math.sin(2 * t);

    if (t === 0) {
      lissajousCtx.moveTo(x, y);
    } else {
      lissajousCtx.lineTo(x, y);
    }
  }

  lissajousCtx.closePath();
  lissajousCtx.stroke();
  lissajousTime += 0.02;
  requestAnimationFrame(drawLissajous);
}

// Ulam Spiral drawing
const ulamCanvas = document.getElementById("ulamCanvas");
const ulamCtx = ulamCanvas.getContext("2d");

resizeCanvas(ulamCanvas);

function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function drawUlamSpiral() {
  const size = Math.min(ulamCanvas.width, ulamCanvas.height);
  const cellSize = size / 20;
  const centerX = ulamCanvas.width / 2;
  const centerY = ulamCanvas.height / 2;

  ulamCtx.clearRect(0, 0, ulamCanvas.width, ulamCanvas.height);

  let x = 0,
    y = 0;
  let dx = 0,
    dy = -1;
  let n = 1;
  const maxN = 400;

  while (n <= maxN) {
    if (isPrime(n)) {
      ulamCtx.fillStyle = `hsl(${(n * 2) % 360}, 100%, 50%)`;
      ulamCtx.fillRect(
        centerX + x * cellSize,
        centerY + y * cellSize,
        cellSize,
        cellSize
      );
    }

    if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
      [dx, dy] = [-dy, dx];
    }
    x += dx;
    y += dy;
    n++;
  }
}

// Sieve of Eratosthenes drawing
const sieveCanvas = document.getElementById("sieveCanvas");
const sieveCtx = sieveCanvas.getContext("2d");

resizeCanvas(sieveCanvas);

let sieveAnimationFrame = 0;
let currentNumber = 2;
const maxNumber = 200;
const numbers = Array(maxNumber + 1).fill(true);

function drawSieve() {
  const size = Math.min(sieveCanvas.width, sieveCanvas.height);
  const cellSize = size / 20;
  const cols = 20;
  const rows = Math.ceil(maxNumber / cols);

  sieveCtx.clearRect(0, 0, sieveCanvas.width, sieveCanvas.height);

  // Draw numbers
  for (let i = 1; i <= maxNumber; i++) {
    const row = Math.floor((i - 1) / cols);
    const col = (i - 1) % cols;

    if (numbers[i]) {
      sieveCtx.fillStyle = i === currentNumber ? "#FF4081" : "#4CAF50";
    } else {
      sieveCtx.fillStyle = "#333";
    }

    sieveCtx.fillRect(
      col * cellSize,
      row * cellSize,
      cellSize - 1,
      cellSize - 1
    );

    sieveCtx.fillStyle = "#fff";
    sieveCtx.font = `${cellSize * 0.6}px Arial`;
    sieveCtx.textAlign = "center";
    sieveCtx.textBaseline = "middle";
    sieveCtx.fillText(
      i.toString(),
      col * cellSize + cellSize / 2,
      row * cellSize + cellSize / 2
    );
  }

  // Animation
  if (currentNumber <= Math.sqrt(maxNumber)) {
    if (numbers[currentNumber]) {
      for (
        let i = currentNumber * currentNumber;
        i <= maxNumber;
        i += currentNumber
      ) {
        numbers[i] = false;
      }
    }
    currentNumber++;
    setTimeout(() => requestAnimationFrame(drawSieve), 500);
  }
}

// Goldbach Conjecture visualization
const goldbachCanvas = document.getElementById("goldbachCanvas");
const goldbachCtx = goldbachCanvas.getContext("2d");

resizeCanvas(goldbachCanvas);

function findPrimePairs(n) {
  const pairs = [];
  for (let i = 2; i <= n / 2; i++) {
    if (isPrime(i) && isPrime(n - i)) {
      pairs.push([i, n - i]);
    }
  }
  return pairs;
}

function drawGoldbachConjecture() {
  const width = goldbachCanvas.width;
  const height = goldbachCanvas.height;
  const maxNumber = 100;
  const cellSize = width / maxNumber;

  goldbachCtx.clearRect(0, 0, width, height);

  // Background grid
  goldbachCtx.strokeStyle = "#333";
  goldbachCtx.lineWidth = 0.5;
  for (let i = 0; i <= maxNumber; i += 2) {
    goldbachCtx.beginPath();
    goldbachCtx.moveTo(i * cellSize, 0);
    goldbachCtx.lineTo(i * cellSize, height);
    goldbachCtx.stroke();
  }

  // Draw even numbers and prime pairs
  for (let n = 4; n <= maxNumber; n += 2) {
    const pairs = findPrimePairs(n);
    pairs.forEach((pair, index) => {
      const [p1, p2] = pair;
      const y = (height * (index + 1)) / (pairs.length + 1);

      // Draw lines
      goldbachCtx.beginPath();
      goldbachCtx.strokeStyle = `hsl(${(n * 3) % 360}, 100%, 50%)`;
      goldbachCtx.lineWidth = 2;
      goldbachCtx.moveTo(p1 * cellSize, y);
      goldbachCtx.lineTo(p2 * cellSize, y);
      goldbachCtx.stroke();

      // Draw points
      goldbachCtx.fillStyle = "#fff";
      goldbachCtx.beginPath();
      goldbachCtx.arc(p1 * cellSize, y, 3, 0, Math.PI * 2);
      goldbachCtx.arc(p2 * cellSize, y, 3, 0, Math.PI * 2);
      goldbachCtx.fill();
    });
  }
}

// Fibonacci Sequence visualization
const fibonacciCanvas = document.getElementById("fibonacciCanvas");
const fibonacciCtx = fibonacciCanvas.getContext("2d");

resizeCanvas(fibonacciCanvas);

let fibTime = 0;
function drawFibonacci() {
  const width = fibonacciCanvas.width;
  const height = fibonacciCanvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxFib = 20;

  fibonacciCtx.clearRect(0, 0, width, height);

  // Calculate Fibonacci sequence
  let fib = [0, 1];
  for (let i = 2; i < maxFib; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // Golden ratio
  const phi = (1 + Math.sqrt(5)) / 2;

  // Draw spiral
  fibonacciCtx.beginPath();
  fibonacciCtx.strokeStyle = "#4CAF50";
  fibonacciCtx.lineWidth = 2;

  let x = centerX;
  let y = centerY;
  let angle = 0;
  const scale = Math.min(width, height) / (fib[maxFib - 1] * 2);

  for (let i = 0; i < maxFib; i++) {
    const radius = fib[i] * scale;

    // Draw squares
    fibonacciCtx.strokeStyle = `hsl(${(i * 30) % 360}, 100%, 50%)`;
    fibonacciCtx.strokeRect(x - radius / 2, y - radius / 2, radius, radius);

    // Calculate next position
    x += radius * Math.cos(angle);
    y += radius * Math.sin(angle);
    angle += Math.PI / 2;
  }

  // Animation
  fibTime += 0.01;
  requestAnimationFrame(drawFibonacci);
}

// Initial drawing
drawFractal(50, 250, 200, 5);
animateWave();
drawMandelbrot();
drawLissajous();
drawUlamSpiral();
drawSieve();
drawGoldbachConjecture();
drawFibonacci();

// Window resize handler
window.addEventListener("resize", () => {
  resizeCanvas(fractalCanvas);
  resizeCanvas(waveCanvas);
  resizeCanvas(mandelbrotCanvas);
  resizeCanvas(lissajousCanvas);
  resizeCanvas(ulamCanvas);
  resizeCanvas(sieveCanvas);
  resizeCanvas(goldbachCanvas);
  resizeCanvas(fibonacciCanvas);
  drawFractal(50, 250, 200, 5);
  drawMandelbrot();
  drawUlamSpiral();
  drawSieve();
  drawGoldbachConjecture();
});
