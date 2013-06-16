(function() {

	var myShop = new shop.adminShop("mang0sh0p");
// 	console.log(myShop.name)

// 	var technics = new category.adminCategory("Hi-Fi", myShop.getCategoryID());
// //	technics.init("Hi-Fi", myShop.getCategoryID());
// 	myShop.addCategory(technics);

// 	var sony =  new product.phone("Toshiba", "40L7335DG", 1099.00,technics.getProductID(), "../images/toshiba-40L7335DG.jpg", "42 incha");
// 	technics.addProduct(sony);

// 	var panasonic = new product.phone("Philips", "DVP2850", 74.90,technics.getProductID(), "../images/philips-dvp2850", "mnogo moshtna");
// 	technics.addProduct(panasonic);

// 	var kitchen = new category.adminCategory("Kitchen", myShop.getCategoryID());

// 	var whirpool = new product.tablet("Whirpool", "WTV-4125", "849.00",
// 		kitchen.getProductID(), "../images/whirpool-wtv4125", "zamryzva kato lud");
// 	kitchen.addProduct(whirpool);

// 	var miele = new product.tablet("Miele", "W-3164", "1499.00",
// 		kitchen.getProductID(), "../images/miele-w3164", "vyrti bqsno voveki");
// 	kitchen.addProduct(miele);

// 	myShop.addCategory(kitchen);
// 	var categories = myShop.getCategories();
// 	console.log(categories[0].name);
// 	//myShop.removeCategory("1");
// 	myShop.getProductByID("0-1");
// 	var test = technics.getProducts();
// 	//myShop.getInformation();

// 	//console.log(technics.serialize());
// 	//console.log(myShop.serialize());
// 	//myShop.saveRepository();
	myShop.loadRepository();
	myShop.getInformation();
}());