var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


//Firebase Real Time
var firebase = require("firebase-admin");
var serviceAccount = require("./firebase_key.json");

firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: "https://book-shop-4ccae-default-rtdb.asia-southeast1.firebasedatabase.app"
});

var db = firebase.database();

var port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/books', function (req, res) {

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("books");

	//Attach an asynchronous callback to read the data
	booksReference.on("value",
		function (snapshot) {
			res.json(snapshot.val());
			booksReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});

});


app.post('/plus', function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	var num1 = req.body.num1;
	var num2 = req.body.num2;

	res.send('{"result": ' + (num1 + num2) + '}');

});




app.post('/book',  function (req, res){

	var author = req.body.author;
	var bookid = Number(req.body.bookid);
	var category = req.body.category;
	var isbn = req.body.isbn;
	var pageCount = Number(req.body.pageCount);
	var price = Number(req.body.price);
	var publishedDate = req.body.publishedDate;
	var shortDescription = req.body.shortDescription;
	var thumbnailUrl = req.body.thumbnailUrl;
	var title = req.body.title;

	//console.log(author);

	var referencaPath ='/books/' + bookid + '/';

	var booksReference = db.ref(referencaPath);

	if (booksReference != null){

		booksReference.update( {author:author, bookid: bookid, category: category,
			 isbn: isbn, pageCount: pageCount, price: price, publishedDate: publishedDate, 
			 shortDescription: shortDescription, thumbnailUrl: thumbnailUrl, title: title,  }  ,
			 function(error){
				 if (error){
					 res.send("Data could not be saved." + error)
				 }
				 else{
					res.send("Success!");
				 }
			 }
			 );


	}


});




//rectandgle (post)
app.post('/rectandgle', function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	var size1 = req.body.size1;
	var size2 = req.body.size2;

	res.send('{ "result ": ' + (size1 * size2) + '}');

});





//circle (post)
app.post('/circle', function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	var radius = req.body.radius1;

	res.send('{ "result ": ' + (3.14 * radius * radius) + '}');

});







//student (get)
app.get('/students', function (req, res) {

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("students");

	//Attach an asynchronous callback to read the data
	booksReference.on("value",
		function (snapshot) {
			res.json(snapshot.val());
			booksReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});

});


app.get('/topsellers', function (req, res) {

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("topsellers");

	//Attach an asynchronous callback to read the data
	booksReference.on("value",
		function (snapshot) {
			res.json(snapshot.val());
			booksReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});

});


app.get('/book/:bookid', function (req, res) {

	res.setHeader('Content-Type', 'application/json');
	var bookid = Number(req.params.bookid);

	var booksReference = db.ref("books");

	//Attach an asynchronous callback to read the data
	booksReference.orderByChild("bookid").equalTo(bookid).on("child_added",
		function (snapshot) {
			res.json(snapshot.val());
			booksReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});

	//Code Here

});

app.get('/student/:studentId', function (req, res) {

	//Code Here
	res.setHeader('Content-Type', 'application/json');
	var studentId = req.params.studentId;

	var booksReference = db.ref("students");

	//Attach an asynchronous callback to read the data
	booksReference.orderByChild("studentId").equalTo(studentId).on("child_added",
		function (snapshot) {
			res.json(snapshot.val());
			booksReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});
});











app.delete('/book/:bookid', function (req, res) {

	//Code Here
	//res.setHeader('Content-Type', 'application/json');
	var bookid = Number(req.params.bookid);

	var referencaPath ='/books/' + bookid + '/';
	var booksReference = db.ref(referencaPath);

	if(booksReference!=null){
		booksReference.remove()
		res.send("Sucess!")
	}
	if (error) throw error;


});


app.get('/lastorderid', function (req, res) {

	res.setHeader('Content-Type', 'application/json');

	var ordersReference = db.ref("lastOrderId");

	ordersReference.on("value",
		function (snapshot) {
			res.json(snapshot.val());
			ordersReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});

});


app.put('/lastorderid', function (req, res) {

	//Code Here


});




app.post('/order', function (req, res) {

	//Code Here

});


app.listen(port, function () {
	console.log("Server is up and running...");
});
