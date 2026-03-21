import {
  Center,
  VStack,
  Stack,
  Image,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";

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
        <HStack>
          <Box>icon a</Box>
          <Box>icon b</Box>
          <Box>icon c</Box>
        </HStack>
      </VStack>
    </Center>
  );
}
