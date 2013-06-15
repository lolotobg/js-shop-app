var category = (function() {

	var mainCategory = {
		init: function(name, categoryID) {
			this.name = name;
			this._products = new Array();
			this.categoryID = categoryID;
			this._count = 0;
		},
		addProduct: function(currentProduct) {
			this._super._products.push(currentProduct);
			this._count++;
		},
		getProducts: function() {
			return this._products;
		},
		getProductID: function() {
			return this.categoryID + "-" + this._count;
		},
		getInformation: function(addition) {
			console.log(addition + "Category: " + this.name + " CategoryID: " + this.categoryID)
			addition += "\t";
			for (var i = 0; i < this._products.length; i++) {
				this._products[i]._super.getInformation(addition);
			};
		}
	}

	var userCategory = mainCategory.extend({
		init: function(name, categoryID) {
			this._super = Object.create(this._super);
			this._super.init(name, categoryID);

		}
	});

	var adminCategory = mainCategory.extend({
		init: function(name, categoryID) {
			this._super = Object.create(this._super);
			this._super.init(name, categoryID);

		},
		removeProduct: function(id) {
			for (var i = 0; i < this._products.length; i++) {
				if (this._products[i].productID == id) {
					this._products.splice(i, 1);
				};
			};
		},
		//serialize the store for storing
		serialize: function() {
			//temp storage for JSON of products
			var serializedProducts = [];
			for (var i = 0; i < this._products.length; i++) {
				serializedProducts.push(this._products[i].serialize());
			};

			//return JSON object
			return {
				name: this.name,
				categoryID: this.categoryID,
				products: serializedProducts
			};
		}
	})

	return {
		userCategory: userCategory,
		adminCategory: adminCategory
	}
}())