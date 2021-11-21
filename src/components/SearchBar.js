// Custom
import Selector from "src/utils/Selector"
//--------------------
export default function SearchBar() {
  return (
    <>
      <p>
        <span>搜尋結果</span>
        <small>共 999 筆</small>
      </p>
      <div className="mt8" />
      <div style={{ display: 'flex' }}>
        <Selector />
        <Selector />
      </div>
    </>
  );
}