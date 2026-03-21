import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router";
import type { Project } from "./types";
import { formatDateRange } from "./utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageSrc = project.image || "/no-image.webp";

  return (
    <Link to={`/projects/${project.slug}`}>
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
            <Text fontSize="sm" color="fg.muted">
              {formatDateRange(project.startDate, project.endDate)}
            </Text>

            <Text fontSize="lg" fontWeight="bold" lineClamp={1}>
              {project.title}
            </Text>

            <Text color="fg.muted" lineClamp={2} fontSize="sm">
              {project.description}
            </Text>
          </VStack>

          <Image
            src={imageSrc}
            alt={project.title}
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
