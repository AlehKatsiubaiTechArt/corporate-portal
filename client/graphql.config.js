module.exports = {
  projects: {
    app: {
      schema: 'http://localhost:4000/graphql',
      documents: '**/*.{gql,graphql,js,ts,jsx,tsx}',
      extensions: {
        codegen: [
          {
            generator: 'graphql-binding',
            language: 'typescript',
            output: {
              binding: 'src/graphql.tsx',
            },
          },
        ],
        endpoints: {
          default: {
            url: 'http://localhost:4000/graphql',
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM0MDJmZGRmNGFhZDNmNDY3NjMxMGIiLCJpYXQiOjE2MDczNzgwMTksImV4cCI6MTYwODI0MjAxOX0.U0b3Gv-uwvZnABsGZYTsn6cv6XkBS6gLO3tqEt7HDek`,
            },
          },
        },
      },
    },
  },
}
