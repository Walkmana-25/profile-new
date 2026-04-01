import { Container, VStack } from "@chakra-ui/react";
import { BasicInfoCard } from "./components/BasicInfoCard";
import { SkillsWithDescSection } from "./components/SkillsWithDescSection";
import { InterestsSection } from "./components/InterestsSection";
import { MediaSection } from "./components/MediaSection";
import { SocialLinks } from "./components/SocialLinks";
import { profileData } from "./data";

export function AboutPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={12} align="stretch">
        <BasicInfoCard profile={profileData} />
        <SkillsWithDescSection skills={profileData.skills} />
        <InterestsSection interests={profileData.interests} />
        <MediaSection items={profileData.media} />
        <SocialLinks links={profileData.socialLinks} />
      </VStack>
    </Container>
  );
}
