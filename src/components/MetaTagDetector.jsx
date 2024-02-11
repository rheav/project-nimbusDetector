import { useEffect } from "react";

function MetaTagDetector({ onDetect }) {
  useEffect(() => {
    async function detectMetaTags() {
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
            const metaTags = {
              "Meta Pixel": Array.from(
                document.querySelectorAll(
                  'meta[name="facebook-domain-verification"]'
                )
              )
                .map((tag) => tag.getAttribute("content"))
                .filter((content) => content.length > 0),
              Pinterest: Array.from(
                document.querySelectorAll('meta[name="p:domain_verify"]')
              )
                .map((tag) => tag.getAttribute("content"))
                .filter((content) => content.length > 0),
              Google: Array.from(
                document.querySelectorAll(
                  'meta[name="google-site-verification"]'
                )
              )
                .map((tag) => tag.getAttribute("content"))
                .filter((content) => content.length > 0),
            };

            const tagOccurrences = {};
            for (const tagName in metaTags) {
              tagOccurrences[tagName] = metaTags[tagName].length;
            }

            return tagOccurrences;
          },
        },
        (results) => {
          if (!results || results.length === 0) {
            console.log("No results returned from the executeScript call.");
            return;
          }
          const detectedTags = results[0].result;
          console.log("Detected meta tags with occurrences:", detectedTags);
          onDetect(detectedTags);
        }
      );
    }

    detectMetaTags();
  }, []);

  return null;
}

export default MetaTagDetector;
