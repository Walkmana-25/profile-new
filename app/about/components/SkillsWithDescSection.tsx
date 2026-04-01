import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { Tag } from "~/components/ui/tag";
import type { SkillCategory } from "../types";

interface SkillsWithDescSectionProps {
  skills: SkillCategory[];
}

export function SkillsWithDescSection({
  skills,
}: SkillsWithDescSectionProps) {
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
            <VStack gap={4} align="stretch">
              <Text fontWeight="semibold" fontSize="lg">
                {category.category}
              </Text>
              <VStack gap={3} align="stretch">
                {category.skills.map((skill) => (
                  <Box key={skill.name}>
                    <Text fontWeight="medium" fontSize="md">
                      {skill.name}
                    </Text>
                    <HStack gap={2} flexWrap="wrap" mt={2}>
                      {skill.technologies.map((tech) => (
                        <Tag key={tech} size="sm" variant="subtle">
                          {tech}
                        </Tag>
                      ))}
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
