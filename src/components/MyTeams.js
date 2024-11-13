import {
  Button,
  Center,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import placeHolder from "../images/placeholder.jpg";
import TeamStat from "./TeamStat";

const MyTeams = () => {
  return (
    <Flex direction="column">
      <Center mt="100px">
        <Title order={1} fz="60px">
          Real Madrid
        </Title>
      </Center>

      <Center mt="60px">
        <Button color="gray" mx="8px">
          View My Teams
        </Button>
        <Button color="black" mx="8px">
          Add Teams
        </Button>
      </Center>

      <Stack px="50px">
        <Group display="block">
          <Title order={1}>News</Title>
          <Text>Last updated: 2024/01/01</Text>
          <Flex direction="row" justify="center" gap="70px" mt="100px">
            <Image src={placeHolder} w="500px" h="350px"></Image>
            <Image src={placeHolder} w="500px" h="350px"></Image>
          </Flex>
        </Group>

        <Group display="block" mt="100px">
          <Title order={3}>Statistics</Title>
          <Text>Last updated: 2024/01/01</Text>
        </Group>

        <SimpleGrid cols={3} verticalSpacing="55px" my="30px">
          <TeamStat />
          <TeamStat />
          <TeamStat />
          <TeamStat />
          <TeamStat />
          <TeamStat />
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

export default MyTeams;
