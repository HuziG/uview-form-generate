import type { FormConfigType } from '../form.config'

const switchConfig = {
  __config__: {
    label: 'Right 右插槽',
    document: null,
  },
  __form__: {
    label: '右插槽',
    prop: '',
  },
  __attr__: null,
  __html__: () => {
    return ''
  },
  __html_form__: (ele: FormConfigType, child: any) => {
    return `
    <u-form-item
      label="${ele.__form__.label}"
      borderBottom
    >
      <template #right>
        ${child}
      </template>
    </u-form-item>
    `
  },
}

export default switchConfig
