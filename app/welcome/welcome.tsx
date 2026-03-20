import { Center, VStack, Stack, Image, HStack, Box } from "@chakra-ui/react";

export function Welcome() {
  return (
    <Center h="100%" w="svw">
      <VStack>
        <Stack direction={{ base: "column", md: "row" }} align="center">
          <Image src="/public/avatar.jpg" alt="avatar" borderRadius="full" />
          <VStack>
            <Box>name</Box>
            <Box>name</Box>
            <Box>name</Box>
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
