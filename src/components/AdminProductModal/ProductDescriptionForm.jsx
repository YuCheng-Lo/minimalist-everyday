const ProductDescriptionForm = ({ templateProduct, handleTemplateChange }) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          產品描述 <span className="text-danger">*</span>
        </label>
        <textarea
          id="description"
          className="form-control"
          placeholder="請輸入產品描述"
          value={templateProduct.description}
          onChange={handleTemplateChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          說明內容
        </label>
        <textarea
          id="content"
          className="form-control"
          placeholder="請輸入說明內容"
          value={templateProduct.content}
          onChange={handleTemplateChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <div className="form-check">
          <input
            id="is_enabled"
            className="form-check-input"
            type="checkbox"
            checked={templateProduct.is_enabled}
            onChange={handleTemplateChange}
          />
          <label className="form-check-label" htmlFor="is_enabled">
            是否啟用
          </label>
        </div>
      </div>
    </>
  );
};

export default ProductDescriptionForm;
