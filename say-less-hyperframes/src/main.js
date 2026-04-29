const SEGMENT_START = 48;
const SEGMENT_END = 93;
const DURATION = SEGMENT_END - SEGMENT_START;

const track = document.getElementById('track');
const startBtn = document.getElementById('startBtn');
const frame = document.querySelector('.frame');
const lines = ['line1','line2','line3','line4','line5','line6','line7'].map((id) => document.getElementById(id));

function cueText() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const blocks = [
    [lines[0], 0, 4],
    [lines[1], 4, 8],
    [lines[2], 8, 14],
    [lines[3], 14, 20],
    [lines[4], 20, 27],
    [lines[5], 34, 40],
    [lines[6], 40, 45]
  ];

  blocks.forEach(([el, start, end]) => {
    tl.to(el, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8 }, start);
    tl.to(el, { opacity: 0, y: -12, scale: 1.03, filter: 'blur(4px)', duration: 0.8 }, end - 0.8);
  });

  tl.to(frame, { filter: 'brightness(1.16) saturate(1.2)', duration: 0.18, repeat: Math.floor(DURATION * 2), yoyo: true, ease: 'sine.inOut' }, 0);

  return tl;
}

function kickOffSegment() {
  if (!track) return;
  track.currentTime = SEGMENT_START;
  track.play();
  gsap.killTweensOf('.flare');
  gsap.to('.flare-a', { xPercent: 10, yPercent: -5, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.flare-b', { xPercent: -8, yPercent: 7, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  cueText();
}

startBtn.addEventListener('click', kickOffSegment);
track.addEventListener('timeupdate', () => {
  if (track.currentTime >= SEGMENT_END) {
    track.pause();
  }
});

function particles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  const particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.3,
    vy: Math.random() * 0.7 + 0.2,
    vx: (Math.random() - 0.5) * 0.2,
    hue: Math.random() > 0.5 ? 190 : 265
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.y -= p.vy;
      p.x += p.vx;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, .75)`;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, 0.8)`;
      ctx.shadowBlur = 12;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}
particles();
