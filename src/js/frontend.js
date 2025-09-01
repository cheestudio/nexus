import 'what-input';
import hoverintent from 'hoverintent'

const CHEENAMESPACE_theme = (
	() => {
		'use strict'

		const publicAPIs = {}

		publicAPIs.init = () => {
			// functions that need to wait for the DOM to load
			if (document.readyState === 'interactive' || document.readyState === 'complete') {
				constructorEarly();
			} else {
				document.addEventListener('DOMContentLoaded', constructorEarly);
			}

			// functions that need to wait for the DOM and images/stylesheets to load
			if (document.readyState === 'complete') {
				constructorLate();
			} else {
				window.addEventListener('load', constructorLate);
			}
		}

		const constructorEarly = () => {
			// Functions to initialize early
			helloWorldEarly();
		}

		const constructorLate = () => {
			// Functions to initialize late
			helloWorldLate();
			initNavigation();
		}

		const helloWorldEarly = () => {
			console.log('Hello World Early');
		}

		const helloWorldLate = () => {
			console.log('Hello World Late');
		}

		const initNavigation = () => {
			const navInstances = document.querySelectorAll('.chee-nav-element');
			if (!navInstances.length) return;

			navInstances.forEach((navInstance) => {
				const $menu = navInstance.querySelector('.header-menu');
				if (!$menu) return;

				const $dropdownItems = $menu.querySelectorAll(':scope > .menu-item-has-children');
				const $toggle = document.getElementById('primary-menu-toggle');
				const $collapsible = document.getElementById('site-navigation');

				const toggleAriaOnSubmenus = ($elt = null) => {
					$dropdownItems.forEach(item => {
						const $submenu = item.querySelector('.dropdown');
						item.setAttribute('aria-expanded', 'false');
						if ($submenu) {
							$submenu.setAttribute('aria-hidden', 'true');
							$submenu.setAttribute('inert', '');
						}
					});
					if ($elt) {
						$elt.setAttribute('aria-expanded', 'true');
						const $submenu = $elt.querySelector('.dropdown');
						if ($submenu) {
							$submenu.removeAttribute('inert');
							$submenu.setAttribute('aria-hidden', 'false');
						}
					}
				};

				const hoverIntentOver = (e) => {
					if ($toggle && $toggle.offsetParent !== null) return;
					$dropdownItems.forEach(item => {
						if (item.contains(e.target)) {
							item.classList.add('hover');
							toggleAriaOnSubmenus(item);
						} else {
							item.classList.remove('clicked');
						}
					});
				};

				const hoverIntentOut = (e) => {
					if ($toggle && $toggle.offsetParent !== null) return;
					const closest = e.target.closest('.menu-item-has-children');
					if (closest) {
						closest.classList.remove('hover');
						if (!closest.classList.contains('clicked')) {
							closest.setAttribute('aria-expanded', 'false');
							const submenu = closest.querySelector('.dropdown');
							if (submenu) {
								submenu.setAttribute('inert', '');
								submenu.setAttribute('aria-hidden', 'true');
							}
						}
					}
				};

				const clickHandler = (e) => {
					if ($toggle && $toggle.offsetParent === null && document.documentElement.getAttribute('data-whatinput') === 'mouse') return;
					e.preventDefault();
					$dropdownItems.forEach(item => {
						if (item.contains(e.target)) {
							const itemToShow = item.classList.contains('clicked') ? null : item;
							toggleAriaOnSubmenus(itemToShow);
							item.classList.toggle('clicked');
						} else {
							item.classList.remove('clicked');
						}
					});
				};

				const toggleCollapsible = (e, hidden = null) => {
					hidden = hidden !== null ? hidden : $collapsible.getAttribute('aria-hidden') === 'false';
					if (hidden)
						$collapsible.setAttribute('inert', '');
					else
						$collapsible.removeAttribute('inert');
					setTimeout(() => {
						if ($toggle) $toggle.setAttribute('aria-expanded', !hidden);
						$collapsible.setAttribute('aria-hidden', hidden);
					}, 1);
				};

				const closeMenus = () => {
					toggleAriaOnSubmenus();
					$dropdownItems.forEach(item => {
						item.classList.remove('hover');
						item.classList.remove('clicked');
					});
				};

				const initDropdownItemListeners = () => {
					$dropdownItems.forEach($item => {
						$item.setAttribute('aria-haspopup', 'true');
						const link = $item.querySelector(':scope > a');
						if (link) {
							link.addEventListener('click', clickHandler, true);
						}
						hoverintent($item, hoverIntentOver, hoverIntentOut).options({
							timeout: 200,
							interval: 30,
							sensitivity: 3
						});
					});
				};

				const closeMenusIfClickOutside = (e) => {
					let clickedActualCollapsible = $collapsible && $collapsible.contains(e.target) && $collapsible !== e.target;
					if ($toggle && $toggle.offsetParent !== null && !$toggle.contains(e.target) && !clickedActualCollapsible) {
						toggleCollapsible(null, true);
					}
					if (![...$dropdownItems].some(item => item.contains(e.target))) {
						closeMenus();
					}
				};

				if ($toggle && $collapsible) {
					$toggle.addEventListener('click', toggleCollapsible);
				}
				document.addEventListener('click', closeMenusIfClickOutside);
				document.addEventListener('keydown', (e) => {
					if (e.key === 'Control' || e.key === 'Meta') return;
					closeMenusIfClickOutside(e);
				});

				let screenWidth = window.innerWidth;
				window.addEventListener('resize', throttle(() => {
					if (screenWidth === window.innerWidth) return;
					closeMenus();
					toggleCollapsible(null, $toggle && $toggle.offsetParent !== null);
					screenWidth = window.innerWidth;
				}, 50));

				if ($toggle) {
					toggleCollapsible(null, $toggle.offsetParent !== null);
				}
				initDropdownItemListeners();
				toggleAriaOnSubmenus();
			});
		}

		const throttle = (fn, delay) => {
			let timeout = null;
			return (...args) => {
				if (!timeout) {
					timeout = setTimeout(() => {
						timeout = null;
						fn(...args);
					}, delay);
				}
			};
		}

		return publicAPIs
	}
)();

CHEENAMESPACE_theme.init()
