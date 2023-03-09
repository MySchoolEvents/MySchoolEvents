function getCurrentDateOrdinalSuffixes() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return `${month} ${day}${getOrdinalSuffixes(day)}, ${year}`

}

function getOrdinalSuffixes(currentDay: number) {
  if (currentDay > 3 && currentDay < 21) return "th";
  switch (currentDay % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export { getCurrentDateOrdinalSuffixes }
