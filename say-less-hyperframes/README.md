# Van Arion — Say Less (HyperFrames-style Promo)

Premium 9:16 lyric visualizer/promo composition (45s) built as a browser-playable project.

## What this project includes
- Vertical composition targeting **1080x1920**, optimized for Shorts/Reels/TikTok.
- Animated text timeline for requested moments.
- Neon/ocean-night look with glassy reflections, particles, light flares, and pulse movement.
- Audio segment playback logic for the requested range: **00:48 → 01:33**.

## Folder structure

```text
say-less-hyperframes/
  package.json
  README.md
  src/
    index.html
    styles.css
    main.js
  assets/
    audio/
    visuals/
```

## Audio handling status
- Source file used: `../say-less-van-arion-full-192k.mp3` (referenced from `src/index.html`).
- In this environment, `ffmpeg` is unavailable, so trimming could not be executed here.

### Local trim command (recommended)
Run from repository root:

```bash
ffmpeg -y -ss 00:48 -to 01:33 -i say-less-van-arion-full-192k.mp3 -c copy say-less-hyperframes/assets/audio/say-less-promo-45s.mp3
```

Then update `src/index.html` audio source to:

```html
<source src="../assets/audio/say-less-promo-45s.mp3" type="audio/mpeg" />
```

## Preview locally
From repo root:

```bash
python3 -m http.server 4173
```

Open: `http://localhost:4173/say-less-hyperframes/src/index.html`

Press **Start 45s Promo Segment (00:48)** to sync visuals and play promo segment.

## MP4 rendering options
This project is browser-native (HTML/CSS/JS). If you need MP4 output with audio, use one of these local methods:

1. **OBS Studio / Screen capture** at 1080x1920, 30fps or 60fps, while audio plays segment.
2. **Playwright + FFmpeg pipeline** (advanced) capturing frame sequence then muxing with trimmed audio.

Example mux step after frame export:

```bash
ffmpeg -r 30 -i frames/frame-%05d.png -i say-less-hyperframes/assets/audio/say-less-promo-45s.mp3 -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest say-less-hyperframes/output/say-less-promo.mp4
```

## HyperFrames usage note
- HyperFrames plugin/runtime was **not available** in this environment.
- This implementation is the closest **HyperFrames-style** composition using HTML/CSS/JS + GSAP.
