var shopCategories = shop.getCategories;
var tabsIndex = 0;
for (var categoryI in shopCategories) {
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href="#tabs-"+tabsIndex;
	a.innerHTML = shopCategories[categoryI].userCategory.name;
	li.appendChild(a);
	$("#category-tabs-list").appendChild(li);
};