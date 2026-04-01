import { Container, Text, VStack } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "./types";
import {
  TimelineRoot,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
} from "~/components/ui/timeline";
import { ProjectSearch } from "./ProjectSearch";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projects;
    }

    const query = searchQuery.toLowerCase();
    return projects.filter((project) => {
      const titleMatch = project.title.toLowerCase().includes(query);
      const descriptionMatch = project.description.toLowerCase().includes(query);
      const tagMatch = project.tags.some((tag) => tag.toLowerCase().includes(query));

      return titleMatch || descriptionMatch || tagMatch;
    });
  }, [projects, searchQuery]);

  const pinnedProjects = filteredProjects.filter((p) => p.pinned);
  const timelineProjects = filteredProjects.filter((p) => !p.pinned);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <ProjectSearch onSearchChange={setSearchQuery} value={searchQuery} />

        {filteredProjects.length === 0 ? (
          <Text textAlign="center" color="gray.500" py={8}>
            No projects found matching "{searchQuery}"
          </Text>
        ) : (
          <VStack gap={12} align="stretch">
        {pinnedProjects.length > 0 && (
          <VStack gap={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              PINNED
            </Text>
            <VStack gap={4} align="stretch">
              {pinnedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} isPinned />
              ))}
            </VStack>
          </VStack>
        )}

        {timelineProjects.length > 0 && (
          <VStack gap={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              TIMELINE
            </Text>
            <TimelineRoot>
              {timelineProjects.map((project) => (
                <TimelineItem key={project.slug}>
                  <TimelineConnector />
                  <TimelineContent>
                    <ProjectCard project={project} isPinned={false} />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </TimelineRoot>
          </VStack>
        )}
          </VStack>
        )}
      </VStack>
    </Container>
  );
}
