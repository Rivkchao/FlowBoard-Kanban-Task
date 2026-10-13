import React from 'react';

/**
 * DropIndicator component renders a visual drop indicator line
 * when a card is being dragged over a potential drop position.
 */
export const DropIndicator = ({ beforeId, columnId }) => {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={columnId}
      className="my-1 h-1.5 w-full rounded-full bg-indigo-500 opacity-0 transition-opacity duration-150 pointer-events-none drop-indicator shadow-[0_0_8px_rgba(99,102,241,0.8)]"
    />
  );
};
