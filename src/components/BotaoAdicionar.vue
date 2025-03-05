<template>
  <div>
    <q-btn class="fixed-bottom-right q-ma-md" round color="primary" icon="add">
      <q-menu style="width: 200px">
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup @click="openModal('caixa-selecao')">
            <q-item-section>
              <div class="row q-gutter-x-sm">
                <q-icon name="check" size="20px" />
                <span>Caixa de Seleção</span>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup @click="openModal('texto')">
            <q-item-section>
              <div class="row q-gutter-x-sm">
                <q-icon name="book" size="20px" />
                <span>Texto</span>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BotaoComponent',

  emits: ['openModal'],

  methods: {
    openModal(tipo) {
      this.$emit('openModal', tipo)
    },
  },
})
</script>
