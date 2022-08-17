'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">project-name documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApplicationModule.html" data-type="entity-link" >ApplicationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CommonModule-1776e9d35c697571056f72642afc11ad7c2c7a4ce1a429dae829802ec05aca8540ca45c37a2b495e43557812605ade538ff46827471da1c288dee69035a7d0cf"' : 'data-target="#xs-controllers-links-module-CommonModule-1776e9d35c697571056f72642afc11ad7c2c7a4ce1a429dae829802ec05aca8540ca45c37a2b495e43557812605ade538ff46827471da1c288dee69035a7d0cf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommonModule-1776e9d35c697571056f72642afc11ad7c2c7a4ce1a429dae829802ec05aca8540ca45c37a2b495e43557812605ade538ff46827471da1c288dee69035a7d0cf"' :
                                            'id="xs-controllers-links-module-CommonModule-1776e9d35c697571056f72642afc11ad7c2c7a4ce1a429dae829802ec05aca8540ca45c37a2b495e43557812605ade538ff46827471da1c288dee69035a7d0cf"' }>
                                            <li class="link">
                                                <a href="controllers/WelcomeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WelcomeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CommonModule-1776e9d35c697571056f72642afc11ad7c2c7a4ce1a429dae829802ec05aca8540ca45c37a2b495e43557812605ade538ff46827471da1c288dee69035a7d0cf"' : 'data-target="#xs-injectables-links-module-CommonModule-1776e9d35c697571056f72642afc11ad7c2c7a4ce1a429dae829802ec05aca8540ca45c37a2b495e43557812605ade538ff46827471da1c288dee69035a7d0cf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommonModule-1776e9d35c697571056f72642afc11ad7c2c7a4ce1a429dae829802ec05aca8540ca45c37a2b495e43557812605ade538ff46827471da1c288dee69035a7d0cf"' :
                                        'id="xs-injectables-links-module-CommonModule-1776e9d35c697571056f72642afc11ad7c2c7a4ce1a429dae829802ec05aca8540ca45c37a2b495e43557812605ade538ff46827471da1c288dee69035a7d0cf"' }>
                                        <li class="link">
                                            <a href="injectables/LogInterceptor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogInterceptor</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PassengerModule.html" data-type="entity-link" >PassengerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PassengerModule-3fc2c042b9dbe8cdd07107e4d87a65c359d5f28b2576651c587c02133cd1700417e8275d003913b6d6760c347680040d2e61df635ee8508e513c10f205e15ef4"' : 'data-target="#xs-controllers-links-module-PassengerModule-3fc2c042b9dbe8cdd07107e4d87a65c359d5f28b2576651c587c02133cd1700417e8275d003913b6d6760c347680040d2e61df635ee8508e513c10f205e15ef4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PassengerModule-3fc2c042b9dbe8cdd07107e4d87a65c359d5f28b2576651c587c02133cd1700417e8275d003913b6d6760c347680040d2e61df635ee8508e513c10f205e15ef4"' :
                                            'id="xs-controllers-links-module-PassengerModule-3fc2c042b9dbe8cdd07107e4d87a65c359d5f28b2576651c587c02133cd1700417e8275d003913b6d6760c347680040d2e61df635ee8508e513c10f205e15ef4"' }>
                                            <li class="link">
                                                <a href="controllers/PassengerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PassengerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PassengerModule-3fc2c042b9dbe8cdd07107e4d87a65c359d5f28b2576651c587c02133cd1700417e8275d003913b6d6760c347680040d2e61df635ee8508e513c10f205e15ef4"' : 'data-target="#xs-injectables-links-module-PassengerModule-3fc2c042b9dbe8cdd07107e4d87a65c359d5f28b2576651c587c02133cd1700417e8275d003913b6d6760c347680040d2e61df635ee8508e513c10f205e15ef4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PassengerModule-3fc2c042b9dbe8cdd07107e4d87a65c359d5f28b2576651c587c02133cd1700417e8275d003913b6d6760c347680040d2e61df635ee8508e513c10f205e15ef4"' :
                                        'id="xs-injectables-links-module-PassengerModule-3fc2c042b9dbe8cdd07107e4d87a65c359d5f28b2576651c587c02133cd1700417e8275d003913b6d6760c347680040d2e61df635ee8508e513c10f205e15ef4"' }>
                                        <li class="link">
                                            <a href="injectables/PassengerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PassengerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/PassengerController.html" data-type="entity-link" >PassengerController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Passenger.html" data-type="entity-link" >Passenger</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoggerService.html" data-type="entity-link" >LoggerService</a>
                            </li>
                            <li class="link">
                                <a href="classes/PassengerInput.html" data-type="entity-link" >PassengerInput</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LogInterceptor.html" data-type="entity-link" >LogInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PassengerService.html" data-type="entity-link" >PassengerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IConfig.html" data-type="entity-link" >IConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});