/* ─────────────────────────────────────────────────
   California Smart Valve — seismograph + station hooks
   ───────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── seismograph path generator ──────────────────
  function buildSeismoPath() {
    const path = document.getElementById('seismoPath');
    if (!path) return;

    const width = 1600;
    const height = 240;
    const cy = height / 2;
    const samples = 800;

    let d = `M 0 ${cy}`;

    const spikes = new Set();
    // seed 4 seismic events across one tile
    [110, 280, 500, 680].forEach(s => spikes.add(s));

    for (let i = 1; i <= samples; i++) {
      const x = (i / samples) * width;
      const baseline =
        Math.sin(i * 0.11) * 2 +
        Math.sin(i * 0.27) * 1.4 +
        Math.sin(i * 0.53) * 0.8 +
        (Math.random() - 0.5) * 2.2;

      // seismic event: compressed spike cluster
      const spikeCenter = [...spikes].find(s => Math.abs(s - i) < 14);
      if (spikeCenter !== undefined) {
        const k = i - spikeCenter; // -14..14
        const env = Math.max(0, 1 - Math.abs(k) / 14);
        const mag = Math.sin(k * 1.8) * 90 * env + (Math.random() - 0.5) * 14 * env;
        d += ` L ${x.toFixed(1)} ${(cy + mag).toFixed(1)}`;
      } else {
        d += ` L ${x.toFixed(1)} ${(cy + baseline).toFixed(1)}`;
      }
    }

    // tile once more for seamless loop (same path, same waveform)
    for (let i = 1; i <= samples; i++) {
      const x = width + (i / samples) * width;
      const baseline =
        Math.sin(i * 0.11) * 2 +
        Math.sin(i * 0.27) * 1.4 +
        Math.sin(i * 0.53) * 0.8 +
        (Math.random() - 0.5) * 2.2;
      const spikeCenter = [...spikes].find(s => Math.abs(s - i) < 14);
      if (spikeCenter !== undefined) {
        const k = i - spikeCenter;
        const env = Math.max(0, 1 - Math.abs(k) / 14);
        const mag = Math.sin(k * 1.8) * 90 * env + (Math.random() - 0.5) * 14 * env;
        d += ` L ${x.toFixed(1)} ${(cy + mag).toFixed(1)}`;
      } else {
        d += ` L ${x.toFixed(1)} ${(cy + baseline).toFixed(1)}`;
      }
    }

    path.setAttribute('d', d);
  }

  // ── station clock (UTC HH:MM:SS) ────────────────
  function tickClock() {
    const el = document.querySelector('[data-clock]');
    if (!el) return;
    const now = new Date();
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const mm = String(now.getUTCMinutes()).padStart(2, '0');
    const ss = String(now.getUTCSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss} UTC`;
  }

  // ── faux magnitude drift ────────────────────────
  function driftMagnitude() {
    const el = document.querySelector('[data-mag]');
    if (!el) return;
    // baseline near zero with occasional nudges
    const jitter = (Math.random() - 0.5) * 0.4;
    const value = Math.max(0, 0.6 + jitter).toFixed(2);
    el.textContent = value;
  }

  // ── copyright year ──────────────────────────────
  function setYear() {
    const el = document.querySelector('[data-year]');
    if (!el) return;
    el.textContent = new Date().getFullYear();
  }

  // ── mobile nav toggle ───────────────────────────
  function wireNav() {
    const nav = document.querySelector('.nav');
    const btn = document.querySelector('.nav__toggle');
    if (!nav || !btn) return;
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── boot ────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    buildSeismoPath();
    tickClock();
    driftMagnitude();
    setYear();
    wireNav();
    setInterval(tickClock, 1000);
    setInterval(driftMagnitude, 2400);
  });
})();
