<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import draggable from 'vuedraggable'
import type { FormConfigType, SelectConfigType } from './form.config'
import { FormConfigList } from './form.config'
import generateMixins from './mixins/generate.mixin'

const list2 = ref<FormConfigType[]>([])
const editForm = ref<FormConfigType>()

const log = (evt: {
  added: {
    newIndex: number
  }
}) => {
  list2.value = cloneDeep(list2.value)

  editForm.value = list2.value[evt.added.newIndex]

  window.console.log(evt)
}

const handleSetAttr = (ele: any) => {
  window.console.log(ele)

  editForm.value = ele
}

const del = (index: number) => {
  list2.value.splice(index, 1)
}

// quick method
const quickSetValue = ({ key1, key2 }: {
  key1: string
  key2: string
}) => {
  const suffixMap = {
    visibleName: 'Show',
    actionName: 'Options',
    selectFunName: 'SelectConfirm',
  }

  if (editForm.value) {
    editForm.value[key1 as keyof FormConfigType][key2].value
   = `${editForm.value?.__form__.prop}${suffixMap[key2 as keyof SelectConfigType]}`
  }
}

// paste method
const pasteValue = async (key1: string, key2: string) => {
  const value = await navigator.clipboard.readText()
  if (editForm.value)
    editForm.value[key1 as keyof FormConfigType][key2] = value
}

const {
  setSourceData, getGeneratedCode, copyCode,
} = generateMixins()

const handleGenerateCode = (fun: any) => {
  setSourceData(list2.value)
  copyCode(fun)
}
</script>

<template>
  <div h-screen overflow-hidden>
    <div border-b bg-gray-300 flex items-center p-5 style="height: 5vh">
      <n-space>
        <n-button quaternary type="primary" @click="handleGenerateCode(getGeneratedCode)">
          生成完整代码
        </n-button>
      </n-space>
    </div>
    <div flex style="height: 95vh">
      <div pr-5 pb-5 pl-5 style="width: 400px">
        <draggable
          :list="FormConfigList"
          :group="{ name: 'people', pull: 'clone', put: false }"
          item-key="__config__.label"
          @change="log"
        >
          <template #item="{ element }">
            <div bg-gray-100 py-2 px-3 rounded mt-5>
              {{ element.__config__.label }}
            </div>
          </template>
        </draggable>
      </div>

      <div flex-1 px-5 box-border bg-gray-200>
        <draggable
          class="draggable-group"
          :list="list2"
          group="people"
          item-key="__config__.label"
          @change="log"
        >
          <template #item="{ element, index }">
            <div flex items-center mt-5>
              <div
                flex flex-1 items-center justify-between
                bg-gray-100 py-2 px-3 rounded cursor-pointer hover:border-1 box-border
                hover:border-dashed border-purple-500 active:opacity-75
                @click="handleSetAttr(element)"
              >
                <div>
                  <span v-if="element.__rules__ && element.__rules__.required" text-red-500 mr-2>*</span>
                  <span font-bold>{{ element.__form__.label }}</span>
                  : <span text-gray-500>{{ element.__attr__ && element.__attr__.placeholder.value }}</span>
                </div>
                <div v-if="element.__form__.prop" text-xs text-white bg-purple-500 px-1 rounded>
                  formData.{{ element.__form__.prop }}
                </div>
              </div>
              <div pl-5>
                <div
                  i-carbon:close-outline text-red-500 cursor-pointer hover:opacity-75 hover:opacity-50
                  @click="del(index)"
                />
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <div p-5 overflow-y-scroll style="width: 400px;" hidden xl:inline-block>
        <template v-if="editForm">
          <n-form :model="editForm">
            <div bg-purple-500 text-white py-1 px-2 rounded mb-5>
              统一设置
            </div>

            <n-form-item label="左侧提示文字">
              <n-input
                v-model:value="editForm.__form__.label"
              >
                <template #suffix>
                  <div
                    i-carbon:cursor-1 cursor-pointer hover:opacity-75
                    @click="pasteValue('__form__', 'label')"
                  />
                </template>
              </n-input>
            </n-form-item>

            <n-form-item label="字段名">
              <n-input
                v-model:value="editForm.__form__.prop"
              >
                <template #suffix>
                  <div
                    i-carbon:cursor-1 cursor-pointer hover:opacity-75
                    @click="pasteValue('__form__', 'prop')"
                  />
                </template>
              </n-input>
            </n-form-item>
          </n-form>

          <n-form v-if="editForm.__attr__" :model="editForm">
            <div bg-purple-500 text-white py-1 px-2 rounded mb-5>
              特别属性设置
            </div>

            <template v-for="item in editForm.__attr__" :key="item.key">
              <n-form-item :label="item.label">
                <template v-if="item.type === 'input'">
                  <n-input
                    v-model:value="editForm.__attr__[item.key].value"
                  >
                    <template
                      v-if="['visibleName', 'actionName', 'selectFunName'].includes(item.key)"
                      #suffix
                    >
                      <div
                        i-carbon:magic-wand-filled cursor-pointer hover:opacity-75 hover:opacity-50
                        @click="quickSetValue({
                          key1: '__attr__',
                          key2: item.key,
                        })"
                      />
                    </template>
                  </n-input>
                </template>

                <template v-if="item.type === 'select'">
                  <n-select v-model:value="item.value" :options="item.options && item.options" />
                </template>
              </n-form-item>
            </template>
          </n-form>

          <n-form v-if="editForm.__rules__" :model="editForm">
            <div bg-purple-500 text-white py-1 px-2 rounded mb-5>
              表单校验
            </div>

            <n-form-item label="是否必填">
              <n-switch v-model:value="editForm.__rules__.required" />
            </n-form-item>

            <n-form-item label="提示信息">
              <n-input
                v-model:value="editForm.__rules__.message"
              />
            </n-form-item>

            <n-form-item label="正则表达式">
              <n-input
                v-model:value="editForm.__rules__.pattern"
              />
            </n-form-item>
          </n-form>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.draggable-group{
  height: 100vh;
  overflow-y: scroll;
  box-sizing: border-box;
}

.draggable-group::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.draggable-group {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
