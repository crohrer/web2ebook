const kindlegen = require('kindlegen');
const fs = require('fs');

function generateMobi({
	input,
	output
}){
	kindlegen(fs.readFileSync(input), (error, mobi) => {
		// mobi is an instance of Buffer with the compiled mobi file
		fs.writeFile(output, mobi,  "binary", function(err) { });
	});
}

module.exports = generateMobi
