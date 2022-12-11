import windowChanger from "./injected-helper";
import { Storage } from "@plasmohq/storage";
let config: Config = undefined;

chrome.runtime.onMessage.addListener((msg: Config) => config = msg);
const storage = new Storage();
const inject = async (tabId: number) => {
  if (!config) {
    config = {
      quickDownloadButton:
        (await storage.get("QuickDownloadButton")) != "false",
      autoDownload: (await storage.get("AutoDownload")) != "false",
      superQuickDownload: (await storage.get("SuperQuickDownload")) != "false",
      removePremiumBanners:
        (await storage.get("RemovePremiumBanners")) != "false",
    };
  }
  chrome.scripting.executeScript(
    {
      target: {
        tabId,
      },
      world: typeof browser !== "undefined" ? undefined : "MAIN", // MAIN in order to access the window object
      func: windowChanger,
      args: [config],
    },
    () => {
      //callback function
    },
  );
};

// Simple example showing how to inject.
// You can inject however you'd like to, doesn't have
// to be with chrome.tabs.onActivated
chrome.tabs.onUpdated.addListener((e, changeInfo, tab) => {
  if (!tab.url.includes("https://www.nexusmods.com/")) return;
  inject(e);
});
