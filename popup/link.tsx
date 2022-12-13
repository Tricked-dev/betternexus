import {
  Link as ChakraLink,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { MdSettings } from "react-icons/md"
import {
  Link as WouterLink
} from "wouter"



export default function Link({ href, children, ...props }) {
  const as =
    href.startsWith("http") || props.target == "_blank" ? undefined : WouterLink
  return (
    <ChakraLink href={href} {...props} as={as}>
      {children}
    </ChakraLink>
  )
}
