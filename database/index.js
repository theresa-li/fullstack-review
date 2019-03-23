const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  userLink: String,
  avatar: String,
  repoName: String,
  repoLink: String,
  stargazers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (results) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  results.map((result) => {
    var newRepo = new Repo({
      username: result.owner.login,
      userLink: result.owner.url,
      avatar: result.owner.avatar_url,
      repoName: result.name,
      repoLink: result.html_url,
      stargazers: result.stargazers_count
    });

    console.log("a repo:", {
      username: result.owner.login,
      userLink: result.owner.url,
      avatar: result.owner.avatar_url,
      repoName: result.name,
      repoLink: result.html_url,
      stargazers: result.stargazers_count
    });
  });
  
}

module.exports.save = save;