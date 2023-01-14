CREATE TABLE IF NOT EXISTS `db`.`Services_HTTP_IPFOLLOW` (
    `ip_id` INT NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(15) NOT NULL,
    `counter` INT DEFAULT 0 NOT NULL,
    `last_date_login` DATE NOT NULL,
    CONSTRAINT ip_pk PRIMARY KEY (`ip_id`)
);