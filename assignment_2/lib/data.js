/*
* LIBRARY for storing and editing data
*/

// dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');


// container for the the module (to be exported)
var lib = {};

// base directory of the data folder 
lib.baseDir = path.join(__dirname,'/../.data');

// write date to a file 
lib.create = function(dir, file, data, callback) {
	// open the file for writing
	filename = lib.baseDir+'/'+dir+'/'+file+'.json';
	console.log(filename);
	fs.open(filename,'wx',function(err,fileDescriptor){
		if (!err && fileDescriptor) {
			// convert data to string
			var stringData = JSON.stringify(data);

			// write to file and close it
			fs.writeFile(fileDescriptor, stringData, function(err){
				if (!err) {
					fs.close(fileDescriptor, function(err){
						if (!err) {
							callback(false);
						} else {
							callback('Error closing new file')
						}
					});

				} else {
					callback('Error writing to new file')
				}
			});
		} else {
			callback("Could not create new file, it may already exist");
		}
	})

};

// read data from a file
lib.read = function(dir, file, callback) {
	filename = lib.baseDir+'/'+dir+'/'+file+'.json';
	fs.readFile(filename,'utf-8', function(err, data){
		if (!err && data) {
			var parseData = helpers.parseJsonToObject(data);
			callback(false,parseData);
		} else {
			callback(err,data);
		}
	});
};

// Update data inside a file
lib.update  = function(dir, file, data, callback) {
	// open the file for writing
	filename = lib.baseDir+'/'+dir+'/'+file+'.json';
	fs.open(filename,'r+',function(err,fileDescriptor){
		if (!err && fileDescriptor) {
			var stringData = JSON.stringify(data);
			// truncate the file for writing
			fs.truncate(fileDescriptor, function(err) {
				if (!err) {
					// write file and close it
					fs.writeFile(fileDescriptor,stringData, function(err){
						if (!err) {
							// close file
							fs.close(fileDescriptor, function(err){
								if (!err) {
									callback(false);
								} else {
									callback("Error: Closing file");
								}
							});
						} else {
							callback("Error: Writing to file");
						}
					});
				} else {
					callback("Error: Cannot truncate file");
				}
			});
		} else {
			callback("Error: Could not open the file for update")
		}
	});
};

// delete a file

lib.delete = function(dir, file, callback) {
	// unlink the file
	filename = lib.baseDir+'/'+dir+'/'+file+'.json';
	fs.unlink(filename, function(err){
		if (!err) {
			callback(false);
		} else {
			callback('Error: deleting file');
		}
	});
};

// list all items in a directory
lib.list = function(dir,callback){
	fs.readdir(lib.baseDir+'/'+dir+'/',function(err,data){
		if (!err && data && data.length > 0) {
			var trimmedFilenames = [];
			data.forEach(function(fileName){
				trimmedFilenames.push(fileName.replace('.json',''));
			});
			callback(false,trimmedFilenames);
		} else {
			callback(err,data);
		}
	});
}
// export the module
module.exports = lib;
