<template>
    <flex-container class="ld-subject">
        <slot></slot>
    </flex-container>
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

.ld-subject {
    padding-top: 32px;
    font-size: 16px;
}

hr + .ld-subject {
    padding-top: 16px;
}

.ld-card-content .ld-subject:first-child {
    padding-top: 16px;
}
</style>
