CREATE TABLE store (
    store_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    country VARCHAR(100) NOT NULL,
    currency VARCHAR(20) NOT NULL,
    lang VARCHAR(100) NOT NULL,
    domain VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);