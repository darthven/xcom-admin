<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-container>
          <div v-if="banners.length > 0">
            <banner
              v-for="(item, index) in banners"
              :item="item"
              :index="index"
              :key="item._id"
              :_id="item._id"
              :title="item.title"
              :body="item.body"
              :image="item.image"
              :startDate="new Date(item.startDate)"
              :endDate="new Date(item.endDate)"
              :regionId="item.regionId"
              :productIds="item.productIds"
              :show="item.show"
              v-on:bannersUpdated="onBannersUpdated"
            ></banner>
          </div>
          <div v-else class="empty">{{ $vuetify.t('$vuetify.noData') }}</div>
        </v-container>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { BANNERS_REQUEST } from './../store/actions/banner'
import Banner from './Banner'

export default {
    components: {
        Banner
    },
    created() {
        this.$store.dispatch(BANNERS_REQUEST)
    },
    computed: {
        banners() {
            return this.$store.getters.banners
        }
    },
    methods: {
        onBannersUpdated() {
            this.$store.dispatch(BANNERS_REQUEST)
        }
    }
}
</script>

<style scoped>
.empty {
    height: inherit;
    width: inherit;
    justify-content: center;
    text-align: center;
    font-size: 60px;
}
</style>
