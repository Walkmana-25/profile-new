import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { Tag } from "~/components/ui/tag";

interface InterestsSectionProps {
  interests: string[];
}

export function InterestsSection({ interests }: InterestsSectionProps) {
  return (
    <VStack gap={4} align="stretch">
      <Text textStyle="2xl" fontWeight="bold">
        Interests
      </Text>
      <Box
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.muted"
        bg="bg.panel"
        p={6}
      >
        <HStack gap={2} flexWrap="wrap">
          {interests.map((interest) => (
            <Tag key={interest} size="md" variant="outline">
              {interest}
            </Tag>
          ))}
        </HStack>
      </Box>
    </VStack>
  );
}
