import {
  Box,
  Button,
  Center,
  Link as ChakraLink,
  ChakraProvider,
  ColorModeProvider,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
  Tooltip,
  extendTheme,
  useColorMode
} from "@chakra-ui/react"
import { useEffect } from "react"
import {
  Route,
  Router,
  Switch as RouterSwitch,
  Link as WouterLink
} from "wouter"

import { useStorage } from "@plasmohq/storage/hook"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
}

const theme = extendTheme({ config })

function Link({ href, children, ...props }) {
  const as = href.startsWith("http") ? undefined : WouterLink
  return (
    <ChakraLink href={href} {...props} as={as}>
      {children}
    </ChakraLink>
  )
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: 300
          }}>
          <Router>
            <RouterSwitch>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route>
                <IndexPopup />
              </Route>
            </RouterSwitch>
          </Router>
        </div>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

function Settings() {
  const { colorMode, toggleColorMode } = useColorMode()
  let checked = colorMode === "dark"
  return (
    <Box p="4">
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0" mr="auto">
          Darkmode
        </FormLabel>
        <Switch isChecked={checked} onChange={(e) => toggleColorMode()} />
      </FormControl>
      <Center>
        <Link href="/">
          <Button>Back</Button>
        </Link>
      </Center>
    </Box>
  )
}

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
    <>
      <Box bg="gray.600" px="4" py="4">
        <Heading fontSize={"3xl"}> Better Nexus</Heading>
        <Text fontSize={"md"} colorScheme="blue">
          Just slightly improve the Nexus experience
        </Text>
        <Box as="nav" display="flex" gap="2">
          <Link href="/settings">Settings</Link>
          <Link href="https://www.nexusmods.com/" target="_blank">
            Open nexus
          </Link>
        </Box>
      </Box>
      <Box px="4" pb="4" pt="2">
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
      </Box>
    </>
  )
}

export default App
