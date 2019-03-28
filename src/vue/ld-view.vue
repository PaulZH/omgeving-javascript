<template>
    <div class="ld-view">
        <department-header>
            <a href="https://www.vlaanderen.be/nl">Vlaanderen</a>
            <a href="https://www.lne.be/">Departement Omgeving</a>
            <a href="/">Linked Data</a>
        </department-header>
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
    @import "../css/theme";

</style>
<style lang="scss" scoped>
    .ld-view {
    }
</style>
