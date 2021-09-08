const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const port = 8089;


app.use(cors());

const storage = multer.diskStorage({
	destination: path.join(__dirname, './public/', 'Uploads'),
	filename: function (req, file, cb) {   
		// null as first argument means no error
		cb(null, Date.now() + '-' + file.originalname )
	}
})



// var express = require("express"),
//     app = express(),
//     formidable = require('formidable'),
//     util = require('util'),
//     fs   = require('fs-extra'),
//     qt   = require('quickthumb');

// // Use quickthumb
// app.use(qt.static(__dirname + '/'));

// app.post('/upload', function (req, res){
//   var form = new formidable.IncomingForm();
//   form.parse(req, function(err, fields, files) {
//     res.writeHead(200, {'content-type': 'text/plain'});
//     res.write('received upload:\n\n');
//     res.end(util.inspect({fields: fields, files: files}));
//   });

//   form.on('end', function(fields, files) {
//     /* Temporary location of our uploaded file */
//     var temp_path = this.openedFiles[0].path;
//     /* The file name of the uploaded file */
//     var file_name = this.openedFiles[0].name;
//     /* Location where we want to copy the uploaded file */
//     var new_location = 'Uploads/';

//     fs.copy(temp_path, new_location + file_name, function(err) {  
//       if (err) {
//         console.error(err);
//       } else {
//         console.log("success!")
//       }
//     });
//   });
// });

app.post('/upload', async (req, res) => {	
	try {
		// 'avatar' is the name of our file input field in the HTML form
		let upload = multer({ storage: storage}).single('avatar');
		upload(req, res, function(err) {
			if (!req.file) {
				return res.send('Please select an image to upload');
			}else if (err instanceof multer.MulterError) {
				return res.send(err);
			}else if (err) {
				return res.send(err);
			}

			const imageResize = {
				image: req.file.filename
			}
			const sql = "INSERT INTO posts SET ?";
			connection.query(sql, imageResize, (err, results) => {  if (err) throw err;
				res.json({ success: 1 })    
			});
		});

	} catch (err) {console.log(err)}
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

