import type { FormConfigType } from '../form.config'

const datetimePicker = {
  __config__: {
    label: 'Calendar 日历',
    document: 'https://www.uviewui.com/components/calendar.html',
  },
  __form__: {
    label: '日期选择',
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
      value: '请选择日期',
    },
    mode: {
      key: 'mode',
      type: 'select',
      label: '日期选择类型',
      value: 'datetime',
      options: [{
        label: 'single', value: 'single',
      }, {
        label: 'multiple', value: 'multiple',
      }, {
        label: 'range', value: 'range',
      }],
    },
    visibleName: {
      key: 'visibleName',
      label: '展示与隐藏',
      type: 'input',
      value: '',
    },
  },
  __html__: (ele: FormConfigType) => {
    return `
    <u--input
      v-model="formData.${ele.__form__.prop}"
      disabled
      disabledColor="#ffffff"
      inputAlign="right"
      clearable
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
  __js_data__: (ele: FormConfigType) => {
    const { visibleName } = ele.__attr__
    return `
      ${visibleName.value}: false
    `
  },
  __html_pick__: (ele: FormConfigType) => {
    return `
      <u-calendar
        :show="${ele.__attr__.visibleName.value}"
        v-model="formData.${ele.__form__.prop}"
        mode="${ele.__attr__.mode.value}"
        @close="${ele.__attr__.visibleName.value} = false"
        @confirm="${ele.__form__.prop}Confirm"
      ></u-calendar>
    `
  },
  __js_method__: (ele: FormConfigType) => {
    return `
      hideKeyboard() {
        uni.hideKeyboard();
      },
      ${ele.__form__.prop}Confirm(e) {
        this.${ele.__attr__.visibleName.value} = false
        console.info(e)
      }
    `
  },
}

export default datetimePicker
