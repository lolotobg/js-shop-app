var product = (function() {
	var article = Class.create({
		initialize: function(manufacturer, model, price, productID, imageSource, productDescription) {
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
	});
	var phone = Class.create(article, {
		initialize: function($super, manufacturer, model, price, productID, imageSource, productDescription) {
			$super(manufacturer, model, price, productID, imageSource, productDescription);
			this.type = "phone";
		},
		serialize: function($super) {
			return ({
				type: this.type, information: $super()
			})
		}
	});

		var tablet = Class.create(article, {
		initialize: function($super, manufacturer, model, price, productID, imageSource, productDescription) {
			$super(manufacturer, model, price, productID, imageSource, productDescription);
			this.type = "tablet";
		},
		serialize: function($super) {
			return ({
				type: this.type, information: $super()
			})
		}
	});

	return {
		phone: phone,
		tablet: tablet
	}
}())