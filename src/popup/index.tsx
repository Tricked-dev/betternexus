import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Switch,
  Text,
  useColorMode
} from "@chakra-ui/react"
import { MdSettings } from "@react-icons/all-files/md/MdSettings"
import { Route, Router, Switch as RouterSwitch } from "wouter"

import { ChakraBase } from "~ui"

import About from "./about"
import Layout from "./layout"
import Link from "./link"
import QuickSettings from "./quickSettings"

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
              <Layout>
                <Settings />
              </Layout>
            </Route>
            <Route path="/about">
              <Layout>
                <About />
              </Layout>
            </Route>
            <Route>
              <Layout Header={<Header />}>
                <QuickSettings />
              </Layout>
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
    <Box>
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
    <>
      <Heading fontSize={"3xl"} display="flex" justifyContent={"space-between"}>
        <Link href="/about">Better Nexus </Link>
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
    </>
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

export default App
