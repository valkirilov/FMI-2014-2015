db = db.getSiblingDB('humongousPublishing')

for (var i=0;i<100;i++){
	var testBook = {};
	
	testBook.author = "author" + i;
	testBook.title = "title" + i;
	testBook.pages = Math.ceil(Math.random() * 500);
	testBook.tags = ["programming", "databases"];
	testBook.copiesInStock = {
		Sofia : Math.ceil(Math.random() * 100), Plovdiv : Math.ceil(Math.random() * 800), Varna : Math.ceil(Math.random() * 60)
	},
	testBook.publisher = "publisher" + i;
	testBook.publishDate = Date.now();
	
	db.testBooks.save(testBook);
}