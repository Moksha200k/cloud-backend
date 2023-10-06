// Modal.js

import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const Modal = ({ modal, setModal, selectedPet, onUpdate }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [characteristics, setCharacteristics] = useState("");
  const [age, setAge] = useState("");
  const [caringTips, setCaringTips] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode

  useEffect(() => {
    if (selectedPet) {
      // Populate the form fields with the selected pet's data
      setBreed(selectedPet.breed || "");
      setColor(selectedPet.color || "");
      setCharacteristics(selectedPet.characteristics || "");
      setAge(selectedPet.age || "");
      setCaringTips(selectedPet.caringTips || "");
      setSelectedImage(); // You need a way to set an image from S3 or wherever it's stored
      setIsEditMode(true); // Enter edit mode
    } else {
      // Reset form fields when creating a new pet
      setBreed("");
      setColor("");
      setCharacteristics("");
      setAge("");
      setCaringTips("");
      setSelectedImage();
      setIsEditMode(false); // Exit edit mode
    }
  }, [selectedPet]);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const payload = {
      breed,
      color,
      characteristics,
      age,
      caringTips,
      images: selectedImage
        ? [...selectedImage].map((file) => URL.createObjectURL(file))
        : [],
    };

    try {
      const url = selectedPet
        ? `https://k9upr0m3mb.execute-api.us-east-1.amazonaws.com/dev/add/${selectedPet.id}`
        : "https://k9upr0m3mb.execute-api.us-east-1.amazonaws.com/dev/";

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
            : "Data saved successfully!"
        );

        // Reset form fields after successful submission
        setBreed("");
        setColor("");
        setCharacteristics("");
        setAge("");
        setCaringTips("");
        setSelectedImage();
        setModal(false); // Close the modal
        onUpdate(); // Notify the parent component to refresh the table
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
        width="800px"
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
            <label className="font-semibold pr-2">Breed</label>
            <input
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="border-2 border-purple-600/50 w-[75%]"
              type="text"
            />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Color</label>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border-2 border-purple-600/50 w-[75%]"
              type="text"
            />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Characteristics</label>
            <input
              value={characteristics}
              onChange={(e) => setCharacteristics(e.target.value)}
              className="border-2 border-purple-600/50 w-[75%]"
              type="text"
            />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Age</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border-2 border-purple-600/50 w-[75%]"
              type="text"
            />
          </div>
          <div className="flex-row justify-between">
            <label className="font-semibold pr-2">Picture</label>
            <input
              className="border-2"
              type="file"
              accept="image/*"
              name="user[image]"
              multiple={true}
              onChange={imageChange}
            />
            <div className="flex overflow-auto my-2 p-2">
              {selectedImage &&
                [...selectedImage].map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    className="w-32 h-32 mr-1 rounded-sm border-4"
                  />
                ))}
            </div>
            {selectedImage && (
              <button
                onClick={removeSelectedImage}
                className="bg-orange-400 p-2 rounded-md text-white"
              >
                Remove This Image
              </button>
            )}
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">CaringTips</label>
            <input
              value={caringTips}
              onChange={(e) => setCaringTips(e.target.value)}
              className="border-2 border-purple-600/50 w-[75%]"
              type="text"
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
