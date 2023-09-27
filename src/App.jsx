import Cookies from 'js-cookie';
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

const URL = 'http://localhost:7000/query';

const parseData = (data) => {
  let totalSprintPoints = 0;
  let featuresSprintPoints = 0;
  let bugsSprintPoints = 0;
  let techDebtSprintPoints = 0;
  let unplannedSprintPoints = 0;
  let plannedSprintPoints = 0;
  const sprintFocusMap = {};

  const sprintHistoryMap = {};
  for (let ticket of data) {
    const ticketProperties = ticket.properties || {};
    const ticketPoints = ticketProperties.Points ? ticketProperties.Points.number || 0 : 0;
    if (ticketPoints === 0) continue;

    const ticketStatus = ticketProperties.Status.select.name || '';
    const ticketLabels = (ticketProperties.Label.multi_select || []).map(({ name, color }) => ({ name, color }))

    const ticketAnalysis = ticketLabels.reduce(
      (res, label) => {
        if (label.name === 'Unplanned') res.isUnplanned = true;
        else if (label.name === 'Bug Fix') res.isBug = true;
        else if (label.name === 'Tech Debt') res.isTechDebt = true;
        else if (
          label.name === 'Need help'
          || label.name === 'Need refinement'
          || label.name === 'Blocked'
          || label.name === 'Back From Validation'
          || label.name === 'Extended'
          || label.name === 'Defect'
        ) { /* nothing */ }
        else {
          res.sanitidesLabels.push(label);
        }
        return res;
      },
      {
        isBug: false,
        isTechDebt: false,
        isUnplanned: false,
        sanitidesLabels: [],
      },
    )

    if (
      ticketStatus === 'Done'
      || ticketStatus === 'To Validate'
      || ticketStatus === 'Validated'
    ) {
      totalSprintPoints += ticketPoints;
      if (ticketAnalysis.isBug) bugsSprintPoints += ticketPoints;
      if (ticketAnalysis.isTechDebt) techDebtSprintPoints += ticketPoints;
      if (!ticketAnalysis.isBug && !ticketAnalysis.isTechDebt) featuresSprintPoints += ticketPoints;
      if (ticketAnalysis.isUnplanned) unplannedSprintPoints += ticketPoints;
      else plannedSprintPoints += ticketPoints;

      for (let label of ticketAnalysis.sanitidesLabels) {
        if (sprintFocusMap[label.name]) {
          sprintFocusMap[label.name] = {
            value: sprintFocusMap[label.name].value + ticketPoints,
            color: sprintFocusMap[label.name].color,
          }
        } else {
          sprintFocusMap[label.name] = {
            value: ticketPoints,
            color: label.color,
          }
        }
      }
    }

    if (/^Done #/.test(ticketStatus)) {
      console.log(ticketStatus, /^Done #([0-9]*)$/.exec(ticketStatus))
      const sprintNumber = /^Done #([0-9]*)$/.exec(ticketStatus)[1];

      const bug = ticketAnalysis.isBug ? ticketPoints : 0;
      const techDebt = ticketAnalysis.isTechDebt ? ticketPoints : 0;
      const feature = !ticketAnalysis.isBug && !ticketAnalysis.isTechDebt ? ticketPoints : 0;
      const unplanned = ticketAnalysis.isUnplanned ? ticketPoints : 0;

      if (sprintHistoryMap[`Sprint ${sprintNumber}`]) {
        sprintHistoryMap[`Sprint ${sprintNumber}`] = {
          "Features": sprintHistoryMap[`Sprint ${sprintNumber}`]['Features'] + feature,
          "Tech Debt": sprintHistoryMap[`Sprint ${sprintNumber}`]['Tech Debt'] + techDebt,
          "Bugs": sprintHistoryMap[`Sprint ${sprintNumber}`]['Bugs'] + bug,
          "Unplanned": sprintHistoryMap[`Sprint ${sprintNumber}`]['Unplanned'] + unplanned,
        }
      } else {
        sprintHistoryMap[`Sprint ${sprintNumber}`] = {
          "Features": feature,
          "Tech Debt": techDebt,
          "Bugs": bug,
          "Unplanned": unplanned,
        }
      }


    }
  }

  const workBreakdown = [{
    name: "Features",
    points: featuresSprintPoints,
  }, {
    name: "Tech Debt",
    points: techDebtSprintPoints,
  }, {
    name: "Bugs",
    points: bugsSprintPoints,
  }];
  const planningBreakdown = [{
      name: "Planned",
      points: plannedSprintPoints,
    },
    {
      name: "Unplanned",
      points: unplannedSprintPoints,
    }];
  const sprintFocus = Object.entries(sprintFocusMap)
    .map(
      ([label, data]) => ({
        name: label,
        value: data.value,
        color: data.color,
      }))
    .sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0))
  const sprintHistory = Object.entries(sprintHistoryMap)
    .map(
      ([label, data]) => ({
        name: label,
        ...data,
      }))
    .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  const lastSprint = sprintHistory[sprintHistory.length - 1];
  const kpiCards = [{
    label: "Features",
    value: Math.round((featuresSprintPoints / totalSprintPoints) * 100),
    increase: lastSprint['Features'] ? Math.round(((featuresSprintPoints / lastSprint['Features']) - 1) * 100) : 100,
    start: featuresSprintPoints,
    end: totalSprintPoints,
  }, {
    label: "Bugs",
    value: Math.round((bugsSprintPoints / totalSprintPoints) * 100),
    increase: lastSprint['Bugs'] ? Math.round(((bugsSprintPoints / lastSprint['Bugs']) - 1) * 100) : 100,
    start: bugsSprintPoints,
    end: totalSprintPoints,
  }, {
    label: "Tech Debt",
    value: Math.round((techDebtSprintPoints / totalSprintPoints) * 100),
    increase: lastSprint['Tech Debt'] ? Math.round(((techDebtSprintPoints / lastSprint['Tech Debt']) - 1) * 100) : 100,
    start: techDebtSprintPoints,
    end: totalSprintPoints,
  }, {
    label: "Unplanned",
    value: Math.round((unplannedSprintPoints / totalSprintPoints) * 100),
    increase: lastSprint['Unplanned'] ? Math.round(((unplannedSprintPoints / lastSprint['Unplanned']) - 1) * 100) : 100,
    start: unplannedSprintPoints,
    end: totalSprintPoints,
  }];

  return {
    kpiCards,
    workBreakdown,
    planningBreakdown,
    sprintFocus,
    sprintHistory,
  }
};

const fetchData = async (token, database, callback) => {
  let data = await fetch(`${URL}/${token}/${database}`);
  let result = await data.json();
  let tickets = result.tickets;
  let nextCursor = result.nextCursor
  while (nextCursor) {
    data = await fetch(`${URL}/${token}/${database}/${nextCursor}`);
    result = await data.json();
    tickets = tickets.concat(result.tickets);
    nextCursor = result.nextCursor
  }

  callback(tickets);
}

export default function Example() {
  const storedToken = Cookies.get('token');
  const storedDatabase = Cookies.get('database');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasData, setHasData] = useState(false);

  const [token, setToken] = useState(storedToken || '');
  const [database, setDatabase] = useState(storedDatabase || '');

  const [kpiCards, setKpiCards] = useState();
  const [sprintFocus, setSprintFocus] = useState();
  const [workBreakdown, setWorkBreakdown] = useState();
  const [planningBreakdown, setPlanningBreakdown] = useState();
  const [sprintHistory, setSprintHistory] = useState();


  const onDemoClick = useCallback((event) => {
    event.preventDefault();
    setIsLoading(true)
    const demoData = getDemoData();
    setKpiCards(demoData.kpiCards);
    setSprintFocus(demoData.sprintFocus);
    setWorkBreakdown(demoData.workBreakdown);
    setPlanningBreakdown(demoData.planningBreakdown);
    setSprintHistory(demoData.sprintHistory);
    setHasData(true);
    setIsLoading(false)
    Cookies.remove('token');
    Cookies.remove('database');
  }, [])

  const onRefreshClick = useCallback((event) => {
    event.preventDefault();
    setHasData(false);
    setKpiCards(undefined);
    setSprintFocus(undefined);
    setWorkBreakdown(undefined);
    setPlanningBreakdown(undefined);
    setSprintHistory(undefined);
  }, [])

  const onConnectClick = useCallback((event) => {
    event.preventDefault();
    Cookies.set('token', token, { expires: 30 });
    Cookies.set('database', database, { expires: 30 });

    setIsLoading(true);

    fetchData(token, database, (tickets) => {
      const data = parseData(tickets);

      setKpiCards(data.kpiCards);
      setSprintFocus(data.sprintFocus);
      setWorkBreakdown(data.workBreakdown);
      setPlanningBreakdown(data.planningBreakdown);
      setSprintHistory(data.sprintHistory);


      setHasData(true);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsError(true);
      setIsLoading(false);
    });
  }, [token, database])

  if (!hasData && !isLoading) {
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
              <Subtitle className='text-center'>Add your Notion&apos;s IDs to populate the dashboard</Subtitle>
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
                  onClick={onConnectClick}
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

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-200'>
        <div
          style={{ width: '20rem', height: '20rem' }}
          className="animate-spin">
          <div className="h-full w-full border-4 border-t-purple-500
      border-b-purple-700 rounded-[50%]">
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <>has error</>
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
      <Grid numItemsMd={1} numItemsLg={4} className="gap-6 mt-3">
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