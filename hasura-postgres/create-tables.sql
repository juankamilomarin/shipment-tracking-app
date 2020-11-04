create table store
(
    id     serial               not null
        constraint store_pk
            primary key,
    name   varchar              not null,
    active boolean default true not null
);

alter table store
    owner to postgres;

create unique index store_id_uindex
    on store (id);

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

create table parcel
(
    id     serial               not null
        constraint parcel_pk
            primary key,
    name   varchar              not null,
    opening_date date           not null,
    closing_date date           null
);

alter table parcel
    owner to postgres;

create unique index parcel_id_uindex
    on parcel (id);