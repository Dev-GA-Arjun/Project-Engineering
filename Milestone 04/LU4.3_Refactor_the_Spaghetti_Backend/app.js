const express = require('express');
const PORT = 3000

const app = express();


app.use(express.json());

const postRoutes = require('./routes/posts.routes')
const userRoutes = require('./routes/users.routes')

app.use('/api/v1/', postRoutes)
app.use('/api/v1/', userRoutes)


app.listen(PORT, () => console.log('Server running on port 3000'));
