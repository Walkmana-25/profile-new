import { Box, VStack, HStack, Text, Image } from "@chakra-ui/react";
import type { Profile } from "../types";

interface BasicInfoCardProps {
  profile: Profile;
}

export function BasicInfoCard({ profile }: BasicInfoCardProps) {
  return (
    <Box
      borderRadius="lg"
      borderWidth="1px"
      borderColor="border.muted"
      bg="bg.panel"
      p={8}
      _hover={{ borderColor: "border.emphasized" }}
      transition="all 0.2s"
    >
      <HStack gap={8} align="start">
        <Image
          src={profile.avatar}
          alt={profile.name}
          borderRadius="full"
          boxSize="200px"
          objectFit="cover"
        />
        <VStack align="start" gap={4} flex="1">
          <Text textStyle="4xl" fontWeight="bold">
            {profile.name}
          </Text>
          <VStack align="start" gap={3}>
            {profile.affiliations.map((affiliation, index) => (
              <VStack align="start" gap={0} key={index}>
                {affiliation.highlighted && (
                  <Text textStyle="2xl" fontWeight="medium">
                    {affiliation.organization}
                  </Text>
                )}
                {!affiliation.highlighted && (
                  <Text textStyle="xl" fontWeight="medium">
                    {affiliation.organization}
                  </Text>
                )}
                {affiliation.department && (
                  <Text textStyle="lg">{affiliation.department}</Text>
                )}
                {affiliation.role && (
                  <Text color="fg.muted">{affiliation.role}</Text>
                )}
                {affiliation.period && (
                  <Text textStyle="sm" color="fg.muted">
                    {affiliation.period}
                  </Text>
                )}
              </VStack>
            ))}
          </VStack>
        </VStack>
      </HStack>
    </Box>
  );
}
