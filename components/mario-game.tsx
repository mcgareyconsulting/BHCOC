"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 * Old-school side-scrolling platformer ("Mario"-style), canvas-based.
 * Four hand-built levels, increasing difficulty.
 *
 * The game world is built from fixed-height tile levels (15 rows).
 * The canvas fills the entire browser window: we scale the 15-tile-tall
 * world up to the window height and reveal as much horizontal play area
 * as the window width allows, so the play field is as big as the screen.
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

  return {
    grid,
    cols,
    goombas,
    coins,
    startX,
    startY,
    flagX,
    widthPx: cols * TILE
  };
}

interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  onGround: boolean;
  facing: 1 | -1;
  invuln: number;
  coyote: number; // frames of jump grace after leaving ground
  jumpBuffer: number; // frames a buffered jump press stays valid
}

export function MarioGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<Phase>("start");
  const [hud, setHud] = useState({ score: 0, coins: 0, lives: 3, level: 1 });

  // Mutable game state lives in refs so the rAF loop stays stable.
  const keys = useRef<Record<string, boolean>>({});
  const phaseRef = useRef<Phase>("start");
  const levelIndex = useRef(0);
  const level = useRef<LevelState | null>(null);
  const player = useRef<PlayerState | null>(null);
  const camera = useRef(0);
  const score = useRef(0);
  const coinCount = useRef(0);
  const lives = useRef(3);
  const transitionTimer = useRef(0);

  // View / scaling — recomputed on resize so the game fills the window.
  const viewW = useRef(832); // visible world width in px (world units)
  const scale = useRef(1); // world px -> css px
  const dpr = useRef(1);

  const syncHud = useCallback(() => {
    setHud({
      score: score.current,
      coins: coinCount.current,
      lives: lives.current,
      level: levelIndex.current + 1
    });
  }, []);

  const loadLevel = useCallback((idx: number) => {
    const lv = buildLevel(RAW_LEVELS[idx]);
    level.current = lv;
    player.current = {
      x: lv.startX,
      y: lv.startY,
      vx: 0,
      vy: 0,
      w: TILE - 8,
      h: TILE - 2,
      onGround: false,
      facing: 1,
      invuln: 0,
      coyote: 0,
      jumpBuffer: 0
    };
    camera.current = 0;
  }, []);

  const startGame = useCallback(() => {
    score.current = 0;
    coinCount.current = 0;
    lives.current = 3;
    levelIndex.current = 0;
    loadLevel(0);
    phaseRef.current = "playing";
    setPhase("playing");
    syncHud();
  }, [loadLevel, syncHud]);

  const setPhaseBoth = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  // Used by both keyboard and on-screen buttons: a "confirm" press that
  // starts / restarts the game depending on the current phase.
  const confirmPress = useCallback(() => {
    const p = phaseRef.current;
    if (p === "start" || p === "dead" || p === "won") {
      startGame();
      return true;
    }
    return false;
  }, [startGame]);

  // -- Keyboard input -------------------------------------------------
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        ["arrowleft", "arrowright", "arrowup", "arrowdown", " ", "w", "a", "s", "d"].includes(k)
      ) {
        e.preventDefault();
      }
      // rising edge of a jump key -> buffer a jump (ignore key auto-repeat)
      const isJumpKey = k === "arrowup" || k === "w" || k === " ";
      if (isJumpKey && !keys.current[k] && !e.repeat) {
        keys.current["__jumpPressed"] = true;
      }
      keys.current[k] = true;
      if (k === " " || k === "enter") confirmPress();
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

  const collideAxis = (lv: LevelState, p: PlayerState, axis: "x" | "y") => {
    const left = p.x;
    const right = p.x + p.w;
    const top = p.y;
    const bottom = p.y + p.h;
    const c0 = Math.floor(left / TILE);
    const c1 = Math.floor((right - 1) / TILE);
    const r0 = Math.floor(top / TILE);
    const r1 = Math.floor((bottom - 1) / TILE);

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
            handleHeadBump(lv, c, r);
          }
          p.vy = 0;
        }
      }
    }
  };

  const handleHeadBump = (lv: LevelState, col: number, r: number) => {
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
      score.current += 200;
      coinCount.current += 1;
      syncHud();
    }
  };

  const killPlayer = useCallback(() => {
    lives.current -= 1;
    syncHud();
    if (lives.current <= 0) {
      setPhaseBoth("dead");
    } else {
      loadLevel(levelIndex.current);
    }
  }, [loadLevel, setPhaseBoth, syncHud]);

  // -- Main loop ------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size the canvas to the full window and compute the world->screen
    // scale so the 15-tile-tall world fills the height.
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

    const update = () => {
      const p = player.current;
      const lv = level.current;
      if (!p || !lv) return;

      const left = keys.current["arrowleft"] || keys.current["a"];
      const right = keys.current["arrowright"] || keys.current["d"];
      const jump = keys.current["arrowup"] || keys.current["w"] || keys.current[" "];
      const jumpPressed = !!keys.current["__jumpPressed"];
      keys.current["__jumpPressed"] = false;

      // tick down forgiveness timers; refresh coyote while grounded
      if (p.onGround) p.coyote = COYOTE_FRAMES;
      else if (p.coyote > 0) p.coyote -= 1;
      if (p.jumpBuffer > 0) p.jumpBuffer -= 1;
      if (jumpPressed) p.jumpBuffer = JUMP_BUFFER_FRAMES;

      // --- horizontal movement (separate ground/air feel) ---
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

      // --- jump: fires from a buffered press within the coyote window ---
      if (p.jumpBuffer > 0 && p.coyote > 0) {
        p.vy = JUMP_VELOCITY;
        p.onGround = false;
        p.coyote = 0;
        p.jumpBuffer = 0;
      }
      // variable height: cut the rise short when jump is released
      if (!jump && p.vy < JUMP_CUTOFF) p.vy = JUMP_CUTOFF;

      // --- physics integrate ---
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

      // --- pit death ---
      if (p.y > WORLD_H + TILE) {
        killPlayer();
        return;
      }
      // --- spike / lava ---
      const footY = p.y + p.h - 4;
      if (
        tileAt(lv, Math.floor((p.x + 4) / TILE), Math.floor(footY / TILE)) === "^" ||
        tileAt(lv, Math.floor((p.x + p.w - 4) / TILE), Math.floor(footY / TILE)) === "^"
      ) {
        if (p.invuln <= 0) {
          killPlayer();
          return;
        }
      }

      // --- coins ---
      const pcx = p.x + p.w / 2;
      const pcy = p.y + p.h / 2;
      for (const coin of lv.coins) {
        if (coin.collected) continue;
        if (coin.popping) {
          coin.y += coin.vy;
          coin.vy += 0.5;
          coin.life -= 1;
          if (coin.life <= 0) coin.collected = true;
          continue;
        }
        if (Math.abs(coin.x - pcx) < 22 && Math.abs(coin.y - pcy) < 24) {
          coin.collected = true;
          coinCount.current += 1;
          score.current += 100;
          syncHud();
        }
      }

      // --- goombas ---
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
        if (isSolid(tileAt(lv, aheadCol, midRow))) {
          g.vx = -g.vx;
        }
        const footRow = Math.floor((g.y + g.h + 2) / TILE);
        const floorAhead = isSolid(tileAt(lv, aheadCol, footRow));
        if (!floorAhead) g.vx = -g.vx;

        if (p.x < g.x + g.w && p.x + p.w > g.x && p.y < g.y + g.h && p.y + p.h > g.y) {
          const stomped = p.vy > 0 && p.y + p.h - g.y < 18;
          if (stomped) {
            g.alive = false;
            g.squashTimer = 30;
            p.vy = JUMP_VELOCITY * 0.6;
            score.current += 300;
            syncHud();
          } else if (p.invuln <= 0) {
            killPlayer();
            return;
          }
        }
      }

      // --- goal flag ---
      if (p.x + p.w > lv.flagX && p.x < lv.flagX + TILE) {
        score.current += 1000;
        syncHud();
        if (levelIndex.current >= RAW_LEVELS.length - 1) {
          setPhaseBoth("won");
        } else {
          setPhaseBoth("levelcomplete");
          transitionTimer.current = 110;
        }
        return;
      }

      // --- camera follows player ---
      const vw = viewW.current;
      const target = p.x + p.w / 2 - vw / 2;
      camera.current = Math.max(0, Math.min(target, Math.max(0, lv.widthPx - vw)));
    };

    // ---- rendering ----
    const drawTile = (t: Tile, sx: number, sy: number) => {
      switch (t) {
        case "X":
          ctx.fillStyle = "#8a5a2b";
          ctx.fillRect(sx, sy, TILE, TILE);
          ctx.fillStyle = "#7a4a1f";
          ctx.fillRect(sx, sy, TILE, 5);
          ctx.fillStyle = "#5e9b3a";
          ctx.fillRect(sx, sy, TILE, 6);
          ctx.fillStyle = "rgba(0,0,0,0.18)";
          ctx.fillRect(sx, sy + TILE - 4, TILE, 4);
          break;
        case "B":
          ctx.fillStyle = "#b5651d";
          ctx.fillRect(sx, sy, TILE, TILE);
          ctx.strokeStyle = "#7a4413";
          ctx.lineWidth = 2;
          ctx.strokeRect(sx + 1, sy + 1, TILE - 2, TILE / 2 - 1);
          ctx.strokeRect(sx + 1, sy + TILE / 2, TILE - 2, TILE / 2 - 1);
          break;
        case "?":
          ctx.fillStyle = "#e8b923";
          ctx.fillRect(sx, sy, TILE, TILE);
          ctx.fillStyle = "#caa017";
          ctx.fillRect(sx, sy, TILE, 4);
          ctx.fillStyle = "#7a5c00";
          ctx.font = "bold 20px monospace";
          ctx.textAlign = "center";
          ctx.fillText("?", sx + TILE / 2, sy + TILE - 8);
          break;
        case "used":
          ctx.fillStyle = "#9a6a2f";
          ctx.fillRect(sx, sy, TILE, TILE);
          ctx.fillStyle = "#7a4a1f";
          ctx.fillRect(sx + 4, sy + 4, TILE - 8, TILE - 8);
          break;
        case "N":
          ctx.fillStyle = "#2e9e4f";
          ctx.fillRect(sx, sy, TILE, TILE);
          ctx.fillStyle = "#1f7e3a";
          ctx.fillRect(sx, sy, 5, TILE);
          ctx.fillStyle = "#5fd07f";
          ctx.fillRect(sx + TILE - 8, sy, 4, TILE);
          break;
        case "=":
          ctx.fillStyle = "#c97f2d";
          ctx.fillRect(sx, sy, TILE, TILE);
          ctx.fillStyle = "#a9631c";
          ctx.fillRect(sx, sy, TILE, 6);
          ctx.fillStyle = "rgba(0,0,0,0.15)";
          ctx.fillRect(sx, sy + TILE - 4, TILE, 4);
          break;
        case "^":
          ctx.fillStyle = "#3a3f4a";
          ctx.fillRect(sx, sy + TILE - 6, TILE, 6);
          ctx.fillStyle = "#c8ccd4";
          ctx.beginPath();
          ctx.moveTo(sx + 4, sy + TILE);
          ctx.lineTo(sx + 10, sy + 8);
          ctx.lineTo(sx + 16, sy + TILE);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(sx + 16, sy + TILE);
          ctx.lineTo(sx + 22, sy + 8);
          ctx.lineTo(sx + 28, sy + TILE);
          ctx.closePath();
          ctx.fill();
          break;
        default:
          break;
      }
    };

    const drawCoin = (cx: number, cy: number) => {
      ctx.fillStyle = "#f7d51d";
      ctx.beginPath();
      ctx.ellipse(cx, cy, 7, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#caa017";
      ctx.beginPath();
      ctx.ellipse(cx, cy, 3, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawGoomba = (g: Goomba, sx: number, sy: number) => {
      if (!g.alive) {
        ctx.fillStyle = "#7a4a2a";
        ctx.fillRect(sx, sy + g.h - 8, g.w, 8);
        return;
      }
      ctx.fillStyle = "#7a4a2a";
      ctx.fillRect(sx + 2, sy + 4, g.w - 4, g.h - 4);
      ctx.fillStyle = "#5a3417";
      ctx.fillRect(sx, sy + g.h - 6, 6, 6);
      ctx.fillRect(sx + g.w - 6, sy + g.h - 6, 6, 6);
      ctx.fillStyle = "#fff";
      ctx.fillRect(sx + 5, sy + 8, 5, 6);
      ctx.fillRect(sx + g.w - 10, sy + 8, 5, 6);
      ctx.fillStyle = "#000";
      ctx.fillRect(sx + 7, sy + 10, 2, 3);
      ctx.fillRect(sx + g.w - 8, sy + 10, 2, 3);
    };

    const drawPlayer = (p: PlayerState) => {
      const sx = p.x - camera.current;
      const sy = p.y;
      if (p.invuln > 0 && Math.floor(p.invuln / 4) % 2 === 0) return; // blink
      ctx.fillStyle = "#1f6fd0";
      ctx.fillRect(sx, sy + p.h * 0.45, p.w, p.h * 0.55);
      ctx.fillStyle = "#d8331f";
      ctx.fillRect(sx, sy + p.h * 0.25, p.w, p.h * 0.3);
      ctx.fillStyle = "#f0b98a";
      ctx.fillRect(sx + 3, sy, p.w - 6, p.h * 0.3);
      ctx.fillStyle = "#d8331f";
      ctx.fillRect(sx + 1, sy - 2, p.w - 2, 6);
      const eyeX = p.facing === 1 ? sx + p.w - 8 : sx + 4;
      ctx.fillStyle = "#000";
      ctx.fillRect(eyeX, sy + 6, 3, 4);
      ctx.fillStyle = "#5a3417";
      ctx.fillRect(sx, sy + p.h - 4, p.w, 4);
    };

    const drawFlag = (lv: LevelState) => {
      const sx = lv.flagX - camera.current + TILE / 2;
      const topY = TILE;
      const baseY = WORLD_H - TILE * 4;
      ctx.fillStyle = "#cfcfcf";
      ctx.fillRect(sx - 2, topY, 4, baseY - topY);
      ctx.fillStyle = "#1f8a3a";
      ctx.beginPath();
      ctx.moveTo(sx + 2, topY + 6);
      ctx.lineTo(sx + 34, topY + 16);
      ctx.lineTo(sx + 2, topY + 26);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#e8b923";
      ctx.beginPath();
      ctx.arc(sx, topY, 6, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      const lv = level.current;
      const vw = viewW.current;

      // map world coords -> device pixels (fills the whole canvas/window)
      const s = scale.current * dpr.current;
      ctx.setTransform(s, 0, 0, s, 0, 0);
      ctx.imageSmoothingEnabled = false;

      // sky
      const grad = ctx.createLinearGradient(0, 0, 0, WORLD_H);
      grad.addColorStop(0, "#5c94fc");
      grad.addColorStop(1, "#9bd0ff");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, vw, WORLD_H);

      if (!lv) return;

      const camX = camera.current;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      for (let i = 0; i < 10; i++) {
        const cxv = ((i * 360 - camX * 0.3) % (vw + 500)) - 120;
        const cyv = 60 + (i % 3) * 40;
        ctx.beginPath();
        ctx.arc(cxv, cyv, 18, 0, Math.PI * 2);
        ctx.arc(cxv + 22, cyv + 4, 22, 0, Math.PI * 2);
        ctx.arc(cxv + 48, cyv, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(46,158,79,0.55)";
      for (let i = 0; i < 10; i++) {
        const hx = ((i * 300 - camX * 0.5) % (vw + 500)) - 120;
        ctx.beginPath();
        ctx.arc(hx, WORLD_H - TILE * 4, 60, Math.PI, 0);
        ctx.fill();
      }

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

      const p = player.current;
      if (p) drawPlayer(p);
    };

    const drawOverlayText = (
      lines: { text: string; size: number; y: number; color?: string }[]
    ) => {
      const vw = viewW.current;
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 0, vw, WORLD_H);
      ctx.textAlign = "center";
      for (const l of lines) {
        ctx.fillStyle = l.color ?? "#fff";
        ctx.font = `bold ${l.size}px monospace`;
        ctx.fillText(l.text, vw / 2, l.y);
      }
    };

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
          { text: "SUPER RETRO BROS", size: 44, y: 150, color: "#f7d51d" },
          { text: "4 Levels of platforming", size: 18, y: 195 },
          { text: "Arrow keys / WASD to move", size: 16, y: 250 },
          { text: "Up / W / Space to jump (hold for higher)", size: 16, y: 278 },
          { text: "Stomp enemies, grab coins, reach the flag", size: 16, y: 306 },
          { text: "Press SPACE or ENTER to start", size: 20, y: 372, color: "#7cf77c" }
        ]);
      } else if (phaseRef.current === "levelcomplete") {
        drawOverlayText([
          { text: `LEVEL ${levelIndex.current + 1} CLEAR!`, size: 38, y: 220, color: "#7cf77c" },
          { text: "Get ready for the next stage...", size: 18, y: 270 }
        ]);
      } else if (phaseRef.current === "dead") {
        drawOverlayText([
          { text: "GAME OVER", size: 48, y: 200, color: "#ff5a4a" },
          { text: `Final score: ${score.current}`, size: 22, y: 250 },
          { text: "Press SPACE or ENTER to try again", size: 18, y: 320, color: "#7cf77c" }
        ]);
      } else if (phaseRef.current === "won") {
        drawOverlayText([
          { text: "YOU WIN!", size: 52, y: 190, color: "#f7d51d" },
          { text: "All 4 levels cleared. Thank you!", size: 20, y: 240 },
          { text: `Final score: ${score.current}`, size: 22, y: 285 },
          { text: "Press SPACE or ENTER to play again", size: 18, y: 350, color: "#7cf77c" }
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

  // -- Touch controls -------------------------------------------------
  // Bind a virtual key to a button; "jump" also acts as confirm/start.
  const bindTouch = (key: string, isJump = false) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      if (isJump && confirmPress()) return;
      keys.current[key] = true;
      if (isJump) keys.current["__jumpPressed"] = true;
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

  return (
    <div className="fixed inset-0 z-[100] touch-none bg-black">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ imageRendering: "pixelated" }}
        onPointerDown={() => {
          // tapping the canvas on the title / end screens also starts
          confirmPress();
        }}
      />

      {/* HUD overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-4 px-4 py-3 font-mono text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] sm:text-base">
        <span>SCORE {hud.score.toString().padStart(6, "0")}</span>
        <span className="text-yellow-300">COINS {hud.coins.toString().padStart(2, "0")}</span>
        <span>WORLD {hud.level}-1</span>
        <span className="text-red-400">LIVES {"♥".repeat(Math.max(0, hud.lives))}</span>
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
