<template>
  <v-container>
    <v-card>
      <v-card-title @click="showContent" class="headline grey lighten-2" primary-title>
        {{ title }}
        <v-spacer></v-spacer>
        <div class="text-xs-center">
          <v-chip v-if="!active" color="red" text-color="white">Overdue</v-chip>
          <v-chip v-else color="green" text-color="white">Active</v-chip>
        </div>
      </v-card-title>
      <template v-if="!hidden">
        <v-card-text>
          {{ $vuetify.t('$vuetify.region') }}:
          <v-chip selected>
            <strong>{{ region }}</strong>
          </v-chip>
        </v-card-text>
        <v-card-text>
          {{ $vuetify.t('$vuetify.store') }}:
          <v-chip selected>
            <strong>{{ storeId }}</strong>
          </v-chip>
        </v-card-text>
        <v-card-text>
          {{ $vuetify.t('$vuetify.products') }}:
          <v-chip selected :key="id" v-for="id in productIds">
            <strong>{{ id }}</strong>
          </v-chip>
        </v-card-text>
      </template>
      <v-card-actions>
        <v-flex justify-start>
          <edit-block
            v-on:blockUpdated="onBlockUpdated"
            :buttonTitle="$vuetify.t('$vuetify.edit')"
            :blockId="_id"
          />
          <delete-block :buttonTitle="$vuetify.t('$vuetify.delete')" :blockId="_id"/>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import DeleteBlock from './DeleteBlock'
import EditBlock from './EditBlock'
import { BLOCK_REQUEST } from '../store/actions/block'

export default {
    components: {
        DeleteBlock,
        EditBlock
    },
    props: {
        _id: String,
        title: String,
        regionId: Number,
        storeId: Number,
        productIds: Array,
        active: Boolean
    },
    data: () => ({
        hidden: true
    }),
    computed: {
        region() {
            return this.regionId === -1 ? 'Все' : this.regionId
        }
    },
    methods: {
        onBlockUpdated(val) {
            this.$emit('blocksUpdated')
        },
        showContent() {
            this.hidden = !this.hidden
        }
    }
}
</script>
