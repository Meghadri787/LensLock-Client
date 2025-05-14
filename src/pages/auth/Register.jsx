// import React, { useState, useCallback, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { FaRegUser } from "react-icons/fa";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import Input from "../../components/ui/Input";
// import { useAuthStore } from "../../store/useAuthStore";
// import { toast } from "react-toastify";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const { registerUser, isLoading, isAuthenticated } = useAuthStore();
//     const navigate = useNavigate();

//     useEffect(() => {
//         let isMounted = true;
//         if (isAuthenticated && isMounted) {
//             // navigate("/dashboard");
//         }
//         return () => {
//             isMounted = false;
//         };
//     }, [isAuthenticated]);

//     const handleChange = useCallback((e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     }, []);

//     const validate = () => {
//         const newErrors = {};
//         if (!formData.name.trim()) newErrors.name = "Name is required";
//         if (!formData.email.trim()) {
//             newErrors.email = "Email is required";
//         } else if (
//             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
//         ) {
//             newErrors.email = "Invalid email address";
//         }
//         if (!formData.password) {
//             newErrors.password = "Password is required";
//         } else if (formData.password.length < 6) {
//             newErrors.password = "Password must be at least 6 characters";
//         }
//         if (!formData.confirmPassword) {
//             newErrors.confirmPassword = "Confirm your password";
//         } else if (formData.confirmPassword !== formData.password) {
//             newErrors.confirmPassword = "Passwords do not match";
//         }

//         return newErrors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationErrors = validate();
//         if (Object.keys(validationErrors).length === 0) {
//             try {
//                 const res = await registerUser(formData);
//                 if (res.success) {
//                     toast.success(res.message);
//                     navigate("/dashboard");
//                 } else {
//                     toast.error(res.message);
//                     setErrors({ api: res.message });
//                 }
//             } catch (error) {
//                 setErrors({ api: "An error occurred. Please try again later." });
//             }
//         } else {
//             setErrors(validationErrors);
//         }
//     };

//     return (
//         <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] h-screen">
//             <div className="hidden md:block">
//                 <img
//                     src="/images/background.webp"
//                     alt=""
//                     className="h-full w-full object-cover"
//                 />
//             </div>

//             <div className="flex items-center justify-center px-8">
//                 <form onSubmit={handleSubmit} className="w-full max-w-md">
//                     <div className="mb-6">
//                         <h2 className="text-3xl font-bold text-black mb-1">
//                             Create a new Account
//                         </h2>
//                         <div className="flex items-center gap-2">
//                             <span className="font-medium">to</span>
//                             <img
//                                 src="/images/logo-text.png"
//                                 alt="Lenslock Text Logo"
//                                 className="h-6"
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-4 mb-6">
//                         {/* Name */}
//                         <div>
//                             <Input
//                                 icon={<FaRegUser />}
//                                 label="Name"
//                                 placeholder="Enter your name"
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                             {errors.name && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {errors.name}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Email */}
//                         <div>
//                             <Input
//                                 icon={<MdOutlineMailOutline />}
//                                 label="Email"
//                                 placeholder="example@email.com"
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                             {errors.email && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {errors.email}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Password */}
//                         <div className="relative">
//                             <Input
//                                 icon={<RiLockPasswordLine />}
//                                 label="Password"
//                                 placeholder="Password"
//                                 type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                             />
//                             <span
//                                 className="absolute right-3 top-3 cursor-pointer text-gray-500"
//                                 onClick={() => setShowPassword((prev) => !prev)}
//                                 role="button"
//                                 aria-label={
//                                     showPassword
//                                         ? "Hide password"
//                                         : "Show password"
//                                 }
//                             >
//                                 {showPassword ? (
//                                     <AiOutlineEyeInvisible size={20} />
//                                 ) : (
//                                     <AiOutlineEye size={20} />
//                                 )}
//                             </span>
//                             {errors.password && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {errors.password}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Confirm Password */}
//                         <div className="relative">
//                             <Input
//                                 icon={<RiLockPasswordLine />}
//                                 label="Confirm Password"
//                                 placeholder="Confirm Password"
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 name="confirmPassword"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                             />
//                             <span
//                                 className="absolute right-3 top-3 cursor-pointer text-gray-500"
//                                 onClick={() =>
//                                     setShowConfirmPassword((prev) => !prev)
//                                 }
//                                 role="button"
//                                 aria-label={
//                                     showConfirmPassword
//                                         ? "Hide confirm password"
//                                         : "Show confirm password"
//                                 }
//                             >
//                                 {showConfirmPassword ? (
//                                     <AiOutlineEyeInvisible size={20} />
//                                 ) : (
//                                     <AiOutlineEye size={20} />
//                                 )}
//                             </span>
//                             {errors.confirmPassword && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {errors.confirmPassword}
//                                 </p>
//                             )}
//                         </div>
//                     </div>

//                     {errors.api && (
//                         <p className="text-red-500 text-sm mb-4 text-center">
//                             {errors.api}
//                         </p>
//                     )}

//                     <button
//                         type="submit"
//                         className="w-full py-3 bg-slate-900 text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-50"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Registering..." : "Register"}
//                     </button>

//                     <p className="text-sm text-[#3A3A3A] mt-4 text-center">
//                         Already have an account?{" "}
//                         <Link
//                             to="/auth/login"
//                             className="font-bold hover:underline text-black"
//                         >
//                             Login
//                         </Link>
//                     </p>
//                 </form>
//             </div>
//         </section>
//     );
// };

// export default Register;

// import React, { useState, useCallback, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { FaRegUser } from "react-icons/fa";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FiPhone, FiMapPin } from "react-icons/fi";
// import { FaUserTag } from "react-icons/fa";
// import Input from "../../components/ui/Input";
// import { useAuthStore } from "../../store/useAuthStore";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     role: "user",
//     password: "",
//     confirmPassword: "",
//     profilePic: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { registerUser, isLoading, isAuthenticated } = useAuthStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated]);

//   const handleChange = useCallback((e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   }, []);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
//     ) {
//       newErrors.email = "Invalid email address";
//     }
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Confirm your password";
//     } else if (formData.confirmPassword !== formData.password) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length === 0) {
//       const payload = new FormData();
//       for (let key in formData) {
//         payload.append(key, formData[key]);
//       }

//       try {
//         const res = await registerUser(payload); // Assume `registerUser` handles FormData
//         if (res.success) {
//           toast.success(res.message);
//           navigate("/dashboard");
//         } else {
//           toast.error(res.message);
//           setErrors({ api: res.message });
//         }
//       } catch (error) {
//         setErrors({ api: "An error occurred. Please try again later." });
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   return (
//     <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] h-screen">
//       <div className="hidden md:block">
//         <img src="/images/background.webp" alt="" className="h-full w-full object-cover" />
//       </div>

//       <div className="flex items-center justify-center px-8">
//         <form onSubmit={handleSubmit} className="w-full max-w-md">
//           <div className="mb-6">
//             <h2 className="text-3xl font-bold text-black mb-1">Create a new Account</h2>
//             <div className="flex items-center gap-2">
//               <span className="font-medium">to</span>
//               <img src="/images/logo-text.png" alt="Logo" className="h-6" />
//             </div>
//           </div>

//           <div className="space-y-4 mb-6">
//             <Input icon={<FaRegUser />} label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

//             <Input icon={<MdOutlineMailOutline />} label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

//             <Input icon={<FiPhone />} label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
//             {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

//             <Input icon={<FiMapPin />} label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
//             {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

//             {/* Role Selector */}
//             <div className="relative">
//               <label className="text-sm font-medium mb-1 flex items-center gap-2"><FaUserTag /> Role</label>
//               <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none">
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//                 <option value="seller">Seller</option>
//               </select>
//             </div>

//             {/* Profile Pic */}
//             <div>
//               <label className="text-sm font-medium mb-1 block">Profile Picture</label>
//               <input type="file" name="profilePic" accept="image/*" onChange={handleChange} className="w-full text-sm" />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <Input icon={<RiLockPasswordLine />} label="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
//               <span className="absolute right-3 top-3 cursor-pointer text-gray-500" onClick={() => setShowPassword((prev) => !prev)}>
//                 {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//               </span>
//               {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">
//               <Input icon={<RiLockPasswordLine />} label="Confirm Password" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
//               <span className="absolute right-3 top-3 cursor-pointer text-gray-500" onClick={() => setShowConfirmPassword((prev) => !prev)}>
//                 {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//               </span>
//               {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
//             </div>
//           </div>

//           {errors.api && <p className="text-red-500 text-sm text-center mb-4">{errors.api}</p>}

//           <button type="submit" disabled={isLoading} className="w-full py-3 bg-slate-900 text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-50">
//             {isLoading ? "Registering..." : "Register"}
//           </button>

//           <p className="text-sm text-[#3A3A3A] mt-4 text-center">
//             Already have an account?{" "}
//             <Link to="/auth/login" className="font-bold hover:underline text-black">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Register;

import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser, FaUserShield, FaUser, FaStore, FaCameraRetro, FaUserCheck } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiPhone, FiMapPin, FiLink2, FiUserCheck } from "react-icons/fi";
import Input from "../../components/ui/Input";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";

const roleOptions = [
  { value: "user", label: "User", icon: <FaUser /> },
  { value: "photographer", label: "Photographer", icon: <FaCameraRetro /> },
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
    password: "",
    confirmPassword: "",
    bio: "",
    url: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerUser, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
        console.log("authenticated");
        
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await registerUser(formData);
        if (res.success) {
          toast.success(res.message);
          navigate("/dashboard");
        } else {
          toast.error(res.message);
          setErrors({ api: res.message });
        }
      } catch (error) {
        setErrors({ api: "An error occurred. Please try again later." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const isPhotographer = formData.role === "photographer";

  return (
    <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] h-screen ">
      <div className="hidden md:block">
        <img src="/images/background.webp" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="flex items-center justify-center px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-black mb-1">Create a new Account</h2>
            <div className="flex items-center gap-2">
              <span className="font-medium">to</span>
              <img src="/images/logo-text.png" alt="Logo" className="h-6" />
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <Input icon={<FaRegUser />} label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <Input icon={<MdOutlineMailOutline />} label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <Input icon={<FiPhone />} label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

            {/* Role Selector with Icons */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2"><FaUserCheck /> Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none">
                {roleOptions.map(({ value, label, icon }) => (
                  <option key={value} value={value}>
                    {icon}
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Photographer Fields */}
            {isPhotographer && (
              <>
                <Input icon={<FiMapPin />} label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
                <Input icon={<FiLink2 />} label="Company URL" name="url" value={formData.url} onChange={handleChange} placeholder="https://example.com" />
                <Input icon={<FiUserCheck />} label="Experience (years)" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 5" />
                <div>
                  <label className="text-sm font-medium mb-1 block">Bio</label>
                  <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none" placeholder="Write a short bio..."></textarea>
                </div>
              </>
            )}

            {/* Password */}
            <div className="relative">
              <Input icon={<RiLockPasswordLine />} label="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-500" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Input icon={<RiLockPasswordLine />} label="Confirm Password" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-500" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>

          {errors.api && <p className="text-red-500 text-sm text-center mb-4">{errors.api}</p>}

          <button type="submit" disabled={isLoading} className="w-full py-3 bg-slate-900 text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-50">
            {isLoading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-[#3A3A3A] mt-4 text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-bold hover:underline text-black">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
