import { forwardRef } from "react";
import ProductImagesForm from "./ProductImagesForm";
import ProductBasicForm from "./ProductBasicForm";
import ProductDescriptionForm from "./ProductDescriptionForm";

const AdminProductModal = forwardRef((props, ref) => {
  const {
    closeModal,
    templateProduct,
    handleTemplateChange,
    modalMode,
    handleMainImageUrlChange,
    handleImagesUrlChange,
    addImage,
    deleteImage,
    handleModalConfirm,
    handleUploadImage,
  } = props;

  return (
    <>
      <div
        ref={ref}
        id="productModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content border-0">
            <div
              className={`modal-header ${
                modalMode === "delete" ? "bg-danger" : "bg-dark"
              } text-white`}
            >
              <h5 id="productModalLabel" className="modal-title">
                <span>
                  {modalMode === "create"
                    ? "新增產品"
                    : modalMode === "edit"
                      ? "編輯產品"
                      : "刪除產品"}
                </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                // data-bs-dismiss="modal"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {modalMode === "delete" ? (
                <p className="h2">
                  確定要刪除
                  <span className="text-danger">{templateProduct.title}</span>
                  嗎?
                </p>
              ) : (
                <div className="row">
                  <div className="col-sm-4">
                    <ProductImagesForm
                      templateProduct={templateProduct}
                      handleMainImageUrlChange={handleMainImageUrlChange}
                      handleImagesUrlChange={handleImagesUrlChange}
                      handleUploadImage={handleUploadImage}
                      addImage={addImage}
                      deleteImage={deleteImage}
                    />
                  </div>
                  <div className="col-sm-8">
                    <ProductBasicForm
                      templateProduct={templateProduct}
                      handleTemplateChange={handleTemplateChange}
                    />
                    <hr />
                    <ProductDescriptionForm
                      templateProduct={templateProduct}
                      handleTemplateChange={handleTemplateChange}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                // data-bs-dismiss="modal"
                onClick={closeModal}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalConfirm}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default AdminProductModal;
