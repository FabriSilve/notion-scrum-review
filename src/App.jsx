import {
  Card,
  Grid,
  Title,
  Text,
  Flex,
  Bold,
  BarList,
  BarChart,
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

  const workBreakdown = [{
    features: 48,
    bugs: 30,
    "tech debt": 12,
  }];

  return (
    <main>
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
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
      <Grid numItemsMd={1} numItemsLg={3} className="gap-6 mt-6">
        <Card className="max-w-lg">
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
        <Card>
          <BarChart
            className="mt-6"
            data={workBreakdown}
            index="name"
            categories={["features", "bugs", "tech debt"]}
            colors={["blue", "red", "orange"]}
          />
        </Card>
        <Card>
          {/* Placeholder to set height */}
          <div className="h-72" />
        </Card>
      </Grid>
      <div className="mt-6">
        <Card>
          <div className="h-60" />
        </Card>
      </div>
    </main>
  );
}