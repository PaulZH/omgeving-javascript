export default {
    props: {
        endpoint: String
    },
    data() {
        return {
            loading: 0,
            requests: {},
            queryCache: {}
        }
    },
    methods: {
        runQuery(query, callback) {
            if (this.queryCache[query]) {
                return callback(this.queryCache[query]);
            }

            this.loading++;
            const requestId = query;
            this.$http.post(
                this.endpoint,
                {
                    query: query
                },
                {
                    credentials: true,
                    emulateJSON: true,
                    before(request) {
                        if (this.requests[requestId]) {
                            this.requests[requestId].abort();
                        }

                        this.requests[requestId] = request;
                    }
                }
            )
            .then(response => {
                this.loading--;
                this.requests[requestId] = null;
                this.queryCache[query] = {
                    vars: response.body.head.vars,
                    rows: response.body.results.bindings
                };
                callback(this.queryCache[query]);
            }, error => {
                this.loading--;
                console.log('Error, possibly just aborted', error)
            })
        },

        getFieldLabel(name, row) {
            if (row[`_${name}Label`]) {
                return row[`_${name}Label`].value;
            } else {
                return row[name].value.replace(/^.*[\/#]([^\/#]+)$/, '$1');
            }
        }
    }
}
