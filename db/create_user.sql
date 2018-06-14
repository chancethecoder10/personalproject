insert into users
(name, email, auth_id)
values
($1, $2, $3)
returning * ;