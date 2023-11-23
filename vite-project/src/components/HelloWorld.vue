<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">{{ msg }}</div>
  <a-button type="primary">Primary Button</a-button>
</template>

<style scoped>

.greetings {
  font-size: 16px;
}

@media (min-width: 1024px) {
  .greetings {
    font-size: 12px;
  }
}
</style>
