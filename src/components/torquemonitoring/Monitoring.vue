<template>
    <v-container fluid fill-height>
      <router-view/>
    </v-container>
  </template>
  
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  created() {
    
  },
  mounted() {
    this.$emit('mountedTab');
  },

  computed: {
    ...mapGetters({
      getTheme: 'getTheme',
    }),
  },

  methods: {

  }     
}
</script>
  
  <style scoped>
  
  </style>
  