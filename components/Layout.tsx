import Head from "next/head";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DataTable from "./DataTable";
import Navbar from "./Navbar";
import DeleteModal from "./DeleteModal";
import styles from "../styles/Home.module.css";
import SearchModal from "./SearchModal";

const Layout = ({
  products,
  refreshData,
  selectedDevelopers,
  setSelectedDevelopers,
  formConditioning,
  setFormConditioning,
  form,
  setForm,
  isOpenAdd,
  setIsOpenAdd,
  isOpen, //                      <-----  list of props from index.tsx
  setIsOpen,
  isOpenDelete,
  setIsOpenDelete,
  isOpenSearch,
  setIsOpenSearch,
  deleteId,
  setDeleteId,
  editData,
  setEditData,
  selectedEditDevelopers,
  setSelectedEditDevelopers,
  handleEditClick,
  handleDeleteClick,
  deleteDeveloper,
}: any) => {
  return (
    <>
      <Head>
        <title>Province of BC - Web Applications Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.page}>
        <AddModal
          refreshData={refreshData}
          formConditioning={formConditioning}
          setFormConditioning={setFormConditioning}
          isOpenAdd={isOpenAdd}
          setIsOpenAdd={setIsOpenAdd}
          selectedDevelopers={selectedDevelopers}
          setSelectedDevelopers={setSelectedDevelopers}
          form={form}
          setForm={setForm}
          deleteDeveloper={deleteDeveloper}
        />
        <EditModal
          refreshData={refreshData}
          formConditioning={formConditioning}
          setFormConditioning={setFormConditioning}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editData={editData}
          setEditData={setEditData}
          selectedEditDevelopers={selectedEditDevelopers}
          setSelectedEditDevelopers={setSelectedEditDevelopers}
          deleteDeveloper={deleteDeveloper}
        />
        <DeleteModal
          refreshData={refreshData}
          isOpenDelete={isOpenDelete}
          setIsOpenDelete={setIsOpenDelete}
          deleteId={deleteId}
          setDeleteId={setDeleteId}
        />
        <SearchModal
          products={products}
          isOpenSearch={isOpenSearch}
          setIsOpenSearch={setIsOpenSearch}
        />
        <h1>IMB Database</h1>
        <div className={styles.align_right}>
          <div className={styles.button} onClick={() => setIsOpenAdd(true)}>
            {/* trigers isOpenAdd to display AddModal.tsx */}
            <p>Add New</p>
          </div>
          <div className={styles.button} onClick={() => setIsOpenSearch(true)}>
            <p>Search</p>
          </div>
        </div>

        <DataTable
          products={products}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          isOpenAdd={isOpenAdd}
        />
      </div>
    </>
  );
};

export default Layout;
