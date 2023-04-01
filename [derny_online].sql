CREATE DATABASE DERNY_ONLINE;

USE DERNY_ONLINE;

-- Employees table
CREATE TABLE employees (
	emp_id						INT,
	full_name					VARCHAR(50)		NOT NULL,
	date_of_birth			DATE					NOT NULL,
	date_of_joining		DATE					NOT NULL,
	email							VARCHAR(60)		NOT NULL,
	gender						VARCHAR(8)   	NOT NULL,
	identity_id				VARCHAR(10)		NOT NULL,
	passport_id				VARCHAR(9),
	nationality				VARCHAR(20)   NOT NULL,
	emp_status				INT						NOT NUll,
	-- foreign keys
	contract_id 			INT,
	PRIMARY KEY (emp_id),
	UNIQUE (identity_id),
	UNIQUE (passport_id),
	UNIQUE (email)
);

-- Current information (address and contact)
CREATE TABLE current_info (
	current_info_id		INT 					AUTO_INCREMENT,
	current_country		VARCHAR(50)		NOT NULL,
	current_state			VARCHAR(50)		NOT NULL,
	current_country_phone_code VARCHAR(5)	NOT NULL,
	current_address		VARCHAR(100)	NOT NULL,
	current_phone_1		VARCHAR(12)		NOT NULL,
	current_phone_2		VARCHAR(12),
	-- foreign keys
	emp_id 						INT						NOT NULL,
	PRIMARY KEY (current_info_id)
)
ALTER TABLE current_info
	ADD FOREIGN KEY (emp_id) REFERENCES employees (emp_id)

-- Home information (address and contact)
CREATE TABLE home_info (
	home_info_id			INT 					AUTO_INCREMENT,
	home_country			VARCHAR(50)		NOT NULL,
	home_state				VARCHAR(50)		NOT NULL,
	home_country_phone_code	VARCHAR(5)		NOT NULL,
	home_address			VARCHAR(100)	NOT NULL,
	home_phone				VARCHAR(12)		NOT NULL,
	relative_phone		VARCHAR(12)		NOT NULL,
	-- foreign keys
	emp_id 						INT						NOT NULL,
	PRIMARY KEY (home_info_id)
)
ALTER TABLE home_info
	ADD FOREIGN KEY (emp_id) REFERENCES employees (emp_id)

-- Companys table
CREATE TABLE companys (
	company_id 				INT						AUTO_INCREMENT,
	company_name			VARCHAR(50)		NOT NULL,
	branch						VARCHAR(50)		NOT NULL,
	-- foreign keys
	emp_id						INT						NOT NULL,
	PRIMARY KEY (company_id)
)
ALTER TABLE companys
	ADD FOREIGN KEY (emp_id) REFERENCES employees (emp_id)

-- Departments table	
CREATE TABLE departments (
	department_id 		INT						AUTO_INCREMENT,
	position 					VARCHAR(50)		NOT NULL,
	department				VARCHAR(50)		NOT NULL,
	-- foreign keys
	emp_id						INT						NOT NULL,
	PRIMARY KEY (department_id)
)
ALTER TABLE departments
	ADD FOREIGN KEY (emp_id) REFERENCES employees (emp_id)

-- Contracts table	
CREATE TABLE contracts (
	contract_id 			INT						AUTO_INCREMENT,
	date_of_joining 	VARCHAR(50)		NOT NULL,
	contract_years		VARCHAR(50)		NOT NULL,
	-- foreign keys
	PRIMARY KEY (contract_id)
)
ALTER TABLE employees
	ADD FOREIGN KEY (contract_id) REFERENCES contracts (contract_id)

---------------------------------------------------------------
/*Salary related tables*/
-- Salarys table
CREATE TABLE salarys (
	salary_id					INT						AUTO_INCREMENT,
	basic_salary			SMALLMONEY		NOT NULL,
	bank_code					VARCHAR(4)		NOT NULL,
	-- put Occrued Vacations FOREIGN KEY here
	-- put End Service Indemnity FOREIGN KEY here
	-- Static Allowances
	housing_allowance	SMALLMONEY		NOT NULL,
	trans_allowance		SMALLMONEY		NOT NULL,
	other_allowance		SMALLMONEY,
	calling_allowance	SMALLMONEY,
	balance_gov_exp		SMALLMONEY,
	work_nature				SMALLMONEY,
	--foreign keys
	emp_id						INT						NOT NULL,
	worked_month_id		INT						NOT NULL,
	PRIMARY KEY (salary_id)
)
ALTER TABLE salarys 
	ADD FOREIGN KEY (emp_id) REFERENCES employees (emp_id),
		FOREIGN KEY (worked_month_id) REFERENCES worked_months (worked_month_id)

-- Variable Allowances table
CREATE TABLE v_allowances (
	v_allowance_id		INT						AUTO_INCREMENT,
	over_time					SMALLMONEY,
	food_allowance		SMALLMONEY,
	redemption				SMALLMONEY,
	month_salary_notice		SMALLMONEY,
	other_earnings		SMALLMONEY,
	--foreign keys
	worked_month_id		INT						NOT NULL,
	PRIMARY KEY (v_allowance_id)
)
ALTER TABLE v_allowances
	ADD FOREIGN KEY (worked_month_id) REFERENCES worked_months (worked_month_id)

-- Deductions table
CREATE TABLE deductions (
	deduction_id			INT						AUTO_INCREMENT,
	loans							SMALLMONEY,
	Insurances				SMALLMONEY		NOT NULL,
	lateness					SMALLMONEY,
	non_attendance		SMALLMONEY,
	loan							SMALLMONEY,
	--foreign keys
	worked_month_id		INT						NOT NULL,
	PRIMARY KEY (deduction_id)
)
ALTER TABLE deductions
	ADD FOREIGN KEY (worked_month_id) REFERENCES worked_months (worked_month_id)

---------------------------------------------------------------
/*Work related tables*/
-- Worked Months table
CREATE TABLE worked_months (
	worked_month_id		INT						AUTO_INCREMENT,
	worked_month			DATE					NOT NULL,
	-- Net Salary
	net_salary				SMALLMONEY		NOT NULL,
	bank_amount				SMALLMONEY		NOT NULL,
	cash_amount				SMALLMONEY		NOT NULL,
	PRIMARY KEY (worked_month_id)
)
-- Employee Worked Months table
CREATE TABLE emp_worked_months (
	--foreign keys
	emp_id 						INT 					NOT NULL,
	worked_month_id		INT			 			NOT NULL,
)
ALTER TABLE emp_worked_months
	ADD FOREIGN KEY (emp_id) REFERENCES employees (emp_id),
		FOREIGN KEY (worked_month_id) REFERENCES worked_months (worked_month_id)
