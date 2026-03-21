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
import { SiZenn, SiSpeakerdeck } from "react-icons/si";

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
          <Link
            href="https://github.com/Walkmana-25"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon as={FaGithub} boxSize={8} />
          </Link>
          <Link
            href="https://x.com/walkmana_25"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon as={FaXTwitter} boxSize={8} />
          </Link>
          <Link
            href="https://zenn.dev/walkmana_25"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon as={SiZenn} boxSize={8} />
          </Link>
          <Link
            href="https://speakerdeck.com/walkmana25"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon as={SiSpeakerdeck} boxSize={8} />
          </Link>
        </HStack>
      </VStack>
    </Center>
  );
}
