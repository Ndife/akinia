-- 1. Create contacts without any foreign keys
create table if not exists contacts (
  id text primary key,
  name text not null,
  role text,
  company_id text,
  investor_id text,
  email text
);

-- 2. Create investors (without references)
create table if not exists investors (
  id text primary key,
  name text not null,
  type text,
  hq_location text,
  founded integer,
  aum_m numeric,
  focus_sectors text[],
  portfolio_companies text[],
  managing_partner_id text
);

-- 3. Create companies (without references)
create table if not exists companies (
  id text primary key,
  name text not null,
  sector text,
  hq_location text,
  founded integer,
  stage text,
  employees integer,
  valuation_m numeric,
  ceo_contact_id text,
  primary_investor_id text,
  created_at timestamp default now()
);

-- 6. Enable RLS
alter table companies enable row level security;
alter table contacts enable row level security;
alter table investors enable row level security;

-- 7. Define policies
create policy "Allow select on companies for authenticated"
on companies for select to authenticated using (true);

create policy "Allow select on contacts for authenticated"
on contacts for select to authenticated using (true);

create policy "Allow select on investors for authenticated"
on investors for select to authenticated using (true);

