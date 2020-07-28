DROP TABLE IF EXISTS users, messages, user_message_like CASCADE;

CREATE TABLE users
(
    id     uuid         not null,
    name   varchar(255) not null,
    password varchar(255) not null,
    avatar text,
    is_admin bool not null,
    primary key (id)
);

CREATE TABLE messages
(
    id         uuid      not null,
    user_id    uuid      not null,
    text       text      not null,
    created_at timestamp not null,
    edited_at  timestamp,
    primary key (id)
);

create table user_message_like
(
    user_id uuid not null,
    message_id uuid not null,
    primary key (user_id, message_id)
);
