document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = document.getElementById('query').value;
    fetchSearchResults(query);
});

function fetchSearchResults(query) {
    var apiKey = 'Votre_clé_d_API_Bing';
    var url = 'https://api.cognitive.microsoft.com/bing/v7.0/search?q=' + encodeURIComponent(query);

    fetch(url, {
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data.webPages.value);
    })
    .catch(error => {
        console.error('Error fetching search results:', error);
    });
}

function displayResults(results) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    results.forEach(function(result) {
        var resultItem = document.createElement('div');
        resultItem.classList.add('result');

        var link = document.createElement('a');
        link.href = result.url;
        link.textContent = result.name;
        resultItem.appendChild(link);

        var domain = document.createElement('span');
        domain.classList.add('domain');
        domain.textContent = '(' + getDomain(result.url) + ')';
        resultItem.appendChild(domain);

        resultsContainer.appendChild(resultItem);
    });
}

function getDomain(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
}
