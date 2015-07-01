/* jshint -W117, -W043 */
/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.search-by-purpose')
        .controller('SearchByPurposeController', SearchByPurposeController);

    SearchByPurposeController.$inject = ['$http', '$window',
        '$state', 'logger', 'searchformservice', 'common', '$q', '$timeout', '$scope'];

    /* @ngInject */
    function SearchByPurposeController($http, $window, $state,
        logger, searchformservice, common, $q, $timeout, $scope) {
        var vm = this;

        vm.purposes = searchformservice.getPurposes();
        vm.ingredients = searchformservice.getIngredients();
        vm.query = query;
        vm.searchResults = [];
        vm.addChip = function (chip, chipType) {
            if (chip.value) {
                chip = chip.value;
            }
            var chips = chip.split(' ');
            var newChip = {};
            for (var i = 0; i < chips.length; i++) {
                var element = chips[i];
                newChip = createChip(element);
                if (i !== chips.length - 1) {
                    if (chipType == 'purpose') {
                        vm.purposes.push(newChip);
                    }
                    else {
                        vm.ingredients.push(newChip);
                    }
                }
            }
            vm.purposeText = '';
            vm.ingredientText = '';
            return newChip;
        };

        $scope.$watch(function () {
            return vm.purposes.length;
        }, refreshProductCount);

        $scope.$watch(function () {
            return vm.ingredients.length;
        }, refreshProductCount);

        function refreshProductCount() {
            vm.productCount = 0;
            vm.searchPurposeWithoutIngredient();
        }

        function createChip(chip) {
            var newChip = { name: '' };
            if (chip.value) {
                newChip.name = chip.value;
            }
            else {
                newChip.name = chip;
            }
            return newChip;
        }

        function query(query, chipType) {
            var results = query ? vm.searchResults.filter(createFilterFor(query)) : vm.searchResults, deferred;
            if (!deferred) {
                deferred = $q.defer();
                if (chipType == 'purpose') {
                    $http.get('/data/purpose/' + common.sanitize(query),
                        { timeout: deferred.promise })
                        .success(function (response) {
                        deferred.resolve(vm.transformPurpose(response));
                    });
                }
                else {
                    $http.get('/data/ingredient/' + common.sanitize(query),
                        { timeout: deferred.promise })
                        .success(function (response) {
                        deferred.resolve(vm.transformIngredient(response));
                    });
                }
                return deferred.promise;
            }
            else {
                return results;
            }
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                return (item.value.indexOf(lowercaseQuery) === 0);
            };
        }

        vm.searchPurposeWithoutIngredient = function () {
            if (vm.purposeWithoutIngredientCancel) {
                vm.purposeWithoutIngredientCancel.resolve();
            }
            vm.purposeWithoutIngredientCancel = $q.defer();
            var url = buildHttpQuery();
            $http.get(url,
                { timeout: vm.purposeWithoutIngredientCancel.promise })
                .success(function (response) {
                if (response.meta && response.meta.results) {
                    vm.productCount = response.meta.results.total;
                }
                else {
                    vm.productCount = 0;
                }
            });
        };

        function buildHttpQuery() {
            if (vm.ingredients.length === 0) {
                var parameters = [];
                angular.forEach(vm.purposes, function (value, key) {
                    parameters.push(value.name);
                });
                return '/data/purpose/' + common.sanitizeArray(parameters);
            }
            else {
                var productParameters = [];
                var ingredientParameters = [];
                angular.forEach(vm.purposes, function (value, key) {
                    productParameters.push(value.name);
                });
                angular.forEach(vm.purposes, function (value, key) {
                    ingredientParameters.push(value.name);
                });
                return '/data/purposeWithoutIngredient/' + common.sanitizeArray(productParameters) +
                    '/' + common.sanitizeArray(ingredientParameters);
            }
        }

        vm.transformPurpose = function (data) {
            return common.getExampleDistinct(data.meta.query[0],
                data.results,
                ['purpose']);
        };
        vm.transformIngredient = function (data) {
            return common.getExampleDistinct(data.meta.query[0],
                data.results,
                ['generic_name', 'inactive_ingredient']);
        };

        vm.viewResults = function viewResults() {
            searchformservice.query = buildHttpQuery();
            searchformservice.purpose = vm.purposes;
            searchformservice.ingredient = vm.ingredients;
            $state.go('^.products');
            window.scrollTo(0, 0);
        };
    }
})();
