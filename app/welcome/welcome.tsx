import { Center, VStack, Stack, Image } from "@chakra-ui/react";

export function Welcome() {
  return (
    <Center h="100%" w="svw">
      <VStack>
        <Stack>
          <Image src="/public/avatar.jpg" alt="avatar" borderRadius="full" />
        </Stack>
      </VStack>
    </Center>
  );
}
