import { Container, Text, VStack } from "@chakra-ui/react";
import { AppCard } from "./AppCard";
import type { App } from "./types";

interface AppListProps {
  apps: App[];
}

export function AppList({ apps }: AppListProps) {
  const pinnedApps = apps.filter((a) => a.pinned);
  const otherApps = apps.filter((a) => !a.pinned);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={12} align="stretch">
        {pinnedApps.length > 0 && (
          <VStack gap={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              PINNED
            </Text>
            <VStack gap={4} align="stretch">
              {pinnedApps.map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
            </VStack>
          </VStack>
        )}

        {otherApps.length > 0 && (
          <VStack gap={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              ALL APPS
            </Text>
            <VStack gap={4} align="stretch">
              {otherApps.map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
            </VStack>
          </VStack>
        )}
      </VStack>
    </Container>
  );
}
