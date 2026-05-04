-- AWE App — Supabase Schema
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/vtnizjpnllhwcjitkwvx/sql/new

-- ─────────────────────────────────────────
-- 1. COHORTS
-- ─────────────────────────────────────────
create table if not exists cohorts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_date date not null,
  status text not null default 'active', -- active | closed | dissolved
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- 2. PARTICIPANTS
-- ─────────────────────────────────────────
create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid references cohorts(id) on delete cascade,
  name text,
  email text unique,
  intention_release text,
  intention_open text,
  miss_count int not null default 0,
  status text not null default 'active', -- active | flagged | removed | completed
  enrolled_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- 3. DAILY CONTENT
-- ─────────────────────────────────────────
create table if not exists daily_content (
  id uuid primary key default gen_random_uuid(),
  day_number int not null unique check (day_number between 0 and 13),
  theme text not null,
  quote text,
  quote_author text,
  instruction text not null,
  phase text -- preparation | release | introduce | reflect | detox | awareness | open
);

-- ─────────────────────────────────────────
-- 4. CHECK-INS
-- ─────────────────────────────────────────
create table if not exists check_ins (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id) on delete cascade,
  day_number int not null check (day_number between 0 and 13),
  completed boolean not null,
  checked_in_at timestamptz default now(),
  unique(participant_id, day_number)
);

-- ─────────────────────────────────────────
-- 5. ROW LEVEL SECURITY
-- ─────────────────────────────────────────
alter table cohorts enable row level security;
alter table participants enable row level security;
alter table daily_content enable row level security;
alter table check_ins enable row level security;

-- Daily content is public (readable by anyone)
create policy "daily_content_public_read" on daily_content
  for select using (true);

-- Participants can read/write their own row (by email match via auth)
create policy "participants_own" on participants
  for all using (auth.email() = email);

-- Check-ins: participant can manage their own
create policy "checkins_own" on check_ins
  for all using (
    participant_id in (
      select id from participants where email = auth.email()
    )
  );

-- Cohorts: readable by authenticated users
create policy "cohorts_read" on cohorts
  for select using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────
-- 6. SEED — 13-day program content
-- ─────────────────────────────────────────
insert into daily_content (day_number, theme, phase, quote, quote_author, instruction) values
(0,  'Preparation',  'preparation', 'Before anything else, preparation is the key to success.', 'Alexander Graham Bell', 'Set your intention. Name what you are releasing and what you are opening to. This is your anchor for the 12 days ahead.'),
(1,  'Release',      'release',     'You can''t reach what''s in front of you until you let go of what''s behind you.', null, 'Today, turn off all non-essential notifications. Every ping that doesn''t require your immediate response — silence it. Notice the discomfort. Sit with it.'),
(2,  'Release',      'release',     'Almost everything will work again if you unplug it for a few minutes.', 'Anne Lamott', 'Identify your three most compulsive apps. Delete them from your home screen. Not forever — just out of reach. Notice what you reach for instead.'),
(3,  'Release',      'release',     'Attention is the rarest and purest form of generosity.', 'Simone Weil', 'Today, notice every time you reach for your phone out of habit — not need. Each time, pause. Put it down. Return to the room.'),
(4,  'Introduce',    'introduce',   'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', 'Aristotle', 'Choose one morning ritual to do before you touch your phone. It can be small — water, breath, stillness. Protect that window.'),
(5,  'Introduce',    'introduce',   'In the middle of difficulty lies opportunity.', 'Albert Einstein', 'Create a phone-free zone in your home. One room, one corner, one chair. A place that belongs to you — not your device.'),
(6,  'Introduce',    'introduce',   'The quieter you become, the more you can hear.', 'Ram Dass', 'Spend 20 minutes today doing something with your hands — cooking, drawing, writing on paper. No screen. Notice what surfaces when boredom has nowhere to go.'),
(7,  'Reflect',      'reflect',     'What we plant in the soil of contemplation, we shall reap in the harvest of action.', 'Meister Eckhart', 'Write down three ways your phone use has changed since Day 1. No judgement. Just observe. You are the scientist and the experiment.'),
(8,  'Reflect',      'reflect',     'It is not the answer that enlightens, but the question.', 'Eugène Ionesco', 'Ask yourself: what am I actually looking for when I pick up my phone? Sit with the answer. Write it down if you can.'),
(9,  'Reflect',      'reflect',     'To pay attention, this is our endless and proper work.', 'Mary Oliver', 'Today, before opening any app, pause for 3 seconds and ask: is this intentional or habitual? That pause is enough. Do this every time.'),
(10, 'Detox',        'detox',       'Almost everything will work again if you unplug it for a few minutes — including you.', 'Anne Lamott', 'Today is a deep reset. Use your phone only for calls and navigation. No social media. No news. No content. Spend the time you reclaim on something that feeds you.'),
(11, 'Awareness',    'awareness',   'The present moment is the only moment available to us, and it is the door to all moments.', 'Thich Nhat Hanh', 'You''re close. Notice how you feel compared to Day 1. What has shifted? What has returned? Carry that awareness into today — let it guide each time you reach for your phone.'),
(12, 'Awareness',    'awareness',   'Not all those who wander are lost.', 'J.R.R. Tolkien', 'Final day. No task — just presence. You''ve built something in yourself this past 12 days. Trust it. The container is closing, but what you''ve found stays with you.'),
(13, 'Open',         'open',        null, null, 'The circle is open for 48 hours. Share what you''re willing to share. Receive what others offer. Then let this container close with grace.')
on conflict (day_number) do nothing;
