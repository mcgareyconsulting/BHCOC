"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 * Old-school side-scrolling platformer ("Mario"-style), canvas-based.
 * Four hand-built levels, increasing difficulty. One- or two-player
 * local co-op on a single shared screen.
 *
 * The game world is built from fixed-height tile levels (15 rows).
 * The canvas fills the entire browser window: we scale the 15-tile-tall
 * world up to the window height and reveal as much horizontal play area
 * as the window width allows, so the play field is as big as the screen.
 *
 * Co-op: the camera frames the leading player; a trailing player is
 * dragged along the left edge and can't fall off-screen. Lives are
 * shared; each player keeps their own score. Either player touching the
 * flag clears the stage.
 *
 * Tile legend (per level string row):
 *   space / .  empty
 *   X          ground / solid block
 *   B          brick (solid)
 *   ?          question block -> pops a coin when hit from below
 *   o          free-floating coin (collectible)
 *   E          goomba spawn
 *   N          pipe (solid, green)
 *   =          floating platform (solid)
 *   ^          hazard (spikes / lava) -> instant death
 *   F          goal flag
 *   S          player start
 * ------------------------------------------------------------------ */

const TILE = 32;
const ROWS = 15;
const WORLD_H = ROWS * TILE; // 480 — fixed world height, mapped to window height

// --- Movement tuning (snappier, more forgiving controls) -------------
const GRAVITY = 0.62;
const MOVE_ACCEL = 1.15; // ground acceleration — punchier
const AIR_ACCEL = 0.9; // solid air control
const MAX_RUN = 6.2; // higher top speed
const FRICTION = 0.8; // ground friction when no input
const AIR_FRICTION = 0.96; // keep momentum in the air
const JUMP_VELOCITY = -13.2;
const JUMP_CUTOFF = -4; // releasing jump trims upward velocity (variable height)
const MAX_FALL = 17;
const ENEMY_SPEED = 1.1;

// Forgiveness windows (in 60fps steps)
const COYOTE_FRAMES = 7; // jump shortly after leaving a ledge
const JUMP_BUFFER_FRAMES = 7; // jump pressed slightly before landing still fires

type Phase = "start" | "playing" | "dead" | "levelcomplete" | "won";

// ---- Level definitions ------------------------------------------------
const LEVEL_1 = [
  "                                                                            ",
  "                                                                            ",
  "                                                                            ",
  "                                                                            ",
  "                  ?                                                          ",
  "                                            o o o                           ",
  "          o          ? B ?                                       F          ",
  "                                        =====                    F          ",
  "      S         E                                      E         F          ",
  "                              N             E                    F          ",
  "                              N                                  F          ",
  "XXXXXXXXXXXXXX   XXXXXXXXXXXXXXXXXXXXX     XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ",
  "XXXXXXXXXXXXXX   XXXXXXXXXXXXXXXXXXXXX     XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ",
  "XXXXXXXXXXXXXX   XXXXXXXXXXXXXXXXXXXXX     XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ",
  "XXXXXXXXXXXXXX   XXXXXXXXXXXXXXXXXXXXX     XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX "
];

const LEVEL_2 = [
  "                                                                                        ",
  "                                                                                        ",
  "                          o o                                                           ",
  "             ? ? ?                          B B B                                       ",
  "                                                                                        ",
  "                       =====            o          o                          F         ",
  "                                  E                          ? ?              F         ",
  "        o o                                      =====                        F         ",
  "   S          E          N N           E                  E        =====      F         ",
  "              N N         N N                             N N                 F         ",
  "              N N         N N                             N N                 F         ",
  "XXXXXXXXXX   XXXXXXX   XXXXXXXXX   XXX   XXXXXXXXXX   XXXXXXXXXXX   XXXXXXXXXXXXXXXX      ",
  "XXXXXXXXXX   XXXXXXX   XXXXXXXXX   XXX   XXXXXXXXXX   XXXXXXXXXXX   XXXXXXXXXXXXXXXX      ",
  "XXXXXXXXXX   XXXXXXX   XXXXXXXXX   XXX   XXXXXXXXXX   XXXXXXXXXXX   XXXXXXXXXXXXXXXX      ",
  "XXXXXXXXXX   ^^^^^^^   XXXXXXXXX   ^^^   XXXXXXXXXX   ^^^^^^^^^^^   XXXXXXXXXXXXXXXX      "
];

const LEVEL_3 = [
  "                                                                                                  ",
  "                          o o o                                                                   ",
  "              ? B ?                       =====                                                   ",
  "                                                          o o o                                   ",
  "                          E E                     B B B                                           ",
  "       =====                          =====                          =====                        ",
  "                  o o                            E          E                       o o   F        ",
  "                              E              =====                                        F        ",
  "  S        E         =====            N N                  =====        E         E        F        ",
  "                                      N N                                                  F        ",
  "           N N                        N N             N N N                                F        ",
  "XXXXXXX   XXXXXX   XX   XXXXXX   XXX   XXXXXX   XX   XXXXXXXX   XXX   XXXXXX   XX   XXXXXXXXXXXXX      ",
  "XXXXXXX   XXXXXX   XX   XXXXXX   XXX   XXXXXX   XX   XXXXXXXX   XXX   XXXXXX   XX   XXXXXXXXXXXXX      ",
  "XXXXXXX   ^^^^^^   XX   ^^^^^^   XXX   ^^^^^^   XX   XXXXXXXX   ^^^   ^^^^^^   XX   XXXXXXXXXXXXX      ",
  "XXXXXXX   ^^^^^^   XX   ^^^^^^   XXX   ^^^^^^   XX   XXXXXXXX   ^^^   ^^^^^^   XX   XXXXXXXXXXXXX      "
];

const LEVEL_4 = [
  "                                                                                                              ",
  "          o o o o                                                                                             ",
  "     ? B B B ?                  =====            =====                                                        ",
  "                                                              o o o o                                         ",
  "                   E E E                 B B B                          =====                                 ",
  "      =====                  =====                    E E                            =====                    ",
  "                 o o o                          =====            E         E                      o o o  F     ",
  "                         E           N N N                 =====                        E E E            F     ",
  " S       E      =====         E      N N N        E                =====        E              =====     F     ",
  "                              =====  N N N                                                              F     ",
  "      N N        N N N                N N N          N N N N        N N        N N N N      N N          F     ",
  "XXXX   XXX   XX   XXX   XX   XXX   X   XXXXX   XX   XXX   XX   XXX   XXX   XX   XXXX   XX   XXXXXXXXXXXXXX       ",
  "XXXX   ^^^   XX   ^^^   XX   ^^^   X   XXXXX   ^^   ^^^   XX   ^^^   ^^^   XX   ^^^^   ^^   XXXXXXXXXXXXXX       ",
  "XXXX   ^^^   XX   ^^^   XX   ^^^   X   XXXXX   ^^   ^^^   XX   ^^^   ^^^   XX   ^^^^   ^^   XXXXXXXXXXXXXX       ",
  "XXXX   ^^^   XX   ^^^   XX   ^^^   X   XXXXX   ^^   ^^^   XX   ^^^   ^^^   XX   ^^^^   ^^   XXXXXXXXXXXXXX       "
];

const RAW_LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4];

// ---- Types ------------------------------------------------------------
type Tile = " " | "X" | "B" | "?" | "N" | "=" | "^" | "F" | "used";

interface Goomba {
  x: number;
  y: number;
  vx: number;
  w: number;
  h: number;
  alive: boolean;
  squashTimer: number;
}

interface Coin {
  x: number;
  y: number;
  collected: boolean;
  vy: number;
  popping: boolean;
  life: number;
}

interface LevelState {
  grid: Tile[][];
  cols: number;
  goombas: Goomba[];
  coins: Coin[];
  startX: number;
  startY: number;
  flagX: number;
  widthPx: number;
}

interface Controls {
  left: string[];
  right: string[];
  jump: string[];
}

interface Palette {
  hat: string; // cap + shirt
  hatDark: string;
  overall: string;
  overallDark: string;
  skin: string;
}

interface PlayerState {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  onGround: boolean;
  facing: 1 | -1;
  invuln: number;
  coyote: number;
  jumpBuffer: number;
  animTime: number;
  controls: Controls;
  colors: Palette;
}

const P1_COLORS: Palette = {
  hat: "#e23b2e",
  hatDark: "#a8261d",
  overall: "#2a6fd6",
  overallDark: "#1c4f9c",
  skin: "#f4c08a"
};
const P2_COLORS: Palette = {
  hat: "#34a44a",
  hatDark: "#227233",
  overall: "#2a6fd6",
  overallDark: "#1c4f9c",
  skin: "#f4c08a"
};
const BOOT = "#5a3417";
const HAIR = "#3a2412";

const MERGED_CONTROLS: Controls = {
  left: ["arrowleft", "a"],
  right: ["arrowright", "d"],
  jump: ["arrowup", "w", " "]
};
const P1_CONTROLS: Controls = { left: ["arrowleft"], right: ["arrowright"], jump: ["arrowup", " "] };
const P2_CONTROLS: Controls = { left: ["a"], right: ["d"], jump: ["w"] };

function isSolid(t: Tile): boolean {
  return t === "X" || t === "B" || t === "?" || t === "N" || t === "=" || t === "used";
}

function buildLevel(raw: string[]): LevelState {
  const cols = Math.max(...raw.map((r) => r.length));
  const grid: Tile[][] = [];
  const goombas: Goomba[] = [];
  const coins: Coin[] = [];
  let startX = TILE * 2;
  let startY = TILE * 2;
  let flagX = cols * TILE - TILE * 2;

  for (let r = 0; r < ROWS; r++) {
    const rowStr = (raw[r] ?? "").padEnd(cols, " ");
    const row: Tile[] = [];
    for (let c = 0; c < cols; c++) {
      const ch = rowStr[c];
      const px = c * TILE;
      const py = r * TILE;
      switch (ch) {
        case "X":
        case "B":
        case "?":
        case "N":
        case "=":
        case "^":
          row.push(ch as Tile);
          break;
        case "F":
          row.push("F");
          flagX = px;
          break;
        case "S":
          startX = px;
          startY = py;
          row.push(" ");
          break;
        case "E":
          goombas.push({
            x: px,
            y: py,
            vx: -ENEMY_SPEED,
            w: TILE - 6,
            h: TILE - 4,
            alive: true,
            squashTimer: 0
          });
          row.push(" ");
          break;
        case "o":
          coins.push({
            x: px + TILE / 2,
            y: py + TILE / 2,
            collected: false,
            vy: 0,
            popping: false,
            life: 0
          });
          row.push(" ");
          break;
        default:
          row.push(" ");
      }
    }
    grid.push(row);
  }

  return { grid, cols, goombas, coins, startX, startY, flagX, widthPx: cols * TILE };
}

function makePlayer(id: number, lv: LevelState, mode: number): PlayerState {
  const controls = mode === 1 ? MERGED_CONTROLS : id === 0 ? P1_CONTROLS : P2_CONTROLS;
  return {
    id,
    x: lv.startX + id * 24,
    y: lv.startY,
    vx: 0,
    vy: 0,
    w: TILE - 8,
    h: TILE - 2,
    onGround: false,
    facing: 1,
    invuln: 0,
    coyote: 0,
    jumpBuffer: 0,
    animTime: 0,
    controls,
    colors: id === 0 ? P1_COLORS : P2_COLORS
  };
}

export function MarioGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<Phase>("start");
  const [hud, setHud] = useState({
    mode: 1,
    level: 1,
    lives: 3,
    p: [
      { score: 0, coins: 0 },
      { score: 0, coins: 0 }
    ]
  });

  // Mutable game state lives in refs so the rAF loop stays stable.
  const keys = useRef<Record<string, boolean>>({});
  const justPressed = useRef<Set<string>>(new Set());
  const phaseRef = useRef<Phase>("start");
  const modeRef = useRef(1);
  const levelIndex = useRef(0);
  const level = useRef<LevelState | null>(null);
  const players = useRef<PlayerState[]>([]);
  const camera = useRef(0);
  const scores = useRef<number[]>([0, 0]);
  const coinTotals = useRef<number[]>([0, 0]);
  const lives = useRef(3);
  const transitionTimer = useRef(0);
  const animTick = useRef(0);

  // View / scaling — recomputed on resize so the game fills the window.
  const viewW = useRef(832);
  const scale = useRef(1);
  const dpr = useRef(1);

  const syncHud = useCallback(() => {
    setHud({
      mode: modeRef.current,
      level: levelIndex.current + 1,
      lives: lives.current,
      p: [
        { score: scores.current[0], coins: coinTotals.current[0] },
        { score: scores.current[1], coins: coinTotals.current[1] }
      ]
    });
  }, []);

  const loadLevel = useCallback((idx: number) => {
    const lv = buildLevel(RAW_LEVELS[idx]);
    level.current = lv;
    const count = modeRef.current === 2 ? 2 : 1;
    players.current = Array.from({ length: count }, (_, i) => makePlayer(i, lv, modeRef.current));
    camera.current = 0;
  }, []);

  const startGame = useCallback(
    (mode?: number) => {
      if (mode === 1 || mode === 2) modeRef.current = mode;
      scores.current = [0, 0];
      coinTotals.current = [0, 0];
      lives.current = 3;
      levelIndex.current = 0;
      loadLevel(0);
      phaseRef.current = "playing";
      setPhase("playing");
      syncHud();
    },
    [loadLevel, syncHud]
  );

  const setPhaseBoth = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  // Used by both keyboard and on-screen buttons: a "confirm" press that
  // starts / restarts the game depending on the current phase.
  const confirmPress = useCallback(
    (mode?: number) => {
      const p = phaseRef.current;
      if (p === "start" || p === "dead" || p === "won") {
        startGame(mode);
        return true;
      }
      return false;
    },
    [startGame]
  );

  // -- Keyboard input -------------------------------------------------
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        ["arrowleft", "arrowright", "arrowup", "arrowdown", " ", "w", "a", "s", "d"].includes(k)
      ) {
        e.preventDefault();
      }
      // rising edge (ignore key auto-repeat) -> remember for jump buffering
      if (!keys.current[k] && !e.repeat) justPressed.current.add(k);
      keys.current[k] = true;

      // Mode selection / confirm on menu screens.
      if (k === "1") confirmPress(1);
      else if (k === "2") confirmPress(2);
      else if (k === " " || k === "enter") confirmPress();
    };
    const up = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [confirmPress]);

  // -- Helpers used inside loop --------------------------------------
  const tileAt = (lv: LevelState, col: number, r: number): Tile => {
    if (r < 0 || r >= ROWS || col < 0 || col >= lv.cols) return " ";
    return lv.grid[r][col];
  };

  const handleHeadBump = (lv: LevelState, col: number, r: number, pid: number) => {
    const t = tileAt(lv, col, r);
    if (t === "?") {
      lv.grid[r][col] = "used";
      lv.coins.push({
        x: col * TILE + TILE / 2,
        y: r * TILE,
        collected: false,
        vy: -7,
        popping: true,
        life: 45
      });
      scores.current[pid] += 200;
      coinTotals.current[pid] += 1;
      syncHud();
    }
  };

  const collideAxis = (lv: LevelState, p: PlayerState, axis: "x" | "y") => {
    const c0 = Math.floor(p.x / TILE);
    const c1 = Math.floor((p.x + p.w - 1) / TILE);
    const r0 = Math.floor(p.y / TILE);
    const r1 = Math.floor((p.y + p.h - 1) / TILE);

    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        if (!isSolid(tileAt(lv, c, r))) continue;
        const tx = c * TILE;
        const ty = r * TILE;
        if (axis === "x") {
          if (p.vx > 0) p.x = tx - p.w;
          else if (p.vx < 0) p.x = tx + TILE;
          p.vx = 0;
        } else {
          if (p.vy > 0) {
            p.y = ty - p.h;
            p.onGround = true;
          } else if (p.vy < 0) {
            p.y = ty + TILE;
            handleHeadBump(lv, c, r, p.id);
          }
          p.vy = 0;
        }
      }
    }
  };

  // Returns true when the frame should halt (level reloaded or game over).
  const killPlayer = useCallback(
    (pid: number) => {
      lives.current -= 1;
      syncHud();
      if (lives.current <= 0) {
        setPhaseBoth("dead");
        return true;
      }
      const lv = level.current;
      if (modeRef.current === 2 && lv) {
        // respawn the fallen player next to their partner
        const partner = players.current.find((o) => o.id !== pid);
        const dp = players.current.find((o) => o.id === pid);
        if (dp) {
          dp.x = partner ? partner.x : lv.startX;
          dp.y = (partner ? partner.y : lv.startY) - TILE;
          dp.vx = 0;
          dp.vy = 0;
          dp.invuln = 120;
          dp.onGround = false;
          dp.coyote = 0;
          dp.jumpBuffer = 0;
        }
        return false;
      }
      loadLevel(levelIndex.current);
      return true;
    },
    [loadLevel, setPhaseBoth, syncHud]
  );

  // -- Main loop ------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      dpr.current = ratio;
      canvas.width = Math.round(cssW * ratio);
      canvas.height = Math.round(cssH * ratio);
      const s = cssH / WORLD_H;
      scale.current = s;
      viewW.current = cssW / s;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const STEP = 1000 / 60;

    // step a single player's physics + interactions; returns true to halt frame
    const stepPlayer = (p: PlayerState, lv: LevelState): boolean => {
      const c = p.controls;
      const left = c.left.some((k) => keys.current[k]);
      const right = c.right.some((k) => keys.current[k]);
      const jumpHeld = c.jump.some((k) => keys.current[k]);
      const jumpEdge = c.jump.some((k) => justPressed.current.has(k));

      if (p.onGround) p.coyote = COYOTE_FRAMES;
      else if (p.coyote > 0) p.coyote -= 1;
      if (p.jumpBuffer > 0) p.jumpBuffer -= 1;
      if (jumpEdge) p.jumpBuffer = JUMP_BUFFER_FRAMES;

      const accel = p.onGround ? MOVE_ACCEL : AIR_ACCEL;
      if (left && !right) {
        p.vx -= accel;
        p.facing = -1;
      } else if (right && !left) {
        p.vx += accel;
        p.facing = 1;
      } else {
        p.vx *= p.onGround ? FRICTION : AIR_FRICTION;
        if (Math.abs(p.vx) < 0.05) p.vx = 0;
      }
      p.vx = Math.max(-MAX_RUN, Math.min(MAX_RUN, p.vx));

      if (p.jumpBuffer > 0 && p.coyote > 0) {
        p.vy = JUMP_VELOCITY;
        p.onGround = false;
        p.coyote = 0;
        p.jumpBuffer = 0;
      }
      if (!jumpHeld && p.vy < JUMP_CUTOFF) p.vy = JUMP_CUTOFF;

      p.x += p.vx;
      collideAxis(lv, p, "x");
      if (p.x < 0) {
        p.x = 0;
        p.vx = 0;
      }
      if (p.x + p.w > lv.widthPx) p.x = lv.widthPx - p.w;

      p.vy += GRAVITY;
      if (p.vy > MAX_FALL) p.vy = MAX_FALL;
      p.onGround = false;
      p.y += p.vy;
      collideAxis(lv, p, "y");

      if (p.invuln > 0) p.invuln -= 1;
      if (p.onGround && Math.abs(p.vx) > 0.4) p.animTime += Math.abs(p.vx);

      // pit death
      if (p.y > WORLD_H + TILE) return killPlayer(p.id);

      // spike / lava
      const footY = p.y + p.h - 4;
      if (
        tileAt(lv, Math.floor((p.x + 4) / TILE), Math.floor(footY / TILE)) === "^" ||
        tileAt(lv, Math.floor((p.x + p.w - 4) / TILE), Math.floor(footY / TILE)) === "^"
      ) {
        if (p.invuln <= 0) return killPlayer(p.id);
      }

      // coins
      const pcx = p.x + p.w / 2;
      const pcy = p.y + p.h / 2;
      for (const coin of lv.coins) {
        if (coin.collected || coin.popping) continue;
        if (Math.abs(coin.x - pcx) < 22 && Math.abs(coin.y - pcy) < 24) {
          coin.collected = true;
          coinTotals.current[p.id] += 1;
          scores.current[p.id] += 100;
          syncHud();
        }
      }

      // goal flag
      if (p.x + p.w > lv.flagX && p.x < lv.flagX + TILE) {
        scores.current[p.id] += 1000;
        syncHud();
        if (levelIndex.current >= RAW_LEVELS.length - 1) {
          setPhaseBoth("won");
        } else {
          setPhaseBoth("levelcomplete");
          transitionTimer.current = 110;
        }
        return true;
      }

      return false;
    };

    const update = () => {
      const lv = level.current;
      if (!lv || players.current.length === 0) return;

      // advance coin pop animation once per step
      for (const coin of lv.coins) {
        if (coin.collected || !coin.popping) continue;
        coin.y += coin.vy;
        coin.vy += 0.5;
        coin.life -= 1;
        if (coin.life <= 0) coin.collected = true;
      }

      // players
      for (const p of players.current) {
        if (stepPlayer(p, lv)) {
          justPressed.current.clear();
          return;
        }
      }

      // goombas (move once, then test against every player)
      for (const g of lv.goombas) {
        if (!g.alive) {
          if (g.squashTimer > 0) g.squashTimer -= 1;
          continue;
        }
        g.x += g.vx;
        g.y += 4;
        const gr = Math.floor((g.y + g.h) / TILE);
        const gcL = Math.floor(g.x / TILE);
        const gcR = Math.floor((g.x + g.w) / TILE);
        if (isSolid(tileAt(lv, gcL, gr)) || isSolid(tileAt(lv, gcR, gr))) {
          g.y = gr * TILE - g.h;
        }
        const aheadCol =
          g.vx < 0 ? Math.floor((g.x - 1) / TILE) : Math.floor((g.x + g.w + 1) / TILE);
        const midRow = Math.floor((g.y + g.h / 2) / TILE);
        if (isSolid(tileAt(lv, aheadCol, midRow))) g.vx = -g.vx;
        const footRow = Math.floor((g.y + g.h + 2) / TILE);
        if (!isSolid(tileAt(lv, aheadCol, footRow))) g.vx = -g.vx;

        for (const p of players.current) {
          if (!g.alive) break;
          if (p.x < g.x + g.w && p.x + p.w > g.x && p.y < g.y + g.h && p.y + p.h > g.y) {
            const stomped = p.vy > 0 && p.y + p.h - g.y < 18;
            if (stomped) {
              g.alive = false;
              g.squashTimer = 30;
              p.vy = JUMP_VELOCITY * 0.6;
              scores.current[p.id] += 300;
              syncHud();
            } else if (p.invuln <= 0) {
              if (killPlayer(p.id)) {
                justPressed.current.clear();
                return;
              }
            }
          }
        }
      }

      // camera follows the leading (right-most) player
      let lead = players.current[0];
      for (const p of players.current) if (p.x > lead.x) lead = p;
      const vw = viewW.current;
      const target = lead.x + lead.w / 2 - vw / 2;
      camera.current = Math.max(0, Math.min(target, Math.max(0, lv.widthPx - vw)));

      // keep trailing players from sliding off the left edge of the view
      for (const p of players.current) {
        if (p.x < camera.current + 4) {
          p.x = camera.current + 4;
          if (p.vx < 0) p.vx = 0;
        }
      }

      justPressed.current.clear();
    };

    // ---- rendering primitives ----
    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      const rad = Math.max(0, Math.min(r, w / 2, h / 2));
      ctx.beginPath();
      ctx.moveTo(x + rad, y);
      ctx.arcTo(x + w, y, x + w, y + h, rad);
      ctx.arcTo(x + w, y + h, x, y + h, rad);
      ctx.arcTo(x, y + h, x, y, rad);
      ctx.arcTo(x, y, x + w, y, rad);
      ctx.closePath();
    };

    const vGrad = (x: number, y: number, h: number, top: string, bot: string) => {
      const g = ctx.createLinearGradient(x, y, x, y + h);
      g.addColorStop(0, top);
      g.addColorStop(1, bot);
      return g;
    };

    // ---- tiles ----
    const drawTile = (t: Tile, sx: number, sy: number) => {
      switch (t) {
        case "X": {
          ctx.fillStyle = vGrad(sx, sy, TILE, "#a9743c", "#7a4a1f");
          ctx.fillRect(sx, sy, TILE, TILE);
          // dirt speckles
          ctx.fillStyle = "rgba(0,0,0,0.12)";
          ctx.fillRect(sx + 6, sy + 16, 3, 3);
          ctx.fillRect(sx + 20, sy + 22, 3, 3);
          ctx.fillRect(sx + 13, sy + 26, 2, 2);
          // grass cap
          ctx.fillStyle = vGrad(sx, sy, 10, "#7ed957", "#4e9b34");
          ctx.fillRect(sx, sy, TILE, 8);
          ctx.fillStyle = "#3f8a2c";
          for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(sx + 4 + i * 8, sy + 8, 4, Math.PI, 0);
            ctx.fill();
          }
          ctx.fillStyle = "rgba(0,0,0,0.18)";
          ctx.fillRect(sx, sy + TILE - 3, TILE, 3);
          break;
        }
        case "B": {
          ctx.fillStyle = vGrad(sx, sy, TILE, "#c2702a", "#9c531c");
          rr(sx + 0.5, sy + 0.5, TILE - 1, TILE - 1, 4);
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.28)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sx + 2, sy + TILE / 2);
          ctx.lineTo(sx + TILE - 2, sy + TILE / 2);
          ctx.moveTo(sx + TILE / 2, sy + 2);
          ctx.lineTo(sx + TILE / 2, sy + TILE / 2);
          ctx.moveTo(sx + TILE / 4, sy + TILE / 2);
          ctx.lineTo(sx + TILE / 4, sy + TILE - 2);
          ctx.moveTo(sx + (3 * TILE) / 4, sy + TILE / 2);
          ctx.lineTo(sx + (3 * TILE) / 4, sy + TILE - 2);
          ctx.stroke();
          ctx.strokeStyle = "rgba(255,255,255,0.25)";
          ctx.strokeRect(sx + 2.5, sy + 2.5, TILE - 5, 2);
          break;
        }
        case "?": {
          const pulse = 0.5 + 0.5 * Math.sin(animTick.current * 0.12);
          ctx.fillStyle = vGrad(sx, sy, TILE, "#ffd64a", "#e0a410");
          rr(sx + 1, sy + 1, TILE - 2, TILE - 2, 5);
          ctx.fill();
          ctx.strokeStyle = `rgba(255,255,255,${0.35 + pulse * 0.4})`;
          ctx.lineWidth = 1.5;
          rr(sx + 3, sy + 3, TILE - 6, TILE - 6, 4);
          ctx.stroke();
          // rivets
          ctx.fillStyle = "#7a5c00";
          for (const [rx, ry] of [
            [5, 5],
            [TILE - 5, 5],
            [5, TILE - 5],
            [TILE - 5, TILE - 5]
          ]) {
            ctx.beginPath();
            ctx.arc(sx + rx, sy + ry, 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = "#fff";
          ctx.font = "bold 19px 'Courier New', monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("?", sx + TILE / 2 + 0.5, sy + TILE / 2 + 1.5);
          ctx.textBaseline = "alphabetic";
          break;
        }
        case "used": {
          ctx.fillStyle = vGrad(sx, sy, TILE, "#9a6a2f", "#6f4a1f");
          rr(sx + 1, sy + 1, TILE - 2, TILE - 2, 5);
          ctx.fill();
          ctx.fillStyle = "rgba(0,0,0,0.25)";
          rr(sx + 5, sy + 5, TILE - 10, TILE - 10, 3);
          ctx.fill();
          break;
        }
        case "N": {
          const g = ctx.createLinearGradient(sx, sy, sx + TILE, sy);
          g.addColorStop(0, "#3fbf63");
          g.addColorStop(0.25, "#5fe089");
          g.addColorStop(0.55, "#2e9e4f");
          g.addColorStop(1, "#1c7a3a");
          ctx.fillStyle = g;
          ctx.fillRect(sx, sy, TILE, TILE);
          ctx.fillStyle = "rgba(0,0,0,0.18)";
          ctx.fillRect(sx + TILE - 4, sy, 4, TILE);
          ctx.fillStyle = "rgba(255,255,255,0.35)";
          ctx.fillRect(sx + 5, sy, 3, TILE);
          break;
        }
        case "=": {
          ctx.fillStyle = vGrad(sx, sy, TILE, "#d39a4f", "#9c6326");
          rr(sx + 0.5, sy + 0.5, TILE - 1, TILE - 1, 6);
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.3)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sx + 3, sy + 4);
          ctx.lineTo(sx + TILE - 3, sy + 4);
          ctx.stroke();
          ctx.strokeStyle = "rgba(0,0,0,0.18)";
          ctx.beginPath();
          ctx.moveTo(sx + 4, sy + TILE * 0.55);
          ctx.lineTo(sx + TILE - 4, sy + TILE * 0.55);
          ctx.stroke();
          break;
        }
        case "^": {
          ctx.fillStyle = vGrad(sx, sy + TILE - 8, 8, "#4a5160", "#2c313c");
          ctx.fillRect(sx, sy + TILE - 7, TILE, 7);
          for (const cx of [sx + 9, sx + 22]) {
            const g = ctx.createLinearGradient(cx - 7, 0, cx + 7, 0);
            g.addColorStop(0, "#9aa0ad");
            g.addColorStop(0.5, "#eef1f6");
            g.addColorStop(1, "#9aa0ad");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(cx - 7, sy + TILE - 4);
            ctx.lineTo(cx, sy + 5);
            ctx.lineTo(cx + 7, sy + TILE - 4);
            ctx.closePath();
            ctx.fill();
          }
          break;
        }
        default:
          break;
      }
    };

    const drawCoin = (cx: number, cy: number) => {
      const spin = Math.abs(Math.cos(animTick.current * 0.12 + cx * 0.05));
      const rxv = 3 + spin * 6;
      const g = ctx.createLinearGradient(cx - rxv, cy, cx + rxv, cy);
      g.addColorStop(0, "#caa017");
      g.addColorStop(0.5, "#ffe169");
      g.addColorStop(1, "#caa017");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.max(1.5, rxv), 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#a8810f";
      ctx.lineWidth = 1;
      ctx.stroke();
      if (spin > 0.4) {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fillRect(cx - 1, cy - 5, 1.5, 10);
      }
    };

    const drawGoomba = (g: Goomba, sx: number, sy: number) => {
      if (!g.alive) {
        ctx.fillStyle = "#6e4327";
        rr(sx, sy + g.h - 7, g.w, 7, 3);
        ctx.fill();
        return;
      }
      const wob = Math.sin(animTick.current * 0.2 + sx * 0.1) * 1.2;
      // feet
      ctx.fillStyle = "#3c2412";
      ctx.beginPath();
      ctx.ellipse(sx + 6, sy + g.h - 2, 5, 3, 0, 0, Math.PI * 2);
      ctx.ellipse(sx + g.w - 6, sy + g.h - 2, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      // domed body
      const bg = vGrad(sx, sy + 2, g.h, "#9a6438", "#5f3a1f");
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.moveTo(sx + 1, sy + g.h - 4);
      ctx.lineTo(sx + 1, sy + g.h * 0.5);
      ctx.arc(sx + g.w / 2, sy + g.h * 0.5, g.w / 2 - 1, Math.PI, 0);
      ctx.lineTo(sx + g.w - 1, sy + g.h - 4);
      ctx.quadraticCurveTo(sx + g.w / 2, sy + g.h, sx + 1, sy + g.h - 4);
      ctx.closePath();
      ctx.fill();
      // eyes
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(sx + 7, sy + g.h * 0.5 + wob, 3.4, 4.4, 0, 0, Math.PI * 2);
      ctx.ellipse(sx + g.w - 7, sy + g.h * 0.5 + wob, 3.4, 4.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(sx + 8, sy + g.h * 0.5 + 1 + wob, 1.6, 0, Math.PI * 2);
      ctx.arc(sx + g.w - 6, sy + g.h * 0.5 + 1 + wob, 1.6, 0, Math.PI * 2);
      ctx.fill();
      // angry brows
      ctx.strokeStyle = "#2a1709";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx + 3, sy + g.h * 0.32);
      ctx.lineTo(sx + 11, sy + g.h * 0.46);
      ctx.moveTo(sx + g.w - 3, sy + g.h * 0.32);
      ctx.lineTo(sx + g.w - 11, sy + g.h * 0.46);
      ctx.stroke();
    };

    const drawPlayer = (p: PlayerState) => {
      if (p.invuln > 0 && Math.floor(p.invuln / 4) % 2 === 0) return; // blink
      const sx = p.x - camera.current;
      const sy = p.y;
      const w = p.w;
      const h = p.h;
      const C = p.colors;
      const airborne = !p.onGround;
      const step = Math.floor(p.animTime / 6) % 2;

      ctx.save();
      ctx.translate(sx + w / 2, sy);
      ctx.scale(p.facing, 1);
      ctx.translate(-w / 2, 0);

      // soft ground shadow
      if (!airborne) {
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.beginPath();
        ctx.ellipse(w / 2, h, w * 0.42, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // boots
      ctx.fillStyle = BOOT;
      const bootY = h - 5;
      let lb = 0.06 * w;
      let rbx = 0.5 * w;
      if (airborne) {
        lb = 0.16 * w;
        rbx = 0.44 * w;
      } else if (Math.abs(p.vx) > 0.4) {
        lb = step === 0 ? 0.0 : 0.16 * w;
        rbx = step === 0 ? 0.5 * w : 0.36 * w;
      }
      rr(lb, bootY, w * 0.42, 6, 3);
      ctx.fill();
      rr(rbx, bootY, w * 0.46, 6, 3);
      ctx.fill();

      // overalls (lower body)
      ctx.fillStyle = C.overall;
      rr(0.08 * w, h * 0.5, w * 0.84, h * 0.46, 5);
      ctx.fill();
      ctx.fillStyle = C.overallDark;
      rr(0.08 * w, h * 0.78, w * 0.84, h * 0.18, 4);
      ctx.fill();

      // shirt / torso
      ctx.fillStyle = C.hat;
      rr(0.1 * w, h * 0.34, w * 0.8, h * 0.26, 5);
      ctx.fill();
      // arm (front)
      ctx.fillStyle = C.hat;
      rr(w * 0.72, h * 0.4, w * 0.24, h * 0.18, 4);
      ctx.fill();
      ctx.fillStyle = C.skin;
      ctx.beginPath();
      ctx.arc(w * 0.92, h * 0.6, 2.6, 0, Math.PI * 2); // hand
      ctx.fill();

      // overall front panel + straps + button
      ctx.fillStyle = C.overall;
      rr(0.3 * w, h * 0.46, w * 0.4, h * 0.22, 3);
      ctx.fill();
      ctx.fillStyle = "#f7d038";
      ctx.beginPath();
      ctx.arc(0.4 * w, h * 0.55, 1.6, 0, Math.PI * 2);
      ctx.arc(0.6 * w, h * 0.55, 1.6, 0, Math.PI * 2);
      ctx.fill();

      // head
      ctx.fillStyle = C.skin;
      rr(0.16 * w, h * 0.05, w * 0.66, h * 0.34, 6);
      ctx.fill();
      // ear
      ctx.beginPath();
      ctx.arc(0.2 * w, h * 0.24, 2.4, 0, Math.PI * 2);
      ctx.fill();
      // sideburn / hair
      ctx.fillStyle = HAIR;
      rr(0.16 * w, h * 0.14, w * 0.12, h * 0.2, 2);
      ctx.fill();
      // nose
      ctx.fillStyle = C.skin;
      ctx.beginPath();
      ctx.arc(0.82 * w, h * 0.26, 2.8, 0, Math.PI * 2);
      ctx.fill();
      // eye
      ctx.fillStyle = "#243042";
      rr(0.62 * w, h * 0.14, 2.4, 5, 1.2);
      ctx.fill();
      // mustache
      ctx.fillStyle = HAIR;
      rr(0.55 * w, h * 0.28, w * 0.3, h * 0.07, 2);
      ctx.fill();

      // cap
      ctx.fillStyle = C.hat;
      rr(0.12 * w, h * 0.0, w * 0.62, h * 0.16, 5);
      ctx.fill();
      rr(0.4 * w, h * 0.12, w * 0.55, h * 0.07, 3); // brim
      ctx.fill();
      // cap emblem (a small white roundel + the player's color dot)
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(0.4 * w, h * 0.08, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.hatDark;
      ctx.beginPath();
      ctx.arc(0.4 * w, h * 0.08, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawFlag = (lv: LevelState) => {
      const baseX = lv.flagX - camera.current + TILE / 2;
      const topY = TILE * 1.2;
      const baseY = WORLD_H - TILE * 4;
      // base block
      ctx.fillStyle = vGrad(baseX - 12, baseY, 18, "#cfcfcf", "#9a9a9a");
      rr(baseX - 12, baseY, 24, 16, 4);
      ctx.fill();
      // pole
      ctx.fillStyle = vGrad(baseX - 2.5, topY, baseY - topY, "#e8e8e8", "#9a9a9a");
      ctx.fillRect(baseX - 2.5, topY, 5, baseY - topY);
      // ball top
      ctx.fillStyle = "#f0c419";
      ctx.beginPath();
      ctx.arc(baseX, topY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.beginPath();
      ctx.arc(baseX - 2, topY - 2, 2, 0, Math.PI * 2);
      ctx.fill();
      // pennant
      const wave = Math.sin(animTick.current * 0.15) * 3;
      ctx.fillStyle = "#e23b2e";
      ctx.beginPath();
      ctx.moveTo(baseX + 2, topY + 8);
      ctx.quadraticCurveTo(baseX + 26, topY + 12 + wave, baseX + 40, topY + 16);
      ctx.quadraticCurveTo(baseX + 26, topY + 20 - wave, baseX + 2, topY + 28);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(baseX + 14, topY + 18, 3.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      animTick.current += 1;
      const lv = level.current;
      const vw = viewW.current;

      const s = scale.current * dpr.current;
      ctx.setTransform(s, 0, 0, s, 0, 0);
      ctx.imageSmoothingEnabled = true;

      // sky
      const grad = ctx.createLinearGradient(0, 0, 0, WORLD_H);
      grad.addColorStop(0, "#4f8ef7");
      grad.addColorStop(0.6, "#7db4fb");
      grad.addColorStop(1, "#cfe8ff");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, vw, WORLD_H);

      if (!lv) return;
      const camX = camera.current;

      // sun
      ctx.fillStyle = "rgba(255,247,214,0.95)";
      ctx.beginPath();
      ctx.arc(vw - 70 - camX * 0.05, 78, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.beginPath();
      ctx.arc(vw - 70 - camX * 0.05, 78, 48, 0, Math.PI * 2);
      ctx.fill();

      // clouds
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      for (let i = 0; i < 10; i++) {
        const cxv = ((i * 360 - camX * 0.3) % (vw + 500)) - 120;
        const cyv = 50 + (i % 3) * 42;
        ctx.beginPath();
        ctx.arc(cxv, cyv, 16, 0, Math.PI * 2);
        ctx.arc(cxv + 20, cyv + 5, 22, 0, Math.PI * 2);
        ctx.arc(cxv + 44, cyv, 15, 0, Math.PI * 2);
        ctx.ellipse(cxv + 22, cyv + 12, 34, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // hills
      ctx.fillStyle = "#5fb04a";
      for (let i = 0; i < 10; i++) {
        const hx = ((i * 320 - camX * 0.5) % (vw + 500)) - 140;
        ctx.beginPath();
        ctx.ellipse(hx, WORLD_H - TILE * 4, 70, 50, 0, Math.PI, 0);
        ctx.fill();
      }
      // bushes
      ctx.fillStyle = "#3f8a2c";
      for (let i = 0; i < 12; i++) {
        const bx = ((i * 240 - camX * 0.7) % (vw + 400)) - 120;
        const by = WORLD_H - TILE * 4 + 6;
        ctx.beginPath();
        ctx.arc(bx, by, 16, Math.PI, 0);
        ctx.arc(bx + 18, by, 20, Math.PI, 0);
        ctx.arc(bx + 38, by, 15, Math.PI, 0);
        ctx.fill();
      }

      // tiles
      const startCol = Math.floor(camX / TILE);
      const endCol = Math.min(lv.cols, startCol + Math.ceil(vw / TILE) + 2);
      for (let c = startCol; c < endCol; c++) {
        for (let r = 0; r < ROWS; r++) {
          const t = lv.grid[r][c];
          if (t === " " || t === "F") continue;
          drawTile(t, c * TILE - camX, r * TILE);
        }
      }

      drawFlag(lv);

      for (const coin of lv.coins) {
        if (coin.collected) continue;
        drawCoin(coin.x - camX, coin.y);
      }

      for (const g of lv.goombas) {
        if (!g.alive && g.squashTimer <= 0) continue;
        const gsx = g.x - camX;
        if (gsx < -TILE || gsx > vw + TILE) continue;
        drawGoomba(g, gsx, g.y);
      }

      for (const p of players.current) drawPlayer(p);
    };

    const drawOverlayText = (
      lines: { text: string; size: number; y: number; color?: string }[]
    ) => {
      const vw = viewW.current;
      ctx.fillStyle = "rgba(0,0,0,0.62)";
      ctx.fillRect(0, 0, vw, WORLD_H);
      ctx.textAlign = "center";
      for (const l of lines) {
        ctx.fillStyle = l.color ?? "#fff";
        ctx.font = `bold ${l.size}px 'Courier New', monospace`;
        ctx.fillText(l.text, vw / 2, l.y);
      }
    };

    const scoreSummary = () =>
      modeRef.current === 2
        ? `P1 ${scores.current[0]}    P2 ${scores.current[1]}`
        : `Score ${scores.current[0]}`;

    const loop = (now: number) => {
      acc += now - last;
      last = now;
      let steps = 0;
      while (acc >= STEP && steps < 5) {
        if (phaseRef.current === "playing") {
          update();
        } else if (phaseRef.current === "levelcomplete") {
          transitionTimer.current -= 1;
          if (transitionTimer.current <= 0) {
            levelIndex.current += 1;
            loadLevel(levelIndex.current);
            setPhaseBoth("playing");
          }
        }
        acc -= STEP;
        steps++;
      }
      if (acc > 200) acc = 0;

      render();

      if (phaseRef.current === "start") {
        drawOverlayText([
          { text: "SUPER RETRO BROS", size: 46, y: 110, color: "#ffd64a" },
          { text: "Press  1  for ONE PLAYER", size: 22, y: 168, color: "#7cf77c" },
          { text: "Press  2  for TWO PLAYER  (co-op)", size: 22, y: 202, color: "#7cf77c" },
          { text: "P1   Arrow keys  +  ↑ / Space to jump", size: 17, y: 268 },
          { text: "P2   A / D  +  W to jump", size: 17, y: 296, color: "#9be89b" },
          { text: "Stomp enemies · grab coins · reach the flag", size: 16, y: 344 }
        ]);
      } else if (phaseRef.current === "levelcomplete") {
        drawOverlayText([
          { text: `LEVEL ${levelIndex.current + 1} CLEAR!`, size: 40, y: 220, color: "#7cf77c" },
          { text: "Get ready for the next stage...", size: 18, y: 268 }
        ]);
      } else if (phaseRef.current === "dead") {
        drawOverlayText([
          { text: "GAME OVER", size: 50, y: 190, color: "#ff5a4a" },
          { text: scoreSummary(), size: 22, y: 244 },
          { text: "Press SPACE / 1 / 2 to play again", size: 18, y: 312, color: "#7cf77c" }
        ]);
      } else if (phaseRef.current === "won") {
        drawOverlayText([
          { text: "YOU WIN!", size: 54, y: 180, color: "#ffd64a" },
          { text: "All 4 levels cleared. Thank you!", size: 20, y: 230 },
          { text: scoreSummary(), size: 22, y: 278 },
          { text: "Press SPACE / 1 / 2 to play again", size: 18, y: 344, color: "#7cf77c" }
        ]);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [killPlayer, loadLevel, setPhaseBoth, syncHud]);

  // -- Touch controls (mobile = single player) -----------------------
  const bindTouch = (key: string, isJump = false) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      if (isJump && confirmPress()) return;
      keys.current[key] = true;
      if (isJump) justPressed.current.add(key);
    },
    onPointerUp: (e: React.PointerEvent) => {
      e.preventDefault();
      keys.current[key] = false;
    },
    onPointerLeave: () => {
      keys.current[key] = false;
    },
    onPointerCancel: () => {
      keys.current[key] = false;
    }
  });

  const padBtn =
    "flex h-16 w-16 select-none items-center justify-center rounded-full border-2 border-white/40 bg-black/40 text-2xl font-bold text-white/90 backdrop-blur-sm active:bg-white/30 sm:h-20 sm:w-20";

  const twoP = hud.mode === 2;

  return (
    <div className="fixed inset-0 z-[100] touch-none bg-black">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        onPointerDown={() => {
          confirmPress();
        }}
      />

      {/* HUD overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 px-4 py-3 font-mono text-xs text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] sm:text-sm">
        <div className="flex flex-col">
          <span className="text-red-400">P1 {hud.p[0].score.toString().padStart(6, "0")}</span>
          <span className="text-yellow-300">🪙 {hud.p[0].coins.toString().padStart(2, "0")}</span>
        </div>
        <div className="flex flex-col items-center">
          <span>WORLD {hud.level}-1</span>
          <span className="text-red-400">{"♥".repeat(Math.max(0, hud.lives))}</span>
        </div>
        {twoP ? (
          <div className="flex flex-col items-end">
            <span className="text-green-400">P2 {hud.p[1].score.toString().padStart(6, "0")}</span>
            <span className="text-yellow-300">🪙 {hud.p[1].coins.toString().padStart(2, "0")}</span>
          </div>
        ) : (
          <div className="w-16" />
        )}
      </div>

      {/* On-screen touch controls (hidden when a precise pointer / mouse is present) */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-8 [@media(pointer:fine)]:hidden">
        <div className="flex gap-4">
          <button aria-label="Move left" className={padBtn} {...bindTouch("arrowleft")}>
            ◀
          </button>
          <button aria-label="Move right" className={padBtn} {...bindTouch("arrowright")}>
            ▶
          </button>
        </div>
        <button aria-label="Jump" className={padBtn} {...bindTouch(" ", true)}>
          ▲
        </button>
      </div>
    </div>
  );
}
