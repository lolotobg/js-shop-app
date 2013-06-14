(function() {
	
	var article = {
		init: function(name, manufacturer, model, price, productID, imageSource, productDescription) {
			this.name = name;
			this.manufacturer = manufacturer;
			this.model = model;
			this.price = price;
			this.productID = productID;
			this.imageSource = imageSource;
			this.productDescription = productDescription;
		},
		getInformation: function(addition) {
			console.log(addition+this.name+" "+ this.manufacturer+ " "+this.model+" "+
				this.price+" "+this.productID+" "+this.imageSource+" "+this.productDescription);
		},
		serialize: function() {
			return ({name: this.name, manufacturer: this.manufacturer, model: this.model, 
				price: this.price, productID: this.productID, imageSource: this.imageSource,
				productDescription:this.productDescription});
		}

	}

	var category = {
		init: function(name, categoryID) {
			this.name = name;
			this._products = new Array();
			this.categoryID = categoryID;
			this._count = 0;
		},
		addProduct: function(currentProduct) {
			this._products.push(currentProduct);
			this._count++;
		},
		removeProduct: function(id) {
			for (var i = 0; i < this._products.length; i++) {
				if (this._products[i].productID == id) {
					this._products.splice(i,1);
				};
			};
		},
		getProducts: function() {
			return this._products;
		},
		getProductID: function() {
			return this.categoryID+"-"+this._count;
		},
		getInformation: function(addition) {
			console.log(addition+"Category: "+this.name + "CategoryID: "+this.categoryID)
			addition+="\t";
			for (var i = 0; i < this._products.length; i++) {
				this._products[i].getInformation(addition);
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
			return {name: this.name, products: serializedProducts};
		}
	}

	var shop = {
		init: function(name) {
			this.name = name;
			this._categories = new Array();
			this._count = 0;
		},
		addCategory: function(currentCategory) {
			this._categories.push(currentCategory);
			this._count++;
		},
		removeCategory: function(id) {
			for (var i = 0; i < this._categories.length; i++) {
				if (this._categories[i].categoryID == id) {
					this._categories.splice(i,1);
				};
			};
		},
		removeProduct: function(id) {
			id = String(id);
			var currentIDs = id.split("-");
			var currentCategory = this.getCategoryByID(currentIDs[0]);

			currentCategory.removeProduct(id);
			
		},
		getProductByID: function(id) {
			id = String(id);
			var currentIDs = id.split("-");
			var currentCategory = this.getCategoryByID(currentIDs[0]);

			for (var i = 0; i < currentCategory._products.length; i++) {
				if (currentCategory._products[i].productID == id) {
					console.log(currentCategory._products[i]);
					return currentCategory._products[i];
				};
			};
		},
		getCategoryByID: function(id) {
			for (var i = 0; i < this._categories.length; i++) {
				if (this._categories[i].categoryID == id) {
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
			console.log("Shop: "+ this.name)
			var addition = "\t";
			for (var i = 0; i < this._categories.length; i++) {
				this._categories[i].getInformation(addition);
			};
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
			return {name: this.name, categories: serializedCategories};
		},
		saveRepository: function() {
			localStorage.setObject(this.name, this.serialize());
		},
		loadRepository: function() {
			var savedRepository = localStorage.getObject(this.name);
			console.log(savedRepository);
			for (var i = 0; i < savedRepository.categories.length; i++) {
				var savedCategory = savedRepository.categories[i];
				var currentCategory = Object.create(category);
				currentCategory.init(savedCategory.name);
				myShop.addCategory(currentCategory);
				//console.log(currentCategory.name)
				for (var j = 0; j < savedCategory.products.length; j++) {
					var savedProduct = savedCategory.products[j];
					console.log(savedProduct);
					var currentProduct = Object.create(article);
					currentProduct.init(
						savedProduct.name,
						savedProduct.manufacturer,
						savedProduct.model,
						savedProduct.price,
						savedProduct.productID,
						savedProduct.imageSource,
						savedProduct.productDescription
						);
					currentCategory.addProduct(currentProduct);
				};


			};
		}
	}

	var myShop = Object.create(shop);
	myShop.init("mang0sh0p");

	var technics = Object.create(category);
	technics.init("Hi-Fi", myShop.getCategoryID());
	myShop.addCategory(technics);

	var sony = Object.create(article);
	sony.init("TV","Toshiba", "40L7335DG", 1099.00,
		technics.getProductID(),"../images/toshiba-40L7335DG.jpg","42 incha");
	technics.addProduct(sony);

	var panasonic = Object.create(article);
	panasonic.init("DVD-Player","Philips", "DVP2850", 74.90,
		technics.getProductID(), "../images/philips-dvp2850", "mnogo moshtna");
	technics.addProduct(panasonic);

	var kitchen = Object.create(category);
	kitchen.init("Kitchen", myShop.getCategoryID());

	var whirpool = Object.create(article);
	whirpool.init("Fridge", "Whirpool", "WTV-4125", "849.00", 
		kitchen.getProductID(), "../images/whirpool-wtv4125", "zamryzva kato lud");
	kitchen.addProduct(whirpool);

	var whirpool = Object.create(article);
	whirpool.init("Laundary", "Miele", "W-3164", "1499.00", 
		kitchen.getProductID(), "../images/miele-w3164", "vyrti bqsno voveki");
	kitchen.addProduct(whirpool);

	myShop.addCategory(kitchen);
	var categories = myShop.getCategories();

	//myShop.removeCategory("1");
	myShop.getProductByID("0-1");

	myShop.getInformation();

	// console.log(technics.serialize());
	// console.log(myShop.serialize());
	// myShop.saveRepository();
	// myShop.loadRepository();
	// myShop.getInformation();
}());