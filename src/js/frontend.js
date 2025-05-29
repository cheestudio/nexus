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
			const $menu = document.getElementById( 'menu-primary-nav' );
			if ( !$menu ) return

			const toggleAriaOnSubmenus = ( $elt = null ) => {
					for ( const item of $dropdownItems ) {
						const $submenu = item.querySelector( '.dropdown' );
						item.setAttribute( 'aria-expanded', 'false' );
						$submenu.setAttribute( 'aria-hidden', 'true' );
						$submenu.setAttribute( 'inert', '' );
					}
					if ( $elt ) {
						$elt.setAttribute( 'aria-expanded', 'true' );
						$elt.querySelector( '.dropdown' ).removeAttribute( 'inert' );

						// fix bizarre safari issue: removing 'inert' also resets aria-hidden unless we specifically delay setting the desired value
						setTimeout( () => {
							$elt.querySelector( '.dropdown' ).setAttribute( 'aria-hidden', 'false' );
						}, 1 );
					}
				},
				hoverIntentOver = ( e ) => {
					// don't do anything if in mobile view (i.e. the toggle is visible)
					if ( $toggle.offsetParent !== null ) return;

					for ( const item of $dropdownItems ) {
						if ( item.contains( e.target ) ) {
							item.classList.add( 'hover' );
							toggleAriaOnSubmenus( item );
						} else {
							item.classList.remove( 'clicked' );
						}
					}
				},
				hoverIntentOut = ( e ) => {
					// don't do anything if in mobile view (i.e. the toggle is visible)
					if ( $toggle.offsetParent !== null ) return;

					const closest = e.target.closest( '.menu-item-has-children' );
					closest.classList.remove( 'hover' );
					if ( !closest.classList.contains( 'clicked' ) ) {
						closest.setAttribute( 'aria-expanded', 'false' );
						closest.querySelector( '.dropdown' ).setAttribute( 'inert', '' );
						closest.querySelector( '.dropdown' ).setAttribute( 'aria-hidden', 'true' );
					}
				},
				click = ( e ) => {
					// don't do anything if in desktop view (i.e. the toggle is hidden) and using a mouse
					if ( $toggle.offsetParent === null && document.documentElement.getAttribute( 'data-whatinput' ) === 'mouse' ) return;

					e.preventDefault();
					for ( const item of $dropdownItems ) {
						if ( item.contains( e.target ) ) {
							const itemToShow = item.classList.contains( 'clicked' ) ? null : item;
							toggleAriaOnSubmenus( itemToShow );
							item.classList.toggle( 'clicked' );
						} else {
							item.classList.remove( 'clicked' );
						}
					}
				},
				toggleCollapsible = ( e, hidden = null ) => {
					hidden = hidden !== null ? hidden : $collapsible.getAttribute( 'aria-hidden' ) === 'false';

					if ( hidden )
						$collapsible.setAttribute( 'inert', '' );
					else
						$collapsible.removeAttribute( 'inert' );

					// fix bizarre safari issue: removing 'inert' also resets aria-hidden unless we specifically delay setting the desired value
					setTimeout( () => {
						$toggle.setAttribute( 'aria-expanded', !hidden );
						$collapsible.setAttribute( 'aria-hidden', hidden );
					}, 1 );
				},
				closeMenus = () => {
					toggleAriaOnSubmenus()
					for ( const item of $dropdownItems ) {
						item.classList.remove( 'hover' );
						item.classList.remove( 'clicked' );
					}
				},
				initDropdownItemListeners = () => {
					for ( const $item of $dropdownItems ) {
						$item.setAttribute( 'aria-haspopup', 'true' );
						$item.querySelector( ':scope > a' ).addEventListener( 'click', click, true );
						hoverintent( $item, hoverIntentOver, hoverIntentOut ).options( {
							timeout: 200,
							interval: 30,
							sensitivity: 3
						} );
					}
				},
				closeMenusIfClickOutside = ( e ) => {
					// distinguish clicks on the actual $collapsible vs its generated content (i.e. the shaded overlay)
					let clickedActualCollapsible = $collapsible.contains( e.target ) && $collapsible !== e.target;

					// close collapsible if in mobile view (toggle has offsetParent) and clicked outside both $toggle and $collapsible
					if ( $toggle.offsetParent !== null && !$toggle.contains( e.target ) && !clickedActualCollapsible ) {
						toggleCollapsible( null, true );
					}

					// close menus if clicked outside every $dropdownItem
					if ( [...$dropdownItems].every( item => !item.contains( e.target ) ) ) {
						closeMenus();
					}
				}


			const $dropdownItems = $menu.querySelectorAll( ':scope > .menu-item-has-children' ),
				$toggle = document.getElementById( 'primary-menu-toggle' ),
				$collapsible = document.getElementById( 'site-navigation' );

			// Clicking the toggle button toggles the collapsible element
			$toggle.addEventListener( 'click', toggleCollapsible );

			// Close expanded dropdowns on click outside
			document.addEventListener( 'click', closeMenusIfClickOutside );

			// Close expanded dropdowns on keypress (unless pressed ctrl / command, e.g. for opening links in new tabs)
			document.addEventListener( 'keydown', ( e ) => {
				if ( e.key === 'Control' || e.key === 'Meta' ) {
					return;
				}
				closeMenusIfClickOutside( e );
			} );

			// On resize, close expanded dropdowns and update aria attributes for the toggle and collapsible 
			let screenWidth = window.innerWidth;
			window.addEventListener( 'resize', throttle( () => {
				if ( screenWidth === window.innerWidth ) return; // on mobile, scrolling vertically can trigger resize if the browser chrome resizes
				closeMenus();
				toggleCollapsible( null, $toggle.offsetParent !== null );
				screenWidth = window.innerWidth;
			}, 50 ) );

			// Initialize on pageload
			toggleCollapsible( null, $toggle.offsetParent !== null );
			initDropdownItemListeners();
			toggleAriaOnSubmenus();

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
