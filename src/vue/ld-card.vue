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
        }
    }
</script>

<style lang="scss" scoped>
    @import "../css/_variables";

    .ld-card {
        @include box-shadow();
        background-color: #fff;

        + .ld-card {
            margin-top: 32px;
        }
    }
</style>
