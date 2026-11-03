# Workflow Azure Static Web Apps — version corrigée

Remplacez le contenu de votre fichier `.github/workflows/azure-static-web-apps-*.yml`
par celui-ci (basé sur votre workflow réel, branche `master`).

## Corrections apportées
1. **`skip_app_build: true`** ajouté → Azure ne tente plus de builder le site
   (100 % statique), ce qui supprime l'erreur Oryx « could not find a 'build'
   or 'build:azure' script ».
2. **Bloc OIDC retiré** (étapes « Install OIDC Client » et « Get Id Token ») et
   **`github_id_token` supprimé** → cet input n'est pas supporté par
   `Azure/static-web-apps-deploy@v1` (à l'origine du warning).
3. **`output_location: ""`** (au lieu de `"/"`) → aucun dossier de build pour un
   site statique à la racine.

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - master
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - master

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
          lfs: false

      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_DELIGHTFUL_MUSHROOM_0C018051E }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: ""
          skip_app_build: true

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_DELIGHTFUL_MUSHROOM_0C018051E }}
          action: "close"
```

## Notes
- Le secret `AZURE_STATIC_WEB_APPS_API_TOKEN_DELIGHTFUL_MUSHROOM_0C018051E`
  reste inchangé (déjà configuré dans Settings → Secrets → Actions).
- Après remplacement, poussez le changement sur la branche `master` : le
  déploiement se relancera automatiquement.