//долният скрипт обхожда всички бази данни на сървъра (освен admin и local) и за всички документи
//във всички колекци добавя полето lastModified и слага текущата дата и част като стойност на полето

//взима информацията за всички бази от данни в рамките на MongoDB сървъра
var databasesInfo = db.adminCommand('listDatabases');

var collectionNames;

//итерира по базите данни
for (var i in databasesInfo.databases) {
	//взима името на текущо разглежданата база данни
	var dbName = databasesInfo.databases[i].name;
		
	if (dbName !== 'local' && dbName !== 'admin'){
		//достъпва се текущата база от данни
		db = db.getSiblingDB(databasesInfo.databases[i].name);

		collectionNames = db.getCollectionNames();
	
		//итерира се по колекциите на текущата база данни
		for (var j in collectionNames) {
			var collectionName = collectionNames[j];
			
			if (collectionNames[j] !== 'system.indexes')
			{
				print(collectionNames[j]);
				
				var time = new Date();
				//добавя към всеки документ полето lastModified
				db[collectionName].update({},{$set:{lastModified:time}},{multi:true});
			}
		}
	}
}

