module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/robopocalypse",
  "SESSION_SECRET": "The Hawk is mad.",
  "TWITTER": {
    "consumerKey": "XkWiZuh27Y0yLnFKmVQmXdSMU",
    "consumerSecret": "50wVndKTDFFhuw8lOjScx7dGUKrqoUQn2Gw7mVHi9PqxVkPP9Y",
    // twitter doesn't like localhost callback url, unfortunately, so I replaced with my IP
    "callbackUrl": "http://192.168.0.3:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "INSERT_FACEBOOK_CLIENTID_HERE",
    "clientSecret": "INSERT_FACEBOOK_CLIENT_SECRET_HERE",
    "callbackURL": "http://localhost:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "812434981264-s8sqofumpvrkebffh25fk4omhskj6jdh.apps.googleusercontent.com",
    "clientSecret": "HD-5hNBNKMIKZYxUY-bCOvqx",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  }
};