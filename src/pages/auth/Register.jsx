import React from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Register = () => {
  return (
    <section className="grid grid-cols-2">
      <div>
        <img src={"/background.jpg"} className="object-cover h-screen" />
        
      </div>
      <div>
      <div>Create A new account to LENSLOCK</div>
      <div className="flex flex-col gap-10 p-2">
      <Input
          icon={<FaRegUser />}
          type="name"
          placeholder="enter your name here"
          className="border border-slate-700 px-2 rounded-sm h-10"
        />


 <Input
          icon={<MdOutlineMailOutline/>}
          type="email"
          placeholder="example@email.com"
          name="email"
          id="email"
          className="border border-slate-700 px-2 rounded-sm h-10"
        />
        
        <Input icon={<RiLockPasswordLine />} type="password" placeholder="******" name="password" />
        
        <Button label={"Register"} />
      </div>
      </div>
    </section>
  );
};

export default Register;