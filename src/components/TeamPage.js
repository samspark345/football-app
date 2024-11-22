import {
  Center,
  Flex,
  Group,
  Image,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../api/api";
import TeamStat from "./TeamStat";

const TeamPage = () => {
  const { teamId } = useParams();

  const [teamInfo, setTeamInfo] = useState(null);
  const [teamStats, setTeamStats] = useState(null);
  const [lastMatch, setLastMatch] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [topScorer, setTopScorer] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leagueOptions, setLeagueOptions] = useState([]);
  const [leagueName, setLeagueName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mostYellowCards, setMostYellowCards] = useState(null);
  const [mostRedCards, setMostRedCards] = useState(null);

  useEffect(() => {
    if (!teamId) return;

    const fetchTeamData = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiService = new ApiService();

        // Fetch team name and logo
        const teamResponse = await apiService.retrieveTeamInfoById(teamId);

        if (teamResponse.response && teamResponse.response.length > 0) {
          const teamData = teamResponse.response[0];
          setTeamInfo({
            name: teamData.team.name,
            logo: teamData.team.logo,
          });
        }

        // Fetch leagues and seasons
        const leagueResponse = await apiService.retrieveLeaguesByTeamId(teamId);
        const uniqueSeasons = Array.from(
          new Set(
            leagueResponse.response.flatMap((league) =>
              league.seasons.map((season) => season.year)
            )
          )
        ).sort((a, b) => b - a);

        setSeasons(
          uniqueSeasons.map((year) => ({
            value: year.toString(),
            label: `${year}/${year + 1}`,
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to fetch team data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  useEffect(() => {
    if (!teamId || !selectedSeason) return;

    const fetchStatsAndLastMatch = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiService = new ApiService();

        // Fetch leagues for the selected season
        const leagueResponse = await apiService.retrieveLeaguesByTeamId(teamId);
        const leaguesForSeason = leagueResponse.response.filter((league) =>
          league.seasons.some(
            (season) => season.year.toString() === selectedSeason
          )
        );

        if (leaguesForSeason.length > 0) {
          setLeagueOptions(
            leaguesForSeason.map((league) => ({
              value: league.league.id.toString(),
              label: league.league.name,
            }))
          );
          setSelectedLeague(leaguesForSeason[0].league.id.toString());
          setLeagueName(leaguesForSeason[0].league.name);
        } else {
          setError("No leagues found for the selected season.");
          setTeamStats(null);
          return;
        }

        const statsResponse = await apiService.retrieveTeamStatsByLeague(
          leaguesForSeason[0].league.id,
          teamId,
          selectedSeason
        );
        setTeamStats(statsResponse.response);

        const fixturesResponse = await apiService.retrieveTeamFixtures(
          teamId,
          selectedSeason
        );
        const finishedMatches = fixturesResponse.response.filter(
          (match) => match.fixture.status.long === "Match Finished"
        );

        if (finishedMatches.length > 0) {
          const lastPlayedMatch = finishedMatches.sort(
            (a, b) => new Date(b.fixture.date) - new Date(a.fixture.date)
          )[0];

          setLastMatch({
            opponent:
              lastPlayedMatch.teams.home.id === teamId
                ? lastPlayedMatch.teams.away.name
                : lastPlayedMatch.teams.home.name,
            score:
              lastPlayedMatch.goals.home + " - " + lastPlayedMatch.goals.away,
            date: new Date(lastPlayedMatch.fixture.date).toLocaleDateString(),
          });
        } else {
          setLastMatch(null);
        }

        // Fetch top scorer
        const topScorerData = await apiService.retrieveTopScorer(
          teamId,
          selectedSeason
        );
        setTopScorer(topScorerData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch team stats. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatsAndLastMatch();
  }, [teamId, selectedSeason]);

  useEffect(() => {
    if (!teamId || !selectedSeason || !selectedLeague) return;

    const fetchStatsAndLastMatchForLeague = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiService = new ApiService();

        // Fetch stats for the team in the selected league
        const statsResponse = await apiService.retrieveTeamStatsByLeague(
          selectedLeague,
          teamId,
          selectedSeason
        );
        setTeamStats(statsResponse.response);

        const selectedLeagueData = leagueOptions.find(
          (league) => league.value === selectedLeague
        );
        if (selectedLeagueData) {
          setLeagueName(selectedLeagueData.label);
        }
      } catch (err) {
        console.error(err);
        setError(
          "Failed to fetch stats for the selected league. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStatsAndLastMatchForLeague();
  }, [teamId, selectedSeason, selectedLeague, leagueOptions]);

  if (loading) {
    return (
      <Center mt="100px">
        <Text>Loading...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt="100px">
        <Text c="red">{error}</Text>
      </Center>
    );
  }

  return (
    <Flex direction="column">
      {/* Team Name and Logo */}
      {teamInfo && (
        <Center mt="50px">
          <Group>
            <Image
              src={teamInfo.logo}
              alt={teamInfo.name}
              width={100}
              height={100}
            />
            <Stack spacing="sm">
              <Title order={1}>{teamInfo.name}</Title>
              {leagueName && <Text size="sm">League: {leagueName}</Text>}
            </Stack>
          </Group>
        </Center>
      )}

      {/* Season Dropdown */}
      <Center mt="40px">
        <Select
          label="Select Season"
          placeholder="Choose a season"
          value={selectedSeason}
          onChange={(value) => {
            setSelectedSeason(value);
            setTeamStats(null);
            setSelectedLeague(null);
          }}
          data={seasons}
          mx="8px"
          withinPortal
        />
      </Center>

      {leagueOptions.length > 1 && (
        <Center mt="40px">
          <Select
            label="Select League"
            placeholder="Choose a league"
            value={selectedLeague}
            onChange={(value) => setSelectedLeague(value)}
            data={leagueOptions}
            mx="8px"
            withinPortal
          />
        </Center>
      )}

      {/* Last Played Match */}
      {lastMatch && (
        <Center mt="40px">
          <Text fw={650}>
            Last Match for the {selectedSeason} season {"->"}{" "}
            {lastMatch.opponent} : {lastMatch.score} (Date: {lastMatch.date})
          </Text>
        </Center>
      )}

      {topScorer && (
        <Center mt="40px">
          <Stack spacing="xs" align="center">
            {/* Top Scorer Label */}
            <Title order={3} color="blue">
              Top Scorer for the {selectedSeason} season
            </Title>

            {/* Top Scorer Details */}
            <Group spacing="md">
              <Image
                src={topScorer.photo}
                alt={topScorer.name}
                width={50}
                height={50}
                radius="50%"
              />
              <Stack spacing={0} align="start">
                <Text fw={600}>{topScorer.name}</Text>
                <Text size="sm" c="dimmed">
                  Goals: {topScorer.goals}
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Center>
      )}

      {(mostYellowCards || mostRedCards) && (
        <Stack spacing="sm" mt="20px">
          {mostYellowCards && (
            <Group>
              <Image
                src={mostYellowCards.photo}
                alt={`${mostYellowCards.player}'s photo`}
                width={40}
                height={40}
                radius="50%"
                withPlaceholder
              />
              <Image
                src="/path-to-yellow-card-icon.png"
                alt="Yellow Card"
                width={20}
                height={20}
              />
              <Text>
                Most Yellow Cards: <strong>{mostYellowCards.player}</strong> (
                {mostYellowCards.count})
              </Text>
            </Group>
          )}
          {mostRedCards && (
            <Group>
              <Image
                src={mostRedCards.photo}
                alt={`${mostRedCards.player}'s photo`}
                width={40}
                height={40}
                radius="50%"
                withPlaceholder
              />
              <Image
                src="/path-to-red-card-icon.png"
                alt="Red Card"
                width={20}
                height={20}
              />
              <Text>
                Most Red Cards: <strong>{mostRedCards.player}</strong> (
                {mostRedCards.count})
              </Text>
            </Group>
          )}
        </Stack>
      )}

      {/* Team Stats */}
      {selectedSeason && teamStats && (
        <Stack px="50px" mt="30px">
          {/* Additional Info */}
          <Group>
            <Text>
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </Text>
          </Group>

          {/* Statistics */}
          <SimpleGrid cols={3} verticalSpacing="55px" my="30px">
            {[
              {
                label: "Matches Played",
                value: teamStats.fixtures.played.total,
              },
              { label: "Wins", value: teamStats.fixtures.wins.total },
              { label: "Losses", value: teamStats.fixtures.loses.total },
              { label: "Goals Scored", value: teamStats.goals.for.total.total },
              {
                label: "Goals Conceded",
                value: teamStats.goals.against.total.total,
              },
              { label: "Draws", value: teamStats.fixtures.draws.total },
            ].map((stat, index) => (
              <TeamStat key={index} label={stat.label} value={stat.value} />
            ))}
          </SimpleGrid>
        </Stack>
      )}
    </Flex>
  );
};

export default TeamPage;
