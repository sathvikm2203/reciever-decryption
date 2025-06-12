
import { useEffect } from 'react';

export const useSecurityBlocking = () => {
  useEffect(() => {
    // Block right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Block common screenshot and copy shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+P
      if (e.ctrlKey && ['s', 'a', 'c', 'v', 'p'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return false;
      }
      
      // Block F12 (Dev Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Block Ctrl+Shift+I (Dev Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      
      // Block Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      
      // Block Print Screen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }
    };

    // Block drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Block text selection on sensitive content
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-no-select]') || target.style.userSelect === 'none') {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);

    // Disable developer tools (basic attempt)
    const devToolsChecker = setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200 || 
          window.outerWidth - window.innerWidth > 200) {
        console.clear();
        console.warn('Developer tools detected. Access restricted.');
      }
    }, 1000);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      clearInterval(devToolsChecker);
    };
  }, []);
};
