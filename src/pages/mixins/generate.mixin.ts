import useClipboard from 'vue-clipboard3'
import { useMessage } from 'naive-ui'

export default function () {
  let sourceData: any[] = []

  const message = useMessage()
  const Clip = useClipboard
  const { toClipboard } = Clip()

  const setSourceData = (data: any) => {
    sourceData = data
  }

  const generateRules = () => {
    let result = ''

    sourceData.forEach((item: any) => {
      if (item.__rules__) {
        result += `
          ${item.__form__.prop}: {
            required: ${String(item.__rules__.required)},
            message: '此为必填字段',
            trigger: ['blur', 'change'],
            pattern: ${item.__rules__.pattern},
          },
        `
      }
    })

    return result
  }

  const generateFormData = () => {
    return sourceData.map((item: any) => {
      return `
        ${item.__form__.prop}: ''
      `
    })
  }

  const generateJsData = () => {
    let result = ''

    sourceData.forEach((item: any) => {
      result += `${item.__js_data__ ? `,${item.__js_data__(item)}` : ''}`
    })

    return result
  }

  const generateMethods = () => {
    return sourceData.filter((item: any) => item.__js_method__).map((item: any) => {
      return item.__js_method__(item)
    })
  }

  const generateFormHtml = () => {
    let result = ''

    sourceData.forEach((item: any) => {
      result += item.__html_form__(item, item.__html__ ? item.__html__(item) : '')
    })

    return result
  }

  const generateBottomHtml = () => {
    return sourceData.filter((item: any) => item.__html_pick__).map((item: any) => {
      return item.__html_pick__(item)
    })
  }

  const copyCode = async (fun: any) => {
    const data = fun()

    try {
      await toClipboard(data)
      message.success('copy 成功')
    }
    catch (e) {

    }
  }

  const getGeneratedCode = () => {
    const template = `
    <template>
      <view class="px-5" :style="{
        pointerEvents: pointerEvents
      }">
        <u--form
          labelPosition="left"
          labelWidth="100"
          :model="formData"
          :rules="formRules"
          ref="formRef"
        >
          ${generateFormHtml()}
        </u--form>

        ${generateBottomHtml()}
      </view>
    </template>
    
    <script>
      export default {
        props: {
          pointerEvents: {
            type: Boolean,
            default: false
          }
        },
        data() {
          return {
            formData: {
              ${generateFormData()}
            },
            formRules: {
              ${generateRules()}
            }
            ${generateJsData()}
          }
        },
        mounted() {
    
        },
        methods: {
          hideKeyboard() {
            uni.hideKeyboard();
          },
          setFormData(value) {
            this.formData = value
          },
          submit() {
            return new Promise((resolve, reject) => {
              const formData = cloneDeep(this.formData)

              for (let key in formData) {
                formData[key] = String(this.formData[key])
              }

              this.$refs.formRef
                .validate()
                .then(res => {
                  uni.$u.toast('校验通过')
                  resolve(this.formData)
                })
                .catch(errors => {
                  uni.$u.toast('校验失败')
                  reject(errors)
                })
            })
          },
          
          ${generateMethods()}
        }
      }
    </script>
    
    <style>
     
    </style>
    `

    return template
  }

  return {
    setSourceData,
    getGeneratedCode,
    generateMethods,
    generateFormData,
    generateRules,
    generateFormHtml,
    generateBottomHtml,
    copyCode,
  }
}
