create table shop
(
    id     serial               not null
        constraint shop_pk
            primary key,
    name   varchar              not null,
    active boolean default true not null
);

alter table shop
    owner to postgres;

create unique index shop_id_uindex
    on shop (id);

create table courier
(
    id     serial               not null
        constraint courier_pk
            primary key,
    name   varchar              not null,
    active boolean default true not null
);

alter table courier
    owner to postgres;

create unique index courier_id_uindex
    on courier (id);