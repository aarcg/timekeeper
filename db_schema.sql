DROP TABLE IF EXISTS items, invoices, customers;

CREATE TABLE customers (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created DATETIME,
  modified TIMESTAMP,
  name VARCHAR(255)
);

CREATE TABLE invoices (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created DATETIME,
  modified TIMESTAMP,
  submitted DATETIME,
  paid DATETIME,
  customer INT,
  FOREIGN KEY (customer) REFERENCES customers(id)
);

CREATE TABLE items(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created DATETIME,
  modified TIMESTAMP,
  start DATETIME,
  end DATETIME,
  rate NUMERIC(10,2),
  description VARCHAR(255),
  customer INT,
  invoice INT,
  FOREIGN KEY (customer) REFERENCES customers(id),
  FOREIGN KEY (invoice) REFERENCES invoices(id)
);
