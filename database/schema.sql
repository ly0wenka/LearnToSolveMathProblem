CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  code VARCHAR(32) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES roles(id),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_modules (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  level VARCHAR(100) NOT NULL,
  summary TEXT NOT NULL
);

CREATE TABLE module_outcomes (
  id SERIAL PRIMARY KEY,
  module_id VARCHAR(64) NOT NULL REFERENCES learning_modules(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL,
  outcome_text TEXT NOT NULL
);

CREATE TABLE problems (
  id VARCHAR(64) PRIMARY KEY,
  module_id VARCHAR(64) NOT NULL REFERENCES learning_modules(id),
  topic VARCHAR(120) NOT NULL,
  level VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  prompt TEXT NOT NULL,
  correct_answer TEXT NOT NULL
);

CREATE TABLE problem_variants (
  id SERIAL PRIMARY KEY,
  problem_id VARCHAR(64) NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  variant_text TEXT NOT NULL
);

CREATE TABLE problem_steps (
  id SERIAL PRIMARY KEY,
  problem_id VARCHAR(64) NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  tip TEXT NOT NULL
);

CREATE TABLE attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  problem_id VARCHAR(64) NOT NULL REFERENCES problems(id),
  user_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  checked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  problem_id VARCHAR(64) NOT NULL REFERENCES problems(id),
  completed_at TIMESTAMP,
  last_result BOOLEAN,
  attempt_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE (user_id, problem_id)
);

CREATE TABLE recommendations (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  module_id VARCHAR(64) NOT NULL REFERENCES learning_modules(id),
  reason TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
