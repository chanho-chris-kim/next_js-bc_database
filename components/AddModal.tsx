import styles from "../styles/Home.module.css";
import uniqid from "uniqid";
import { useState } from "react";
import { useRouter } from "next/router";

interface FormData {
  productName: string;
  productOwnerName: string;
  Developers: any;
  scrumMasterName: string;
  startDate: string;
  methodology: string;
}

function AddModal({
  formConditioning,
  setFormConditioning,
  isOpenAdd,
  setIsOpenAdd,
  selectedDevelopers,
  setSelectedDevelopers,
  form,
  setForm,
  deleteDeveloper,
}: any) {
  const URL = "http://localhost:3000/api/product";
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handlePostSubmit = async (data: FormData) => {
    if (!data.productName) {
      setFormConditioning("Can't leave product name empty");
      return;
    } else if (!data.productOwnerName) {
      setFormConditioning("Can't leave product owner name empty");
      return;
    } else if (selectedDevelopers.length == 0) {
      setFormConditioning("Can't leave developers empty");
      return;
    } else if (!data.scrumMasterName) {
      setFormConditioning("Can't scrum master name empty");
      return;
    } else if (!data.startDate) {
      setFormConditioning("Can't leave start date empty");
      return;
    } else if (!data.methodology) {
      setFormConditioning("Can't leave methodology empty");
      return;
    } else {
      try {
        setForm({ ...form, Developers: selectedDevelopers });
        addProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function addProduct(data: FormData) {
    try {
      fetch(URL, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setFormConditioning()
        setForm({
          productName: "",
          productOwnerName: "",
          Developers: "",
          scrumMasterName: "",
          startDate: "",
          methodology: "",
        });
        setIsOpenAdd(false);
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectingDevelopers = (e: any) => {
    if (selectedDevelopers.includes(e.target.value)) {
      return;
    } else if (selectedDevelopers.length < 5) {
      setSelectedDevelopers((prev: any) => [...prev, e.target.value]);
      setForm((prev: any) => {
        const developers = JSON.parse(prev.Developers);
        return {
          ...prev,
          Developers: JSON.stringify([...developers, e.target.value]),
        };
      });
    } else {
      console.log("exceeded 5");
    }
  };

  if (isOpenAdd) {
    return (
      <div className={styles.modal_background}>
        <div className={styles.modal_div}>
          <div className={styles.modal}>
            <div className={styles.x} onClick={() => setIsOpenAdd(false)}>
              <p className={styles.x_text}>X</p>
            </div>
            <h2 className={styles.h2}>Add</h2>
            <p className={styles.form_condition}>{formConditioning}</p>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                handlePostSubmit(form);
              }}
            >
              <label>
                Product Name:
                <textarea
                  placeholder="productName"
                  value={form.productName}
                  onChange={(e) =>
                    setForm({ ...form, productName: e.target.value })
                  }
                />
              </label>
              <label>
                Product Owner Name:
                <select
                  value={form.productOwnerName}
                  onChange={(e) =>
                    setForm({ ...form, productOwnerName: e.target.value })
                  }
                >
                  <option value="" disabled selected></option>
                  <option value="Lisa">Lisa</option>
                  <option value="Alan">Alan</option>
                  <option value="Michael">Michael</option>
                  <option value="Frankie">Frankie</option>
                  <option value="Jason">Jason</option>
                  <option value="Hassan">Hassan</option>
                  <option value="Hanna">Hanna</option>
                  <option value="Vincent">Vincent</option>
                  <option value="Cornelia">Cornelia</option>
                  <option value="Anna">Anna</option>
                  <option value="Katie">Katie</option>
                </select>
              </label>
              <label>
                Developers:
                <select
                  multiple
                  value={[form.Developers]}
                  onChange={(e) => handleSelectingDevelopers(e)}
                >
                  <option value="Alan">Alan</option>
                  <option value="Michael">Michael</option>
                  <option value="Frankie">Frankie</option>
                  <option value="Jason">Jason</option>
                  <option value="Hassan">Hassan</option>
                  <option value="Hanna">Hanna</option>
                  <option value="Vincent">Vincent</option>
                  <option value="Cornelia">Cornelia</option>
                  <option value="Anna">Anna</option>
                  <option value="Katie">Katie</option>
                </select>
              </label>
              <div className={styles.selected_developers_box}>
                {selectedDevelopers.map((selectedDeveloper: string) => (
                  <div key={uniqid()} className={styles.selected_developers}>
                    <p>{selectedDeveloper}</p>
                    <p
                      className={styles.mini_delete}
                      onClick={() => {
                        deleteDeveloper(selectedDeveloper, "add");
                      }}
                    >
                      x
                    </p>
                  </div>
                ))}
              </div>
              <label>
                Scrum Master Name:
                <select
                  value={form.scrumMasterName}
                  onChange={(e) =>
                    setForm({ ...form, scrumMasterName: e.target.value })
                  }
                >
                  <option value="" disabled selected></option>
                  <option value="Lisa">Lisa</option>
                </select>
              </label>
              <label>
                Start Date:
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                ></input>
              </label>
              <label>
                Methodology:
                <select
                  value={form.methodology}
                  onChange={(e) =>
                    setForm({ ...form, methodology: e.target.value })
                  }
                >
                  <option value="" disabled selected></option>
                  <option value="Waterfall">Waterfall</option>
                  <option value="Agile">Agile</option>
                </select>
              </label>
              <button type="submit" className={styles.button}>
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    null;
  }
}

export default AddModal;