**Food App**

This repository contains the back-end code for a food ordering app. Users can order food from restaurants using this app.

<p align="center"><img style="align: center;" src="https://github.com/vinhphuphan/food-app/blob/main/images/HomeScreen.png?raw=true"; srcset="https://github.com/vinhphuphan/food-app/blob/main/images/HomeScreen.png?raw=true 3x" width=300></p>

**Database**

The `database` folder contains schema design and SQL code to design and implement the database. It includes tables for users, restaurants, food items, orders, and reviews.

* `users`: Stores user information such as name, email, and password.
* `restaurants`: Stores restaurant details including name, location, and description.
* `food_items`: Contains information about available food items such as name, price, and description.
* `orders`: Keeps track of orders placed by users, including ordered items and total price.
* `reviews`: Stores user reviews for restaurants.

<p align="center"><img style="align: center;" src="https://raw.githubusercontent.com/vinhphuphan/food-app/main/database/schema.png" width=600></p>
<h4 align="center">Figure 1. Database schema</h4>

**Server**

The `server` folder contains Node.js code for the backend. The server handles various requests from the frontend, including user authentication, restaurant listing, food item retrieval, order placement, and review writing.

**Dependencies**

* Node.js
* MySQL

**Setup**

1. Clone this repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
DB_DATABASE=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=port
DB_DIALECT=mysql
```

4. Replace `your_username`, `your_password`, and `your_database_name` with your database credentials.
5. Start the server:

```bash
npm start
```
