import { Container, Text, VStack, HStack, Image, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import { Prose } from "~/components/ui/prose";
import { Tag } from "~/components/ui/tag";
import type { Project } from "./types";
import { formatDateRange } from "./utils";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const imageSrc = project.image || "/no-image.webp";

  return (
    <Container maxW="container.lg" py={8}>
      <VStack gap={6} align="stretch">
        <Link to="/projects">
          <Text color="fg.muted" _hover={{ color: "fg" }}>
            ← Back to Projects
          </Text>
        </Link>

        <Image
          src={imageSrc}
          alt={project.title}
          w="100%"
          h="auto"
          maxH="400px"
          objectFit="cover"
          borderRadius="lg"
        />

        <VStack gap={4} align="start">
          <Text fontSize="sm" color="fg.muted">
            {formatDateRange(project.startDate, project.endDate)}
          </Text>

          <Text fontSize="3xl" fontWeight="bold">
            {project.title}
          </Text>

          <Text color="fg.muted" fontSize="lg">
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

          <Prose>
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </Prose>

          {project.links && project.links.length > 0 && (
            <VStack align="start" gap={2}>
              <Text fontWeight="bold">Links</Text>
              {project.links.map((link) => (
                <ChakraLink
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.500"
                >
                  {link.label}
                </ChakraLink>
              ))}
            </VStack>
          )}
        </VStack>
      </VStack>
    </Container>
  );
}
