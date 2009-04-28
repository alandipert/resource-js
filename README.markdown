About
=========================
This is a simple class, Resource,  that emulates the behavior of the Ruby RestClient lib. Once you have a Resource instance, you can PUT/POST/DELETE/GET to it.

Example Syntax
=========================

      var r = new Resource("/blog/post");
      r.post({ title : "some title", body : "some body." }, function(data) {
        alert("A new post has been POSTed");
      });

      var r = new Resource("/blog");
      r.sub("post").get(function(data) {
        alert("This is all the posts: "+data);
      });

Dependencies
==========================================
*   [jQuery](http://jquery.com/)
*   [json2.js](http://www.json.org/json2.js)

Props
==========================================
*   [RestClient](http://github.com/adamwiggins/rest-client/tree/master)
