import React from 'react';
const List = (props) => {
  //const { plcs } = props;
  const plcs = ['dcs', 'fvef'];
  if (!plcs || plcs.length === 0) return <p>No plcs, sorry</p>;
  return (
    <ul>
      <h2 className='list-head'>Available plcs</h2>
      {plcs.map((plc) => {
        return (
          <li key={plc.id} className='list'>
            <span className='plc-text'>{plc.name} </span>
          </li>
        );
      })}
    </ul>
  );
};
export default List;
