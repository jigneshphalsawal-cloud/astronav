const API_KEY = "uKDQ5WDDtwZdqbmbr0t6HggLZY5WblDkZDhsocxQ";

// Get NASA Photo
fetch("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY)
  .then(res => res.json())
  .then(data => {
    let html = "<h3>" + data.title + "</h3>";
    html += "<p>" + data.date + "</p>";

    if (data.media_type === "image") {
      html += "<img src='" + data.url + "' alt='photo'>";
    } else {
      html += "<video src='" + data.url + "' controls></video>";
    }

    html += "<p>" + data.explanation + "</p>";
    document.getElementById("apod-content").innerHTML = html;
  })
  .catch(err => {
    document.getElementById("apod-content").innerHTML = "Error: " + err;
  });

// Get Asteroids
let today = new Date();
let nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

let start = today.toISOString().slice(0, 10);
let end = nextWeek.toISOString().slice(0, 10);

fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + start + "&end_date=" + end + "&api_key=" + API_KEY)
  .then(res => res.json())
  .then(data => {
    let asteroids = [];

    for (let date in data.near_earth_objects) {
      for (let ast of data.near_earth_objects[date]) {
        asteroids.push(ast);
      }
    }

    let html = "";
    for (let i = 0; i < 5 && i < asteroids.length; i++) {
      let ast = asteroids[i];
      let speed = Math.round(ast.close_approach_data[0].relative_velocity.kilometers_per_hour);
      let distance = Math.round(ast.close_approach_data[0].miss_distance.kilometers);
      let date = ast.close_approach_data[0].close_approach_date;

      html += "<div class='card'>";
      html += "<h4>" + ast.name + "</h4>";

      if (ast.is_potentially_hazardous_asteroid) {
        html += "<span class='danger'>⚠ Dangerous</span>";
      }

      html += "<p>Date: " + date + "</p>";
      html += "<p>Speed: " + speed + " km/h</p>";
      html += "<p>Distance: " + distance + " km</p>";
      html += "</div>";
    }

    document.getElementById("asteroid-content").innerHTML = html;
  })
  .catch(err => {
    document.getElementById("asteroid-content").innerHTML = "Error: " + err;
  });

// Get News
fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=6")
  .then(res => res.json())
  .then(data => {
    let html = "";

    for (let article of data.results) {
      html += "<div class='card'>";

      if (article.image_url) {
        html += "<img src='" + article.image_url + "' alt='news'>";
      }

      html += "<h4>" + article.title + "</h4>";
      html += "<p>" + article.news_site + "</p>";
      html += "<a href='" + article.url + "' target='_blank'>Read</a>";
      html += "</div>";
    }

    document.getElementById("news-content").innerHTML = html;
  })
  .catch(err => {
    document.getElementById("news-content").innerHTML = "Error: " + err;
  });
