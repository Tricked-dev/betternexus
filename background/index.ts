import windowChanger from "./injected-helper";
import { Storage } from "@plasmohq/storage";
let config = undefined;

chrome.runtime.onMessage.addListener(messageReceived);
const storage = new Storage();
function messageReceived(msg) {
  config = msg;
}
const inject = async (tabId: number) => {
  if (!config) {
    config = {
      quickDownloadButton:
        (await storage.get("quickDownloadButton")) != "false",
      autoDownload: (await storage.get("autoDownload")) != "false",
    };
  }
  chrome.scripting.executeScript(
    {
      target: {
        tabId,
      },
      world: "MAIN", // MAIN in order to access the window object
      func: windowChanger,
      args: [config],
    },
    () => {
      console.log("Background script got callback after injection");
    },
  );
};

// Simple example showing how to inject.
// You can inject however you'd like to, doesn't have
// to be with chrome.tabs.onActivated
chrome.tabs.onUpdated.addListener((e) => {
  inject(e);
});
