import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface ListComponentProps {
  title: string;
  items: Array<any>;
  renderItem: (item: any) => React.ReactNode;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onCreate: () => void; // Add handler for create action
}

const ListComponent: React.FC<ListComponentProps> = ({ title, items = [], renderItem, onEdit, onDelete, onCreate }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="p-4 mb-3 border border-gray-300 rounded-lg bg-white shadow-sm flex justify-between items-center"
          >
            <div>{renderItem(item)}</div>
            <div className="flex space-x-3">
              {/* Edit Icon */}
              <button
                onClick={() => onEdit(item)}
                className="text-blue-500 hover:text-blue-700"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              {/* Delete Icon */}
              <button
                onClick={() => onDelete(item)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Create Button */}
      <button
        onClick={onCreate}
        className="flex items-center text-green-500 hover:text-green-700 mt-4"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add {title}
      </button>
    </div>
  );
};

export default ListComponent;
