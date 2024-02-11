/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect } from "react";

function ScriptIdGetter({ onDetect }) {
  useEffect(() => {
    async function detectScriptIds() {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab) {
        console.log("No active tab identified.");
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => {
            // Initialize the ids object with keys for each script type
            // and empty arrays to hold potential multiple IDs
            const ids = {
              "Google Tag Manager": [],
              GA4: [],
              "GA Universal": [],
              "Meta Pixel": [],
              TikTok: [],
            };

            // Helper function to extract IDs using a regex pattern
            const extractIds = (regex, scriptUrls) => {
              return scriptUrls
                .map((url) => url.match(regex))
                .filter(Boolean) // Remove null matches
                .map((match) => match[1]); // Extract the ID
            };

            // Query all script elements and get their src attributes
            const scripts = Array.from(document.scripts)
              .map((script) => script.src)
              .filter((src) => src); // Filter out empty src attributes

            // Define regex patterns for each script type
            const patterns = {
              "Google Tag Manager":
                /googletagmanager\.com\/gtm\.js\?id=(GTM-[A-Z0-9]+)/,
              GA4: /googletagmanager\.com\/gtag\/js\?id=(G-[A-Z0-9]+)/,
              "GA Universal": /google-analytics\.com\/analytics\.js/,
              "Meta Pixel": /connect\.facebook\.net\/signals\/config\/(\d+)/,
              TikTok:
                /analytics\.tiktok\.com\/i18n\/pixel\/events\.js\?sdkid=(\w+)/,
            };

            // Extract IDs for each script type
            Object.entries(patterns).forEach(([key, regex]) => {
              ids[key] = extractIds(regex, scripts);
            });

            // For GA Universal, which doesn't have a unique ID in the URL,
            // count the occurrences of the script instead
            try {
              // Query all inline scripts and convert to array
              const inlineScripts = Array.from(
                document.querySelectorAll("script:not([src])")
              );
              // Look for the GA create call within inline scripts
              inlineScripts.forEach((script) => {
                if (script.textContent.includes("ga(")) {
                  const matches = script.textContent.match(
                    /ga\('create', '([^']+)'/
                  );
                  if (matches) {
                    // Add the UA ID to the array
                    ids["GA Universal"] = ids["GA Universal"] || []; // Initialize the array if not already
                    ids["GA Universal"].push(matches[1]);
                  }
                }
              });
            } catch (error) {
              console.error("Error extracting GA Universal ID:", error);
            }

            return ids;
          },
        },
        (results) => {
          if (!results || results.length === 0) {
            console.log("No results returned from the executeScript call.");
            return;
          }
          const detectedIds = results[0].result;
          console.log("Detected script IDs:", detectedIds);
          onDetect(detectedIds); // Call the callback with the detected IDs
        }
      );
    }

    detectScriptIds();
  }, []);

  return null;
}

export default ScriptIdGetter;
