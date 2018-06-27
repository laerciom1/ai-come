insert into user (id, first_name, last_name, username, password, active) values
(1, 'Administrador', 'Usuario', 'admin', '$2a$10$WwnEzg0ppWn1q1qBwgnMEe5PN5m.a00VKrwtg2HRvBrcirJPK90b2', 1),
(2, 'Laércio', 'Morais', 'chico', '$2a$10$WwnEzg0ppWn1q1qBwgnMEe5PN5m.a00VKrwtg2HRvBrcirJPK90b2', 1),
(3, 'Roberto', 'Dantas', 'roberto', '$2a$10$WwnEzg0ppWn1q1qBwgnMEe5PN5m.a00VKrwtg2HRvBrcirJPK90b2', 1),
(4, 'Lucio', 'Soares', 'lucio', '$2a$10$WwnEzg0ppWn1q1qBwgnMEe5PN5m.a00VKrwtg2HRvBrcirJPK90b2', 1),
(5, 'Reis Magos', 'Dono', 'reisMagos', '$2a$10$WwnEzg0ppWn1q1qBwgnMEe5PN5m.a00VKrwtg2HRvBrcirJPK90b2', 1),
(6, 'Bonárabe', 'Dono', 'bonarabe', '$2a$10$WwnEzg0ppWn1q1qBwgnMEe5PN5m.a00VKrwtg2HRvBrcirJPK90b2', 1);

insert into user_permissions (user_id, permissions) values
(1, 'ADMIN'),
(2, 'USER'),
(3, 'USER'),
(4, 'USER'),
(5, 'USER'),
(6, 'USER');

insert into address (id, lat, lng, street, number, neighborhood, city, zip, user_id, active) values
(1, -5.8617787, -35.2178965, 'Avenida Aírton Sena', '32B', 'Nova Parnamirim', 'Parnamirim', '59451-160', 5, 1),
(2, -5.8668027, -35.244155, 'Av. Engenheiro Roberto Freire', '1236', 'Capim Macio', 'Natal', '59082-055', 5, 1),
(3, -5.8264643, -35.2252665, 'Av. Amintas Barros', '2561', 'Lagoa Nova', 'Natal', '59054-465', 5, 1),
(4, -23.5606492, -46.6858194, 'R. Dr. Virgílio de Carvalho Pinto', '648', 'Pinheiros', 'São Paulo', '05415-020', 2, 1),
(5, -5.8322834, -35.2075895, 'Av. Cap.Mor Gouveia', 'S/n', 'Lagoa Nova', 'Natal', '59078-970', 3, 1),
(6, -5.7293424, -35.2446444, 'Av. Dr. Juliano Moreira', '675', 'Pajuçara', 'Natal', '59131-430', 4, 1),
(7, -23.6473866, -46.7143856, 'R. Adele', '210', 'Jardim Dom Bosco', 'São Paulo', '04757-050', 2, 1),
(8, -5.8898204, -35.200246, 'Av. Ayrton Senna', '12', 'Nova Parnamirim', 'Natal', '59080-100', 2, 1);

insert into store (id, name, bio, thumbnail_image, profile_image, user_id, active) values
(1, 'Reis Magos', 'Bio da Reis Magos', '/static/stores/1-700x300.jpg', '/static/stores/1-200x200.jpg', 5, 1),
(2, 'Bonárabe', 'Bio da Bonárabe', '/static/stores/2-700x300.jpg', '/static/stores/2-200x200.jpg', 6, 1);

insert into taste (id, name, description, store_id, s_value, m_value, l_value, xl_value, active) values
(1, 'Al Pesto', 'Peito de peru, mussarela de búfala e molho pesto', 1, 20.0, 30.0, 40.0, 50.0, 1),
(2, 'Italiana', 'Parmesão, ervas finas, azeite, rúcula, mussarela de búfala, presunto de Parma e tomate', 1, 20.0, 30.0, 40.0, 50.0, 1),
(3, 'Natalense', 'Frango, peito de peru, champignon e catupiry', 2, 20.0, 30.0, 40.0, 50.0, 1),
(4, 'Alcachofra', 'Alcachofras, champignon, mussarela e tomate seco', 2, 20.0, 30.0, 40.0, 50.0, 1);

insert into pasta (id, name, value, store_id, active) values
(1, 'Tradicional', 0, 1, 1),
(2, 'Nova Iorquina', 3, 1, 1),
(3, 'Siciliana', 5, 1, 1),
(4, 'Tradicional', 0, 2, 1),
(5, 'Nova Iorquina', 3, 2, 1),
(6, 'Siciliana', 5, 2, 1);

insert into border (id, name, value, store_id, active) values
(1, 'Sem Borda', 0, 1, 1),
(2, 'Cheddar', 5, 1, 1),
(3, 'Catupiry', 6, 1, 1),
(4, 'Chocolate', 7, 1, 1),
(5, 'Sem Borda', 0, 2, 1),
(6, 'Cheddar', 5, 2, 1),
(7, 'Catupiry', 6, 2, 1),
(8, 'Chocolate', 7, 2, 1);

insert into size (id, name, identifier, store_id) values
(1, 'Gigante (10 fatias)', 'xl', 1),
(2, 'Grande (8 fatias)', 'l', 1),
(3, 'Média (6 fatias)', 'm', 1),
(4, 'Pequena (4 fatias)', 's', 1),
(5, 'Gigante (10 fatias)', 'xl', 2),
(6, 'Grande (8 fatias)', 'l', 2),
(7, 'Média (6 fatias)', 'm', 2),
(8, 'Pequena (4 fatias)', 's', 2);