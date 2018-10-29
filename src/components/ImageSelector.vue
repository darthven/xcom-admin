<template>
    <v-container>
        <img id="output"/>
        <input type="file" @change="selectImage($event)"/>    
    </v-container>
</template>

<script>
export default {
    methods: {
        selectImage(event) {
            const file = event.target.files[0]
            const output = document.getElementById('output')
            output.src = URL.createObjectURL(file)
            this.$emit('selectImage', file)
        }
    }
}
</script>
