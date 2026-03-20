"use client"

import { Box, Flex, HStack, IconButton, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router"
import { LuMenu } from "react-icons/lu"
import { ColorModeButton } from "../ui/color-mode"
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseTrigger,
} from "../ui/drawer"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
]

const LOGO_TEXT = "Portfolio"

export const NAVBAR_HEIGHT = "7svh";

export function Navbar() {
  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="bg.subtle"
      borderBottom="1px solid"
      borderColor="border.subtle"
      px={{ base: 4, md: 8 }}
      h={NAVBAR_HEIGHT}
    >
      <Flex justify="space-between" align="center" maxW="6xl" mx="auto" h="full">
        {/* Logo */}
        <Link to="/">
          <HStack gap={2}>
            <Image
              src="/public/avatar.jpg"
              alt="avatar"
              boxSize="40px"
              borderRadius="full"
            />
            <Text fontWeight="bold" fontSize="lg" display={{ base: "none", sm: "block" }}>
              {LOGO_TEXT}
            </Text>
          </HStack>
        </Link>

        {/* Desktop Navigation */}
        <HStack gap={6} display={{ base: "none", md: "flex" }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <Text
                _hover={{ color: "fg.muted" }}
                transition="color 0.2s"
                fontWeight="medium"
              >
                {item.label}
              </Text>
            </Link>
          ))}
        </HStack>

        {/* Right Side: Theme Toggle & Mobile Menu */}
        <HStack gap={2}>
          <ColorModeButton />

          {/* Mobile Menu */}
          <Box display={{ base: "block", md: "none" }}>
            <DrawerRoot>
              <DrawerTrigger asChild>
                <IconButton variant="ghost" aria-label="Open menu" size="sm">
                  <LuMenu />
                </IconButton>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <HStack gap={2}>
                    <Image
                      src="https://via.placeholder.com/40"
                      alt="Logo"
                      boxSize="40px"
                      borderRadius="full"
                    />
                    <Text fontWeight="bold">{LOGO_TEXT}</Text>
                  </HStack>
                </DrawerHeader>
                <DrawerCloseTrigger />
                <DrawerBody>
                  <Flex flexDir="column" gap={4}>
                    {NAV_ITEMS.map((item) => (
                      <Link key={item.href} to={item.href}>
                        <Text
                          _hover={{ color: "fg.muted" }}
                          transition="color 0.2s"
                          fontWeight="medium"
                          fontSize="lg"
                        >
                          {item.label}
                        </Text>
                      </Link>
                    ))}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </DrawerRoot>
          </Box>
        </HStack>
      </Flex>
    </Box>
  )
}
