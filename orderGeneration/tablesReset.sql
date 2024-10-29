-- This will drop all tables in the database
DO $$ 
DECLARE 
    r RECORD; 
BEGIN 
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP 
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE'; 
    END LOOP; 
END $$;

-- Reset all Tables
CREATE TABLE "teammembers" (
  "student_name" varchar,
  "section" int,
  "favorite_movie" varchar
);
INSERT INTO "teammembers" VALUES 
('Luke Lopez', 910, 'The Fall of the TA'),
('Siddhi Mittal', 910, 'Gifted'),
('Connor Clarke', 910, 'Spider-Man: Into the Spider-Verse'),
('Meenalika Singh', 910, 'Hunger Games');

CREATE TABLE "Employees" (
  "EmployeeId" SERIAL PRIMARY KEY,
  "FirstName" varchar,
  "LastName" varchar,
  "Role" varchar,
  "PhoneNumber" varchar,
  "Employed" boolean
);
INSERT INTO "Employees" ("FirstName", "LastName", "Role", "PhoneNumber", "Employed") VALUES
('John', 'Doe', 'Manager', '312-555-1234', TRUE),
('Jane', 'Smith', 'Manager', '408-555-5678', TRUE),
('Alice', 'Johnson', 'Employee', '615-555-8765', TRUE),
('Bob', 'Brown', 'Employee', '503-555-4321', TRUE),
('Charlie', 'Davis', 'Employee', '201-555-3456', TRUE),
('Eve', 'Wilson', 'Employee', '619-555-6543', TRUE),
('Frank', 'Garcia', 'Employee', '404-555-9876', TRUE),
('Grace', 'Martinez', 'Employee', '916-555-5674', TRUE),
('Hank', 'Lee', 'Manager', '305-555-7890', TRUE),
('Isla', 'Kim', 'Employee', '214-555-6789', TRUE);

CREATE TABLE "Orders" (
  "OrderId" SERIAL PRIMARY KEY,  -- Changed to SERIAL for auto-increment
  "EmployeeId" int REFERENCES "Employees"("EmployeeId"),
  "SaleDate" timestamp,
  "AmountSold" NUMERIC,
  "PaymentType" varchar
);

CREATE TABLE "Inventory" (
  "InventoryId" int PRIMARY KEY,
  "Ingredient" varchar,
  "Quantity" int,
  "QuantityUnit" varchar
);
INSERT INTO "Inventory" ("InventoryId", "Ingredient", "Quantity", "QuantityUnit") VALUES
(1, 'Chicken', 100, 'orders remaining'),
(2, 'Orange Mix', 100, 'orders remaining'),
(3, 'Beef', 100, 'orders remaining'),
(4, 'Beijing Mix', 100, 'orders remaining'),
(5, 'Kung Pao Mix', 100, 'orders remaining'),
(6, 'Shrimp', 100, 'orders remaining'),
(7, 'Honey Walnut Mix', 100, 'orders remaining'),
(8, 'Teriyaki Mix', 100, 'orders remaining'),
(9, 'SweetFire Mix', 100, 'orders remaining'),
(10, 'Black Pepper Mix', 100, 'orders remaining'),
(11, 'Broccoli', 100, 'orders remaining'),
(12, 'Broccoli Beef Sauce', 100, 'orders remaining'),
(13, 'Sweet and Sour Mix', 100, 'orders remaining'),
(14, 'White Rice', 100, 'orders remaining'),
(15, 'Fried Rice Vegetables', 100, 'orders remaining'),
(16, 'Chow Mein', 100, 'orders remaining'),
(17, 'Egg Rolls', 100, 'orders remaining'),
(18, 'Spring Rolls', 100, 'orders remaining'),
(19, 'Soda', 100, 'orders remaining'),
(20, 'Cups', 100, 'orders remaining'),
(21, 'Mexican Coke', 100, 'orders remaining'),
(22, 'Apple Juice', 100, 'orders remaining');

CREATE TABLE "MenuItems" (
  "MenuItemId" int PRIMARY KEY,
  "Name" varchar,
  "Price" double precision,
  "Seasonal" boolean,
  "Calories" int,
  "Category" varchar
);
INSERT INTO "MenuItems" ("MenuItemId", "Name", "Price", "Seasonal", "Calories", "Category") VALUES
(1, 'Orange Chicken', 5.20, FALSE, 490, 'Entree'),
(2, 'Beijing Beef', 5.20, FALSE, 470, 'Entree'),
(3, 'Kung Pao Chicken', 5.20, FALSE, 290, 'Entree'),
(4, 'Honey Walnut Shrimp', 5.20, TRUE, 360, 'Entree'),
(5, 'Teriyaki Chicken', 5.20, FALSE, 300, 'Entree'),
(6, 'SweetFire Chicken Breast', 5.20, FALSE, 380, 'Entree'),
(7, 'Black Pepper Chicken', 5.20, FALSE, 280, 'Entree'),
(8, 'Broccoli Beef', 5.20, FALSE, 150, 'Entree'),
(9, 'Sweet and Sour Chicken Breast', 5.20, FALSE, 300, 'Entree'),
(10, 'Fried Rice', 4.40, FALSE, 520, 'Side'),
(11, 'Chow Mein', 4.40, FALSE, 510, 'Side'),
(12, 'White Rice', 4.40, FALSE, 380, 'Side'),
(13, 'Egg Roll', 1.75, FALSE, 200, 'Appetizer'),
(14, 'Spring Roll', 1.75, FALSE, 190, 'Appetizer'),
(15, 'Fountain Soda', 2.50, FALSE, 200, 'Drinks'),
(16, 'Coke', 2.50, FALSE, 150, 'Drinks'),
(17, 'Apple Juice', 2.50, FALSE, 180, 'Drinks');

CREATE TABLE "MenuInventoryJunction" (
  "MenuItemId" int,
  "InventoryId" int,
  CONSTRAINT "FK_MenuInventoryJunction_MenuItemId"
    FOREIGN KEY ("MenuItemId")
      REFERENCES "MenuItems"("MenuItemId"),
  CONSTRAINT "FK_MenuInventoryJunction_InventoryId"
    FOREIGN KEY ("InventoryId")
      REFERENCES "Inventory"("InventoryId")
);

INSERT INTO "MenuInventoryJunction" ("MenuItemId", "InventoryId") VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 5),
(4, 6),
(4, 7),
(5, 1),
(5, 8),
(6, 1),
(6, 9),
(7, 1),
(7, 10),
(8, 3),
(8, 11),
(8, 12),
(9, 1),
(9, 13),
(10, 14),
(10, 15),
(11, 16),
(12, 14),
(13, 17),
(14, 18),
(15, 19),
(15, 20),
(16, 21),
(17, 22);

CREATE TABLE "MenuOrderJunction" (
  "OrderId" int,
  "MenuItemId" int,
  CONSTRAINT "FK_MenuOrderJunction_OrderId"
    FOREIGN KEY ("OrderId")
      REFERENCES "Orders"("OrderId"),
  CONSTRAINT "FK_MenuOrderJunction_MenuItemId"
    FOREIGN KEY ("MenuItemId")
      REFERENCES "MenuItems"("MenuItemId")
);