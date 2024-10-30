import csv

def generate_sql_commands(csv_file, output_file="orderGeneration/populateMenuOrderJunction.csv"):
    with open(csv_file, newline='') as file, open(output_file, 'w') as output_csv:
        reader = csv.reader(file)
        writer = csv.writer(output_csv)

        # Write the header for the output CSV
        writer.writerow(['OrderId', 'MenuItemId'])

        next(reader)  # Skip the header row
        
        for row in reader:
            menu_id = row[0]
            things_ordered = row[1].strip("[]")
            items = things_ordered.split(', ')

            for item in items:
                writer.writerow([menu_id, item])

def main():
    generate_sql_commands("orderGeneration/orders_items_junction.csv")

if __name__ == "__main__":
    main()