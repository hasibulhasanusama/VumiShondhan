CREATE TABLE IF NOT EXISTS land_records (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    district VARCHAR(100) NOT NULL,
    upazila VARCHAR(100) NOT NULL,
    mouza VARCHAR(100) NOT NULL,
    khatian_no VARCHAR(50) NOT NULL,
    dag_no VARCHAR(50) NOT NULL,
    land_area_decimal NUMERIC(12, 4),
    land_type VARCHAR(100),
    land_status VARCHAR(100) DEFAULT 'Unknown',
    location GEOMETRY(Point, 4326),
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (district, upazila, mouza, khatian_no, dag_no)
);

CREATE TABLE IF NOT EXISTS ownership_records (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    land_id BIGINT NOT NULL REFERENCES land_records(id) ON DELETE CASCADE,
    owner_name VARCHAR(150) NOT NULL,
    share_numerator INTEGER DEFAULT 1,
    share_denominator INTEGER DEFAULT 1,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document_records (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    land_id BIGINT NOT NULL REFERENCES land_records(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    document_no VARCHAR(100) NOT NULL,
    issue_date DATE,
    verification_status VARCHAR(50) DEFAULT 'Demo Only',
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mutation_records (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    land_id BIGINT NOT NULL REFERENCES land_records(id) ON DELETE CASCADE,
    application_no VARCHAR(100) NOT NULL,
    application_status VARCHAR(100) DEFAULT 'Demo Pending',
    applied_at DATE,
    completed_at DATE,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS case_records (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    land_id BIGINT NOT NULL REFERENCES land_records(id) ON DELETE CASCADE,
    case_no VARCHAR(100) NOT NULL,
    court_name VARCHAR(150),
    case_status VARCHAR(100) DEFAULT 'Demo Information',
    filed_at DATE,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_land_location
ON land_records USING GIST(location);

CREATE INDEX IF NOT EXISTS idx_land_search
ON land_records(district, upazila, mouza);

CREATE INDEX IF NOT EXISTS idx_ownership_land
ON ownership_records(land_id);

CREATE INDEX IF NOT EXISTS idx_document_land
ON document_records(land_id);

CREATE INDEX IF NOT EXISTS idx_mutation_land
ON mutation_records(land_id);

CREATE INDEX IF NOT EXISTS idx_case_land
ON case_records(land_id);
