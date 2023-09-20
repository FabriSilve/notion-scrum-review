"use client";

import { BadgeDelta, Card, Flex, Metric, ProgressBar, Text } from "@tremor/react";

const KpiCard = ({
  label,
  value,
  increase,
  start,
  end,
}) => {
  return (
    <Card className="max-w-lg mx-auto">
      <Flex alignItems="start">
        <div>
          <Text>{label}</Text>
          <Metric>{value} %</Metric>
        </div>
        <BadgeDelta deltaType={increase > 0 ? "moderateIncrease" : "moderateDecrease"}>{increase} %</BadgeDelta>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">{start} pt.</Text>
        <Text>{end} pt.</Text>
      </Flex>
      <ProgressBar value={value} className="mt-2" />
    </Card>
  );
}

export default KpiCard;
