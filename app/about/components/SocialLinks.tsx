import {
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { SiZenn, SiSpeakerdeck } from "react-icons/si";
import type { SocialLink } from "../types";

const iconMap = {
  github: FaGithub,
  twitter: FaXTwitter,
  zenn: SiZenn,
  speakerdeck: SiSpeakerdeck,
} as const;

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <VStack gap={4} align="stretch">
      <Text textStyle="2xl" fontWeight="bold">
        Connect
      </Text>
      <Box
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.muted"
        bg="bg.panel"
        p={6}
      >
        <HStack gap={6}>
          {links.map((link) => {
            const IconComponent = iconMap[link.icon];
            return (
              <Link
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
              >
                <Icon as={IconComponent} boxSize={8} />
              </Link>
            );
          })}
        </HStack>
      </Box>
    </VStack>
  );
}
