# Freelancer forecast

Outil de prévisionnel pour l'activité d'une entreprise au régime micro-entreprise ayant une activité de prestation de
services ( BIC / BNC ).

L'outil est paramétrable afin d'ajuster au mieux le prévisionnel à la situation de chacun.

Dans le cas d'une entreprise au régime réel, les taux peuvent être ajustés, mais pour le moment il n'est pas possible de
déduire les charges de l'entreprise au revenu imposable.

## Démo

[Freelancer forecast](https://freelancer-forecast.web.app/)

## Fonctionnement

### Calcul des jours de congés

Les jours de congés sont calculés annuellement. Calcul de la durée d'une semaine :

- On soustrait le nombre de jours non ouvrés
- On réduit la durée de la semaine en fonction du temps de travail

Une fois ce calcul effectués, nous multiplions la durée de cette semaine par le nombre de semaines de congés. Puis ces
jours sont répartis de manière égale sur l'année, en ajoutant les jours en plus sur le mois de décembre.

### Calcul de la facturation prévisionnelle

Le nombre de jours facturés est obtenu de la manière suivante :

- Calcul du nombre de jours dans le mois en cours
- On soustrait le nombre de jours non ouvrés dans le mois en cours
- On soustrait le nombre de jours de congés dans le mois en cours

# Available Scripts

In the project directory, you can run:

### `yarn test`

Launches the test runner without interactive watch mode.

### `yarn coverage`

Runs test coverage

### `npm watch-test`

Launches the test runner in the interactive watch mode.

### `./scripts/deploy.sh`

Clean previous build and node_modules, then build production app and deploy it in Firebase Hosting

# Resources

Tranches impositions 2022 : https://www.service-public.fr/particuliers/vosdroits/F1419

Régime micro-entreprise : https://www.economie.gouv.fr/entreprises/regime-micro-entrepreneur-auto-entrepreneur

Logo : https://app.logo.com

