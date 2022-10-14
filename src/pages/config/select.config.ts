import type { FormConfigType } from '../form.config'
import { upCaseWord } from '~/utils/utils'

const selectConfig = {
  __config__: {
    label: 'Select 选择',
    document: 'https://www.uviewui.com/components/picker.html',
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
      v-model="formData.${ele.__form__.prop}"
      inputAlign="right"
      disabled
      disabledColor="#ffffff"
      placeholder="${ele.__attr__.placeholder.value}"
      border="none"
    ></u--input>
    <u-icon
      slot="right"
      name="arrow-down"
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
        :columns="${ele.__attr__.actionName.value}"
        @cancel="${ele.__attr__.visibleName.value} = false"
        @close="${ele.__attr__.visibleName.value} = false"
        @confirm="${ele.__attr__.selectFunName.value}"
        closeOnClickOverlay
        keyName="label"
        >
      </u-picker>
    `
  },
  __js_data__: (ele: FormConfigType) => {
    const { visibleName, actionName } = ele.__attr__
    return `
      ${visibleName.value}: false,
      ${actionName.value}: []
    `
  },
  __js_method__: (ele: FormConfigType) => {
    const { actionName, selectFunName, visibleName } = ele.__attr__
    const { prop } = ele.__form__

    return `
      set${upCaseWord(actionName.value)}() {
        this.${actionName.value} = []
      },
      ${selectFunName.value}(e) {
        this.${visibleName.value} = false
        this.formData.${prop} = e.value[0].label
      }
    `
  },
}

export default selectConfig
