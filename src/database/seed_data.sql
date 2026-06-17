-- Seleciona o banco
USE pets_db;

-- =====================
-- USERS
-- =====================

INSERT INTO users (name, email, password, phone, role) VALUES
('Administrador', 'admin@pets.com', '$2b$10$abcdefghijklmnopqrstuv', '51999990001', 'admin'),
('Alice Silva', 'alice@email.com', '$2b$10$abcdefghijklmnopqrstuv', '51999990002', 'adopter'),
('Bruno Souza', 'bruno@email.com', '$2b$10$abcdefghijklmnopqrstuv', '51999990003', 'adopter'),
('Carla Oliveira', 'carla@email.com', '$2b$10$abcdefghijklmnopqrstuv', '51999990004', 'adopter');

-- =====================
-- PETS
-- =====================

INSERT INTO pets (name, age, species, size, status, description) VALUES
('Sansão', 1, 'Coelho', 'Pequeno', 'Disponível', 'Coelho branco, muito dócil e brincalhão.'),
('Luna', 3, 'Gato', 'Médio', 'Adotado', 'Gata cinza, carinhosa e independente.'),
('Rex', 5, 'Cachorro', 'Grande', 'Disponível', 'Cachorro preto, leal e protetor.'),
('Mel', 2, 'Cachorro', 'Pequeno', 'Disponível', 'Muito amigável com crianças.'),
('Nina', 4, 'Gato', 'Pequeno', 'Adotado', 'Gosta de brincar e tomar sol.');

-- =====================
-- ADOPTIONS
-- =====================

INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES
(2, 2, '2026-06-01'),
(3, 5, '2026-06-10');