<template>
    <div class="flex-container" :class="{stretch: align === 'stretch'}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            'align': String,
        },
        data() {
            return {
            }
        }
    }
</script>

<style lang="scss">
@import "../css/_variables";

.flex-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    flex: 1 1 auto;
    margin-left: -$flex-gutter-width;
    margin-right: -$flex-gutter-width;

    &.stretch {
        align-items: stretch;
        align-content: stretch;

        .flex-item > * {
            height: 100%;
        }
    }
}
</style>
