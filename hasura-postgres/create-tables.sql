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

create table store_order
(
    id            serial                     not null
        constraint store_order_pk
            primary key,
    parcel_id     integer                    not null
        constraint store_order_parcel_id_fk
            references parcel,
    item_name     varchar                    not null,
    store_id      integer                    not null
        constraint store_order_store_id_fk
            references store
            on update restrict on delete restrict,
    cost          double precision default 0 not null,
    weight        double precision default 0 not null,
    order_date    date                       not null,
    courier_id    integer
        constraint store_order_courier_id_fk
            references courier,
    tracking_id   varchar,
    shipping_date date,
    delivery_date date
);

alter table store_order
    owner to postgres;

create unique index store_order_id_uindex
    on parcel (id);