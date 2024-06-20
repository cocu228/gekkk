import { StructedDepositStrategy } from "./types";

const StructedDepositStrategies: Array<StructedDepositStrategy> = [
  {
    id: 10,
    name: "Safe",
    descriptionShort: "Guaranteed profit and risk protection",
    riskPoints: 0,
    returnPoints: 1,
    percentageTypes: [
      {
        risePercentage: 16,
        dropPercentage: 4
      },
      {
        risePercentage: 17,
        dropPercentage: 3
      },
      {
        risePercentage: 18,
        dropPercentage: 2
      }
    ],
    descriptionLong: (
      <>
        <b>Safe strategy</b> - full capital protection and guaranteed return; good for conservative investors and
        beginners as it excludes any risks associated with a fall of cryptocurrency rate.
      </>
    )
  },
  {
    id: 20,
    name: "Balanced",
    descriptionShort: "Minimal risk",
    riskPoints: 1,
    returnPoints: 2,
    percentageTypes: [
      {
        risePercentage: 20,
        dropPercentage: 0
      },
      {
        risePercentage: 23,
        dropPercentage: -3
      },
      {
        risePercentage: 25,
        dropPercentage: -5
      }
    ],
    descriptionLong: (
      <>
        <b>Balanced strategy</b> - full or partial capital protection; increased potential for returns along with the
        minimal risk level.
      </>
    )
  },
  {
    id: 30,
    name: "Dynamic",
    descriptionShort: "Good percentage and predictable risk",
    riskPoints: 2,
    returnPoints: 3,
    percentageTypes: [
      {
        risePercentage: 30,
        dropPercentage: -10
      },
      {
        risePercentage: 40,
        dropPercentage: -20
      },
      {
        risePercentage: 50,
        dropPercentage: -30
      }
    ],
    descriptionLong: (
      <>
        <b>Dynamic strategy</b> - partial capital protection; extremely high potential for returns along with the
        increased risk level.
      </>
    )
  }
];

export default StructedDepositStrategies;
