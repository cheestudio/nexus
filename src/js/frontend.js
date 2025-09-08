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
			accessibleLinkCards();
			headerSearchToggle();
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
						const $dropdownToggle = item.querySelector('.dropdown-toggle');
						if ($dropdownToggle) {
							$dropdownToggle.setAttribute('aria-expanded', 'false');
						} else {
							item.setAttribute('aria-expanded', 'false');
						}
						if ($submenu) {
							$submenu.setAttribute('aria-hidden', 'true');
							$submenu.setAttribute('inert', '');
						}
					});
					if ($elt) {
						const $dropdownToggle = $elt.querySelector('.dropdown-toggle');
						if ($dropdownToggle) {
							$dropdownToggle.setAttribute('aria-expanded', 'true');
						} else {
							$elt.setAttribute('aria-expanded', 'true');
						}
						const $submenu = $elt.querySelector('.dropdown');
						if ($submenu) {
							$submenu.removeAttribute('inert');
							setTimeout(() => {
								$submenu.setAttribute('aria-hidden', 'false');
							}, 1);
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
							const $dropdownToggle = closest.querySelector('.dropdown-toggle');
							if ($dropdownToggle) {
								$dropdownToggle.setAttribute('aria-expanded', 'false');
							} else {
								closest.setAttribute('aria-expanded', 'false');
							}
							const submenu = closest.querySelector('.dropdown');
							if (submenu) {
								submenu.setAttribute('inert', '');
								submenu.setAttribute('aria-hidden', 'true');
							}
						}
					}
				};

				const clickDropdownToggle = (e) => {
					e.preventDefault();
					e.stopPropagation();

					const $parentItem = e.target.closest('.menu-item-has-children');
					if (!$parentItem) return;

					$dropdownItems.forEach(item => {
						if (item === $parentItem) {
							const itemToShow = item.classList.contains('clicked') ? null : item;
							toggleAriaOnSubmenus(itemToShow);
							item.classList.toggle('clicked');
						} else {
							item.classList.remove('clicked');
						}
					});
				};

				const clickTopLevelLink = (e) => {
					if ($toggle && $toggle.offsetParent !== null && document.documentElement.getAttribute('data-whatinput') === 'mouse') {
						return;
					}
					if ($toggle && $toggle.offsetParent === null) {
						return;
					}
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

				const createDropdownToggle = () => {
					const $toggle = document.createElement('button');
					$toggle.className = 'dropdown-toggle';
					$toggle.setAttribute('aria-label', 'Toggle submenu');
					$toggle.setAttribute('tabindex', '0');
					$toggle.innerHTML = '<span class="sr-only">Toggle submenu</span>';
					return $toggle;
				};

				const initDropdownItemListeners = () => {
					$dropdownItems.forEach($item => {
						$item.setAttribute('aria-haspopup', 'true');

						const $dropdownToggle = createDropdownToggle();
						const $link = $item.querySelector(':scope > a');
						if ($link) {
							$link.parentNode.insertBefore($dropdownToggle, $link.nextSibling);
						}

						$dropdownToggle.addEventListener('click', clickDropdownToggle);
						$dropdownToggle.addEventListener('keydown', (e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								clickDropdownToggle(e);
							}
						});

						if ($link) {
							$link.addEventListener('click', clickTopLevelLink);
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

		/* Header Search Toggle
		========================================================= */
		const headerSearchToggle = () => {
			const searchToggleButton = document.querySelector('.header-search-toggle button');
			const searchAgainButton = document.querySelector('.external-search-trigger');
			const searchForm = document.querySelector('#header-search-form');
			const searchInput = searchForm?.querySelector('input[type="text"]');
			if (!searchToggleButton || !searchForm) return;

			const openSearchForm = () => {
				searchForm.setAttribute('aria-hidden', 'false');
				searchForm.style.display = 'block';
				searchForm.style.opacity = '0';
				searchForm.style.transform = 'translateY(10px)';
				requestAnimationFrame(() => {
					searchForm.style.opacity = '1';
					searchForm.style.transform = 'translateY(0)';
				});

				setTimeout(() => {
					searchInput.focus();
				}, 300);
			};

			const closeSearchForm = () => {
				searchForm.style.opacity = '0';
				searchForm.style.transform = 'translateY(10px)';
				searchInput.value = '';
				setTimeout(() => {
					searchForm.style.display = 'none';
					searchForm.setAttribute('aria-hidden', 'true');
				}, 300);
			};

			const handleToggleClick = (e) => {
				e.preventDefault();
				const isHidden = searchForm.getAttribute('aria-hidden') === 'true';
				if (isHidden) {
					openSearchForm();
				} else {
					closeSearchForm();
				}
			};

			const handleDocumentClick = (event) => {
				const isClickInside = searchForm.contains(event.target) || searchToggleButton.contains(event.target);
				if (!isClickInside) {
					closeSearchForm();
				}
			};

			const handleEscKeydown = (event) => {
				if (event.key === 'Escape') {
					closeSearchForm();
				}
			};

			const handleKeyboardShortcut = (event) => {
				if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
					event.preventDefault();
					const isHidden = searchForm.getAttribute('aria-hidden') === 'true';
					if (isHidden) {
						openSearchForm();
					} else {
						closeSearchForm();
					}
				}
			};

			document.addEventListener('keydown', handleKeyboardShortcut);
			searchToggleButton.addEventListener('click', handleToggleClick);
			document.addEventListener('click', handleDocumentClick);
			document.addEventListener('keydown', handleEscKeydown);
			if (searchAgainButton) {
				searchAgainButton.addEventListener('click', handleToggleClick);
			}

		};

			// Enables links for cards and other elements that need the entire element to be clickable
			const accessibleLinkCards = () => {

				const selectors = ['.wcag-card']; // add elements to array if needed
	
				const cardElements = document.querySelectorAll(selectors.join(', '));
				if (!cardElements.length) return;
	
				cardElements.forEach((card) => {
	
					const firstAnchor = card.querySelector('a');
					if (!firstAnchor) return; 
	
					const anchorUrl = firstAnchor.href;
					const anchorTarget = firstAnchor.target;
	
					const navigateToLink = () => {
						if (anchorTarget === '_blank') {
							window.open(anchorUrl, "_blank");
						} else {
							window.location.href = anchorUrl;
						}
					};
	
					const handleCardClick = (event) => {
						// Only navigate if the user didn't click on an interactive element directly.
						if (!event.target.closest('a, button, input')) {
							navigateToLink();
						}
					};
	
					const handleCardKeydown = (event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault(); 
							navigateToLink();
						}
					};
	
					
					const getAccessibleName = () => {
						// use heading
						const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
						if (heading && heading.textContent.trim()) {
							return heading.textContent.trim();
						}
	
						// if not, use link text
						if (firstAnchor.textContent.trim()) {
							return firstAnchor.textContent.trim();
						}
	
						// if not, use aria-label
						if (firstAnchor.getAttribute('aria-label')) {
							return firstAnchor.getAttribute('aria-label');
						}
	
						// generic
						return 'Read more';
					}
	
					// remove tab focus from all nested links to avoid redundant focus stops
					const allLinks = card.querySelectorAll('a');
					allLinks.forEach((link) => {
						link.setAttribute('tabindex', '-1');
					});
	
					// Set WCAG attributes on the card itself.
					card.style.cursor = 'pointer';
					card.setAttribute('tabindex', '0');
					card.setAttribute('role', 'link');
					card.setAttribute('aria-label', getAccessibleName());
	
					// allow for text selection.
					card.addEventListener('click', (event) => {
						if (window.getSelection().toString().length === 0) {
							handleCardClick(event);
						}
					});
					
					card.addEventListener('keydown', handleCardKeydown);
					
				});
			};

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
