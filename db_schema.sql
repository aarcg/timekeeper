DROP TABLE IF EXISTS items, invoices, companies;

CREATE TABLE companies (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created TIMESTAMP,
  modified TIMESTAMP,
  name VARCHAR(255)
);

CREATE TABLE invoices (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created TIMESTAMP,
  modified TIMESTAMP,
  submited DATETIME,
  paid DATETIME,
  company INT,
  FOREIGN KEY (company) REFERENCES companies(id)
);

CREATE TABLE items(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created TIMESTAMP,
  modified TIMESTAMP,
  start DATETIME,
  end DATETIME,
  rate NUMERIC(10,2),
  description VARCHAR(255),
  company INT,
  invoice INT,
  FOREIGN KEY (company) REFERENCES companies(id),
  FOREIGN KEY (invoice) REFERENCES invoices(id)
);
