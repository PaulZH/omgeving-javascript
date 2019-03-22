<template>
    <div class="ld-view">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },

        computed: {
        },

        mounted() {
            document.querySelector('body').style.opacity = 1;
        },

        methods: {
        }
    }
</script>

<style lang="scss">
    body {
        transition: opacity 1s;
    }
</style>
<style lang="scss" scoped>
    .ld-view {
    }
</style>
