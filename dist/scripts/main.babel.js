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
                    link: `http://en.wikipedia.org/wiki/${result.title}`,
                    excerpt: result.snippet.replace(/<(?:.|\n)*?>/gm, ''),
                })))
            })
        }
    }
});

function searchWiki(query, process) {
    const wikipediaQuery = `http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;

    fetch(wikipediaQuery)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            process(json)
        })
        .catch(err => console.log(err))
}

var inputTimeout = null;

document.querySelector('#search-text').addEventListener('input', e => {
  clearTimeout(inputTimeout)
  inputTimeout = setTimeout(() => {
    app.$data.search = e.target.value.trim()
    app.$data.startSearch()
  }, 500);
})
