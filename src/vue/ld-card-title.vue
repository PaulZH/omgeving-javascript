<template>
    <div class="ld-card-title">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>

<style lang="scss">
    @import "../css/_variables";

    .ld-card-title {
        background-color: $card-title-bg-color;
        color: $card-title-color;
        padding: 8px 16px;
        line-height: 30px;
        font-family: $font-header;
        font-size: 20px;

        a {
            color: $card-title-color !important;
        }
    }
</style>
