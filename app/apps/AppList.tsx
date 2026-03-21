import { Container, Text, VStack } from "@chakra-ui/react";
import { AppCard } from "./AppCard";
import type { App } from "./types";

interface AppListProps {
  apps: App[];
}

export function AppList({ apps }: AppListProps) {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={4} align="stretch">
        {apps.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </VStack>
    </Container>
  );
}
