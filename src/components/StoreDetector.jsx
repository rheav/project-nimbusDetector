/* eslint-disable no-undef */
import { useEffect } from "react";

function StoreDetector() {
  useEffect(() => {
    async function detectScripts() {
      // Query active tab
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab) {
        console.log("No active tab identified.");
        return;
      }

      // Inject content script into active tab
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          function: () => {
            // Get all script tags in the active tab document
            const scriptTags = document.querySelectorAll("script");
            const scriptContents = Array.from(scriptTags).map(
              (tag) => tag.outerHTML
            );
            return scriptContents;
          },
        },
        (results) => {
          if (!results || results.length === 0) {
            console.log("No results returned from the executeScript call.");
            return;
          }
          const scriptTags = results[0].result;
          console.log("Script tags detected:", scriptTags);
        }
      );
    }

    detectScripts();
  }, []);

  return null;
}

export default StoreDetector;
