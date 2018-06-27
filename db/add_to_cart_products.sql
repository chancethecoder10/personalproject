insert into cart(user_id, product_id, quant)
values($1,$2,1);
select * from cart
where user_id = $1;