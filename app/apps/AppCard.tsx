import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router";
import type { App } from "./types";
import { Tag } from "~/components/ui/tag";

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  const imageSrc = app.image || "/no-image.webp";

  return (
    <Link to={`/apps/${app.slug}`}>
      <Box
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.muted"
        bg="bg.panel"
        overflow="hidden"
        _hover={{ borderColor: "border.emphasized", transform: "translateY(-2px)" }}
        transition="all 0.2s"
        cursor="pointer"
      >
        <HStack gap={0} align="stretch">
          <VStack align="start" gap={2} p={4} flex="1">
            <Text fontSize="lg" fontWeight="bold" lineClamp={1}>
              {app.title}
            </Text>

            <Text color="fg.muted" lineClamp={2} fontSize="sm">
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
          </VStack>

          <Image
            src={imageSrc}
            alt={app.title}
            w="200px"
            h="auto"
            minH="150px"
            objectFit="cover"
          />
        </HStack>
      </Box>
    </Link>
  );
}
