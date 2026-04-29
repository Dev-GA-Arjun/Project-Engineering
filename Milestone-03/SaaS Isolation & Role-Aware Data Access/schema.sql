-- ================================
-- CorpFlow v2.0 Multi-Tenant Schema
-- ================================

-- Drop existing tables (order matters due to FK constraints)
DROP TABLE IF EXISTS project_members;
DROP TABLE IF EXISTS billing_details;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tenants;

-- ================================
-- Tenants
-- ================================
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Users
-- ================================
CREATE TABLE users (
    id SERIAL,
    tenant_id INTEGER NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin','manager','user')),
    salary DECIMAL(10,2) CHECK (salary >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE (tenant_id, email),

    FOREIGN KEY (tenant_id)
        REFERENCES tenants(id)
        ON DELETE CASCADE
);

-- ================================
-- Projects
-- ================================
CREATE TABLE projects (
    id SERIAL,
    tenant_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active','inactive')),
    budget DECIMAL(12,2) CHECK (budget >= 0),
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    FOREIGN KEY (tenant_id)
        REFERENCES tenants(id)
        ON DELETE CASCADE,

    FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- ================================
-- Project Members (User ↔ Project)
-- ================================
CREATE TABLE project_members (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role VARCHAR(20) DEFAULT 'member'
        CHECK (role IN ('member','lead')),

    FOREIGN KEY (tenant_id)
        REFERENCES tenants(id)
        ON DELETE CASCADE,

    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    UNIQUE (tenant_id, project_id, user_id)
);

-- ================================
-- Billing Details
-- ================================
CREATE TABLE billing_details (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    card_last4 VARCHAR(4) CHECK (char_length(card_last4) = 4),
    expiry_month INTEGER CHECK (expiry_month BETWEEN 1 AND 12),
    expiry_year INTEGER CHECK (expiry_year >= 2024),
    billing_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (tenant_id)
        REFERENCES tenants(id)
        ON DELETE CASCADE,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- ================================
-- Indexes
-- ================================

-- Users
CREATE INDEX idx_users_tenant_email ON users(tenant_id, email);
CREATE INDEX idx_users_tenant_role ON users(tenant_id, role);

-- Projects
CREATE INDEX idx_projects_tenant_status ON projects(tenant_id, status);

-- Project Members
CREATE INDEX idx_pm_tenant_user ON project_members(tenant_id, user_id);
CREATE INDEX idx_pm_tenant_project ON project_members(tenant_id, project_id);

-- Billing
CREATE INDEX idx_billing_tenant_user ON billing_details(tenant_id, user_id);