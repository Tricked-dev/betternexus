import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Switch,
  Tooltip,
  extendTheme
} from "@chakra-ui/react"
import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
}

const theme = extendTheme({ config })

function IndexPopup() {
  const [quickDownloadButton, setQuickDownloadButton] = useStorage(
    "QuickDownloadButton",
    true
  )
  const [autoDownload, setAutoDownload] = useStorage("AutoDownload", true)

  useEffect(() => {
    chrome.runtime.sendMessage({
      quickDownloadButton,
      autoDownload
    })
  }, [quickDownloadButton, autoDownload])

  return (
    <ChakraProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 16,
          minWidth: 300
        }}>
        <div>
          <Heading>Better Nexus</Heading>
        </div>
        <div>
          <div>
            <FormControl display="flex" alignItems="center">
              <Tooltip label="Adds a button that skips the popup when a mod requires dependencies">
                <FormLabel htmlFor="email-alerts" mb="0" mr="auto">
                  Quick Download Button
                </FormLabel>
              </Tooltip>
              <Switch
                isChecked={quickDownloadButton}
                onChange={(e) => setQuickDownloadButton(e.target.checked)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl display="flex" alignItems="center">
              <Tooltip label="Automatically presses the download (slow) button when it comes in screen">
                <FormLabel htmlFor="email-alerts" mb="0" mr="auto">
                  Auto Download
                </FormLabel>
              </Tooltip>
              <Switch
                isChecked={autoDownload}
                onChange={(e) => setAutoDownload(e.target.checked)}
              />
            </FormControl>
          </div>
        </div>
        <hr />
        <Link href="https://www.nexusmods.com/" target="_blank">
          Open nexus
        </Link>
      </div>
    </ChakraProvider>
  )
}

export default IndexPopup
