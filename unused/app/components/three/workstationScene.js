/*
 * workstationScene.js
 * ---------------------------------------------------------------------------
 * Procedural "developer workstation" 3D scene for three.js.
 *
 * Everything you see is generated in code: no external models, no image
 * textures. The only textures are two tiny canvases drawn at runtime
 * (a soft radial glow and a wood-grain pattern).
 *
 * The module has NO imports on purpose. The caller passes in `THREE` and the
 * addons it uses so the exact same source can be inlined into a single HTML
 * file or imported by the Next.js app.
 *
 *   const ws = createWorkstation(THREE, { RoundedBoxGeometry });
 *   scene.add(ws.group);
 *   ws.update(elapsedSeconds, deltaSeconds);   // every frame
 *   ws.dispose();                              // on unmount
 *
 * `mountWorkstation` wires up renderer + camera + OrbitControls with
 * mouse rotation, scroll zoom and idle auto-rotation.
 * ---------------------------------------------------------------------------
 */

export const WORKSTATION_COLORS = {
  accent: 0x6d64f7, // site accent (indigo)
  cyan: 0x38bdf8,
  warm: 0xffb35c,
};

/* ── Runtime-drawn textures ──────────────────────────────────────────────── */

export function makeGlowTexture(THREE, size = 128) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0.0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(0.6, "rgba(255,255,255,0.12)");
  g.addColorStop(1.0, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function makeWoodTexture(THREE, size = 512) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#6a4530";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 170; i++) {
    const y0 = Math.random() * size;
    const amp = 2 + Math.random() * 6;
    const freq = 0.004 + Math.random() * 0.012;
    const ph = Math.random() * Math.PI * 2;
    const light = Math.random() < 0.45;
    ctx.strokeStyle = light
      ? `rgba(215,160,110,${0.05 + Math.random() * 0.09})`
      : `rgba(30,14,6,${0.06 + Math.random() * 0.12})`;
    ctx.lineWidth = 0.6 + Math.random() * 2.2;
    ctx.beginPath();
    for (let x = 0; x <= size; x += 8) {
      const y = y0 + Math.sin(x * freq + ph) * amp + Math.sin(x * freq * 3.1 + ph * 2) * amp * 0.3;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  for (let i = 0; i < 6000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.06})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/* ── Scene ───────────────────────────────────────────────────────────────── */

export function createWorkstation(THREE, deps = {}) {
  const RoundedBoxGeometry = deps.RoundedBoxGeometry;
  const C = WORKSTATION_COLORS;
  const group = new THREE.Group();
  group.name = "workstation";
  const updaters = [];
  const textures = [];

  /* helpers */
  const rand = (a, b) => a + Math.random() * (b - a);
  const randInt = (a, b) => Math.floor(rand(a, b + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

  const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  const rbox = (w, h, d, r, seg = 3) =>
    RoundedBoxGeometry ? new RoundedBoxGeometry(w, h, d, seg, r) : new THREE.BoxGeometry(w, h, d);
  const plane = (w, h) => new THREE.PlaneGeometry(w, h);
  const circle = (r, seg = 24) => new THREE.CircleGeometry(r, seg);
  const cyl = (rt, rb, h, seg = 32, open = false) => new THREE.CylinderGeometry(rt, rb, h, seg, 1, open);
  const sphere = (r, ws = 24, hs = 16) => new THREE.SphereGeometry(r, ws, hs);
  const rrect = (w, h, r) => {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return new THREE.ShapeGeometry(s, 6);
  };

  const std = (o) => new THREE.MeshStandardMaterial(o);
  const basic = (color, o = {}) => new THREE.MeshBasicMaterial(Object.assign({ color, toneMapped: false }, o));

  const place = (m, o) => {
    if (o.p) Array.isArray(o.p) ? m.position.set(o.p[0], o.p[1], o.p[2]) : m.position.copy(o.p);
    if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
    if (o.s) m.scale.set(o.s[0], o.s[1], o.s[2]);
    return m;
  };
  /** flat / unlit helper (no shadows) – used for screen content, glows */
  const mesh = (geo, mat, o = {}) => place(new THREE.Mesh(geo, mat), o);
  /** physical object: casts + receives shadows */
  const solid = (geo, mat, o = {}) => {
    const m = place(new THREE.Mesh(geo, mat), o);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  };
  const segment = (a, b, r, mat, seg = 14) => {
    const d = new THREE.Vector3().subVectors(b, a);
    const len = d.length();
    const m = solid(cyl(r, r, len, seg), mat);
    m.position.copy(a).addScaledVector(d, 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    return m;
  };

  const glowTex = makeGlowTexture(THREE);
  const woodTex = makeWoodTexture(THREE);
  textures.push(glowTex, woodTex);

  const CODE_PALETTE = [0xc084fc, 0x60a5fa, 0x4ade80, 0xfb923c, 0x9ca3af, 0x22d3ee, 0xf472b6];
  const TERM_PALETTE = [0x4ade80, 0x9ca3af, 0x9ca3af, 0x22d3ee, 0xe5e7eb];

  const DESK_Y = 0.76; // desk top surface height
  const SCREEN_Z = -0.30;
  const SCREEN_CY = DESK_Y + 0.44;

  /* ── Lights ───────────────────────────────────────────────────────────── */
  group.add(new THREE.HemisphereLight(0x8090ff, 0x1a1410, 0.45));
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(3, 5.5, 2.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = key.shadow.camera.bottom = -2.8;
  key.shadow.camera.right = key.shadow.camera.top = 2.8;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 14;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  group.add(key, key.target);
  const rim = new THREE.DirectionalLight(C.accent, 0.9);
  rim.position.set(-4, 3, -3);
  group.add(rim);

  /* ── Floating platform ────────────────────────────────────────────────── */
  {
    const plat = solid(cyl(2.3, 2.42, 0.18, 96), std({ color: 0x14141a, roughness: 0.85, metalness: 0.15 }), { p: [0, -0.09, 0] });
    plat.castShadow = false;
    group.add(plat);

    const pts = [];
    const R = 2.2;
    for (let x = -2; x <= 2.001; x += 0.25) {
      const h = Math.sqrt(Math.max(0, R * R - x * x));
      pts.push(x, 0.003, -h, x, 0.003, h, -h, 0.003, x, h, 0.003, x);
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    group.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0x2a2a3a, transparent: true, opacity: 0.6 })));

    group.add(mesh(new THREE.TorusGeometry(2.3, 0.012, 8, 160), basic(C.accent), { r: [Math.PI / 2, 0, 0] }));
    const ring2 = mesh(new THREE.TorusGeometry(1.75, 0.005, 6, 140), basic(C.accent, { transparent: true, opacity: 0.35 }), { p: [0, 0.002, 0], r: [Math.PI / 2, 0, 0] });
    group.add(ring2);

    const under = mesh(
      plane(6.5, 6.5),
      new THREE.MeshBasicMaterial({ map: glowTex, color: C.accent, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
      { p: [0, -0.2, 0], r: [-Math.PI / 2, 0, 0] }
    );
    group.add(under);
    updaters.push((t) => { ring2.material.opacity = 0.25 + 0.15 * Math.sin(t * 1.3); });
  }

  /* ── Desk ─────────────────────────────────────────────────────────────── */
  {
    const wood = std({ map: woodTex, roughness: 0.5, metalness: 0.05 });
    const metal = std({ color: 0x24242b, roughness: 0.4, metalness: 0.85 });
    group.add(solid(rbox(2.3, 0.05, 1.05, 0.015), wood, { p: [0, DESK_Y - 0.025, 0] }));
    for (const sx of [-1, 1]) {
      const x = sx * 0.98;
      group.add(solid(box(0.05, 0.71, 0.05), metal, { p: [x, 0.355, -0.42] }));
      group.add(solid(box(0.05, 0.71, 0.05), metal, { p: [x, 0.355, 0.42] }));
      group.add(solid(box(0.05, 0.03, 0.94), metal, { p: [x, 0.015, 0] }));
      group.add(solid(box(0.05, 0.03, 0.94), metal, { p: [x, 0.695, 0] }));
    }
    group.add(solid(box(1.96, 0.03, 0.03), metal, { p: [0, 0.30, -0.42] }));
  }

  /* ── Screen panels (procedural "code" that types itself) ──────────────── */
  function makeCodePanel(o) {
    const w = o.w, h = o.h, rows = o.rows, palette = o.palette;
    const bg = o.bg ?? 0x0d1526;
    const speed = o.speed ?? 0.5;
    const hold = o.hold ?? 2.4;
    const prefix = o.prefix ?? null;
    const titleBar = o.titleBar ?? true;
    const gutter = o.gutter ?? true;
    const statusBar = o.statusBar ?? false;
    const maxTok = o.maxTok ?? 5;
    const minTok = o.minTok ?? 2;

    const g = new THREE.Group();
    g.add(mesh(rrect(w, h, 0.012), basic(bg)));
    const pad = 0.02;
    let top = h / 2 - pad;
    let left = -w / 2 + pad;
    let tbH = 0;
    if (titleBar) {
      tbH = 0.028;
      g.add(mesh(plane(w, tbH), basic(0x111b30), { p: [0, h / 2 - tbH / 2, 0.0004] }));
      [0xff5f57, 0xfebc2e, 0x28c840].forEach((c, i) =>
        g.add(mesh(circle(0.005, 12), basic(c), { p: [-w / 2 + 0.018 + i * 0.015, h / 2 - tbH / 2, 0.0008] }))
      );
      g.add(mesh(rrect(Math.min(0.09, w * 0.3), 0.014, 0.004), basic(0x1f2b45), { p: [-w / 2 + 0.07 + Math.min(0.09, w * 0.3) / 2, h / 2 - tbH / 2, 0.0008] }));
      top = h / 2 - tbH - pad * 0.7;
    }
    if (gutter) {
      g.add(mesh(plane(0.03, h - tbH), basic(0x0a1020), { p: [-w / 2 + 0.015, -tbH / 2, 0.0004] }));
      for (let i = 0; i < 4; i++)
        g.add(mesh(rrect(0.012, 0.012, 0.003), basic(i === 0 ? C.accent : 0x33415a), { p: [-w / 2 + 0.015, top - 0.006 - i * 0.024, 0.0008] }));
      left = -w / 2 + 0.06;
    }
    const bottom = -h / 2 + pad + (statusBar ? 0.012 : 0);
    const rowH = (top - bottom) / rows;
    const tokH = rowH * 0.5;
    const unit = plane(1, tokH);
    unit.translate(0.5, 0, 0); // anchor at left edge so scale.x == width
    const tokMats = palette.map((c) => basic(c));
    const prefixMat = prefix ? basic(prefix) : null;
    const gutterMat = basic(0x2b3650);
    const pool = [];
    for (let r = 0; r < rows; r++) {
      const y = top - rowH * (r + 0.5);
      if (gutter) g.add(mesh(rrect(0.014, tokH * 0.7, 0.002), gutterMat, { p: [-w / 2 + 0.045, y, 0.0008] }));
      const row = [];
      for (let k = 0; k < maxTok + 1; k++) {
        const m = new THREE.Mesh(unit, tokMats[0]);
        m.position.set(left, y, 0.0008);
        m.visible = false;
        g.add(m);
        row.push({ mesh: m, x: left, y, w: 0, start: 0, len: 0 });
      }
      pool.push(row);
    }
    const cursor = mesh(plane(0.004, tokH * 1.4), basic(0xe5e7eb), { p: [left, top - rowH * 0.5, 0.001] });
    g.add(cursor);
    if (statusBar) {
      g.add(mesh(plane(w, 0.012), basic(C.accent), { p: [0, -h / 2 + 0.006, 0.0004] }));
      g.add(mesh(rrect(0.05, 0.005, 0.002), basic(0xe0e7ff), { p: [-w / 2 + 0.04, -h / 2 + 0.006, 0.0008] }));
      g.add(mesh(rrect(0.03, 0.005, 0.002), basic(0xe0e7ff), { p: [w / 2 - 0.035, -h / 2 + 0.006, 0.0008] }));
    }

    const right = w / 2 - pad;
    const gap = 0.006;
    const indentW = 0.022;
    const scaleW = w / 0.66;
    let tokens = [], total = 0, progress = 0, phase = "typing", timer = 0;

    function regenerate() {
      tokens = [];
      let cursorPos = 0;
      let indent = 0;
      for (let r = 0; r < rows; r++) {
        const row = pool[r];
        indent = clamp(indent + randInt(-1, 1), 0, 3);
        if (Math.random() < 0.15) indent = 0;
        let x = left + indent * indentW;
        let k = 0;
        if (prefix) {
          const tk = row[k++];
          tk.mesh.material = prefixMat;
          tk.x = x; tk.w = 0.012; tk.start = cursorPos; tk.len = 0.002;
          tk.mesh.position.x = x; tk.mesh.visible = false;
          cursorPos += tk.len; x += tk.w + gap;
          tokens.push(tk);
        }
        const n = randInt(minTok, maxTok);
        for (let i = 0; i < n && k < row.length; i++) {
          const tw = rand(0.025, 0.11) * scaleW;
          if (x + tw > right) break;
          const tk = row[k++];
          tk.mesh.material = pick(tokMats);
          tk.x = x; tk.w = tw; tk.start = cursorPos; tk.len = tw;
          tk.mesh.position.x = x; tk.mesh.visible = false;
          cursorPos += tw; x += tw + gap;
          tokens.push(tk);
        }
        for (; k < row.length; k++) row[k].mesh.visible = false;
      }
      total = cursorPos; progress = 0; phase = "typing"; timer = 0;
    }
    regenerate();

    function update(t, dt) {
      if (phase === "typing") {
        progress += speed * dt;
        let active = null;
        for (const tk of tokens) {
          const f = clamp((progress - tk.start) / tk.len, 0, 1);
          tk.mesh.visible = f > 0;
          tk.mesh.scale.x = Math.max(f * tk.w, 1e-4);
          if (f < 1 && !active) active = tk;
        }
        const at = active || tokens[tokens.length - 1];
        const f = clamp((progress - at.start) / at.len, 0, 1);
        cursor.position.set(at.x + at.w * f + 0.003, at.y, 0.001);
        cursor.visible = true;
        if (progress >= total) { phase = "hold"; timer = 0; }
      } else if (phase === "hold") {
        timer += dt;
        cursor.visible = (t * 2.5) % 1 < 0.55;
        if (timer > hold) { phase = "wipe"; timer = 0; }
      } else {
        timer += dt;
        const f = 1 - clamp(timer / 0.35, 0, 1);
        for (const tk of tokens) tk.mesh.scale.x = Math.max(f * tk.w, 1e-4);
        cursor.visible = false;
        if (timer >= 0.35) regenerate();
      }
    }
    return { group: g, update, isTyping: () => phase === "typing" };
  }

  function makeDashboard(o) {
    const w = o.w, h = o.h;
    const g = new THREE.Group();
    g.add(mesh(rrect(w, h, 0.012), basic(0x0b1324)));
    const bar = 0.026;
    g.add(mesh(plane(w, bar), basic(0x16213a), { p: [0, h / 2 - bar / 2, 0.0004] }));
    [0xff5f57, 0xfebc2e, 0x28c840].forEach((c, i) =>
      g.add(mesh(circle(0.005, 12), basic(c), { p: [-w / 2 + 0.018 + i * 0.015, h / 2 - bar / 2, 0.0008] }))
    );
    g.add(mesh(rrect(w * 0.5, 0.012, 0.006), basic(0x243354), { p: [w * 0.1, h / 2 - bar / 2, 0.0008] }));
    const sbW = 0.06;
    g.add(mesh(plane(sbW, h - bar), basic(0x0e172b), { p: [-w / 2 + sbW / 2, -bar / 2, 0.0004] }));
    for (let i = 0; i < 5; i++)
      g.add(mesh(rrect(0.036, 0.007, 0.002), basic(i === 0 ? C.accent : 0x2c3a5c), { p: [-w / 2 + sbW / 2, h / 2 - bar - 0.02 - i * 0.017, 0.0008] }));
    const cx0 = -w / 2 + sbW + 0.015;
    const cw = w - sbW - 0.03;
    g.add(mesh(rrect(cw * 0.45, 0.009, 0.003), basic(0xcbd5e1), { p: [cx0 + cw * 0.225, h / 2 - bar - 0.02, 0.0008] }));
    const dot = mesh(circle(0.005), basic(0x22c55e), { p: [w / 2 - 0.02, h / 2 - bar - 0.02, 0.0008] });
    g.add(dot);
    for (let j = 0; j < 2; j++) {
      const cx = cx0 + cw * (0.235 + j * 0.53);
      const cy = h / 2 - bar - 0.058;
      g.add(mesh(rrect(cw * 0.47, 0.042, 0.006), basic(0x152039), { p: [cx, cy, 0.0008] }));
      g.add(mesh(rrect(cw * 0.25, 0.005, 0.002), basic(0x64748b), { p: [cx - cw * 0.09, cy + 0.011, 0.0012] }));
      g.add(mesh(rrect(cw * 0.32, 0.011, 0.003), basic(j ? C.cyan : C.accent), { p: [cx - cw * 0.055, cy - 0.008, 0.0012] }));
    }
    const nb = 9;
    const chartTop = h / 2 - bar - 0.092;
    const chartBottom = -h / 2 + 0.018;
    const chartH = chartTop - chartBottom;
    const bw = (cw / nb) * 0.6;
    const unitB = plane(bw, 1);
    unitB.translate(0, 0.5, 0);
    const bars = [];
    for (let i = 0; i < nb; i++) {
      const m = new THREE.Mesh(unitB, basic(i % 2 ? C.cyan : C.accent));
      m.position.set(cx0 + (cw * (i + 0.5)) / nb, chartBottom, 0.0008);
      m.userData.base = rand(0.35, 1);
      g.add(m);
      bars.push(m);
    }
    g.add(mesh(plane(cw, 0.002), basic(0x2c3a5c), { p: [cx0 + cw / 2, chartBottom, 0.0006] }));
    function update(t) {
      for (let i = 0; i < bars.length; i++) {
        const m = bars[i];
        const v = m.userData.base * (0.6 + 0.4 * Math.sin(t * 0.8 + i * 0.9));
        m.scale.y = Math.max(chartH * v, 1e-4);
      }
      dot.visible = t % 1.2 < 0.8;
    }
    return { group: g, update };
  }

  /* ── Ultrawide monitor ────────────────────────────────────────────────── */
  let editor, term, dash;
  {
    const metal = std({ color: 0x2a2a31, roughness: 0.35, metalness: 0.8 });
    const body = std({ color: 0x1a1a20, roughness: 0.5, metalness: 0.4 });
    group.add(solid(rbox(0.52, 0.02, 0.24, 0.008), metal, { p: [0, DESK_Y + 0.01, SCREEN_Z - 0.04] }));
    group.add(solid(rbox(0.08, 0.32, 0.03, 0.006), metal, { p: [0, DESK_Y + 0.18, SCREEN_Z - 0.06] }));
    group.add(solid(rbox(1.16, 0.505, 0.035, 0.008), body, { p: [0, SCREEN_CY, SCREEN_Z] }));
    group.add(mesh(plane(0.3, 0.02), basic(C.accent), { p: [0, SCREEN_CY - 0.1, SCREEN_Z - 0.0181], r: [0, Math.PI, 0] }));

    const screenZ = SCREEN_Z + 0.0175 + 0.0005;
    group.add(mesh(plane(1.12, 0.47), basic(0x070b16), { p: [0, SCREEN_CY, screenZ] }));
    group.add(mesh(circle(0.003, 10), basic(C.cyan), { p: [0.5, SCREEN_CY - 0.245, screenZ] }));

    const content = new THREE.Group();
    content.position.set(0, SCREEN_CY, screenZ + 0.0008);
    group.add(content);

    editor = makeCodePanel({ w: 0.66, h: 0.44, rows: 13, palette: CODE_PALETTE, speed: 0.5, statusBar: true });
    editor.group.position.set(-0.22, 0, 0);
    content.add(editor.group);

    dash = makeDashboard({ w: 0.40, h: 0.235 });
    dash.group.position.set(0.335, 0.1025, 0);
    content.add(dash.group);

    term = makeCodePanel({ w: 0.40, h: 0.19, rows: 6, palette: TERM_PALETTE, bg: 0x060a14, speed: 0.22, hold: 3, prefix: C.accent, gutter: false, maxTok: 4 });
    term.group.position.set(0.335, -0.125, 0);
    content.add(term.group);

    // soft reflection on the glass
    group.add(mesh(plane(0.9, 0.5), new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }), { p: [-0.25, SCREEN_CY + 0.12, screenZ + 0.003] }));

    const light = new THREE.PointLight(0x7f8cff, 1.4, 2.6, 2);
    light.position.set(0, SCREEN_CY, SCREEN_Z + 0.25);
    group.add(light);
    updaters.push((t) => { light.intensity = 1.2 + 0.2 * Math.sin(t * 7.3) * Math.sin(t * 3.1); });
  }

  /* ── Laptop ───────────────────────────────────────────────────────────── */
  let lapPanel;
  {
    const lap = new THREE.Group();
    lap.position.set(-0.76, DESK_Y, 0.02);
    lap.rotation.y = 0.5;
    group.add(lap);
    const alu = std({ color: 0xb9bcc6, roughness: 0.35, metalness: 0.7 });
    const dark = std({ color: 0x1b1b21, roughness: 0.6, metalness: 0.3 });
    lap.add(solid(rbox(0.33, 0.016, 0.23, 0.005), alu, { p: [0, 0.008, 0] }));
    lap.add(solid(box(0.285, 0.004, 0.105), dark, { p: [0, 0.016, -0.03] }));
    const kg = rbox(0.0165, 0.004, 0.0165, 0.001, 2);
    const cols = 14, rowsN = 5;
    const inst = new THREE.InstancedMesh(kg, std({ color: 0x2c2c34, roughness: 0.55 }), cols * rowsN);
    const d = new THREE.Object3D();
    let i = 0;
    for (let r = 0; r < rowsN; r++)
      for (let c = 0; c < cols; c++) {
        d.position.set(-0.13 + c * 0.02, 0.02, -0.07 + r * 0.02);
        d.updateMatrix();
        inst.setMatrixAt(i++, d.matrix);
      }
    inst.castShadow = true;
    lap.add(inst);
    lap.add(mesh(rrect(0.10, 0.06, 0.004), std({ color: 0xa9adb8, roughness: 0.4, metalness: 0.6 }), { p: [0, 0.0165, 0.07], r: [-Math.PI / 2, 0, 0] }));
    const lid = new THREE.Group();
    lid.position.set(0, 0.016, -0.115);
    lid.rotation.x = -0.32;
    lap.add(lid);
    lid.add(solid(rbox(0.33, 0.215, 0.008, 0.005), alu, { p: [0, 0.1075, 0] }));
    lid.add(mesh(plane(0.30, 0.19), basic(0x0a1020), { p: [0, 0.112, 0.0045] }));
    lapPanel = makeCodePanel({ w: 0.29, h: 0.18, rows: 7, palette: TERM_PALETTE, bg: 0x0a1020, gutter: false, speed: 0.2, hold: 3.5, prefix: C.cyan, maxTok: 4 });
    lapPanel.group.position.set(0, 0.112, 0.0055);
    lid.add(lapPanel.group);
    const ll = new THREE.PointLight(C.cyan, 0.35, 0.9, 2);
    ll.position.set(0, 0.15, 0.1);
    lid.add(ll);
  }

  /* ── Mousepad, keyboard, mouse ────────────────────────────────────────── */
  let kbUpdate = () => {};
  {
    group.add(solid(rbox(0.66, 0.004, 0.27, 0.004), std({ color: 0x17171c, roughness: 0.9 }), { p: [0.16, DESK_Y + 0.002, 0.14] }));
    group.add(mesh(rrect(0.672, 0.282, 0.008), basic(C.accent, { transparent: true, opacity: 0.75 }), { p: [0.16, DESK_Y + 0.0012, 0.14], r: [-Math.PI / 2, 0, 0] }));

    const kb = new THREE.Group();
    kb.position.set(0.02, DESK_Y + 0.008, 0.14);
    kb.rotation.x = 0.05;
    kb.rotation.y = -0.03;
    group.add(kb);
    kb.add(solid(rbox(0.36, 0.028, 0.135, 0.006), std({ color: 0x1c1c22, roughness: 0.5, metalness: 0.5 }), { p: [0, 0.014, 0] }));
    const glow = mesh(rrect(0.376, 0.151, 0.01), basic(C.accent, { transparent: true, opacity: 0.9 }), { p: [0, 0.0015, 0], r: [-Math.PI / 2, 0, 0] });
    kb.add(glow);

    const ones = (n) => Array(n).fill(1);
    const layout = [
      ones(16),
      [...ones(13), 2, 1],
      [1.5, ...ones(12), 1.5, 1],
      [1.75, ...ones(11), 2.25, 1],
      [2.25, ...ones(10), 1.75, 1, 1],
      [1.25, 1.25, 1.25, 6.25, 1, 1, 1, 1, 1, 1],
    ];
    const U = 0.019;
    const keyGeo = rbox(U - 0.0025, 0.009, U - 0.0025, 0.0025, 2);
    const count = layout.reduce((a, r) => a + r.length, 0);
    const inst = new THREE.InstancedMesh(keyGeo, std({ color: 0xffffff, roughness: 0.55, metalness: 0.1 }), count);
    inst.castShadow = true;
    inst.receiveShadow = true;
    const keys = [];
    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    let i = 0;
    layout.forEach((row, r) => {
      let x = -8 * U;
      row.forEach((wu, c) => {
        const cx = x + (wu * U) / 2;
        const z = -2.5 * U + r * U;
        const sx = (wu * U - 0.0025) / (U - 0.0025);
        dummy.position.set(cx, 0.0325, z);
        dummy.scale.set(sx, 1, 1);
        dummy.updateMatrix();
        inst.setMatrixAt(i, dummy.matrix);
        let c0 = 0x2c2c34;
        if (r === 0 && c === 0) c0 = C.accent;
        if (r === 3 && c === 12) c0 = C.accent;
        if (r === 5 && c === 3) c0 = 0x3a3a44;
        if ((r === 5 && c >= 7) || (r === 4 && c === 12)) c0 = C.cyan;
        inst.setColorAt(i, col.setHex(c0));
        keys.push({ x: cx, z, sx, p: 0 });
        i++;
        x += wu * U;
      });
    });
    kb.add(inst);

    kbUpdate = (t, dt, typing) => {
      glow.material.color.setHSL((t * 0.05) % 1, 0.8, 0.6);
      let changed = false;
      if (typing && Math.random() < dt * 14) keys[randInt(16, keys.length - 1)].p = 1;
      for (let j = 0; j < keys.length; j++) {
        const k = keys[j];
        if (k.p > 0) {
          k.p = Math.max(0, k.p - dt * 7);
          dummy.position.set(k.x, 0.0325 - 0.0035 * Math.sin(k.p * Math.PI), k.z);
          dummy.scale.set(k.sx, 1, 1);
          dummy.updateMatrix();
          inst.setMatrixAt(j, dummy.matrix);
          changed = true;
        }
      }
      if (changed) inst.instanceMatrix.needsUpdate = true;
    };

    const mouse = new THREE.Group();
    mouse.position.set(0.37, DESK_Y + 0.004, 0.16);
    mouse.rotation.y = -0.25;
    group.add(mouse);
    mouse.add(solid(sphere(0.02, 32, 24), std({ color: 0x1f1f26, roughness: 0.45, metalness: 0.2 }), { p: [0, 0.012, 0], s: [1.05, 0.8, 1.7] }));
    mouse.add(solid(cyl(0.004, 0.004, 0.006, 16), std({ color: 0x3a3a44, roughness: 0.6 }), { p: [0, 0.026, -0.012], r: [0, 0, Math.PI / 2] }));
    mouse.add(mesh(plane(0.012, 0.003), basic(C.accent), { p: [0, 0.02, 0.03], r: [-0.6, 0, 0] }));
  }

  /* ── Coffee mug with steam ────────────────────────────────────────────── */
  {
    const mug = new THREE.Group();
    mug.position.set(0.66, DESK_Y, 0.31);
    mug.rotation.y = -0.6;
    group.add(mug);
    const pts = [[0, 0], [0.036, 0], [0.04, 0.005], [0.041, 0.06], [0.04, 0.096], [0.036, 0.096], [0.035, 0.012], [0, 0.012]].map((p) => new THREE.Vector2(p[0], p[1]));
    const ceramic = std({ color: 0xe8e4dc, roughness: 0.35, metalness: 0 });
    mug.add(solid(new THREE.LatheGeometry(pts, 48), ceramic));
    mug.add(mesh(cyl(0.0418, 0.0418, 0.014, 48, true), std({ color: C.accent, roughness: 0.4 }), { p: [0, 0.05, 0] }));
    mug.add(solid(new THREE.TorusGeometry(0.024, 0.006, 12, 32, Math.PI), ceramic, { p: [0.046, 0.05, 0], r: [0, 0, -Math.PI / 2] }));
    mug.add(mesh(circle(0.035, 32), std({ color: 0x2b170c, roughness: 0.15 }), { p: [0, 0.082, 0], r: [-Math.PI / 2, 0, 0] }));
    const steam = [];
    for (let i = 0; i < 12; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xdfe6ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
      s.userData = { phase: i / 12, sx: rand(-1, 1), sz: rand(-1, 1) };
      mug.add(s);
      steam.push(s);
    }
    updaters.push((t) => {
      for (const s of steam) {
        const u = s.userData;
        const f = (t * 0.22 + u.phase) % 1;
        s.position.set(0.012 * Math.sin(t * 1.7 + u.sx * 6) * (0.4 + f), 0.09 + f * 0.26, 0.012 * Math.cos(t * 1.3 + u.sz * 6) * (0.4 + f));
        const sc = 0.05 + f * 0.11;
        s.scale.set(sc, sc, 1);
        s.material.opacity = 0.32 * Math.sin(f * Math.PI) * (1 - f * 0.5);
      }
    });
  }

  /* ── Desk lamp (articulated, real spotlight) ──────────────────────────── */
  {
    const metal = std({ color: 0x2b2b32, roughness: 0.35, metalness: 0.85 });
    const J0 = v3(0.88, DESK_Y + 0.016, -0.30);
    const J1 = v3(0.80, DESK_Y + 0.36, -0.40);
    const J2 = v3(0.52, DESK_Y + 0.56, -0.16);
    const T = v3(0.18, DESK_Y, 0.12);
    group.add(solid(cyl(0.065, 0.075, 0.016, 40), metal, { p: [J0.x, DESK_Y + 0.008, J0.z] }));
    group.add(segment(J0, J1, 0.009, metal));
    group.add(segment(J1, J2, 0.009, metal));
    group.add(solid(sphere(0.016), metal, { p: J1 }));
    group.add(solid(sphere(0.016), metal, { p: J2 }));
    const head = new THREE.Group();
    head.position.copy(J2);
    head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(J2, T).normalize());
    group.add(head);
    head.add(solid(cyl(0.008, 0.075, 0.11, 40, true), metal, { p: [0, -0.06, 0] }));
    head.add(mesh(cyl(0.007, 0.072, 0.108, 40, true), std({ color: 0x3a2a1a, emissive: 0xffc98a, emissiveIntensity: 0.9, side: THREE.BackSide, roughness: 0.8 }), { p: [0, -0.06, 0] }));
    head.add(mesh(circle(0.03, 24), basic(0xffe4b8), { p: [0, -0.09, 0], r: [Math.PI / 2, 0, 0] }));
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffc27a, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.set(0.28, 0.28, 1);
    halo.position.set(0, -0.12, 0);
    head.add(halo);
    const spot = new THREE.SpotLight(C.warm, 5, 2.4, 0.62, 0.55, 1.6);
    spot.position.set(0, -0.08, 0);
    spot.castShadow = true;
    spot.shadow.mapSize.set(1024, 1024);
    spot.shadow.bias = -0.0003;
    spot.shadow.normalBias = 0.01;
    head.add(spot);
    spot.target.position.copy(T);
    group.add(spot.target);
    updaters.push((t) => { spot.intensity = 5 + 0.25 * Math.sin(t * 17) * Math.sin(t * 5.3); });
  }

  /* ── Potted plant ─────────────────────────────────────────────────────── */
  {
    const plant = new THREE.Group();
    plant.position.set(-0.98, DESK_Y, -0.36);
    group.add(plant);
    const potPts = [[0, 0], [0.046, 0], [0.052, 0.006], [0.062, 0.105], [0.068, 0.105], [0.068, 0.12], [0.061, 0.12], [0.058, 0.10], [0, 0.10]].map((p) => new THREE.Vector2(p[0], p[1]));
    plant.add(solid(new THREE.LatheGeometry(potPts, 40), std({ color: 0xb8674a, roughness: 0.85 })));
    plant.add(mesh(circle(0.058, 32), std({ color: 0x2a1c14, roughness: 1 }), { p: [0, 0.101, 0], r: [-Math.PI / 2, 0, 0] }));
    const leafMats = [std({ color: 0x3f9a55, roughness: 0.65, side: THREE.DoubleSide }), std({ color: 0x2f7d45, roughness: 0.65, side: THREE.DoubleSide }), std({ color: 0x55b06a, roughness: 0.65, side: THREE.DoubleSide })];
    const stemMat = std({ color: 0x3b6b3a, roughness: 0.8 });
    const leafShape = (len, wid) => {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.bezierCurveTo(wid, len * 0.25, wid * 0.9, len * 0.7, 0, len);
      s.bezierCurveTo(-wid * 0.9, len * 0.7, -wid, len * 0.25, 0, 0);
      return new THREE.ShapeGeometry(s, 8);
    };
    const pivots = [];
    for (let i = 0; i < 10; i++) {
      const pivot = new THREE.Group();
      pivot.position.set(0, 0.10, 0);
      pivot.rotation.order = "YXZ";
      pivot.rotation.y = (i / 10) * Math.PI * 2 + rand(-0.25, 0.25);
      pivot.rotation.x = rand(0.3, 0.85);
      plant.add(pivot);
      const len = rand(0.10, 0.19);
      const stem = solid(cyl(0.003, 0.004, len, 8), stemMat, { p: [0, len / 2, 0] });
      pivot.add(stem);
      const leaf = solid(leafShape(rand(0.09, 0.14), rand(0.03, 0.05)), pick(leafMats), { p: [0, len, 0], r: [rand(0.4, 0.9), 0, 0] });
      pivot.add(leaf);
      pivots.push(pivot);
    }
    updaters.push((t) => {
      for (let i = 0; i < pivots.length; i++) pivots[i].rotation.z = 0.04 * Math.sin(t * 1.2 + i);
    });
  }

  /* ── Stack of books ───────────────────────────────────────────────────── */
  {
    const b = new THREE.Group();
    b.position.set(-0.47, DESK_Y, -0.40);
    group.add(b);
    const specs = [[0.22, 0.032, 0.16, 0x3b3f8f, 0.12], [0.20, 0.028, 0.15, 0x8f3b46, -0.08], [0.18, 0.026, 0.13, 0xc99a2e, 0.05]];
    let y = 0;
    for (const s of specs) {
      const g2 = new THREE.Group();
      g2.position.y = y + s[1] / 2;
      g2.rotation.y = s[4];
      b.add(g2);
      g2.add(solid(rbox(s[0], s[1], s[2], 0.004), std({ color: s[3], roughness: 0.7 })));
      g2.add(solid(box(s[0] - 0.012, s[1] - 0.006, s[2] - 0.008), std({ color: 0xe9e4d3, roughness: 0.9 }), { p: [0.008, 0, 0.004] }));
      y += s[1];
    }
  }

  /* ── Cables ───────────────────────────────────────────────────────────── */
  {
    const cm = std({ color: 0x101014, roughness: 0.6, metalness: 0.2 });
    const c1 = new THREE.CatmullRomCurve3([
      v3(0.04, SCREEN_CY - 0.2, SCREEN_Z - 0.02), v3(0.08, DESK_Y + 0.02, -0.53), v3(0.1, DESK_Y - 0.1, -0.56),
      v3(0.45, 0.3, -0.5), v3(0.9, 0.03, -0.3), v3(1.5, 0.01, 0.0),
    ]);
    group.add(solid(new THREE.TubeGeometry(c1, 80, 0.006, 8, false), cm));
    const c2 = new THREE.CatmullRomCurve3([
      v3(0.02, DESK_Y + 0.02, 0.075), v3(0.0, DESK_Y + 0.012, -0.10), v3(-0.03, DESK_Y + 0.012, -0.26), v3(-0.02, DESK_Y + 0.15, SCREEN_Z - 0.03),
    ]);
    group.add(solid(new THREE.TubeGeometry(c2, 60, 0.004, 8, false), cm));
  }

  /* ── Node constellation orbiting the scene ────────────────────────────── */
  {
    const N = 40;
    const pos = [];
    for (let i = 0; i < N; i++) {
      const a = rand(0, Math.PI * 2);
      const r = rand(4.6, 6.8); // well outside the default orbit distance so nodes stay a backdrop
      pos.push(v3(r * Math.cos(a), rand(-0.4, 3.6), r * Math.sin(a)));
    }
    const cg = new THREE.Group();
    const nodeGeo = sphere(0.03, 10, 8);
    const mk = (color) => new THREE.InstancedMesh(nodeGeo, std({ color: 0x0b0b12, emissive: color, emissiveIntensity: 1.6, roughness: 0.4 }), N);
    const instA = mk(C.cyan), instB = mk(C.accent);
    const d = new THREE.Object3D();
    let na = 0, nb = 0;
    for (let i = 0; i < N; i++) {
      d.position.copy(pos[i]);
      d.updateMatrix();
      if (i % 3 === 0) instB.setMatrixAt(nb++, d.matrix);
      else instA.setMatrixAt(na++, d.matrix);
    }
    instA.count = na;
    instB.count = nb;
    cg.add(instA, instB);
    const edges = [];
    const seen = new Set();
    for (let i = 0; i < N; i++) {
      const near = pos.map((p, j) => [p.distanceTo(pos[i]), j]).filter((e) => e[1] !== i).sort((a, b) => a[0] - b[0]).slice(0, 2);
      for (const [, j] of near) {
        const k = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(k)) continue;
        seen.add(k);
        edges.push(pos[i].x, pos[i].y, pos[i].z, pos[j].x, pos[j].y, pos[j].z);
      }
    }
    const eg = new THREE.BufferGeometry();
    eg.setAttribute("position", new THREE.Float32BufferAttribute(edges, 3));
    cg.add(new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0x7c8cff, transparent: true, opacity: 0.18 })));
    group.add(cg);
    updaters.push((t) => { cg.rotation.y = -t * 0.03; cg.position.y = 0.05 * Math.sin(t * 0.5); });
  }

  /* ── Star field ───────────────────────────────────────────────────────── */
  {
    const n = 1100;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u), r = rand(11, 19);
      arr[i * 3] = r * s * Math.cos(th);
      arr[i * 3 + 1] = r * u;
      arr[i * 3 + 2] = r * s * Math.sin(th);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const stars = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.12, map: glowTex, color: 0xaab4ff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
    group.add(stars);
    updaters.push((t) => { stars.rotation.y = t * 0.008; });
  }

  /* ── Per-frame update / cleanup ───────────────────────────────────────── */
  function update(t, dt) {
    dt = Math.min(dt, 0.05);
    editor.update(t, dt);
    term.update(t, dt);
    lapPanel.update(t, dt);
    dash.update(t);
    kbUpdate(t, dt, editor.isTyping());
    for (const u of updaters) u(t, dt);
  }

  function dispose() {
    group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        for (const m of ms) m.dispose();
      }
    });
    for (const t of textures) t.dispose();
    if (group.parent) group.parent.remove(group);
  }

  return { group, update, dispose, DESK_Y };
}

/* ── Host: renderer + camera + controls ──────────────────────────────────── */

/**
 * Mounts the workstation into `container`.
 * addons = { OrbitControls, RoundedBoxGeometry, RoomEnvironment }
 * Returns { dispose, resetView, setAutoRotate, controls, renderer }.
 */
export function mountWorkstation(THREE, addons, container, opts = {}) {
  const { OrbitControls, RoundedBoxGeometry, RoomEnvironment } = addons;
  const idleDelay = opts.idleDelay ?? 3000;
  const autoRotateSpeed = opts.autoRotateSpeed ?? 0.9;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.maxPixelRatio ?? 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  let envTex = null;
  if (RoomEnvironment) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.35;
    pmrem.dispose();
  }

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
  const target = opts.target ? new THREE.Vector3().fromArray(opts.target) : new THREE.Vector3(0, 0.72, 0);
  const homeDir = (opts.homePosition ? new THREE.Vector3().fromArray(opts.homePosition) : new THREE.Vector3(2.7, 1.9, 3.4)).sub(target).normalize();
  const homeDistance = () => {
    if (opts.homeDistance) return opts.homeDistance;
    const aspect = Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1);
    return aspect < 0.8 ? 7.4 : aspect < 1.3 ? 5.6 : 4.6;
  };
  const goHome = () => {
    camera.position.copy(target).addScaledVector(homeDir, homeDistance());
    controls.target.copy(target);
    controls.update();
  };

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 1.7;
  controls.maxDistance = 9.5;
  controls.minPolarAngle = 0.2;
  controls.maxPolarAngle = 1.45;
  controls.autoRotate = true;
  controls.autoRotateSpeed = autoRotateSpeed;
  controls.zoomSpeed = 0.8;
  controls.enableZoom = opts.enableZoom ?? true;

  let idleTimer = null;
  let autoWanted = true;
  controls.addEventListener("start", () => {
    controls.autoRotate = false;
    if (idleTimer) clearTimeout(idleTimer);
  });
  controls.addEventListener("end", () => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { if (autoWanted) controls.autoRotate = true; }, idleDelay);
  });

  const ws = createWorkstation(THREE, { RoundedBoxGeometry });
  scene.add(ws.group);

  const resize = () => {
    const w = Math.max(container.clientWidth, 1), h = Math.max(container.clientHeight, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  goHome();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  let visible = true;
  let io = null;
  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; }, { threshold: 0 });
    io.observe(container);
  }
  const onVis = () => { if (document.hidden) clock.stop(); else clock.start(); };
  document.addEventListener("visibilitychange", onVis);

  const clock = new THREE.Clock();
  let raf = 0, frames = 0;
  const frame = () => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const dt = clock.getDelta();
    ws.update(clock.elapsedTime, dt);
    controls.update();
    renderer.render(scene, camera);
    if (++frames === 2 && opts.onReady) opts.onReady();
  };
  frame();

  return {
    controls,
    renderer,
    scene,
    camera,
    resetView: goHome,
    setAutoRotate(on) {
      autoWanted = on;
      controls.autoRotate = on;
      if (!on && idleTimer) clearTimeout(idleTimer);
    },
    dispose() {
      cancelAnimationFrame(raf);
      if (idleTimer) clearTimeout(idleTimer);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      if (io) io.disconnect();
      controls.dispose();
      ws.dispose();
      if (envTex) envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    },
  };
}
