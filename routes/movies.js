var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM movies ORDER BY id DESC',function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('movie/list', {
                    title: 'Movie List',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('movie/list', {
                    title: 'Movie List', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/add', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('movie/add', {
        title: 'Add New Movie',
        m_title: '',
        director: '',
        description: '',
        year: '',
        genre: ''        
    })
})
 
// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){    
    req.assert('m_title', 'Movie Title is required').notEmpty()
    req.assert('director', 'director is required').notEmpty()           //Validate name
    req.assert('description', 'description is required').notEmpty()
    req.assert('year', 'Age is required').notEmpty()             //Validate age
    req.assert('genre', 'A valid email is required').notEmpty()  //Validate email

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        /********************************************
         * Express-validator module
         
        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';
 
        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var movie = {
            m_title: req.sanitize('m_title').escape().trim(),
            director: req.sanitize('director').escape().trim(),
            description: req.sanitize('description').escape().trim(),
            year: req.sanitize('year').escape().trim(),
            genre: req.sanitize('genre').escape().trim()
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO movies SET ?', movie, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/add', {
                        title: 'Add New User',
                        m_title: movie.m_title,
                        director: movie.director,
                        description: movie.description,
                        year: movie.age,
                                     
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('movie/add', {
                        title: 'Add New User',
                        m_title: '',
                        director: '',
                        description: '',
                        year: '',
                        genre: ''                    
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('movie/add', { 
            title: 'Add New User',
            m_title: req.body.m_title,
            director: req.body.director,
            description: req.body.description,
            year: req.body.year,
            genre: req.body.genre
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM movies WHERE id = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with id = ' + req.params.id)
                res.redirect('/movies')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('movie/edit', {
                    title: 'Edit User', 
                    //data: rows[0],
                    id: rows[0].id,
                    m_title: rows[0].m_title,
                    director: rows[0].director,
                    description: rows[0].description,
                    year: rows[0].year,
                    genre: rows[0].genre                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
    req.assert('m_title', 'movie title is required').notEmpty() 
    req.assert('director', 'Name is required').notEmpty()           //Validate name
    req.assert('description', 'description is required').notEmpty()
    req.assert('year', 'Age is required').notEmpty()             //Validate age
    req.assert('genre', 'A valid email is required').notEmpty()  //Validate email
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        /********************************************
         * Express-validator module
         
        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';
 
        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var movie = {
            m_title: req.sanitize('m_title').escape().trim(),
            director: req.sanitize('director').escape().trim(),
            description: req.sanitize('description').escape().trim(),
            year: req.sanitize('year').escape().trim(),
            genre: req.sanitize('genre').escape().trim()
        }
        
        req.getConnection(function(error, conn) {
            conn.query('UPDATE movies SET ? WHERE id = ' + req.params.id, movie, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('movie/edit', {
                        title: 'Edit User',
                        m_title: req.params.m_title,
                        id: req.params.id,
                        director: req.body.director,
                        description: req.body.description,
                        year: req.body.year,
                        genre: req.body.genre
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('movie/edit', {
                        title: 'Edit User',
                        m_title: req.params.m_title,
                        id: req.params.id,
                        director: req.body.director,
                        description: req.body.description,
                        year: req.body.year,
                        genre: req.body.genre
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('movie/edit', { 
            title: 'Edit User', 
            m_title: req.params.m_title,           
            id: req.params.id, 
            director: req.body.director,
            description: req.body.description,
            year: req.body.year,
            genre: req.body.genre
        })
    }
})


// DELETE USER
// app.delete('/delete/(:id)', function(req, res, next) {
//     var movie = { id: req.params.id }
    
//     req.getConnection(function(error, conn) {
//         conn.query('DELETE FROM movies WHERE id = ' + req.params.id, movie, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 req.flash('error', err)
//                 // redirect to users list page
//                 res.redirect('/movies')
//             } else {
//                 req.flash('success', 'movie deleted successfully!')
//                 // redirect to users list page
//                 res.redirect('/movies')
//             }
//         })
//     })
// })





// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
    var movie = { id: req.params.id }
    
    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM movies WHERE id = ' + req.params.id, movie, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/movies')
            } else {
                req.flash('success', 'movie deleted successfully!')
                // redirect to users list page
                res.redirect('/movies')
            }
        })
    })
})




//Delete one single Movie

// DELETE All Movies

app.delete('/deleteAll/', function(req, res, next) {
    
    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM movies', function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/movies')
            } else {
                req.flash('success', 'movie deleted successfully!')
                // redirect to users list page
                res.redirect('/movies')
            }
        })
    })
})


// app.delete('/delete2(:movies)', function(req, res, next) {
//     var movie = { movies: req.params.movies }

//     req.getConnection(function(error, conn) {
//         conn.query('DELETE FROM movies', function(err, result) {

//             if (err) {
//                 req.flash('error', err)
//                 res.redirect('/movies')
//             } else {
//                 req.flash('success', 'All movies have been successfully deleted!')
//                 res.redirect('/movies')
//             }
//         })
//     })
// })




// // //Search Route functionality
// app.get('/', function(req, res){
//     res.render('index');
// });

// app.get('/Search', function(req, res) {
//     conn.query('SELECT m_title FROM movies WHERE m_title LIKE "%'+req.query.key+'%"', function(err, rows){
//         if (err) throw err;
//         var data = [];
//         for (i=0; i<rows.length; i++)
//         {
//             data.push(rows[i].m_title);
//         }
//         res.end(JSON.stringify(data));
//     });
// });



// //Search Route functionality
// router.get("/", function(req, res){
//     //get all names from the database

// })


//search
app.get('/search', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('movie/search', {
        title: 'Search Movies' 
              
    });

});


    app.post('/search2', function(req, res, next){  
    
    const input = req.body.search; 
    console.log(input); 
    // render to views/user/add.ejs

    req.getConnection(function(error,conn){
        conn.query('SELECT * FROM movies WHERE m_title  LIKE "%' +input+'%"',
            function(err,rows,fields){


             if (err) {
                req.flash('error', err)
                res.render('movie/list', {
                    title: 'Sorry', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                console.log(rows);
                res.render('movie/list', {
                    title: 'Search Results', 
                    data: rows
                })
            }


                  
            });          
            



        });
    });
 
module.exports = app