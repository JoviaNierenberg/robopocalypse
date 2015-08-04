app.factory('Stores', function($http) {
    var injectedSlugs = [];
    var head = document.getElementsByTagName("head")[0];
    return {
        // returns all stores
        getAll: function() {
            return $http.get('/api/store').then(function(res) {
                return res.data
            })
        },
        getStore: function(url) {
            return $http.get('/api/store/' + url).then(function(res) {
                return res.data;
            });
        },
        injectCss: function(slug) {
            if(injectedSlugs.indexOf(slug) === -1){
                injectedSlugs.push(slug);
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = "custom/" + slug + ".css";
                head.appendChild(link);
            }
        }
    };
});