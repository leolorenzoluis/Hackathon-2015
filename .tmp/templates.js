angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/index.html","<!DOCTYPE html><html ng-app=app><head><style>\n            /* This helps the ng-show/ng-hide animations start at the right place. */\n                /* Since Angular has this but needs to load, this gives us the class early. */\n                .ng-hide { display: none!important; }\n        </style><title ng-bind=title>Pyramid Systems Inc.</title><meta charset=utf-8><meta http-equiv=X-UA-Compatible content=\"IE=edge, chrome=1\"><meta name=viewport content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\"><base href=\"/\"><link rel=stylesheet href=../bower_components/bootstrap/dist/css/bootstrap.css><link rel=stylesheet href=../bower_components/font-awesome/css/font-awesome.css><link rel=stylesheet href=/.tmp/styles.css></head><body><div><div ng-include=\"\'layout/shell.html\'\"></div><div id=splash-page ng-show=showSplash><div class=page-splash><div class=\"progress progress-striped active page-progress-bar\"><div class=bar></div></div></div></div></div><script src=../bower_components/jquery/dist/jquery.js></script><script src=../bower_components/angular/angular.js></script><script src=../bower_components/angular-animate/angular-animate.js></script><script src=../bower_components/bootstrap/dist/js/bootstrap.js></script><script src=../bower_components/angular-ui-router/release/angular-ui-router.js></script><script src=../bower_components/angular-sanitize/angular-sanitize.js></script><script src=/public/app.module.js></script><script src=/public/admin/admin.module.js></script><script src=/public/blocks/router/router.module.js></script><script src=/public/core/core.module.js></script><script src=/public/dashboard/dashboard.module.js></script><script src=/public/layout/layout.module.js></script><script src=/public/admin/admin.controller.js></script><script src=/public/admin/admin.route.js></script><script src=/public/blocks/router/router-helper.provider.js></script><script src=/public/core/config.js></script><script src=/public/dashboard/dashboard.controller.js></script><script src=/public/dashboard/dashboard.route.js></script><script src=/public/layout/ht-sidebar.directive.js></script><script src=/public/layout/ht-top-nav-directive.js></script><script src=/public/layout/shell.controller.js></script><script src=/public/layout/sidebar.controller.js></script></body></html>");
$templateCache.put("app/admin/admin.html","<section class=mainbar><section class=matter><div class=container><div class=row><div class=\"widget wviolet\"><div ht-widget-header title={{vm.title}}></div><div class=\"widget-content user\"><h3>TODO: Implement Your Features</h3></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>");
$templateCache.put("app/core/404.html","<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=bred><div class=pull-left><i class=\"fa fa-warning\"></i></div><div class=\"datas-text pull-right\"><a><span class=bold>404</span></a>Page Not Found</div><div class=clearfix></div></li></ul></div></div><div class=row><div class=\"widget wblue\"><div ht-widget-header title=\"Page Not Found\" allow-collapse=true></div><div class=\"widget-content text-center text-info\"><div class=container>No soup for you!</div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>");
$templateCache.put("app/dashboard/dashboard.html","<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=blightblue><div class=pull-left><i class=\"fa fa-plane\"></i></div><div class=\"datas-text pull-right\"><span class=bold>May 18 - 19, 2015</span> Castle Resort, Neverland</div><div class=clearfix></div></li><li class=borange><div class=pull-left><i class=\"fa fa-envelope\"></i></div><div class=\"datas-text pull-right\"><span class=bold>{{vm.messageCount}}</span> Messages</div><div class=clearfix></div></li></ul></div></div><div class=row><div class=col-md-6><div class=\"widget wviolet\"><div ht-widget-header title=People allow-collapse=true></div><div class=\"widget-content text-center text-info\"><table class=\"table table-condensed table-striped\"><thead><tr><th>First Name</th><th>Last Name</th><th>Age</th><th>Location</th></tr></thead><tbody><tr ng-repeat=\"p in vm.people\"><td>{{p.firstName}}</td><td>{{p.lastName}}</td><td>{{p.age}}</td><td>{{p.location}}</td></tr></tbody></table></div><div class=widget-foot><div class=clearfix></div></div></div></div><div class=col-md-6><div class=\"widget wgreen\"><div ht-widget-header title={{vm.news.title}} allow-collapse=true></div><div class=\"widget-content text-center text-info\"><small>{{vm.news.description}}</small></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></div></section></section>");
$templateCache.put("app/layout/ht-top-nav.html","<nav class=\"navbar navbar-fixed-top navbar-inverse\"><div class=navbar-header><a href=\"/\" class=navbar-brand><span class=brand-title>{{vm.navline.title}}</span></a> <a class=\"btn navbar-btn navbar-toggle\" data-toggle=collapse data-target=.navbar-collapse><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></a></div><div class=\"navbar-collapse collapse\"><div class=\"pull-right navbar-logo\"><ul class=\"nav navbar-nav pull-right\"><li><a ng-href={{vm.navline.link}} target=_blank>{{vm.navline.text}}</a></li></ul></div></div></nav>");
$templateCache.put("app/layout/shell.html","<div ng-controller=\"ShellController as vm\"><header class=clearfix><ht-top-nav navline=vm.navline></ht-top-nav></header><section id=content class=content><div ng-include=\"\'layout/sidebar.html\'\"></div><div ui-view class=shuffle-animation></div><div ngplus-overlay ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><div class=\"page-spinner-message overlay-message\">{{vm.busyMessage}}</div></div></section></div>");
$templateCache.put("app/layout/sidebar.html","<div ng-controller=\"SidebarController as vm\"><ht-sidebar when-done-animating=vm.sidebarReady()><div class=sidebar-filler></div><div class=sidebar-dropdown><a href=#>Menu</a></div><div class=sidebar-inner><div class=sidebar-widget></div><ul class=navi><li class=\"nlightblue fade-selection-animation\" ng-class=vm.isCurrent(r) ng-repeat=\"r in vm.navRoutes\"><a ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li></ul></div></ht-sidebar></div>");
$templateCache.put("app/widgets/widget-header.html","<div class=widget-head><div class=\"page-title pull-left\">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class=\"widget-icons pull-right\"></div><small class=\"pull-right page-title-subtle\" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>");}]);