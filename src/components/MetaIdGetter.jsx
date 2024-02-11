import { useEffect } from "react";

function MetaIdGetter({ onDetect }) {
  useEffect(() => {
    async function detectMetaTagIds() {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab) {
        console.error("No active tab identified.");
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => {
            const ids = {
              Google: [],
              Meta: [],
              Pinterest: [],
            };

            // Function to extract content values from meta tags with a given name
            const extractMetaContents = (name) => {
              const metaTags = document.querySelectorAll(
                `meta[name="${name}"]`
              );
              return Array.from(metaTags)
                .map((metaTag) => metaTag.content)
                .filter((content) => content);
            };

            // Extract Google Site Verification IDs
            ids.Google = extractMetaContents("google-site-verification");

            // Extract Facebook Domain Verification IDs
            ids.Meta = extractMetaContents("facebook-domain-verification");

            ids.Pinterest = extractMetaContents("p:domain_verify");

            return ids;
          },
        },
        (results) => {
          if (!results || results.length === 0) {
            console.error("No results returned from the executeScript call.");
            return;
          }
          const detectedIds = results[0].result;
          console.log("Detected meta tag IDs:", detectedIds);
          onDetect(detectedIds); // Call the callback with the detected IDs
        }
      );
    }

    detectMetaTagIds();
  }, []);

  return null;
}

export default MetaIdGetter;
