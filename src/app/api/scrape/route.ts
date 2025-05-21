import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const count = parseInt(searchParams.get("count") || "0", 10); // Number of times to click "Load More"

  console.log(count)

  if (!url) {
    return NextResponse.json(
      { error: "Missing URL parameter" },
      { status: 400 }
    );
  }

  await page.goto(url, { waitUntil: "networkidle2" });

  // Click "Load More" `count` times
  for (let i = 0; i < count; i++) {
    const loadMoreButton = await page.$(".load-more-button button");

    if (!loadMoreButton) break;

    try {
      await Promise.all([
        page
          .waitForResponse(
            (res) => res.url().includes("event") && res.status() === 200,
            { timeout: 5000 }
          )
          .catch(() => null),
        loadMoreButton.click(),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 2000));

    } catch (err) {
      console.error("Load More click failed:", err);
      break;
    }
  }

  // Scrape event data
  const events = await page.evaluate(() => {
    const cards = Array.from(
      document.querySelectorAll(".tile__product-list-link")
    );
    const seen = new Set<string>();

    return cards
      .map((card) => {
        const root = card.closest("li");

        const getText = (selector: string) => {
          const el = root?.querySelector(selector);
          return el?.textContent?.trim() || null;
        };

        const getAttr = (selector: string, attr: string) => {
          const el = root?.querySelector(selector);
          return el?.getAttribute(attr) || null;
        };

        const heading = getText(".tile__product-list-tile-heading");
        if (!heading) return null;

        const link = card.getAttribute("href");

        const event = {
          link,
          heading,
          price: (() => {
            const priceContainer = card.querySelector(
              ".tile__product-rate-from"
            );
            const priceSpan = priceContainer?.querySelector("span");
            return priceSpan?.textContent?.trim() || null;
          })(),
          startDate: getText(".start-date"),
          endDate: getText(".end-date"),
          image: getAttr(".img-responsive", "src"),
          address: getText(".tile__product-list-area"),
          description: getText(".prod-desc"),
        };

        const uniqueKey = `${event.heading}|${event.link}`;
        if (seen.has(uniqueKey)) return null;
        seen.add(uniqueKey);

        return event;
      })
      .filter(Boolean);
  });

  await browser.close();
  return NextResponse.json({ events });
}
