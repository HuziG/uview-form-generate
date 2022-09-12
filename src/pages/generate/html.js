const generateHtml = ({
  modelName, rulesName, refName, formChild,
}) => {
  return `
    <u--form
      labelPosition="left"
      :model="${modelName}"
      :rules="${rulesName}"
      ref="${refName}"
    >
      ${formChild}
    </u--form>
  `
}

export {
  generateHtml,
}
