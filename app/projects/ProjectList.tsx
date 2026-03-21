import { Container, Text, VStack } from "@chakra-ui/react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "./types";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const pinnedProjects = projects.filter((p) => p.pinned);
  const timelineProjects = projects.filter((p) => !p.pinned);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={12} align="stretch">
        {pinnedProjects.length > 0 && (
          <VStack gap={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              PINNED
            </Text>
            <VStack gap={4} align="stretch">
              {pinnedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </VStack>
          </VStack>
        )}

        {timelineProjects.length > 0 && (
          <VStack gap={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              TIMELINE
            </Text>
            <VStack gap={4} align="stretch">
              {timelineProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </VStack>
          </VStack>
        )}
      </VStack>
    </Container>
  );
}
