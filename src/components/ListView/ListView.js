
import './ListView.css';

type Props = {
  data: $ReadOnlyArray<ItemT>,
  renderItem: React$Node<any>
}

const ListView = (props: Props) => {
  const { data, renderItem } = props;
  return data.map((d: any): React$Node => renderItem(d));
}

export default ListView;
