/**
 * server.js — Pintu Napit Portfolio Backend
 * ──────────────────────────────────────────
 * REST API Endpoints:
 *   GET  /api/health            → Server status check
 *   GET  /api/download/resume   → Download Resume PDF
 *   GET  /api/download/cv       → Download CV (alias for resume)
 *
 * Static serving:
 *   Serves index.html, style.css, script.js, photo.jpg from root
 */

'use strict';

const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const path    = require('path');
const fs      = require('fs');

require('dotenv').config();

// ── Express App ──────────────────────────────────────────────────────────────
const app  = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(morgan('dev'));

// Helmet with relaxed CSP for CDN fonts / icons
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc:  ["'self'"],
        scriptSrc:   ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
        styleSrc:    ["'self'", "'unsafe-inline'",
                      "fonts.googleapis.com", "cdnjs.cloudflare.com"],
        fontSrc:     ["'self'", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
        imgSrc:      ["'self'", "data:", "images.unsplash.com", "blob:"],
        connectSrc:  ["'self'"],
        frameSrc:    ["'self'"],
        objectSrc:   ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(cors({
  origin:  process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '10kb' }));

// ── Static Files ─────────────────────────────────────────────────────────────
// Serve Resume.pdf with headers that allow iframe embedding
app.get('/Resume.pdf', (req, res) => {
  const resumePath = path.join(__dirname, 'Resume.pdf');
  if (!fs.existsSync(resumePath)) {
    return res.status(404).send('Resume not found');
  }
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.sendFile(resumePath);
});

app.use(express.static(path.join(__dirname), {
  maxAge: '1d',
  setHeaders(res, filePath) {
    if (path.extname(filePath) === '.html') {
      res.setHeader('Cache-Control', 'no-cache');
    }
  },
  // Don't auto-serve node_modules or hidden files
  dotfiles: 'ignore',
}));

// ── Helper: find the resume PDF ──────────────────────────────────────────────
function findResume() {
  const candidates = [
    'Resume.pdf',
    'resume.pdf',
    'Pintu_Napit_Resume.pdf',
    'CV.pdf',
    'cv.pdf',
  ];
  for (const name of candidates) {
    const full = path.join(__dirname, name);
    if (fs.existsSync(full)) return { filePath: full, fileName: name };
  }
  return null;
}

// ── API: Health Check ────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  const resume = findResume();
  res.json({
    status:    'ok',
    server:    'Pintu Napit Portfolio API',
    timestamp: new Date().toISOString(),
    resume:    resume ? `found: ${resume.fileName}` : 'not found — add Resume.pdf',
  });
});

// ── API: Download Resume ──────────────────────────────────────────────────────
app.get('/api/download/resume', (req, res) => {
  const result = findResume();

  if (!result) {
    return res.status(404).json({
      error:   'Resume not found',
      fix:     'Copy your Resume.pdf file into the portfolio1 folder',
    });
  }

  res.setHeader('Content-Disposition',
    'attachment; filename="Pintu_Napit_Resume.pdf"');
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(result.filePath, (err) => {
    if (err) {
      console.error('Resume send error:', err);
      res.status(500).json({ error: 'Failed to send resume file' });
    }
  });
});

// ── API: Download CV (same file, different filename) ─────────────────────────
app.get('/api/download/cv', (req, res) => {
  const result = findResume();

  if (!result) {
    return res.status(404).json({
      error: 'CV not found',
      fix:   'Copy your Resume.pdf file into the portfolio1 folder',
    });
  }

  res.setHeader('Content-Disposition',
    'attachment; filename="Pintu_Napit_CV.pdf"');
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(result.filePath, (err) => {
    if (err) {
      console.error('CV send error:', err);
      res.status(500).json({ error: 'Failed to send CV file' });
    }
  });
});

// ── Catch-all: SPA fallback → index.html ─────────────────────────────────────
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   Pintu Napit — Portfolio Server          ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║  🌐  http://localhost:${PORT}                ║`);
  console.log(`║  📄  /api/download/resume                ║`);
  console.log(`║  📋  /api/download/cv                    ║`);
  console.log(`║  💚  /api/health                         ║`);
  console.log('╚══════════════════════════════════════════╝\n');
});

module.exports = app;
