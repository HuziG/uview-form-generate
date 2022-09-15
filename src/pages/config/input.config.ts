import type { FormConfigType } from '../form.config'

const inputConfig = {
  __config__: {
    label: 'Input 输入框',
    document: 'https://www.uviewui.com/components/input.html',
  },
  __form__: {
    label: '单行文本',
    prop: '',
  },
  __rules__: {
    required: true,
    message: '此为必填字段',
    trigger: ['blur', 'change'],
    pattern: '\'\'',
  },
  __attr__: {
    placeholder: {
      key: 'placeholder',
      label: '占位提示',
      type: 'input',
      value: '请输入',
    },
    type: {
      key: 'select',
      label: '类型',
      type: 'select',
      value: 'text',
      options: [{
        label: 'text', value: 'text',
      }, {
        label: 'number', value: 'number',
      }, {
        label: 'password', value: 'password',
      }, {
        label: 'digit', value: 'digit',
      }, {
        label: 'idcard', value: 'idcard',
      }],
    },
  },
  __html__: (ele: FormConfigType) => {
    return `
      <u--input
        v-model="formData.${ele.__form__.prop}"
        placeholder="${ele.__attr__.placeholder.value}"
        inputAlign="right"
        border="none"
        clearable
      ></u--input>
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

export default inputConfig
