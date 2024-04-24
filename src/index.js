// Import Libraries
const path = require('path')
const express = require('express')
//const morgan = require('morgan')
//const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const route = require('./routes')
const db = require('./config/db')
const cookieParser = require('cookie-parser');

//Connect to Database
db.conn()

// Other variables
const app = express()
const port = 3000

//

// Method overriding
app.use(methodOverride('_method'));
app.use(cookieParser());

//
app.use(
  express.urlencoded({
      extended: true,
  }),
);

//
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')))

app.use(function SortMiddleware(req, res, next) {
    
  res.locals._sort = {
      enable: false,
      type: 'default',
  };

  if (req.query.hasOwnProperty('_sort')){
      Object.assign(res.locals._sort, {
          enable: true,
          type: req.query.type,
          collumn: req.query.collumn,
      })
  }

  next();
});

//Template Engine
// app.engine(
//   'hbs',
//   engine({
//       extname: '.hbs',
//       helpers: {
//           sum: (a, b) => a + b,
//           sortable: (fieldName, sort) => {

//               const sortType = fieldName === sort.collumn ? sort.type : 'default';
//               const icons = {
//                   default: 'bi bi-caret-left-fill',
//                   asc: 'bi bi-sort-down-alt',
//                   desc: 'bi bi-sort-down',
//               };

//               const types = {
//                   default: 'asc',
//                   asc: 'desc',
//                   desc: 'asc',
//               }

//               const icon = icons[sortType];
//               const type = types[sortType];

//               return `<a href="?_sort&collumn=${fieldName}&type=${type}">
//                           <i class="${icon}"></i>
//                       </a>`;
//           },         
//       },
//   }),
// );


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'resource/views' ))


//HTTP loger
//app.use(morgan('combined'))

// Response

// Routes
route(app)


// Listening socket
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})