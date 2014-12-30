db = db.getSiblingDB('disco');

// В условието: "Да се запишат в друга колекция трите най­-често използвани жанра"
// 
// Това го разбирам, като най-много срещания на този жанр, а не най-висок рейтинг
// Ако трябва по рейтинг, $sort: { 'averageRating': -1 }
db.albums.aggregate([
	{ $unwind: "$genres" },
	{ 
		$group: {
			_id: '$genres',
			names: { $push: "$name" },
			totalRating: { $sum: "$rating" },
			albumsCount: { $sum: 1}
		}
	},
	{ 
		$project: {
			_id: 1,
			names: -1,
			albumsCount: 1,
			averageRating: { $divide: [ "$totalRating", "$albumsCount" ] }
		}
	},
	{ 
		$sort: { 'albumsCount': -1 }
	},
	{
		$limit: 3
	},
	{
		$out: 'bestGenres'
	}

]);

// 2. Връща резултатите в колекция results2 като стрингове от изпълнители за всеки един, ако правилно съм разбрал условието
db.artists.mapReduce(
	function() {
		if (this.founded <= 1968) {
			emit("Yuriy", this.name);
		}
		else if (this.founded >= 1969 && this.founded <= 1987) {
			emit("Georgi", this.name);
		}
		else if (this.founded >= 1988) {
			emit("Georgi 2", this.name);
		}
	},
	function(type, name) {
		return name.join(', ');
	},
	{ out: "results2" }
);

// Example:
// db.results2.find()
// { "_id" : "Georgi", "value" : "Евлампи Иванов" }
// { "_id" : "Georgi 2", "value" : "Георги Евлампиев, Унуфри Унуфриев, Унуфри Петров, Стамат Георгиев, Слави Григоров, Унуфри Николаев, Иван Иванов" }
// { "_id" : "Yuriy", "value" : "Николай Петров, Петър Николаев, Григор Петров" }


