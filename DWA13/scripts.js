const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']
  
//1.  forEach to console log each name to the console
names.forEach((name) => {
    console.log(name);
  });

  
  //2.forEach to console log each name with a matching province
  if (names.length === provinces.length) {
    const combinedData = [];
  
    names.forEach((name, index) => {
      const fullName = `${name} (${provinces[index]})`;
      combinedData.push(fullName);
    });
  
    // Limit the number of console.log calls to seven
    combinedData.slice(0, 7).forEach((fullName) => {
      console.log(fullName);
    });
  } else {
    console.log("The number of names and provinces doesn't match.");
  }
  
  // 3.map loop over all province names and turn the string to all uppercase. 
  const uppercaseProvinces = provinces.map((province) => province.toUpperCase());

console.log(uppercaseProvinces);

// 4.new array with map that has the amount of characters in each name.
const characterCounts = names.map((name) => name.length);

console.log(characterCounts);

//5.Using toSorted to sort all provinces alphabetically.
provinces.sort();

console.log(provinces);

//6. filter to remove all provinces that have the word Cape in them. After filtering the array, return the amount of provinces left. 
// Use filter to remove provinces with the word "Cape"
const filteredProvinces = provinces.filter((province) => !province.includes('Cape'));

// Get the count of remaining provinces
const remainingCount = filteredProvinces.length;

console.log(remainingCount);

// 7.Create a boolean array by using map and some to determine whether a name contains an S character. The result should be [true, true, false, true, true, false]
const containsSArray = names.map((name) => name.includes('S'));

console.log(containsSArray);

// 8.Using only reduce, turn the above into an object that indicates the province of an individual
const nameProvinceObject = names.reduce((result, name, index) => {
    result[name] = provinces[index];
    return result;
  }, {});
  
  console.log(nameProvinceObject);



  
  const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
  
  console.log(
    // Task 1: Use forEach to console.log each product name to the console.
    "Task 1:",
  );
  products.forEach((product) => {
    console.log(product.product);
  });
  
  console.log(
    // Task 2: Use filter to filter out products that have a name longer than 5 characters.
    "Task 2:",
  );
  const filteredProducts = products.filter((product) => product.product.length <= 5);
  console.log(filteredProducts);
  
  console.log(
    // Task 3: Using both filter and map. Convert all prices that are strings to numbers,
    // and remove all products from the array that do not have prices.
    "Task 3:",
  );
  const validProducts = products
    .filter((product) => !isNaN(Number(product.price)))
    .map((product) => ({ product: product.product, price: Number(product.price) }));
  console.log(validProducts);
  
  console.log(
    // Task 4: Use reduce to concatenate all product names.
    "Task 4:",
  );
  const concatenatedNames = products.reduce((result, product) => {
    if (result === "") {
      return product.product;
    }
    return `${result}, ${product.product}`;
  }, "");
  console.log(concatenatedNames);
  
  console.log(
    // Task 5: Use reduce to calculate both the highest and lowest-priced items.
    // The names should be returned as the following string: Highest: coffee. Lowest: banana.
    "Task 5:",
  );
  const priceArray = validProducts.map((product) => product.price);
  const highestPrice = Math.max(...priceArray);
  const lowestPrice = Math.min(...priceArray);
  const highestProduct = validProducts.find((product) => product.price === highestPrice).product;
  const lowestProduct = validProducts.find((product) => product.price === lowestPrice).product;
  console.log(`Highest: ${highestProduct}. Lowest: ${lowestProduct}`);
  
  console.log(
    // Task 6: Using only Object.entries and reduce, recreate the object with the exact same values.
    // However, the following object keys should be changed in the new array:
    // product should be changed to name, price should be changed to cost.
    "Task 6:",
  );
  const transformedProducts = products.reduce((result, product) => {
    const { product: name, price: cost } = product;
    result.push({ name, cost });
    return result;
  }, []);
  console.log(transformedProducts);
;
  