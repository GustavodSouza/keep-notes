<template>
  <div class="row q-gutter-md">
    <q-card
      class="q-pa-md q-mb-md card-clickable cursor-pointer box"
      v-for="(card, index) in notas"
      :key="index"
      bordered
      @click="abrirNota(card)"
    >
      <div style="margin-top: 20px">
        <div v-if="card.isCheckbox">
          <span class="text-h5">{{ card.titulo }}</span>
          <q-list>
            <q-item
              class="row items-center q-pa-none"
              v-for="(checkbox, index) in card.checkboxes?.filter((item) => !item.check)"
              :key="index"
            >
              <q-checkbox class="col-2" v-model="checkbox.check" dense disable />
              <input
                style="height: 30px"
                class="col-10"
                v-model="checkbox.task"
                disabled
                readonly
              />
            </q-item>
            <q-separator />
            <q-item
              class="row items-center q-pa-none"
              v-for="(checkbox, index) in card.checkboxes?.filter((item) => item.check)"
              :key="index"
            >
              <q-checkbox class="col-2" v-model="checkbox.check" dense disable />
              <input
                style="height: 30px"
                class="col-10"
                v-model="checkbox.task"
                disabled
                readonly
              />
            </q-item>
          </q-list>
        </div>

        <div v-else>
          <span class="text-h5">{{ card.titulo }}</span>
          <p>{{ card.nota }}</p>
        </div>
        <q-icon
          class="custom-pin-position cursor-pointer"
          :name="card.isFixed ? icons.fasThumbtackSlash : icons.fasThumbtack"
          size="20px"
          color="primary"
          @click.stop="fixar(card)"
        />
      </div>
      <q-icon
        style="position: absolute"
        class="cursor-pointer fixed-bottom-right q-pb-sm"
        :name="icons.fasEllipsisVertical"
        size="15px"
        @click.stop="menu = !menu"
      >
        <q-menu style="width: 200px">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="excluirNota(card)">
              <q-item-section>
                <div class="row q-gutter-x-sm">
                  <span>Excluir Nota</span>
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu>
      </q-icon>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import type { INota } from 'src/interfaces/nota.interface'

import { fasEllipsisVertical, fasThumbtackSlash, fasThumbtack } from '@quasar/extras/fontawesome-v6'
import { updateNota } from 'src/service/notas.service'

export default defineComponent({
  name: 'CardComponent',

  emits: ['abrirNota', 'excluirNota', 'openModal', 'atualizarDashboard'],

  props: {
    notas: {
      type: Array<INota>,
      required: true,
    },
  },

  data() {
    return {
      icons: {
        fasEllipsisVertical,
        fasThumbtackSlash,
        fasThumbtack,
      },
      menu: false,
    }
  },

  methods: {
    abrirNota(card: INota) {
      this.$emit('abrirNota', card)
    },

    excluirNota(card: INota) {
      this.$emit('excluirNota', card.id)
    },

    async fixar(card: INota) {
      card.isFixed = !card.isFixed
      await updateNota(card)
      this.$emit('atualizarDashboard')
    },
  },
})
</script>
<style lang="scss" scoped>
.custom-pin-position {
  display: none;
}

.box:hover .custom-pin-position {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 5px 0 0;
}
</style>
