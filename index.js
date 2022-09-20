const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001;


conn.sync({ force: false }).then(async () => {
    server.listen(PORT, () => console.log(`server listening on ${PORT}`))
})
