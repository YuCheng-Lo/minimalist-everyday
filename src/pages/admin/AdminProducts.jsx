import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import AdminProductModal from "../../components/AdminProductModal";
import { useProductModal } from "../../hooks/useProductModal";
import ProductTable from "../../components/ProductTable";
import { useAdminProducts } from "../../hooks/useAdminProducts";

const AdminProducts = () => {
  const { products, pagination, isLoading, getProducts } = useAdminProducts();

  const {
    productModalRef,
    templateProduct,
    modalMode,
    openModal,
    closeModal,
    handleUploadImage,
    handleTemplateChange,
    handleMainImageUrlChange,
    handleImagesUrlChange,
    addImage,
    deleteImage,
    handleModalConfirm,
  } = useProductModal();

  return (
    <>
      <div className="container py-3">
        {isLoading ? (
          <div className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-white">
            <Loading text="商品內容載入中..." />
          </div>
        ) : (
          <>
            <div className="text-end mt-4">
              <button
                className="btn btn-primary"
                //呼叫時用 modalInstance
                onClick={() => openModal("create")}
              >
                建立新的產品
              </button>
            </div>
            <ProductTable products={products} openModal={openModal} />
            <Pagination pagination={pagination} onPageChange={getProducts} />
          </>
        )}
      </div>
      {/*將 productModalRef 傳進去抓取 DOM*/}
      <AdminProductModal
        ref={productModalRef}
        closeModal={closeModal}
        templateProduct={templateProduct}
        handleTemplateChange={handleTemplateChange}
        modalMode={modalMode}
        handleMainImageUrlChange={handleMainImageUrlChange}
        handleImagesUrlChange={handleImagesUrlChange}
        addImage={addImage}
        deleteImage={deleteImage}
        handleModalConfirm={() => handleModalConfirm(getProducts)}
        handleUploadImage={handleUploadImage}
      />
    </>
  );
};

export default AdminProducts;
