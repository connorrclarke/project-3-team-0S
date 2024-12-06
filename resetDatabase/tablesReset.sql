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
  "InventoryId" SERIAL PRIMARY KEY,
  "Ingredient" varchar,
  "Quantity" int DEFAULT 100,
  "QuantityUnit" varchar DEFAULT 'orders remaining'
);
INSERT INTO "Inventory" ("Ingredient") VALUES
('Chicken'),
('Orange Mix'),
('Beef'),
('Beijing Mix'),
('Kung Pao Mix'),
('Shrimp'),
('Honey Walnut Mix'),
('Teriyaki Mix'),
('SweetFire Mix'),
('Black Pepper Mix'),
('Broccoli'),
('Broccoli Beef Sauce'),
('Sweet and Sour Mix'),
('White Rice'),
('Fried Rice Vegetables'),
('Chow Mein'),
('Egg Rolls'),
('Spring Rolls'),
('Soda'),
('Cups'),
('Mexican Coke'),
('Apple Juice'),
('Water Bottle'),
('Bourbon Mix'),
('Honey Sesame Mix'),
('Mushroom Mix'),
('String Bean Mix'),
('Super Greens'),
('Cream Cheese Rangoons'),
('Apple Pie Rolls'),
('Mushrooms');

CREATE TABLE "MenuItems" (
  "MenuItemId" SERIAL PRIMARY KEY,
  "Name" varchar,
  "Price" double precision,
  "Seasonal" boolean,
  "Calories" int,
  "Category" varchar,
  "available" boolean DEFAULT TRUE
);
INSERT INTO "MenuItems" ("Name", "Price", "Seasonal", "Calories", "Category") VALUES
('Orange Chicken', 5.20, FALSE, 510, 'Entree'),
('Beijing Beef', 5.20, FALSE, 480, 'Entree'),
('Kung Pao Chicken', 5.20, FALSE, 320, 'Entree'),
('Honey Walnut Shrimp', 5.20, TRUE, 430, 'Entree'),
('Teriyaki Chicken', 5.20, FALSE, 275, 'Entree'),
('SweetFire Chicken Breast', 5.20, FALSE, 380, 'Entree'),
('Black Pepper Steak', 5.20, FALSE, 180, 'Entree'),
('Broccoli Beef', 5.20, FALSE, 150, 'Entree'),
('Sweet and Sour Chicken Breast', 5.20, FALSE, 300, 'Entree'),
('Fried Rice', 4.40, FALSE, 620, 'Side'),
('Chow Mein', 4.40, FALSE, 600, 'Side'),
('White Rice', 4.40, FALSE, 520, 'Side'),
('Egg Roll', 1.75, FALSE, 200, 'Appetizer'),
('Spring Roll', 1.75, FALSE, 240, 'Appetizer'),
('Fountain Soda', 2.50, FALSE, 250, 'Drink'),
('Coke', 2.50, FALSE, 150, 'Drink'),
('Apple Juice', 2.50, FALSE, 180, 'Drink'),
-- New for project 3
('Bourbon Chicken', 5.20, FALSE, 400, 'Entree'),
('Honey Sesame Chicken', 5.20, FALSE, 340, 'Entree'),
('Mushroom Chicken', 5.20, FALSE, 220, 'Entree'),
('String Bean Chicken', 5.20, FALSE, 210, 'Entree'),
('Super Greens', 4.40, FALSE, 130, 'Side'),
('Cream Cheese Rangoons', 1.75, FALSE, 190, 'Appetizer'),
('Apple Pie Roll', 1.75, FALSE, 150, 'Appetizer'),
('Water Bottle', 2.50, FALSE, 0, 'Drink');

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
(7, 3),
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
(17, 22),
(18, 1),
(18, 13),
(19, 1),
(19, 25),
(20, 1),
(20, 26),
(20, 31),
(21, 1),
(21, 27),
(22, 28),
(23, 29),
(24, 30),
(25, 23);

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