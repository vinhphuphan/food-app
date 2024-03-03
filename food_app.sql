-- Create the 'food_app' database if it doesn't exist
-- CREATE DATABASE IF NOT EXISTS `food_app`;
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
    ON UPDATE CASCADE 
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