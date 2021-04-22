<template>
<div class="text-center">
  <label :for="labelName">{{ labelName }}: </label>
  <input :type="type" :id="labelName" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
@Options({
  props: {
    labelName: String,
    type: String,
    modelValue: String
  },
  emits: ['update:modelValue']
})
export default class InputField extends Vue {}
</script>
