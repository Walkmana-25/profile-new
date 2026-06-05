import { Container, VStack } from "@chakra-ui/react";
import { MediaSection } from "./MediaSection";
import { mediaItems } from "./data";

export function MediaPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={12} align="stretch">
        <MediaSection items={mediaItems} />
      </VStack>
    </Container>
  );
}
