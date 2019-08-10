
create database ttokttok_ex;

use ttokttok_ex;

#h : 회의실을 2시간 이상 예약할 경우....?

#h : 멤버테이블
CREATE TABLE Member_TB (
    Idx_Member INT PRIMARY KEY AUTO_INCREMENT,
    Name_Member VARCHAR(40) NOT NULL,
    ID_Member VARCHAR(200) UNIQUE,
    PW_Member VARCHAR(400) NOT NULL,
    salt VARCHAR(400) NOT NULL,
    Email_Member VARCHAR(200),
    Phone VARCHAR(20) NOT NULL,
    Create_at DATETIME DEFAULT now()
);

#h : 멤버의 권한과 노쇼횟수
create table Member_Info_TB
(
	Idx_Member int primary key,
    Role varchar(20) default 'Normal',
    Noshow int default '0',
    foreign key(Idx_Member) references Member_TB(Idx_Member)
);

#h : 회의실 테이블
create table Conference_TB
(
    Idx_Room int primary key auto_increment,
    Name_Room varchar(20) not null,
    Num_Person int not null,
    Intro varchar(400) not null,
    QRcode varchar(400) unique,
    Available_Time varchar(40),
    Location varchar(40),
    Image varchar(400)
);

#h : 회의실의 첨부파일 테이블
create table Conference_File_TB
(
	Idx_Conference_File int primary key auto_increment,
    Idx_Room int not null,
    origin_file_name varchar(100) not null,
    save_file_name varchar(100) not null,
    file_path varchar(100) not null, 
    Date_Conference_File datetime not null,
    foreign key(Idx_Room) references Conference_TB(Idx_Room)
);

#h : 회의실의 옵션테이블
create table Option_TB
(
	Idx_Room int not null,
    Name_Option varchar(40),
    foreign key(Idx_Room) references Conference_TB(Idx_Room)
);

#h : 예약 테이블
create table Reservation_TB
(
	Idx_Reserve int primary key auto_increment,
    Idx_Member int not null,
    Idx_Room int not null,
    Date_Reserve date not null,
    Time_Reserve int not null,
    Few_Hours int default 1,
    Num_Reserver int not null,
    DT_Reservation datetime,
    foreign key(Idx_Member) references Member_TB(Idx_Member),
    foreign key(Idx_Room) references Conference_TB(Idx_Room)
);

#h : 예약 Item 테이블
create table Reserve_Item_TB
(
	Idx_Reserve int,
	Time_Item int,
    foreign key(Idx_Reserve) references Reservation_TB(Idx_Reserve)
);

#h : 게시판 테이블
create table Board_TB
(
	Idx_Board int primary key auto_increment,
    Title varchar(40) not null,
    Idx_Member int not null,
    Content varchar(400) not null,
    Num_View int not null,
    Date_Board datetime not null,
    Type_Board int,
    foreign key(Idx_Member) references Member_TB(Idx_Member)
    
);
 
#h : 게시판의 파일 테이블
create table Board_File_TB
(
	Idx_Board_File int primary key auto_increment,
    Idx_Board int not null,
    origin_file_name varchar(100) not null,
    save_file_name varchar(100) not null,
    file_path varchar(100) not null, 
    Date_Board_File datetime not null,
    foreign key(Idx_Board) references Board_TB(Idx_Board)
);

#h : 댓글 테이블
create table Comment_TB
(
	Idx_Comment int primary key auto_increment,
    Idx_Board int not null,
    ID_Member varchar(200) not null,
    Comment_Content varchar(400) not null,
    Comment_Date datetime not null,
    foreign key(Idx_Board) references board_tb(Idx_Board)
);

# show tables;
	



