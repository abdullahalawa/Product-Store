var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDesc");
var productImageInput = document.getElementById("productImage");

var productContainerElement = document.getElementById(
  "productContainerElement"
);

var productList = [];

function addProduct() {
  var product = {
    productName: productNameInput.value,
    productPrice: productPriceInput.value,
    productCategory: productCategoryInput.value,
    productDescription: productDescriptionInput.value,
    productImage: productImageInput.files[0].name,
  };

  productList.push(product);

  console.log(productList);
  displayProduct();
  resetProductInputs();
}

function resetProductInputs() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = "choose Your Category";
  productDescriptionInput.value = null;
  productImageInput.value = null;
}

function displayProduct() {
  var containerElement = ``;

  for (var i = 0; i < productList.length; i++) {
    containerElement += `<div class="col">
    <div class="border shadow-sm p-2">
      <div class="image-container mb-5">
        <img
          class="w-100 h-100 object-fit-contain"
          src="./images/${productList[i].productImage}"
          alt="Samsung-Galaxy-A54"
        />
      </div>
    
      <h3 class="fs-5">${productList[i].productName}</h3>
      <p class="fs-6 text-secondary">
      ${productList[i].productDescription}
      </p>
      <p class="fs-6 text-secondary">
        <span class="fw-semibold text-black">Category:</span> ${productList[i].productCategory}
      </p>
      <div class="d-flex justify-content-between">
        <p class="fw-semibold"> ${productList[i].productPrice} EGP</p>
        <div>
          <i class="fa-solid fa-trash-can text-danger"></i
          ><i class="fa-solid fa-pen-to-square text-success ms-2"></i>
        </div>
      </div>
    </div>
    </div>`;
  }

  productContainerElement.innerHTML = containerElement;
}
