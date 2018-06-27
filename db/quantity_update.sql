update cart 
set quant = $1
where user_id = $2 and product_id = $3;
select * from cart 
where user_id = $2;