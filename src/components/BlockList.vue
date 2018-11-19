<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center align-center>  
                <v-container> 
                    <div v-if="blocks.length > 0">
                        <block
                            v-for="(item, index) in blocks"
                            :item="item"
                            :index="index"
                            :key="item._id"
                            :_id="item._id"
                            :title="item.title"
                            :region="item.region"
                            :store="item.store"
                            :productIds="item.productIds"
                            :active="item.active"
                            v-on:blocksUpdated="onBlocksUpdated"
                        ></block>
                    </div>
                    <div v-else class="empty">
                        {{ $vuetify.t('$vuetify.noData') }}
                    </div>
                </v-container>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import { BLOCKS_REQUEST } from './../store/actions/block'
import Block from './Block'

export default {
    components: {
        Block
    },
    created() {
        this.$store.dispatch(BLOCKS_REQUEST)
    },
    computed: {
        blocks() {
            return this.$store.getters.blocks
        }
    },
    methods: {
        onBlocksUpdated() {
            this.$store.dispatch(BLOCKS_REQUEST)
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
