// Visible fake cursor + click-ripple overlay, driven from Node via the real
// Playwright mouse (so hover/click handlers fire normally) while a DOM dot
// gives the recorded video something to watch move between targets.

export async function installCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById("__wt_cursor")) return;
    const cursor = document.createElement("div");
    cursor.id = "__wt_cursor";
    cursor.style.cssText = [
      "position:fixed", "top:0", "left:0", "width:26px", "height:26px",
      "border-radius:50%", "background:rgba(255,255,255,0.95)",
      "border:2px solid rgba(43,35,24,0.55)", "box-shadow:0 3px 10px rgba(0,0,0,0.45)",
      "pointer-events:none", "z-index:2147483647", "transform:translate(-9999px,-9999px)",
      "will-change:transform",
    ].join(";");
    document.body.appendChild(cursor);

    window.__wtSetCursor = (x, y) => {
      cursor.style.transform = `translate(${x - 13}px, ${y - 13}px)`;
    };
    window.__wtRipple = (x, y) => {
      const r = document.createElement("div");
      r.style.cssText = [
        "position:fixed", "top:0", "left:0", "width:16px", "height:16px",
        "margin:-8px 0 0 -8px", "border-radius:50%",
        "background:rgba(150,80,36,0.55)", "pointer-events:none", "z-index:2147483646",
        `transform:translate(${x}px, ${y}px) scale(1)`, "opacity:1",
        "transition:transform 480ms ease-out, opacity 480ms ease-out",
      ].join(";");
      document.body.appendChild(r);
      requestAnimationFrame(() => {
        r.style.transform = `translate(${x}px, ${y}px) scale(4.2)`;
        r.style.opacity = "0";
      });
      setTimeout(() => r.remove(), 550);
    };
  });
}

export async function moveCursor(page, x, y, { steps = 22, duration = 650 } = {}) {
  const start = page.__wtPos || { x, y };
  const stepDelay = Math.max(6, Math.round(duration / steps));
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    // ease-in-out cubic
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const cx = start.x + (x - start.x) * e;
    const cy = start.y + (y - start.y) * e;
    await page.mouse.move(cx, cy);
    await page.evaluate(([px, py]) => window.__wtSetCursor && window.__wtSetCursor(px, py), [cx, cy]);
    await page.waitForTimeout(stepDelay);
  }
  page.__wtPos = { x, y };
}

export async function clickAt(page, x, y) {
  await page.evaluate(([px, py]) => window.__wtRipple && window.__wtRipple(px, py), [x, y]);
  await page.mouse.down();
  await page.waitForTimeout(80);
  await page.mouse.up();
}

// Moves the visible cursor to the center of a locator, ripples, and clicks it.
export async function clickOn(page, locator, opts = {}) {
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (!box) throw new Error("clickOn: target has no bounding box (not visible?)");
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await moveCursor(page, x, y, opts);
  await clickAt(page, x, y);
}

export async function typeInto(page, locator, text, { delay = 38 } = {}) {
  await clickOn(page, locator, { duration: 400 });
  await page.waitForTimeout(150);
  await locator.pressSequentially(text, { delay });
}
