import type { FormConfigType } from '../form.config'
import { upCaseWord } from '~/utils/utils'

const selectConfig = {
  __config__: {
    label: 'Input 选择',
  },
  __form__: {
    label: '选择',
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
    visibleName: {
      key: 'visibleName',
      label: '展示与隐藏',
      type: 'input',
      value: '',
    },
    actionName: {
      key: 'actionName',
      label: '选择项',
      type: 'input',
      value: '',
    },
    selectFunName: {
      key: 'selectFunName',
      label: 'select 回调方法',
      type: 'input',
      value: '',
    },
  },
  __html__: (ele: FormConfigType) => {
    return `
    <u--input
      v-model="formValue.${ele.__form__.prop}"
      disabled
      disabledColor="#ffffff"
      placeholder="${ele.__attr__.placeholder.value}"
      border="none"
    ></u--input>
    <u-icon
      slot="right"
      name="arrow-right"
    ></u-icon>
    `
  },
  __html_form__: (ele: FormConfigType, child: any) => {
    return `
    <u-form-item
      label="${ele.__form__.label}"
      prop="${ele.__form__.prop}"
      @click="${ele.__attr__.visibleName.value} = true; hideKeyboard()"
      borderBottom
    >
      ${child}
    </u-form-item>
    `
  },
  __html_pick__: (ele: FormConfigType) => {
    return `
      <u-picker 
          :show="${ele.__attr__.visibleName.value}"
          :actions="${ele.__attr__.actionName.value}"
          @close="${ele.__attr__.visibleName.value} = false"
          @confirm="${ele.__attr__.selectFunName.value}"
          keyName="label"
        >
      </u-picker>
    `
  },
  __js_data__: (ele: FormConfigType) => {
    const { visibleName, actionName } = ele.__attr__
    return `
      ${visibleName.value}: '',
      ${actionName.value}: ''
    `
  },
  __js_method__: (ele: FormConfigType) => {
    return `
      set${upCaseWord(ele.__attr__.actionName.value)}() {

      },
      ${ele.__attr__.selectFunName.value}(e) {
        this.formValue.${ele.__form__.prop} = e.name
      },
    `
  },
}

export default selectConfig
