CREATE TABLE Audience (
    audience_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    affilation VARCHAR(255),
    phone_no VARCHAR(15) CHECK (phone_no ~ '^[0-9]{10}$'),
    conference_id BIGINT
);
INSERT INTO Audience (full_name, email, password, affilation, phone_no, conference_id) VALUES
('John Doe', 'john.doe@example.com', '$2a$10$hashedpassword1', 'Tech University', '9876543210', 1),
('Alice Smith', 'alice.smith@example.com', '$2a$10$hashedpassword2', 'Global Institute', '8765432109', 2),
('Bob Johnson', 'bob.johnson@example.com', '$2a$10$hashedpassword3', 'National Research Center', '7654321098', 3),
('Emma Brown', 'emma.brown@example.com', '$2a$10$hashedpassword4', 'Innovation Lab', '6543210987', 1),
('David Wilson', 'david.wilson@example.com', '$2a$10$hashedpassword5', 'AI Hub', '5432109876', 1);

CREATE TABLE conference (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    date DATE,
    time TIME,
    location VARCHAR(255)
);

INSERT INTO conference (id,title, date, time, location) VALUES
(1,'Tech Innovations 2023', '2023-10-01', '09:00:00', 'New York City'),
(2,'AI and Future Tech', '2023-11-15', '10:00:00', 'San Francisco'),
(3,'Global Research Summit', '2023-12-05', '11:00:00', 'Los Angeles');