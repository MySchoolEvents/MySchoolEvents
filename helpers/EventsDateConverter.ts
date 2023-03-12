export const convertDateNumberToString = (dateNum: string | number): string => {

  // 310 -> "3/10"
  const date = dateNum.toString();

  return `${date.slice(0, 1)}/${date.slice(1)}/${23}`

}

export const getDateNumber = (): number => {

  // march 10 -> 310

  const date = new Date();

  const month = date.getMonth() + 1;

  const day = date.getDate();

  return parseInt(`${month}${day}`)

}
