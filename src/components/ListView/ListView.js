
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
        data.map((d: any): React$Node => renderItem({
          ...d,
          ...extraData,
        }))
      }
      {
        renderFooter && (
          <footer className="footer">
            {renderFooter()}
          </footer>
        )
      }
    </div>
  );
};

export default ListView;
