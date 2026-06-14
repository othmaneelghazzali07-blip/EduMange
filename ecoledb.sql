-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : dim. 14 juin 2026 à 16:07
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecoledb`
--

-- --------------------------------------------------------

--
-- Structure de la table `absences`
--

CREATE TABLE `absences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `utilisateur_id` bigint(20) UNSIGNED NOT NULL,
  `date_absence` date NOT NULL,
  `statut` enum('present','absent','retard') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `admin_notifications`
--

CREATE TABLE `admin_notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payload`)),
  `utilisateur_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admin_notifications`
--

INSERT INTO `admin_notifications` (`id`, `type`, `title`, `message`, `payload`, `utilisateur_id`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'هام', 'Voluptatem natus qui.', 'Deserunt aliquam nihil exercitationem nobis modi autem. Quia repellendus itaque aperiam. Dolorum et ipsum magnam reiciendis. Dolor vitae aut molestiae omnis enim officiis ut laborum. Maiores ab natus enim autem quo voluptas modi.', '{\"link\":\"http:\\/\\/von.com\\/et-exercitationem-qui-facilis-repellat\"}', 14, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(2, 'هام', 'Voluptatem libero.', 'Vitae est impedit tenetur iure. Necessitatibus aut magni inventore consequatur et qui quisquam. Expedita in sit voluptate qui eum quisquam consequatur minus. Expedita inventore autem saepe.', '{\"link\":\"http:\\/\\/smitham.com\\/eum-a-in-dolor-non-consequatur-alias\"}', 11, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(3, 'إعلان', 'Ipsum voluptates sunt.', 'Est est nisi praesentium ducimus quo et. In aut sit vitae dolor libero autem et. Modi magni velit consectetur autem dolorum est. Dicta dolores eligendi rerum.', '{\"link\":\"http:\\/\\/schmidt.com\\/laudantium-amet-qui-nam-molestiae-suscipit-repellat-consequatur-culpa.html\"}', 6, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(4, 'تنبيه', 'Magni aspernatur excepturi dicta reprehenderit.', 'Ad consequatur molestias ducimus neque id eos vel. Ullam enim omnis facilis sequi ut velit veritatis. Minima dolorem itaque unde enim.', '{\"link\":\"http:\\/\\/mayer.com\\/quidem-molestias-nam-commodi-et-et-eius-nesciunt-repellat.html\"}', 26, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(5, 'هام', 'Velit aliquam autem.', 'Amet quibusdam vel aut eaque. Perferendis neque animi et quaerat. Autem et doloremque ullam ab voluptas maxime dolor.', '{\"link\":\"http:\\/\\/schiller.com\\/repudiandae-aut-saepe-omnis-laboriosam-quidem.html\"}', 13, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(6, 'هام', 'Est fugiat eaque.', 'Deserunt et odit vel sint eum ullam ipsa. Cum cum eum ipsum rerum. Iusto fugiat sed et necessitatibus. Harum sed et perspiciatis architecto dolorum ad.', '{\"link\":\"http:\\/\\/kilback.com\\/\"}', 13, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(7, 'تنبيه', 'Molestiae minima.', 'Dolorum assumenda corporis earum debitis necessitatibus et. Ea omnis rerum nisi expedita odio cumque hic. Amet totam eligendi aut corporis aperiam. Eos debitis et labore non et molestias.', '{\"link\":\"http:\\/\\/www.simonis.com\\/dicta-incidunt-accusantium-ut-sapiente-velit-ea-et.html\"}', 14, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(8, 'إعلان', 'Accusamus beatae eius.', 'Molestiae aliquid ipsum quis. Corrupti exercitationem vel inventore eum inventore. Illo perspiciatis accusantium sed necessitatibus ut.', '{\"link\":\"https:\\/\\/www.oconner.biz\\/eligendi-praesentium-delectus-odio-nisi-non-ut-commodi-consequatur\"}', 22, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(9, 'تنبيه', 'Eaque velit quae dolores accusamus.', 'Perferendis dolorum aut et veritatis autem id qui. Sunt corporis ipsam odit ut quam.', '{\"link\":\"http:\\/\\/www.rempel.com\\/autem-sapiente-et-vel-officiis-molestiae-accusantium\"}', 30, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(10, 'هام', 'Aut voluptates qui.', 'Id quaerat quaerat rerum. Quam praesentium quos sit est quaerat quidem. Voluptate rerum sit et optio deleniti porro. Dolores est corrupti debitis ratione nesciunt voluptatem numquam amet.', '{\"link\":\"http:\\/\\/padberg.com\\/aliquam-velit-laborum-repellat-tempore-ut-illo-in\"}', 26, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(11, 'إعلان', 'Ratione sit commodi.', 'Laboriosam provident ipsam quia. Eligendi qui nostrum nemo autem delectus qui. Perferendis ut sequi natus esse neque eum sit vel.', '{\"link\":\"http:\\/\\/www.waters.com\\/\"}', 14, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(12, 'إعلان', 'Reiciendis dolore minima culpa.', 'Soluta ratione sint ex corporis quidem consectetur. Suscipit id non porro explicabo. Velit voluptas asperiores architecto assumenda.', '{\"link\":\"http:\\/\\/www.klein.com\\/\"}', 17, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(13, 'تنبيه', 'Ut commodi.', 'Quasi quaerat saepe autem dolorem dolores voluptates. Aliquid mollitia ullam omnis dolorum quia. Sint dicta dolores deleniti.', '{\"link\":\"http:\\/\\/gorczany.com\\/\"}', 19, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(14, 'تنبيه', 'Aut expedita beatae.', 'Et dolor rerum explicabo. Eum molestias quisquam enim ullam quos accusamus consequuntur. Aperiam sequi cupiditate facere ex aut et numquam consequuntur. Quia voluptas rerum et dolor.', '{\"link\":\"http:\\/\\/www.powlowski.com\\/facere-voluptatum-repellat-voluptatum-quasi-alias-voluptas-sit\"}', 9, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(15, 'هام', 'Quaerat nihil laborum.', 'Eum provident et assumenda voluptas. Impedit enim libero culpa soluta quia voluptatibus voluptatum. Vitae tenetur omnis delectus est excepturi quo. Nulla impedit voluptatum totam hic debitis veniam molestiae.', '{\"link\":\"https:\\/\\/www.jacobson.info\\/qui-voluptatem-at-delectus-autem-voluptatibus\"}', 32, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(16, 'هام', 'Eum itaque at quia voluptatibus.', 'Inventore id fugiat molestias modi. Perferendis delectus rem voluptatem in nihil est. Voluptatem eveniet ut iste sint vel facilis quam.', '{\"link\":\"https:\\/\\/www.ziemann.info\\/error-deleniti-nemo-dolor-maxime-velit\"}', 15, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(17, 'تنبيه', 'Modi delectus a harum.', 'Blanditiis velit consequuntur aut ex quo delectus. Molestiae iste qui unde consequatur. Enim suscipit sed qui velit enim voluptatem sit. Porro eos nulla et blanditiis blanditiis ea voluptatum.', '{\"link\":\"http:\\/\\/prosacco.info\\/nemo-possimus-nihil-id-velit-aliquid-quae.html\"}', 26, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(18, 'إعلان', 'Enim et et.', 'Cupiditate nisi minima odit et. Vero voluptas soluta quod. Excepturi laborum qui qui at quaerat nam distinctio. Accusantium ut quod qui sequi et quae quos.', '{\"link\":\"https:\\/\\/www.weimann.com\\/cumque-sunt-eos-veniam-expedita\"}', 36, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(19, 'إعلان', 'Ipsam voluptatem eum amet.', 'Soluta mollitia rerum voluptatum dignissimos et minus. Consequatur debitis error dicta qui. Quod tempora accusantium delectus ea sit corrupti aut.', '{\"link\":\"https:\\/\\/kuvalis.net\\/qui-rerum-sit-necessitatibus-maxime.html\"}', 32, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15'),
(20, 'إعلان', 'Voluptatem quisquam amet sequi.', 'Quas ab sunt voluptatem omnis culpa. Magni saepe quo cum a atque adipisci. Aspernatur adipisci natus ut dolorem nesciunt.', '{\"link\":\"https:\\/\\/huels.com\\/autem-praesentium-impedit-ullam.html\"}', 19, 1, '2026-05-01 09:23:15', '2026-05-01 09:23:15');

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_classe` varchar(255) NOT NULL,
  `niveau` varchar(255) NOT NULL,
  `annee_scolaire` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`id`, `nom_classe`, `niveau`, `annee_scolaire`, `created_at`, `updated_at`) VALUES
(1, 'Class A', '1ère Année', '2025-2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(2, 'Class B', '2ème Année', '2025-2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(3, 'Class C', '3ème Année', '2025-2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58');

-- --------------------------------------------------------

--
-- Structure de la table `classe_matiere`
--

CREATE TABLE `classe_matiere` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `classe_id` bigint(20) UNSIGNED NOT NULL,
  `matiere_id` bigint(20) UNSIGNED NOT NULL,
  `enseignant_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `classe_matiere`
--

INSERT INTO `classe_matiere` (`id`, `classe_id`, `matiere_id`, `enseignant_id`) VALUES
(1, 1, 1, 53),
(2, 1, 2, 53),
(3, 1, 6, 43),
(4, 1, 7, 50),
(5, 2, 3, 43),
(6, 2, 4, 44),
(7, 2, 5, 53),
(8, 2, 13, 45),
(9, 3, 10, 47),
(10, 3, 11, 47),
(11, 3, 14, 53),
(12, 3, 15, 46),
(13, 3, 9, 45);

-- --------------------------------------------------------

--
-- Structure de la table `enseignants`
--

CREATE TABLE `enseignants` (
  `utilisateur_id` bigint(20) UNSIGNED NOT NULL,
  `specialite` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `enseignants`
--

INSERT INTO `enseignants` (`utilisateur_id`, `specialite`, `created_at`, `updated_at`) VALUES
(43, 'Software Engineering', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(44, 'Web Development', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(45, 'Data Science', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(46, 'UI/UX Design', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(47, 'Cyber Security', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(50, 'informatique', '2026-05-02 09:44:18', '2026-05-02 09:44:18'),
(53, 'informatique', '2026-05-05 20:30:50', '2026-05-05 20:30:50'),
(54, 'informatique', '2026-05-07 22:04:58', '2026-05-07 22:04:58');

-- --------------------------------------------------------

--
-- Structure de la table `enseignant_matiere`
--

CREATE TABLE `enseignant_matiere` (
  `utilisateur_id` bigint(20) UNSIGNED NOT NULL,
  `matiere_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `enseignant_matiere`
--

INSERT INTO `enseignant_matiere` (`utilisateur_id`, `matiere_id`) VALUES
(47, 10),
(47, 11),
(47, 12),
(43, 3),
(43, 6),
(43, 2),
(43, 1),
(44, 2),
(44, 4),
(44, 5),
(44, 7),
(46, 9),
(46, 14),
(46, 15),
(46, 12),
(46, 1),
(46, 6),
(45, 1),
(45, 7),
(45, 8),
(45, 13),
(45, 9),
(50, 5),
(50, 6),
(50, 7),
(50, 10),
(50, 13),
(54, 1),
(53, 1),
(53, 2),
(53, 5),
(53, 7),
(53, 14),
(53, 10);

-- --------------------------------------------------------

--
-- Structure de la table `etudiants`
--

CREATE TABLE `etudiants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `utilisateur_id` bigint(20) UNSIGNED NOT NULL,
  `classe_id` bigint(20) UNSIGNED NOT NULL,
  `CNE` varchar(255) NOT NULL,
  `date_naissance` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `etudiants`
--

INSERT INTO `etudiants` (`id`, `utilisateur_id`, `classe_id`, `CNE`, `date_naissance`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 'CNE299113', '2005-05-15', '2026-05-01 09:23:13', '2026-05-07 22:19:04'),
(2, 4, 1, 'CNE401718', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(3, 5, 1, 'CNE159344', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(4, 6, 1, 'CNE439090', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(5, 7, 2, 'CNE448817', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(6, 8, 3, 'CNE963833', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(7, 9, 3, 'CNE681192', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(8, 10, 2, 'CNE629280', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(9, 11, 3, 'CNE222331', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(10, 12, 3, 'CNE563660', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(11, 13, 2, 'CNE436502', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(12, 14, 2, 'CNE441071', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(13, 15, 1, 'CNE378890', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(14, 16, 1, 'CNE577332', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(15, 17, 1, 'CNE642205', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(16, 18, 2, 'CNE173215', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(17, 19, 2, 'CNE781577', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(18, 20, 2, 'CNE444371', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(19, 21, 2, 'CNE780026', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(20, 22, 3, 'CNE592249', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(21, 23, 1, 'CNE535072', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(22, 24, 3, 'CNE677484', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(23, 25, 2, 'CNE138809', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(24, 26, 2, 'CNE405460', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(25, 27, 3, 'CNE808481', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(26, 28, 3, 'CNE304299', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(27, 29, 3, 'CNE969222', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(28, 30, 3, 'CNE271743', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(29, 31, 2, 'CNE925731', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(30, 32, 3, 'CNE963551', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(31, 33, 1, 'CNE536178', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(32, 34, 2, 'CNE721949', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(33, 35, 3, 'CNE146848', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(34, 36, 3, 'CNE489013', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(35, 37, 1, 'CNE649245', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(36, 38, 3, 'CNE881381', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(37, 39, 3, 'CNE947025', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(38, 40, 2, 'CNE195415', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(39, 41, 1, 'CNE136393', '2005-05-15', '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(41, 55, 1, 'CD145685', '2005-05-08', '2026-05-07 22:23:10', '2026-05-07 22:23:10');

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_matiere` varchar(255) NOT NULL,
  `coefficient` int(11) NOT NULL DEFAULT 1,
  `niveau` varchar(255) NOT NULL,
  `annee_scolaire` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `matieres`
--

INSERT INTO `matieres` (`id`, `nom_matiere`, `coefficient`, `niveau`, `annee_scolaire`, `created_at`, `updated_at`) VALUES
(1, 'Algorithmique', 4, '1st Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(2, 'HTML/CSS', 3, '1st Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(3, 'PHP / Laravel', 5, '2nd Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(4, 'React JS', 5, '2nd Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(5, 'JavaScript', 4, '2nd Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(6, 'SQL Database', 4, '1st Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(7, 'Python', 4, '1st Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(8, 'Statistiques', 2, '1st Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(9, 'UI/UX Design', 3, '2nd Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(10, 'Networks', 4, '2nd Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(11, 'Security', 4, '2nd Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(12, 'Operating Systems', 3, '1st Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(13, 'Java', 4, '2nd Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(14, 'Mobile App', 4, '2nd Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(15, 'Cloud Computing', 3, '2nd Year', '2025/2026', '2026-05-01 09:22:58', '2026-05-01 09:22:58');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2026_04_23_163806_create_roles_table', 1),
(2, '2026_04_23_163851_create_utilisateurs_table', 1),
(3, '2026_04_23_163912_create_classes_table', 1),
(4, '2026_04_23_163938_create_enseignants_table', 1),
(5, '2026_04_23_164006_create_etudiants_table', 1),
(6, '2026_04_23_164409_create_matieres_table', 1),
(7, '2026_04_23_164450_create_rooms_table', 1),
(8, '2026_04_23_164458_create_seances_table', 1),
(9, '2026_04_23_164520_create_notes_table', 1),
(10, '2026_04_23_164544_create_absences_table', 1),
(11, '2026_04_23_173301_create_personal_access_tokens_table', 1),
(12, '2026_04_28_141000_create_presences_table', 1),
(13, '2026_04_28_141100_create_admin_notifications_table', 1),
(14, '2026_04_30_133837_create_enseignant_matiere_table', 1),
(15, '2026_05_01_112100_add_enseignant_id_to_notes_table', 1),
(16, '2026_05_01_172522_add_unique_to_notes_table', 2),
(17, '2026_05_02_121754_add_enseignant_id_to_classe_matiere_table', 3),
(18, '2026_05_02_122039_add_enseignant_id_to_classe_matiere_table', 4),
(19, '2026_05_04_141757_create_cache_table', 5);

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `etudiant_id` bigint(20) UNSIGNED NOT NULL,
  `matiere_id` bigint(20) UNSIGNED NOT NULL,
  `enseignant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type_examen` varchar(255) NOT NULL,
  `note` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `etudiant_id`, `matiere_id`, `enseignant_id`, `type_examen`, `note`, `created_at`, `updated_at`) VALUES
(27, 1, 10, 46, 'examen1', 14.00, '2026-05-01 17:23:28', '2026-05-01 17:23:28'),
(28, 1, 10, 46, 'examen2', 16.00, '2026-05-01 17:23:39', '2026-05-01 17:23:39'),
(29, 1, 10, 46, 'examen3', 17.00, '2026-05-01 17:23:54', '2026-05-01 17:23:54'),
(30, 6, 11, 46, 'examen1', 14.00, '2026-05-01 21:25:31', '2026-05-01 21:25:42'),
(31, 6, 11, 46, 'examen2', 12.00, '2026-05-01 21:26:12', '2026-05-01 21:26:12'),
(32, 6, 11, 46, 'examen3', 13.50, '2026-05-01 21:26:38', '2026-05-01 21:26:38'),
(544, 2, 1, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(545, 3, 1, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(546, 4, 1, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(547, 13, 1, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(548, 14, 1, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(549, 15, 1, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(550, 21, 1, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(551, 31, 1, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(552, 35, 1, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(553, 39, 1, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(555, 2, 1, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(556, 3, 1, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(557, 4, 1, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(558, 13, 1, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(559, 14, 1, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(560, 15, 1, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(561, 21, 1, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(562, 31, 1, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(563, 35, 1, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(564, 39, 1, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(565, 1, 1, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(566, 2, 1, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(567, 3, 1, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(568, 4, 1, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(569, 13, 1, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(570, 14, 1, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(571, 15, 1, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(572, 21, 1, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(573, 31, 1, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(574, 35, 1, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(575, 39, 1, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(576, 1, 2, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(577, 2, 2, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(578, 3, 2, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(579, 4, 2, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(580, 13, 2, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(581, 14, 2, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(582, 15, 2, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(583, 21, 2, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(584, 31, 2, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(585, 35, 2, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(586, 39, 2, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(587, 1, 2, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(588, 2, 2, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(589, 3, 2, 43, 'examen2', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(590, 4, 2, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(591, 13, 2, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(592, 14, 2, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(593, 15, 2, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(594, 21, 2, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(595, 31, 2, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(596, 35, 2, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(597, 39, 2, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(598, 1, 2, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(599, 2, 2, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(600, 3, 2, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(601, 4, 2, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(602, 13, 2, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(603, 14, 2, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(604, 15, 2, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(605, 21, 2, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(606, 31, 2, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(607, 35, 2, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(608, 39, 2, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(609, 1, 6, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(610, 2, 6, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(611, 3, 6, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(612, 4, 6, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(613, 13, 6, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(614, 14, 6, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(615, 15, 6, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(616, 21, 6, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(617, 31, 6, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(618, 35, 6, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(619, 39, 6, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(620, 1, 6, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(621, 2, 6, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(622, 3, 6, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(623, 4, 6, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(624, 13, 6, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(625, 14, 6, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(626, 15, 6, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(627, 21, 6, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(628, 31, 6, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(629, 35, 6, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(630, 39, 6, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(631, 1, 6, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(632, 2, 6, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(633, 3, 6, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(634, 4, 6, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(635, 13, 6, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(636, 14, 6, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(637, 15, 6, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(638, 21, 6, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(639, 31, 6, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(640, 35, 6, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(641, 39, 6, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(642, 1, 7, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(643, 2, 7, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(644, 3, 7, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(645, 4, 7, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(646, 13, 7, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(647, 14, 7, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(648, 15, 7, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(649, 21, 7, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(650, 31, 7, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(651, 35, 7, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(652, 39, 7, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(653, 1, 7, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(654, 2, 7, 43, 'examen2', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(655, 3, 7, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(656, 4, 7, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(657, 13, 7, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(658, 14, 7, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(659, 15, 7, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(660, 21, 7, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(661, 31, 7, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(662, 35, 7, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(663, 39, 7, 43, 'examen2', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(664, 1, 7, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(665, 2, 7, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(666, 3, 7, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(667, 4, 7, 43, 'examen3', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(668, 13, 7, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(669, 14, 7, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(670, 15, 7, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(671, 21, 7, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(672, 31, 7, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(673, 35, 7, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(674, 39, 7, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(675, 5, 3, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(676, 8, 3, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(677, 11, 3, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(678, 12, 3, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(679, 16, 3, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(680, 17, 3, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(681, 18, 3, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(682, 19, 3, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(683, 23, 3, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(684, 24, 3, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(685, 29, 3, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(686, 32, 3, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(687, 38, 3, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(688, 5, 3, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(689, 8, 3, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(690, 11, 3, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(691, 12, 3, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(692, 16, 3, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(693, 17, 3, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(694, 18, 3, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(695, 19, 3, 43, 'examen2', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(696, 23, 3, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(697, 24, 3, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(698, 29, 3, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(699, 32, 3, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(700, 38, 3, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(701, 5, 3, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(702, 8, 3, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(703, 11, 3, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(704, 12, 3, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(705, 16, 3, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(706, 17, 3, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(707, 18, 3, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(708, 19, 3, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(709, 23, 3, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(710, 24, 3, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(711, 29, 3, 43, 'examen3', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(712, 32, 3, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(713, 38, 3, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(714, 5, 4, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(715, 8, 4, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(716, 11, 4, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(717, 12, 4, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(718, 16, 4, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(719, 17, 4, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(720, 18, 4, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(721, 19, 4, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(722, 23, 4, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(723, 24, 4, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(724, 29, 4, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(725, 32, 4, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(726, 38, 4, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(727, 5, 4, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(728, 8, 4, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(729, 11, 4, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(730, 12, 4, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(731, 16, 4, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(732, 17, 4, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(733, 18, 4, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(734, 19, 4, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(735, 23, 4, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(736, 24, 4, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(737, 29, 4, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(738, 32, 4, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(739, 38, 4, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(740, 5, 4, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(741, 8, 4, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(742, 11, 4, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(743, 12, 4, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(744, 16, 4, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(745, 17, 4, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(746, 18, 4, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(747, 19, 4, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(748, 23, 4, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(749, 24, 4, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(750, 29, 4, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(751, 32, 4, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(752, 38, 4, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(753, 5, 5, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-06 10:06:59'),
(754, 8, 5, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(755, 11, 5, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(756, 12, 5, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(757, 16, 5, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(758, 17, 5, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(759, 18, 5, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(760, 19, 5, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(761, 23, 5, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(762, 24, 5, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(763, 29, 5, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(764, 32, 5, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(765, 38, 5, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(766, 5, 5, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(767, 8, 5, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(768, 11, 5, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(769, 12, 5, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(770, 16, 5, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(771, 17, 5, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(772, 18, 5, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(773, 19, 5, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(774, 23, 5, 43, 'examen2', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(775, 24, 5, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(776, 29, 5, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(777, 32, 5, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(778, 38, 5, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(779, 5, 5, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(780, 8, 5, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(781, 11, 5, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(782, 12, 5, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(783, 16, 5, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(784, 17, 5, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(785, 18, 5, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(786, 19, 5, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(787, 23, 5, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(788, 24, 5, 43, 'examen3', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(789, 29, 5, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(790, 32, 5, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(791, 38, 5, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(792, 5, 13, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(793, 8, 13, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(794, 11, 13, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(795, 12, 13, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(796, 16, 13, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(797, 17, 13, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(798, 18, 13, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(799, 19, 13, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(800, 23, 13, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(801, 24, 13, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(802, 29, 13, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(803, 32, 13, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(804, 38, 13, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(805, 5, 13, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(806, 8, 13, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(807, 11, 13, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(808, 12, 13, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(809, 16, 13, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(810, 17, 13, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(811, 18, 13, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(812, 19, 13, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(813, 23, 13, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(814, 24, 13, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(815, 29, 13, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(816, 32, 13, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(817, 38, 13, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(818, 5, 13, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(819, 8, 13, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(820, 11, 13, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(821, 12, 13, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(822, 16, 13, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(823, 17, 13, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(824, 18, 13, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(825, 19, 13, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(826, 23, 13, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(827, 24, 13, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(828, 29, 13, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(829, 32, 13, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(830, 38, 13, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(831, 6, 10, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(832, 7, 10, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(833, 9, 10, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(834, 10, 10, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(835, 20, 10, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(836, 22, 10, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(837, 25, 10, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(838, 26, 10, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(839, 27, 10, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(840, 28, 10, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(841, 30, 10, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(842, 33, 10, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(843, 34, 10, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(844, 36, 10, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(845, 37, 10, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(847, 6, 10, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(848, 7, 10, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(849, 9, 10, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(850, 10, 10, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(851, 20, 10, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(852, 22, 10, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(853, 25, 10, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(854, 26, 10, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(855, 27, 10, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(856, 28, 10, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(857, 30, 10, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(858, 33, 10, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(859, 34, 10, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(860, 36, 10, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(861, 37, 10, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(863, 6, 10, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(864, 7, 10, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(865, 9, 10, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(866, 10, 10, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(867, 20, 10, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(868, 22, 10, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(869, 25, 10, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(870, 26, 10, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(871, 27, 10, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(872, 28, 10, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(873, 30, 10, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(874, 33, 10, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(875, 34, 10, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(876, 36, 10, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(877, 37, 10, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(879, 7, 11, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(880, 9, 11, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(881, 10, 11, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(882, 20, 11, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(883, 22, 11, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(884, 25, 11, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(885, 26, 11, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(886, 27, 11, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(887, 28, 11, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(888, 30, 11, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(889, 33, 11, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(890, 34, 11, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(891, 36, 11, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(892, 37, 11, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(894, 7, 11, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(895, 9, 11, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(896, 10, 11, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(897, 20, 11, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(898, 22, 11, 43, 'examen2', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(899, 25, 11, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(900, 26, 11, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(901, 27, 11, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(902, 28, 11, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(903, 30, 11, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(904, 33, 11, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(905, 34, 11, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(906, 36, 11, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(907, 37, 11, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(909, 7, 11, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(910, 9, 11, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(911, 10, 11, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(912, 20, 11, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(913, 22, 11, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(914, 25, 11, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(915, 26, 11, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(916, 27, 11, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(917, 28, 11, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(918, 30, 11, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(919, 33, 11, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(920, 34, 11, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(921, 36, 11, 43, 'examen3', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(922, 37, 11, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(924, 6, 14, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(925, 7, 14, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(926, 9, 14, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(927, 10, 14, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(928, 20, 14, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(929, 22, 14, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(930, 25, 14, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(931, 26, 14, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(932, 27, 14, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(933, 28, 14, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(934, 30, 14, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(935, 33, 14, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(936, 34, 14, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(937, 36, 14, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(938, 37, 14, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(940, 6, 14, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(941, 7, 14, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(942, 9, 14, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(943, 10, 14, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(944, 20, 14, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(945, 22, 14, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(946, 25, 14, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(947, 26, 14, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(948, 27, 14, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(949, 28, 14, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(950, 30, 14, 43, 'examen2', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(951, 33, 14, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(952, 34, 14, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(953, 36, 14, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(954, 37, 14, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(956, 6, 14, 43, 'examen3', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(957, 7, 14, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(958, 9, 14, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(959, 10, 14, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(960, 20, 14, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(961, 22, 14, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(962, 25, 14, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(963, 26, 14, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(964, 27, 14, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(965, 28, 14, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(966, 30, 14, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(967, 33, 14, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(968, 34, 14, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(969, 36, 14, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(970, 37, 14, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(972, 6, 15, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(973, 7, 15, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(974, 9, 15, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(975, 10, 15, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(976, 20, 15, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(977, 22, 15, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(978, 25, 15, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(979, 26, 15, 43, 'examen1', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(980, 27, 15, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(981, 28, 15, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(982, 30, 15, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(983, 33, 15, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(984, 34, 15, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(985, 36, 15, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(986, 37, 15, 43, 'examen1', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(988, 6, 15, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(989, 7, 15, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(990, 9, 15, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(991, 10, 15, 43, 'examen2', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(992, 20, 15, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(993, 22, 15, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(994, 25, 15, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(995, 26, 15, 43, 'examen2', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(996, 27, 15, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(997, 28, 15, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(998, 30, 15, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(999, 33, 15, 43, 'examen2', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1000, 34, 15, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1001, 36, 15, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1002, 37, 15, 43, 'examen2', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1004, 6, 15, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1005, 7, 15, 43, 'examen3', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1006, 9, 15, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1007, 10, 15, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1008, 20, 15, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1009, 22, 15, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1010, 25, 15, 43, 'examen3', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1011, 26, 15, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1012, 27, 15, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1013, 28, 15, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1014, 30, 15, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1015, 33, 15, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1016, 34, 15, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1017, 36, 15, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1018, 37, 15, 43, 'examen3', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1020, 6, 9, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1021, 7, 9, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1022, 9, 9, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1023, 10, 9, 43, 'examen1', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1024, 20, 9, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1025, 22, 9, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1026, 25, 9, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1027, 26, 9, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1028, 27, 9, 43, 'examen1', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1029, 28, 9, 43, 'examen1', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1030, 30, 9, 43, 'examen1', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1031, 33, 9, 43, 'examen1', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1032, 34, 9, 43, 'examen1', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1033, 36, 9, 43, 'examen1', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1034, 37, 9, 43, 'examen1', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1036, 6, 9, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1037, 7, 9, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1038, 9, 9, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1039, 10, 9, 43, 'examen2', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1040, 20, 9, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1041, 22, 9, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1042, 25, 9, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1043, 26, 9, 43, 'examen2', 10.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1044, 27, 9, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1045, 28, 9, 43, 'examen2', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1046, 30, 9, 43, 'examen2', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1047, 33, 9, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1048, 34, 9, 43, 'examen2', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1049, 36, 9, 43, 'examen2', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1050, 37, 9, 43, 'examen2', 15.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1052, 6, 9, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1053, 7, 9, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1054, 9, 9, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1055, 10, 9, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1056, 20, 9, 43, 'examen3', 19.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1057, 22, 9, 43, 'examen3', 13.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1058, 25, 9, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1059, 26, 9, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1060, 27, 9, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1061, 28, 9, 43, 'examen3', 12.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1062, 30, 9, 43, 'examen3', 17.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1063, 33, 9, 43, 'examen3', 11.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1064, 34, 9, 43, 'examen3', 14.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1065, 36, 9, 43, 'examen3', 18.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1066, 37, 9, 43, 'examen3', 16.00, '2026-05-02 13:09:20', '2026-05-02 13:09:20'),
(1069, 1, 1, 43, 'examen2', 16.15, '2026-05-04 11:55:39', '2026-05-04 13:24:59'),
(1070, 1, 1, 43, 'examen1', 15.00, '2026-05-04 17:34:17', '2026-05-07 22:20:45'),
(1072, 41, 1, 54, 'examen2', 18.00, '2026-05-07 22:24:31', '2026-05-07 22:25:22'),
(1073, 41, 1, 54, 'examen3', 15.00, '2026-05-07 22:24:43', '2026-05-07 22:24:43'),
(1074, 41, 1, 54, 'examen1', 13.00, '2026-05-07 22:26:03', '2026-05-07 22:26:03');

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\Utilisateur', 46, 'auth_token', 'c677d174ecab2aec036350aa646afc81b5aba4b957561bab1d492e2cd79bf43a', '[\"*\"]', '2026-05-01 18:14:33', NULL, '2026-05-01 09:24:49', '2026-05-01 18:14:33'),
(2, 'App\\Models\\Utilisateur', 46, 'auth_token', '512b439eb2d51f7716013d337ad3176283da7dde157913139addb3ad5f4f62d1', '[\"*\"]', NULL, NULL, '2026-05-01 09:44:19', '2026-05-01 09:44:19'),
(3, 'App\\Models\\Utilisateur', 46, 'auth_token', '6c05e38b98427b60de3a0ab060c876453924ba65e21c46688bcb164edbe8ac3c', '[\"*\"]', '2026-05-01 17:50:25', NULL, '2026-05-01 10:20:16', '2026-05-01 17:50:25'),
(4, 'App\\Models\\Utilisateur', 4, 'auth_token', '18e11998cdab91c3405544007faa49882af2fd2a530b8ea6ef012071cef44f96', '[\"*\"]', '2026-05-01 19:25:13', NULL, '2026-05-01 17:55:55', '2026-05-01 19:25:13'),
(5, 'App\\Models\\Utilisateur', 4, 'auth_token', '02e80086ab86932b5412e5737b393470e0eb17393ea5d74cef5697ded1142075', '[\"*\"]', NULL, NULL, '2026-05-01 18:07:44', '2026-05-01 18:07:44'),
(6, 'App\\Models\\Utilisateur', 4, 'auth_token', '56db08223b7dd92020d2437b1d4bf3a40f4681cc4768ab12bc38f431efcc0f9b', '[\"*\"]', '2026-05-01 20:19:19', NULL, '2026-05-01 18:15:44', '2026-05-01 20:19:19'),
(7, 'App\\Models\\Utilisateur', 10, 'auth_token', 'b284978dbe35009e050ba8dabb32b48801a910172f99096f9929554aab6b4ff6', '[\"*\"]', '2026-05-01 21:22:52', NULL, '2026-05-01 19:28:33', '2026-05-01 21:22:52'),
(8, 'App\\Models\\Utilisateur', 46, 'auth_token', '7c789806d7319a1ef049ff4268cbc2294c80660188ae4bed8cb245c28cfa6a55', '[\"*\"]', '2026-05-01 22:56:21', NULL, '2026-05-01 21:23:50', '2026-05-01 22:56:21'),
(9, 'App\\Models\\Utilisateur', 1, 'auth_token', '998ab7e2f6dbc8cc5587bf660631a9731f76fd86930887ed558d8f2603a459b0', '[\"*\"]', '2026-05-02 11:09:52', NULL, '2026-05-01 22:56:56', '2026-05-02 11:09:52'),
(10, 'App\\Models\\Utilisateur', 1, 'auth_token', '8e6e21acb51dc2c06899693680334389d96f28749bf7a7281db5e8a7f39189d5', '[\"*\"]', '2026-05-02 09:59:20', NULL, '2026-05-02 08:45:27', '2026-05-02 09:59:20'),
(11, 'App\\Models\\Utilisateur', 43, 'auth_token', 'ea59b04f040db70f0509db94ea0964a6986e9447550ce1a470feaae6a017af6a', '[\"*\"]', '2026-05-02 11:18:41', NULL, '2026-05-02 11:10:18', '2026-05-02 11:18:41'),
(12, 'App\\Models\\Utilisateur', 43, 'auth_token', '764112ae3322ce669f99ec94f7511f0190b577072be68204053fa300a35a647d', '[\"*\"]', NULL, NULL, '2026-05-02 11:12:54', '2026-05-02 11:12:54'),
(13, 'App\\Models\\Utilisateur', 1, 'auth_token', 'd8480bd76be6b2391d9b55951e915f53d5dd4630df82bc65887f0a5642f118d7', '[\"*\"]', '2026-05-02 11:19:58', NULL, '2026-05-02 11:19:14', '2026-05-02 11:19:58'),
(14, 'App\\Models\\Utilisateur', 43, 'auth_token', '4cb3004b5f4856ca54568781f2428a205eac20882d4235dcf121ffaeaa97d357', '[\"*\"]', '2026-05-02 11:27:45', NULL, '2026-05-02 11:24:22', '2026-05-02 11:27:45'),
(15, 'App\\Models\\Utilisateur', 1, 'auth_token', 'aa10e9a53339204433772f79f55b42f0840adf806fdf12fbaeb308a9aca0704c', '[\"*\"]', '2026-05-02 11:28:56', NULL, '2026-05-02 11:28:35', '2026-05-02 11:28:56'),
(16, 'App\\Models\\Utilisateur', 3, 'auth_token', 'e36cc6ece60d00d3e340f0fc40fa024cdb974c8b637b3f1b9a7fe7599ede496e', '[\"*\"]', '2026-05-02 11:45:35', NULL, '2026-05-02 11:33:24', '2026-05-02 11:45:35'),
(17, 'App\\Models\\Utilisateur', 3, 'auth_token', '6d2608b8e0dac93d16070e593112f87396d5737384060bf6a682bbc846158221', '[\"*\"]', '2026-05-02 11:53:10', NULL, '2026-05-02 11:46:45', '2026-05-02 11:53:10'),
(18, 'App\\Models\\Utilisateur', 43, 'auth_token', 'd72752587ea4efbfcc44694b7b72e93093d0faf476066f32f336aa94100c2159', '[\"*\"]', '2026-05-02 12:12:35', NULL, '2026-05-02 12:02:30', '2026-05-02 12:12:35'),
(19, 'App\\Models\\Utilisateur', 3, 'auth_token', '52ac6a10f169dcd26e415df19bfd02449b734e8f85badfeafb226dea8ed42af3', '[\"*\"]', '2026-05-02 12:13:07', NULL, '2026-05-02 12:13:07', '2026-05-02 12:13:07'),
(20, 'App\\Models\\Utilisateur', 1, 'auth_token', '3414e06536025bc4aebdce084a0ab8ae0d47eac5121be10c7532f6925c5031e1', '[\"*\"]', '2026-05-02 12:15:17', NULL, '2026-05-02 12:13:32', '2026-05-02 12:15:17'),
(21, 'App\\Models\\Utilisateur', 3, 'auth_token', '7559523e6b3a75e884f0c2010464c2a604b8d67993367e7d88417c082a7b8b35', '[\"*\"]', '2026-05-02 12:23:57', NULL, '2026-05-02 12:15:59', '2026-05-02 12:23:57'),
(22, 'App\\Models\\Utilisateur', 43, 'auth_token', '292669ef8eb09c1c023720b019066e0d953bda299d4f39c9b01624275b3d7972', '[\"*\"]', '2026-05-02 12:27:56', NULL, '2026-05-02 12:27:41', '2026-05-02 12:27:56'),
(23, 'App\\Models\\Utilisateur', 3, 'auth_token', 'a1215754f008110722b8f289604a532b09ee9bebfede8fc028177aefe57d7809', '[\"*\"]', '2026-05-02 12:46:25', NULL, '2026-05-02 12:29:42', '2026-05-02 12:46:25'),
(24, 'App\\Models\\Utilisateur', 3, 'auth_token', 'b83e04f277928d5c94d4ff8ed336b26bbe784a679b684c732fedbfc9c34e6e32', '[\"*\"]', '2026-05-02 12:43:16', NULL, '2026-05-02 12:33:17', '2026-05-02 12:43:16'),
(25, 'App\\Models\\Utilisateur', 1, 'auth_token', '8a421ce447bb7db81fc167101cfa83e7d1550dc0427ddd09a7e23719bf9fe4fe', '[\"*\"]', '2026-05-02 14:04:16', NULL, '2026-05-02 13:00:51', '2026-05-02 14:04:16'),
(26, 'App\\Models\\Utilisateur', 43, 'auth_token', 'b4b427103f3b99d8cb3afb39b55415f050c6232cdae7d527babb3c1fd576c6f9', '[\"*\"]', '2026-05-02 14:26:57', NULL, '2026-05-02 14:07:46', '2026-05-02 14:26:57'),
(27, 'App\\Models\\Utilisateur', 1, 'auth_token', 'b88fee2a29cd3874d8286b1d3d95ef20ced941aa9606d5033bf1beaf89f65957', '[\"*\"]', '2026-05-02 14:59:20', NULL, '2026-05-02 14:27:17', '2026-05-02 14:59:20'),
(28, 'App\\Models\\Utilisateur', 1, 'auth_token', '2277e6cef1ba67dd867214ef195ece60272c9bfda9abfb2675c2247c5f0fc7b4', '[\"*\"]', '2026-05-02 15:15:38', NULL, '2026-05-02 15:13:41', '2026-05-02 15:15:38'),
(29, 'App\\Models\\Utilisateur', 3, 'auth_token', '47a2911caf5b45a3cad86a4c09defe296b84522b5230bd808dcc02c5c440161d', '[\"*\"]', '2026-05-02 15:17:48', NULL, '2026-05-02 15:17:36', '2026-05-02 15:17:48'),
(30, 'App\\Models\\Utilisateur', 3, 'auth_token', 'a89e98dfbea96c51aba4ccea928e51933e6e28435ff8260e791afad79e77099e', '[\"*\"]', '2026-05-02 15:23:02', NULL, '2026-05-02 15:22:24', '2026-05-02 15:23:02'),
(31, 'App\\Models\\Utilisateur', 43, 'auth_token', '775abc29dfe0e180b81dc8f9d247b949f6a6d0391d7e02821b3b15a63e3cdaa0', '[\"*\"]', '2026-05-04 11:57:30', NULL, '2026-05-02 15:23:33', '2026-05-04 11:57:30'),
(32, 'App\\Models\\Utilisateur', 1, 'auth_token', 'd794135986567a2196d2916131a12bc570ad89656ec924036fc02f13c808656c', '[\"*\"]', '2026-05-04 13:19:58', NULL, '2026-05-04 11:58:18', '2026-05-04 13:19:58'),
(33, 'App\\Models\\Utilisateur', 43, 'auth_token', 'a8ca0c4a8adc2017ca6a5f16142582fad71cf726f14c394b3adabe8c5f87a0eb', '[\"*\"]', '2026-05-04 13:25:42', NULL, '2026-05-04 13:24:13', '2026-05-04 13:25:42'),
(34, 'App\\Models\\Utilisateur', 3, 'auth_token', 'd6d506b4b9c6ced5d016658851173d6b75f4e29b88a3aa728b7f280593868bc3', '[\"*\"]', '2026-05-04 13:33:24', NULL, '2026-05-04 13:27:04', '2026-05-04 13:33:24'),
(35, 'App\\Models\\Utilisateur', 43, 'auth_token', 'd3f60cc8e5f9b3d2ee87a1561238fee1492191bc4f39b103de7c76b43512d064', '[\"*\"]', '2026-05-04 13:34:10', NULL, '2026-05-04 13:34:05', '2026-05-04 13:34:10'),
(36, 'App\\Models\\Utilisateur', 43, 'auth_token', 'be9e6a8bc2dc4867862fa193fbe080e73b44d70c138dda3057e4ec7393173097', '[\"*\"]', '2026-05-04 13:48:01', NULL, '2026-05-04 13:34:59', '2026-05-04 13:48:01'),
(37, 'App\\Models\\Utilisateur', 1, 'auth_token', '2c4008ce3014cc48ab0671f1a79b8d48d24f3788248c9990435670429a5932c0', '[\"*\"]', '2026-05-04 13:48:37', NULL, '2026-05-04 13:48:25', '2026-05-04 13:48:37'),
(38, 'App\\Models\\Utilisateur', 43, 'auth_token', 'e1aa47f1d3af7e60c2e851b498486e71ff9c698758e87e4a7d3e5fb1beb5a6c5', '[\"*\"]', '2026-05-04 13:57:25', NULL, '2026-05-04 13:49:29', '2026-05-04 13:57:25'),
(39, 'App\\Models\\Utilisateur', 1, 'auth_token', '2f7b9f982aaa529796416db60a20f704fbe1ad4be67ef283f33bddc3595b2002', '[\"*\"]', '2026-05-04 14:04:14', NULL, '2026-05-04 14:04:03', '2026-05-04 14:04:14'),
(40, 'App\\Models\\Utilisateur', 43, 'auth_token', 'e34a28b02a7e07a1254b18ce3982e89c36ac43cbec2606ad1bf7caf5e02cae69', '[\"*\"]', '2026-05-04 14:05:32', NULL, '2026-05-04 14:05:31', '2026-05-04 14:05:32'),
(41, 'App\\Models\\Utilisateur', 1, 'auth_token', '1fe778381a2f2076ae22bf21f814755563edf07a107ac66b5704a63d4ff21771', '[\"*\"]', '2026-05-05 20:17:22', NULL, '2026-05-04 14:05:52', '2026-05-05 20:17:22'),
(42, 'App\\Models\\Utilisateur', 43, 'auth_token', 'd5201687d820ec786478603d536bb221ec95cfbaa775cbda417dad21942485bb', '[\"*\"]', '2026-05-05 20:32:35', NULL, '2026-05-04 14:07:58', '2026-05-05 20:32:35'),
(43, 'App\\Models\\Utilisateur', 3, 'auth_token', 'dd1a4fff738780c3e6c88044672ea4f9e5fbe52c47e4a97c99148857a6ddb419', '[\"*\"]', '2026-05-07 22:20:58', NULL, '2026-05-04 14:25:47', '2026-05-07 22:20:58'),
(44, 'App\\Models\\Utilisateur', 1, 'auth_token', '9eeada253356b27edabec20645be9bc956705e6be35c79b9ec9e39edc2cf1ef2', '[\"*\"]', '2026-05-07 22:23:47', NULL, '2026-05-05 20:17:50', '2026-05-07 22:23:47'),
(45, 'App\\Models\\Utilisateur', 53, 'auth_token', '592d301b3a693a0ee60be8061b6acf5939a5292f9ac721602a30e501e098c96e', '[\"*\"]', '2026-05-05 22:08:09', NULL, '2026-05-05 20:33:58', '2026-05-05 22:08:09'),
(46, 'App\\Models\\Utilisateur', 53, 'auth_token', 'c69f4f6a4474d88633ab2c3a5025b9dec7f52f0aff9805191cd456fbd43cfc0f', '[\"*\"]', '2026-05-06 08:53:03', NULL, '2026-05-06 07:06:46', '2026-05-06 08:53:03'),
(47, 'App\\Models\\Utilisateur', 53, 'auth_token', '6822622584ef83f490dcc4b7e1de1501030fd8e9fbc88244be897662c9bcf7aa', '[\"*\"]', '2026-05-06 09:32:10', NULL, '2026-05-06 08:53:26', '2026-05-06 09:32:10'),
(48, 'App\\Models\\Utilisateur', 53, 'auth_token', '5f5c0b92bfd56c51aeea5a80dc856d92126628be0ee42692552090789ae5367e', '[\"*\"]', '2026-05-07 22:07:58', NULL, '2026-05-06 09:32:47', '2026-05-07 22:07:58'),
(49, 'App\\Models\\Utilisateur', 54, 'auth_token', 'bbad2767ee2e712f921d6cdc0b6461a4f05b896cfdc2037e25eed43b829466ce', '[\"*\"]', '2026-05-07 22:26:03', NULL, '2026-05-07 22:08:19', '2026-05-07 22:26:03'),
(50, 'App\\Models\\Utilisateur', 55, 'auth_token', '9673567b89985fac7de9b0656c243c6f11599770cb23c0f716edc143f48ed3ff', '[\"*\"]', '2026-05-07 22:26:56', NULL, '2026-05-07 22:26:56', '2026-05-07 22:26:56'),
(51, 'App\\Models\\Utilisateur', 1, 'auth_token', 'fad9ee13aa0fdb17ae36aa6ba7abf0eb52aecd39cdd22ee403080744741640eb', '[\"*\"]', '2026-05-16 10:00:41', NULL, '2026-05-13 11:29:34', '2026-05-16 10:00:41'),
(52, 'App\\Models\\Utilisateur', 53, 'auth_token', '29ed59629cb44d2e3267b0e6e601b32efb3a56c0a91edfaa96026e4bfd80e4c4', '[\"*\"]', '2026-05-22 13:01:35', NULL, '2026-05-16 09:59:42', '2026-05-22 13:01:35'),
(53, 'App\\Models\\Utilisateur', 1, 'auth_token', '78c9e8d69902601e0536dc42e6fb53cb87bbf4686c2a8e0b3a462358823b0ca9', '[\"*\"]', '2026-05-22 15:45:52', NULL, '2026-05-19 10:38:09', '2026-05-22 15:45:52'),
(54, 'App\\Models\\Utilisateur', 1, 'auth_token', 'ccba66032f22eaed9a55f3ed84b498f779967436a2db81f546aba49450717b3f', '[\"*\"]', NULL, NULL, '2026-05-19 11:17:16', '2026-05-19 11:17:16'),
(55, 'App\\Models\\Utilisateur', 1, 'auth_token', '1d12c67b25c4f2ce29a78a1f4328b39b1c82287cd53bc8c4d5d77a2a58b89726', '[\"*\"]', '2026-05-20 06:59:02', NULL, '2026-05-19 11:28:27', '2026-05-20 06:59:02'),
(56, 'App\\Models\\Utilisateur', 3, 'auth_token', 'be6f3a96e1d85ff7b3ef612675c49239cd347c456f8e7532a3b493e8dc1d5b96', '[\"*\"]', '2026-05-22 15:46:05', NULL, '2026-05-22 12:59:19', '2026-05-22 15:46:05'),
(57, 'App\\Models\\Utilisateur', 1, 'auth_token', '428d9668f1028c84aa758f3b8c9fd0af5bf1b4a8e5760738713fbdee92a533b1', '[\"*\"]', '2026-06-08 09:57:19', NULL, '2026-06-08 07:08:02', '2026-06-08 09:57:19'),
(58, 'App\\Models\\Utilisateur', 3, 'auth_token', 'cd32d9a6d98673f9fd02837476c0714bd5e96371984791c7cbc01f74bb4f8b5e', '[\"*\"]', '2026-06-08 09:59:49', NULL, '2026-06-08 09:59:48', '2026-06-08 09:59:49'),
(59, 'App\\Models\\Utilisateur', 53, 'auth_token', '29dda7475b8ee9f20ac0f0e3d45b11c55ea16abfa1732e9aa7d2ad0ee33b57c6', '[\"*\"]', '2026-06-08 10:06:30', NULL, '2026-06-08 10:00:22', '2026-06-08 10:06:30'),
(60, 'App\\Models\\Utilisateur', 1, 'auth_token', 'e9de4416512e927e44a9a53f516c00bbc424dda899c6f98a13c7342b02c95b2a', '[\"*\"]', '2026-06-08 10:01:31', NULL, '2026-06-08 10:01:24', '2026-06-08 10:01:31'),
(61, 'App\\Models\\Utilisateur', 1, 'auth_token', '33d5edba85e24b95779b9b029351dc4ef4deb2110338e424ced5170515ef7a87', '[\"*\"]', '2026-06-08 10:03:50', NULL, '2026-06-08 10:02:55', '2026-06-08 10:03:50'),
(62, 'App\\Models\\Utilisateur', 53, 'auth_token', '1167f60e50b26e56d4d886d3b299f6da1976ccdd9d95f2d945bd35ab8face185', '[\"*\"]', '2026-06-08 10:07:12', NULL, '2026-06-08 10:04:24', '2026-06-08 10:07:12'),
(63, 'App\\Models\\Utilisateur', 3, 'auth_token', '66048e10eec1f28d5d62492871cb6434dd9ea8f79ea7e44e7b27bf00b849ed92', '[\"*\"]', '2026-06-08 10:07:53', NULL, '2026-06-08 10:05:45', '2026-06-08 10:07:53'),
(64, 'App\\Models\\Utilisateur', 1, 'auth_token', '2087fa85021b93112aba0268cfa191eb46cda107b9297076fbde1afc300c2065', '[\"*\"]', '2026-06-08 10:07:00', NULL, '2026-06-08 10:06:47', '2026-06-08 10:07:00'),
(65, 'App\\Models\\Utilisateur', 1, 'auth_token', '5bd582401dcfdf9be7db038a4472f273c365423ff6933206287a334de0ae7f45', '[\"*\"]', '2026-06-08 10:52:41', NULL, '2026-06-08 10:48:37', '2026-06-08 10:52:41'),
(66, 'App\\Models\\Utilisateur', 1, 'auth_token', 'f78be10c458fab9738551092f87688621d0519ac9ad9ef90da8fecbf59a8df94', '[\"*\"]', '2026-06-08 15:36:45', NULL, '2026-06-08 11:13:42', '2026-06-08 15:36:45'),
(67, 'App\\Models\\Utilisateur', 1, 'auth_token', 'bd62b6f4aa7607dc617eecbd053a7390317a649d1f65ee010d003fdc147c316b', '[\"*\"]', '2026-06-12 08:56:23', NULL, '2026-06-12 08:48:22', '2026-06-12 08:56:23'),
(68, 'App\\Models\\Utilisateur', 1, 'auth_token', 'd436f5a8ddc23d4ee546d5c89f1f6c0bb91b0d5b67678221782656f58baec270', '[\"*\"]', '2026-06-12 09:24:53', NULL, '2026-06-12 08:48:42', '2026-06-12 09:24:53'),
(69, 'App\\Models\\Utilisateur', 1, 'auth_token', '8523633569be42b1a165cecca78b5579f0259291cbe1e2e2fd25e3cd611bba32', '[\"*\"]', '2026-06-14 11:53:56', NULL, '2026-06-14 11:53:45', '2026-06-14 11:53:56'),
(70, 'App\\Models\\Utilisateur', 43, 'auth_token', 'a5ce8813b998977e75222ab17ef5a454dd9492cf5389a9425c7ec3f8693a3bd7', '[\"*\"]', '2026-06-14 11:55:42', NULL, '2026-06-14 11:55:30', '2026-06-14 11:55:42');

-- --------------------------------------------------------

--
-- Structure de la table `presences`
--

CREATE TABLE `presences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `seance_id` bigint(20) UNSIGNED NOT NULL,
  `utilisateur_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('present','absent','late') NOT NULL,
  `observation` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `presences`
--

INSERT INTO `presences` (`id`, `seance_id`, `utilisateur_id`, `status`, `observation`, `created_at`, `updated_at`) VALUES
(78, 22, 1, 'absent', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(79, 22, 2, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(80, 22, 3, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(81, 22, 4, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(82, 22, 13, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(83, 22, 14, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(84, 22, 15, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(85, 22, 21, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(86, 22, 31, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(87, 22, 35, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(88, 22, 39, 'present', NULL, '2026-05-02 12:27:56', '2026-05-02 12:27:56'),
(89, 30, 1, 'present', NULL, '2026-05-02 15:24:08', '2026-05-02 15:24:08'),
(90, 30, 2, 'present', NULL, '2026-05-02 15:24:08', '2026-05-04 11:57:15'),
(91, 30, 3, 'present', NULL, '2026-05-02 15:24:08', '2026-05-02 15:24:08'),
(92, 30, 4, 'present', NULL, '2026-05-02 15:24:08', '2026-05-02 15:24:08'),
(93, 30, 13, 'present', NULL, '2026-05-02 15:24:08', '2026-05-02 15:24:08'),
(94, 30, 14, 'late', NULL, '2026-05-02 15:24:08', '2026-05-05 20:36:39'),
(95, 30, 15, 'present', NULL, '2026-05-02 15:24:08', '2026-05-02 15:24:08'),
(96, 30, 21, 'present', NULL, '2026-05-02 15:24:08', '2026-05-02 15:24:08'),
(97, 30, 31, 'present', NULL, '2026-05-02 15:24:08', '2026-05-02 15:24:08'),
(98, 30, 35, 'present', NULL, '2026-05-02 15:24:08', '2026-05-02 15:24:08'),
(99, 30, 39, 'present', NULL, '2026-05-02 15:24:08', '2026-05-02 15:24:08'),
(111, 61, 1, 'late', NULL, '2026-05-04 17:41:05', '2026-05-05 09:55:28'),
(112, 61, 2, 'absent', NULL, '2026-05-04 17:41:05', '2026-05-04 17:48:56'),
(113, 61, 3, 'present', NULL, '2026-05-04 17:41:05', '2026-05-04 17:41:05'),
(114, 61, 4, 'present', NULL, '2026-05-04 17:41:05', '2026-05-04 17:41:05'),
(115, 61, 13, 'present', NULL, '2026-05-04 17:41:05', '2026-05-04 17:41:05'),
(116, 61, 14, 'present', NULL, '2026-05-04 17:41:05', '2026-05-04 17:41:05'),
(117, 61, 15, 'present', NULL, '2026-05-04 17:41:05', '2026-05-04 17:41:05'),
(118, 61, 21, 'present', NULL, '2026-05-04 17:41:05', '2026-05-04 17:41:05'),
(119, 61, 31, 'present', NULL, '2026-05-04 17:41:05', '2026-05-04 17:41:05'),
(120, 61, 35, 'present', NULL, '2026-05-04 17:41:05', '2026-05-04 17:41:05'),
(121, 61, 39, 'present', NULL, '2026-05-04 17:41:05', '2026-05-04 17:41:05'),
(122, 62, 1, 'absent', NULL, '2026-05-07 22:11:35', '2026-05-07 22:11:35'),
(123, 62, 2, 'late', NULL, '2026-05-07 22:11:35', '2026-05-07 22:11:35'),
(124, 62, 3, 'present', NULL, '2026-05-07 22:11:35', '2026-05-07 22:11:35'),
(125, 62, 4, 'present', NULL, '2026-05-07 22:11:36', '2026-05-07 22:11:36'),
(126, 62, 13, 'present', NULL, '2026-05-07 22:11:36', '2026-05-07 22:11:36'),
(127, 62, 14, 'present', NULL, '2026-05-07 22:11:36', '2026-05-07 22:11:36'),
(128, 62, 15, 'present', NULL, '2026-05-07 22:11:36', '2026-05-07 22:11:36'),
(129, 62, 21, 'present', NULL, '2026-05-07 22:11:36', '2026-05-07 22:11:36'),
(130, 62, 31, 'present', NULL, '2026-05-07 22:11:36', '2026-05-07 22:11:36'),
(131, 62, 35, 'present', NULL, '2026-05-07 22:11:36', '2026-05-07 22:11:36'),
(132, 62, 39, 'present', NULL, '2026-05-07 22:11:36', '2026-05-07 22:11:36'),
(133, 66, 1, 'present', NULL, '2026-06-08 10:04:57', '2026-06-08 10:04:57'),
(134, 66, 2, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(135, 66, 3, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(136, 66, 4, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(137, 66, 13, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(138, 66, 14, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(139, 66, 15, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(140, 66, 21, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(141, 66, 31, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(142, 66, 35, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(143, 66, 39, 'absent', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58'),
(144, 66, 41, 'present', NULL, '2026-06-08 10:04:58', '2026-06-08 10:04:58');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_role` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `nom_role`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2026-05-01 09:22:57', '2026-05-01 09:22:57'),
(2, 'enseignant', '2026-05-01 09:22:57', '2026-05-01 09:22:57'),
(3, 'etudiant', '2026-05-01 09:22:57', '2026-05-01 09:22:57');

-- --------------------------------------------------------

--
-- Structure de la table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `salle` varchar(50) NOT NULL,
  `capacity` smallint(5) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `rooms`
--

INSERT INTO `rooms` (`id`, `salle`, `capacity`, `created_at`, `updated_at`) VALUES
(1, 's1', 24, '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(2, 's2', 30, '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(3, 's3', 24, '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(4, 'info1', 30, '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(5, 'info2', 24, '2026-05-01 09:22:58', '2026-05-01 09:22:58'),
(6, 'info3', 24, '2026-05-01 09:22:58', '2026-05-01 09:22:58');

-- --------------------------------------------------------

--
-- Structure de la table `seances`
--

CREATE TABLE `seances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `classe_id` bigint(20) UNSIGNED NOT NULL,
  `utilisateur_id` bigint(20) UNSIGNED NOT NULL,
  `matiere_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `seances`
--

INSERT INTO `seances` (`id`, `classe_id`, `utilisateur_id`, `matiere_id`, `room_id`, `date`, `heure_debut`, `heure_fin`, `created_at`, `updated_at`) VALUES
(2, 2, 45, 3, 4, '2026-04-27', '10:30:00', '12:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(5, 2, 47, 1, 4, '2026-04-28', '08:30:00', '10:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(6, 2, 44, 1, 2, '2026-04-28', '10:30:00', '12:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(7, 3, 44, 1, 5, '2026-04-28', '14:30:00', '16:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(8, 3, 46, 3, 5, '2026-04-28', '16:30:00', '18:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(9, 3, 43, 3, 6, '2026-04-29', '08:30:00', '10:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(10, 3, 44, 13, 4, '2026-04-29', '10:30:00', '12:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(12, 3, 45, 7, 2, '2026-04-29', '16:30:00', '18:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(13, 3, 44, 3, 6, '2026-04-30', '08:30:00', '10:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(14, 3, 44, 12, 1, '2026-04-30', '10:30:00', '12:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(15, 3, 46, 11, 4, '2026-04-30', '14:30:00', '16:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(16, 3, 44, 5, 1, '2026-04-30', '16:30:00', '18:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(17, 3, 46, 7, 2, '2026-05-01', '08:30:00', '10:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(18, 2, 47, 3, 6, '2026-05-01', '10:30:00', '12:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(19, 2, 46, 11, 2, '2026-05-01', '14:30:00', '16:30:00', '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(21, 3, 47, 11, 1, '2026-05-02', '08:30:00', '10:30:00', '2026-05-01 22:58:49', '2026-05-01 22:58:49'),
(22, 1, 43, 1, 1, '2026-04-27', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(23, 1, 44, 2, 2, '2026-04-27', '10:30:00', '12:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(24, 1, 45, 7, 3, '2026-04-28', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(25, 1, 46, 6, 1, '2026-04-28', '10:30:00', '12:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(26, 1, 43, 1, 2, '2026-04-29', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(27, 1, 44, 2, 3, '2026-04-30', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(28, 1, 50, 7, 2, '2026-05-04', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-04 17:19:26'),
(29, 1, 50, 7, 2, '2026-05-04', '10:30:00', '12:30:00', '2026-05-02 12:54:04', '2026-05-04 17:19:26'),
(30, 1, 45, 1, 3, '2026-05-05', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-05 20:31:57'),
(31, 1, 53, 1, 1, '2026-05-06', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-06 09:44:04'),
(32, 1, 50, 7, 2, '2026-05-07', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-04 17:19:26'),
(33, 1, 43, 6, 3, '2026-05-08', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-04 15:54:42'),
(34, 2, 44, 4, 4, '2026-04-27', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(35, 2, 45, 8, 5, '2026-04-27', '10:30:00', '12:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(36, 2, 46, 9, 6, '2026-04-28', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(37, 2, 47, 10, 4, '2026-04-28', '10:30:00', '12:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(38, 2, 44, 5, 5, '2026-04-29', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(39, 2, 45, 13, 6, '2026-04-30', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(40, 2, 45, 13, 4, '2026-05-04', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-04 17:39:43'),
(41, 2, 47, 10, 5, '2026-05-05', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(42, 2, 44, 4, 6, '2026-05-06', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-06 10:03:02'),
(43, 2, 45, 8, 4, '2026-05-07', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(44, 2, 53, 5, 5, '2026-05-08', '08:30:00', '10:30:00', '2026-05-02 12:54:04', '2026-05-06 10:06:38'),
(45, 3, 43, 3, 1, '2026-04-27', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(46, 3, 44, 13, 2, '2026-04-27', '16:30:00', '18:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(47, 3, 45, 7, 3, '2026-04-28', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(48, 3, 46, 11, 1, '2026-04-29', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(49, 3, 47, 12, 2, '2026-04-29', '16:30:00', '18:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(50, 3, 43, 3, 3, '2026-04-30', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(51, 3, 45, 9, 1, '2026-05-04', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-04 17:40:03'),
(52, 3, 45, 7, 2, '2026-05-05', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(53, 3, 46, 11, 3, '2026-05-06', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(54, 3, 47, 12, 1, '2026-05-07', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(55, 3, 43, 3, 2, '2026-05-08', '14:30:00', '16:30:00', '2026-05-02 12:54:04', '2026-05-02 12:54:04'),
(59, 3, 47, 11, 5, '2026-05-04', '08:30:00', '10:30:00', '2026-05-04 16:29:29', '2026-05-04 16:29:29'),
(60, 3, 46, 14, 5, '2026-05-04', '10:30:00', '12:30:00', '2026-05-04 16:52:40', '2026-05-04 16:52:40'),
(61, 1, 43, 2, 3, '2026-05-05', '14:30:00', '16:30:00', '2026-05-04 17:27:55', '2026-05-04 17:27:55'),
(62, 1, 54, 1, 1, '2026-05-08', '10:30:00', '12:30:00', '2026-05-07 22:07:38', '2026-05-07 22:10:25'),
(63, 1, 53, 2, 1, '2026-05-20', '08:30:00', '10:30:00', '2026-05-19 11:40:09', '2026-05-20 07:44:10'),
(64, 1, 53, 1, 2, '2026-05-22', '08:30:00', '18:30:00', '2026-05-22 13:00:17', '2026-05-22 13:01:28'),
(65, 2, 44, 4, 1, '2026-06-08', '08:30:00', '10:30:00', '2026-06-08 07:13:24', '2026-06-08 07:13:24'),
(66, 1, 53, 1, 2, '2026-06-08', '08:30:00', '10:30:00', '2026-06-08 10:03:49', '2026-06-08 10:03:49');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'AlaeEddin ', ' Lazrek', 'admin@epg.ma', '$2y$12$pJBfBCQxj5tb7dacvFuGH.6/4dPGmaVdaPisneKCZ0MSOrRymV2ou', 1, '2026-05-01 09:22:57', '2026-05-01 09:22:57'),
(3, 'hassan', 'wardi', 'hasan.wardi@epg.ma', '$2y$12$GMvzWM3/hO/lbpBZq.2JPOy/GjpQ3W3G80dcgbZlPs9rUM62I2WOO', 3, '2026-05-01 09:23:13', '2026-05-02 15:15:37'),
(4, 'najib', 'waldi', 'najib.waldi@example.com', '$2y$12$4zjLCV5izOnccn/bkSisROUHF6nICEWjGOytq.JSDj8LIsPfJ5SNy', 3, '2026-05-01 09:23:13', '2026-05-04 13:02:49'),
(5, 'Fabiola Durgan', 'Mrs. Eliane Kunde DDS', 'mikel.berge@example.net', '$2y$12$cgToGJbZFi/SDSFZoLl7wOGuy8.8ie9gGFq0FbUC9oa3INLVYlLEe', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(6, 'Alex Ebert I', 'Gianni Bartell', 'emonahan@example.com', '$2y$12$6C.ghmby8hjZNNCNGcWR4e8ElPrWfttp83AN86eLf9XonQqpTFwLq', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(7, 'Maxime Bernhard', 'Ivory Schultz', 'iterry@example.net', '$2y$12$75qlD/EPi/ML1fl0SPlI5uWeccKUkxlpOT5WHn9VSpAl8aHTgq6Pe', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(8, 'Opal Kautzer IV', 'Gisselle Torphy', 'beverly91@example.net', '$2y$12$QhiTiRwX2OPFjp7H4HQSR.IQ0TDT8CYvu8ClMEk0FRe7y3xi2UZY6', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(9, 'Lenore Dietrich', 'Dr. Gust Mueller DVM', 'bosco.chanelle@example.net', '$2y$12$b9NdAk.elaHQiZqI1TUMmuNKjCFLyc/Fq4FoM2SjhE1/HPWpelM1.', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(10, 'Dora Hegmann MD', 'Ada Anderson', 'yokeefe@example.net', '$2y$12$BmmPj9jAADz9Trh8yBZDSeeF/sfoeoJzwdUfAVH3yz2/CxtVUq18.', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(11, 'Bettye Lubowitz', 'Christophe Hackett', 'wledner@example.org', '$2y$12$S.EP7AclBbmG83Nas9t0DOVzP/lXk2z6206RlyOvhbANb8aAOg/sW', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(12, 'Larry Bahringer PhD', 'Mrs. May Gislason IV', 'bcassin@example.net', '$2y$12$PYwrZjgcdIqhXZ9II9kYmu.VfLTdmhcErDkMRyaSHOUlqgn1ZgtxO', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(13, 'Adam Conn', 'Arturo Schroeder', 'flossie.dubuque@example.net', '$2y$12$G6sQv7GP41/UHefjSWvWHujhBgZtpJxeLTxuOsJMUiKXUJ730BlpS', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(14, 'Brianne Satterfield', 'Dr. Hettie Waters', 'shuel@example.com', '$2y$12$sOqFzW4oJ0cz6W0um7mL4eK2xnOgH9GNXa9ThcZBpQgQty6aJ52yq', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(15, 'Aleen Wyman', 'Kylee Kuphal', 'rutherford.wallace@example.com', '$2y$12$B/Oi0OJnVH61AiqUmUPRvevWt5q/PgZ8MymJbzztH/kB51n7uCrES', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(16, 'Mikayla Schaefer', 'Jonas Oberbrunner', 'white.jennings@example.com', '$2y$12$F3clJE3D1WMgZFT15JUJdeIi2sBJR4Er4p3YQwh4ehFjlFm1iCuQG', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(17, 'Mrs. Shany Botsford', 'Salvatore Dietrich', 'johns.enos@example.org', '$2y$12$iZuRczYcklilMsg3bR62E.FeWW4ESgrGHo0Ocyg89RS7juf/XUckm', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(18, 'Nakia Ondricka', 'Bette Deckow', 'mwiza@example.org', '$2y$12$RDfYh.kYbICxXDKWjORuauHEy2plNcys.sBbs3C1NwC6gWaolPzEG', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(19, 'Dr. Summer Leannon', 'Camille Schowalter DVM', 'lia93@example.net', '$2y$12$bkrHGGfForR0deLs2Byuu.0z5/Zwv9/yzezonShRvqu5Ubq.vvSA6', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(20, 'Dandre Heller', 'Ollie Shields DDS', 'rbeier@example.net', '$2y$12$1Xe0CAxgV7/MRGlliF5h6epMDz9ITqiOlGLi7A5ybq0GQ/OwxRWFK', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(21, 'Agustin Willms', 'Ms. Felicia Gleichner', 'kurt73@example.com', '$2y$12$DTDh306fUL89WsmiKZ4Z2uU7sDtTbisda7DpG8iO5zzFT6CEhWY4e', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(22, 'Luz Ziemann', 'Frederick Stracke', 'fpurdy@example.net', '$2y$12$i7c/nIzKs.5T9OVUrrwZv.DuVbsAhyxOzdrNAs92hk0cEaJYioJ1u', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(23, 'Ocie Thiel', 'Landen Bergstrom', 'cummerata.roman@example.com', '$2y$12$WU9Z9E2Y1MeeFnoRtm9lEOj5JoHqUuIUbmpFsZacUhhR23aCbEy.G', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(24, 'Dr. Dorian Feeney', 'Ezekiel Mayert', 'ghickle@example.net', '$2y$12$qdq2hqw68vlj6xevRqWms.LaWmRCKbKyITFR5Y8lvBhnTbIQRi56u', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(25, 'Valentina Kertzmann', 'Aida Gutkowski', 'jstoltenberg@example.org', '$2y$12$2drm9ZPNnkOeCtD6y3.U0ezPKmoGhRTyH/cfiMqJB6GRTLyGfcd42', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(26, 'Hiram Lockman', 'Prof. Josh Olson Jr.', 'vmccullough@example.com', '$2y$12$SUb6JbjbxDCkY8FhrcGJ0.fnx2/Y4RcepxEYRAab3rRo3KylBLKNS', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(27, 'Hassie Hammes', 'Meaghan Greenfelder III', 'aracely75@example.org', '$2y$12$.n6VbTT4rTU9xJ.izLoOSOv/odN4s0Siv58jWjjgwQg6FcqfmGNg6', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(28, 'Mr. Casper Kling I', 'Skyla Nitzsche', 'kiera90@example.org', '$2y$12$BEkD5V95ZVrJvvMRy7hzI.fz8tdUu9zTy.IiaiwarkpM3XUrFn63G', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(29, 'Keegan Price', 'Miss Ludie Klocko IV', 'anastasia.breitenberg@example.net', '$2y$12$IxsheVkAIJnQFb13KSjVweMbrf9syrqM3/RY/rWkJP5HOQdqb2u3C', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(30, 'Mr. Faustino Hamill', 'Prof. Fatima Dickinson', 'nlowe@example.net', '$2y$12$vAiPShtJEl/iFRUceWnyEePQ0.svQ2aKy8dZWVfzU7KYuk.lNpgO2', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(31, 'Mrs. Alexandrea Waelchi I', 'Adrian Mann', 'mabelle.purdy@example.org', '$2y$12$FVgLLxVDl8lRYoetUArXceAw1wcgDTl6APhQFUHms8O8zgS3gbJbm', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(32, 'Justyn Huel', 'Dr. Noemy Padberg', 'zita.gutmann@example.com', '$2y$12$OBhYN9.UL8q2KDGiP49gpONQxJB3JewsLp7A.ur.pshTbtktgI4Ey', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(33, 'Katrina Block IV', 'Mrs. Alysson Thompson Jr.', 'marc.ernser@example.net', '$2y$12$6v81sUzX70g5PdISrmeJXO/T5oE/qVgIVfyMvy9eerOqXoqcuHZiu', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(34, 'Dr. Conrad Thiel PhD', 'Kelli Block', 'mckenzie.kennedy@example.org', '$2y$12$1xtKU0OnjDmCxi9zy44YGOIwrb/nEv8BaIP2tB.VjFXYEBgBqmF4.', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(35, 'Haylie Baumbach', 'Mr. Rodrigo Leannon IV', 'akling@example.com', '$2y$12$TsWSHIXI5nLQ5y4YSri/.ucYTFQYgiWCbVKIN4/z0X0UZm4gckDki', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(36, 'Kallie Davis', 'Itzel Hansen', 'izaiah.kovacek@example.com', '$2y$12$VaXRQBKrJdAObU8LFiErzu6D6Ka7cH2an0ytHMm8lWEAYWAUBUtOu', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(37, 'Elisabeth Kirlin DDS', 'Devon O\'Hara', 'alberto76@example.net', '$2y$12$DJm3UnUh1TTMUDBHTG2MRu2RP/PIHMJAtNHYFjOzI319oWn79J0su', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(38, 'Mr. Johnpaul Prohaska Jr.', 'Prof. Karolann Green DVM', 'rhudson@example.net', '$2y$12$Gz84.KdUaIkFX.oVWCvsYeC2zbUQDMfVmWgg/8zcZecHm2Q5A4C0i', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(39, 'Thurman Zulauf', 'Mrs. Lenora West II', 'uharber@example.com', '$2y$12$FeGjOLMdDgMIiO3HDUKb2eHItujeNUWBi8ivf9TIOPlv7PxJtyRZ.', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(40, 'Robb Fisher', 'Anais Jacobson III', 'grace.heathcote@example.org', '$2y$12$bPpMuaZQfnzomiuUfocoFO5zoyQJgcd0NH2/WPE8ruvWC.6Tk7qk.', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(41, 'Modesta Hauck', 'Ms. Hallie Parisian Sr.', 'leila.dach@example.com', '$2y$12$57GW8w0NioCebYF4I5EJGeozrD1RfH1CiK7OGQwtT60A0rwO7IO32', 3, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(43, 'El Amrani', 'Yassine', 'yassine.prof@epg.ma', '$2y$12$CkkeI9wM8N7v7XUYFB.TLOJUEMtJnNwJn2RSztRpTRXXRpkr.NDgu', 2, '2026-05-01 09:23:13', '2026-05-04 15:38:30'),
(44, 'Bennani', 'Laila', 'laila.prof@example.com', '$2y$12$gNQpxpnvGGb2t78wVjEjbOsOmWM0fH6vVY92mrjLjG.ZxeeInBCa.', 2, '2026-05-01 09:23:13', '2026-05-01 09:23:13'),
(45, 'Mansouri', 'Karim', 'karim.prof@example.com', '$2y$12$AGB1NS/F.Ll3oOJyQUb2Outud8nuw07a9dnpW7XzMkopjFpDilmi6', 2, '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(46, 'Tazi', 'Sanaa', 'sanaa.prof@example.com', '$2y$12$K1hN5VxelA5B43baOxcy9OHjPtvTG9NoefJWnzBVAXDB9LUiX4yGW', 2, '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(47, 'Zahiri', 'Omar', 'omar.prof@example.com', '$2y$12$em185bu22uVnUHOTBUcNn.K9QVm8XZN/vgFmLIBJWpVD4tBhoNDku', 2, '2026-05-01 09:23:14', '2026-05-01 09:23:14'),
(50, 'Naji', 'Khalid', 'khalid.naji@epg.com', '$2y$12$jS9f7YhFBZmsAFcJh8hijuX0tubA6utst.G..ZI3SYhGTjOau0lt2', 2, '2026-05-02 09:44:18', '2026-05-04 17:16:59'),
(53, 'said', 'kartaf', 'said.kartaf@epg.com', '$2y$12$dmVJ0UPiSZhp2cnRTcQdY.PSpX3vs1GaRdypcjYa2ruqCn.lEw47O', 2, '2026-05-05 20:30:50', '2026-05-19 11:41:47'),
(54, 'lghazali', 'mohammed', 'mo@epg.ma', '$2y$12$UmY8VSAN1h1Bwkh1cCSF3e3oxQ8EViC/xJXcrKLAtTJAAbb0mC3ym', 2, '2026-05-07 22:04:58', '2026-05-07 22:04:58'),
(55, 'jamal', 'yaekoubi', 'yakoubi@epg.ma', '$2y$12$w9Fr.jo0zc433cwICL2bQuT5NyGlhOwScCtYM6G6MAU2ETKbJgSfS', 3, '2026-05-07 22:23:10', '2026-05-07 22:23:10');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `absences`
--
ALTER TABLE `absences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `absences_utilisateur_id_foreign` (`utilisateur_id`);

--
-- Index pour la table `admin_notifications`
--
ALTER TABLE `admin_notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_notifications_utilisateur_id_foreign` (`utilisateur_id`),
  ADD KEY `admin_notifications_created_by_foreign` (`created_by`);

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `classe_matiere`
--
ALTER TABLE `classe_matiere`
  ADD PRIMARY KEY (`id`),
  ADD KEY `classe_matiere_classe_id_foreign` (`classe_id`),
  ADD KEY `classe_matiere_matiere_id_foreign` (`matiere_id`);

--
-- Index pour la table `enseignants`
--
ALTER TABLE `enseignants`
  ADD PRIMARY KEY (`utilisateur_id`);

--
-- Index pour la table `enseignant_matiere`
--
ALTER TABLE `enseignant_matiere`
  ADD KEY `enseignant_matiere_utilisateur_id_foreign` (`utilisateur_id`),
  ADD KEY `enseignant_matiere_matiere_id_foreign` (`matiere_id`);

--
-- Index pour la table `etudiants`
--
ALTER TABLE `etudiants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `etudiants_cne_unique` (`CNE`),
  ADD KEY `etudiants_utilisateur_id_foreign` (`utilisateur_id`),
  ADD KEY `etudiants_classe_id_foreign` (`classe_id`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notes_etudiant_id_foreign` (`etudiant_id`),
  ADD KEY `notes_matiere_id_foreign` (`matiere_id`),
  ADD KEY `notes_enseignant_id_foreign` (`enseignant_id`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Index pour la table `presences`
--
ALTER TABLE `presences`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_presence_seance_student` (`seance_id`,`utilisateur_id`),
  ADD KEY `idx_presences_etudiant_created_at` (`utilisateur_id`,`created_at`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_nom_role_unique` (`nom_role`);

--
-- Index pour la table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rooms_salle_unique` (`salle`);

--
-- Index pour la table `seances`
--
ALTER TABLE `seances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seances_classe_id_foreign` (`classe_id`),
  ADD KEY `seances_utilisateur_id_foreign` (`utilisateur_id`),
  ADD KEY `seances_matiere_id_foreign` (`matiere_id`),
  ADD KEY `seances_room_id_foreign` (`room_id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `utilisateurs_email_unique` (`email`),
  ADD KEY `utilisateurs_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `absences`
--
ALTER TABLE `absences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `admin_notifications`
--
ALTER TABLE `admin_notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `classe_matiere`
--
ALTER TABLE `classe_matiere`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `etudiants`
--
ALTER TABLE `etudiants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1075;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT pour la table `presences`
--
ALTER TABLE `presences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `seances`
--
ALTER TABLE `seances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `absences`
--
ALTER TABLE `absences`
  ADD CONSTRAINT `absences_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `etudiants` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `admin_notifications`
--
ALTER TABLE `admin_notifications`
  ADD CONSTRAINT `admin_notifications_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `admin_notifications_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `etudiants` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `classe_matiere`
--
ALTER TABLE `classe_matiere`
  ADD CONSTRAINT `classe_matiere_classe_id_foreign` FOREIGN KEY (`classe_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `classe_matiere_matiere_id_foreign` FOREIGN KEY (`matiere_id`) REFERENCES `matieres` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `enseignants`
--
ALTER TABLE `enseignants`
  ADD CONSTRAINT `enseignants_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `enseignant_matiere`
--
ALTER TABLE `enseignant_matiere`
  ADD CONSTRAINT `enseignant_matiere_matiere_id_foreign` FOREIGN KEY (`matiere_id`) REFERENCES `matieres` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enseignant_matiere_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `enseignants` (`utilisateur_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `etudiants`
--
ALTER TABLE `etudiants`
  ADD CONSTRAINT `etudiants_classe_id_foreign` FOREIGN KEY (`classe_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `etudiants_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_enseignant_id_foreign` FOREIGN KEY (`enseignant_id`) REFERENCES `enseignants` (`utilisateur_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notes_etudiant_id_foreign` FOREIGN KEY (`etudiant_id`) REFERENCES `etudiants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notes_matiere_id_foreign` FOREIGN KEY (`matiere_id`) REFERENCES `matieres` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `presences`
--
ALTER TABLE `presences`
  ADD CONSTRAINT `presences_seance_id_foreign` FOREIGN KEY (`seance_id`) REFERENCES `seances` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `presences_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `etudiants` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `seances`
--
ALTER TABLE `seances`
  ADD CONSTRAINT `seances_classe_id_foreign` FOREIGN KEY (`classe_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `seances_matiere_id_foreign` FOREIGN KEY (`matiere_id`) REFERENCES `matieres` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `seances_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `seances_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `enseignants` (`utilisateur_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
