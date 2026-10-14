# me
About Me &amp; Contact Me (Simple and Clear) 

# Lee Zishan Ling — personal card

Phone-first two-page site for NFC / contact sharing.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `styles.css` | Layout, colors, animations |
| `app.js` | Swipe + page logic |
| `content.js` | **Edit this only** for text and links |
| `photo.jpg` | Optional portrait (add yourself) |
| `wechat.png` | Optional WeChat QR (add yourself) |

## Edit your info

Open `content.js` and change name, headline, location, achievements, specialties, hobbies, and social links.

For images:

1. Put `photo.jpg` and `wechat.png` in the **same folder** as `index.html`.
2. In `content.js` keep:
   - `photo: "photo.jpg"`
   - `wechat.image: "wechat.png"`

If a file is missing, the site shows a fallback (LZ mark / text note).

## Preview locally

Open `index.html` in a browser, or run a simple server in this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

1. Create a repo (example name: `card` or `yourusername.github.io`).
2. Upload these files to the repo root.
3. Settings → Pages → Deploy from `main` branch / root.
4. Your link will be something like:
   - `https://yourusername.github.io/` or
   - `https://yourusername.github.io/repo-name/`

Write that HTTPS link onto your NFC tag.

## How to use the site

- Swipe left → Contact page  
- Swipe right → About page  
- Or tap the green edge tabs / bottom dots  

Content slides in one block at a time when a page becomes active.

