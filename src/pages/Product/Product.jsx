import React, { useEffect, useState } from "react";
import "./Product.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ItemGallery from "../../components/ItemGallery/ItemGallery";
import Button from "../../components/Button/Button";
import text from "../../locales/en";
import { Link } from "react-router-dom";
import imagePlaceholder from "../../images/imagePlaceholder.jpg";
import { fetchProduct } from "../../api";

const Product = ({ images }) => {
  // const { products } = useSelector((state) => state.products);
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const handleOnSubmitClick = () => {
    console.log(`handleOnSubmitClick`);
  };

  useEffect(() => {
    const func = async () => {
      const product = await fetchProduct(id);
      setProduct(product);
    };
    func();
  }, []);

  return (
    <div className="product" data-testid="product">
      <Link className="product_info_link" to={`/products`}>
        🔙
      </Link>
      {product ? (
        <>
          <ItemGallery>
            {product.images &&
              product.images.map((image, index) => (
                <img
                  key={`${index}`}
                  className="itemInGallery__img"
                  src={`${image ? process.env.REACT_APP_S3_BUCKET_ADRESS + image : imagePlaceholder}`}
                  alt={`${product.name}_${index}`}
                ></img>
              ))}
          </ItemGallery>

          <div className="product__info">
            <h3>{product.name}</h3>
            <h4>Condition : {product.condition}</h4>
            <h4>Category : {product.category}</h4>
            <p>{product.description}</p>
            <div className="product__footer">
              <div className="product__footer_item">{product.location}</div>
              <Button value={text.product.submit} onClick={() => handleOnSubmitClick()} />
              <div className="product__footer_item">{product.price}</div>
            </div>
          </div>
        </>
      ) : (
        <div>404 : product is not found</div>
      )}
    </div>
  );
};

export default Product;
