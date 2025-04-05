import { useState, useEffect, useRef } from 'react';
import { 
  HiOutlineUserGroup, 
  HiOutlineChartBar, 
  HiOutlineCalendar, 
  HiOutlineUserAdd, 
  HiOutlineDocumentReport, 
  HiOutlineCog,
  HiOutlineFire,
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineHome,
  HiOutlineSearch,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
  HiOutlineCheckCircle,
  HiX // Added X icon for close button
} from 'react-icons/hi';

const CommandCenter = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const inputRef = useRef(null);
  const commandListRef = useRef(null);
  const modalRef = useRef(null); // Add ref for the modal content
  
  // Command categories
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'reports', label: 'Reports' },
    { id: 'admin', label: 'Admin' },
    { id: 'employees', label: 'Employees' }
  ];
  
  // Handle click outside to close the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Mock command suggestions with icon components
  const commands = [
    { 
      id: 'view-attendance', 
      icon: <HiOutlineUserGroup className="w-5 h-5" />, 
      label: "View today's attendance", 
      category: "attendance",
      description: "Check who's present today"
    },
    { 
      id: 'analytics', 
      icon: <HiOutlineChartBar className="w-5 h-5" />, 
      label: "Analytics dashboard", 
      category: "reports",
      description: "View attendance trends and insights"
    },
    { 
      id: 'schedule', 
      icon: <HiOutlineCalendar className="w-5 h-5" />, 
      label: "Schedule management", 
      category: "admin",
      description: "Manage employee schedules and shifts"
    },
    { 
      id: 'add-employee', 
      icon: <HiOutlineUserAdd className="w-5 h-5" />, 
      label: "Add new employee", 
      category: "employees",
      description: "Register a new employee in the system"
    },
    { 
      id: 'monthly-report', 
      icon: <HiOutlineDocumentReport className="w-5 h-5" />, 
      label: "Generate monthly report", 
      category: "reports",
      description: "Create detailed monthly attendance report"
    },
    { 
      id: 'settings', 
      icon: <HiOutlineCog className="w-5 h-5" />, 
      label: "System settings", 
      category: "admin",
      description: "Configure system preferences and options"
    },
    { 
      id: 'home', 
      icon: <HiOutlineHome className="w-5 h-5" />, 
      label: "Go to homepage", 
      category: "navigation",
      description: "Return to the main dashboard"
    },
    { 
      id: 'alerts', 
      icon: <HiOutlineBell className="w-5 h-5" />, 
      label: "View notifications", 
      category: "admin",
      description: "Check system notifications and alerts"
    },
    { 
      id: 'bookmarks', 
      icon: <HiOutlineBookmark className="w-5 h-5" />, 
      label: "Saved reports", 
      category: "reports",
      description: "Access your bookmarked reports"
    },
    { 
      id: 'trends', 
      icon: <HiOutlineFire className="w-5 h-5" />, 
      label: "Attendance trends", 
      category: "attendance",
      description: "Analyze attendance patterns over time"
    }
  ];
  
  // Filter commands based on query and active category
  const filteredCommands = commands
    .filter(cmd => {
      // Filter by search query
      const matchesQuery = query.length === 0 || 
        cmd.label.toLowerCase().includes(query.toLowerCase()) || 
        cmd.description.toLowerCase().includes(query.toLowerCase());
      
      // Filter by category
      const matchesCategory = activeCategory === 'all' || cmd.category === activeCategory;
      
      return matchesQuery && matchesCategory;
    });
  
  // Reset active index when filtered results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query, activeCategory]);
  
  // Focus the input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Scroll active item into view
  useEffect(() => {
    if (commandListRef.current && filteredCommands.length > 0) {
      const activeElement = commandListRef.current.children[activeIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ 
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredCommands.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        break;
      case 'Enter':
        if (filteredCommands[activeIndex]) {
          executeCommand(filteredCommands[activeIndex]);
        }
        break;
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  };
  
  const executeCommand = (command) => {
    console.log(`Executing: ${command.label}`);
    // Implementation would depend on the specific command
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-start justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={() => onClose()} // Close when clicking the backdrop
    >
      <div 
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl dark:bg-gray-900 overflow-hidden mt-4 sm:mt-16 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the modal itself
      >
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or type a command..."
              className="w-full pl-10 pr-10 py-2.5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute right-3 top-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              aria-label="Close command center"
            >
              <HiX className="h-5 w-5" />
            </button>
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-60" ref={commandListRef}>
          {filteredCommands.length > 0 ? (
            <div className="py-2">
              {filteredCommands.map((command, index) => (
                <button
                  key={command.id}
                  className={`w-full px-4 py-2 flex items-center gap-3 text-left transition-colors ${
                    index === activeIndex 
                      ? 'bg-blue-50 dark:bg-blue-900/30' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => executeCommand(command)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                    index === activeIndex 
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {command.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium truncate ${
                      index === activeIndex 
                        ? 'text-blue-700 dark:text-blue-400' 
                        : 'text-gray-800 dark:text-gray-300'
                    }`}>
                      {command.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {command.description}
                    </div>
                  </div>
                  {index === activeIndex && (
                    <HiOutlineCheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 ml-2 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              <HiOutlineSearch className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>No commands found for "{query}"</p>
              <p className="text-sm mt-1">Try a different search term or category</p>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
          <div className="flex justify-between flex-wrap gap-y-2">
            <div className="flex gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="flex gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600">
                    <HiOutlineArrowUp className="h-3 w-3" />
                  </kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600">
                    <HiOutlineArrowDown className="h-3 w-3" />
                  </kbd>
                </span>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600">Enter</kbd>
                Select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600">Esc</kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;