INSERT INTO specimen (`name`)
VALUES ('Whole Blood'), ('Serum'), ('Plasma'), ('CSF'), ('Urine'), ('DBS'), ('WBC Pellet (~1% of the time)'), ('Other');

INSERT INTO transparency (`name`)
VALUES ('Clear'), ('Cloudy');

INSERT INTO tube_color (`name`)
VALUES ('WB Purple'), ('WB Green'), ('WB Yellow'), ('WB Red'), ('Serum'), ('Plasma'), ('DBS'), ('CSF'), ('Urine');

INSERT INTO visual_inspect (`name`)
VALUES ('Normal'), ('Hemolyzed'), ('Quantity Not Sufficient'), ('More than 5 Days from Date of Collection'), ('Wrong Collection Tube');

INSERT INTO `type` (`name`)
VALUES ('Serum'), ('Plasma');

INSERT INTO sample_color (`name`)
VALUES ('Yellow'), ('Brown'), ('Orange'), ('Red');

INSERT INTO `role` (`name`)
VALUES ('Technologist'), ('Accessioner'), ('Admin');