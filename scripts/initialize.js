(function() {

	var myShop = Class.create(shop.adminShop);
	myShop.prototype.init("mang0sh0p");

	var technics = Object.create(category.adminCategory);
	technics.init("Hi-Fi", myShop.getCategoryID());
	myShop.addCategory(technics);

	var sony = Object.create(product.phone);
	sony.init("Toshiba", "40L7335DG", 1099.00,
		technics._super.getProductID(), "../images/toshiba-40L7335DG.jpg", "42 incha");
	technics.addProduct(sony);

	var panasonic = Object.create(product.phone);
	panasonic.init("Philips", "DVP2850", 74.90,
		technics._super.getProductID(), "../images/philips-dvp2850", "mnogo moshtna");
	technics.addProduct(panasonic);

	var kitchen = Object.create(category.adminCategory);
	kitchen.init("Kitchen", myShop.getCategoryID());

	var whirpool = Object.create(product.phone);
	whirpool.init( "Whirpool", "WTV-4125", "849.00",
		kitchen._super.getProductID(), "../images/whirpool-wtv4125", "zamryzva kato lud");
	kitchen.addProduct(whirpool);

	var whirpool = Object.create(product.phone);
	whirpool.init("Miele", "W-3164", "1499.00",
		kitchen._super.getProductID(), "../images/miele-w3164", "vyrti bqsno voveki");
	kitchen.addProduct(whirpool);

	myShop.addCategory(kitchen);
	var categories = myShop.getCategories();
	console.log(categories[0]._super.name);
	//myShop.removeCategory("1");
	myShop.getProductByID("0-1");
	var test = technics._super.getProducts();
	//myShop.getInformation();

	//console.log(technics.serialize());
	//console.log(myShop.serialize());
	myShop.saveRepository();
	myShop.loadRepository();
	//myShop.getInformation();
}());