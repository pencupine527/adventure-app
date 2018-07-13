import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div className="text-center m-auto">
      <div style={{ padding: '4%' }} />
      <i className="fas fa-spinner fa-spin fa-2x" alt="Loading..." />
      <div style={{ padding: '4%' }} />
    </div>
  );
};
