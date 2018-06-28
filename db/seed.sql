-- Users who login with Auth0
create table users
(
user_id serial primary key,
name text,
email text,
auth_id text
);
-- Products in the Shop
create table products
(
product_id serial primary key,
product_name text,
price text,
product_desc text,
roast text,
decaf BOOLEAN
);
-- Cart, track the users Products
create table cart
(
cart_id serial primary key,
quant int,
user_id int 
references users(user_id),
product_id int
references products(product_id)
);

