const fs = require("fs");
const path = require('path');

const signUpUser = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body += data;   
    });

    request.on("end", function() {
      let user = JSON.parse(body);    
      const username = user.username;
      let responseObj = {
        status: "success", 
        user
      };

      user = JSON.stringify(user);
      fs.writeFileSync(path.resolve('./src/db/users', `${username}.json`), user);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(responseObj));
    });
  }
};

module.exports = signUpUser;
