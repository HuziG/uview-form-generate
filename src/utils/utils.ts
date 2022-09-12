export const upCaseWord = (value: string) => {
  value = value[0].toUpperCase() + value.substr(1)
  return value
}
