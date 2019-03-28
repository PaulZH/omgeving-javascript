<template>
    <div class="ld-card">
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
        },

        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../css/_variables";

    .ld-card {
        @include box-shadow();
        background-color: #fff;

        + .ld-card {
            margin-top: 30px;
        }
    }
</style>
