<template>
  <div v-if="error.message"> 
    {{error.message}}
  </div>
</template>

<script>
export default {
  name: 'error',
  computed:{
    error(){
      return this.$store.state.error
    }
  }
}
</script>

<style scoped>

</style>
