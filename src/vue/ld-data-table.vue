<template>
    <div class="ld-data-table" :class="{ loading: loading }">
        <ld-card>
            <div class="loader" :class="{ loading: loading }"></div>
            <div class="rows">
                <table>
                    <thead>
                        <tr>
                            <th class="row-index">#</th>
                            <th v-for="field in fields" v-if="!field.name.match(/^_/)" @click="sort(field)">
                                {{ field.label }}
                                <v-icon v-if="sortField === field.name" class="sort-arrow" :class="{desc: sortDirection === 'DESC'}">arrow_upward</v-icon>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="!loading && rowCount === 0">
                            <td colspan="100">0 treffers</td>
                        </tr>
                        <tr v-for="(row, index) in rows">
                            <td class="row-index">{{ index + loadedOffset + 1 }}</td>
                            <td v-for="field in fields" v-if="!field.name.match(/^_/)">
                                <span v-if="!row[field.name]">-</span>
                                <a v-else-if="row[field.name].type === 'uri'" :href="row[field.name].value">
                                    {{ getFieldLabel(field.name, row) }}
                                </a>
                                <span v-else>{{ row[field.name].value }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="controls">
                <flex-container>
                    <flex-item dsk="50" tab="100" class="search">
                        <input type="text" v-model="search" placeholder="Filteren ..." />
                    </flex-item>
                    <flex-item dsk="50" tab="100" class="pagination">
                        <span class="info">
                            <span class="page-info" v-if="pageCount">
                                Pagina {{ page }}/{{ pageCount }}
                            </span>
                            <span class="row-count" v-if="rowCount !== null">
                                ({{ rowCount.toLocaleString() }} treffer{{ rowCount !== 1 ? 's' : ''}})
                            </span>
                        </span>
                        <button v-if="prevOffset !== null" @click="offset = prevOffset" :title="prevOffset" :class="{ disabled: offset === prevOffset}">
                            <v-icon>chevron_left</v-icon>
                        </button>
                        <button v-if="nextOffset !== null" @click="offset = nextOffset" :title="nextOffset" :class="{ disabled: offset === nextOffset}">
                            <v-icon>chevron_right</v-icon>
                        </button>
                    </flex-item>
                </flex-container>
            </div>
        </ld-card>
    </div>
</template>

<script>
    import sparqlMixin from '../js/sparql-mixin';
    export default {
        mixins: [sparqlMixin],
        props: ['query', 'countQuery', 'resource', 'searchFields'],
        data() {
            return {
            }
        },

        watch: {
            queryTemplate(value) {
                if (value) {
                    this.fetchRows();
                }
            }
        },

        mounted() {
            this.sortFields = this.searchFields || 'uri';
            this.sortField = this.sortFields.split(/[,\s]/).shift();
            this.fetchQueryTemplate();
            this.fetchCountQueryTemplate();
        },

        methods: {
            fetchQueryTemplate() {
                this.$http.get(this.query).then((response) => {
                    this.queryTemplate = response.body;
                });
            },
            fetchCountQueryTemplate() {
                this.$http.get(this.countQuery).then((response) => {
                    this.countQueryTemplate = response.body;
                });
            },
            sort(field) {
                if (field.name === this.sortField) {
                    this.sortDirection = (this.sortDirection === 'ASC') ? 'DESC' : 'ASC';
                } else {
                    this.sortField = field.name;
                    this.sortDirection = 'ASC';
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../css/_variables";

    .ld-data-table {
        transition: opacity 0.5s;

        .ld-card {
            min-height: 400px;
        }

        &.loading {
            td, .controls {
                opacity: 0.8;
            }
        }

        .rows {
            min-height: 300px;

            table {
                width: 100%;
                max-width: 100%;
                font-size: 16px;
                background-color: #fff;
                border-collapse: collapse;
                border-spacing: 0;
                margin: 0;
                position: relative;
                overflow: auto;

                thead {
                    vertical-align: middle;

                    th {
                        vertical-align: bottom;
                        margin: 0;
                        text-align: left;
                        padding: 0 16px;
                        font-family: $font-text-light;
                        color: $grey-dark;
                        font-size: 16px;
                        line-height: 40px;
                        border-bottom: 2px solid $green;
                        cursor: pointer;

                        .sort-arrow {
                            font-size: 18px;

                            &.desc {
                                transform: rotate(-180deg);
                            }
                        }

                        &.row-index {
                            text-align: right;
                        }
                    }
                }

                tbody {
                    td {
                        text-align: left;
                        padding: 8px 16px;
                        border-bottom: 1px solid $grey-light;
                        background-color: #fff;
                        line-height: 20px;
                        vertical-align: top;
                        color: #5e5e5e;

                        &.row-index {
                            text-align: right;
                        }
                    }

                    tr:nth-child(even) td {
                        background-color: #f9f9f9;
                    }
                }
            }
        }


        .controls {
            padding: 16px 16px 0;

            input {
                width: 100%;
                padding: 8px 10px;
                font-size: 14px;
                line-height: 18px;
                border: 1px solid $border-color-dark;
                vertical-align: top;
                margin-bottom: 5px;

                &:focus {
                    border: 1px solid $border-color-green;
                }
            }

            .pagination {
                text-align: right;
                .info {
                    vertical-align: middle;
                    display: inline-block;
                    line-height: 36px;
                    font-size: 16px;
                    padding: 0 16px;
                }
            }

            button {
                display: inline-block;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                height: 36px;
                width: 36px;
                background-color: $green;
                border: none;

                &.disabled {
                    cursor: default;
                    background-color: $grey-light;
                    &:hover, &:focus, &::-moz-focus-inner {
                        cursor: default;
                        background-color: $grey-light;
                    }
                }

                &:hover, &:focus, &::-moz-focus-inner {
                  background-color: #42796d;
                  outline: 0;
                  border: 0;
                }

                .v-icon {
                    height: 36px;
                    width: 36px;
                    color: #fff;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
