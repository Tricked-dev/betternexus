const windowChanger = (config: Config) => {
  // The download path @example https://www.nexusmods.com/subnautica/mods/12?tab=files&file_id=4226
  let path: string;
  const addQuickDownload = () => {
    if (document.getElementById("better-nexus-active")) return;
    const manualParentBase = document.getElementById("action-manual");
    const manualParent = manualParentBase?.cloneNode(true) as HTMLElement;

    const text =
      manualParent?.getElementsByClassName("btn inline-flex popup-btn-ajax")[0];
    if (!text) return;

    manualParentBase.parentNode.appendChild(manualParent);
    manualParent.id = "better-nexus-active";

    const search =
      new URL(`https://localhost${text.attributes["href"].value}`).searchParams;
    const file = search.get("id") || search.get("file_id");
    const downloadUrl = new URL(window.location.href);

    downloadUrl.searchParams.set("file_id", file);
    downloadUrl.searchParams.set("tab", "files");
    downloadUrl.searchParams.delete("fast");

    text.setAttribute("href", downloadUrl.href);
    text.getElementsByClassName("flex-label")[0].innerHTML = "Quick Download";
    text.classList.remove("popup-btn-ajax");

    path = downloadUrl.href;
  };

  const addAutoDownload = () => {
    const interval = setInterval(() => {
      const dl = document.getElementById("slowDownloadButton");

      if (dl) {
        clearInterval(interval);
        setTimeout(() => dl.click(), 200);
      }
    }, 200);
  };
  const getInstantDownloadUrl = async (file: string, gameId: string) => {
    let url = await fetch(
      "https://www.nexusmods.com/Core/Libs/Common/Managers/Downloads?GenerateDownloadUrl",
      {
        "headers": {
          "accept": "*/*",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest",
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `fid=${file}&game_id=${gameId}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include",
      },
    ).then((r) => r.json()).then((r) => r.url);
    return url;
  };
  const addInstantDownload = async () => {
    if (!path) return;
    let search = new URL(path).searchParams;
    let file = search.get("id") ?? search.get("file_id");
    let manualParentBase = document.getElementById("action-manual");
    let url = await getInstantDownloadUrl(file, window.current_game_id);
    if (!url) return;
    let manualParent = manualParentBase.cloneNode(true) as HTMLElement;

    manualParent.children[0].attributes["href"].value = url;
    let text = manualParent
      ?.getElementsByClassName("btn inline-flex popup-btn-ajax")[0];
    text.getElementsByClassName("flex-label")[0].innerHTML = "Instant Download";

    manualParentBase.parentNode.appendChild(manualParent);

    if (
      window.location.search.includes("fast=true")
    ) {
      window.location.href = url;
    }
  };
  const waitForElement = (
    selector: string,
  ): Promise<HTMLCollectionOf<HTMLElement>> => {
    return new Promise((resolve) => {
      function waitFor() {
        const element = document.getElementsByClassName(selector);
        if (element.length) {
          resolve(element as HTMLCollectionOf<HTMLElement>);
        } else {
          window.requestAnimationFrame(waitFor);
        }
      }
      waitFor();
    });
  };
  const listDownloadButton = async () => {
    let mods: HTMLCollectionOf<HTMLElement> = await waitForElement(
      "mod-tile",
    );
    for (let mod of mods) {
      let btn = document.createElement("button");
      btn.innerHTML = "QuickDL";
      btn.classList.add("inline-flex");
      let elem = mod.getElementsByClassName("tile-data")[0];
      if (elem.attributes["better-nexus-active"]) continue;
      elem.attributes["better-nexus-active"] = "true";
      let element = document.createElement("li");
      element.classList.add("inline-flex");
      element.appendChild(btn);
      elem.children[0].appendChild(element);
      let modId = mod.children[1].attributes["data-mod-id"].value;
      btn.onclick = async () => {
        try {
          let dl = await getInstantDownloadUrl(modId, window.current_game_id);
          let downloadAnchor = document.createElement("a");
          downloadAnchor.href = dl;
          downloadAnchor.click();
        } catch (e) {
          alert(e);
        }
      };
    }
  };
  if (config.listDownloadButton) {
    listDownloadButton();
  }
  if (config.quickDownloadButton) {
    addQuickDownload();
  }
  if (config.autoDownload) {
    addAutoDownload();
  }
  if (config.superQuickDownload) {
    addInstantDownload();
  }

  if (path && !config.superQuickDownload) {
    if (
      window.location.search.includes("fast=true")
    ) {
      window.location.href = path;
    }
  }
  function removeAllPremiumBanners() {
    let elemns = document.querySelectorAll("section .premium-block");
    for (let elem of elemns) {
      elem.classList.add("hidden");
      elem.remove();
    }
  }
  if (config.removePremiumBanners) {
    setTimeout(() => {
      removeAllPremiumBanners();
    }, 200);
    removeAllPremiumBanners();
  }
};

export default windowChanger;
