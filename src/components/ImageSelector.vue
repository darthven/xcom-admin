<template>
    <v-container>
        <v-img v-if="url" :src="url"/>
        <input type="file" ref="file" accept="image/*" @change="selectImage"/>   
    </v-container>
</template>

<script>
import { IMAGE_UPLOAD_REQUEST } from './../store/actions/uploadImage'

export default {
    data: () => ({
        url: null
    }),
    methods: {
        selectImage() {
            const image = this.$refs.file.files[0]
            this.url = URL.createObjectURL(image)
            const formData = new FormData()
            formData.append('file', image, image.name)
            this.$emit('selectedImage', formData)
        }
    }
}
</script>
