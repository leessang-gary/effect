<template>
  <TheWelcome />
  <div class="demo">
    <div>111</div>
    <div>222</div>
    <div>333</div>
    <div>444</div>
    <div>这里是文字</div>
  </div>
</template>
<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
</script>
<style lang="scss" scoped>

.demo {
  margin: 0;
  padding: 0;
  background: #f2f3f5;
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-template-rows: repeat(7, 80px);
  place-content: center;
  gap: 6px;
  height: 100vh;
}

div:nth-child(1) {
  grid-column: 1 / -1;
  grid-row: 1 / 4;
  background: coral;
  clip-path: polygon(0 0, 100% 0, 100% 66%, 0 100%);
}

div:nth-child(2) {
  grid-column: 1 / 3;
  grid-row: 3 / 6;
  background: cornflowerblue;
  clip-path: polygon(0 34%, 100% 11%, 100% 80%, 0% 69%);
}

div:nth-child(3) {
  grid-column: 3 / 4;
  grid-row: 3 / 6;
  background: darkcyan;
  clip-path: polygon(0 10%, 100% 0, 100% 86%, 0 80%);
}

div:nth-child(4) {
  grid-column: 1 / -1;
  grid-row: 5 / 8;
  background: darkgoldenrod;
  clip-path: polygon(0 3%, 100% 20%, 100% 100%, 0 100%);
}

div:nth-child(5) {
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  place-self: center;
  width: 150px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  line-height: 100px;
  transform: rotate(-10deg);
  z-index: 9;
}
</style>
