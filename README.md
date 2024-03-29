# Widgets PANIST avec AngularJS

Widgets (search, results, facets) permettant de créer rapidement des interface Web d'interrogation des ressources PANIST avec AngularJS.

## Exemple

Pour visualiser un exemple de disposition du widget cliquez sur le lien suivant :
  https://widgets.panist.fr

## Correspondances entre l'identifiant idc et le libellé des institutions
  https://widgets.panist.fr/pdf/Liste%20ayants%20droit%20Panist.pdf

## Usage classique des widgets

Exemple d'utilisation classique des widgets search et results. Il est nécessaire dans un premier temps de charger les fichiers JS et CSS des widgets Panist (à la fin du body pour charger les fichiers après que la page soit affichée) ainsi que la bibliothèque AngularJS qui est une dépendance nécessaire.
On peut aussi charger la bibliothèque Bootstrap pour un meilleur rendu et la directive pour afficher le Slider (voir plus bas pour afficher le Slider)

Ensuite vous pouvez placer deux balises (zone de recherche & zone de résultats) où vous le souhaitez dans votre page HTML.
Ces balises ont des noms spécifiques pour chaque widget :
```html
<panist-search>, <panist-results>, <panist-facets>
```
On peut aussi utiliser des balises classiques avec des attributs spéciaux :
```html
<div panist-search></div>
```

Voici ce que ca peut donner sur une page quasi vierge :

```html
<!DOCTYPE html>
<html lang="fr">
  <head lang="en">
    <meta charset="UTF-8">
    <title>Panist - Widgets</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="//widgets.panist.fr/src/css/bootstrap.min.css">
    <link rel="stylesheet" href="//widgets.panist.fr/src/css/basique.css">
    <link rel="stylesheet" href="//widgets.panist.fr/src/css/rzslider.css">
    <link rel="stylesheet" href="//widgets.panist.fr/src/css/select.css">
    <link rel="stylesheet" href="//widgets.panist.fr/src/css/style.min.css">
  </head>
  <body>

  <panist-search></panist-search>
  <panist-results></panist-results>
  <panist-facets></panist-facets>

  <!-- Dependencies -->

  <script>
    var panistConfig = {
      // placer ici la configuration souhaitée, cf section suivante et le contenu de panistConfigDefault
      //Mentionnez ici le trigramme de votre établissement. ex: cnr pour CNRS
      idc: 'cnr',
      //Mettez "true" pour afficher les liens vers les fichiers Full text sinon mettez false
      showFulltext: true,
      showPDF: true,
      showZIP: true,
      //Mettez "true" pour afficher les liens vers les fichiers Meta Donnée sinon mettez false
      showMetadonnee: true,
      showXML: true,
      showMODS: true,
      showJSON: true};
  </script>

  <script src="//widgets.panist.fr/src/js/angular.min.js"></script>
  <script src="//widgets.panist.fr/src/js/angular-sanitize.js"></script>
  <script src="//widgets.panist.fr/src/js/select.js"></script>
  <script src="//widgets.panist.fr/src/js/rzslider.js"></script>
  <script src="//widgets.panist.fr/src/js/app.min.js"></script>

</body>
</html>
```

## Paramètres des widgets
Les widgets peuvent être paramétrés en positionnant les clés/valeurs de la variable globale panistConfig dans le HTML AVANT le scipt pour app.min.js.
La liste des différents paramètres se présente comme ceci (et est sujette à modifications) :

```javascript
var panistConfigDefault = {
    // l'adresse de l'API de l'Panist
    panistApi: 'http://vd-panist-api.intra.inist.fr:63332',
    // on peut avoir besoin de proxyfier les liens vers les plein-textes ou les méta-données
    // pour une ezproxyfication, réglez ici proxyApi à l'adresse ezproxyfiée
    // ex à l'UL: https://api-panist-fr.bases-doc.univ-lorraine.fr
    //proxyApi: 'https://api.panist.fr',

    // pour lancer une recherche au chargement de la page
    // indiquer les mots à rechercher (argument de ?q= au niveau de l'api panist)
    // si vous ne voulez pas de recherche au démarrage, ne mettez rien (ou query: false)
    // si vous mettez query: "", les résultats seront tous les documents
    query: false,

    // les termes de la recherche sont liés par l'opérateur logique voulu
    // les deux valeurs possibles sont "OR" (OU) et "AND" (ET)
    operator:"AND",

    // il est possible de mettre le focus sur la barre de recherche au chargement de la page
    focusInputQueryOnLoad: false,

    // il est possible de ne charger que certaines facettes
    // par défaut, on charge seulement : 'corpus','pubdate','copyrightdate','language','categories.wos','categories.inist','score'
    // 'keywords.teeft','categories.scienceMetrix','categories.scopus' sont également disponibles
    facetsToLoad: [ 'genre', 'corpusName','publicationDate','copyrightDate','language','categories.wos','categories.inist','score'],

    // il est possible de cacher l'affichage des résultats derrière un bouton. Une fois le bouton cliqué, les résultats apparaissent
    hideButton:false,

    // il n'est possible de charger que certains champs de la recherche avancée
    // par défaut, tout les champs sont chargés
    // on peut mettre des valeurs par défaut aux champs au lieu de guillemets vides
    // pour enlever la recherche avancée, il faut mettre advancedToLoad:false
    advancedToLoad: {
        'author.name':"",
        'genre':"",
        'host.title':"",
        'host.genre':"",
        'subject.value':"",
        'language':""
    },

    // il est possible que la recherche avancée soit dépliée par défaut.
    // Par défaut elle est repliée
    advancedExpanded:false,

    // il est possible d' soit un slider soit deux inputs lorsque les facettes sont des dates
    // si vous voulez le slider, n'oubliez pas d'inclure les dépendances en plus : slider/rzslider.css et slider/rzslider.js
    slider:true,

    // il est possible de cacher la zone de pagination en haut et/ou en bas avec ces paramètres
    showPaginationTop: true,
    showPaginationBot: true,

    // nombre de résultats maximums (l'API impose un maximum absolu de 10000)
    maxResults: 10000,

    // nombre de résultats souhaités par page
    pageSize: 10,

    // nombre max de pages à montrer dans la zone de pagination
    maxPagesInPagination: 10,

    // le nombre max de caractères du résumé à afficher
    abstractLength: 250,

    // le nombre max de caractères du titre à afficher
    titleLength: 150,

    // PAS ENCORE IMPLEMENTE
    // le format qu'on souhaite voir s'ouvrir quand on clique sur le titre
    fullTextOnTitle: 'pdf',

    // il est possible de cacher l'affichage de la vitesse de la requête
    // ex: "Environ 8 933 993 résultats (0.24 secondes)"
    // si showQuerySpeed vaut false, "(0.24 secondes)" ne sera pas affiché
    showQuerySpeed: true,

    // on peut plier ou déplier les facettes par défaut
    shownFacet: true,

    // permet de dire comment un résultat est affiché (juste le titre et le résumé, le type d'article ? De quand date la publi, ...)
    resultContent: {
        'title':true,
        'abstract':true,
        'author':true,
        'journal':true
    },

    // on peut ajouter ou enlever des tags (les mots entourés de vert)
    // La valeur correspond au texte qu'il y aura juste avant la données. ex: "Publié en 1938"
    tags: {
        'publicationDate':'Publié en',
        'corpusName':'',
        'genre':'Type :'
    },

    // on peut choisir quel critère pour trier les documents on préfère
    // par défaut on choisit
    defaultSort: '',
    // et sinon, on a une liste des tris disponibles
    possibleSorts: [
        {'value':'','name':'Pertinence'},
        {'value':'score[desc]','name':'Qualité du fulltext'},
        {'value':'publicationDate','name':'Date de publication (croissant)'},
        {'value':'publicationDate[desc]','name':'Date de publication (décroissant)'},
        //{'value':'title[desc]','name':'Alphabétique (titre)'},
    ],

    // Montre un indicateur de qualité avec des étoiles, caché par défaut
    qualityIndicator: false,

    // les différents textes paramétrables
    // il est possible d'avoir les langues en anglais en mettant 'traduction':'en'
    labels: {
        search: {
            'advancedTitle':"Recherche avancée",
            'author.name':"Auteur",
            'host.title':"Titre de la collection",
            'genre':"Genre du document",
            'host.genre':"Genre de la collection",
            'subject.value':"Sujet du document",
            'language':"Langue",
            placeholder:{
                'main':"Votre requête ici ...",
                'author.name':"ex : Dijkstra",
                'host.editor.name':"",
                'host.title':"ex : Journal of Algebra",
                'genre':"ex : article, paper, ...",
                'host.genre':" ex : ebook, reviews, ...",
                'subject.value':"ex : cell division",
                'language':"3 lettres : fre, eng, ita, ..."
            }
        },
        results: {
            'noresult':"Pas de résultat (Faites attention quand vous utilisez plusieurs facettes)",
            'showResult':"Affichez les résultats",
            'abstract':"Pas de résumé",
            'fulltext':"Texte complet",
            'metadata':"Métadonnées",
            'enrichment':"Enrichissements"
        },
        facets: {
            'title' : 'Affiner votre recherche',
            'corpusName' : 'Corpus',
            'publicationDate' : 'Date de publication',
            'copyrightDate' : 'Début du copyright',
            'score' : 'Qualité du fulltext',
            'categories.wos':'Catégories WOS',
            'categories.inist': 'Cat. Pascal & Francis',
            'language':'Langue',
            'traduction':'fr'
        }
    }
}

```

Remarque : ces paramètres doivent être de préférence positionnés avant l'inclusion des fichiers app.min.js.
Remarque 2 : la recherche des documents est libre, ainsi que l'accès aux méta-données mais l'accès au plein texte est restreint et nécessite la configuration de proxyApi. Pour plus de détails, vous pouvez [nous contacter](mailto:panist-liste@inist.fr).

## Fonctionnement du widget panistSearch

Ce widget permet d'insérer dans la page HTML une zone de saisie ainsi qu'un bouton de recherche. Lorsqu'une suite de mots sont tapés puis que le bouton rechercher est pressé, l'API Panist est interrogée à travers des requêtes AJAX.
Une fois les résultats reçus, ils sont enregistrés dans le $rootScope et ainsi propagés aux widgets results et facets.
Ce widget permet aussi de faire une recherche avancée.

## Fonctionnement du widget panistResults

Ce widget permet d'insérer dans la page HTML la liste des résultats issus d'une recherche. Il a donc besoin du widget panistSearch pour fonctionner (Il est évident qu'on ne peut pas afficher des données si on ne les a pas réccupérées de l'API avant ! ).
Il permet aussi de gérer le système de pagination et la recherche au chargement de la page.

## Fonctionnement du widget panistFacets

Ce widget permet d'insérer dans la page HTML des facettes permettant d'affiner la recherche courante de l'utilisateur. A l'aide de la facette corpus, on peut ainsi n'afficher que les résultats provenant d'un éditeur précis.
Les facettes actuellement gérées sont les suivantes :
- corpusName, publicationDate, copyrightDate, language, score

Il est possible de n'afficher que certaines facettes en modifiant le paramètre ``facetsToLoad`` dans panistConfig.

## Documentation développeurs

### Installation d'un environnement de développement

Voici les étapes permettant de mettre en place un environnement de développement :

Installer NodeJS et npm (exemple sous Linux avec l'outil [nvm](https://github.com/creationix/nvm)) :
```
curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash
nvm install 0.10
nvm use 0.10
```
Exemple pour installer nodejs et npm sous MacOSX :
```
brew install node
```

Sous windows, télécharger et installer nodejs et git depuis leurs sites :
- http://nodejs.org/download/
- http://git-scm.com/download/win

Récupérer le dépôt git des widgets Panist (au choix via SSH ou via HTTPS) :
```
git clone git@github.com:panist/panist-widgets-angular.git
git clone https://github.com/panist/panist-widgets-angular.git
```

package.json permet d'associer des scripts à npm et faciliter ainsi la construction du projet.
Pour initialiser les dépendances (uglify-js, clean-css, http-server, bootstrap et angularjs) en local et rendre le projet prêt à utiliser, il suffit de faire :
```
cd panist-widgets-angular/
npm install
```

Si vous avez déjà des outils pour minifier le js et le css et lancer un serveur en locale, vous pouvez juste charger angularjs et bootstrap :
```
cd panist-widgets-angular/
bower install
```

Vous êtes alors opérationels pour développer votre contribution.

### Tester, compiler et déployer

Pour développer et tester les widgets depuis votre navigateur Web, le plus simple est de lancer un mini serveur Web avec la commande suivante qui appelle http-server :
```
npm run server
```

Puis ouvrez les URL qui s'affichent dans votre fenêtre. Exemple: http://127.0.0.1:8080/index.html pour une vue d'ensemble, http://127.0.0.1:8080/basique.html pour l'exemple le plus léger (sans Bootstrap et autres).

Si vous modifiez des fichiers, vous devez minifier le Javascript à l'aide d'Uglify-JS et/ou le CSS avec Clean-CSS :
```
cd panist-widgets-angular/
npm run js // Compile juste le js dans app.min.js
npm run css // Compile juste le css dans style.min.css
npm run jscss // Compile le js et le css dans leur fichiers réspectifs
```
ATTENTION : Si vous utilisez vos propres minifieurs, il faut toujours mettre panistconfigdefault.js à la fin de la liste des fichiers à minifier de votre commande car il lie l'application à AngularJS

### Comprendre la structure du code

L'utilisation d'AngularJS mène à avoir une structure du code particulière (approche MVC côté Client) :
- Un dossier app dans lequel on met tout le JavaScript lié aux widgets contenant
  - Un fichier app.js qui initialise l'application et créé quelques filtres et autres fonctions utiles (pour éviter la dépendance à jQuery)
  - Dans chaque dossier widget, un fichier controller qui inclue le code qui permet d'associer les données au $rootScope (Controller)
  - Dans chaque dossier widget, un fichier directive qui inclue le code qui permet de générer le HTML (View)
  - Dans chaque dossier widget, un fichier service qui inclue le code qui permet de construire les URIs et de faire l'appel correspondant (Model)
  - Un fichier panistconfigdefault.js qui associe les configurations par défaut au $rootScope (et éventuellement celles indiquées dans le HTML) et associe l'application à AngularJS
- Un dossier bower_components contenant AngularJS et Bootstrap

On a aussi :
- Un dossier public qui contient tout ce qui est prêt à être utilisés par le serveur
  - Un dossier src/js et src/css avec les versions minifiés du css et du javascript des widgets
  - Un fichier index.html qui utilise les widgets avec le css, Bootstrap et les Sliders
  - Un dossier css/img qui contient toutes les images liées aux widgets
  - Un dossier pdf avec les correspondances entre l'identifiant idc et le libellé des institutions

### Charger le code de l'application différemment (optionnel)
Voici un exemple plus poussé pour charger les widgets qui se trouve dans index.html, dans le but d'attendre que la page soit complètement affichée avant de télécharger et exécuter le Javascript :
On charge les scripts de manière asynchrone en remplaçant les balises par une fonction spéciale. Cela marche seulement pour les navigateurs récents (IE 9 ne passe pas :/ ) !
```html
<!-- Dependencies -->
<script>
    var panistConfig = {
    };
    [
    	'bower_components/angular/angular.min.js',
        'app.min.js'
    ].forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    });
</script>
<!-- <script src="bower_components/angular/angular.min.js"></script> -->
<!-- <script src="app.min.js"></script> -->
```

# Modifications apportées à la version Panist du widget

## Choix de l'établissement 

Panist est un outil qui assure la gestion différenciée des droits. 
Le choix de l'établissement si fait par deux méthode : 

### Variable de configuration 

Pour appliquer cette règle il faut mentionner dans la variable panistConfig au niveau de la page index.html, le trigramme de l'établissement 
Voici un exemple ;
```html
<script>
    var panistConfig = {
        idc:"mettre ici le trigramme"
    };
</script>
```

La liste des trigrammes est disponible dans le PDF sous le lien ci-dessous 

### Widget panist-select2 

Ce widget permet d'insérer dans la page HTML une liste déroulante contenant la liste des établissements.
Un fois un établissement est choisi parmi cette liste, le widget panist prend en considération cette sélection et ignore la variable mentionnée dans  panistConfig.


NB : Si on ne mentionne pas le trigramme de l'établissement et on ne fait le choix dans la liste déroulante , le systéme n'affiche pas de résultat.


## Paramétrage de l'affichage des liens vers les documents ( PDF, ZIP, MODS, ...)

Le paramétrage par rapport à l'affichage des icônes liens vers les documents se fait dans la page index.html et dans la variable panistConfig. 
Voici un exemple : 
```html
<script>
    var panistConfig = {
            showFulltext: true,
            showPDF     : true,
            showZIP     : true,
            
            showMetadonnee: true,
            showXML: true,
            showMODS: true,
            showJSON: true
    };
</script>
```

Chaque Variable est relatif à une icône (ex : showPDf : un lien vers le document PDF | showXML : un lien vers le document PDF)
Si on souhaite afficher le lien on met la valeur "true" sinon on met la valeur false de type booléen 

Les deux variable showFulltext et showMetadonnee correspant respectivement au liens de type "Full text" et "Meta donnée", une fois une valeur se mette à false toute la partie concernée ne s'affichera pas.

 


