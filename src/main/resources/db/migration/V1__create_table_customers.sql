create TABLE IF NOT EXISTS customers (
    id BIGSERIAL NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    description VARCHAR(100),
    sales_tax_id VARCHAR,
    address VARCHAR,
    zip_code VARCHAR,
    city VARCHAR,

    -- audit columns
    created_at_utc TIMESTAMP WITH TIME ZONE,
    updated_at_utc TIMESTAMP WITH TIME ZONE,

    PRIMARY KEY (id)
)