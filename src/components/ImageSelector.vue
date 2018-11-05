<template>
    <v-container>
        <img id="output"/>
        <input type="file" @change="selectImage($event)"/>    
    </v-container>
</template>

<script>
import { IMAGE_UPLOAD_REQUEST } from './../store/actions/uploadImage'

export default {
    methods: {
        selectImage(event) {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', this.file)
            this.$store.dispatch(IMAGE_UPLOAD_REQUEST, formData).then(res => {
                const output = document.getElementById('output')
                output.src = URL.createObjectURL(file)
                this.$emit('selectImage', file)
            })
        }
    }
}
</script>
