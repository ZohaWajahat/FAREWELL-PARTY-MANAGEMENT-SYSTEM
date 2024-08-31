create database fast_farewell;
use fast_farewell;

create table students (
    student_id CHAR(8) PRIMARY KEY,
    student_name VARCHAR(20),
    email VARCHAR(20),
    stu_password VARCHAR(20),
    contactnumber VARCHAR(20),
    reg_id CHAR(20) DEFAULT NULL
    );
    
INSERT INTO students (student_id, student_name, email, stu_password, contactnumber) VALUES
('22I-0004', 'Ayesha Ahmed', 'i220004@nu.edu.pk', 'password1', '1234567890'),
('22I-0005', 'Ali Khan', 'i220005@nu.edu.pk', 'password2', '2345678901'),
('22I-0006', 'Sana Malik', 'i220006@nu.edu.pk', 'password3', '3456789012'),
('22I-0007', 'Imran Khan', 'i220007@nu.edu.pk', 'password4', '4567890123'),
('22I-0008', 'Zainab Ali', 'i220008@nu.edu.pk', 'password5', '5678901234'),
('22I-0009', 'Omar Farooq', 'i220009@nu.edu.pk', 'password6', '6789012345'),
('22I-0010', 'Maryam Khan', 'i220010@nu.edu.pk', 'password7', '7890123456'),
('22I-0011', 'Hassan Malik', 'i220011@nu.edu.pk', 'password8', '8901234567'),
('22I-0012', 'Sara Khan', 'i220012@nu.edu.pk', 'password9', '9012345678'),
('22I-0013', 'Bilal Ahmed', 'i220013@nu.edu.pk', 'password10', '0123456789');

    
-- multi valued attribute
 create table students_preferences(
	student_id CHAR(8),
    dietary_preferences VARCHAR(20),
    primary key(student_id,dietary_preferences),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
    );
    
INSERT INTO students_preferences (student_id, dietary_preferences) VALUES
('22I-0004', 'Vegetarian'),
('22I-0004', 'Halal'),
('22I-0005', 'Vegetarian'),
('22I-0006', 'Vegan'),
('22I-0006', 'Gluten-Free'),
('22I-0007', 'Halal'),
('22I-0007', 'Vegetarian'),
('22I-0010', 'Halal'),
('22I-0012', 'Kosher');

 create table students_family(
	student_id CHAR(8),
    srn INT,
    member_name VARCHAR(20),
    -- relation VARCHAR(20),
    reg_id CHAR(20) UNIQUE NOT NULL,
    primary key(student_id,srn),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
    );
    
-- INSERT INTO students_family (student_id,srn, member_name, relation)
-- VALUES
-- ('22I-0004',1, 'Ali', 'Brother'),
-- ('22I-0004',2, 'Fatima', 'Sister'),
-- ('22I-0005',1, 'Hassan', 'Brother'),
-- ('22I-0005',2, 'Aisha', 'Sister'),
-- ('22I-0006',1, 'Ahmed', 'Brother'),
-- ('22I-0007',1, 'Sara', 'Sister'),
-- ('22I-0008',1, 'Zainab', 'Sister'),
-- ('22I-0008',2, 'Omar', 'Brother'),
-- ('22I-0009',1, 'Maryam', 'Sister'),
-- ('22I-0010',1, 'Bilal', 'Brother');

-- create menu table 
    create table menu (
    item_id CHAR(10) PRIMARY KEY,
    item_name VARCHAR(50),
    selection_status VARCHAR(20),
    votes INT(8)
    );
    
INSERT INTO menu (item_id, item_name, selection_status, votes) VALUES
('ITEM-0001', 'Ramen', 'Not Available', 0),
('ITEM-0002', 'Beef and Onion', 'Not Available', 0),
('ITEM-0003', 'Dumplings', 'Not Available', 0),
('ITEM-0004', 'Sushi', 'Not Available', 0),
('ITEM-0005', 'Biryani', 'Not Available', 0),
('ITEM-0006', 'Channa and Puri Platter 1', 'Not Available', 0),
('ITEM-0007', 'Chicken Karahi', 'Not Available', 0),
('ITEM-0008', 'Channa and Puri Platter 2', 'Not Available', 0),
('ITEM-0009', 'Burger', 'Not Available', 0),
('ITEM-0010', 'Fruit Salad', 'Not Available', 0),
('ITEM-0011', 'Fried Shrimp', 'Not Available', 0),
('ITEM-0012', 'Steaks', 'Not Available', 0),
('ITEM-0013', 'Lemonade', 'Not Available', 0),
('ITEM-0014', 'Jameshiri', 'Not Available', 0),
('ITEM-0015', 'Mix Fruit Juice', 'Not Available', 0),
('ITEM-0016', 'VIP Lemonade', 'Not Available', 0),
('ITEM-0017', 'Brownie IceCream', 'Not Available', 0),
('ITEM-0018', 'Kheer', 'Not Available', 0),
('ITEM-0019', 'Gulab Jammun', 'Not Available', 0),
('ITEM-0020', 'Dora Cakes', 'Not Available', 0);
    
-- multi valued attribute
 create table menu_preferences(
	item_id CHAR(10),
    dietary_details VARCHAR(50),
    primary key(item_id,dietary_details),
    FOREIGN KEY (item_id) REFERENCES menu(item_id)
    );
    
    -- Inserting data into the menu_preferences table
INSERT INTO menu_preferences (item_id, dietary_details) VALUES
('ITEM-0001', 'Vegetarian'),
('ITEM-0001', 'Vegan'),
('ITEM-0001', 'Gluten-Free'),
('ITEM-0002', 'Non-Vegetarian'),
('ITEM-0003', 'Vegetarian'),
('ITEM-0003', 'Vegan'),
('ITEM-0003', 'Gluten-Free'),
('ITEM-0004', 'Non-Vegetarian'),
('ITEM-0004', 'Gluten-Free'),
('ITEM-0005', 'Vegetarian'),
('ITEM-0005', 'Vegan'),
('ITEM-0005', 'Gluten-Free'),
('ITEM-0006', 'Vegetarian'),
('ITEM-0006', 'Vegan'),
('ITEM-0007', 'Non-Vegetarian'),
('ITEM-0008', 'Vegetarian'),
('ITEM-0008', 'Vegan'),
('ITEM-0009', 'Non-Vegetarian'),
('ITEM-0009', 'Gluten-Free'),
('ITEM-0010', 'Vegetarian'),
('ITEM-0010', 'Vegan'),
('ITEM-0010', 'Gluten-Free'),
('ITEM-0011', 'Non-Vegetarian'),
('ITEM-0012', 'Non-Vegetarian'),
('ITEM-0012', 'Gluten-Free'),
('ITEM-0013', 'Vegetarian'),
('ITEM-0013', 'Vegan'),
('ITEM-0014', 'Vegetarian'),
('ITEM-0014', 'Vegan'),
('ITEM-0015', 'Vegetarian'),
('ITEM-0015', 'Vegan'),
('ITEM-0015', 'Gluten-Free'),
('ITEM-0016', 'Vegetarian'),
('ITEM-0016', 'Vegan'),
('ITEM-0016', 'Gluten-Free'),
('ITEM-0017', 'Vegetarian'),
('ITEM-0018', 'Vegetarian'),
('ITEM-0018', 'Vegan'),
('ITEM-0018', 'Gluten-Free'),
('ITEM-0019', 'Vegetarian'),
('ITEM-0019', 'Vegan'),
('ITEM-0020', 'Vegetarian'),
('ITEM-0020', 'Vegan'),
('ITEM-0020', 'Gluten-Free');


    
    -- menu suggestion
     create table menu_suggestion(
     student_id char(8),
     vote_id char(8), -- INT auto_increment,
	item_id CHAR(10),
    primary key(student_id,item_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (item_id) REFERENCES menu(item_id)
    );
       
    drop table menu_suggestion;
    
DELIMITER //
CREATE TRIGGER update_votes AFTER INSERT ON menu_suggestion
FOR EACH ROW
BEGIN
    DECLARE max_votes INT;
    DECLARE max_item_id CHAR(10);
	DECLARE item_count INT;
    
	SELECT COUNT(*) INTO item_count FROM menu_suggestion WHERE item_id = NEW.item_id;
    UPDATE menu SET votes = item_count WHERE item_id = NEW.item_id;
    SELECT item_id, MAX(votes) INTO max_item_id, max_votes FROM menu GROUP BY item_id ORDER BY max_votes DESC LIMIT 1;
    UPDATE menu SET selection_status = 'Selected' WHERE item_id = max_item_id;
    
END //
DELIMITER ;

INSERT INTO menu_suggestion (student_id, vote_id, item_id) VALUES
('22I-0004', 'V-0001', 'ITEM-0001'),
('22I-0004', 'V-0002', 'ITEM-0002'),
('22I-0004', 'V-0006', 'ITEM-0003'),
('22I-0008', 'V-0003', 'ITEM-0003'),
('22I-0010', 'V-0004', 'ITEM-0004'),
('22I-0010', 'V-0005', 'ITEM-0005');


INSERT INTO menu_suggestion (student_id, vote_id, item_id) VALUES
('22I-0010', 'V-0006', 'ITEM-0001'),
('22I-0011', 'V-0007', 'ITEM-0001');

select * from menu;

-- create perf
create table performance (
    performance_id CHAR(10) PRIMARY KEY,
    special_requirements VARCHAR(80),
    performance_type VARCHAR(80),
    selection_status VARCHAR(20),
    duration time,
	student_id CHAR(8),
    votes INT(8),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
    );
    
    INSERT INTO performance (performance_id, special_requirements, performance_type, selection_status, duration, student_id, votes) VALUES
('PERF-0001', 'None', 'Music', 'Pending', '02:30:00', '22I-0004', 10),
('PERF-0002', 'None', 'Dance', 'Pending', '03:15:00', '22I-0005', 20),
('PERF-0003', 'None', 'Drama', 'Pending', '01:45:00', '22I-0006', 15),
('PERF-0004', 'Microphone', 'Music', 'Pending', '04:00:00', '22I-0007', 18),
('PERF-0005', 'None', 'Poetry', 'Pending', '00:45:00', '22I-0008', 22);

create table perf_proposal(
     performance_id char(10),
     performance_vote_id char(8), -- INT auto_increment,
	student_id CHAR(8),
    primary key(student_id,performance_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (performance_id) REFERENCES performance(performance_id)
    );

DELIMITER //
CREATE TRIGGER update_votes_perf AFTER INSERT ON perf_proposal
FOR EACH ROW
BEGIN
    DECLARE max_votes INT;
    DECLARE max_performance_id CHAR(10);
    
    UPDATE performance 
    SET votes = (
        SELECT COUNT(*) 
        FROM perf_proposal 
        WHERE performance_id = NEW.performance_id
    ) 
    WHERE performance_id = NEW.performance_id;
    
SELECT performance_id INTO max_performance_id
FROM performance 
ORDER BY votes DESC 
LIMIT 1;

UPDATE performance 
SET selection_status = 'Approved' 
WHERE performance_id = max_performance_id;
END //
DELIMITER ;

-- Insert values into the perf_proposal table
INSERT INTO perf_proposal (performance_id, performance_vote_id, student_id) VALUES
('PERF-0001', 'PV-0001', '22I-0004'),
('PERF-0001', 'PV-0002', '22I-0005'),
('PERF-0002', 'PV-0003', '22I-0006'),
('PERF-0002', 'PV-0004', '22I-0007'),
('PERF-0003', 'PV-0005', '22I-0008');

    
select * from performance;

    -- teacher table
    create table teacher(
    teacher_id CHAR(8) PRIMARY KEY,
    teacher_name VARCHAR(20),
    teacher_password VARCHAR(20),
    contactnumber VARCHAR(20),
    email VARCHAR(50),
    reg_id CHAR(20) default null
    );
    
    INSERT INTO teacher (teacher_id, teacher_name, teacher_password, contactnumber, email) VALUES
('T-0001', 'Ali Khan', 'teacherpass1', '1234567890', 'alikhan@isb.nu.edu.pk'),
('T-0002', 'Fatima Ahmed', 'teacherpass2', '2345678901', 'fatimaahmed@isb.nu.edu.pk'),
('T-0003', 'Sana Malik', 'teacherpass3', '3456789012', 'sanamalik@isb.nu.edu.pk');

    
    
 create table teacher_family(
	teacher_id CHAR(8),
    srn INT,
    member_name VARCHAR(20),
    reg_id CHAR(20) UNIQUE NOT NULL,
    primary key(teacher_id,srn),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
    );
    
-- INSERT INTO teacher_family (teacher_id, srn, member_name, relation, reg_id) VALUES
-- ('T-0001', 1, 'Ahmed Khan', 'Spouse', NULL),
-- ('T-0001', 2, 'Ayesha Khan', 'Daughter', NULL),
-- ('T-0002', 1, 'Sara Ahmed', 'Spouse', NULL),
-- ('T-0002', 2, 'Hassan Ahmed', 'Son', NULL),
-- ('T-0003', 1, 'Zainab Malik', 'Spouse', NULL);

 -- create table register
 create table register(
    reg_id char(20) primary key,
	reg_fees INT(5),
	no_of_attending_members INT(5),
	student_id CHAR(8),
    teacher_id CHAR(8),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
    );


-- Change the delimiter for creating the trigger
DELIMITER //

-- Create the trigger
CREATE TRIGGER fill_registration_info BEFORE INSERT ON register
FOR EACH ROW
BEGIN
    DECLARE i INT DEFAULT 1;
    
    IF (NEW.student_id IS NOT NULL AND NEW.teacher_id IS NOT NULL) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot fill both student_id and teacher_id at the same time';
    END IF;
    
    IF (NEW.teacher_id IS NOT NULL) THEN
        UPDATE teacher SET reg_id = NEW.reg_id WHERE teacher_id = NEW.teacher_id;
        
        SET NEW.no_of_attending_members = NEW.no_of_attending_members;

        WHILE i <= NEW.no_of_attending_members DO
            INSERT INTO teacher_family (teacher_id, srn, member_name, reg_id) 
            VALUES (NEW.teacher_id,i, CONCAT('Family Member ', i), CONCAT(NEW.reg_id, '-', i));
            SET i = i + 1;
        END WHILE;
        
        SET NEW.reg_fees = NULL;
    END IF;
    
    IF (NEW.student_id IS NOT NULL) THEN
        UPDATE students SET reg_id = NEW.reg_id WHERE student_id = NEW.student_id;
        
        SET NEW.no_of_attending_members = NEW.no_of_attending_members;

        WHILE i <= NEW.no_of_attending_members DO
            INSERT INTO students_family (student_id, srn, member_name, reg_id) 
            VALUES (NEW.student_id,i, CONCAT('Family Member ', i), CONCAT(NEW.reg_id, '-', i));
            SET i = i + 1;
        END WHILE;
        SET NEW.teacher_id = NULL;
    END IF;
END //

-- Revert the delimiter back to semicolon
DELIMITER ;

-- Inserting student registrations
INSERT INTO register (reg_id,no_of_attending_members,reg_fees,student_id) 
VALUES 
('REG0001',1, 100, '22I-0004'),
('REG0002',2, 150, '22I-0008'),
('REG0003',3, 200, '22I-0005'),
('REG0004',1, 120, '22I-0011'),
('REG0005',1, 180, '22I-0010');

-- Inserting teacher registrations
INSERT INTO register (reg_id, reg_fees, no_of_attending_members, teacher_id) 
VALUES 
('REG0006', 200, 2, 'T-0001'),
('REG0007', 250, 2, 'T-0002'),
('REG0008', 300, 1, 'T-0003');

select * from register;
select * from students;
select * from subscriptions;
select * from teacher;
select * from teacher_family;
select * from students_family;
    -- create organizer
    create table organizer(
    organizer_id char(8) primary key,
    organizer_name varchar(20),
    email varchar(50),
    organizer_password varchar(20),
    contactNumber varchar(20)
    ); 
    
    INSERT INTO organizer (organizer_id, organizer_name, email, organizer_password, contactNumber) 
VALUES 
('ORG-001', 'Ali Khan', 'ali.khan@isb.nu.edu.pk', 'password1', '1234567890'),
('ORG-002', 'Ayesha Ahmed', 'ayesha.ahmed@isb.nu.edu.pk', 'password2', '2345678901'),
('ORG-003', 'Sana Malik', 'sana.malik@isb.nu.edu.pk', 'password3', '3456789012');

    
    -- create task table
 create table task(
    task_id char(8) primary key,
	volunteer_status varchar(20),
    task_status varchar(20),
	task_desc varchar(20),
	student_id CHAR(8),
    organizer_id CHAR(8),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (organizer_id) REFERENCES organizer(organizer_id)
    );
    
INSERT INTO task (task_id, task_status, volunteer_status, task_desc, student_id, organizer_id) 
VALUES 
('TASK001', 'Pending', 'Active', 'Assist in setup', '22I-0005', 'ORG-001'),
('TASK002', 'Completed', 'Inactive', 'Food distribution', '22I-0008', 'ORG-002'),
('TASK003', 'Pending', 'Active', 'Event coordination', '22I-0010', 'ORG-003');


    -- create attendence
 create table attendence(
    attendence_id char(8),
    reg_id char(20),
    teacher_reg_id char(20),
    student_reg_id char(20),
	attendence_status varchar(10),
	attendence_report TEXT,
    special_request varchar(20),
    primary key (attendence_id,reg_id),
   -- organizer_id CHAR(8),
    FOREIGN KEY (student_reg_id) REFERENCES students_family(reg_id),
    FOREIGN KEY (teacher_reg_id ) REFERENCES teacher_family(reg_id),
    FOREIGN KEY (reg_id) REFERENCES register(reg_id)
   -- FOREIGN KEY (organizer_id) REFERENCES organizer(organizer_id)
    );
    INSERT INTO attendence (attendence_id, reg_id, attendence_status, attendence_report, special_request) 
VALUES 
('ATTN024', 'REG0001', 'Present', 'Good participation in the event.', 'None'),
('ATTN024', 'REG0002', 'Absent', 'Unable to attend due to prior commitments.', 'None'),
('ATTN024', 'REG0003', 'Present', 'Good participation in the event.', 'None'),
('ATTN024', 'REG0004', 'Absent', 'Unable to attend due to prior commitments.', 'None'),
('ATTN024', 'REG0005', 'Present', 'Good participation in the event.', 'None'),
('ATTN024', 'REG0006', 'Absent', 'Unable to attend due to prior commitments.', 'None'),
('ATTN024', 'REG0007', 'Absent', 'Unable to attend due to prior commitments.', 'None'),
('ATTN024', 'REG0008', 'Present', 'Active participation and contribution.', 'None');
-- INSERT INTO attendence (attendence_id, teacher_reg_id, attendence_status, attendence_report, special_request) 
-- VALUES ('ATTN024', 'REG0001-1', 'Present', 'Good participation in the event.', 'None');
-- INSERT INTO attendence (attendence_id, student_reg_id, attendence_status, attendence_report, special_request) 
-- VALUES ('ATTN024', 'REG0008-1', 'Present', 'Good participation in the event.', 'None');

     create table budget(
    budget_id char(8) primary key,
	overspending_status varchar(20) default 'not exceeded',
	budget_limit INT(20),
    decoration_expenses INT(20),
    catering_expenses INT(20),
    venue_expenses INT(20)
	-- organizer_id CHAR(8),
    -- FOREIGN KEY (organizer_id) REFERENCES organizer(organizer_id)
    );

DELIMITER //

CREATE TRIGGER check_budget_limit
BEFORE INSERT ON budget
FOR EACH ROW
BEGIN
    DECLARE total_expenses INT;
    SET total_expenses = NEW.decoration_expenses + NEW.catering_expenses + NEW.venue_expenses;
    IF total_expenses > NEW.budget_limit THEN
        SET NEW.overspending_status = 'exceeded';
    END IF;
END;
//

DELIMITER ;



    INSERT INTO budget (budget_id, budget_limit, decoration_expenses, catering_expenses, venue_expenses) 
VALUES 
('BUD001', 5000, 1000, 2000, 1500),
('BUD002', 8000, 1500, 2500, 2000),
('BUD003', 10000, 2000, 3000, 2500);

INSERT INTO budget (budget_id, budget_limit, decoration_expenses, catering_expenses, venue_expenses) 
VALUES ('BUD004', 5000, 2000, 3000, 2500);
select * from budget;

create table subscriptions(
subscriptionID int auto_increment not null,
email varchar(50),
FullName varchar(20),
primary key(subscriptionID));


create table invitations(
invitationID int auto_increment not null,
email varchar(50),
FullName varchar(20),
primary key(invitationID));

create table tickets(
ticketID int auto_increment not null,
FullName varchar(20),
PhoneNo int,
Person varchar(10),
ReservationDate date,
CNIC int,
CVC int(4),
Message varchar(256),
primary key(ticketID));

create table contactBox(
contactID int auto_increment not null,
FirstName varchar(20),
LastName varchar(20),
email varchar(50),
MobileNo int,
Message varchar(256),
primary key(contactID));

create table suggestMenu(
suggestionID int auto_increment not null,
suggestionName varchar(50),
primary key(suggestionID));

create table suggestPerformance(
suggestionID int auto_increment not null,
suggestionName varchar(50),
primary key(suggestionID));

create table assigned_task(
taskID int auto_increment not null,
email varchar(50),
TaskName varchar(50),
primary key(taskID));

select * from subscriptions;
select * from invitations;
select * from teacher;
select * from students;
select * from menu;
select * from tickets;
select * from contactBox;
select * from suggestMenu;
select * from suggestPerformance;
select * from assigned_task;