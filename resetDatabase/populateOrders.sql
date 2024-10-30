\COPY "Orders"("EmployeeId", "SaleDate", "AmountSold", "PaymentType") FROM 'orders_for_DB.csv' DELIMITER ',' CSV HEADER;

\COPY "MenuOrderJunction"("OrderId", "MenuItemId") FROM 'populateMenuOrderJunction.csv' DELIMITER ',' CSV HEADER;