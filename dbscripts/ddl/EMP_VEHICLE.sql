CREATE TABLE EMP_VEHICLE(
EMP_VEH_ID SERIAL PRIMARY KEY,
EMP_ID int REFERENCES EMPLOYEE(EMP_ID),
VEHCLE_ID int NOT NULL,
VEHICLE_TYPE varchar(20),
VEHICLE_REG_NUMBER varchar(50)
);
alter table emp_vehicle alter column vehcle_id type varchar(10);
alter table emp_vehicle rename column vehcle_id to vehicle_id;