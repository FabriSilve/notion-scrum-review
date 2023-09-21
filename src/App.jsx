import { useState, useCallback } from 'react';
import {
  Card,
  Grid,
  Title,
  Text,
  Flex,
  Bold,
  BarList,
  BarChart,
  DonutChart,
  Legend,
  Subtitle,
  TextInput,
  Button,
} from "@tremor/react";
import {
  KeyIcon,
  DatabaseIcon,
  RefreshIcon,
} from "@heroicons/react/solid";

import KpiCard from "./componenst/KpiCard";

const getDemoData = () => ({
  kpiCards: [{
    label: "Features",
    value: 68,
    increase: 10.2,
    start: 33,
    end: 64,
  }, {
    label: "Bugs",
    value: 10,
    increase: -5.3,
    start: 13,
    end: 64,
  }, {
    label: "Tech Debt",
    value: 25,
    increase: 7.3,
    start: 18,
    end: 64,
  }, {
    label: "Unplanned",
    value: 32,
    increase: 40.3,
    start: 40,
    end: 64,
  }],
  sprintFocus: [{
    name: "Factoring",
    value: 34,
    color: 'green',
  }, {
    name: "Loss Reservation",
    value: 28,
    color: 'blue',
  }, {
    name: "Debt Collection",
    value: 16,
    color: 'yellow',
  }, {
    name: "KBAR",
    value: 10,
    color: 'red',
  }, {
    name: "21Grams",
    value: 3,
    color: 'purple',
  }],
  workBreakdown: [{
    name: "Features",
    points: 48,
  }, {
    name: "Tech Debt",
    points: 12,
  }, {
    name: "Bugs",
    points: 30,
  }],
  planningBreakdown: [{
    name: "Planned",
    points: 60,
  },
  {
    name: "Unplanned",
    points: 30,
  }],
  sprintHistory: [{
    name: "Sprint #22",
    "Features": 49,
    "Tech Debt": 19,
    "Bugs": 10,
    "Unplanned": 17,
  }, {
    name: "Sprint #23",
    "Features": 68,
    "Tech Debt": 10,
    "Bugs": 23,
    "Unplanned": 20,
  }, {
    name: "Sprint #24",
    "Features": 53,
    "Tech Debt": 30,
    "Bugs": 5,
    "Unplanned": 15,
  }, {
    name: "Sprint #25",
    "Features": 30,
    "Tech Debt": 20,
    "Bugs": 5,
    "Unplanned": 25,
  }, {
    name: "Sprint #26",
    "Features": 68,
    "Tech Debt": 10,
    "Bugs": 23,
    "Unplanned": 20,
  }, {
    name: "Sprint #27",
    "Features": 53,
    "Tech Debt": 30,
    "Bugs": 5,
    "Unplanned": 15,
  }, {
    name: "Sprint #28",
    "Features": 30,
    "Tech Debt": 20,
    "Bugs": 5,
    "Unplanned": 25,
  }, {
    name: "Sprint #29",
    "Features": 68,
    "Tech Debt": 10,
    "Bugs": 23,
    "Unplanned": 20,
  }, {
    name: "Sprint #30",
    "Features": 53,
    "Tech Debt": 30,
    "Bugs": 5,
    "Unplanned": 15,
  }, {
    name: "Sprint #31",
    "Features": 30,
    "Tech Debt": 20,
    "Bugs": 5,
    "Unplanned": 25,
  }, {
    name: "Sprint #32",
    "Features": 30,
    "Tech Debt": 20,
    "Bugs": 5,
    "Unplanned": 25,
  }, {
    name: "Sprint #33",
    "Features": 68,
    "Tech Debt": 10,
    "Bugs": 23,
    "Unplanned": 20,
  }, {
    name: "Sprint #34",
    "Features": 53,
    "Tech Debt": 30,
    "Bugs": 5,
    "Unplanned": 15,
  }, {
    name: "Sprint #35",
    "Features": 30,
    "Tech Debt": 20,
    "Bugs": 5,
    "Unplanned": 25,
  }],
})

export default function Example() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [token, setToken] = useState('');
  const [database, setDatabase] = useState('');


  const [kpiCards, setKpiCards] = useState();
  const [sprintFocus, setSprintFocus] = useState();
  const [workBreakdown, setWorkBreakdown] = useState();
  const [planningBreakdown, setPlanningBreakdown] = useState();
  const [sprintHistory, setSprintHistory] = useState();

  const onDemoClick = useCallback((event) => {
    event.preventDefault();
    const demoData = getDemoData();
    setKpiCards(demoData.kpiCards);
    setSprintFocus(demoData.sprintFocus);
    setWorkBreakdown(demoData.workBreakdown);
    setPlanningBreakdown(demoData.planningBreakdown);
    setSprintHistory(demoData.sprintHistory);
    setDataLoaded(true);
  }, [])

  const onRefreshClick = useCallback((event) => {
    event.preventDefault();
    setDataLoaded(false);
  }, [])

  if (!dataLoaded) {
    return (
      <Flex
        className='h-5/6 w-full'
        alignItems='center'
        flexDirection='col'
      >
        <Flex className='w-1/3 my-28'>
          <Card>
            <Flex
              alignItems='center'
              flexDirection='col'
            >
              <Title>Notion Dashboard</Title>
              <Subtitle>Add your Notion&apos;s IDs to populate the dashboard</Subtitle>
              <TextInput
                className="mt-6"
                icon={KeyIcon}
                placeholder="Token ID"
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />
              <TextInput
                className="mt-6"
                icon={DatabaseIcon}
                placeholder="Database ID"
                value={database}
                onChange={(event) => setDatabase(event.target.value)}
              />
              <Flex
                className="mt-12 w-full"
                alignItems='center'
                justifyContent='around'
              >
                <Button
                  size="md"
                >
                  Connect
                </Button>
                <Button
                  size="md"
                  variant='secondary'
                  onClick={onDemoClick}
                >
                  Demo
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    )
  }

  return (
    <main>
      <Flex
        flexDirection='row'
        justifyContent='between'
      >
        <Title>Review Sprint #36</Title>
        <Button
          icon={RefreshIcon}
          onClick={onRefreshClick}
        >
          Refresh data
        </Button>
      </Flex>

      <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-3">
        {kpiCards.map((card) => (
          <KpiCard
            key={card.label}
            label={card.label}
            value={card.value}
            increase={card.increase}
            start={card.start}
            end={card.end}
          />
        ))}
      </Grid>
      <Grid numItemsMd={1} numItemsLg={4} className="grid-cols-4 gap-6 mt-3">
        <Card className="col-span-2">
          <Flex>
            <Text>
              <Bold>Topics</Bold>
            </Text>
            <Text>
              <Bold>Points</Bold>
            </Text>
          </Flex>
          <BarList data={sprintFocus} />
        </Card>
        <Card className="col-span-1">
          <Flex
            flexDirection="col"
            alignItems="center"
            justifyContent="around"
            className="h-full"
          >
            <Legend
              categories={["Features", "Tech Debt", "Bugs"]}
              colors={["blue", "orange", "yellow"]}
            />
            <DonutChart
              className="h-5/6"
              data={workBreakdown}
              category="points"
              index="name"
              valueFormatter={(number) => `${Intl.NumberFormat("se").format(number).toString()} pt.`}
              colors={["blue", "orange", "yellow"]}
            />
          </Flex>
        </Card>
        <Card className="col-span-1">
          <Flex
            flexDirection="col"
            alignItems="center"
            justifyContent="around"
            className="h-full"
          >
            <Legend
              categories={["Planned", "Unplanned"]}
              colors={["green", "red"]}
            />
            <DonutChart
              className="h-5/6"
              data={planningBreakdown}
              category="points"
              index="name"
              colors={["green", "red"]}
              variant="pie"
            />
          </Flex>
        </Card>
      </Grid>
      <Grid numItemsMd={1} numItemsLg={1} className="gap-6 mt-3">
        <Card>
          <BarChart
            className="mt-6"
            data={sprintHistory}
            index="name"
            categories={["Features", "Tech Debt", "Bugs", "Unplanned"]}
            colors={["blue", "orange", "yellow", "red"]}
            yAxisWidth={48}
          />
        </Card>
      </Grid>
    </main>
  );
}