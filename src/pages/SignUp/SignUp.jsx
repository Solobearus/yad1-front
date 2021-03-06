import React, { useState } from "react";
import "./SignUp.css";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/Input/Input";
import { register } from "../../api";
import { userAuthSlice } from "../../store/slices";

const SignUp = () => {
  const { text } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const checkPassword = (comparePassword) => {
    console.log("validate password");
  };

  const handleSubmit = async () => {
    const result = await register(email, password, phone);
    dispatch(userAuthSlice.actions.setToken(result.token));
  };
  return (
    <div className="signUp" data-testid="signUp">
      <div className="signUp_welcome">{text.default.sign_up.welcome}</div>
      <Input
        type="text"
        placeholder={text.default.main.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder={text.default.main.password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Input
        type="text"
        placeholder={text.default.main.repeat_password}
        onChange={(e) => {
          checkPassword(e.target.value);
        }}
      />
      <Input
        type="tel"
        pattern="[0-9]{3} [0-9]{2}-[0-9]{3}-[0-9]{4}"
        placeholder={text.default.main.phone_format}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />

      <Button
        value={text.default.sign_up.submit}
        onClick={() => {
          console.log("signed up");
          handleSubmit();
        }}
      />
    </div>
  );
};

export default SignUp;
