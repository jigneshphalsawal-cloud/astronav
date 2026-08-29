const API_KEY = "uKDQ5WDDtwZdqbmbr0t6HggLZY5WblDkZDhsocxQ";

// NASA Photo of the Day
fetch("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY)
  .then(res => res.json())
  .then(data => {
    let html = "<h3>" + data.title + "</h3>";
    html += "<p>" + data.date + "</p>";

    if (data.media_type === "image") {
      html += "<img src='" + data.url + "' alt='NASA photo'>";
    } else {
      html += "<video src='" + data.url + "' controls></video>";
    }

    html += "<p>" + data.explanation + "</p>";
    document.getElementById("app").innerHTML = html;
  })
  .catch(err => {
    document.getElementById("app").innerHTML = "<p>Error loading APOD: " + err.message + "</p>";
  });

// Asteroids
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

    let html = "<h2>☄️ Near-Earth Asteroids</h2>";
    for (let i = 0; i < 5 && i < asteroids.length; i++) {
      let ast = asteroids[i];
      let speed = Math.round(ast.close_approach_data[0].relative_velocity.kilometers_per_hour);
      let distance = Math.round(ast.close_approach_data[0].miss_distance.kilometers);
      let date = ast.close_approach_data[0].close_approach_date;

      html += "<div class='asteroid-card'>";
      html += "<strong>" + ast.name + "</strong>";

      if (ast.is_potentially_hazardous_asteroid) {
        html += "<span class='danger'>⚠️ Potentially Hazardous</span>";
      }

      html += "<p>📅 Date: " + date + "</p>";
      html += "<p>🚀 Speed: " + speed.toLocaleString() + " km/h</p>";
      html += "<p>📏 Distance: " + distance.toLocaleString() + " km</p>";
      html += "</div>";
    }

    document.getElementById("asteroid-app").innerHTML = html;
  })
  .catch(err => {
    document.getElementById("asteroid-app").innerHTML = "<h2>Asteroids</h2><p>Error loading asteroids: " + err.message + "</p>";
  });

// News
fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=6&ordering=-published_at")
  .then(res => res.json())
  .then(data => {
    let html = "<h2>📰 Space News</h2><div class='news-grid'>";

    for (let article of data.results) {
      html += "<div class='news-card'>";

      if (article.image_url) {
        html += "<img src='" + article.image_url + "' alt='news'>";
      }

      html += "<div class='news-card-body'>";
      html += "<h4>" + article.title + "</h4>";
      html += "<p class='news-site'>" + article.news_site + "</p>";

      if (article.summary) {
        html += "<p class='news-summary'>" + article.summary.slice(0, 150) + "...</p>";
      }

      html += "<a class='news-link' href='" + article.url + "' target='_blank'>Read more →</a>";
      html += "</div>";
      html += "</div>";
    }

    html += "</div>";
    document.getElementById("news-app").innerHTML = html;
  })
  .catch(err => {
    document.getElementById("news-app").innerHTML = "<h2>News</h2><p>Error loading news: " + err.message + "</p>";
  });
