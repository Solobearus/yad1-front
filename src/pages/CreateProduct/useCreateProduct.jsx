import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { productsSlice } from "../../store/slices";
import { useParams } from "react-router-dom";

export const useCreateProduct = () => {
  const { categories, conditions, locations } = useSelector(
    (state) => state.search
  );

  const { text } = useSelector((state) => state.language);
  const { id: userId, productsPosted } = useSelector(
    (state) => state.userDetails
  );
  const { products } = useSelector((state) => state.products);

  const { id: paramsId } = useParams();

  const product = products.find((product) => paramsId === product.id);

  const history = useHistory();
  const dispatch = useDispatch();

  const [images, setImages] = useState(
    product ? product.images : [null, null, null, null]
  );

  const [name, setName] = useState(product ? product.name : "test");
  const [category, setCategory] = useState(product ? product.category : "Hat");
  const [location, setLocation] = useState(
    product ? product.location : "Israel"
  );
  const [condition, setCondition] = useState(
    product ? product.condition : "Good"
  );
  const [description, setDescription] = useState(
    product ? product.desc : "testtesttesttest"
  );
  const [price, setPrice] = useState(product ? product.price : 0);

  const [error, setError] = useState("");

  const handleOnSubmitClick = () => {
    if (name.trim() === "") {
      setError(text.default.error[1000]);
      return;
    }
    if (category.trim() === "" || !categories.includes(category.trim())) {
      setError(text.default.error[1001]);
      return;
    }
    if (location.trim() === "" || !locations.includes(location.trim())) {
      setError(text.default.error[1002]);
      return;
    }
    if (condition.trim() === "" || !conditions.includes(condition.trim())) {
      setError(text.default.error[1003]);
      return;
    }
    if (price < 0) {
      setError(text.default.error[1004]);
      return;
    }
    if (description.trim().length < 10 || description.trim().length > 500) {
      setError(text.default.error[1005]);
      return;
    }
    if (paramsId) {
      if (productsPosted.find((product) => product.authorId === userId)) {
        dispatch(
          productsSlice.actions.editProduct({
            id: paramsId,
            authorId: userId,
            name,
            category,
            condition,
            desc: description,
            images,
            price,
            location,
          })
        );
        history.push(`/product/${paramsId}`);
      } else {
        console.log(`error at submit`);
        setError(text.default.error[2000]);
      }
    } else {
      const randomId = Math.random() * 99999 + "";
      dispatch(
        productsSlice.actions.addProduct({
          id: randomId,
          authorId: userId,
          name,
          category,
          condition,
          desc: description,
          images,
          price,
          location,
        })
      );
      history.push(`/product/${randomId}`);
    }
  };

  const onImageChange = (image, index) => {
    const newImageURLs = [...images];
    newImageURLs[index] = URL.createObjectURL(image.files[0]);
    setImages(newImageURLs);
  };

  return {
    images,
    onImageChange,
    name,
    text,
    setName,
    category,
    setCategory,
    categories,
    location,
    setLocation,
    locations,
    condition,
    setCondition,
    conditions,
    price,
    setPrice,
    description,
    setDescription,
    error,
    handleOnSubmitClick,
  };
};
