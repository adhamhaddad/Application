CREATE TABLE sub_user (
    sub_user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    username VARCHAR(255) NOT NULL,
    role_title VARCHAR(255) NOT NULL,
    
);