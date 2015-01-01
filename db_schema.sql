DROP TABLE IF EXISTS item, invoice, company;

CREATE TABLE company (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created TIMESTAMP,
  modified TIMESTAMP,
  name VARCHAR(255)
);

CREATE TABLE invoice (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created TIMESTAMP,
  modified TIMESTAMP,
  submited DATETIME,
  paid DATETIME,
  company INT,
  FOREIGN KEY (company) REFERENCES company(id)
);

CREATE TABLE item (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created TIMESTAMP,
  modified TIMESTAMP,
  start DATETIME,
  end DATETIME,
  rate NUMERIC(10,2),
  description VARCHAR(255),
  company INT,
  invoice INT,
  FOREIGN KEY (company) REFERENCES company(id),
  FOREIGN KEY (invoice) REFERENCES invoice(id)
);
