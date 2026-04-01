import {
  Center,
  VStack,
  Stack,
  Image,
  HStack,
  Text,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { SiZenn, SiSpeakerdeck } from "react-icons/si";
import { profileData } from "../about/data";

const iconMap = {
  github: FaGithub,
  twitter: FaXTwitter,
  zenn: SiZenn,
  speakerdeck: SiSpeakerdeck,
  email: HiOutlineMail,
} as const;

export function Welcome() {
  return (
    <Center h="100%" w="svw">
      <VStack gap={50}>
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={50}
        >
          <Image
            src="/public/avatar.jpg"
            alt="avatar"
            borderRadius="full"
            height={200}
            width={200}
          />
          <VStack>
            <Text textStyle={"5xl"} fontWeight={"bold"}>
              Yuta Takahashi
            </Text>
            <Text textStyle={"2xl"} fontWeight={"medium"}>
              INIAD -Toyo University-
            </Text>
            <Text textStyle={"lg"}>東洋大学 情報連携学部 情報連携学科</Text>
            <Text textStyle={"lg"}>
              2025年度 未踏IT人材発掘・育成事業 クリエーター
            </Text>
          </VStack>
        </Stack>
        <HStack gap={8}>
          {profileData.socialLinks.map((link) => {
            const IconComponent = iconMap[link.icon];
            return (
              <Link
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon as={IconComponent} boxSize={8} />
              </Link>
            );
          })}
        </HStack>
      </VStack>
    </Center>
  );
}
