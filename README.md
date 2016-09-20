# Angular-rating-icons
The first fully customizable AngularJS rating system that is as easy as it gets.

Its best feature? It works with any icon from font-awesome, even if you want to fill only half of it!

Check the [live demo here](https://jsfiddle.net/filipetedim/0595783t/) if you didn't understand!

## Table of contents

* [Getting started](#getting-started)
* [How to use](#how-to-use)
* [Dependencies](#dependencies)
* [Bugs and feature requests](#bugs-and-feature-requests)
* [Contributing](#contributing)
* [Versioning](#versioning)
* [Credits and author](#credits-and-author)
* [License](#license)

## Getting started

There are several ways to install:

* [Download the latest release](https://github.com/filipetedim/angular-rating-icons/archive/master.zip).
* Install with [Bower](http://bower.io): `bower install angular-rating-icons`.
* Install with [npm](https://www.npmjs.com): `npm install angular-rating-icons`.

Include the files in your index page:
```javascript
// CSS
<link type="text/css" rel="stylesheet" href="..(your source)../angular-rating-icons/dist/angular-rating-icons.min.css">

// JavaScript
<script src="..(your source)../angular-rating-icons/dist/angular-rating-icons.min.js"></script>
```

Add the module to your main module's list of dependencies:
```javascript
angular.module('yourApp', [
	// ...
	'angular-rating-icons',
	// ...
]);
```

## How to use

To get it running, just add one of the the blocks of HTML code bellow to your view. Don't forget that your model should be an object, as per [the ng-model golden dot rule](http://stackoverflow.com/questions/17606936/angularjs-dot-in-ng-model), to deal with scope inheritance.
```html
<angular-rating-icons ng-model="YourObject.ratingValue"></angular-rating-icons>

<div angular-rating-icons ng-model="YourObject.ratingValue"></div>

<!-- Best practice: This is the most valid HTML code should you use any validation tool. -->
<div data-angular-rating-icons ng-model="YourObject.ratingValue"></div>
```

### Attributes

There are a number of possible customizations to this directive. Bellow is a table with all the latest version attributes and their information.

| Attribute | Description | Type | Default |
|---|---|---|---|
| ng-model | (Required) Object  bound to control. | String, Number, Array | - |
| max | Maximum value. | Integer | 5 |
| default-value | Default value if model is undefined. | Integer | 0 |
| on-change | Function executed every value change. | Function | - |
| decimal | Whether or not icons should fill in halves.  | Boolean | false |
| read-only | Whether or not is readonly. | Boolean | false |
| icon-size | Size of the icons. | Integer | 20 |
| icon-spacing | Spacing in pixels between the icons. | Integer | 5 |
| icon-base | Base class for all icons. | String | 'fa' |
| icon-empty | Icon class for empty icons. | String | 'fa-star-o' |
| icon-full | Icon class for selected icons. This attribute has priority over the empty class.  | String | 'fa-star' |
| icon-hover | Icon class for hovered icons. This attribute has the highest class priority. | String | 'fa-star' |
| color-base | Base color for icons. | String | 'black' |
| color-selected | Color for selected icons. This attribute has priority over the base color. | String | 'orange' |
| color-hover | Color for hovered icons. This attribute has the highest color priority . | String | 'orange' |

### Customization

You can fully customize the directive by downloading and changing the CSS file in `/src/angular-rating-icons.css`. Be mindful that `decimal` type uses specific code to reduce the icons to half and position them properly next to their correspondent half. 

Customizing the CSS is at the risk of visual malfunction of this directive.

## Dependencies

This package uses [FontAwesome](http://fontawesome.io/) as fallback if no class is given to the icons.

## Bugs and feature requests

If you found a bug or have a feature request, [please open a new issue](https://github.com/filipetedim/angular-rating-icons/issues/new).

Requested features list:
* Add Angular's pristine to an attribute.
* Add form validation to an attribute.
* Add attribute for a new custom class to be added.
* Add MaterializeCSS support.
* Add reset functionality.
* Only execute set value when it's different than the original.

## Contributing

Feel free to contribute in any way you like. All pull requests will be reviewed and your code will be changed to match this project's [guidelines](https://github.com/filipetedim/angular-rating-icons/blob/master/GUIDELINES.md) should it not follow them, and issues will be answered and resolved as soon as possible.

## Versioning

Angular-rating-icons is maintained under the [Semantic Versioning guidelines](http://semver.org/).

See the [Releases section of this GitHub project](https://github.com/filipetedim/angular-rating-icons/releases/) for changelogs for each release.

## Credits and author

This project's early development was based on [melloc01](https://github.com/melloc01)'s repository, [angular-input-stars](https://github.com/melloc01/angular-input-stars/). I needed more features from his package and to work in a different way, specifically the feature to add half (decimal) ratings like 2,5. 

So I thought I'd build my own and increase it's feature list like allowing it to be fully customizable, using callbacks on value (rating) change and so on. It has since evolved past [melloc01](https://github.com/melloc01)'s project, but I can't help thanking and crediting him for being my early prototype.

## License

Code and documentation copyright 2016 filipetedim © Filipe Tedim. Code released under [the MIT license](https://github.com/filipetedim/angular-rating-icons/blob/master/LICENSE).
