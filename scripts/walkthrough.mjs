import { chromium } from "playwright";
import { installCursor, clickOn, typeInto, moveCursor } from "./cursor.mjs";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.WT_BASE_URL || "http://localhost:4173";
const OUT_DIR = process.env.WT_OUT_DIR || "recordings";

const READ_LONG = 2600;
const READ_MED = 1900;
const READ_SHORT = 1300;
const STEP_PAUSE = 550;
const TOAST_PAUSE = 950;
const END_HOLD = 3200;

const wait = (page, ms) => page.waitForTimeout(ms);

async function dispatchNavigate(page, path) {
  await page.evaluate((p) => window.dispatchEvent(new CustomEvent("wt:navigate", { detail: p })), path);
}

async function runWalkthrough(page) {
  // 1. Launch Animation -> auto-advances to Welcome.
  await page.goto(BASE_URL + "/", { waitUntil: "networkidle" });
  await installCursor(page);
  await wait(page, 6900);

  // 2. Welcome
  await wait(page, READ_LONG);
  await clickOn(page, page.getByTestId("cta-get-started"));

  // 3. Create Account
  await wait(page, READ_SHORT);
  await typeInto(page, page.getByTestId("input-name"), "Jordan");
  await wait(page, 300);
  await typeInto(page, page.getByTestId("input-email"), "jordan@example.com");
  await wait(page, 300);
  await typeInto(page, page.getByTestId("input-password"), "password123");
  await wait(page, 400);
  await clickOn(page, page.getByTestId("cta-continue"));

  // 4. Create Your Coach (step 1 of 5)
  await wait(page, READ_MED);
  await clickOn(page, page.getByTestId("avatar-warm"));
  await wait(page, STEP_PAUSE);
  await clickOn(page, page.getByTestId("personality-calm"));
  await wait(page, STEP_PAUSE);
  await typeInto(page, page.getByTestId("input-coach-name"), "Sage");
  await wait(page, 500);
  await clickOn(page, page.getByTestId("cta-continue"));

  // 5. Onboarding Questionnaire / goals (step 2 of 5)
  await wait(page, READ_MED);
  await clickOn(page, page.getByTestId("goal-all"));
  await wait(page, STEP_PAUSE);
  await clickOn(page, page.getByTestId("cta-next"));

  // 6. Schedule Preference (step 3 of 5)
  await wait(page, READ_MED);
  await clickOn(page, page.getByTestId("time-morning"));
  await wait(page, STEP_PAUSE);
  await clickOn(page, page.getByTestId("cta-next"));

  // 7. Workout Types (step 4 of 5)
  await wait(page, READ_MED);
  await clickOn(page, page.getByTestId("type-strength"));
  await wait(page, STEP_PAUSE);
  await clickOn(page, page.getByTestId("type-mindful"));
  await wait(page, STEP_PAUSE);
  await clickOn(page, page.getByTestId("cta-reveal"));

  // 8. Notification Permission (step 5 of 5)
  await wait(page, READ_MED);
  await clickOn(page, page.getByTestId("cta-enable"));

  // 9. Personalized Plan Reveal
  await wait(page, READ_LONG + 600);
  await clickOn(page, page.getByTestId("cta-start"));

  // 10. Home Dashboard -> This week -> Friday dropdown -> Strength & conditioning
  await wait(page, READ_LONG);
  await clickOn(page, page.getByTestId("day-today"));
  await wait(page, 1300);
  await clickOn(page, page.getByTestId("movement-strength"));

  // 11. Strength & Conditioning: mark all 3 videos complete, scroll to the
  // "You did great!" payoff, then back to dashboard.
  await wait(page, READ_MED);
  await clickOn(page, page.getByTestId("complete-0"));
  await wait(page, TOAST_PAUSE);
  await clickOn(page, page.getByTestId("complete-1"));
  await wait(page, TOAST_PAUSE);
  await clickOn(page, page.getByTestId("complete-2"));
  await wait(page, TOAST_PAUSE);
  await page.getByTestId("cta-back-to-dashboard").scrollIntoViewIfNeeded();
  await wait(page, READ_MED);
  await clickOn(page, page.getByTestId("cta-back-to-dashboard"));

  // 12. Home Dashboard -> Deep sleep session player -> back
  await wait(page, READ_SHORT);
  await clickOn(page, page.getByTestId("card-deep-sleep"));
  await wait(page, READ_MED);
  await clickOn(page, page.getByTestId("header-back"));

  // 13. Home Dashboard -> Calendar (bottom nav)
  await wait(page, 900);
  await clickOn(page, page.getByTestId("nav-calendar"));

  // 14. Calendar: open Friday's dropdown without picking anything, dismiss,
  // then open Your progress.
  await wait(page, READ_MED);
  await clickOn(page, page.getByTestId("calendar-today"));
  await wait(page, 1500);
  await moveCursor(page, 30, 110, { duration: 500 });
  await page.mouse.click(30, 110); // click empty space to dismiss without selecting
  await wait(page, 400);
  await clickOn(page, page.getByTestId("your-progress-link"));

  // 15. Progress Insights -> Chat (bottom nav)
  await wait(page, READ_LONG);
  await clickOn(page, page.getByTestId("nav-coach"));

  // 16. Chat with Coach -> hamburger menu -> Settings
  await wait(page, READ_LONG);
  await clickOn(page, page.getByTestId("header-menu"));
  await wait(page, 900);
  await clickOn(page, page.getByTestId("menu-item-settings"));

  // 17. Settings -> scroll to Subscription -> Upgrade to full access -> Paywall
  await wait(page, READ_MED);
  await page.getByTestId("upgrade-link").scrollIntoViewIfNeeded();
  await wait(page, READ_SHORT);
  await clickOn(page, page.getByTestId("upgrade-link"));

  // 18. Paywall holds a few seconds, then cuts to the end card.
  await wait(page, 3600);
  await dispatchNavigate(page, "/end");
  await wait(page, END_HOLD);
}

async function record(deviceName, viewport) {
  const dir = path.join(OUT_DIR, deviceName);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const context = await browser.newContext({
    viewport,
    recordVideo: { dir, size: viewport },
  });
  const page = await context.newPage();

  console.log(`[${deviceName}] recording walkthrough...`);
  await runWalkthrough(page);

  await page.close();
  await context.close();
  await browser.close();

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".webm"));
  const finalPath = path.join(OUT_DIR, `${deviceName}.webm`);
  fs.renameSync(path.join(dir, files[0]), finalPath);
  fs.rmSync(dir, { recursive: true, force: true });
  console.log(`[${deviceName}] saved -> ${finalPath}`);
}

const target = process.argv[2] || "both";
if (target === "desktop" || target === "both") await record("desktop", { width: 1920, height: 1080 });
if (target === "mobile" || target === "both") await record("mobile", { width: 390, height: 844 });
