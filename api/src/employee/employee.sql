CREATE TABLE departments (
  id serial,
  department_name varchar(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (department_name)
);

/*
 one-to-many: one department has many employees
*/

CREATE TABLE employee (
  id serial,
  department_id integer NOT NULL,
  first_name varchar(255),
  last_name varchar(255),
  phone_number varchar(255),
  email_id varchar(255),
  entry_date timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
      REFERENCES departments(id)
      ON DELETE CASCADE
);

INSERT INTO department (name)
VALUES
    ('Accounting'),
    ('Information Technology'),
    ('Marketing'),
    ('Operations'),
    ('HR'),
    ('Client Support'),
    ('Facilities');