import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { Tag } from "~/components/ui/tag";
import type { SkillCategory } from "../types";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <VStack gap={4} align="stretch">
      <Text textStyle="2xl" fontWeight="bold">
        Skills
      </Text>
      <VStack gap={4} align="stretch">
        {skills.map((category) => (
          <Box
            key={category.category}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="border.muted"
            bg="bg.panel"
            p={6}
          >
            <VStack gap={3} align="stretch">
              <Text fontWeight="semibold" fontSize="lg">
                {category.category}
              </Text>
              <HStack gap={2} flexWrap="wrap">
                {category.skills.map((skill) => (
                  <Tag key={skill} size="md" variant="subtle">
                    {skill}
                  </Tag>
                ))}
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
