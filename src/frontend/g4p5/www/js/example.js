function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}

Person.prototype.setName = function(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
}

Person.prototype.nationality = "English";