About
=========================
This is a simple class, Resource,  that emulates the behavior of the Ruby RestClient lib.  It allows simple REST operations on named resources by wrapping jQuery's Ajax call.

Example Syntax
=========================

      var r = new Resource("/blog/post");
      r.post({ title : "some title", body : "some body." }, function(data) {
        alert("A new post has been POSTed");
      });

      var r = new Resource("/blog");
      var p = r.sub("post");
      p.get(function(data) {
        alert("This is all the posts: "+data);
      });

Dependencies
==========================================
jQuery: http://jquery.com/
json2.js: http://www.json.org/json2.js

Props
==========================================
http://rest-client.heroku.com/rdoc/
