const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p>loading...</p>";


fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
.then(response => response.json()).then(data => {
    let media;

if (data.media_type === "image") {
    media = `<img src="${data.url}"/>`;
} else {
    media = `<video src="${data.url}" controls></video>`;
}

    document.querySelector("#app").innerHTML = `
        <h1>${data.title}</h1>
        <img src="${data.url}" />
        <p>${data.explanation}</p>
    `;
})

const date = document.querySelector("#datepicker").value;
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)