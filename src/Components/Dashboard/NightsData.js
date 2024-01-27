export let nightsLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 1,
    color: "#a855f7",
  },
];

export let nightsDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 1,
    color: "#7e22ce",
  },
];

export default function getChartData(bookings, nights) {
  let chartData = [];

  bookings.forEach((b) => {
    if (b.numNights === 1) {
      const prevValue =
        chartData?.find((c) => c.duration === "1 night")?.value || 0;
      nights.map((n) =>
        n.duration === "1 night"
          ? chartData.find((c) => c.duration === "1 night")
            ? (chartData[
                chartData.findIndex((c) => c.duration === "1 night")
              ].value = prevValue + 1)
            : chartData.push({ ...n, value: n.value + 1 })
          : null
      );
    }
    if (b.numNights === 2) {
      const prevValue =
        chartData?.find((c) => c.duration === "2 nights")?.value || 0;
      nights.map((n) =>
        n.duration === "2 nights"
          ? chartData.find((c) => c.duration === "2 nights")
            ? (chartData[
                chartData.findIndex((c) => c.duration === "2 nights")
              ].value = prevValue + 1)
            : chartData.push({ ...n, value: n.value + 1 })
          : null
      );
    }
    if (b.numNights === 3) {
      const prevValue =
        chartData?.find((c) => c.duration === "3 nights")?.value || 0;
      nights.map((n) =>
        n.duration === "3 nights"
          ? chartData.find((c) => c.duration === "3 nights")
            ? (chartData[
                chartData.findIndex((c) => c.duration === "3 nights")
              ].value = prevValue + 1)
            : chartData.push({ ...n, value: n.value + 1 })
          : null
      );
    }
    if (b.numNights >= 4 && b.numNights <= 5) {
      const prevValue =
        chartData?.find((c) => c.duration === "4-5 nights")?.value || 0;
      nights.map((n) =>
        n.duration === "4-5 nights"
          ? chartData.find((c) => c.duration === "4-5 nights")
            ? (chartData[
                chartData.findIndex((c) => c.duration === "4-5 nights")
              ].value = prevValue + 1)
            : chartData.push({ ...n, value: n.value + 1 })
          : null
      );
    }
    if (b.numNights >= 6 && b.numNights <= 7) {
      const prevValue =
        chartData?.find((c) => c.duration === "6-7 nights")?.value || 0;
      nights.map((n) =>
        n.duration === "6-7 nights"
          ? chartData.find((c) => c.duration === "6-7 nights")
            ? (chartData[
                chartData.findIndex((c) => c.duration === "6-7 nights")
              ].value = prevValue + 1)
            : chartData.push({ ...n, value: n.value + 1 })
          : null
      );
    }
    if (b.numNights >= 8 && b.numNights <= 14) {
      const prevValue =
        chartData?.find((c) => c.duration === "8-14 nights")?.value || 0;
      nights.map((n) =>
        n.duration === "8-14 nights"
          ? chartData.find((c) => c.duration === "8-14 nights")
            ? (chartData[
                chartData.findIndex((c) => c.duration === "8-14 nights")
              ].value = prevValue + 1)
            : chartData.push({ ...n, value: n.value + 1 })
          : null
      );
    }
    if (b.numNights >= 15 && b.numNights <= 21) {
      const prevValue =
        chartData?.find((c) => c.duration === "15-21 nights")?.value || 0;
      nights.map((n) =>
        n.duration === "15-21 nights"
          ? chartData.find((c) => c.duration === "15-21 nights")
            ? (chartData[
                chartData.findIndex((c) => c.duration === "15-21 nights")
              ].value = prevValue + 1)
            : chartData.push({ ...n, value: n.value + 1 })
          : null
      );
    }
    if (b.numNights > 21) {
      const prevValue =
        chartData?.find((c) => c.duration === "21+ nights")?.value || 0;
      nights.map((n) =>
        n.duration === "21+ nights"
          ? chartData.find((c) => c.duration === "21+ nights")
            ? (chartData[
                chartData.findIndex((c) => c.duration === "21+ nights")
              ].value = prevValue + 1)
            : chartData.push({ ...n, value: n.value + 1 })
          : null
      );
    }
  });

  return chartData.sort((a, b) => a.duration.localeCompare(b.duration));
}
