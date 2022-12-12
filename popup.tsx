import {
  Box,
  Button,
  Center,
  Link as ChakraLink,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Switch,
  Text,
  Tooltip,
  useColorMode
} from "@chakra-ui/react"
import { useEffect } from "react"
import { MdSettings } from "react-icons/md"
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
      <Heading fontSize={"3xl"} display="flex" justifyContent={"space-between"}>
        Better Nexus{" "}
        <Link href="/settings" display="inline-flex">
          <IconButton
            aria-label="settings"
            size="3xl"
            width="1em"
            backgroundColor={"transparent"}
            icon={
              <MdSettings height={"1em"} display="inline-flex" />
            }></IconButton>
        </Link>
      </Heading>
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
      <Link href="https://www.nexusmods.com/" target="_blank">
        Open nexus
      </Link>
      <Link href="/tabs/mass.html" target="_blank">
        Open Mass Download
      </Link>
    </Box>
  )
}

function createSetting<
  K extends string,
  T extends Record<string, string | boolean | JSX.Element>
>(
  key: K,
  options: T
): T & {
  key: K
  v: any
  s: (setter: any) => Promise<void>
} {
  const [v, s] = useStorage(key, options.default ?? true)
  return {
    ...options,
    key,
    v,
    s
  }
}

function QuickSettings() {
  const options = [
    createSetting("quickDownloadButton", {
      label: "Quick Download Button",
      tooltip: (
        <>Adds a button that skips the popup when a mod requires dependencies</>
      )
    }),
    createSetting("autoDownload", {
      label: "Auto Download",
      tooltip: (
        <>
          Automatically presses the download (slow) button when it comes in
          screen
        </>
      )
    }),
    createSetting("removePremiumBanners", {
      label: "Remove Premium Banners",
      tooltip: "Removes the premium banners from the mod page"
    }),
    createSetting("superQuickDownload", {
      label: "Super Quick Download",
      default: false,
      tooltip: (
        <>
          Adds a new button that skips the 5 second wait and instantly downloads
          the file (this makes another request on every mod view and might get
          patched)
        </>
      )
    })
  ] as const

  /* check if the options are valid */
  type Check<T extends Config> = T
  type cnf = Check<Record<typeof options[number]["key"], boolean>>

  useEffect(
    () => {
      chrome.runtime.sendMessage(
        Object.fromEntries(options.map((o) => [o.key, o.v]))
      )
    },
    options.map((x) => x.v)
  )

  return (
    <Box px="4" pb="4" pt="2">
      {options.map((o) => (
        <FormControl display="flex" alignItems="center" key={o.key}>
          <Tooltip label={o.tooltip}>
            <FormLabel htmlFor="email-alerts" mb="0" mr="auto">
              {o.label}
            </FormLabel>
          </Tooltip>
          <Switch
            isChecked={o.v}
            colorScheme="orange"
            onChange={(e) => o.s(e.target.checked)}
          />
        </FormControl>
      ))}
    </Box>
  )
}

function IndexPopup() {
  return (
    <>
      <Header />
      <QuickSettings />
    </>
  )
}

export default App
