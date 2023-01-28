// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = {
  mongodb: {
    url: process.env.DB_ATLAS_CONNECTION_STRING,
    databaseName: process.env.DB_NAME,
    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'src/db/migrations',

  // eslint-disable-next-line max-len
  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.js',

  moduleSystem: 'commonjs',
};

// Return the config as a promise
module.exports = config;
