import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Switch,
  Tooltip
} from "@chakra-ui/react"
import { useEffect } from "react"
import { MdHelp } from "react-icons/md"

import { useStorage } from "@plasmohq/storage/hook"

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

export default function QuickSettings() {
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
    <Box>
      {options.map((o) => (
        <FormControl display="flex" alignItems="center" key={o.key}>
          <FormLabel htmlFor={o.key} mb="0" mr="auto">
            <Popover placement="bottom" closeOnBlur={true} isLazy={true}>
              <PopoverTrigger>
                <IconButton
                  mr="0.5em"
                  bg="transparent"
                  size="1em"
                  icon={<MdHelp />}
                  aria-label={""}
                />
              </PopoverTrigger>
              <PopoverContent maxW={"90%"}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody fontSize={"sm"}>{o.tooltip}</PopoverBody>
              </PopoverContent>
            </Popover>
            {o.label}
          </FormLabel>
          <Switch
            id={o.key}
            isChecked={o.v}
            colorScheme="orange"
            onChange={(e) => o.s(e.target.checked)}
          />
        </FormControl>
      ))}
    </Box>
  )
}
