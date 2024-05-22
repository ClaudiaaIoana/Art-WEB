-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: mai 22, 2024 la 09:48 AM
-- Versiune server: 10.4.32-MariaDB
-- Versiune PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `art`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `bids`
--

CREATE TABLE `bids` (
  `ID` int(11) NOT NULL,
  `ID_user` int(11) NOT NULL,
  `ID_post` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `bids`
--

INSERT INTO `bids` (`ID`, `ID_user`, `ID_post`, `price`, `timestamp`) VALUES
(11, 5, 28, 450, '2024-05-21'),
(12, 5, 28, 450, '2024-05-21'),
(13, 7, 26, 302, '2024-05-21'),
(14, 7, 28, 452, '2024-05-21'),
(15, 6, 31, 1400, '2024-05-21'),
(17, 8, 30, 503, '2024-05-21'),
(18, 8, 28, 460, '2024-05-21'),
(19, 8, 32, 300, '2024-05-21'),
(20, 5, 32, 320, '2024-05-21'),
(21, 5, 35, 602, '2024-05-21'),
(23, 10, 34, 70, '2024-05-21'),
(24, 5, 26, 309, '2024-05-21'),
(25, 11, 30, 6000, '2024-05-21'),
(26, 11, 26, 900, '2024-05-21'),
(27, 6, 39, 700, '2024-05-21');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `favourites`
--

CREATE TABLE `favourites` (
  `ID` int(11) NOT NULL,
  `ID_post` int(11) NOT NULL,
  `ID_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `favourites`
--

INSERT INTO `favourites` (`ID`, `ID_post`, `ID_user`) VALUES
(11, 26, 5),
(12, 28, 5),
(13, 26, 7),
(14, 30, 5),
(15, 31, 5),
(17, 31, 6),
(19, 31, 8),
(20, 28, 8),
(21, 26, 8),
(22, 35, 5),
(23, 32, 5),
(25, 26, 9),
(26, 27, 9),
(27, 28, 9),
(29, 31, 9),
(30, 35, 9),
(31, 40, 5),
(32, 38, 5),
(33, 36, 5),
(34, 37, 5),
(37, 27, 10),
(38, 30, 10),
(40, 31, 10),
(41, 37, 10),
(42, 36, 10),
(43, 39, 10),
(44, 38, 10),
(45, 40, 10),
(46, 34, 10),
(47, 39, 10),
(48, 27, 10),
(50, 30, 10),
(51, 31, 10),
(52, 34, 10),
(53, 37, 10),
(54, 36, 10),
(55, 35, 10),
(56, 38, 10),
(57, 40, 10),
(58, 30, 11),
(59, 28, 6),
(60, 26, 6),
(61, 39, 6);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `images`
--

CREATE TABLE `images` (
  `ID` int(11) NOT NULL,
  `image` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `images`
--

INSERT INTO `images` (`ID`, `image`) VALUES
(7, 'http://localhost:4200/images/photo_1716040807868.jpg'),
(8, 'http://localhost:4200/images/photo_1716040807900.png'),
(9, 'http://localhost:4200/images/photo_1716040807935.jpg'),
(10, 'http://localhost:4200/images/photo_1716040807957.jpg'),
(11, 'http://localhost:4200/images/photo_1716058006624.jpg'),
(12, 'http://localhost:4200/images/photo_1716058006677.jpg'),
(13, 'http://localhost:4200/images/photo_1716058006706.jpg'),
(14, 'http://localhost:4200/images/photo_1716127007015.jpg'),
(15, 'http://localhost:4200/images/photo_1716272501152.png'),
(16, 'http://localhost:4200/images/photo_1716272501222.jpg'),
(17, 'http://localhost:4200/images/photo_1716272634186.jpg'),
(18, 'http://localhost:4200/images/photo_1716272634239.jpg'),
(19, 'http://localhost:4200/images/photo_1716282259038.jpg'),
(20, 'http://localhost:4200/images/photo_1716282259077.png'),
(21, 'http://localhost:4200/images/photo_1716282259112.jpg'),
(22, 'http://localhost:4200/images/photo_1716282259132.jpg'),
(23, 'http://localhost:4200/images/photo_1716282513918.jpg'),
(24, 'http://localhost:4200/images/photo_1716282513959.jpg'),
(25, 'http://localhost:4200/images/photo_1716282513982.jpg'),
(26, 'http://localhost:4200/images/photo_1716282688954.jpg'),
(27, 'http://localhost:4200/images/photo_1716282688981.jpg'),
(28, 'http://localhost:4200/images/photo_1716283441004.jpg'),
(29, 'http://localhost:4200/images/photo_1716283441025.jpg'),
(30, 'http://localhost:4200/images/photo_1716283441041.jpg'),
(31, 'http://localhost:4200/images/photo_1716283441063.jpg'),
(32, 'http://localhost:4200/images/photo_1716283441088.jpg'),
(33, 'http://localhost:4200/images/photo_1716283555462.jpg'),
(34, 'http://localhost:4200/images/photo_1716283555497.jpg'),
(35, 'http://localhost:4200/images/photo_1716283624161.jpg'),
(36, 'http://localhost:4200/images/photo_1716283624195.jpg'),
(37, 'http://localhost:4200/images/photo_1716283624214.jpg'),
(38, 'http://localhost:4200/images/photo_1716284334755.jpg'),
(39, 'http://localhost:4200/images/photo_1716284334782.jpg'),
(40, 'http://localhost:4200/images/photo_1716284334802.jpg'),
(41, 'http://localhost:4200/images/photo_1716284410182.jpg'),
(42, 'http://localhost:4200/images/photo_1716284617961.jpg'),
(43, 'http://localhost:4200/images/photo_1716284819573.jpg'),
(44, 'http://localhost:4200/images/photo_1716284819595.jpeg'),
(45, 'http://localhost:4200/images/photo_1716285637833.jpg'),
(46, 'http://localhost:4200/images/photo_1716285637870.jpg'),
(47, 'http://localhost:4200/images/photo_1716285637888.jpg'),
(48, 'http://localhost:4200/images/photo_1716285637909.jpg'),
(49, 'http://localhost:4200/images/photo_1716285637936.jpg'),
(50, 'http://localhost:4200/images/photo_1716285831471.jpg'),
(51, 'http://localhost:4200/images/photo_1716285831496.jpg'),
(52, 'http://localhost:4200/images/photo_1716285916085.jpg'),
(53, 'http://localhost:4200/images/photo_1716285916110.jpg'),
(54, 'http://localhost:4200/images/photo_1716286019547.jpg'),
(55, 'http://localhost:4200/images/photo_1716286019568.jpg'),
(56, 'http://localhost:4200/images/photo_1716286311518.jpg'),
(57, 'http://localhost:4200/images/photo_1716286311546.jpg'),
(58, 'http://localhost:4200/images/photo_1716286311562.jpg'),
(59, 'http://localhost:4200/images/photo_1716295167249.jpg'),
(60, 'http://localhost:4200/images/photo_1716295167273.jpg'),
(61, 'http://localhost:4200/images/photo_1716295167291.jpg'),
(62, 'http://localhost:4200/images/photo_1716308580665.jpg'),
(63, 'http://localhost:4200/images/photo_1716308580710.jpeg'),
(64, 'http://localhost:4200/images/photo_1716309601769.jpg'),
(65, 'http://localhost:4200/images/photo_1716309601835.jpg'),
(66, 'http://localhost:4200/images/photo_1716309601881.jpg'),
(67, 'http://localhost:4200/images/photo_1716309601917.jpg'),
(68, 'http://localhost:4200/images/photo_1716361893205.jpg'),
(69, 'http://localhost:4200/images/photo_1716361893230.jpg');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `posts`
--

CREATE TABLE `posts` (
  `ID` int(11) NOT NULL,
  `ID_user` int(11) NOT NULL,
  `title` varchar(64) NOT NULL,
  `styles` varchar(128) NOT NULL,
  `author` varchar(64) NOT NULL,
  `startBid` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `startDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `posts`
--

INSERT INTO `posts` (`ID`, `ID_user`, `title`, `styles`, `author`, `startBid`, `description`, `status`, `startDate`) VALUES
(26, 6, 'Carul cu boi', 'Realism', 'Nicolae Grigorescu', 300, 'Lucrarea „ Car cu boi”, realizată la 1897, atunci când Grigorescu se afla în plină maturitate artistică, a fost pictată în ulei pe lemn, având dimensiuni medii, de 24/44 centimetri.', 2, '2024-05-02'),
(27, 6, 'The kiss ', 'Renesance', 'Gustav Klimt', 498, 'A worldwide known classic.', 2, '2024-05-21'),
(28, 6, 'Romania Revolutionara', 'Realism', ' Constantin Daniel Rosenthal', 400, 'România Revoluționară este o pictură realizată de artistul român Constantin Daniel Rosenthal în anul 1850.[1] După alți analiști, lucrarea ar fi fost pictată în perioada 1847-1851 și a fost litografia', 2, '2024-05-21'),
(30, 7, 'Adele', 'Impressionism', 'Gustav Klimt', 500, 'The portret of Adele by Gustav Klimt.', 2, '2024-05-18'),
(31, 7, 'Starry Night', 'Abstract', 'Vincent van Gogh', 1300, 'The Starry Night (Dutch: De sterrennacht) is an oil-on-canvas painting by the Dutch Post-Impressionist painter Vincent van Gogh painted in June 1889. It depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village.', 2, '2024-05-21'),
(32, 8, 'Anemone', 'Realism', 'Stefan Luchian', 280, 'Famous romanian painting of dead nature.', 2, '2024-05-19'),
(34, 8, 'Mind games', 'Abstract', 'unknown', 60, 'An interesting painting for meditation or study rooms.', 2, '2024-04-19'),
(35, 8, 'Village (1911)', 'Cubic', 'Marc Chagall', 400, 'We\'re looking at Marc Chagall\'s I and the Village that the Russian artist made in Paris in 1911. And what you see when you look at this work of art is a brilliantly colored field in which the figure of a young peasant boy that some think might be Chagall himself stares intently at the image of a cow, and there\'s a small, dotted line that connects the eyes of these two creatures and behind there\'s an almost magical village in which a young peasant carries his scythe and a young woman floats upsid', 2, '2024-05-21'),
(36, 9, 'The creation of Adam', 'Impressionism', ' Michelangelo', 2000, 'The Creation of Adam (Italian: Creazione di Adamo), also known as The Creation of Man[2],: plate 54  is a fresco painting by Italian artist Michelangelo, which forms part of the Sistine Chapel\'s ceiling, painted c. 1508–1512.', 2, '2024-05-21'),
(37, 9, 'Mona Lisa', 'Renesance', 'Leonardo da Vinci', 1599, 'The Mona Lisa (Italian: Gioconda or Monna Lisa; French: Joconde) is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance,it has been described as \"the best known, the most visited, the most written about, the most sung about, [and] the most parodied work of art in the world\".', 2, '2024-05-21'),
(38, 9, 'Girl with a Pearl Earring', 'Renesance', 'Johannes Vermeer', 750, 'Girl with a Pearl Earring (Dutch: Meisje met de parel) is an oil painting by Dutch Golden Age painter Johannes Vermeer, dated c. 1665. Going by various names over the centuries, it became known by its present title towards the end of the 20th century after the earring worn by the girl portrayed there. The work has been in the collection of the Mauritshuis in The Hague since 1902 and has been the subject of various literary and cinematic treatments.', 2, '2024-05-21'),
(39, 9, 'The Scream', 'Impressionism', 'Edvard Munch', 600, 'The Scream is a composition created by Norwegian artist Edvard Munch in 1893. The Norwegian name of the piece is Skrik (Scream), and the German title under which it was first exhibited is Der Schrei der Natur (The Scream of Nature). The agonized face in the painting has become one of the most iconic images in art, seen as symbolizing the anxiety of the human condition. Munch\'s work, including The Scream, had a formative influence on the Expressionist movement.', 2, '2024-05-13'),
(40, 9, 'The Dance Class', 'Impressionism', 'Degas', 430, 'The Dance Class is an 1874 oil painting on canvas by the French artist Edgar Degas. It is in the collection of the Metropolitan Museum of Art, in New York', 2, '2024-05-21'),
(41, 10, 'The Persistence of Memory', 'Abstract', 'Salvador Dalí', 800, 'The Persistence of Memory (Spanish: La persistencia de la memoria) is a 1931 painting by artist Salvador Dalí and one of the most recognizable works of Surrealism. First shown at the Julien Levy Gallery in 1932, since 1934 the painting has been in the collection of the Museum of Modern Art (MoMA) in New York City, which received it from an anonymous donor.', 1, '2024-05-21'),
(43, 6, 'Swing', 'Renesance, Impressionism', 'Jean-Honoré Fragonard', 230, 'The painting depicts an elegantly dressed young woman on a swing. A smiling young man, hiding in the bushes below and to the left, points towards her billowing dress with hat in hand. A smiling older man, who is nearly hidden in the shadows on the right, propels the swing with a pair of ropes, as a small white dog barks nearby. ', 2, '2024-05-21');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `posts_images`
--

CREATE TABLE `posts_images` (
  `ID` int(11) NOT NULL,
  `ID_post` int(11) NOT NULL,
  `ID_image` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `posts_images`
--

INSERT INTO `posts_images` (`ID`, `ID_post`, `ID_image`) VALUES
(17, 26, 19),
(18, 26, 20),
(19, 26, 21),
(20, 26, 22),
(21, 27, 23),
(22, 27, 24),
(23, 27, 25),
(24, 28, 26),
(25, 28, 27),
(31, 30, 33),
(32, 30, 34),
(33, 31, 35),
(34, 31, 36),
(35, 31, 37),
(36, 32, 38),
(37, 32, 39),
(38, 32, 40),
(40, 34, 42),
(41, 35, 43),
(42, 35, 44),
(43, 36, 45),
(44, 36, 46),
(45, 36, 47),
(46, 36, 48),
(47, 36, 49),
(48, 37, 50),
(49, 37, 51),
(50, 38, 52),
(51, 38, 53),
(52, 39, 54),
(53, 39, 55),
(54, 40, 56),
(55, 40, 57),
(56, 40, 58),
(57, 41, 59),
(58, 41, 60),
(59, 41, 61),
(62, 43, 64),
(63, 43, 65),
(64, 43, 66),
(65, 43, 67);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `fisrtname` varchar(32) NOT NULL,
  `lastname` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `Type` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `users`
--

INSERT INTO `users` (`ID`, `username`, `fisrtname`, `lastname`, `email`, `password`, `Type`) VALUES
(5, 'clau', 'Claudia', 'Dascalescu', 'claudia.dascalescu@gmail.com', '$2b$10$JjOCiFBOy3zsfl6A2RRTsOeoe4vWGnLs2FmhbP7vMZdKLtLIkQD6m', 2),
(6, 'alex', 'Alex', 'Setnic', 'alex@yahoo.com', '$2b$10$ZMh2KPBqPTWi1YIgCDawPuG9PJtsXGz5ja/kD3hHhQAQ6JAIC9qPS', 1),
(7, 'sara', 'Sara', 'Dascalescu', 'saruca@gmail.com', '$2b$10$T8azDHzPE2lEUpiSbLVoJOIqlN8syeKcXAroYLaJb.lKUwU8hVOuS', 1),
(8, 'bianca', 'Bianca', 'Stincescu', 'bianca@gmail.com', '$2b$10$Y/nLt7NKmgSlGygV99PV.u2MkDIYINScXIdOlWK/kWZUEtdeiFPMm', 1),
(9, 'cosmina', 'Cosmina', 'Mihoreanu', 'cosmina@gmail.com', '$2b$10$rtetc31Ed8I/tNWdELniy.24xZPxm1FDyEvqFfjyQmVfJj/n63tV2', 1),
(10, 'ilinca', 'Ilinca', 'Zamfir', 'ilinca@yahoo.com', '$2b$10$Gu/axtlZOeBg2yt5f7q/zOC1./h0l69nJk8SCI8O5cPwL1XbT.jgG', 1),
(11, 'amalia', 'Amalia', 'Culica', 'ama@gmail.com', '$2b$10$rOVNr/p.gGQ/mIwYgmvsJO6ip6hDElJpE1MTBUlVuJIQo3CXi.sou', 1);

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `bids`
--
ALTER TABLE `bids`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_user` (`ID_user`) USING BTREE,
  ADD KEY `ID_post` (`ID_post`) USING BTREE;

--
-- Indexuri pentru tabele `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_POST` (`ID_post`),
  ADD KEY `FK_USER` (`ID_user`);

--
-- Indexuri pentru tabele `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`ID`);

--
-- Indexuri pentru tabele `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `F_USER` (`ID_user`);

--
-- Indexuri pentru tabele `posts_images`
--
ALTER TABLE `posts_images`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `F_POST` (`ID_post`),
  ADD KEY `F_IMAGE` (`ID_image`);

--
-- Indexuri pentru tabele `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `bids`
--
ALTER TABLE `bids`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pentru tabele `favourites`
--
ALTER TABLE `favourites`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pentru tabele `images`
--
ALTER TABLE `images`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT pentru tabele `posts`
--
ALTER TABLE `posts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pentru tabele `posts_images`
--
ALTER TABLE `posts_images`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT pentru tabele `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `bids`
--
ALTER TABLE `bids`
  ADD CONSTRAINT `FK_POST_2` FOREIGN KEY (`ID_post`) REFERENCES `posts` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_USER_2` FOREIGN KEY (`ID_user`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constrângeri pentru tabele `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `FK_POST` FOREIGN KEY (`ID_post`) REFERENCES `posts` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_USER` FOREIGN KEY (`ID_user`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constrângeri pentru tabele `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `F_USER` FOREIGN KEY (`ID_user`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constrângeri pentru tabele `posts_images`
--
ALTER TABLE `posts_images`
  ADD CONSTRAINT `F_IMAGE` FOREIGN KEY (`ID_image`) REFERENCES `images` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `F_POST` FOREIGN KEY (`ID_post`) REFERENCES `posts` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
