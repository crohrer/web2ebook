const kindlegen = require('kindlegen');
const fs = require('fs');
const Promise = require('bluebird')

function generateMobi({
	input,
	output
}){
	return new Promise((resolve, reject) => {
        kindlegen(fs.readFileSync(input), (error, mobi) => {
            // mobi is an instance of Buffer with the compiled mobi file
            fs.writeFile(output, mobi,  "binary", err => {
                if(!err) console.log('successfully built mobi file');
                resolve();
            });

        });
	})
}

module.exports = generateMobi
