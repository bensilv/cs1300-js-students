var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=MAO64uYXSaExvC8RPAC1qjJbdgKPMySOFUegej184Rc";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
        let data = JSON.parse(request.response);
        console.log(data);
        let addToPage = "";
        data.data.forEach(function (plant) {
            console.log(plant);
            addToPage += `<div class="plant">
                    <h1>${plant.common_name}</h1>
                    <h2>Scientific Name:${plant.scientific_name}</h2>
                    <h2>Family: ${plant.family}</h2>
                    <h2>Common Name: ${plant.family_common_name}</h2>
                    <h2>Genus: ${plant.genus}</h2>
                    <img style="width: 20%;" src="${plant.image_url}" alt="blah">
                </div>`;
        });
        document.getElementById("body").innerHTML = addToPage;
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
