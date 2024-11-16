import { Flex, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const TeamCard = ({ teamId }) => {
  return (
    <Link
      to={`team/${teamId}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Flex
        direction="row"
        mx="50px"
        my="10px"
        px="30px"
        bg="white"
        w="350px"
        justify="center"
        style={{ borderRadius: "10px" }}
      >
        <Title order={3} my={"20px"}>
          Real Madrid
        </Title>
      </Flex>
    </Link>
  );
};

export default TeamCard;
