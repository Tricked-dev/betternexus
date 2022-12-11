const windowChanger = (config: Config) => {
  // The download path @example https://www.nexusmods.com/subnautica/mods/12?tab=files&file_id=4226
  let path: string;
  async function addQuickDownload() {
    if (document.getElementById("better-nexus-active")) {
      return;
    }
    let manualParentBase = document.getElementById("action-manual");
    let manualParent = manualParentBase.cloneNode(true) as HTMLElement;

    // only do buttons with popup-btn-ajax other ones are more direct
    let text = manualParent
      ?.getElementsByClassName("btn inline-flex popup-btn-ajax")[0];

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

    // automatically go to the download page
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
  async function AddInstantDownload() {
    let search = new URL(path).searchParams;
    let file = search.get("id") ?? search.get("file_id");
    let manualParentBase = document.getElementById("action-manual");
    let url = await fetch(
      "https://www.nexusmods.com/Core/Libs/Common/Managers/Downloads?GenerateDownloadUrl",
      {
        "headers": {
          "accept": "*/*",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest",
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `fid=${file}&game_id=${window.current_game_id}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include",
      },
    ).then((r) => r.json()).then((r) => r.url);
    if (url) {
      let manualParent = manualParentBase.cloneNode(true) as HTMLElement;

      manualParent.children[0].attributes["href"].value = url;
      let text = manualParent
        ?.getElementsByClassName("btn inline-flex popup-btn-ajax")[0];
      text.getElementsByClassName("flex-label")[0].innerHTML =
        "Instant Download";

      manualParentBase.parentNode.appendChild(manualParent);

      if (
        window.location.search.includes("fast=true")
      ) {
        window.location.href = url;
      }
    }
  }

  if (config.quickDownloadButton) {
    addQuickDownload();
  }
  if (config.autoDownload) {
    addAutoDownload();
  }
  if (config.superQuickDownload) {
    AddInstantDownload();
  }
  if (path && !config.superQuickDownload) {
    if (
      window.location.search.includes("fast=true")
    ) {
      window.location.href = path;
    }
  }
};

export default windowChanger;
