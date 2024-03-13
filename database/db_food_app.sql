-- Create the 'food_app' database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `food_app`;
USE `food_app`;

-- Table for users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(100) NULL,
  `email` VARCHAR(250) NULL,
  `password` VARCHAR(100) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

-- Table for restaurants
CREATE TABLE IF NOT EXISTS `restaurants` (
  `res_id` INT NOT NULL AUTO_INCREMENT,
  `res_name` VARCHAR(45) NULL,
  `image` VARCHAR(250) NULL,
  `desc` VARCHAR(250) NULL,
  PRIMARY KEY (`res_id`)
);

-- Table for food types
CREATE TABLE IF NOT EXISTS `food_types` (
  `type_id` INT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`type_id`)
);

-- Table for food items
CREATE TABLE IF NOT EXISTS `foods` (
  `food_id` INT NOT NULL AUTO_INCREMENT,
  `food_name` VARCHAR(100) NULL,
  `image` VARCHAR(250) NULL,
  `price` FLOAT NULL,
  `description` VARCHAR(250) NULL,
  `type_id` INT NOT NULL,
  PRIMARY KEY (`food_id`),
  CONSTRAINT `fk_food_food_type1`
    FOREIGN KEY (`type_id`)
    REFERENCES `food_types` (`type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION 
);

-- Table for rating restaurants
CREATE TABLE IF NOT EXISTS `rate_res` (
  `user_id` INT NOT NULL,
  `res_id` INT NOT NULL,
  `amount` INT NULL,
  `date_rate` DATETIME NULL,
  PRIMARY KEY (`user_id`, `res_id`),
  INDEX `fk_user_has_restaurant_restaurant1_idx` (`res_id` ASC),
  INDEX `fk_user_has_restaurant_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_restaurant_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_restaurant_restaurant1`
    FOREIGN KEY (`res_id`)
    REFERENCES `restaurants` (`res_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Table for liking restaurants
CREATE TABLE IF NOT EXISTS `like_res` (
  `user_id` INT NOT NULL,
  `res_id` INT NOT NULL,
  `date_like` DATETIME NULL,
  PRIMARY KEY (`user_id`, `res_id`),
  INDEX `fk_user_has_restaurant_restaurant2_idx` (`res_id` ASC),
  INDEX `fk_user_has_restaurant_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_restaurant_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_restaurant_restaurant2`
    FOREIGN KEY (`res_id`)
    REFERENCES `restaurants` (`res_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Table for orders
CREATE TABLE IF NOT EXISTS `orders` (
  `user_id` INT NOT NULL,
  `food_id` INT NOT NULL,
  `amount` INT NOT NULL,
  `code` VARCHAR(45) NOT NULL,
  `arr_sub_id` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`, `food_id`),
  INDEX `fk_user_has_food_food1_idx` (`food_id` ASC),
  INDEX `fk_user_has_food_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_food_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Table for subfood
CREATE TABLE IF NOT EXISTS `sub_food` (
  `sub_id` INT NOT NULL AUTO_INCREMENT,
  `sub_name` VARCHAR(45) NULL,
  `sub_price` FLOAT NULL,
  `food_id` INT NOT NULL,
  PRIMARY KEY (`sub_id`),
  CONSTRAINT `fk_sub_food_food1`
    FOREIGN KEY (`food_id`)
    REFERENCES `foods` (`food_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- Insert example data into the users table
INSERT INTO users (full_name, email, password) VALUES
('Alice Johnson', 'alice@example.com', 'password1'),
('Bob Smith', 'bob@example.com', 'password2'),
('Charlie Brown', 'charlie@example.com', 'password3'),
('David Lee', 'david@example.com', 'password4'),
('Eve Wilson', 'eve@example.com', 'password5'),
('Frank Miller', 'frank@example.com', 'password6'),
('Grace Taylor', 'grace@example.com', 'password7'),
('Hannah Martinez', 'hannah@example.com', 'password8'),
('Ian Harris', 'ian@example.com', 'password9'),
('Jack Anderson', 'jack@example.com', 'password10');

-- Insert example data into the restaurants table
INSERT INTO restaurants (res_name, image, `desc`) VALUES
('Café Paris', 'cafe_paris.jpg', 'French cuisine restaurant located in downtown.'),
('Sushi Palace', 'sushi_palace.jpg', 'Authentic Japanese sushi restaurant with a cozy atmosphere.'),
('Golden Dragon', 'golden_dragon.jpg', 'Chinese restaurant known for its delicious dim sum.'),
('Pizza Italia', 'pizza_italia.jpg', 'Italian pizzeria serving traditional Neapolitan pizzas.'),
('BBQ House', 'bbq_house.jpg', 'American-style barbecue restaurant offering smoked meats.');

-- Insert example data into the food_types table
INSERT INTO food_types (type_name) VALUES
('Appetizers'),
('Main Dishes'),
('Desserts'),
('Drinks'),
('Specials');

-- Insert example data into the foods table
INSERT INTO foods (food_name, image, price, description, type_id) VALUES
('French Onion Soup', 'french_onion_soup.jpg', 8.99, 'Classic French onion soup with melted cheese on top.', 1),
('Beef Bourguignon', 'beef_bourguignon.jpg', 19.99, 'Tender beef stewed in red wine sauce, served with mashed potatoes.', 2),
('Crème Brûlée', 'creme_brulee.jpg', 6.99, 'Traditional French dessert with a caramelized sugar crust.', 3),
('Espresso', 'espresso.jpg', 3.99, 'Strong Italian coffee served in a small cup.', 4),
('Chef\'s Special Pasta', 'chefs_special_pasta.jpg', 15.99, 'Chef\'s special pasta dish with homemade marinara sauce.', 2),
('California Roll', 'california_roll.jpg', 10.99, 'Sushi roll filled with crab, avocado, and cucumber.', 2),
('General Tso\'s Chicken', 'general_tsos_chicken.jpg', 14.99, 'Spicy Chinese chicken dish with broccoli and rice.', 2),
('Margherita Pizza', 'margherita_pizza.jpg', 12.99, 'Classic Italian pizza with tomato, mozzarella, and basil.', 2),
('Smoked Brisket Platter', 'smoked_brisket_platter.jpg', 22.99, 'Texas-style smoked brisket served with coleslaw and cornbread.', 2),
('Mango Sticky Rice', 'mango_sticky_rice.jpg', 7.99, 'Thai dessert made with sticky rice, mango slices, and coconut milk.', 3);

-- Insert example data into the rate_res table
INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 1, 5, '2022-01-01 10:00:00'),
(2, 1, 4, '2022-01-02 11:00:00'),
(3, 2, 3, '2022-01-03 12:00:00'),
(4, 2, 2, '2022-01-04 13:00:00'),
(5, 3, 1, '2022-01-05 14:00:00'),
(6, 4, 4, '2022-01-06 15:00:00'),
(7, 4, 3, '2022-01-07 16:00:00'),
(8, 5, 2, '2022-01-08 17:00:00'),
(9, 5, 1, '2022-01-09 18:00:00'),
(10, 5, 5, '2022-01-10 19:00:00');

-- Insert example data into the like_res table
INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, '2022-01-01 10:00:00'),
(2, 1, '2022-01-02 11:00:00'),
(3, 2, '2022-01-03 12:00:00'),
(4, 2, '2022-01-04 13:00:00'),
(5, 3, '2022-01-05 14:00:00'),
(6, 4, '2022-01-06 15:00:00'),
(7, 4, '2022-01-07 16:00:00'),
(8, 5, '2022-01-08 17:00:00'),
(9, 5, '2022-01-09 18:00:00'),
(10, 5, '2022-01-10 19:00:00');

-- Insert example data into the orders table
INSERT INTO orders (user_id, food_id, amount, code, arr_sub_id) VALUES
(1, 1, 2, 'ORDER001', NULL),
(2, 2, 1, 'ORDER002', NULL),
(3, 3, 3, 'ORDER003', NULL),
(4, 4, 2, 'ORDER004', NULL),
(5, 5, 1, 'ORDER005', NULL),
(6, 6, 2, 'ORDER006', NULL),
(7, 7, 1, 'ORDER007', NULL),
(8, 8, 3, 'ORDER008', NULL),
(9, 9, 2, 'ORDER009', NULL),
(10, 10, 1, 'ORDER010', NULL);


-- Insert example data into the sub_food table
INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Extra Cheese', 1.99, 4),
('Garlic Butter', 0.99, 4),
('Edamame', 3.99, 6),
('Tempura Shrimp Roll', 12.99, 6),
('Peking Duck', 19.99, 7),
('Egg Roll', 4.99, 7),
('Tiramisu', 5.99, 9),
('Cheesecake', 6.99, 9),
('Guacamole', 2.99, 10);
