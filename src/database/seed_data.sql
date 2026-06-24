USE pets_db;

-- Limpa dados existentes
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE adoptions;
TRUNCATE TABLE pets;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================
-- USERS
-- =====================

-- Senha 123 para adopters, 321 para admin (hash gerado com bcrypt)
INSERT INTO users (name, email, password, phone, role) VALUES
('Administrador', 'admin@pets.com', '$2b$10$RylNeKekPvGyojgn0zMMwOch2ney10dDguKlv11viZ4qMdZkN.76a', '51999990001', 'admin'),
('Alice Silva', 'alice@email.com', '$2b$10$Ef7moHW9xAA.hzGAjT1wf.Y/NMya1gT3G8tKT3Bo4vcl7GAXDtLxC', '51999990002', 'adopter'),
('Bruno Souza', 'bruno@email.com', '$2b$10$Ef7moHW9xAA.hzGAjT1wf.Y/NMya1gT3G8tKT3Bo4vcl7GAXDtLxC', '51999990003', 'adopter'),
('Carla Oliveira', 'carla@email.com', '$2b$10$Ef7moHW9xAA.hzGAjT1wf.Y/NMya1gT3G8tKT3Bo4vcl7GAXDtLxC', '51999990004', 'adopter');

-- =====================
-- PETS
-- =====================

INSERT INTO pets (name, age, species, size, status, description) VALUES
('Sansão', 1, 'rabbit', 'small', 'available', 'Coelho branco, muito dócil e brincalhão.'),
('Luna', 3, 'cat', 'medium', 'adopted', 'Gata cinza, carinhosa e independente.'),
('Rex', 5, 'dog', 'large', 'available', 'Cachorro preto, leal e protetor.'),
('Mel', 2, 'dog', 'small', 'available', 'Muito amigável com crianças.'),
('Nina', 4, 'cat', 'small', 'adopted', 'Gosta de brincar e tomar sol.');

-- =====================
-- ADOPTIONS
-- =====================

INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES
(2, 2, '2026-06-01'),
(3, 5, '2026-06-10');