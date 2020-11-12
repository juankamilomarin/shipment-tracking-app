-- COURIER
INSERT INTO public.courier (id, "name", active) VALUES(2, 'UPS', true);
INSERT INTO public.courier (id, "name", active) VALUES(3, 'USPS', true);
INSERT INTO public.courier (id, "name", active) VALUES(1, 'Amazon', true);

-- STORE
INSERT INTO public.store (id, "name", active) VALUES(1, 'Amazon', true);
INSERT INTO public.store (id, "name", active) VALUES(2, 'Barnes & Noble', true);
INSERT INTO public.store (id, "name", active) VALUES(3, 'Bricklink', true);
INSERT INTO public.store (id, "name", active) VALUES(4, 'eBay', true);
INSERT INTO public.store (id, "name", active) VALUES(5, 'Atlanta Brick', true);
INSERT INTO public.store (id, "name", active) VALUES(6, 'Lego', true);
INSERT INTO public.store (id, "name", active) VALUES(8, 'Amazon 2', false);

-- PARCEL
INSERT INTO public.parcel (id, "name", opening_date, closing_date) VALUES(1, 'Appliances for the house', '2020-05-20', NULL);
INSERT INTO public.parcel (id, "name", opening_date, closing_date) VALUES(2, 'Lego and WiFi amplifier', '2020-05-27', NULL);

-- STORE_ORDER
INSERT INTO public.store_order (id, parcel_id, item_name, store_id, "cost", weight, order_date, courier_id, tracking_id, shipping_date, delivery_date) VALUES(2, 1, 'Smart Plugs x 4', 1, 28.8, 2.0, '2020-05-18', 1, 'TBAMIA516099404', '2020-05-18', '2020-05-21');
INSERT INTO public.store_order (id, parcel_id, item_name, store_id, "cost", weight, order_date, courier_id, tracking_id, shipping_date, delivery_date) VALUES(3, 2, '2 Minifigures and 2 pieces', 3, 36.86, 1.0, '2020-05-27', 3, '9400128206334042692469', '2020-05-31', '2020-06-05');
INSERT INTO public.store_order (id, parcel_id, item_name, store_id, "cost", weight, order_date, courier_id, tracking_id, shipping_date, delivery_date) VALUES(5, 1, 'Cat''s fountain filters', 1, 12.35, 1.0, '2020-05-19', 1, 'TBAMIA516148855', '2020-05-20', '2020-05-21');
INSERT INTO public.store_order (id, parcel_id, item_name, store_id, "cost", weight, order_date, courier_id, tracking_id, shipping_date, delivery_date) VALUES(4, 1, 'Ecovacs Deebot', 1, 169.6, 10.0, '2020-05-20', 1, 'TBAMIA516106763', '2020-05-23', '2020-05-24');
INSERT INTO public.store_order (id, parcel_id, item_name, store_id, "cost", weight, order_date, courier_id, tracking_id, shipping_date, delivery_date) VALUES(1, 1, 'Alexa Echo Dot', 1, 31.8, 2.0, '2020-05-19', 1, 'TBA034667709301', '2020-05-20', '2020-05-25');
INSERT INTO public.store_order (id, parcel_id, item_name, store_id, "cost", weight, order_date, courier_id, tracking_id, shipping_date, delivery_date) VALUES(6, 1, 'Legends of Andor', 1, 35.99, 3.0, '2020-05-19', 1, 'TBAMIA516148855', '2020-05-21', '2020-05-22');



