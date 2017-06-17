const app = new Moon({
    el: "#app",
    data: {
        search: "",
        results: []
    },
    methods: {
        startSearch: function() {
            searchWiki(this.get('search'), json => {
                this.set('results', json.query.search.map(result => ({
                    title: result.title,
                    link: `https://en.wikipedia.org/wiki/${result.title}`,
                    excerpt: result.snippet.replace(/<(?:.|\n)*?>/gm, ''),
                })))
            })
        }
    }
});

function searchWiki(query, process) {
    const wikipediaQuery = `http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&utf8=`;

    fetch(wikipediaQuery)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            process(json)
        })
        .catch(err => console.log(err))
}
