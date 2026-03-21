import { Center, Text } from "@chakra-ui/react";

export function underConstruction(name: string) {
  return (
    <Center h="100%">
      <Text fontSize={"4xl"}>{name} is Under Construction</Text>
    </Center>
  );
}
