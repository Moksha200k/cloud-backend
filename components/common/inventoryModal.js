import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const Modal = ({ modal, setModal, selectedPet, onUpdate }) => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (selectedPet) {
      setCategory(selectedPet.category || "");
      setName(selectedPet.name || "");
      setQuantity(selectedPet.quantity || "");
      setIsEditMode(true);
    } else {
      setCategory("");
      setName("");
      setQuantity("");
      setIsEditMode(false);
    }
  }, [selectedPet]);

  const handleSubmit = async () => {
    const payload = {
      category,
      name,
      quantity
    };

    try {
      const url = selectedPet
        ? `https://k9upr0m3mb.execute-api.us-east-1.amazonaws.com/dev/update/${selectedPet.id}`
        : "https://k9upr0m3mb.execute-api.us-east-1.amazonaws.com/dev/add";

      const method = selectedPet ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(
          selectedPet
            ? "Data updated successfully!"
            : "Data added successfully!"
        );
        setCategory("");
        setName("");
        setQuantity("");
        setModal(false);
        onUpdate();
      } else {
        const data = await response.json();
        alert("Error saving data: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Failed to save data: " + error.message);
    }
  };

  return (
    <>
      <PureModal
        isOpen={modal}
        width="500px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div className="flex-row space-y-3 relative">
          <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>{isEditMode ? "Edit Item" : "Add Item"}</p>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-2 border-purple-600/50 w-[75%]"
              type="text"
            />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-purple-600/50 w-[75%]"
              type="text"
            />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Quantity</label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-2 border-purple-600/50 w-[75%]"
              type="number"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-gray-700 text-white p-3 w-full mt-5 text-lg"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </PureModal>
    </>
  );
};

export default Modal;
