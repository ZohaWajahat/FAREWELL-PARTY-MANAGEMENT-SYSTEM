const express = require('express');
const app = express();
const mysql = require("mysql");
const path = require('path');

const port = 3000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'Nightmare Files' directory
app.use(express.static(path.join(__dirname, 'Nightmare Files')));

// Set up your existing route handlers here

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Winxclub6!",
    database: "fast_farewell"
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        throw err;
    }
    console.log("Connected to DBMS!");
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});

app.get('/menu/vote', (req, res) => {
    res.redirect('/menu');
});

app.get('/menu/suggestion', (req, res) => {
    res.redirect('/menu');
});

app.get('/menu/subscribe', (req, res) => {
    res.redirect('/menu');
});

app.get('/invitation', (req, res) => {
    res.sendFile(path.join(__dirname, 'invitation.html'));
});

app.get('/invitation/invite', (req, res) => {
    res.redirect('/invitation');
});

app.get('/invitation/subscribe', (req, res) => {
    res.redirect('/invitation');
});


app.get('/ticket', (req, res) => {
    res.sendFile(path.join(__dirname, 'ticket.html'));
});

app.get('/ticket/tickets', (req, res) => {
    res.redirect('ticket.html');
});

app.get('/ticket/subscribe', (req, res) => {
    res.redirect('ticket.html');
});


app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});


app.get('/contact/contacts', (req, res) => {
    res.redirect('/contact');
});


app.get('/contact/subscribe', (req, res) => {
    res.redirect('/contact');
});


app.get('/update', (req, res) => {
    res.sendFile(path.join(__dirname, 'update.html'));
});


app.get('/update/task', (req, res) => {
    res.redirect('/update');
});


app.get('/update/subscribe', (req, res) => {
    res.redirect('/update');
});


app.get('/performance', (req, res) => {
    res.sendFile(path.join(__dirname, 'performance.html'));
});


app.get('/performance/suggestion', (req, res) => {
    res.redirect('/performance');
});


app.get('/performance/subscribe', (req, res) => {
    res.redirect('/performance');
});



// Handle login form submission
app.post('/login', (req, res) => {
    console.log(req.body); 

    const { Email, Password } = req.body;

    // Use prepared statement to prevent SQL injection
    const studentQuery = `SELECT email FROM students WHERE email = ?`;
    const teacherQuery = `SELECT email FROM teacher WHERE email = ?`;

    // Check in the Students table first
    connection.query(studentQuery, [Email], (studentErr, studentResults) => {
        if (studentErr) {
            console.error('Error executing student query:', studentErr);
            return res.status(500).send('Internal Server Error');
        }

        if (studentResults.length > 0) {
            // If a student is found, check password
            const student = `SELECT stu_password FROM students WHERE stu_password = ?`;
            connection.query(student, [Password], (studentsErr, studentsResults)=>{
                if (studentsErr) {
                    // If password is incorrect, display error message
                    return res.send('Incorrect password. Please try again.');
                } else {
                    // If login successful, redirect to main page or perform other actions
                    return res.redirect('/main');
                }
            })
        } else {
            // If no student found, check in the Teachers table
            connection.query(teacherQuery, [Email], (teacherErr, teacherResults) => {
                if (teacherErr) {
                    console.error('Error executing teacher query:', teacherErr);
                    return res.status(500).send('Internal Server Error');
                }

                if (teacherResults.length > 0) {
                    // If a teacher is found, check password
                    const Teacher = `SELECT teacher_password FROM teacher WHERE teacher_password = ?`;
                    connection.query(Teacher, [Password], (teachersErr, teachersResults)=>{
                        if (teachersErr) {
                            // If password is incorrect, display error message
                            return res.send('Incorrect password. Please try again.');
                        } else {
                            // If login successful, redirect to main page or perform other actions
                            return res.redirect('/main');
                        }
                    })
                } else {
                    // If no matching user found in both tables, display error message
                    return res.send('Email not registered. Please register first.');
                }
            });
        }
    });
});



// Handle registration form submission
app.post('/register', (req, res) => {
    const { FullName, Email, Password } = req.body;

    // Check if the email ends with '@nu.edu.pk'
    if (Email.endsWith('@nu.edu.pk')) {
        // If email ends with '@nu.edu.pk',
        // insert into the Students table
        const studentID = Email.split('@')[0];
        const studentQuery = `INSERT INTO students (student_id, student_name, email, stu_password) VALUES (?, ?, ?, ?)`;
        connection.query(studentQuery, [studentID, FullName, Email, Password], (studentErr, studentResults) => {
            if (studentErr) {
                console.error('Error executing student query:', studentErr);
                return res.status(500).send('Internal Server Error');
            }
            // Redirect to login page or perform other actions
            res.redirect('/register');
        });
    } else {
        // If email doesn't end with '@nu.edu.pk',
        // insert into the Teachers table
        const teacherQuery = `INSERT INTO teacher (teacher_name, email, teacher_password) VALUES (?, ?, ?)`;
        connection.query(teacherQuery, [FullName, Email, Password], (teacherErr, teacherResults) => {
            if (teacherErr) {
                console.error('Error executing teacher query:', teacherErr);
                return res.status(500).send('Internal Server Error');
            }
            // Redirect to login page or perform other actions
            res.redirect('/login');
        });
    }
});



//For storing emails for subscription in main page
app.post('/main', (req, res) => {
    const { Email } = req.body;

    // Check if the email ends with '@nu.edu.pk'
    if (Email.endsWith('@nu.edu.pk')) {
        // If email ends with '@nu.edu.pk',
        // retrieve data from the Students table
        const studentQuery = `SELECT student_name FROM students WHERE email = ?`;
        connection.query(studentQuery, [Email], (studentErr, studentResults) => {
            console.log(studentResults);
            if (studentErr) {
                console.error('Error executing student query:', studentErr);
                return res.status(500).send('Internal Server Error');
            }

            if (studentResults.length > 0) {
                // If the email belongs to a student, insert into invitations table with student's name
                const studentName = studentResults[0].student_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, studentName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/main');
                });
            } 
        });
    } else {
        // If email doesn't end with '@nu.edu.pk',
        // retrieve data from the Teachers table
        const teacherQuery = `SELECT teacher_name FROM teacher WHERE email = ?`;
        connection.query(teacherQuery, [Email], (teacherErr, teacherResults) => {
            if (teacherErr) {
                console.error('Error executing teacher query:', teacherErr);
                return res.status(500).send('Internal Server Error');
            }

            if (teacherResults.length > 0) {
                // If the email belongs to a teacher, insert into subscriptions table with teacher's name
                const teacherName = teacherResults[0].teacher_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, teacherName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/main');
                });
            }
        });
    }
});


// Menu voting route handler
// Menu voting route handler
app.post('/menu/vote', (req, res) => {
    const itemName = req.body.itemName;

    // Update the vote count in the database
    const updateQuery = `UPDATE menu SET votes = votes + 1 WHERE item_name = ?`;
    connection.query(updateQuery, [itemName], (updateErr, updateResults) => {
        if (updateErr) {
            console.error('Error updating vote count:', updateErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Update selection_status to 'Available' directly
        const updateStatusQuery = `UPDATE menu SET selection_status = 'Available' WHERE item_name = ?`;
        connection.query(updateStatusQuery, [itemName], (statusErr, statusResults) => {
            if (statusErr) {
                console.error('Error updating selection status:', statusErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            
            // Redirect after updating selection status
            res.redirect('/menu');
        });
    });
});


app.post('/menu/suggestion', (req, res) => {
    const {MenuItem} = req.body;
    const query = `INSERT INTO suggestMenu (suggestionName) VALUES (?)`;
    connection.query(query, [MenuItem], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Redirect to ticket page or perform other actions
        res.redirect('/menu');
    });
});


// Subscription route handler
app.post('/menu/subscribe', (req, res) => {
    const { Email } = req.body;

    // Check if the email ends with '@nu.edu.pk'
    if (Email.endsWith('@nu.edu.pk')) {
        // If email ends with '@nu.edu.pk',
        // retrieve data from the Students table
        const studentQuery = `SELECT student_name FROM students WHERE email = ?`;
        connection.query(studentQuery, [Email], (studentErr, studentResults) => {
            console.log(studentResults);
            if (studentErr) {
                console.error('Error executing student query:', studentErr);
                return res.status(500).send('Internal Server Error');
            }

            if (studentResults.length > 0) {
                // If the email belongs to a student, insert into invitations table with student's name
                const studentName = studentResults[0].student_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, studentName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/menu');
                });
            } 
        });
    } else {
        // If email doesn't end with '@nu.edu.pk',
        // retrieve data from the Teachers table
        const teacherQuery = `SELECT teacher_name FROM teacher WHERE email = ?`;
        connection.query(teacherQuery, [Email], (teacherErr, teacherResults) => {
            if (teacherErr) {
                console.error('Error executing teacher query:', teacherErr);
                return res.status(500).send('Internal Server Error');
            }

            if (teacherResults.length > 0) {
                // If the email belongs to a teacher, insert into subscriptions table with teacher's name
                const teacherName = teacherResults[0].teacher_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, teacherName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/menu');
                });
            }
        });
    }
});

//Sending invitations through Emails


app.post('/invitation/invite', (req, res) => {
    const { Email } = req.body;

    // Check if the email ends with '@nu.edu.pk'
    if (Email.endsWith('@nu.edu.pk')) {
        // If email ends with '@nu.edu.pk',
        // retrieve data from the Students table
        const studentQuery = `SELECT student_name FROM students WHERE email = ?`;
        connection.query(studentQuery, [Email], (studentErr, studentResults) => {
            console.log(studentResults);
            if (studentErr) {
                console.error('Error executing student query:', studentErr);
                return res.status(500).send('Internal Server Error');
            }

            if (studentResults.length > 0) {
                // If the email belongs to a student, insert into invitations table with student's name
                const studentName = studentResults[0].student_name;
                const insertQuery = `INSERT INTO invitations (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, studentName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/invitation');
                });
            } 
        });
    } else {
        // If email doesn't end with '@nu.edu.pk',
        // retrieve data from the Teachers table
        const teacherQuery = `SELECT teacher_name FROM teacher WHERE email = ?`;
        connection.query(teacherQuery, [Email], (teacherErr, teacherResults) => {
            if (teacherErr) {
                console.error('Error executing teacher query:', teacherErr);
                return res.status(500).send('Internal Server Error');
            }

            if (teacherResults.length > 0) {
                // If the email belongs to a teacher, insert into subscriptions table with teacher's name
                const teacherName = teacherResults[0].teacher_name;
                const insertQuery = `INSERT INTO invitations (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, teacherName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/invitation');
                });
            }
        });
    }
});


//Subscriptions in invitation page
app.post('/invitation/subscribe', (req, res) => {
    const { Email } = req.body;

    // Check if the email ends with '@nu.edu.pk'
    if (Email.endsWith('@nu.edu.pk')) {
        // If email ends with '@nu.edu.pk',
        // retrieve data from the Students table
        const studentQuery = `SELECT student_name FROM students WHERE email = ?`;
        connection.query(studentQuery, [Email], (studentErr, studentResults) => {
            console.log(studentResults);
            if (studentErr) {
                console.error('Error executing student query:', studentErr);
                return res.status(500).send('Internal Server Error');
            }

            if (studentResults.length > 0) {
                // If the email belongs to a student, insert into invitations table with student's name
                const studentName = studentResults[0].student_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, studentName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/invitation');
                });
            } 
        });
    } else {
        // If email doesn't end with '@nu.edu.pk',
        // retrieve data from the Teachers table
        const teacherQuery = `SELECT teacher_name FROM teacher WHERE email = ?`;
        connection.query(teacherQuery, [Email], (teacherErr, teacherResults) => {
            if (teacherErr) {
                console.error('Error executing teacher query:', teacherErr);
                return res.status(500).send('Internal Server Error');
            }

            if (teacherResults.length > 0) {
                // If the email belongs to a teacher, insert into subscriptions table with teacher's name
                const teacherName = teacherResults[0].teacher_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, teacherName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/invitation');
                });
            }
        });
    }
});


app.post('/ticket/tickets', (req, res) => {
    const {FullName, PhoneNo, Person, ReservationDate, CNIC, CVC, Message} = req.body;
    const query = `INSERT INTO Tickets (FullName, PhoneNo, Person, ReservationDate, CNIC, CVC, Message) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [FullName, PhoneNo, Person, ReservationDate, CNIC, CVC, Message], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Redirect to ticket page or perform other actions
        res.redirect('/ticket');
    });
});

app.post('/ticket/subscribe', (req, res) => {
    const { Email } = req.body;

    // Check if the email ends with '@nu.edu.pk'
    if (Email.endsWith('@nu.edu.pk')) {
        // If email ends with '@nu.edu.pk',
        // retrieve data from the Students table
        const studentQuery = `SELECT student_name FROM students WHERE email = ?`;
        connection.query(studentQuery, [Email], (studentErr, studentResults) => {
            console.log(studentResults);
            if (studentErr) {
                console.error('Error executing student query:', studentErr);
                return res.status(500).send('Internal Server Error');
            }

            if (studentResults.length > 0) {
                // If the email belongs to a student, insert into invitations table with student's name
                const studentName = studentResults[0].student_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, studentName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/ticket');
                });
            } 
        });
    } else {
        // If email doesn't end with '@nu.edu.pk',
        // retrieve data from the Teachers table
        const teacherQuery = `SELECT teacher_name FROM teacher WHERE email = ?`;
        connection.query(teacherQuery, [Email], (teacherErr, teacherResults) => {
            if (teacherErr) {
                console.error('Error executing teacher query:', teacherErr);
                return res.status(500).send('Internal Server Error');
            }

            if (teacherResults.length > 0) {
                // If the email belongs to a teacher, insert into subscriptions table with teacher's name
                const teacherName = teacherResults[0].teacher_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, teacherName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/ticket');
                });
            }
        });
    }
});



app.post('/contact/contacts', (req, res) => {
    const {FirstName, LastName, email, MobileNo, Message} = req.body;
    const query = `INSERT INTO contactBox (FirstName, LastName, email, MobileNo, Message) VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [FirstName, LastName, email, MobileNo, Message], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Redirect to ticket page or perform other actions
        res.redirect('/contact');
    });
});

app.post('/contact/subscribe', (req, res) => {
    const { Email } = req.body;

    // Check if the email ends with '@nu.edu.pk'
    if (Email.endsWith('@nu.edu.pk')) {
        // If email ends with '@nu.edu.pk',
        // retrieve data from the Students table
        const studentQuery = `SELECT student_name FROM students WHERE email = ?`;
        connection.query(studentQuery, [Email], (studentErr, studentResults) => {
            console.log(studentResults);
            if (studentErr) {
                console.error('Error executing student query:', studentErr);
                return res.status(500).send('Internal Server Error');
            }

            if (studentResults.length > 0) {
                // If the email belongs to a student, insert into invitations table with student's name
                const studentName = studentResults[0].student_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, studentName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/contact');
                });
            } 
        });
    } else {
        // If email doesn't end with '@nu.edu.pk',
        // retrieve data from the Teachers table
        const teacherQuery = `SELECT teacher_name FROM teacher WHERE email = ?`;
        connection.query(teacherQuery, [Email], (teacherErr, teacherResults) => {
            if (teacherErr) {
                console.error('Error executing teacher query:', teacherErr);
                return res.status(500).send('Internal Server Error');
            }

            if (teacherResults.length > 0) {
                // If the email belongs to a teacher, insert into subscriptions table with teacher's name
                const teacherName = teacherResults[0].teacher_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, teacherName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/contact');
                });
            }
        });
    }
});


app.post('/update/task', (req, res) => {
    const {Email, Task} = req.body;
    const query = `INSERT INTO assigned_task (email, TaskName) VALUES (?, ?)`;
    connection.query(query, [Email, Task], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Redirect to ticket page or perform other actions
        res.redirect('/update');
    });
});


app.post('/update/subscribe', (req, res) => {
    const { Email } = req.body;

    // Check if the email ends with '@nu.edu.pk'
    if (Email.endsWith('@nu.edu.pk')) {
        // If email ends with '@nu.edu.pk',
        // retrieve data from the Students table
        const studentQuery = `SELECT student_name FROM students WHERE email = ?`;
        connection.query(studentQuery, [Email], (studentErr, studentResults) => {
            console.log(studentResults);
            if (studentErr) {
                console.error('Error executing student query:', studentErr);
                return res.status(500).send('Internal Server Error');
            }

            if (studentResults.length > 0) {
                // If the email belongs to a student, insert into invitations table with student's name
                const studentName = studentResults[0].student_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, studentName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/update');
                });
            } 
        });
    } else {
        // If email doesn't end with '@nu.edu.pk',
        // retrieve data from the Teachers table
        const teacherQuery = `SELECT teacher_name FROM teacher WHERE email = ?`;
        connection.query(teacherQuery, [Email], (teacherErr, teacherResults) => {
            if (teacherErr) {
                console.error('Error executing teacher query:', teacherErr);
                return res.status(500).send('Internal Server Error');
            }

            if (teacherResults.length > 0) {
                // If the email belongs to a teacher, insert into subscriptions table with teacher's name
                const teacherName = teacherResults[0].teacher_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, teacherName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/update');
                });
            }
        });
    }
});


app.post('/performance/suggestion', (req, res) => {
    const {PerformerItem} = req.body;
    const query = `INSERT INTO suggestPerformance (suggestionName) VALUES (?)`;
    connection.query(query, [PerformerItem], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Redirect to ticket page or perform other actions
        res.redirect('/performance');
    });
});


app.post('/performance/subscribe', (req, res) => {
    const { Email } = req.body;

    // Check if the email ends with '@nu.edu.pk'
    if (Email.endsWith('@nu.edu.pk')) {
        // If email ends with '@nu.edu.pk',
        // retrieve data from the Students table
        const studentQuery = `SELECT student_name FROM students WHERE email = ?`;
        connection.query(studentQuery, [Email], (studentErr, studentResults) => {
            console.log(studentResults);
            if (studentErr) {
                console.error('Error executing student query:', studentErr);
                return res.status(500).send('Internal Server Error');
            }

            if (studentResults.length > 0) {
                // If the email belongs to a student, insert into invitations table with student's name
                const studentName = studentResults[0].student_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, studentName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/performance');
                });
            } 
        });
    } else {
        // If email doesn't end with '@nu.edu.pk',
        // retrieve data from the Teachers table
        const teacherQuery = `SELECT teacher_name FROM teacher WHERE email = ?`;
        connection.query(teacherQuery, [Email], (teacherErr, teacherResults) => {
            if (teacherErr) {
                console.error('Error executing teacher query:', teacherErr);
                return res.status(500).send('Internal Server Error');
            }

            if (teacherResults.length > 0) {
                // If the email belongs to a teacher, insert into subscriptions table with teacher's name
                const teacherName = teacherResults[0].teacher_name;
                const insertQuery = `INSERT INTO subscriptions (email, FullName) VALUES (?, ?)`;
                connection.query(insertQuery, [Email, teacherName], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing insert query:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.redirect('/performance');
                });
            }
        });
    }
});