import type { FormConfigType } from '../form.config'

const inputConfig = {
  __config__: {
    label: 'Textarea 文本域',
    document: 'https://www.uviewui.com/components/textarea.html',
  },
  __form__: {
    label: '文本域',
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
      value: '请输入内容',
    },
  },
  __html__: (ele: FormConfigType) => {
    return `
      <u--textarea
        v-model="formData.${ele.__form__.prop}"
        placeholder="${ele.__attr__.placeholder.value}"
        autoHeight
        border="none"
        clearable
        count
        maxlength="200"
      ></u--textarea>
    `
  },
  __html_form__: (ele: FormConfigType, child: any) => {
    return `
    <u-form-item
      label="${ele.__form__.label}"
      prop="formData.${ele.__form__.prop}"
      borderBottom
    >
      ${child}
    </u-form-item>
    `
  },
}

export default inputConfig
