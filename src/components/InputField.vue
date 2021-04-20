<template>
<div class="text-center">
  <label :for="labelName">{{ labelName }}: </label>
  <input :type="type" :id="labelName">
</div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
@Options({
  props: {
    labelName: String,
    type: String
  }
})
export default class InputField extends Vue {}
</script>
