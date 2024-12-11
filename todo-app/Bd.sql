-- Tabla de Usuarios
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    birth_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Tabla de Tableros
CREATE TABLE Boards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES Users(id)
);

-- Tabla de Listas
CREATE TABLE Lists (
    id SERIAL PRIMARY KEY,
    board_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    position INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES Boards(id)
);

-- Tabla de Tarjetas
CREATE TABLE Cards (
    id SERIAL PRIMARY KEY,
    list_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    position INT NOT NULL,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_list_id FOREIGN KEY (list_id) REFERENCES Lists(id)
);

-- Tabla de Comentarios
CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id),
    CONSTRAINT fk_card_id FOREIGN KEY (card_id) REFERENCES Cards(id)
);

-- Tabla de Roles para los Miembros de los Tableros
CREATE TABLE RolesBoard (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Tabla de Roles
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Tabla de Miembros de Tableros
CREATE TABLE BoardMembers (
    board_id INT NOT NULL,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (user_id, board_id),
    CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES Boards(id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id),
    CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES RolesBoard(id)
);

-- Tabla de Registros de Actividad
CREATE TABLE ActivityLogs (
    id SERIAL PRIMARY KEY,
    board_id INT NOT NULL,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES Boards(id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id)
);
