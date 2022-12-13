import { Box, Button, Center, Heading, IconButton, Text } from "@chakra-ui/react"
import { MdPayment, MdSource } from "react-icons/md";
import PKG from "../../package.json" assert {type: "json"};
import Link from "./link";

export default function About() {
    return (
        <Box>
            <Heading fontSize={"3xl"} display="flex" justifyContent={"space-between"}>
                About
            </Heading>
            <Box>
                <Text fontSize={"md"}>
                    Version: {PKG.version}<br />
                    Author: <Link target="_blank" href="https://tricked.dev">Tricked</Link><br />
                    <Box py="2" display={"flex"} flexWrap="wrap" gap="1">
                        <a href="https://github.com/sponsors/tricked-dev" target="_blank">
                            <IconButton icon={<MdPayment />} aria-label={"Sponsor Developer"} />
                        </a>
                        <a href="https://github.com/tricked-dev/betternexus" target="_blank">
                            <IconButton icon={<MdSource />} aria-label={"Source"} />
                        </a>
                    </Box>
                </Text>
            </Box>
            <Link href="/">
                <Button>Back</Button>
            </Link>
        </Box>
    )
}
