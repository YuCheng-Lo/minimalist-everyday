import { formatPrice } from "../utils/formatPrice";

const ProductTable = ({ products, openModal }) => {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="120">庫存</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        {products && products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.category}</td>
              <td>{product.title}</td>
              <td>{formatPrice(product.origin_price)}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{product.stock}</td>
              <td>
                {product.is_enabled ? (
                  <span className="text-success">啟用</span>
                ) : (
                  <span className="text-failed">未啟用</span>
                )}
              </td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      openModal("edit", product);
                    }}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      openModal("delete", product);
                    }}
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">尚無產品資料</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
