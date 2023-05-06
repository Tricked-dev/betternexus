const windowChanger = (config: Config) => {
  //@ts-ignore
  let loggedIn = typeof window.USER_ID == "number"
  if (!loggedIn && !document.getElementById("better-nexus-thing")) {
    let p = document.createElement("p")
    p.id = "better-nexus-thing"
    p.innerText =
      "Better Nexus requires you to login otherwise it will not work"
    p.style.background =
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 58%, rgba(0,212,255,1) 100%)"
    p.style.textAlign = "center"
    p.style.color = "white"
    p.style.padding = "10px"
    p.style.fontFamily = "roboto"
    p.style.fontSize = "2rem"
    document.body.append(p.cloneNode(true))
    document.body.prepend(p)
  }
  // The download path @example https://www.nexusmods.com/subnautica/mods/12?tab=files&file_id=4226
  let path: string
  const addQuickDownload = () => {
    if (document.getElementById("better-nexus-active")) return
    const manualParentBase = document.getElementById("action-manual")
    const manualParent = manualParentBase?.cloneNode(true) as HTMLElement

    const text = manualParent?.getElementsByClassName(
      "btn inline-flex popup-btn-ajax"
    )[0]
    if (!text) {
      const dl = manualParent?.getElementsByClassName("btn inline-flex")[0]
      path = dl?.attributes["href"].value
      return
    }

    manualParentBase.parentNode.appendChild(manualParent)
    manualParent.id = "better-nexus-active"

    const search = new URL(`https://localhost${text.attributes["href"].value}`)
      .searchParams
    const file = search.get("id") || search.get("file_id")
    const downloadUrl = new URL(window.location.href)

    downloadUrl.searchParams.set("file_id", file)
    downloadUrl.searchParams.set("tab", "files")
    downloadUrl.searchParams.delete("fast")

    text.setAttribute("href", downloadUrl.href)
    text.getElementsByClassName("flex-label")[0].innerHTML = "Quick Download"
    text.classList.remove("popup-btn-ajax")

    path = downloadUrl.href
  }

  const addAutoDownload = () => {
    const interval = setInterval(() => {
      const dl = document.getElementById("slowDownloadButton")

      if (dl) {
        clearInterval(interval)
        setTimeout(() => dl.click(), 200)
      }
    }, 200)
  }
  const getInstantDownloadUrl = async (
    file: string,
    gameId: string
  ): Promise<string> => {
    let url = await fetch(
      "https://www.nexusmods.com/Core/Libs/Common/Managers/Downloads?GenerateDownloadUrl",
      {
        headers: {
          accept: "*/*",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest"
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `fid=${file}&game_id=${gameId}`,
        method: "POST",
        mode: "cors",
        credentials: "include"
      }
    )
      .then((r) => r.json())
      .then((r) => r.url)
    return url
  }
  const addInstantDownload = async () => {
    if (!path || document.getElementById("better-nexus-instant-download"))
      return
    let search = new URL(path).searchParams
    let file = search.get("id") ?? search.get("file_id")
    let manualParentBase = document.getElementById("action-manual")

    let manualParent = manualParentBase.cloneNode(true) as HTMLElement

    let text = manualParent?.getElementsByClassName("btn inline-flex")[0]

    text.getElementsByClassName("flex-label")[0].innerHTML = "Instant Download"
    text.id = "better-nexus-instant-download"
    manualParentBase.parentNode.appendChild(manualParent)

    let url = await getInstantDownloadUrl(file, window.current_game_id)
    if (!url) {
      text.classList.add("disabled")
      return
    }
    manualParent.children[0].attributes["href"].value = url

    if (window.location.search.includes("fast=true")) {
      window.location.href = url
    }
  }
  const waitForElement = (
    selector: string
  ): Promise<HTMLCollectionOf<HTMLElement>> => {
    return new Promise((resolve) => {
      function waitFor() {
        const element = document.getElementsByClassName(selector)
        if (element.length) {
          resolve(element as HTMLCollectionOf<HTMLElement>)
        } else {
          window.requestAnimationFrame(waitFor)
        }
      }
      waitFor()
    })
  }
  const listDownloadButton = async () => {
    let mods: HTMLCollectionOf<HTMLElement> = await waitForElement("mod-tile")
    for (let mod of mods) {
      let btn = document.createElement("button")
      btn.innerText = "Download"
      btn.classList.add("inline-flex", "btnsmall", "btn")
      btn.style.marginLeft = "auto"
      let elem = mod.getElementsByClassName("tile-data")[0]
      if (elem.attributes["better-nexus-active"]) continue
      elem.attributes["better-nexus-active"] = "true"
      let element = document.createElement("li")
      element.classList.add("inline-flex")
      element.appendChild(btn)
      elem.children[0].appendChild(element)
      let link =
        mod.getElementsByClassName("tile-name")[0].children[0].attributes[
          "href"
        ]
      btn.onclick = async () => {
        try {
          let text = await fetch(link.value).then((r) => r.text())
          const regex =
            /https:\/\/(www\.)?nexusmods\.com\/\w+\/mods\/(\d+)\?tab=files&file_id=(\d+)/g
          const match = regex.exec(text)

          if (match) {
            let url = match[0]
            if (!url.startsWith("https://")) {
              url = "https://www.nexusmods.com" + url
            }
            let search = new URL(url).searchParams
            let modId = search.get("id") || search.get("file_id")
            let dl = await getInstantDownloadUrl(modId, window.current_game_id)
            let downloadAnchor = document.createElement("a")
            downloadAnchor.href = dl
            downloadAnchor.click()
          } else {
            alert("I could not find the download link.")
          }
        } catch (e) {
          alert(e)
        }
      }
    }
  }
  if (config.listDownloadButton) {
    listDownloadButton()
  }
  if (config.quickDownloadButton) {
    addQuickDownload()
  }
  if (config.autoDownload) {
    addAutoDownload()
  }
  if (config.superQuickDownload) {
    addInstantDownload()
  }

  if (path && !config.superQuickDownload) {
    if (window.location.search.includes("fast=true")) {
      window.location.href = path
    }
  }

  if (config.removePremiumBanners) {
    //https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!mutation.addedNodes) return

        for (let i = 0; i < mutation.addedNodes.length; i++) {
          // do things to your newly added nodes here
          let node = mutation.addedNodes[i] as HTMLElement
          if (!node.classList.contains(".premium-block")) {
            continue
          }
          node.classList.add("hidden")
          node.remove()
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    })
  }
}

export default windowChanger
