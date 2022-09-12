import type { FormConfigType } from '../form.config'

const switchConfig = {
  __config__: {
    label: 'Switch 开关',
  },
  __form__: {
    label: '开关',
    prop: '',
  },
  __attr__: null,
  __html__: (ele: FormConfigType) => {
    return `
      <u-switch
        v-model="formValue.${ele.__form__.prop}"
      ></u-switch>
    `
  },
  __html_form__: (ele: FormConfigType, child: any) => {
    return `
    <u-form-item
      label="${ele.__form__.label}"
      prop="${ele.__form__.prop}"
      borderBottom
    >
      ${child}
    </u-form-item>
    `
  },
}

export default switchConfig
