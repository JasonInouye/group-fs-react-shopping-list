-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data
-- db name shopping_cart
CREATE TABLE cart (
	id SERIAL PRIMARY KEY,
	item varchar(80),
	quantity FLOAT,
	unit varchar(20),
	purchased boolean DEFAULT false
);

INSERT INTO "cart" (
	"item", "quantity", "unit"
) VALUES ('Bread', 1, 'loaf' ), ( 'Milk', 1.5 , 'gallon');