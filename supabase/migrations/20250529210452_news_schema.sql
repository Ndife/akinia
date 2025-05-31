create table if not exists news (
  id text primary key,
  title text not null,
  date date not null,
  sector text,
  related_company_id text[],
  related_fund_id text[],
  source text
);
