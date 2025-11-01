import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import type { ToolType } from '../types';

import { selectedToolAtom } from '../atoms/canvasAtoms';

interface ToolMenuProps {
  children: React.ReactNode;
  target: React.ReactNode;
  width: number;
  tool: ToolType;
}

function ToolMenu({ children, target, width, tool }: ToolMenuProps) {
  const [, setSelectedTool] = useAtom(selectedToolAtom);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSelectedTool]);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => {
          if (!isOpen) setSelectedTool(tool);
          setIsOpen(!isOpen);
        }}
        type="button"
      >
        {target}
      </button>
      {isOpen && (
        <div
          className="absolute p-2 top-full mt-2 bg-white border border-gray-300 rounded-md shadow z-10"
          style={{ width }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
export default ToolMenu;
