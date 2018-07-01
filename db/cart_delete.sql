delete from cart
where cart_id = $1;

select * from cart
join products on products.product_id = cart.product_id
where cart.user_id = $2;