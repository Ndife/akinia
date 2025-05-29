-- Add foreign keys to `contacts`
alter table contacts
  add constraint fk_contacts_company_id
  foreign key (company_id) references companies(id) on delete set null;

alter table contacts
  add constraint fk_contacts_investor_id
  foreign key (investor_id) references investors(id) on delete set null;

-- Add foreign key to `investors`
alter table investors
  add constraint fk_investors_managing_partner_id
  foreign key (managing_partner_id) references contacts(id) on delete set null;

-- Add foreign keys to `companies`
alter table companies
  add constraint fk_companies_ceo_contact_id
  foreign key (ceo_contact_id) references contacts(id) on delete set null;

alter table companies
  add constraint fk_companies_primary_investor_id
  foreign key (primary_investor_id) references investors(id) on delete set null;
