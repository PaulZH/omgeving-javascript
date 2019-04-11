<template>
    <flex-item class="ld-predicate-container" :dsk="desktopWidth" mob="100" :no-gutter="isInBode" :class="{ 'is-in-bnode': isInBode }">
        <ld-card class="ld-predicate">
            <flex-container no-gutter>
                <flex-item class="label-container" dsk="33" mob="100" no-gutter></flex-item>
                <flex-item class="objects" dsk="66" mob="100" no-gutter>
                    <slot></slot>
                </flex-item>
            </flex-container>
        </ld-card>
    </flex-item>
</template>

<script>
    export default {
        data() {
            return {
                isInBode: false
            }
        },
        computed: {
            desktopWidth() {
                return this.isInBode ? 100 : 50;
            }
        },
        mounted() {
            this.moveLabel();
            this.checkBnodeContext();
        },
        methods: {
            moveLabel() {
                if (!this.$el || !this.$el.querySelector) {
                    return setTimeout(this.moveLabel, 100);
                }

                let $labelContainer = this.$el.querySelector('.label-container');
                if (!$labelContainer) {
                    return setTimeout(this.moveLabel, 100);
                }

                let $label = this.$el.querySelector('.objects > .label');
                if ($label) {
                    $labelContainer.appendChild($label);
                }
            },

            checkBnodeContext() {
                if (!this.$el || !this.$el.querySelector) {
                    return setTimeout(this.checkBnodeContext, 100);
                }

                if (this.$el.closest('.ld-object.bnode')) {
                    this.isInBode = true;
                }
            }
        }
    }
</script>

<style lang="scss">
@import "../css/_variables";

.ld-predicate-container {

    .ld-predicate {
        background-color: #fff;
        border-top: 2px solid $green-dark;

        .label-container {

            > .label {
                display: block;
                background-color: $green-dark;
                color: $white !important;
                text-align: right;
                line-height: 24px;
                padding: 4px 12px 6px 12px;
                text-transform: capitalize;
                overflow: hidden;
                text-decoration: none;
                text-overflow: ellipsis;

                &:hover {
                    text-decoration: none !important;
                }

                @media (max-width: $flex-mobile-max-width) {
                    text-align: left;
                }
            }
        }

        .objects {
            padding-bottom: 0 !important;
            overflow: auto;
            max-height: 400px;
        }
    }

    &.is-in-bnode {
        margin-top: 4px;

        &:first-child {
            margin-top: 0;
        }
    }
}
</style>
