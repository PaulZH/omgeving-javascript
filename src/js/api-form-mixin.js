export default {
    props: {
        samples: String,
        endpoint: String
    },
    data() {
        return {
            inputValue: '',
            selectedSample: '',
            loading: false,
            sampleOptions: []
        }
    },
    computed: {},
    watch: {
        selectedSample(value) {
            this.inputValue = value.replace(/&quot;/g, '-');
        }
    },
    mounted() {
        this.fetchSamples();
    },
    methods: {
        fetchSamples() {
            if (!this.samples) {
                return;
            }

            if (!window.http) {
                return setTimeout(this.fetchSamples, 100);
            }

            window.http.get(this.samples).then(this.parseSamples);
        },

        onReset() {
            this.loading = false;
            this.selectedSample = '';
        },
    }
}
