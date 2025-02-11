const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// Configuration 
cloudinary.config({
  cloud_name:"dhicxgajn",
  api_key:"429595718117639",
  api_secret:"zq8QNlReg8jEZvAQlC9Pd_-ttU4"
});


// cloudinary.config({
//   cloud_name: "dejqyvuqj",
//   api_key: "417793673286124",
//   api_secret: "hfqsAv740sSVcXiSdVb2RAaBp2s"
// });


module.exports = cloudinary;



// Upload

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });


// // Generate 
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: 'fill'
// });



// // The output url
// console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag