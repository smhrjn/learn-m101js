/* eslint-disable no-console */

const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/m101', (err, db) => {
	if (err) throw err;

	const algorithm = 'aes256';
	// eslint-disable-next-line
	const encrypted_message = '7013254dca77e2c913d18cf5b70e7bba';

	db.collection('hw1_2').find({}).toArray((err2, docs) => {
		if (err2) throw err;

		if (docs.length < 1) {
			console.dir('No documents found');
			return db.close();
		}

		const doc = docs[0];
		// eslint-disable-next-line
		const decipher = crypto.createDecipher(algorithm, doc['_id']);
		const decrypted = decipher.update(encrypted_message, 'hex', 'utf8') + decipher.final('utf8');
		console.log(`Answer: ${decrypted}`);
		return db.close();
	});
});
