<template>
    <v-btn 
        @click="visible = true"
        flat
        >
        {{ buttonTitle }}
        <v-dialog v-model="visible" max-width="500px">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Upload File
                </v-card-title>
                <v-card-actions class="pa-3">
                    <input type="file" accept="text/csv" @change="selectFile($event)"/>
                    <v-btn color="primary" :disabled="!file || fileUploaded" flat @click="uploadFile">Upload</v-btn>
                    <v-btn color="primary" flat @click="visible = false">Close</v-btn>
                </v-card-actions>
                <v-alert transition="scale-transition" :value="file && fileUploaded" type="success">
                    File was successfully uploaded
                </v-alert>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
import { DISCOUNT_UPLOAD_REQUEST } from './../store/actions/uploadDiscount.js'

export default {
    props: {
        buttonTitle: String,
        fileType: String
    },
    data: () => ({
        visible: false,
        file: null,
        fileUploaded: false
    }),
    methods: {
        selectFile(event) {
            this.file = event.target.files[0]
        },
        uploadFile() {
            const formData = new FormData()
            formData.append('file', this.file, this.file.name)
            this.$store.dispatch(DISCOUNT_UPLOAD_REQUEST, formData).then(res => {
                this.fileUploaded = true
            })
        }
    }
}
</script>
