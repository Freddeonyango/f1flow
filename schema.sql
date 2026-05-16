-- F1Flow relational schema draft.
-- Use this as a starting point for Supabase, PostgreSQL, Neon, or any SQL-backed API.

create table users (
  id text primary key,
  name text not null,
  email text unique,
  country text,
  status text,
  university text,
  program_start date,
  graduation date,
  field text,
  created_at timestamp default current_timestamp
);

create table profiles (
  id text primary key,
  user_id text references users(id) on delete cascade,
  profile_type text not null,
  headline text,
  role text,
  bio text,
  trust_count integer default 0,
  rating numeric(2, 1),
  reviews_count integer default 0,
  price_label text,
  created_at timestamp default current_timestamp
);

create table profile_skills (
  id text primary key,
  profile_id text references profiles(id) on delete cascade,
  skill text not null
);

create table profile_entries (
  id text primary key,
  profile_id text references profiles(id) on delete cascade,
  entry_type text not null,
  body text not null,
  sort_order integer default 0
);

create table community_posts (
  id text primary key,
  author_user_id text references users(id) on delete set null,
  topic text not null,
  question text not null,
  body text,
  answers_count integer default 0,
  helpful_count integer default 0,
  created_at timestamp default current_timestamp
);

create table checklist_items (
  id text primary key,
  user_id text references users(id) on delete cascade,
  label text not null,
  is_done boolean default false,
  sort_order integer default 0
);

create table recommendation_requests (
  id text primary key,
  student_profile_id text references profiles(id) on delete cascade,
  mentor_profile_id text references profiles(id) on delete cascade,
  status text default 'requested',
  created_at timestamp default current_timestamp
);

create table travel_groups (
  id text primary key,
  country text not null,
  university text not null,
  route text,
  travel_date date,
  intake text,
  members_count integer default 1,
  spots_left integer default 0,
  note text
);

create table ideas (
  id text primary key,
  author_user_id text references users(id) on delete set null,
  category text,
  title text not null,
  body text,
  validation_count integer default 0,
  status text,
  created_at timestamp default current_timestamp
);
