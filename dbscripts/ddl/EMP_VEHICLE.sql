﻿CREATE TABLE EMP_VEHICLE(
EMP_VEH_ID SERIAL PRIMARY KEY,
EMP_ID int REFERENCES EMPLOYEE(EMP_ID),
VEHCLE_ID int NOT NULL,
VEHICLE_TYPE varchar(20),
VEHICLE_REG_NUMBER varchar(50)
);