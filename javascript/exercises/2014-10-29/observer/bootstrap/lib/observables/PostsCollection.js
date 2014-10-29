/* global require, module */

var Observable = require('./Observable');

// Extend Observable
function PostsCollection() {
  'use strict';
  this.posts = [];

}

PostsCollection.prototype.addPost = function (title, content) {
  'use strict';
  // Add post and notify about the change

  console.log('Received: ' + title + ' ' + content);

  var newPost = { 
  	title: title, 
  	content: content
  };

  this.posts.push(newPost);
};



module.exports = PostsCollection;

