<template>
  <v-btn @click="visible = true" flat>
    {{ buttonTitle }}
    <v-dialog v-model="visible" max-width="500px">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >{{ $vuetify.t('$vuetify.uploadFile') }}</v-card-title>
        <v-card-actions class="pa-3">
          <input type="file" ref="file" :accept="fileType" @change="selectFile">
          <v-btn
            color="primary"
            :disabled="!file || fileUploaded"
            flat
            @click="uploadFile"
          >{{ $vuetify.t('$vuetify.upload') }}</v-btn>
          <v-btn color="primary" flat @click="close">{{ $vuetify.t('$vuetify.close') }}</v-btn>
        </v-card-actions>
        <v-alert
          transition="scale-transition"
          :value="file && fileUploaded"
          type="success"
        >{{ $vuetify.t('$vuetify.fileSuccess') }}</v-alert>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
export default {
    props: {
        buttonTitle: String,
        fileType: String,
        action: String,
        fileName: String
    },
    data: () => ({
        visible: false,
        file: null,
        fileUploaded: false
    }),
    methods: {
        selectFile() {
            this.file = this.$refs.file.files[0]
        },
        uploadFile() {
            const formData = new FormData()
            formData.append(this.fileName, this.file, this.file.name)
            this.$store.dispatch(this.action, formData).then(res => {
                this.fileUploaded = true
            })
        },
        close() {
            this.file = null
            this.fileUploaded = false
            this.visible = false
        }
    }
}
</script>
