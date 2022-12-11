import {
  Box,
  Button,
  Center,
  Link as ChakraLink,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
  Tooltip,
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

import { ChakraBase } from "~ui"

function Link({ href, children, ...props }) {
  const as =
    href.startsWith("http") || props.target == "_blank" ? undefined : WouterLink
  return (
    <ChakraLink href={href} {...props} as={as}>
      {children}
    </ChakraLink>
  )
}

function App() {
  return (
    <ChakraBase>
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
    </ChakraBase>
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

function Header() {
  return (
    <Box bg="gray.600" px="4" py="4">
      <Heading fontSize={"3xl"}> Better Nexus</Heading>
      <Text fontSize={"md"} colorScheme="blue">
        Just slightly improve the Nexus experience
      </Text>
      <NavigationLinks />
    </Box>
  )
}
function NavigationLinks() {
  return (
    <Box as="nav" display="flex" gap="2">
      <Link href="/settings">Settings</Link>
      <Link href="https://www.nexusmods.com/" target="_blank">
        Open nexus
      </Link>
      <Link href="/tabs/mass.html" target="_blank">
        Open Mass Download
      </Link>
    </Box>
  )
}

function IndexPopup() {
  const [quickDownloadButton, setQuickDownloadButton] = useStorage(
    "QuickDownloadButton",
    true
  )

  const [autoDownload, setAutoDownload] = useStorage("AutoDownload", true)
  const [superQuickDownload, setSuperQuickDownload] = useStorage(
    "SuperQuickDownload",
    false
  )

  useEffect(() => {
    chrome.runtime.sendMessage({
      quickDownloadButton,
      autoDownload,
      superQuickDownload
    })
  }, [quickDownloadButton, autoDownload, superQuickDownload])

  return (
    <>
      <Header />
      <Box px="4" pb="4" pt="2">
        <FormControl display="flex" alignItems="center">
          <Tooltip label="Adds a button that skips the popup when a mod requires dependencies">
            <FormLabel htmlFor="email-alerts" mb="0" mr="auto">
              Quick Download Button
            </FormLabel>
          </Tooltip>
          <Switch
            isChecked={quickDownloadButton}
            colorScheme="orange"
            onChange={(e) => setQuickDownloadButton(e.target.checked)}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <Tooltip label="Adds a new button that skips the 5 second wait and instantly downloads the file (this makes another request on every mod view and might get patched)">
            <FormLabel htmlFor="email-alerts" mb="0" mr="auto">
              Super Quick Download
            </FormLabel>
          </Tooltip>
          <Switch
            isChecked={superQuickDownload}
            colorScheme="orange"
            onChange={(e) => setSuperQuickDownload(e.target.checked)}
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
            colorScheme="orange"
            onChange={(e) => setAutoDownload(e.target.checked)}
          />
        </FormControl>
      </Box>
    </>
  )
}

export default App
