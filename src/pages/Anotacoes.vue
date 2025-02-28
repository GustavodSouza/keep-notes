<template>
  <q-item>
    <q-item-section>
      <q-card class="full-height q-pa-md" style="height: 100vh !important">
        <span>Sua Lista Esta Vazia!</span>
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
      </q-card>
    </q-item-section>
  </q-item>
  <dialog-component ref="textoDialog" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import DialogComponent from 'src/components/dialogs/Dialog.vue'

export default defineComponent({
  name: 'AnotacoesComponent',

  components: {
    DialogComponent,
  },

  methods: {
    openModal(tipo: string): void {
      this.$refs.textoDialog.openModal({ tipo })
    },
  },
})
</script>
