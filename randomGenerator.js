async function fetchTrueRandomString(length, allowedCharacters) {
  const apiKey = '12f0568f-b9ff-41a1-992a-b929cb285cc1'; // Replace with your original API key from Random.org
  const url = `https://api.random.org/json-rpc/2/invoke`;

  const requestData = {
    jsonrpc: '2.0',
    method: 'generateStrings',
    params: {
      apiKey: apiKey,
      n: 1,
      length: length,
      characters: allowedCharacters,
      replacement: true,
    },
    id: 1,
  };
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  });

  const data = await response.json();

  // Check for error in the API response
  if (data.error) {
    throw new Error(`API Error: ${data.error.message}`);
  }

  // Return the generated random string
  return data.result.random.data[0];
}

window.generateTrueRandomBinaryString = async function (length) {
  return await fetchTrueRandomString(length, "01");
};

window.generateTrueRandomText = async function (length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-:;",<.>/?`~';
  return await fetchTrueRandomString(length, characters);
};

async function generateBinaryString2() {
  var length = 32; // change it to the desired length
  var result = await window.generateTrueRandomBinaryString(length);
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = result; // Add the result to the resultDiv element
}

async function generateRandomText2() {
  var length = 32; // change it to the desired length
  var result = await window.generateTrueRandomText(length);
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = result; // Add the result to the resultDiv element
}

