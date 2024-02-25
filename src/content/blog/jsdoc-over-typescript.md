---
id: 3
author: "Aziz Chanou"
title: "JSDoc: Alternative à TypeScript ?"
description: "Documenter son code est important pour la documentation d'un projet. La question est de savoir avec quel outil ou methpde le faire."
tags:
  [
    "JSDoc",
    "TypeScript",
    "Documentation",
    "Documentation Web",
    "Documentation Mobile",
  ]
pubDate: "Jul 08 2022"
heroImage: "/img/typejs.png"
---

**Qu'est-ce que JSDOC ?**

JSDOC est une méthode prédéfinie de documentation de code pour l'écosystème JavaScript, créée en 1999. Elle fonctionne de manière similaire aux bibliothèques d'autres langages comme Javadoc pour Java, YARD pour Ruby, etc.

En pratique, JSDoc est un moyen d'écrire des commentaires que les LSP (Language Server Protocol) ou tout autre outil peuvent analyser et fournir des informations au développeur. Il s'agit essentiellement d'un langage de balisage (comme le HTML) pour les exemples de code, par exemple :

```javascript
/**
 * La fonction `foo` concatène deux chaînes de caractères et retourne la chaîne concaténée.
 * @param {string} a
 * @param {string} b
 * @returns {string}
 * @throws {Error} Si la première chaîne est vide
 */
function foo(a, b) {
  // Code...
}
```

Grâce à ce langage de balisage, nous pouvons définir des informations textuelles telles que des descriptions de fonctions, des cas d'erreur (throws) et des détails spécifiques au langage comme les signatures de type pour les paramètres et les valeurs de retour qui peuplent les signatures de TypeScript lui-même, comme vous pouvez le voir dans la capture d'écran.

Vous trouverez de nombreux symboles spécifiques présentés dans la spécification JSDOC ici : [https://jsdoc.app/](https://jsdoc.app/)

**Qu'est-ce que TypeScript ?**

Avertissement : Cet article ne se concentrera pas sur les détails spécifiques de la vérification de type de TypeScript. Si votre besoin implique ce niveau de vérification de type, vous êtes probablement bien d'utiliser TypeScript.

TypeScript est un linter et un compilateur/transpiler qui fournit une syntaxe spécifique pour définir des types et d'autres constructions linguistiques spécifiques comme les interfaces, les classes abstraites, les décorateurs, etc.

Lors de sa création, TypeScript a certainement changé la façon dont tout le monde écrit du JavaScript. Il a non seulement introduit un nouveau langage, mais il a également concurrencé Babel en offrant un moyen de prendre en charge de nouvelles fonctionnalités de langage sans attendre le support officiel d'ECMA.

Outre les fonctionnalités proposées par TypeScript lui-même, la chose la plus importante qu'il a apporté à la communauté est la possibilité de créer des fonctionnalités intéressantes autour de ce compilateur qui améliorent l'expérience et la productivité du développeur. Des outils comme tsserver, pretty ts errors et bien d'autres améliorent activement l'écosystème pour les développeurs JavaScript et TypeScript.

**Quels problèmes TypeScript résout-il ?**

La plupart des gens pensent que TypeScript n'a apporté que la vérification de type à nos bases de code, mais ce n'est pas la seule chose dans laquelle il excelle :

- **Arrêtez la course avec le support ECMAScript :** Avec TypeScript, nous avons la possibilité d'utiliser des fonctionnalités JavaScript de pointe sans nous soucier de la compatibilité des navigateurs. Ainsi, des fonctionnalités comme les classes abstraites, les interfaces et les décorateurs deviennent accessibles au développeur.
- **Les types arrivent :** En plus de fournir un support aux fonctionnalités JavaScript modernes de la communauté, TypeScript fournit également un système de types Turing complet qui permet à la fois une vérification simple et une logique de type complexe, principalement utilisée par les auteurs de bibliothèques.

Il est important de souligner que TypeScript brille vraiment pour les développeurs de bibliothèques dans l'écosystème JavaScript. Si vous voulez offrir une expérience de qualité à vos utilisateurs lors de l'installation de votre bibliothèque, alors TypeScript est probablement la meilleure solution.

Pour ceux qui veulent améliorer leurs compétences en matière de types, je recommande vivement ce dépôt pour apprendre en faisant : [https://github.com/type-challenges/type-challenges](https://github.com/type-challenges/type-challenges)

Un autre avertissement est que TypeScript n'est pas le seul moyen de transpiler du JavaScript accessible pour les anciennes versions. Si vous n'avez pas besoin de fonctionnalités spécifiques de TypeScript, il est possible d'utiliser des alternatives qui ne font pas de vérification de type.

- SWC
- Parcel
- Esbuild

**Quels problèmes JSDOC peut-il résoudre à lui seul ?**

Comme JSDOC est juste un langage de balisage construit sur des commentaires JavaScript, les problèmes solubles sont très limités à cet aspect. Il est donc principalement utilisé pour :

- Documenter des fonctions ou des classes.
- Déduire des types simples pour les paramètres, les retours, les variables de classe, etc.
- Interagir avec le système de types complexes de TypeScript via des fichiers .d.ts
- Utiliser le potentiel des outils existants comme le compilateur TypeScript et le LSP.

La plupart des gens se tournent vers le langage TypeScript comme seul moyen d'interagir avec le compilateur et le LSP. Cependant, le JavaScript utilisant JSDoc est une solution parfaitement valable pour maintenir un logiciel hautement sécurisé sans avoir à gérer des temps de bundle complexes (si vous voulez intégrer un bundle, sélectionnez-en simplement un dans la liste présentée dans le sujet précédent).

**Comment vérifier le code à l'aide du compilateur TypeScript dans une base de code JavaScript + JSDOC**

Puisque TypeScript est juste un linter et qu'il supporte les types JSDOC, on peut même obtenir toute la puissance de `tsc` sur nos pipelines CI sans se soucier du bundling du tout.

Tout d'abord, définissons un type assez complexe interagissant avec un fichier .d.ts pour une magie TypeScript supplémentaire sans bundling.

Créez un simple projet avec `npm init -y` et écrivez le fichier `index.js` suivant :

```javascript
/**
 * foo....
 * @param {import('./types.d.ts').ComplexType<number, { message: string }>} complexType
 * @returns {string}
 */
function foo(complexType) {
  if (complexType.type === "err") {
    console.log(complexType.data.message);
    return;
  }

  return complexType.data;
}
```

Voyez comment le mot-clé `import` est utilisé pour importer un fichier de type ? Vous pouvez penser à cette approche comme aux fichiers .h et .c du langage C.

Avertissement : Cette fonctionnalité JSDOC a été implémentée par l'équipe TypeScript elle-même, avec beaucoup plus de possibilités :[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Maintenant, pour définir le fichier `types.d.ts`, j'ai essayé d'implémenter un type assez complexe simulant `Result` de Rust, juste pour montrer que l'on peut utiliser tout le potentiel de TypeScript avec cette méthode :


``` typescript
type Ok<T> = { type: 'success', data: T }
type Err<T> = { type: 'err', data: T }

export type ComplexType<V, E> = Ok<V> | Err<E>
```

Après avoir défini notre code d'exemple, nous pouvons utiliser toute la puissance du linter TypeScript sans utiliser son compilateur. Définissons le fichier de configuration `tsconfig.json` suivant pour cela :

``` json
{
    "compilerOptions": {
        "checkJs": true
    },
    "exclude": ["node_modules"]
}
```

Et enfin, nous pouvons exécuter notre commande pour vérifier l'intégralité du code et voir une erreur de type (que j'espère que vous avez déjà vue ) :

``` bash
tsc index.js
```

**Conclusion**

Cet article était mon exploration autour des nouvelles récentes de gros projets abandonnant TypeScript de leur base de code tout en maintenant une expérience de vérification de type (Svelte uniquement). J'espère avoir montré avec succès ma surprise de tout ce qu'il est possible d'accomplir sans utiliser le bundling par défaut.

Je tiens à souligner à nouveau que l'utilisation de TypeScript n'est pas du tout un problème, et que sans ce langage nous n'aurions pas d'incroyables projets comme le LSP tsserver.
