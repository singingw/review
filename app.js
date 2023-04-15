if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const routes = require('./routes')
const usePassport = require('./config/passport')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

const hbs = exphbs.create({
    partialsDir: 'views/partials/',
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main.handlebars',
    helpers: handlebarsHelpers
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})