-- Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Projects Table
CREATE TABLE Projects (
    id SERIAL PRIMARY KEY
    name VARCHAR(100) NOT NULL,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- Tasks Table
CREATE TABLE Tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    project_id INT,
    assigned_user_id INT,
    status VARCHAR(50) DEFAULT "pending",
    FOREIGN KEY (project_name) REFERENCES Projects(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_user_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- UserProjects Table
CREATE TABLE UserProjects (
    user_id INT,
    project_id INT,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE
);