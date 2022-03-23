CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;
CREATE INDEX participant_firstname_index
   ON "Participant" USING GIN (to_tsvector('spanish', "firstName"));
CREATE INDEX participant_lastname_index
   ON "Participant" USING GIN (to_tsvector('spanish', "lastName"));
CREATE INDEX user_firstname_index
   ON "User" USING GIN (to_tsvector('spanish', "firstName"));
CREATE INDEX user_lastname_index
   ON "User" USING GIN (to_tsvector('spanish', "lastName"));
CREATE INDEX program_name_index
   ON "Program" USING GIN (to_tsvector('spanish', "name"));
CREATE INDEX school_name_index
   ON "School" USING GIN (to_tsvector('spanish', "name"));
