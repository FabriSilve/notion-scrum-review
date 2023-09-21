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
} from "@tremor/react";

import KpiCard from "./componenst/KpiCard";

// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from '../tailwind.config.js'

// const { theme } = resolveConfig(tailwindConfig)

export default function Example() {
  const kpiCards = [{
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
  }];

  const sprintFocus = [{
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
  }];

  // const workBreakdown = [{
  //   features: 48,
  //   bugs: 30,
  //   "tech debt": 12,
  // }];
  const workBreakdown = [{
    name: "Features",
    points: 48,
  }, {
    name: "Tech Debt",
    points: 12,
  }, {
    name: "Bugs",
    points: 30,
  }]

  const planningBreakdown = [{
    name: "Planned",
    points: 60,
  },
  {
    name: "Unplanned",
    points: 30,
  }];

  const sprintHistory = [{
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
  }];

  return (
    <main>
      <Title>Review Sprint #36</Title>

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
          <Flex className="mt-4">
            <Text>
              <Bold>Topics</Bold>
            </Text>
            <Text>
              <Bold>Points</Bold>
            </Text>
          </Flex>
          <BarList data={sprintFocus} className="mt-2" />
        </Card>
        <Card className="col-span-1">
          {/* <BarChart
            className="h-full"
            data={workBreakdown}
            index="name"
            categories={["features", "bugs", "tech debt"]}
            colors={["blue", "red", "orange"]}
          /> */}
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
              fontSize
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