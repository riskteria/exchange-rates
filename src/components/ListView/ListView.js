
import React from 'react';
import './ListView.css';

type Props = {
  data: $ReadOnlyArray<any>,
  extraData: any,
  renderItem: React$Node,
  renderFooter: React$Node
}

const ListView = (props: Props) => {
  const {
    data,
    renderItem,
    extraData,
    renderFooter,
  } = props;

  return (
    <div className="list-view">
      {
        data.map((d: any, index: number): React$Node => renderItem({
          ...d,
          ...extraData,
        }, index))
      }
      {
        renderFooter && renderFooter()
      }
    </div>
  )
}

export default ListView;
