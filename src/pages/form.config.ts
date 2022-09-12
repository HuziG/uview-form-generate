import datetimePicker from './config/datetimePicker.config'
import inputConfig from './config/input.config'
import selectConfig from './config/select.config'
import switchConfig from './config/switch.config'

export interface SelectConfigType {
  visibleName: {
    key: string
    label: string
    type: string
    value: string
  }
  actionName: {
    key: string
    label: string
    type: string
    value: string
  }
  selectFunName: {
    key: string
    label: string
    type: string
    value: string
  }
}

export interface FormConfigType {
  __form__: {
    label: string
    prop: string
  }
  __attr__: {
    placeholder: {
      key: string
      type: string
      label: string
      value: string
    }
    type: {
      key: string
      type: string
      label: string
      value: string
      options: { label: string; value: string }[]
    }
    mode: {
      key: string
      type: string
      label: string
      value: string
      options: { label: string; value: string }[]
    }
    visibleName: {
      key: string
      label: string
      type: string
      value: string
    }
    actionName: {
      key: string
      label: string
      type: string
      value: string
    }
    selectFunName: {
      key: string
      label: string
      type: string
      value: string
    }
  }
  __rules__?: {
    required: boolean
    message: string
    trigger: string[]
    pattern: string
  }
  __html__: any
  __html_form__: any
  __js_method__: any
}

export const FormConfigList = [
  inputConfig,
  selectConfig,
  switchConfig,
  datetimePicker,
]
