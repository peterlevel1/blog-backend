--------------------------------------------------------

CREATE DATABASE blog
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

--------------------------------------------------------

use blog;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--------------------------------------------------------


CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NULL,
  `slug` varchar(255) NULL,
  `cover` varchar(255) NULL,
  `uid` int(11) NOT NULL,
  `catId` int(11) NULL COMMENT '博客只能属于一种类别',
  `status` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--------------------------------------------------------


CREATE TABLE IF NOT EXISTS `cat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `uid` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--------------------------------------------------------


CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `uid` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--------------------------------------------------------


CREATE TABLE IF NOT EXISTS `image` (
  `path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `size` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--------------------------------------------------------


CREATE TABLE IF NOT EXISTS `tagPosts` (
  `tagId` int(11) NOT NULL COMMENT '类别ID',
  `postId` int(11) NOT NULL COMMENT ' 博客ID',
  PRIMARY KEY (`tagId`, `postId`),
  CONSTRAINT `tagPost_ibfk_1` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tagPost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标签和博客关系表';

--------------------------------------------------------

-- only if the table is empty
INSERT INTO `user` (`id`, `username`, `email`, `password`)
VALUES (1, 'root', 'root@gmail.com', '$2b$08$uWK.uTUevuVje8GITyZW3OC96MtPe5V6.mRVPPLFmxT8NR/U8nQdm');

INSERT INTO `post` (`uid`, `title`, `content`)
VALUES (1, 'hello world', 'hello world is good, hahha !');

INSERT INTO `tag` (`uid`, `name`, )
VALUES (1, 'daily');

INSERT INTO `tag` (`uid`, `name`)
VALUES (1, '2024年');

INSERT INTO `cat` (`uid`, `name`)
VALUES (1, 'nestjs');

INSERT INTO `cat` (`uid`, `name`)
VALUES (1, 'typescript');
