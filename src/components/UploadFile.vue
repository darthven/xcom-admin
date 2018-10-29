<template>
    <v-app id="upload-dialog">
        <v-content>
            <v-btn 
                @click="open"
                color="primary"
            >{{ title }}</v-btn>
            <v-dialog v-model="visible" max-width="500px">
                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                        Upload File
                    </v-card-title>
                    <v-card-actions class="pa-3">
                        <input type="file" @change="selectFile($event)"/>
                        <v-btn color="primary" :disabled="!fileSelected || fileUploaded" flat @click="uploadFile">Upload</v-btn>
                        <v-btn color="primary" flat @click="hide">Close</v-btn>
                    </v-card-actions>
                    <v-alert transition="scale-transition" :value="wrongFileType" type="error">
                        Wrong file type!
                    </v-alert>
                    <v-alert transition="scale-transition" :value="fileSelected && fileUploaded" type="success">
                        File was successfully uploaded
                    </v-alert>
                </v-card>
            </v-dialog>
        </v-content>
    </v-app>  
</template>

<script>
import { SHOW_DIALOG, HIDE_DIALOG } from './../store/actions/dialog'
import { DISCOUNT_UPLOAD_REQUEST } from './../store/actions/uploadDiscount.js'

export default {
    props: {
        title: String,
        fileType: String
    },
    data: () => ({
        visible: false,
        fileSelected: false,
        wrongFileType: false,
        fileUploaded: false
    }),
    methods: {
        open() {
            this.$store.dispatch(SHOW_DIALOG).then(res => (this.visible = res))
        },
        hide() {
            this.$store.dispatch(HIDE_DIALOG).then(res => {
                this.visible = res
                this.fileSelected = false
                this.wrongFileType = false
                this.fileUploaded = false
            })
        },
        selectFile(event) {
            const file = event.target.files[0]
            console.log(file)
            if (file.type === this.fileType) {
                if (this.wrongFileType) {
                    this.wrongFileType = false
                }
                this.fileSelected = true
            } else {
                if (this.fileSelected) {
                    this.fileSelected = false
                }
                this.wrongFileType = true
            }
        },
        uploadFile() {
            this.$store.dispatch(DISCOUNT_UPLOAD_REQUEST, { x: 23 }).then(res => {
                console.log(res)
                this.fileUploaded = true
            })
        }
    }
}
</script>

<style scoped>
/* input {
        visibility: hidden
    } */
</style>
