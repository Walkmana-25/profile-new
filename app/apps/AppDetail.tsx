import { Container, Text, VStack, HStack, Image, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import { Prose } from "~/components/ui/prose";
import { Tag } from "~/components/ui/tag";
import type { App } from "./types";

interface AppDetailProps {
  app: App;
}

export function AppDetail({ app }: AppDetailProps) {
  const imageSrc = app.image || "/no-image.webp";

  return (
    <Container maxW="container.lg" py={8}>
      <VStack gap={6} align="stretch">
        <Link to="/apps">
          <Text color="fg.muted" _hover={{ color: "fg" }}>
            ← Back to Apps
          </Text>
        </Link>

        <Image
          src={imageSrc}
          alt={app.title}
          w="100%"
          h="auto"
          maxH="400px"
          objectFit="cover"
          borderRadius="lg"
        />

        <VStack gap={4} align="start">
          <Text fontSize="3xl" fontWeight="bold">
            {app.title}
          </Text>

          <Text color="fg.muted" fontSize="lg">
            {app.description}
          </Text>

          {app.tags.length > 0 && (
            <HStack gap={2} flexWrap="wrap">
              {app.tags.map((tag) => (
                <Tag key={tag} size="sm" variant="subtle">
                  {tag}
                </Tag>
              ))}
            </HStack>
          )}

          <Prose>
            <ReactMarkdown>{app.content}</ReactMarkdown>
          </Prose>

          {app.links && app.links.length > 0 && (
            <VStack align="start" gap={2}>
              <Text fontWeight="bold">Links</Text>
              {app.links.map((link) => (
                <ChakraLink
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.500"
                >
                  {link.label}
                </ChakraLink>
              ))}
            </VStack>
          )}
        </VStack>
      </VStack>
    </Container>
  );
}
