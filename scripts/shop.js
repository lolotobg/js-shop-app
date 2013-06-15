var shop= (function() {
var mainShop = {
		init: function(name) {
			this.name = name;
			this._categories = new Array();
			this._count = 0;
		},
		addCategory: function(currentCategory) {
			this._categories.push(currentCategory);
			this._count++;
		},
		getProductByID: function(id) {
			id = String(id);
			var currentIDs = id.split("-");
			var currentCategory = this.getCategoryByID(currentIDs[0]);

			for (var i = 0; i < currentCategory._super._products.length; i++) {
				if (currentCategory._super._products[i].productID == id) {
					console.log(currentCategory._products[i]);
					return currentCategory._products[i];
				};
			};
		},
		getCategoryByID: function(id) {
			for (var i = 0; i < this._categories.length; i++) {
				if (this._categories[i]._super.categoryID == id) {
					return this._categories[i];
				};
			};
		},
		getCategoryID: function() {
			return this._count;
		},
		getCategories: function() {
			return this._categories;
		},
		getInformation: function() {
			console.log("Shop: " + this.name)
			var addition = "\t";
			for (var i = 0; i < this._categories.length; i++) {
				this._categories[i]._super.getInformation(addition);
			};
		},
		loadRepository: function() {
			var savedRepository = localStorage.getObject(this.name);
			for (var i = 0; i < savedRepository.categories.length; i++) {
				var savedCategory = savedRepository.categories[i];
				var currentCategory = Object.create(category.userCategory);
				currentCategory.init(savedCategory.name,savedCategory.categoryID);
				this.addCategory(currentCategory);

				for (var j = 0; j < savedCategory.products.length; j++) {
					var savedProduct = savedCategory.products[j];
					var currentProduct;
					if (savedProduct.type == "phone") {
						currentProduct = Object.create(product.phone);
						currentProduct.init(
							savedProduct.information.manufacturer,
							savedProduct.information.model,
							savedProduct.information.price,
							savedProduct.information.productID,
							savedProduct.information.imageSource,
							savedProduct.information.productDescription);
					}
					else if(savedProduct.type == "tablet") {
						currentProduct = Object.create(product.phone);
						currentProduct.init(
							savedProduct.information.manufacturer,
							savedProduct.information.model,
							savedProduct.information.price,
							savedProduct.information.productID,
							savedProduct.information.imageSource,
							savedProduct.information.productDescription);
					}
					currentCategory.addProduct(currentProduct);
				};
			};
		}
	}

	var adminShop = mainShop.extend({
		saveRepository: function() {
			localStorage.setObject(this.name, this.serialize());
		},
		removeCategory: function(id) {
			for (var i = 0; i < this._categories.length; i++) {
				if (this._categories[i]._super.categoryID == id) {
					this._categories.splice(i, 1);
				};
			};
		},
		removeProduct: function(id) {
			id = String(id);
			var currentIDs = id.split("-");
			var currentCategory = this.getCategoryByID(currentIDs[0]);

			currentCategory.removeProduct(id);

		},
		//serialize the store for storing
		serialize: function() {
			//temp storage for JSON of categories
			var serializedCategories = [];

			//go through every category and serialize it
			for (var i = 0; i < this._categories.length; i++) {
				serializedCategories.push(this._categories[i].serialize());
			};

			//return JSON object
			return {
				name: this.name,
				categories: serializedCategories
			};
		},
	});

	return {
		mainShop: mainShop,
		adminShop: adminShop
	}
}())