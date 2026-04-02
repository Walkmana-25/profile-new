import { Box, Text, VStack, HStack, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router";
import { LuPin } from "react-icons/lu";
import type { Project } from "./types";
import { formatDateRange } from "./utils";
import { Tag } from "~/components/ui/tag";
import { useColorMode } from "~/components/ui/color-mode";

interface ProjectCardProps {
  project: Project;
  isPinned?: boolean;
}

export function ProjectCard({ project, isPinned }: ProjectCardProps) {
  const { colorMode } = useColorMode();
  const imageSrc = colorMode === "dark" && project.imageDark
    ? project.imageDark
    : (project.image || "/no-image.webp");

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
        <Flex
          direction={{ base: "column", md: "row" }}
          align="stretch"
          overflow="hidden"
        >
          <Box
            w={{ base: "100%", md: "200px" }}
            h={{ base: "200px", md: "auto" }}
            minH={{ base: "200px", md: "150px" }}
            flexShrink={0}
            overflow="hidden"
          >
            <Image
              src={imageSrc}
              alt={project.title}
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>

          <VStack align="start" gap={2} p={4} flex="1">
            <Text fontSize="sm" color="fg.muted">
              {formatDateRange(project.startDate, project.endDate)}
            </Text>

            <HStack gap={2}>
              <Text fontSize="lg" fontWeight="bold" lineClamp={1}>
                {project.title}
              </Text>
              {isPinned && <LuPin />}
            </HStack>

            <Text color="fg.muted" lineClamp={2} fontSize="sm">
              {project.description}
            </Text>

            {project.tags.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
                {project.tags.map((tag) => (
                  <Tag key={tag} size="sm" variant="subtle">
                    {tag}
                  </Tag>
                ))}
              </HStack>
            )}
          </VStack>
        </Flex>
      </Box>
    </Link>
  );
}
