import { Flex, Text, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const TeamStat = ({ label, value }) => {
  return (
    <Flex direction="column" maw="400px">
      <Flex direction="row" align="center">
        <IconInfoCircle stroke={2} />
        <Title order={3} pl="15px">
          {label}
        </Title>
      </Flex>
      <Text pl="40px">{value}</Text>
    </Flex>
  );
};

export default TeamStat;
