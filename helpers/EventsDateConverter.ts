export const convertDateNumberToString = (dateNum: string | number): string => {
  // 310 -> "3/10"
  //
  const date = dateNum.toString();

  return `${date.slice(0, 1)}/${date.slice(1)}/${23}`

}
