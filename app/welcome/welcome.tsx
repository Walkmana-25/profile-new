import {
  Button,
  Center,
  VStack,
  Flex,
  Box,
  Text,
  Link,
  Stack,
  Image
} from "@chakra-ui/react";

export function Welcome() {

  return (
    <Center h='svh' w='svw'>
      <Stack>
        <Image
          src="/public/avatar.jpg"
          alt="avatar"
          borderRadius="full"
        />

      </Stack>
    </Center>
  );
}
