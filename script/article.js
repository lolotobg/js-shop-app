var product = (function() {
	var article = {
		init: function(manufacturer, model, price, productID, imageSource, productDescription) {
			this.manufacturer = manufacturer;
			this.model = model;
			this.price = price;
			this.productID = productID;
			this.imageSource = imageSource;
			this.productDescription = productDescription;
		},
		getInformation: function(addition) {
			console.log(addition+ this.manufacturer+ " "+this.model+" "+
				this.price+" "+this.productID+" "+this.imageSource+" "+this.productDescription);
		},
		serialize: function() {
			return ({name: this.name, manufacturer: this.manufacturer, model: this.model, 
				price: this.price, productID: this.productID, imageSource: this.imageSource,
				productDescription:this.productDescription});
		}
	}
	var phone = article.extend({
		init: function(manufacturer, model, price, productID, imageSource, productDescription) {
			this._super = Object.create(this._super);
			this._super.init(name, manufacturer, model, price, productID, imageSource, productDescription);
			this.type = "phone";
		},
		serialize: function() {
			return ({
				type: this.type, information: this._super.serialize()
			})
		}
	});

		var tablet = article.extend({
		init: function(manufacturer, model, price, productID, imageSource, productDescription) {
			this._super = Object.create(this._super);
			this._super.init(name, manufacturer, model, price, productID, imageSource, productDescription);
			this.type = "tablet";
		},
		serialize: function() {
			return ({
				type: this.type, information: this._super.serialize()
			})
		}
	});

	return {
		phone: phone,
		tablet: tablet
	}
}())