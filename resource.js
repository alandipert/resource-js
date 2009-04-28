/*
 * Resource: a JavaScript RestClient::Resource clone
 *
 * This script provides a Resource class that lets you
 * create resources and put/post/delete/get to them with a 
 * callback.  The syntax is modelled after RestClient::Resource,
 * a way cool Ruby thing.
 *
 * Example:

//start off with our sinatra-powered blog webservice that speaks json:
var r = new Resource("/blog/post");

//alternative:
//var b = new Resource("/blog");
//var r = b.sub("post");


//add a post, receive the json server response
r.post({ title : "consider me...", body : "deleted." }, function(data) {
  //cull the new post's ID from the server response, and delete it.
  r.del(JSON.parse(data).id, alert('it is done.'))
});
  
 * Requirements:
 *   jQuery: http://jquery.com/
 *   json2.js: http://www.json.org/json2.js
 *
 * Props:
 *   RestClient: http://rest-client.heroku.com/rdoc/
 *
 * Codez:
 *   http://github.com/alandipert/
 */
function _ajax_request(url, data, callback, type, method) {
  return jQuery.ajax({
    type: method,
    url: url,
    data: data,
    success: callback,
    dataType: type
  });
}

jQuery.extend({
  put: function(url, data, callback, type) {
      return _ajax_request(url, data, callback, type, 'PUT');
  },
  del: function(url, data, callback, type) {
      return _ajax_request(url, data, callback, type, 'DELETE');
  }
});

function Resource(url) {

  this.url = url;

  var toJSON = JSON.stringify;

  this.append = function(rel) {
    if(!rel) {
      return this.url;
    } else {
      if(this.url == "/") {
        if(rel.charAt(0) == "/") {
          return rel;
        } else {
          return '/'+rel;
        }
      }
      if(this.url.charAt(this.url.length-1) == '/' && rel.charAt(0) == '/') {
        rel = rel.substring(1);
      }
    }
    return this.url+'/'+rel;
  };

  this.getopt = function(args) {
    if(args.length == 3) {
      return { what : args[0], obj : args[1], callback : args[2] };
    } else {
      return { what : this.url, obj : args[0], callback : args[1] };
    }
  };

  this.get = function(what, callback) {
    jQuery.get(
      arguments.length > 1 ? this.append(what) : this.url,
      arguments.length > 1 ? callback : what
    );
  };

  this.post = function(what, obj, callback) {
    var opts = this.getopt(arguments);
    jQuery.post(
      opts.what,
      { data : toJSON(opts.obj) },
      opts.callback
    );
  }; 

  this.put = function(what, obj, callback) {
    var opts = this.getopt(arguments);
    jQuery.put(
      opts.what,
      { data : toJSON(opts.obj) },
      opts.callback
    );
  };

  this.del = function(what, callback) {
    jQuery.del(
      arguments.length > 1 ? this.append(what) : this.url,
      arguments.length > 1 ? callback : what
    );
  }; 

  this.sub = function(subres) {
    return new Resource(this.append(subres));
  }
}
