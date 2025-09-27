document.getElementById('open-btn').addEventListener('click', () => {
  const leftDoor = document.querySelector('.left-door');
  const rightDoor = document.querySelector('.right-door');
  const music = document.getElementById('bg-music');
  const creak = document.getElementById('door-sound');
  const flowerContainer = document.getElementById('flower-container');

  // Open doors animation
  leftDoor.style.transform = 'translateX(-100%)';
  rightDoor.style.transform = 'translateX(100%)';

  // Play sounds
  creak.play();
  music.play();

  // Falling Flowers
  function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDuration = (Math.random() * 12 + 2) + 's';
    flower.style.opacity = Math.random();
    flowerContainer.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 5000);
  }
  setInterval(createFlower, 300);
  flowerContainer.classList.remove('hidden');

  // Fireworks logic
  function createFirework(x, y) {
    const colors = ['#ff007f', '#00ffd0', '#f9f871', '#ff6600', '#ffffff'];
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement('div');
      spark.classList.add('spark');
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.background = colors[Math.floor(Math.random() * colors.length)];

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 80 + 30;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      spark.style.setProperty('--dx', `${dx}px`);
      spark.style.setProperty('--dy', `${dy}px`);
      document.body.appendChild(spark);

      setTimeout(() => spark.remove(), 1200);
    }
  }

  // Launch fireworks every 1.5 seconds randomly
  function launchFireworks() {
    setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight / 2;
      createFirework(x, y);
    }, 1500);
  }
// Reveal welcome screen after doors open
setTimeout(() => {
  document.querySelector('.door-scene').style.display = 'none';

  const welcomeScreen = document.querySelector('.welcome-screen');
  welcomeScreen.classList.remove('hidden');

  // After 3 seconds, hide welcome screen and show main content
  setTimeout(() => {
    welcomeScreen.style.display = 'none';

    const content = document.querySelector('.content');
    content.classList.remove('hidden');
    content.style.display = 'block';

    // Start fireworks
    launchFireworks();
  }, 3000); // Show welcome screen for 3 seconds
}, 2000); // Wait for door animation

});
