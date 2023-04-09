export const convertDateNumberToString = (dateNum: string | number): string => {

  // 310 -> "3/10"
  const date = dateNum.toString();

  return `${date.slice(0, 1)}/${date.slice(1)}/${23}`

}

export const getDateNumber = (): number => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  return parseInt(`${month}${formattedDay}`);
}