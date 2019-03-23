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
  Repo.deleteMany({username: result.owner.login}, (err) => { throw err });

  results.map((result) => {
    var newRepo = new Repo({
      username: result.owner.login,
      userLink: result.owner.url,
      avatar: result.owner.avatar_url,
      repoName: result.name,
      repoLink: result.html_url,
      stargazers: result.stargazers_count
    });

    newRepo.save((err, newRepo) => {
      if (err) throw err;
    });
  });
}

module.exports.save = save;