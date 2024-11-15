import { Flex, Text, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const TeamStat = () => {
  return (
    <Flex direction="column" maw="400px">
      <Flex direction="row" align="center">
        <IconInfoCircle stroke={2} />
        <Title order={3} pl="15px">
          Stat
        </Title>
      </Flex>
      <Text pl="40px">
        Body text for whatever you’d like to say. Add main takeaway points,
        quotes, anecdotes, or even a very very short story.
      </Text>
    </Flex>
  );
};

export default TeamStat;
