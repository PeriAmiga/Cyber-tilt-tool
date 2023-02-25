CREATE TABLE IF NOT EXISTS `db`.`Services_HTTP_IPFOLLOW` (
    `ip_id` INT NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(15) NOT NULL,
    `counter` INT DEFAULT 0 NOT NULL,
    `last_date_login` DATE NOT NULL,
    CONSTRAINT ip_pk PRIMARY KEY (`ip_id`)
);

CREATE TABLE IF NOT EXISTS `db`.`Reports` (
	`reportID` INT unsigned NOT NULL AUTO_INCREMENT,
	`serviceID` INT unsigned NOT NULL,
	`createDate` DATETIME NOT NULL,
	`connectionDuration` TIME,
	`companyID` INT unsigned NOT NULL,
	`attackerID` INT unsigned NOT NULL,
	`trapID` INT unsigned NOT NULL,
    `description` TEXT,
	KEY `idx_company` (`companyID`) USING BTREE,
    KEY `idx_trap` (`trapID`) USING BTREE,
    KEY `idx_service` (`serviceID`) USING BTREE,
    KEY `idx_attacker` (`attackerID`) USING BTREE,
	CONSTRAINT report_pk PRIMARY KEY (`reportID`)
);

CREATE TABLE IF NOT EXISTS `db`.`Attacker` (
	`attackerID` INT unsigned NOT NULL AUTO_INCREMENT,
	`ip` VARCHAR(15) NOT NULL,
	`location` TEXT,
	KEY `idx_ip` (`ip`) USING BTREE,
	CONSTRAINT attacker_pk PRIMARY KEY (`attackerID`)
);

CREATE TABLE IF NOT EXISTS `db`.`Service` (
	`serviceID` INT unsigned NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(5) NOT NULL,
	`port` INT unsigned NOT NULL,
	`description` TEXT,
	CONSTRAINT service_pk PRIMARY KEY (`serviceID`)
);

CREATE TABLE IF NOT EXISTS `db`.`Trap` (
	`trapID` INT unsigned NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(30) NOT NULL,
	`serviceID` INT unsigned NOT NULL,
	`description` TEXT,
	`isActivate` BOOLEAN NOT NULL DEFAULT 'true',
	KEY `idx_serviceID` (`serviceID`) USING BTREE,
	CONSTRAINT trap_pk PRIMARY KEY (`trapID`)
);

CREATE TABLE IF NOT EXISTS `db`.`Company` (
	`companyID` INT unsigned NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(128) NOT NULL,
	`serviceID` INT unsigned NOT NULL,
	`address` TEXT,
	`isActivate` BOOLEAN NOT NULL DEFAULT 'true',
    KEY `idx_name` (`name`) USING BTREE,
	FOREIGN KEY (serviceID) REFERENCES Service(serviceID),
    CONSTRAINT company_pk PRIMARY KEY (`companyID`)
);

CREATE TABLE IF NOT EXISTS `db`.`User` (
	`userID` INT unsigned NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(32) NOT NULL,
	`password` VARCHAR(64) NOT NULL,
	`fullName` VARCHAR(256) NOT NULL,
	`email` VARCHAR(256) NOT NULL,
	`phone` CHAR(15),
	`address` TEXT,
	`birthdate` DATE NOT NULL,
	`registerDate` DATETIME NOT NULL,
	`serviceID` INT NOT NULL DEFAULT '-1',
	`companyID` INT unsigned NOT NULL,
	`isSysAdmin` BOOLEAN NOT NULL DEFAULT 'false',
	`isCompanyAdmin` BOOLEAN NOT NULL DEFAULT 'false',
	`isActive` BOOLEAN NOT NULL DEFAULT 'true',
	KEY `idx_username` (`username`) USING BTREE,
    KEY `idx_email` (`email`) USING BTREE,
    KEY `idx_company` (`companyID`) USING BTREE,
    FOREIGN KEY (serviceID) REFERENCES Service(serviceID),
	CONSTRAINT user_pk PRIMARY KEY (`userID`)
);