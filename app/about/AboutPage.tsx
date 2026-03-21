import { Container, VStack } from "@chakra-ui/react";
import { BasicInfoCard } from "./components/BasicInfoCard";
import { BioSection } from "./components/BioSection";
import { SkillsSection } from "./components/SkillsSection";
import { InterestsSection } from "./components/InterestsSection";
import { SocialLinks } from "./components/SocialLinks";
import { profileData } from "./data";

export function AboutPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={12} align="stretch">
        <BasicInfoCard profile={profileData} />
        <BioSection bio={profileData.bio} />
        <SkillsSection skills={profileData.skills} />
        <InterestsSection interests={profileData.interests} />
        <SocialLinks links={profileData.socialLinks} />
      </VStack>
    </Container>
  );
}
