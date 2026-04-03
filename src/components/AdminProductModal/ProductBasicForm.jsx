const ProductBasicForm = ({ templateProduct, handleTemplateChange }) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          標題 <span className="text-danger">*</span>
        </label>
        <input
          id="title"
          type="text"
          className="form-control"
          placeholder="請輸入標題"
          value={templateProduct.title}
          onChange={handleTemplateChange}
        />
      </div>

      <div className="row">
        <div className="mb-3 col-md-6">
          <label htmlFor="category" className="form-label">
            分類 <span className="text-danger">*</span>
          </label>
          <input
            id="category"
            type="text"
            className="form-control"
            placeholder="請輸入分類"
            value={templateProduct.category}
            onChange={handleTemplateChange}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="unit" className="form-label">
            單位 <span className="text-danger">*</span>
          </label>
          <input
            id="unit"
            type="text"
            className="form-control"
            placeholder="請輸入單位"
            value={templateProduct.unit}
            onChange={handleTemplateChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="mb-3 col-md-6">
          <label htmlFor="origin_price" className="form-label">
            原價 <span className="text-danger">*</span>
          </label>
          <input
            id="origin_price"
            type="number"
            min="0"
            className="form-control"
            placeholder="請輸入原價"
            value={templateProduct.origin_price}
            onChange={handleTemplateChange}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="price" className="form-label">
            售價 <span className="text-danger">*</span>
          </label>
          <input
            id="price"
            type="number"
            min="0"
            className="form-control"
            placeholder="請輸入售價"
            value={templateProduct.price}
            onChange={handleTemplateChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="stock" className="form-label">
          庫存
        </label>
        <input
          id="stock"
          type="number"
          min="0"
          className="form-control"
          placeholder="請輸入庫存"
          value={templateProduct.stock}
          onChange={handleTemplateChange}
        />
      </div>
    </>
  );
};

export default ProductBasicForm;
