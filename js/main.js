var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDesc");
var productImageInput = document.getElementById("productImage");

var addButton = document.getElementById("addProductButton");
var updateButton = document.getElementById("updateProductButton");

var productContainerElement = document.getElementById(
  "productContainerElement"
);

var productList = [];
var updatedProductIndex;

// Get Data from the local storage when open the browser for the first time
if (localStorage.getItem("ourProducts") != null) {
  productList = JSON.parse(localStorage.getItem("ourProducts"));

  displayProduct(productList);
}

//add new product
function addProduct() {
  var product = {
    productName: productNameInput.value,
    productPrice: productPriceInput.value,
    productCategory: productCategoryInput.value,
    productDescription: productDescriptionInput.value,
    productImage: productImageInput.files[0].name,
  };

  productList.push(product);

  // save the data on the local storage
  localStorage.setItem("ourProducts", JSON.stringify(productList));

  displayProduct(productList);
  resetProductInputs();
}

//delete product
function deleteProduct(deleteIndex) {
  productList.splice(deleteIndex, 1);
  localStorage.setItem("ourProducts", JSON.stringify(productList));
  displayProduct(productList);
}

//Search product
function searchProduct(str) {
  var filteredProducts = [];

  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].productName.toLowerCase().includes(str.toLowerCase()) ==
      true
    ) {
      filteredProducts.push(productList[i]);
    }
  }
  displayProduct(filteredProducts);
}

//Reset All input feilds
function resetProductInputs() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = "choose Your Category";
  productDescriptionInput.value = null;
  productImageInput.value = null;
}

//Display Products
function displayProduct(arr) {
  var containerElement = ``;

  for (var i = 0; i < arr.length; i++) {
    containerElement += `<div class="col">
    <div class="border shadow-sm p-2">
      <div class="image-container mb-5">
        <img
          class="w-100 h-100 object-fit-contain"
          src="./images/${arr[i].productImage}"
          alt="Samsung-Galaxy-A54"
        />
      </div>
    
      <h3 class="fs-5">${arr[i].productName}</h3>
      <p class="fs-6 text-secondary">
      ${arr[i].productDescription}
      </p>
      <p class="fs-6 text-secondary">
        <span class="fw-semibold text-black">Category:</span> ${arr[i].productCategory}
      </p>
      <div class="d-flex justify-content-between">
        <p class="fw-semibold"> ${arr[i].productPrice} EGP</p>
        <div>
          <i onclick="deleteProduct(${i})" class="fa-solid fa-trash-can text-danger"></i
          ><i onclick="moveProductDetailsToInput(${i})" class="fa-solid fa-pen-to-square text-success ms-2"></i>
        </div>
      </div>
    </div>
    </div>`;
  }

  productContainerElement.innerHTML = containerElement;
}

// change buttons when click on update
// move all product information o inputs
function moveProductDetailsToInput(index) {
  productNameInput.value = productList[index].productName;
  productPriceInput.value = productList[index].productPrice;
  productCategoryInput.value = productList[index].productCategory;
  productDescriptionInput.value = productList[index].productDescription;

  addButton.classList.replace("d-block", "d-none");
  updateButton.classList.replace("d-none", "d-block");

  updatedProductIndex = index;
}

//Update Product details
function updateProduct() {
  productList[updatedProductIndex].productName = productNameInput.value;
  productList[updatedProductIndex].productPrice = productPriceInput.value;
  productList[updatedProductIndex].productCategory = productCategoryInput.value;
  productList[updatedProductIndex].productDescription =
    productDescriptionInput.value;

  if (productImageInput.files[0] != undefined) {
    productList[updatedProductIndex].productImage =
      productImageInput.files[0].name;
  }

  displayProduct(productList);
  localStorage.setItem("ourProducts", JSON.stringify(productList));

  resetProductInputs();
  addButton.classList.replace("d-none", "d-block");
  updateButton.classList.replace("d-block", "d-none");
}
