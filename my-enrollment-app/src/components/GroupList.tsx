import React from 'react';
import ListComponent from './ListComponent';



const GroupList = ({ groups, onEditGroup, onDeleteGroup, onCreateGroup }) => {

  return (
    <ListComponent
      title="Groups"
      items={groups}
      renderItem={(group) => (
        <div className="space-y-2">
          <div className="text-lg font-semibold">{group.name}</div>
          <div className="text-sm text-gray-600">
            {(group.plans && group.plans.length > 0) && group.plans.join(', ')}
          </div>
        </div>
      )}
       onEdit={onEditGroup}
      onDelete={onDeleteGroup}
      onCreate={onCreateGroup}
    />
  );
};

export default GroupList;
