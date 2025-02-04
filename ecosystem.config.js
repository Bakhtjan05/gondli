require('dotenv').config();

module.exports = {
  apps: [
    {
      name: process.env.NEXT_PUBLIC_APP_NAME,
      script: 'npm',
      args: 'run start',
      env: {
        PORT: process.env.NEXT_PUBLIC_APP_PORT,
        NODE_ENV: 'production',
      },
    },
  ],
};
