import { useEffect, useRef, useState } from 'react';

interface ToolMenuProps {
  children: React.ReactNode;
  target: React.ReactNode;
  onClose?(): void;
}

function ToolMenu({ children, target, onClose }: ToolMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="relative inline-block" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} type="button">
        {target}
      </button>
      {isOpen && (
        <div className="absolute p-2 top-full mt-2 w-[400px] bg-white border border-gray-300 rounded-md shadow z-10">
          {children}
        </div>
      )}
    </div>
  );
}
export default ToolMenu;
