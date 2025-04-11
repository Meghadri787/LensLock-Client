import React from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { FiKey, FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const ForgetPassword = () => {
  return (
    <section className="grid grid-cols-2 h-screen">
      <div>
        <img src={"/background.jpg"} className="object-cover h-screen" />
        
      </div>
      <div>
      <div className="font-bold text-3xl">
      <div>ForgetPassword?</div>
      </div>
      <div className="flex flex-col items-center gap-10 p-2">
        <Input
          icon={<MdOutlineMailOutline/>}
          type="email"
          placeholder="example@email.com"
          name="email"
          id="email"
          className="border border-slate-700 px-2 rounded-sm h-10"
        />
        <div className="flex flex-row gap-2">
        <Input
          icon={<FiKey />}
          type={"number"}
          placeholder={"Enter your OTP"}
          className="border border-slate-700 px-2 rounded-sm h-10"
          
        />
        <Button label={"verify"} mode="success"/>
        </div>

        <Input icon={<RiLockPasswordLine />} type="password" placeholder="**************" name="password" />
        <Input
          icon={<RiLockPasswordLine />}
          type="password"
          placeholder="****************"
          name="confirnPassword"
          id="confirm password"
          className="border border-slate-700 px-2 rounded-sm h-10"
        />

        <Button label={"Change Password"} />
      </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
