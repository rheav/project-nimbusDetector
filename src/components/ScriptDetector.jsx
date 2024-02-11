import { useEffect } from "react";

function ScriptDetector({ onDetect }) {
  useEffect(() => {
    async function detectMarketingScripts() {
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
            // Helper function to count occurrences of a script with a given regex
            const countOccurrencesWithRegex = (regexPattern) => {
              const scripts = Array.from(document.querySelectorAll("script"));
              return scripts.reduce((count, script) => {
                return count + (regexPattern.test(script.src) ? 1 : 0);
              }, 0);
            };

            // Regex pattern for Meta Pixel ID
            const metaPixelRegex =
              /connect\.facebook\.net\/signals\/config\/(\d+)/;

            return {
              Meta: countOccurrencesWithRegex(metaPixelRegex),
              "Google Tag Manager": countOccurrencesWithRegex(
                /googletagmanager.com\/gtm.js\?id=GTM-/
              ),
              "GA Universal":
                countOccurrencesWithRegex(
                  /googletagmanager.com\/gtag\/js\?id=UA-/
                ) +
                countOccurrencesWithRegex(/google-analytics.com\/analytics.js/),
              GA4: countOccurrencesWithRegex(
                /googletagmanager.com\/gtag\/js\?id=G-/
              ),
              TikTok: countOccurrencesWithRegex(
                /analytics.tiktok.com\/i18n\/pixel\/events.js\?sdkid=/
              ),
              Taboola: countOccurrencesWithRegex(
                /cdn.taboola.com\/libtrc\/unip\//
              ),
              Pinterest: countOccurrencesWithRegex(
                /assets.pinterest.com\/js\/pinit.js/
              ),
            };
          },
        },
        (results) => {
          if (!results || results.length === 0) {
            console.log("No results returned from the executeScript call.");
            return;
          }
          const detectedScripts = results[0].result;
          console.log(
            "Detected marketing scripts with occurrences:",
            detectedScripts
          );
          onDetect(detectedScripts);
        }
      );
    }

    detectMarketingScripts();
  }, []);

  return null;
}

export default ScriptDetector;
