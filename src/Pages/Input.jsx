import React, { useState, useEffect } from "react";
import Autocomplete from "../AutoComplete/AutoComplete";

export default function Input() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedMultiValues, setSelectedMultiValues] = useState([]);
  const [userList, setUserList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [multipleSearchUsersAndProducts, setMultipleSearchUsersAndProducts] =
    useState([]);

  /* ---- !!!!!!!!!!!!!!!!!!!!!!! ----
   J'ai pas utilisé les appels API avec terms, car j'ai repris les bases que j'avais commencer hier.
   je passe directement une fonction de recherche au composant Autocomplete qui va filtrer les données
   en fonction du texte dans l'input directement dans autoComplete.
  ---- !!!!!!!!!!!!!!!!!!!!!!! ---- */

  // const searchUsers = async (term) => {
  //   let result = await fetch(`http://localhost:3000/user/1`, {
  //     method: "POST",
  //     body: JSON.stringify({ terms: [term] }),
  //   });
  //   let data = await result.json();
  //   const formattedData = Array.isArray(data)
  //     ? data.map((user) => ({
  //         ...user,
  //         label: user.firstName + " " + user.lastName,
  //       }))
  //     : [];
  //   return formattedData;
  // };

  // const searchProducts = async (term) => {
  //   let result = await fetch(`http://localhost:3000/product/1`, {
  //     method: "POST",
  //     body: JSON.stringify({ terms: [term] }),
  //   });
  //   let data = await result.json();
  //   const formattedData = Array.isArray(data)
  //     ? data.map((product) => ({
  //         ...product,
  //         label: product.name,
  //       }))
  //     : [];
  //   return formattedData;
  // };

  const getData = async (type, page) => {
    let result = await fetch(`http://localhost:3000/${type}/${page}`, {
      method: "POST",
    });
    let data = await result.json();
    return Array.isArray(data.data) ? data.data : [];
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getData("user", 1);
      const formattedData = data.map((user) => ({
        ...user,
        label: `${user.firstName} ${user.lastName}`,
        icon: "faUser",
      }));
      setUserList(formattedData);
    };
    fetchUser();

    const fetchProduct = async () => {
      const data = await getData("product", 1);
      const formattedData = data.map((product) => ({
        ...product,
        label: product.name,
        icon: "faGift",
      }));
      setProductList(formattedData);
    };
    fetchProduct();
  }, []);
  useEffect(() => {
    if (userList.length > 0 && productList.length > 0) {
      setMultipleSearchUsersAndProducts([...userList, ...productList]);
    }
  }, [userList, productList]);

  const pokemonName = [
    "Salamèche",
    "Carapuce",
    "Bulbizarre",
    "Pikachu",
    "Darkrai",
    "Mew",
    "Mewtwo",
    "Dracaufeu",
    "Tortank",
    "Poissirène",
  ];

  const handleSelect = (value) => {
    setSelectedValue(value.titre || value);
  };

  const handleMultiSelect = (values) => {
    setSelectedMultiValues(values);
  };

  const searchUser = (item, searchText) => {
    const lowerText = (searchText || "").toLowerCase();
    return (
      (item.firstName && item.firstName.toLowerCase().includes(lowerText)) ||
      (item.lastName && item.lastName.toLowerCase().includes(lowerText))
    );
  };

  const searchProduct = (item, searchText) => {
    const lowerText = (searchText || "").toLowerCase();
    return item.name && item.name.toLowerCase().includes(lowerText);
  };

  const seatchMultipleUsersAndProducts = (item, searchText) => {
    const lowerText = (searchText || "").toLowerCase();
    return (
      (item.firstName && item.firstName.toLowerCase().includes(lowerText)) ||
      (item.lastName && item.lastName.toLowerCase().includes(lowerText)) ||
      (item.name && item.name.toLowerCase().includes(lowerText)) ||
      (item.price && item.price.toString().includes(lowerText))
    );
  };

  return (
    <div>
      <h1>1. Autocomplete User simple avec data en prop</h1>
      <Autocomplete data={pokemonName} onSelect={handleSelect} />

      <h1>2. Autocomplete User simple avec data en fonction</h1>
      <Autocomplete
        data={userList}
        onSelect={handleSelect}
        searchFunction={searchUser}
      />

      <h1>3. Autocomplete User avec sélection multiple data en fonction </h1>
      <Autocomplete
        data={multipleSearchUsersAndProducts}
        onSelect={handleMultiSelect}
        searchFunction={seatchMultipleUsersAndProducts}
        isMultiSelect={true}
      />

      <h1>4. Autocomplete Product simple avec data en fonction</h1>
      <Autocomplete
        data={productList}
        onSelect={handleSelect}
        searchFunction={searchProduct}
      />

      <h1>5. Autocomplete Product avec sélection multiple data en fonction </h1>
      <Autocomplete
        data={productList}
        onSelect={handleMultiSelect}
        searchFunction={searchProduct}
        isMultiSelect={true}
      />

      <h1>6. Autocomplete avec sélection multiple data multiple en fonction</h1>
      <Autocomplete
        data={multipleSearchUsersAndProducts}
        onSelect={handleMultiSelect}
        searchFunction={seatchMultipleUsersAndProducts}
        isMultiSelect={true}
      />

      <h1>
        7. Autocomplete Product multiple avec template et data en fonction
      </h1>
      <Autocomplete
        data={multipleSearchUsersAndProducts}
        onSelect={handleMultiSelect}
        searchFunction={seatchMultipleUsersAndProducts}
        isMultiSelect={true}
      />
    </div>
  );
}
