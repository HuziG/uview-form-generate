export const upCaseWord = (value: string) => {
  try {
    value = value[0].toUpperCase() + value.substr(1)
    return value
  }
  catch (e) {
    return ''
  }
}
