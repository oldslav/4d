module.exports = {
  apps : [{
    name: "4D Innopolis",
    script: "dist/ssr",
    watch: true,
    instances: 1,
    exec_mode: "cluster",
    env: {
      "COMMON_VARIABLE": "true"
    },
    env_production : {
      "NODE_ENV": "production"
    },
    env_development : {
      "NODE_ENV": "development"
    }
  }],

  deploy : {
    production : {
      user : "node",
      host : "127.0.0.1",
      ref  : "origin/master",
      repo : "",
      path : "dist/ssr",
      postDeploy : "pm2 startOrRestart ecosystem.config.js --env production"
    },
    development : {
      user : "node",
      host : "127.0.0.1",
      ref  : "origin/master",
      repo : "",
      path : "dist/ssr",
      postDeploy : "pm2 startOrRestart ecosystem.config.js --env development"
    }
  }
};
