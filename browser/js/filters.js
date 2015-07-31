app.filter("shortdesc", function () {
    return function(description) {
        if(description.length > 200) return description.slice(0, 200) + ".....";
        else return description;
    };
});

app.filter("getPrice", function () {
    return function(price) {
        return (price/100).toFixed(2)
    };
});