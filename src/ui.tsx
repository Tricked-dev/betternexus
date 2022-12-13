import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme
} from "@chakra-ui/react"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
}

const theme = extendTheme({ config })

export function ChakraBase({ children }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  )
}
