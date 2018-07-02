module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/qselfexpress',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/qselfexpress_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: "postgres://gehjiwjilzqzqy:3f638227c6be5730e147e0bc21cea7bbd187934f8dc0de8621403f840894e105@ec2-54-163-236-188.compute-1.amazonaws.com:5432/d168cs22csre4r",
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
}
