delimiter //
CREATE OR REPLACE TRIGGER FINAL_SCOREU
BEFORE UPDATE
ON SCORES
FOR EACH ROW
SET NEW.FINAL_SCORE = NEW.ADVANCE1 + NEW.ADVANCE2 + NEW.ADVANCE3 + NEW.ADVANCE4;
//
CREATE OR REPLACE TRIGGER FINAL_SCOREI 
BEFORE INSERT
ON SCORES
FOR EACH ROW
SET NEW.FINAL_SCORE = NEW.ADVANCE1 + NEW.ADVANCE2 + NEW.ADVANCE3 + NEW.ADVANCE4;
//
delimiter ;