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
    `text` TEXT,
	KEY `idx_company` (`companyID`) USING BTREE,
    KEY `idx_trap` (`trapID`) USING BTREE,
    KEY `idx_service` (`serviceID`) USING BTREE,
    KEY `idx_attacker` (`attackerID`) USING BTREE,
	CONSTRAINT report_pk PRIMARY KEY (`reportID`)
);

CREATE TABLE IF NOT EXISTS `db`.`Attacker` (
	`attackerID` INT unsigned NOT NULL AUTO_INCREMENT,
	`ip` VARCHAR(15) NOT NULL,
	`location` VARCHAR(280),
	KEY `idx_attackerID` (`attackerID`) USING BTREE,
	CONSTRAINT attacker_pk PRIMARY KEY (`attackerID`)
);