import { Container, Text, VStack, HStack, Image, Link as ChakraLink, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import { Prose } from "~/components/ui/prose";
import { Tag } from "~/components/ui/tag";
import type { Project } from "./types";
import { formatDateRange } from "./utils";

interface ProjectDetailProps {
  project: Project;
}

// カスタムimgコンポーネント：ダーク/ライトモードに応じて画像を切り替え
function MarkdownImage({ src, alt }: { src?: string; alt?: string }) {
  const { colorMode } = useColorMode();

  if (!src) return null;

  // 画像パスに応じてダーク/ライトモード用の画像に切り替え
  let imageSrc = src;
  if (colorMode === "dark") {
    // 一般的なパターン: _light, _Light, -light, -Light を _dark, _Dark, -dark, -Dark に置換
    imageSrc = src.replace(/[_-][Ll]ight(\.(svg|png|jpg|jpeg|webp))$/, "_dark$1");
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}
    />
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { colorMode } = useColorMode();

  // ヒーロー画像：ダーク/ライトモードに応じて切り替え
  let heroImageSrc = project.image || "/no-image.webp";
  if (colorMode === "dark" && project.imageDark) {
    heroImageSrc = project.imageDark;
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack gap={6} align="stretch">
        <Link to="/projects">
          <Text color="fg.muted" _hover={{ color: "fg" }}>
            ← Back to Projects
          </Text>
        </Link>

        <Image
          src={heroImageSrc}
          alt={project.title}
          w="100%"
          h="auto"
          maxH="400px"
          objectFit="contain"
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
            <ReactMarkdown
              components={{
                img: MarkdownImage,
              }}
            >
              {project.content}
            </ReactMarkdown>
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
