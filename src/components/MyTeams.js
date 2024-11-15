import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import TeamCard from "./TeamCard";

const MyTeams = () => {
  return (
    <>
      <Flex direction="column">
        <Center mt="100px">
          <Stack align="center">
            <Title order={1} fz="60px">
              My Teams
            </Title>
            <Title order={2} fz="35px" fw="300" c="grey">
              Start tpying your team name...
            </Title>
            <Flex direction="row">
              <Input placeholder="Real Madrid" mr="20px"></Input>
              <Button color="black">Add</Button>
            </Flex>
          </Stack>
        </Center>
      </Flex>

      <Flex
        direction="column"
        bg="#f2f2f2"
        my="100px"
        py="30px"
        align="center"
        mx="150px"
      >
        <TeamCard teamId={"1"} />
        <TeamCard teamId={"2"} />
        <TeamCard teamId={"3"} />
      </Flex>
    </>
  );
};

export default MyTeams;
