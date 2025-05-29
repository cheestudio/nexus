const macTabs = () => {
  const tabsContainers = document.querySelectorAll('.chee-tabs');

  tabsContainers.forEach((tabsContainer) => {
    // Find all tab items
    const tabContents = tabsContainer.querySelectorAll('.chee-tab-item');
    if (!tabContents.length) return;

    // Create tabs navigation if it doesn't exist
    const tabNavList = tabsContainer.querySelector('.chee-tabs__nav-list');
    if (!tabNavList.children.length) {
      // Generate tabs based on tab items
      tabContents.forEach((tabContent, index) => {
        const tabTitle = tabContent.getAttribute('data-title') || `Tab ${index + 1}`;
        const tabId = `tab-${tabContent.id}-${index}`;
        const panelId = `panel-${tabContent.id}-${index}`;
        
        // Create tab button
        const tabItem = document.createElement('li');
        tabItem.className = 'chee-tabs__nav-item';
        tabItem.setAttribute('role', 'presentation');
        
        const tabButton = document.createElement('button');
        tabButton.className = 'chee-tabs__nav-button';
        tabButton.setAttribute('role', 'tab');
        tabButton.setAttribute('id', tabId);
        tabButton.setAttribute('aria-controls', panelId);
        tabButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        tabButton.setAttribute('tabindex', index === 0 ? '0' : '-1');
        tabButton.textContent = tabTitle;
        
        tabItem.appendChild(tabButton);
        tabNavList.appendChild(tabItem);
        
        // Set ARIA attributes for the tab content
        tabContent.setAttribute('role', 'tabpanel');
        tabContent.setAttribute('id', panelId);
        tabContent.setAttribute('aria-labelledby', tabId);
        tabContent.setAttribute('tabindex', '0');
        tabContent.setAttribute('hidden', index !== 0);
      });
    }
    
    // Set up tab functionality
    const tabButtons = tabNavList.querySelectorAll('.chee-tabs__nav-button');
    
    tabButtons.forEach((tabButton, index) => {
      // Click event
      tabButton.addEventListener('click', () => {
        activateTab(tabsContainer, index);
      });
      
      // Keyboard navigation
      tabButton.addEventListener('keydown', (event) => {
        const tabCount = tabButtons.length;
        let newIndex = index;
        
        switch (event.key) {
          case 'ArrowRight':
            newIndex = (index + 1) % tabCount;
            break;
          case 'ArrowLeft':
            newIndex = (index - 1 + tabCount) % tabCount;
            break;
          case 'Home':
            newIndex = 0;
            break;
          case 'End':
            newIndex = tabCount - 1;
            break;
          default:
            return;
        }
        
        if (newIndex !== index) {
          event.preventDefault();
          tabButtons[newIndex].focus();
          activateTab(tabsContainer, newIndex);
        }
      });
    });
    
    // Set first tab as active by default
    activateTab(tabsContainer, 0);
  });

  // Function to activate a tab
  function activateTab(tabsContainer, activeIndex) {
    const tabButtons = tabsContainer.querySelectorAll('.chee-tabs__nav-button');
    const tabContents = tabsContainer.querySelectorAll('.chee-tab-item');
    
    tabButtons.forEach((button, index) => {
      const isActive = index === activeIndex;
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      button.setAttribute('tabindex', isActive ? '0' : '-1');
      button.parentElement.classList.toggle('active', isActive);
    });
    
    tabContents.forEach((content, index) => {
      if (index === activeIndex) {
        content.removeAttribute('hidden');
      } else {
        content.setAttribute('hidden', true);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', macTabs); 