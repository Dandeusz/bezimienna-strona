var mongoose     = require("mongoose"),
    Kwiat        = require("./kwiat"),
    Comment      = require("./Comment");

// var data = [
//     {
//         name: "Kwiatuszek",
//         image: "https://ocdn.eu/pulscms-transforms/1/T6Pk9kqTURBXy81OWVkY2RmZTdkMWQwZGQwZWUwZjI1ODY0MDUyNWMwYS5qcGVnkpUDGADNAm7NAV6TBc0DFM0BvIGhMAE",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//         price: "15 PLN"
//     },
//     {
//         name: "Kwiatuś",
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Osteospermum_ecklonis1.JPG/1200px-Osteospermum_ecklonis1.JPG",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//         price: "13 PLN"
//     },
//     {
//         name: "Kwiatunio",
//         image: "https://organis.pl/wp-content/uploads/2018/08/Kwiat-rumianku-w%C5%82a%C5%9Bciwo%C5%9Bci-lecznicze-1200x800.jpeg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//         price: "10 PLN"
//     }
// ]


function seedDB(){
    //Remove all campgrounds
    Kwiat.remove({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed campgrounds!");
         Comment.remove({}, function(err) {
             if(err){
                 console.log(err);
             }
             console.log("removed comments!");
              //add a few campgrounds
             data.forEach(function(seed){
                 Kwiat.create(seed, function(err, campground){
                     if(err){
                         console.log(err)
                     } else {
                         console.log("added a campground");
                         //create a comment
                         Comment.create(
                             {
                                 text: "This place is great, but I wish there was internet",
                                 author: "Homer"
                             }, function(err, comment){
                                 if(err){
                                     console.log(err);
                                 } else {
                                     campground.comments.push(comment);
                                     campground.save();
                                     console.log("Created new comment");
                                 }
                             });
                     }
                 });
             });
         });
     });}



module.exports = seedDB;