import { Box, VStack, Text } from "@chakra-ui/react";

interface BioSectionProps {
  bio: string;
}

export function BioSection({ bio }: BioSectionProps) {
  return (
    <VStack gap={4} align="stretch">
      <Text textStyle="2xl" fontWeight="bold">
        About Me
      </Text>
      <Box
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.muted"
        bg="bg.panel"
        p={6}
      >
        <Text textStyle="lg" lineHeight="relaxed">
          {bio}
        </Text>
      </Box>
    </VStack>
  );
}
