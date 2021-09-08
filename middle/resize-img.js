const  resizeImage = require("easy-image-resizer");


//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '/public/Uploads');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
		
		const initialFile = path.join(directoryPath, file);
		const finalFile = path.join(directoryPath, "min_"+file);
		
				console.log("file:" +initialFile)
		const image = await resizeImage(initialFile, { maxWidth: 120, maxHeight: 120 });
		fs.writeFileSync(finalFile, image);		
		

		//resize-image -i bigImage.png -o icon.png -h 64



    });
})

