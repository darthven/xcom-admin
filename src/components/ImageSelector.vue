<template>
    <v-container>
        <img v-if="url" :src="url"/>
        <input type="file" accept="image/*" @change="selectImage($event)"/>    
    </v-container>
</template>

<script>
import { IMAGE_UPLOAD_REQUEST } from './../store/actions/uploadImage'

export default {
    data: () => ({
        url: null
    }),
    methods: {
        selectImage(event) {
            const image = event.target.files[0]
            const formData = new FormData()
            this.url = URL.createObjectURL(image)
            formData.append('file', image)
            console.log('Formdata', formData)
            this.$emit('selectedImage', formData)
        }
    }
}
</script>
