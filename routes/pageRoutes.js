/*
<!--
    name: {type: String, required:true, unique:true},
    brand: {type: String, required: true},
    catagory: {type: String, required: true},
    image: {type: String, required: true},
    pictures: [{type: String, required: true}],
    picture_descriptions: [{type: String, required: true}],
    page_paragraphs: [{type: String, required: true}],
    date: {type: String, required: true, unique:true},
    rating: {type: String, required: true}
-->
*/

// Load required packages
var Page = require('../models/page');

// Create endpoint /api/beers for POST
exports.postPage = function(req, res) {
  // Create a new instance of the Beer model
  var page = new Page();
  // Set the beer properties that came from the POST data
    page.date = req.body.date;
	page.name = req.body.name;
    page.brand = req.body.brand;
    page.catagory = req.body.catagory;
    page.image = '/images/' + req.body.image;
    page.rating = req.body.rating;
    page.page_paragraphs = req.body.page_paragraphs;
    page.pictures = req.body.pictures;
    page.picture_descriptions = req.body.picture_descriptions;

    // Save the beer and check for errors
    page.save(function(err) {
        if(err) {
            res.json({ message: 'Post failed!', data: err});
        }
        else {
            res.json({ message: 'Post added!', data: page });
        }
  });
};

// Create endpoint /api/pages for GET
exports.getPages = function(req, res) {
  console.log(req);
  // Use the Page model to find all pages
  Page.find({}, function(err, pages) {
        if(err) {
            res.json({ message: 'Get failed!', data: err});
        }
        else {
            res.json({ message: 'Get succeded!', data: pages });
        }
  });
};

// Create endpoint /api/page/:page_id for GET
exports.getPage = function(req, res) {
  // Use the Beer model to find a specific page
  Page.find({nameame: req.params.name }, function(err, page) {
        if(err) {
            res.json({ message: 'Get failed!', data: err});
        }
        else {
            res.json({ message: 'Get succeded!', data: page });
        }
  }).sort('-postDate');
};

// Create endpoint /api/pages/:page_id for PUT
exports.putPage = function(req, res) {
  Page.update({name: req.params.name }, { 

    date: req.body.date,
	name: req.body.name,
    brand: req.body.brand,
    catagory: req.body.catagory,
    image: req.body.image,
    rating: req.body.rating,
    page_paragraphs: req.body.page_paragraphs,
    pictures: req.body.pictures,
    picture_descriptions: req.body.picture_descriptions,

}, function(err, num, raw) {
    if(err) {
        res.json({ message: 'Update failed!', data: err});
    }
    else {
        Page.find({name: req.params.name }, function(err, page) {
            if(err) {
                res.json({ message: 'Update succeded but GET failed!', data: err});
            }
            else {
                res.json({ message: 'Update succeded!', data: page });
            }
        }).sort('-postDate');
    }
  });
};
// Create endpoint /api/page/:page_id for DELETE
exports.deletePage = function(req, res) {
  // Use the Page model to find a specific page and remove it
  Page.remove({name: req.params.name }, function(err) {
        if(err) {
            res.json({ message: 'Delete failed!'});
        }
        else {
            res.json({ message: 'Post deleted!'});
        }
  });
};
