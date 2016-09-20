angular.module('angular-rating-icons', [])
    .directive('angularRatingIcons', function() {
        return {
            replace: true,
            require: 'ngModel',
            scope: {
                ngModel: '=',
          onChangeFunction: '&onChange'
            },
            template: '' +
                '<ul ng-class="[listClass, decimal]">' +
                '<li ng-repeat="icon in icons track by $index" ' +
                'ng-style="getListItemStyle($index)" ' +
                'ng-click="setValue($index)" ' +
                'ng-mouseenter="paintIcons($index)" ' +
                'ng-mouseleave="resetIcons()" ' +
                '>' +
                '<i ng-class="getClass($index)" ng-style="getIconStyle($index)"></i>' +
                '</li>' +
                '</ul>',

            link: function(scope, element, attrs, controller) {
                // Settings
                scope.icons = new Array(+attrs.max || 5);
                scope.value = controller.$viewValue || (+attrs.defaultValue || 0);
                scope.size = +attrs.iconSize || 20;
                scope.spacing = +attrs.iconSpacing || 5;
                scope.listClass = 'angular-rating-icons';
                scope.readOnly = !(attrs.readonly === undefined);
                scope.decimal = !(attrs.decimal === undefined) ? 'angular-rating-icons-decimal' : undefined;

                // Colors
                var colorBase = attrs.colorBase || 'black';
                var colorSelected = attrs.colorSelected || 'orange';
                var colorHover = attrs.colorHover || 'orange';

                // Different states
                var iconBase = attrs.iconBase || 'fa';
                var iconEmpty = attrs.iconEmpty || 'fa-star-o';
                var iconFull = attrs.iconFull || 'fa-star';
                var iconHover = attrs.iconHover || 'fa-star';

                // Model
                controller.$render = function() {
            scope.value = controller.$viewValue === 0 ? 0 : controller.$viewValue || scope.value;

            // update model safeguard/fallback should it not be initialized before
            controller.$setViewValue(scope.value);
                };

                /**
                 * Returns the appropriate class for the icon.
                 * Changes if it's meant to be full or empty.
                 * All indexes above the given value will be empty, all bellow or equal will be full.
                 *
                 * @param {int} index - the icon's index
                 * @return {string} - the icon class to use
                 */
                scope.getClass = function(index) {
                    return iconBase + ' ' + (index >= scope.value ? iconEmpty : iconFull);
                };

                /**
                 * Returns the appropriate style for the icon's color.
                 * Changes if it's meant to be full or empty.
                 * If it's decimal type, modifies the style to reduce the icon size by 2px, and move the odd index icons
                 * half of their size minus 2, to the left.
                 *
                 * @param {int} index - the icon's index
                 * @return {Object} - the icon style to use
                 */
                scope.getIconStyle = function(index) {
                    var css = {
                        color: index >= scope.value ? colorBase : colorSelected
                    };

                    if (!scope.decimal) {
                        return css;
                    }

                    css.height = scope.size - 2 + 'px';
                    css.width = scope.size - 2 + 'px';
                    css.left = index % 2 ? '-' + (scope.size - 2) / 2 + 'px' : '';

                    return css;
                };

                /**
                 * Returns the appropriate style fo the list item's font-size and padding-right.
                 * If it's decimal type, modifies the style to reduce the height and width by 2 px, and the only the width
                 * by half of that result. Also for every even index it removes the right padding.
                 *
                 * @param {int} index - the list item's index
                 * @return {object} - the list item's style to use
                 */
                scope.getListItemStyle = function(index) {
                    var css = {
                        'font-size': scope.size + 'px',
                        'padding-right': index !== scope.icons.length - 1 ? scope.spacing + 'px' : '0'
                    };

                    if (!scope.decimal) {
                        return css;
                    }

                    css.height = scope.size - 2 + 'px';
                    css.width = (scope.size - 2) / 2 + 'px';

                    if (!(index % 2)) {
              css['padding-right'] = '0';
                    }

                    return css;
                };

                /**
                 * Doesn't run if set to readonly.
                 * Sets the directive's scope value to the clicked icon plus 1.
                 * List item's indexes go from 0 to 9, whilst real values should go from 1 to 10.
                 * Sets the model's value to the directive's scope value.
           * Runs the onChangeFunction function.
                 *
                 * @param {int} index - the clicked icon's index
                 */
                scope.setValue = function(index) {
                    if (scope.readOnly) {
                        return;
                    }

                    controller.$setViewValue(scope.value = index + 1);
            scope.onChangeFunction();
                };

                /**
                 * Runs the paintIcon function to paint the icons only up to the current scope value - 1,
                 * since the indexes range from 0 to 9 but the real values range from 1 to 10.
                 */
                scope.resetIcons = function() {
                    scope.paintIcons(scope.value - 1, true);
                };

                /**
                 * Doesn't run if set to readonly.
                 * Changes the icon's classes accordingly to their index.
                 * Cycles all the icons, and if the current index is smaller than the cycle number, it gives the icon the
                 * empty class, otherwise gives it the hover class and sets the color to the hover color.
                 * If reset is true, the above first case scenario also sets the color to the base color, and the second
                 * adds the class full and paints with the selected color instead.
                 *
                 * @param {int} index - the clicked icon's index
                 * @param {boolean} reset - if icon's paint should be reset
                 */
                scope.paintIcons = function(index, reset) {
                    if (scope.readOnly) {
                        return;
                    }

                    var items = element.find('li').find('i');
                    for (var i = 0; i < items.length; i++) {
                        var icon = angular.element(items[i]);

                        if (index >= i) {
                            icon.removeClass(iconEmpty)
                                .addClass(reset ? iconFull : iconHover)
                                .css('color', reset ? colorSelected : colorHover);
                        } else {
                            icon.removeClass(iconFull)
                                .addClass(iconEmpty)
                                .css('color', reset ? colorBase : icon.css('color'));
                        }

                        if (reset && iconHover !== iconFull) {
                            icon.removeClass(iconHover);
                        }
                    }
                };
            }
        };
    });
