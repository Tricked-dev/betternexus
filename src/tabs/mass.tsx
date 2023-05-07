import {
  Box,
  Button,
  Heading,
  Text,
  Textarea,
  type TextareaProps,
  useToast
} from "@chakra-ui/react"
import { forwardRef, useState } from "react"
import ResizeTextarea from "react-textarea-autosize"

import { ChakraBase } from "~ui"

/* https://github.com/chakra-ui/chakra-ui/issues/670 */
const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <Textarea
        minH="unset"
        overflow="hidden"
        w="100%"
        resize="none"
        ref={ref}
        minRows={6}
        as={ResizeTextarea}
        {...props}
      />
    )
  }
)

export default function MassDownloadTab() {
  const [data, setData] = useState("")
  const toast = useToast()
  return (
    <ChakraBase>
      <Box mx="auto" bg="orange.600" p="4" mb="2">
        <Box maxW="60rem" mx="auto">
          <Heading fontSize={"xl"}>Better Nexus</Heading>
        </Box>
      </Box>
      <Box
        maxW="30rem"
        mx="auto"
        display={"flex"}
        flexDir={"column"}
        justifyContent="center"
        gap="2">
        <Heading textAlign={"center"}>Mass Download</Heading>
        <ul>
          <Text as="li" fontSize={"sm"}>
            Enable the Quick Download feature to automatically download the mod
            after waiting 5 seconds
          </Text>
          <Text as="li" fontSize={"sm"}>
            Enable the Super Quick Download feature to instantly download the
            mod
          </Text>
        </ul>
        <AutoResizeTextarea
          onChange={(e) => setData(e.target.value)}
          value={data}
          placeholder="Insert nexus mod links split by newlines."
          resize="vertical"
        />
        <Button
          onClick={() => {
            try {
              const links = data.split("\n").map((x) => new URL(x.trim()))
              for (const link of links) {
                link.searchParams.set("fast", "true")
                chrome.tabs.create({ url: link.toString() })
              }
            } catch (e) {
              toast({
                title: `${e}`,
                position: "top",
                status: "error",
                isClosable: true
              })
            }
          }}>
          Download
        </Button>
      </Box>
    </ChakraBase>
  )
}
