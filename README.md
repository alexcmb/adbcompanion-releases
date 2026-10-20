<div align="center">

<img src="docs/logo.svg" width="96" height="96" alt="">

# ADB Companion

**Gestion et contrôle des appareils Android via ADB.**

Une interface graphique complète pour Android Debug Bridge : administration des applications,<br>
transfert de fichiers, shell interactif, journaux système, supervision des performances,<br>
recopie d'écran et connexion sans fil, sans saisie de commandes.

[**Site et téléchargements**](https://alexcmb.github.io/adbcompanion-releases/) ·
[Toutes les versions](https://github.com/alexcmb/adbcompanion-releases/releases) ·
[Questions fréquentes](#questions-fréquentes) ·
[English](README.en.md)

Windows · macOS · Linux — interface en français et en anglais

<img src="docs/screens/dashboard.webp" alt="Tableau de bord d'ADB Companion" width="900">

<sub>Captures réalisées avec des appareils de démonstration fictifs.</sub>

[Fonctionnalités](#fonctionnalités) · [Installation](#installation) · [Mise en service](#mise-en-service) · [Aperçu](#aperçu) · [Mises à jour](#mises-à-jour) · [Questions fréquentes](#questions-fréquentes)

## Fonctionnalités

| Module | Fonctions |
|:---:|:---:|
| **Tableau de bord** | État de l'appareil : batterie (niveau, santé, température, courant), stockage, mémoire, affichage, version d'Android, niveau de correctif de sécurité, processeur, état du bootloader et statut root. Captures d'écran, redémarrage en mode système, recovery, bootloader, fastbootd ou EDL. |
| **Applications** | Inventaire des paquets avec icônes, tailles et filtres (utilisateur, système, désactivées, désinstallées). Installation d'APK, d'APKS et de XAPK (avec données OBB) par glisser-déposer. Lancement, arrêt forcé, désactivation, nettoyage du cache ou des données, désinstallation, restauration d'une application système. Actions par lots, gestion des permissions. |
| **Fichiers** | Explorateur à double volet poste ↔ appareil reposant sur le protocole de synchronisation d'ADB. Transferts suivis et annulables, gestion des conflits (remplacer, ignorer, conserver les deux), aperçu, glisser-déposer depuis l'explorateur du système, mode root. |
| **Terminal** | Shell ADB interactif (couleurs, complétion, redimensionnement dynamique) multi-onglets, session root, macros intégrées et personnalisables. |
| **Logcat** | Journaux système en temps réel, filtrage par niveau, tag (avec exclusions), application ou expression régulière, pause effective de la collecte, purge, export. |
| **Moniteur** | Supervision en temps réel sur 1 à 30 minutes : charge CPU par cœur, mémoire, températures, batterie. Gestionnaire de processus : tri, recherche, arrêt, libération de la mémoire. |
| **Miroir d'écran** | Recopie et contrôle de l'appareil via [scrcpy](https://github.com/Genymobile/scrcpy), déployé et configuré automatiquement : résolution, débit, codec, extinction de l'écran, enregistrement. Profil optimisé pour le Wi-Fi, repli automatique en cas d'échec de l'encodeur vidéo. |
| **Sans fil** | Appairage par QR code ou par code, découverte mDNS, connexion par adresse, bascule USB → Wi-Fi en un clic, reconnexion automatique, indicateur de connexion instable. Regroupement des connexions USB et Wi-Fi d'un même appareil. |
| **Réglages rapides** | Échelle des animations, résolution et densité d'affichage, maintien de l'écran allumé, affichage des touches, DNS privé, thème sombre, assombrissement forcé, avec restauration des valeurs d'origine. |
| **Intégration** | Palette de commandes <kbd>Ctrl</kbd>+<kbd>K</kbd>, icône dans la zone de notification, notifications de connexion, déploiement automatique d'ADB, thèmes clair et sombre, mises à jour signées. |

## Installation

Téléchargez le paquet correspondant à votre système depuis le [site](https://alexcmb.github.io/adbcompanion-releases/#telecharger) ou la [page des versions](https://github.com/alexcmb/adbcompanion-releases/releases).

| Système | Fichier | Remarque |
|:---:|:---:|:---:|
| Windows 10 / 11 (64 bits) | `ADB.Companion_<version>_x64-setup.exe` | Recommandé. Installation portable : toutes les données dans le dossier de l'application. |
| | `ADB.Companion_<version>_x64_fr-FR.msi` | Déploiement sur un parc de postes. |
| macOS 11+ Apple Silicon | `ADB.Companion_<version>_aarch64.dmg` | Mac M1 et ultérieurs. |
| macOS 11+ Intel | `ADB.Companion_<version>_x64.dmg` | |
| Linux x86_64 | `ADB.Companion_<version>_amd64.AppImage` | Toutes distributions. |
| | `.deb` / `.rpm` | Debian, Ubuntu… / Fedora, openSUSE… |

> **Important :** L'application n'est pas encore signée par un certificat de signature de code.<br>
> **Windows** : SmartScreen affiche « Windows a protégé votre ordinateur » → *Informations complémentaires* → *Exécuter quand même*.<br>
> **macOS** : clic droit sur l'application → *Ouvrir*, puis confirmer.<br>
> Les mises à jour sont en revanche signées, et leur signature est vérifiée avant installation.

Aucun autre prérequis : ADB Companion utilise une installation d'ADB existante (Android SDK, `PATH`…)<br>
ou propose de télécharger les Platform-Tools officiels de Google.

## Mise en service

**1.** Sur l'appareil Android : **Paramètres → À propos du téléphone**, appuyez sept fois sur **Numéro de build** pour activer les *Options pour les développeurs*.<br>
**2.** Dans les *Options pour les développeurs*, activez le **Débogage USB** (et le **Débogage sans fil** pour une connexion Wi-Fi).<br>
**3.** Connectez l'appareil et autorisez l'empreinte de la clé RSA de l'ordinateur : l'appareil est détecté automatiquement.

Connexion Wi-Fi : bouton **Passer en Wi-Fi** sur le tableau de bord d'un appareil connecté en USB,<br>
ou **Connexion sans fil → QR code**, à scanner depuis *Débogage sans fil → Associer l'appareil avec un code QR* (Android 11 et versions ultérieures).

## Aperçu

### Gestion des applications

Installation par glisser-déposer, actions unitaires ou par lots.

<img src="docs/screens/apps.webp" alt="Gestion des applications" width="900">

### Transfert de fichiers

Double volet poste ↔ appareil, transferts suivis.

<img src="docs/screens/files.webp" alt="Explorateur de fichiers avec un transfert en cours" width="900">

### Shell ADB

Sessions en onglets, macros intégrées et personnalisables.

<img src="docs/screens/terminal.webp" alt="Shell ADB et macros" width="900">

### Logcat

Journaux système en temps réel, filtrables à la volée.

<img src="docs/screens/logcat.webp" alt="Logcat en temps réel" width="900">

### Supervision des performances

Processeur, mémoire, températures et batterie en temps réel.

<img src="docs/screens/monitor.webp" alt="Supervision des performances" width="900">

### ADB sans fil

Appairage par QR code, sans saisie d'adresse IP ni de port.

<img src="docs/screens/wireless-qr.webp" alt="Appairage sans fil par QR code" width="900">

### Recopie d'écran

Recopie et contrôle de l'appareil via scrcpy.

<img src="docs/screens/mirror.webp" alt="Paramètres de la recopie d'écran" width="900">

### Réglages rapides

Paramètres système avancés, avec restauration des valeurs d'origine.

<img src="docs/screens/tweaks.webp" alt="Réglages rapides" width="900">

### Palette de commandes et thème clair

<img src="docs/screens/palette.webp" alt="Palette de commandes" width="440"> <img src="docs/screens/dashboard-light.webp" alt="Tableau de bord en thème clair" width="440">

## Mises à jour

ADB Companion recherche les nouvelles versions au démarrage. Aucune mise à jour n'est installée sans votre accord,<br>
et la signature de chaque paquet est vérifiée avant installation.<br>
L'option **Versions expérimentales** (**Réglages → Mises à jour**) permet de recevoir également les pré-versions publiées à des fins de test.

## Questions fréquentes

<details>
<summary><b>Un accès root est-il nécessaire ?</b></summary>

Non. L'accès root n'est exploité que pour certaines fonctions avancées (accès à l'ensemble du système de fichiers,<br>
session root du terminal, nettoyage du cache d'une application), lorsque le gestionnaire root l'accorde au shell.
</details>

<details>
<summary><b>Où les données sont-elles stockées ? Des informations sont-elles transmises ?</b></summary>

Sous Windows, l'installation est portable : paramètres, journaux et outils téléchargés sont stockés dans le dossier `data` de l'application ;<br>
l'installeur propose de le supprimer lors de la désinstallation.<br>
Aucune donnée n'est transmise : l'application ne se connecte à Internet que pour vérifier les mises à jour et, à votre demande, télécharger ADB ou scrcpy.
</details>

<details>
<summary><b>Linux : l'appareil n'est pas détecté en USB</b></summary>

Installez les règles udev de votre distribution (`android-udev-rules` ou `android-sdk-platform-tools-common` selon les cas),<br>
ajoutez l'utilisateur au groupe correspondant (`plugdev` ou `adbusers`), puis reconnectez l'appareil.
</details>

<details>
<summary><b>L'appareil apparaît comme « non autorisé »</b></summary>

Déverrouillez l'appareil et acceptez la demande « Autoriser le débogage USB ? ».<br>
Si elle n'apparaît pas, révoquez les autorisations de débogage USB dans les *Options pour les développeurs*, puis reconnectez l'appareil.
</details>

<details>
<summary><b>La recopie d'écran reste noire sur un téléviseur</b></summary>

Certains encodeurs vidéo de téléviseurs ne prennent pas en charge les hautes résolutions.<br>
ADB Companion relance automatiquement la recopie avec une résolution inférieure ou un autre encodeur, et conserve le réglage fonctionnel pour cet appareil.
</details>

---

<sub>Ce dépôt héberge les versions publiées d'ADB Companion et son site. Recopie d'écran assurée par <a href="https://github.com/Genymobile/scrcpy">scrcpy</a>.</sub>

</div>
