insert into cart(user_id, product_id, quant)
values($1,$2,1);

select * from cart
join products on products.product_id = cart.product_id
where cart.user_id = $1;