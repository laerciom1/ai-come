insert into user (id, username, password, active) values
(1, 'admin', '$2a$10$WwnEzg0ppWn1q1qBwgnMEe5PN5m.a00VKrwtg2HRvBrcirJPK90b2', 1);

insert into user_permissions (user_id, permissions) values
(1, 'ADMIN');

insert into address (id, lat, lng, street, number, neighborhood, city, zip, active) values
(1, 0, 0, 'Rua da Reis Magos', 'Numero da Reis Magos', 'Bairro da Reis Magos', 'Cidade da Reis Magos', 'CEP da Reis Magos', 1);

insert into store (id, name, bio, thumbnail_image, profile_image, address_id, user_id, active) values
(1, 'Reis Magos', 'Bio da Reis Magos', '/static/reismagos-700x300.jpg', '/static/reismagos-200x200.jpg', 1, 1, 1);

insert into taste (id, name, description, store_id, s_value, m_value, l_value, xl_value, active) values
(1, 'Al Pesto', 'Peito de peru, mussarela de búfala e molho pesto', 1, 20.0, 30.0, 40.0, 50.0, 1),
(2, 'Italiana', 'Parmesão, ervas finas, azeite, rúcula, mussarela de búfala, presunto de Parma e tomate', 1, 20.0, 30.0, 40.0, 50.0, 1);

insert into pasta (id, name, value, store_id, active) values
(1, 'Tradicional', 0, 1, 1),
(2, 'Nova Iorquina', 3, 1, 1),
(3, 'Siciliana', 5, 1, 1);

insert into border (id, name, value, store_id, active) values
(1, 'Sem Borda', 0, 1, 1),
(2, 'Cheddar', 5, 1, 1),
(3, 'Catupiry', 6, 1, 1),
(4, 'Chocolate', 7, 1, 1);

insert into size (id, name, identifier, store_id) values
(1, 'Gigante (10 fatias)', 'xl', 1),
(2, 'Grande (8 fatias)', 'l', 1),
(3, 'Média (6 fatias)', 'm', 1),
(4, 'Pequena (4 fatias)', 's', 1);