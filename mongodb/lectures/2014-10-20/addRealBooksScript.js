db = db.getSiblingDB('humongous')

book1 = {
	author: "Kristina Chodorow",
	title: "MongoDB: The Defitive Guide",
	pages: 410,
	tags: ["programming", "databases"],
	copiesInStock: {
		Sofia : 10, Plovdiv : 7, Varna : 0
	},
	publisher : "O'Reilly Media",
	publishDate: new Date('Aug 23, 2012')
}

book2 = {
	author: ["Eelco Plugge", "Peter Membrey", "Tim Hawkins"],
	title: "The Defitive Guide to MongoDB: The NoSQL Database for Cloud and Desktop Computing",
	pages: 329,
	tags: ["programming", "databases"],
	copiesInStock: {
		Sofia : 18, Burgas : 13, Varna : 11
	},
	publisher: "Apress",
	publishDate: new Date('Jul 15, 2010')
}

book3 = {
	author: ["J. Sadalage", "Martin Fowler"],
	title: "NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence",
	pages: 158,
	tags: ["programming", "databases"],
	copiesInStock: {
		Sofia: 35, Plovdiv: 21, Burgas: 11, Ruse:16
	},
	publisher: "Addison-Wesley Professional",
	publishDate: new Date('Sep 07, 2012')
}

book4 = {
	author: "J. R. R. Tolkien",
	title: "The Lord of the Rings",
	pages: 1003,
	tags: ["fantasy", "adventure"],
	copiesInStock: {
		Sofia: 335, Plovdiv: 221, Burgas: 111, Ruse:165, Varna: 200
	},
	publisher: "Fantasy Publishing",
	publishDate: new Date('Jul 29, 1954')
}

book5 = {
	author: "J. R. R. Tolkien",
	title: "Hobbit: There and Back Again",
	pages: 305,
	tags: ["fantasy", "adventure"],
	copiesInStock: {
		Sofia: 134, Plovdiv: 121, Burgas: 81, Ruse:115, Varna: 140
	},
	publisher: "Fantasy Publishing",
	publishDate: new Date('Sep 21, 1937')
}

book6 = {
	author: ["J. R. R. Tolkien", "Christopher Tolkien"],
	title: "Unfinished Tales",
	pages: 405,
	tags: ["fantasy", "adventure"],
	copiesInStock: {
		Sofia: 54, Plovdiv: 31, Burgas: 31, Ruse:25, Varna: 12
	},
	publisher: "Fantasy Publishing",
	publishDate: new Date('Jul 15, 1980')
}

book7 = {
	author: "Ivan Vazov",
	title: "Pod Igoto",
	pages: 305,
	tags: ["historical", "adventure"],
	copiesInStock: {
		Sofia: 1054, Plovdiv: 831, Burgas: 531, Ruse:825, Varna: 912
	},
	publishDate: new Date(-2095556400000)
}

book8 = {
	author: "Suzanne Collins",
	title: "The Hunger Games",
	pages: 256,
	tags: ["adventure", "apocalyptic", "science fiction"],
	copiesInStock: {
		Sofia: 54, Plovdiv: 18, Burgas: 131, Ruse:29, Varna: 23
	},
	publisher: "Rainbow Ltd",
	publishDate: new Date(1221339600000),
	translatedInto: ["Bulgarian"]
}

book9 = {
	author: "Suzanne Collins",
	title: "The Hunger Games: Catching Fire",
	pages: 326,
	tags: ["adventure", "apocalyptic", "science fiction"],
	copiesInStock: {
		Sofia: 52, Plovdiv: 28, Burgas: 181, Ruse:39, Varna: 13
	},
	publisher: "Reinbow Ltd",
	publishDate: new Date('Sep 01, 2009'),
	translatedInto: ["Bulgarian"]
}

book11 = {
	author: "Kurt Vonnegut",
	title: "Cats Cradle",
	pages: 426,
	tags: ["apocalyptic", "science fiction", "drama"],
	copiesInStock: {
		Sofia: 57, Plovdiv: 38, Burgas: 181, Ruse:39, Varna: 13
	},
	publisher: "Rhinebow Ltd",
	publishDate: new Date('Sep 2, 1963'),
	translatedInto: ["Bulgarian"]
}

book12 = {
	author: "Kurt Vonnegut",
	title: "The Sirens of Titan",
	pages: 323,
	tags: ["science fiction", "drama"],
	copiesInStock: {
		Sofia: 27, Plovdiv: 138, Burgas: 11
	},
	publisher: "Rhinebow Ltd",
	publishDate: new Date('Nov 24, 1959'),
	translatedInto: ["Bulgarian"]
}

book12 = {
	author: "Kurt Vonnegut",
	title: "Slaughterhouse Five",
	pages: 504,
	tags: ["science fiction", "drama"],
	copiesInStock: {
		Sofia: 127, Plovdiv: 18, Burgas: 33
	},
	publisher: "Rhinebow Ltd",
	publishDate: new Date('Aug 29, 1969'),
	translatedInto: ["Bulgarian"]
}

db.books.insert([book1,book2,book3,book4,book5,book6,book7,book8,book9,book10,book11,book12]);