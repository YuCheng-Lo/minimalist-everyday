const ProductImagesForm = ({
  templateProduct,
  handleMainImageUrlChange,
  handleImagesUrlChange,
  handleUploadImage,
  addImage,
  deleteImage,
}) => {
  //如果是undefined，就給空陣列
  const images = templateProduct.imagesUrl || [];
  //避免[images.length - 1]運算結果為-1
  const lastImageIsEmpty =
    images.length > 0 && images[images.length - 1] === "";

  const handleImageError = (e) => {
    const img = e.currentTarget;
    img.onerror = null; // 確保只執行一次，防止無限噴錯
    img.src = "https://placehold.co/600x400?text=No+Image";
  };
  return (
    <>
      <div className="mb-2">
        <div className="mb-5">
          <label htmlFor="fileUpdate" className="form-label">
            上傳圖片
          </label>
          <input
            type="file"
            className="form-control mb-2"
            id="fileUpdate"
            onChange={(e) => handleUploadImage(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            輸入圖片網址
          </label>
          <input
            type="url" //
            className="form-control"
            placeholder="請輸入圖片連結"
            value={templateProduct.imageUrl}
            onChange={handleMainImageUrlChange}
          />
        </div>
        {/* 只有當有網址時才顯示img */}
        {templateProduct.imageUrl && (
          <img
            className="img-fluid"
            src={templateProduct.imageUrl}
            alt="主圖"
            onError={handleImageError}
          />
        )}
      </div>
      <div>
        {images.map((imageUrl, index) => {
          return (
            <div key={index} className="mb-2">
              <input
                type="url" //
                className="form-control mb-2"
                placeholder={`圖片網址${index + 1}`}
                value={imageUrl}
                onChange={(e) => handleImagesUrlChange(e, index)}
              />
              {/* 只有當有網址時才顯示img */}
              {imageUrl && (
                <img
                  className="img-fluid"
                  src={imageUrl}
                  alt={`副圖${index + 1}`}
                  onError={handleImageError}
                />
              )}
            </div>
          );
        })}
      </div>
      <div>
        <button
          className="btn btn-outline-primary btn-sm d-block w-100"
          onClick={addImage}
          disabled={images.length >= 4 || lastImageIsEmpty}
        >
          新增圖片
        </button>
      </div>
      <div>
        <button
          className="btn btn-outline-danger btn-sm d-block w-100"
          onClick={deleteImage}
          disabled={images.length === 0 || images[0] === ""}
        >
          刪除圖片
        </button>
      </div>
    </>
  );
};

export default ProductImagesForm;
