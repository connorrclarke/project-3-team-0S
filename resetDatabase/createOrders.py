import pandas as pd
from random import choice, randint, choices
from datetime import timedelta, datetime

# Menu items (MenuItemId, Name, Price, Seasonal, Calories, Category)
menu_items = [
    (1, 'Orange Chicken', 5.20, False, 510, 'Entree'),
    (2, 'Beijing Beef', 5.20, False, 480, 'Entree'),
    (3, 'Kung Pao Chicken', 5.20, False, 320, 'Entree'),
    (4, 'Honey Walnut Shrimp', 5.20, True, 430, 'Entree'),
    (5, 'Teriyaki Chicken', 5.20, False, 275, 'Entree'),
    (6, 'SweetFire Chicken Breast', 5.20, False, 380, 'Entree'),
    (7, 'Black Pepper Steak', 5.20, False, 180, 'Entree'),
    (8, 'Broccoli Beef', 5.20, False, 150, 'Entree'),
    (9, 'Sweet and Sour Chicken Breast', 5.20, False, 300, 'Entree'),
    (10, 'Fried Rice', 4.40, False, 620, 'Side'),
    (11, 'Chow Mein', 4.40, False, 600, 'Side'),
    (12, 'White Rice', 4.40, False, 520, 'Side'),
    (13, 'Egg Roll', 1.75, False, 200, 'Appetizer'),
    (14, 'Spring Roll', 1.75, False, 240, 'Appetizer'),
    (15, 'Fountain Soda', 2.50, False, 250, 'Drinks'),
    (16, 'Coke', 2.50, False, 150, 'Drinks'),
    (17, 'Apple Juice', 2.50, False, 180, 'Drinks'),
    # New items for project 3
    (18, 'Bourbon Chicken', 5.20, False, 400, 'Entree'),
    (19, 'Honey Sesame Chicken', 5.20, False, 340, 'Entree'),
    (20, 'Mushroom Chicken', 5.20, False, 220, 'Entree'),
    (21, 'String Bean Chicken', 5.20, False, 210, 'Entree'),
    (22, 'Super Greens', 4.40, False, 130, 'Side'),
    (23, 'Cream Cheese Rangoons', 1.75, False, 190, 'Appetizer'),
    (24, 'Apple Pie Roll', 1.75, False, 150, 'Appetizer'),
    (25, 'Water Bottle', 2.50, False, 0, 'Drinks')
]

# Order generation
order_data = []
order_id_counter = 1

# Date range
start_date = datetime(2024, 10, 28)
end_date = datetime(2024, 12, 6)
current_date = start_date

rand_date = datetime(2024, 11, 6)

haloween_date = datetime(2024, 10, 31)
veterans_day_date = datetime(2024, 11, 11)
thanksgiving_eve_date = datetime(2024, 11, 27)
thanksgiving_date = datetime(2024, 11, 28)
black_friday_date = datetime(2024, 11, 29)

# Loop through each day in the date range
while current_date <= end_date:
    # Skip Christmas, New Year's Eve, and New Year's Day
    if current_date == haloween_date or current_date == veterans_day_date or current_date == thanksgiving_eve_date or current_date == thanksgiving_date or current_date == black_friday_date:
        current_date += timedelta(days=1)
        continue

    # Determine a random number of orders for the day (between 30 and 100)
    if current_date == rand_date:
        num_orders = randint(300, 500)
    else:
        num_orders = randint(30, 200)

    for _ in range(num_orders):
        num_entrees = randint(1, 8)
        selected_entree_ids = choices([item[0] for item in menu_items if item[5] == 'Entree'], k=num_entrees)

        available_sides = [item[0] for item in menu_items if item[5] == 'Side']
        num_sides = randint(0, min(4, len(available_sides)))  # Ensure we don't sample more than available
        selected_side_ids = choices(available_sides, k=num_sides)

        available_drinks = [item[0] for item in menu_items if item[5] == 'Drinks']
        num_drinks = randint(0, min(4, len(available_drinks)))  # Ensure we don't sample more than available
        selected_drinks_ids = choices(available_drinks, k=num_drinks)

        available_appetizers = [item[0] for item in menu_items if item[5] == 'Appetizer']
        num_appetizers = randint(0, min(4, len(available_appetizers)))  # Ensure we don't sample more than available
        selected_appetizers_ids = choices(available_appetizers, k=num_appetizers)

        total_price = 0.0

        # Add prices for entrees, sides, appetizers, and drinks considering duplicates
        item_counts = {
            "entrees": {item[0]: 0 for item in menu_items if item[5] == 'Entree'},
            "sides": {item[0]: 0 for item in menu_items if item[5] == 'Side'},
            "drinks": {item[0]: 0 for item in menu_items if item[5] == 'Drinks'},
            "appetizers": {item[0]: 0 for item in menu_items if item[5] == 'Appetizer'}
        }

        # Count items for pricing
        for entree_id in selected_entree_ids:
            item_counts["entrees"][entree_id] += 1

        for side_id in selected_side_ids:
            item_counts["sides"][side_id] += 1

        for drink_id in selected_drinks_ids:
            item_counts["drinks"][drink_id] += 1

        for appetizer_id in selected_appetizers_ids:
            item_counts["appetizers"][appetizer_id] += 1

        # Calculate total price based on counts
        entrees = item_counts["entrees"]
        sides = item_counts["sides"]

        # Special cases for bowl, plate, and bigger plate
        while sum(entrees.values()) >= 3 and sum(sides.values()) >= 1:
            total_price += 11.30
            for _ in range(3):
                for entree_id in entrees:
                    if entrees[entree_id] > 0:
                        entrees[entree_id] -= 1
                        break
            for side_id in sides:
                if sides[side_id] > 0:
                    sides[side_id] -= 1
                    break

        while sum(entrees.values()) >= 2 and sum(sides.values()) >= 1:
            total_price += 9.80
            for _ in range(2):
                for entree_id in entrees:
                    if entrees[entree_id] > 0:
                        entrees[entree_id] -= 1
                        break
            for side_id in sides:
                if sides[side_id] > 0:
                    sides[side_id] -= 1
                    break

        while sum(entrees.values()) >= 1 and sum(sides.values()) >= 1:
            total_price += 8.30
            for entree_id in entrees:
                if entrees[entree_id] > 0:
                    entrees[entree_id] -= 1
                    break
            for side_id in sides:
                if sides[side_id] > 0:
                    sides[side_id] -= 1
                    break

        # Calculate remaining items' prices
        for entree_id, count in entrees.items():
            if count > 0:
                entree_price = next((item[2] for item in menu_items if item[0] == entree_id), 0)
                total_price += entree_price * count

        for side_id, count in sides.items():
            if count > 0:
                side_price = next((item[2] for item in menu_items if item[0] == side_id), 0)
                total_price += side_price * count

        for drink_id, count in item_counts["drinks"].items():
            if count > 0:
                drink_price = next((item[2] for item in menu_items if item[0] == drink_id), 0)
                total_price += drink_price * count

        for appetizer_id, count in item_counts["appetizers"].items():
            if count > 0:
                appetizer_price = next((item[2] for item in menu_items if item[0] == appetizer_id), 0)
                total_price += appetizer_price * count

        # Format total price as a monetary value with 2 decimal places
        total_price = round(total_price, 2)

        # Generate random fields
        employee_id = randint(1, 10)
        payment_type = choice(['Credit', 'Cash', 'Gift Card'])

        # Generate random time between 8 AM and 9 PM
        order_time = pd.to_datetime(f"{randint(8, 20)}:{randint(0, 59):02d}")
        order_datetime = current_date + timedelta(hours=order_time.hour, minutes=order_time.minute)

        order_data.append([
            order_id_counter, 
            employee_id, 
            order_datetime,  
            f"{total_price:.2f}",  
            payment_type, 
            selected_entree_ids + selected_side_ids + selected_drinks_ids + selected_appetizers_ids,  
            [item[1] for item in menu_items if item[0] in (selected_entree_ids + selected_side_ids + selected_drinks_ids + selected_appetizers_ids)]
        ])
        order_id_counter += 1

    # Move to the next day
    current_date += timedelta(days=1)

# Convert to DataFrame
columns = ["OrderId", "EmployeeId", "SaleDate", "AmountSold", "PaymentType", "ThingsOrdered", "ThingsOrderedNames"]
df = pd.DataFrame(order_data, columns=columns)

# Save the DataFrames to CSV files
df.to_csv("orderGeneration/fullOrders.csv", index=False)

# Create orders_no_items DataFrame
orders_no_items = df[["EmployeeId", "SaleDate", "AmountSold", "PaymentType"]]
orders_no_items.to_csv("orderGeneration/orders_for_DB.csv", index=False)

# Create orders_items_junction DataFrame
orders_items_junction = df[["OrderId", "ThingsOrdered"]]
orders_items_junction.to_csv("orderGeneration/orders_items_junction.csv", index=False)

print("CSV files created successfully!")