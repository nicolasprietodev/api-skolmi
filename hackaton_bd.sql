use hackaton;
CREATE TABLE `usuarios` (
  `id_usuario` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100),
  `correo` VARCHAR(100),
  `telefono` VARCHAR(100),
  `password` VARCHAR(100),
  `fecha_registro` timestamp default current_timestamp,
  `estado_usuario` TINYINT(1),
  `codigo` varchar(100),
  `id_rol` INT,
  `id_curso` int
);

CREATE TABLE `roles_usuario` (
  `id_rol` INT PRIMARY KEY AUTO_INCREMENT,
  `rol` tinyint,
  `estado` VARCHAR(20)
);

CREATE TABLE `cursos` (
  `id_curso` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_curso` VARCHAR(255),
  `estado` varchar(255)
);

CREATE TABLE `Matricula` (
  `id_matricula` int,
  `id_usuario` int,
  `id_curso` int,
  `direccion` varchar(255),
  `estado_pago` varchar(255),
  `sexo` varchar(255),
  `estado_civil` varchar(255),
  `documento` varchar(255),
  `nivel_academico` varchar(255),
  `anio_anterior` date,
  `fecha_nacimiento` date,
  `tipo_sangre` varchar(255),
  `tutor` varchar(255),
  `tel_tutor` varchar(255),
  `relacion_tutor` varchar(255),
  `municipio` varchar(255),
  `departamento` varchar(255),
  `estado` varchar(255),
  `progreso` int
);

CREATE TABLE `referidos` (
  `id_referido` INT PRIMARY KEY AUTO_INCREMENT,
  `id_usuario_referido` INT,
  `id_usuario_referidor` INT,
  `estado` TINYINT(1),
  `fecha_referido` DATETIME
);

CREATE TABLE `conversiones` (
  `id_conversion` INT PRIMARY KEY AUTO_INCREMENT,
  `id_referido` INT,
  `fecha_conversion` DATETIME
);

CREATE TABLE `incentivos` (
  `id_incentivo` INT PRIMARY KEY AUTO_INCREMENT,
  `id_usuario_referidor` INT,
  `tipo_incentivo` VARCHAR(50),
  `valor_incentivo` DECIMAL(10,2),
  `fecha_entrega` DATETIME
);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`id_rol`) REFERENCES `roles_usuario` (`id_rol`);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`);

ALTER TABLE `Matricula` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `Matricula` ADD FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`);

ALTER TABLE `referidos` ADD FOREIGN KEY (`id_usuario_referido`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `referidos` ADD FOREIGN KEY (`id_usuario_referidor`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `conversiones` ADD FOREIGN KEY (`id_referido`) REFERENCES `referidos` (`id_referido`);

ALTER TABLE `incentivos` ADD FOREIGN KEY (`id_usuario_referidor`) REFERENCES `usuarios` (`id_usuario`);

INSERT INTO roles_usuario (rol,estado) VALUES (0,0);

INSERT INTO roles_usuario (rol,estado) VALUES (1,1);