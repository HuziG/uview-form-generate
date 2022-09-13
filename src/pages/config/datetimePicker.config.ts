import type { FormConfigType } from '../form.config'

const datetimePicker = {
  __config__: {
    label: 'DatetimePicker 选择器',
    document: 'https://www.uviewui.com/components/datetimePicker.html',
  },
  __form__: {
    label: '时间选择',
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
      value: '请选择时间',
    },
    mode: {
      key: 'mode',
      type: 'select',
      label: '时间选择类型',
      value: 'date',
      options: [{
        label: 'datetime', value: 'datetime',
      }, {
        label: 'date', value: 'date',
      }, {
        label: 'time', value: 'time',
      }, {
        label: 'year-month', value: 'year-month',
      }],
    },
    visibleName: {
      key: 'visibleName',
      label: '展示与隐藏',
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
    const { prop } = ele.__form__

    return `
      ${prop}: Number(new Date()),
      ${visibleName.value}: false
    `
  },
  __html_pick__: (ele: FormConfigType) => {
    const { visibleName, selectFunName, mode } = ele.__attr__
    const { prop } = ele.__form__

    return `
      <u-datetime-picker
        :show="${visibleName.value}"
        :value="${prop}"
        @cancel="${visibleName.value} = false"
        @close="${visibleName.value} = false"
        @confirm="${selectFunName.value}"
        mode="${mode.value}"
        closeOnClickOverlay
      ></u-datetime-picker>
    `
  },
  __js_method__: (ele: FormConfigType) => {
    const { selectFunName, visibleName } = ele.__attr__
    const { prop } = ele.__form__

    return `
      ${selectFunName.value}(e) {
        this.formData.${prop} = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
        this.${visibleName.value} = false
      },
      hideKeyboard() {
        uni.hideKeyboard();
      },
    `
  },
}

export default datetimePicker
