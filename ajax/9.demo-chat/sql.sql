--Database "chat"

CREATE TABLE 'messages'(
	'id' int(7) NOT NULL auto_increment,--编号
	'user' varchar(255) NOT NULL,--姓名
	'msg' text NOT NULL,--内容
	'time' int(9) NOT NULL,--时间戳
	PRIMARY KEY (`id`)
);