<template>
  <v-app>
    <MenuTable/>
  </v-app>
</template>

<script>
import MenuTable from './components/MenuTable'

export default {
  name: 'App',
  components: {
    MenuTable
  },
}
</script>