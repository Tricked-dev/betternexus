import { Box, useColorModeValue, Text } from "@chakra-ui/react"
import PKG from "../../package.json" assert {type: "json"};

export default function Layout({ children, Header = undefined }) {
  const color = useColorModeValue("gray.300", "gray.600")
  return (
    <>
      {Header && (
        <Box bg={color} px="4" py="4">
          {Header}
        </Box>
      )}
      <Box px="4" pb="4" pt="2">
        {children}
        <Text pt="1" fontSize={"xs"}>
          {PKG.name} {PKG.version}
        </Text>
      </Box>

    </>
  )
}
