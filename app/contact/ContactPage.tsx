import {
  Box,
  Container,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaEnvelope, FaXTwitter } from "react-icons/fa6";
import { contactData } from "./data";
import type { ContactMethod } from "./types";

const iconMap = {
  email: FaEnvelope,
  twitter: FaXTwitter,
} as const;

interface ContactCardProps {
  contact: ContactMethod;
}

function ContactCard({ contact }: ContactCardProps) {
  const IconComponent = iconMap[contact.icon];
  const isEmail = contact.type === "email";

  return (
    <Link
      href={contact.url}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      display="block"
      w="100%"
    >
      <Box
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.muted"
        bg="bg.panel"
        p={6}
        transition="all 0.2s"
        _hover={{
          borderColor: "accent.fg",
          shadow: "md",
        }}
        w="100%"
        h="100%"
      >
        <HStack gap={4}>
          <Icon as={IconComponent} boxSize={6} color="accent.fg" />
          <Stack gap={1}>
            <Text textStyle="sm" color="fg.muted">
              {contact.platform}
            </Text>
            <Text textStyle="lg" fontWeight="medium">
              {contact.value}
            </Text>
          </Stack>
        </HStack>
      </Box>
    </Link>
  );
}

export function ContactPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <Text textStyle="2xl" fontWeight="bold">
          Contact
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {contactData.map((contact) => (
            <ContactCard key={contact.platform} contact={contact} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
