$.get("http://www.joc.com/rssfeed/8995.xml", function (data) {
    $(data).find("entry").each(function () { // or "item" or whatever suits your feed
        var el = $(this);

        console.log("------------------------");
        console.log("title      : " + el.find("title").text());
        console.log("author     : " + el.find("author").text());
        console.log("description: " + el.find("description").text());
    });
});
