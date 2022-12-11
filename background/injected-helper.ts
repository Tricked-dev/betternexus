const windowChanger = (config): void => {
  function addQuickDownload() {
    if (document.getElementById("better-nexus-active")) {
      return;
    }
    let manualParentBase = document.getElementById("action-manual");
    let manualParent = manualParentBase.cloneNode(true) as HTMLElement;

    // only do buttons with popup-btn-ajax other ones are more direct
    let text = manualParent
      ?.getElementsByClassName("btn inline-flex popup-btn-ajax")[0];

    let path: string;
    if (text) {
      manualParentBase.parentNode.appendChild(manualParent);
      manualParent.id = "better-nexus-active";
      let search = new URL(`https://localhost${text.attributes["href"].value}`)
        .searchParams;

      let file = search.get("id") ?? search.get("file_id");
      let downloadUrl = new URL(window.location.href);

      downloadUrl.searchParams.set("file_id", file);
      downloadUrl.searchParams.set("tab", "files");
      downloadUrl.searchParams.delete("fast");

      text.setAttribute(
        "href",
        `${downloadUrl.href}`,
      );
      text.getElementsByClassName("flex-label")[0].innerHTML = "Quick Download";
      text.classList.remove("popup-btn-ajax");

      path = downloadUrl.href;
    }
    let instantDownload = manualParent
      ?.getElementsByClassName("btn inline-flex")[0];
    if (instantDownload) {
      let loc = instantDownload.attributes["href"].value;
      if (loc.includes("file_id=")) {
        path = loc;
      }
    }

    if (path) {
      if (
        window.location.search.includes("fast=true")
      ) {
        window.location.href = path.replace("fast=true", "");
      }
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
