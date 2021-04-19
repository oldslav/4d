module.exports = {
  apps : [{
    name: "4D Innopolis",
    script: "dist/ssr",
    watch: true,
    instances: 4,
    exec_mode: "cluster",
    env: {
      "COMMON_VARIABLE": "true"
    },
    env_production : {
      "NODE_ENV": "production"
    },
    env_develpomemt : {
      "NODE_ENV": "development"
    }
  }],

  deploy : {
    production : {
      user : "server-user",
      host : "127.0.0.1",
      ref  : "origin/master",
      repo : "",
      path : "dist/ssr",
      postDeploy : "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
