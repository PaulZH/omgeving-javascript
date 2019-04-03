<template>
    <div class="ld-data-table" :class="{ loading: loading }">
        <ld-card>
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
                    <tr v-for="(row, index) in rows">
                        <td class="row-index">{{ index + offset + 1 }}</td>
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
            <div class="loader" :class="{ loading: loading }"></div>
            <div class="controls">
                <flex-container>
                    <flex-item dsk="50" tab="100" class="search">
                        <input type="text" v-model="search" placeholder="Filteren ..." />
                    </flex-item>
                    <flex-item dsk="50" tab="100" class="pagination">
                        <span class="info" v-if="pageCount">
                            Pagina {{ page }}/{{ pageCount }} ({{ rowCount.toLocaleString() }} treffers)
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
                offset: null,
                prevOffset: null,
                nextOffset: null,
                rowCount: null,
                page: 1,
                pageSize: 10,
                pageCount: 0,
                sortField: null,
                sortDirection: 'ASC',
                queryTemplate: '',
                countQueryTemplate: '',
                search: '',
                fields: [],
                rows: []
            }
        },

        watch: {
            queryTemplate(value) {
                if (value) {
                    this.offset = 0;
                }
            },
            offset(value) {
                if (value !== null) {
                    this.fetchRows();
                }

                if (value === 0) {
                    this.countRows();
                }

                this.calculateOffsets();
            },
            rowCount(value) {
                this.pageCount = Math.ceil(value / this.pageSize);
                this.calculateOffsets();
            },
            rows(value) {
                this.$nextTick(this.calculateOffsets)
            },
            sortField() {
                this.fetchRows();
            },
            sortDirection() {
                this.fetchRows();
            },
            search: _.debounce(function(value) {
                this.offset = 0;
                this.rowCount = 0;
                this.pageCount = 0;
                this.fetchRows();
                this.countRows();
            }, 500),
        },

        mounted() {
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
            fetchRows() {
                const query = this.queryTemplate
                    .replace(/%resource%/g, this.resource)
                    .replace(/(}[^}]*)$/, ' ' + this.getFilters() + '$1')
                    + (this.sortField ? ` ORDER BY ${this.sortDirection}(?${this.sortField})` : '')
                    + ` LIMIT ${this.pageSize} OFFSET ${this.offset}`
                ;
                this.runQuery(query, (response) => {
                    this.fields = response.vars.map((field) => {
                        return {
                            name: field,
                            label: field
                        }
                    });
                    this.rows = response.rows;
                })

            },
            countRows() {
                if (!this.countQueryTemplate) {
                    return setTimeout(this.countRows, 500);
                }

                const query = this.countQueryTemplate
                    .replace(/%resource%/g, this.resource)
                    .replace(/(}[^}]*)$/, ' ' + this.getFilters() + '$1')
                ;
                this.runQuery(query, (response) => {
                    this.rowCount = parseInt(response.rows[0].count.value);
                })
            },
            calculateOffsets() {
                if (this.rowCount) {
                    this.prevOffset = Math.max(0, this.offset - this.pageSize);
                    this.nextOffset = this.offset + this.pageSize;
                    if (this.nextOffset > this.rowCount - 1) {
                        this.nextOffset = this.offset;
                    }

                    this.page = 1 + Math.ceil(this.offset / this.pageSize);
                } else {
                    this.prevOffset = this.nextOffset = null;
                    this.page = 0;
                }
            },

            onSubmit(event) {
                event.preventDefault();
            },

            sort(field) {
                if (field.name === this.sortField) {
                    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
                } else {
                    this.sortField = field.name;
                    this.sortDirection = 'ASC';
                }
            },

            getFilters() {
                if (!this.search.trim().length || !this.searchFields.trim().length) {
                    return '';
                }

                let searchFields = this.searchFields.split(/\s+/);
                let filters = this.search.split(/\s+/).filter(keyword => !keyword.match(/^\s*$/)).map((keyword) => {
                    return '(' + searchFields.map((field) => {
                        keyword = keyword.replace(/["';<>]/, '');
                        return keyword.length
                            ? `regex(${field}, "${keyword.replace(/["';<>]/, '')}", "i")`
                            : '';
                    }).join(' || ') + ')'
                });
                return `FILTER(${filters.join(' ) && ( ')})`;
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
                margin-right: 7px;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                padding: 0 12px;
                line-height: 36px;
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
                    line-height: 36px;
                    color: #fff;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
