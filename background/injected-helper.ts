const windowChanger = (config): void => {
  function addQuickDownload() {
    if (document.getElementById("better-nexus-active")) {
      return;
    }
    let manualParentBase = document.getElementById("action-manual");
    let manualParent = manualParentBase.cloneNode(true) as HTMLElement;
    // only do buttons with popup-btn-ajax other ones are more direct
    let text =
      manualParent?.getElementsByClassName("btn inline-flex popup-btn-ajax")[0];
    if (text) {
      manualParentBase.parentNode.appendChild(manualParent);
      manualParent.id = "better-nexus-active";
      let search = new URL(`https://localhost${text.attributes["href"].value}`)
        .searchParams;

      let file = search.get("id") ?? search.get("file_id");
      let new_loc = new URL(window.location.href);

      new_loc.searchParams.set("file_id", file);
      new_loc.searchParams.set("tab", "files");

      text.setAttribute(
        "href",
        `${new_loc.href}`,
      );
      text.getElementsByClassName("flex-label")[0].innerHTML = "Quick Download";

      text.classList.remove("popup-btn-ajax");
    }
  }

  function addAutoDownload() {
    let interval = setInterval(() => {
      let dl = document.getElementById("slowDownloadButton");

      if (dl) {
        clearInterval(interval);
        setTimeout(() => {
          dl.click();
        }, 200);
      }
    }, 200);
  }
  if (config.quickDownloadButton) {
    addQuickDownload();
  }
  if (config.autoDownload) {
    addAutoDownload();
  }
};

export default windowChanger;
