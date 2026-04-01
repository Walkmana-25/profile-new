import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  Link,
  Image,
} from "@chakra-ui/react";
import type { MediaItem } from "../types";

interface MediaSectionProps {
  items: MediaItem[];
}

export function MediaSection({ items }: MediaSectionProps) {
  return (
    <VStack gap={4} align="stretch">
      <Text textStyle="2xl" fontWeight="bold">
        Media
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        {items.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: "none" }}
          >
            <Box
              borderRadius="lg"
              borderWidth="1px"
              borderColor="border.muted"
              bg="bg.panel"
              p={6}
              h="full"
              display="flex"
              flexDirection="column"
              _hover={{
                borderColor: "border.emphasized",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s"
            >
              <VStack gap={3} align="stretch" flex={1}>
                <Image
                  src={item.ogImage && item.ogImage.trim() ? item.ogImage : "/no-image.webp"}
                  alt={item.title}
                  h="200px"
                  w="full"
                  objectFit="cover"
                  borderRadius="md"
                  bg="bg.muted"
                />
                <VStack gap={2} align="stretch" flex={1}>
                  <Text fontWeight="semibold" fontSize="md">
                    {item.title}
                  </Text>
                  <Text color="fg.muted" fontSize="sm" lineClamp={3}>
                    {item.description}
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
