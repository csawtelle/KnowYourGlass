// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var PageSchema   = new mongoose.Schema({
    name: {type: String, required:true, unique:true},
    brand: {type: String, required: true},
    catagory: {type: String, required: true},
    image: {type: String, required: true},
    pictures: [{type: String, required: true}],
    picture_descriptions: [{type: String, required: true}],
    page_paragraphs: [{type: String, required: true}],
    date: {type: String, required: true},
    rating: {type: String, required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('Page', PageSchema);

