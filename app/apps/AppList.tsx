import { Container, Text, VStack } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { AppCard } from "./AppCard";
import type { App } from "./types";
import { AppSearch } from "./AppSearch";

interface AppListProps {
  apps: App[];
}

export function AppList({ apps }: AppListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) {
      return apps;
    }

    const query = searchQuery.toLowerCase();
    return apps.filter((app) => {
      const titleMatch = app.title.toLowerCase().includes(query);
      const descriptionMatch = app.description.toLowerCase().includes(query);
      const tagMatch = app.tags.some((tag) => tag.toLowerCase().includes(query));

      return titleMatch || descriptionMatch || tagMatch;
    });
  }, [apps, searchQuery]);

  const pinnedApps = filteredApps.filter((a) => a.pinned);
  const otherApps = filteredApps.filter((a) => !a.pinned);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <AppSearch onSearchChange={setSearchQuery} value={searchQuery} />

        {filteredApps.length === 0 ? (
          <Text textAlign="center" color="gray.500" py={8}>
            No apps found matching "{searchQuery}"
          </Text>
        ) : (
          <VStack gap={12} align="stretch">
        {pinnedApps.length > 0 && (
          <VStack gap={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              PINNED
            </Text>
            <VStack gap={4} align="stretch">
              {pinnedApps.map((app) => (
                <AppCard key={app.slug} app={app} isPinned />
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
        )}
      </VStack>
    </Container>
  );
}
