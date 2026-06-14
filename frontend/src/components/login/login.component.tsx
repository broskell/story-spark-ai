import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { WandSparkles, BookOpen, UsersRound } from "lucide-react";

import SSInput from "../ui-component/ss-input/ss-input";
import SSButton from "../ui-component/ss-button/ss-button";

import {
  useLoginUserMutation,
  useGoogleLoginMutation,
} from "../../redux/apis/auth.api";

import { storeUserInfo } from "../../services/auth.service";
import RedirectComponent from "../redirect.component";


type Inputs = {
  email: string;
  password: string;
};


const LoginComponent = () => {
  const [loginUser] = useLoginUserMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });


  const [isBusy, setIsBusy] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsBusy(true);

    try {
      const res = await loginUser(data).unwrap();

      if (res.data.accessToken) {
        toast.success("User logged in successfully!");

        storeUserInfo({
          accessToken: res.data.accessToken,
        });

        setIsLoggedIn(true);
      }

    } catch {

      toast.error(
        "Login failed. Please check your credentials."
      );

    } finally {
      setIsBusy(false);
    }
  };



  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {

    setIsBusy(true);

    try {

      const res = await googleLogin({
        token: credentialResponse.credential,
      }).unwrap();


      if (res.data.accessToken) {

        toast.success(
          "User logged in successfully with Google!"
        );


        storeUserInfo({
          accessToken: res.data.accessToken,
        });


        setIsLoggedIn(true);
      }


    } catch {

      toast.error(
        "Failed to login with Google. Please try again."
      );

    } finally {

      setIsBusy(false);

    }

  };



  const handleGoogleLoginError = () => {
    toast.error(
      "Google login failed. Please try again."
    );
  };



  if (isLoggedIn) {
    return (
      <RedirectComponent defaultPath="/dashboard" />
    );
  }



  return (

<div className="
min-h-screen 
bg-white 
dark:bg-[#0B1120]
text-slate-900 
dark:text-slate-100
flex 
items-center 
justify-center
relative 
overflow-hidden
px-4
">


{/* Background */}

<motion.div
initial={{opacity:0,scale:0.8}}
animate={{opacity:1,scale:1}}
transition={{duration:1.5}}
className="
absolute
top-[-10%]
left-[-10%]
w-96
h-96
bg-blue-600/20
rounded-full
blur-[120px]
"
/>


<motion.div
initial={{opacity:0,scale:0.8}}
animate={{opacity:1,scale:1}}
transition={{duration:1.5,delay:0.2}}
className="
absolute
bottom-[-10%]
right-[-10%]
w-96
h-96
bg-indigo-600/20
rounded-full
blur-[120px]
"
/>



<div className="
w-full
max-w-6xl
grid
grid-cols-1
lg:grid-cols-2
gap-12
items-center
relative
z-10
">



{/* LEFT SIDE */}

<motion.div
initial={{opacity:0,x:-20}}
animate={{opacity:1,x:0}}
className="
hidden
lg:flex
flex-col
gap-6
"
>


<h1 className="
text-5xl
font-bold
bg-gradient-to-r
from-blue-400
to-purple-700
bg-clip-text
text-transparent
">

Turn Ideas Into
<br/>
Unforgettable Stories

</h1>


<p className="
text-lg
text-slate-500
dark:text-slate-400
">

AI powered storytelling that helps you
create, connect and inspire.

</p>



<div className="
flex
gap-4
border
rounded-2xl
p-4
bg-slate-50
dark:bg-slate-800
">

<WandSparkles className="text-violet-600"/>

<div>

<h3 className="font-semibold">
Smart Writing
</h3>

<p className="text-sm text-slate-500">
AI that understands your ideas
</p>

</div>

</div>




<div className="
flex
gap-4
border
rounded-2xl
p-4
bg-slate-50
dark:bg-slate-800
">

<BookOpen className="text-violet-600"/>

<div>

<h3 className="font-semibold">
Endless Creativity
</h3>

<p className="text-sm text-slate-500">
Stories that captivate and inspire
</p>

</div>

</div>




<div className="
flex
gap-4
border
rounded-2xl
p-4
bg-slate-50
dark:bg-slate-800
">

<UsersRound className="text-violet-600"/>

<div>

<h3 className="font-semibold">
Built For Everyone
</h3>

<p className="text-sm text-slate-500">
Writers, creators and dreamers
</p>

</div>

</div>


</motion.div>





{/* LOGIN CARD */}


<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="
bg-slate-50
dark:bg-slate-800/60
border
rounded-2xl
p-8
shadow-2xl
"
>


<button
onClick={()=>window.location.href="/"}
className="
text-sm
text-blue-400
mb-5
"
>

← Back to Home

</button>



<div className="text-center mb-6">

<h2 className="
text-2xl
font-bold
bg-gradient-to-r
from-blue-400
to-indigo-400
bg-clip-text
text-transparent
">

Welcome Back

</h2>


<p className="text-sm text-slate-500">

Sign in to your Story Spark AI account

</p>

</div>




<form
onSubmit={handleSubmit(onSubmit)}
className="space-y-5"
>


<SSInput

label="Email address"

name="email"

type="email"

placeholder="Enter your email"

required

icon="fi fi-rr-envelope"

register={register}

validation={{
required:"Email is required"
}}

error={errors.email}

/>



<SSInput

label="Password"

name="password"

type="password"

placeholder="Enter your password"

required

icon="fi fi-rr-lock"

register={register}

validation={{
required:"Password is required"
}}

error={errors.password}

/>


<div className="text-right">

<Link
to="/forgot-password"
className="
text-xs
text-blue-400
"
>

Forgot Password?

</Link>


</div>



<SSButton

text="Sign In"

type="submit"

isLoading={isBusy}

/>


</form>




<div className="
my-6
border-t
"
/>



<div className="flex justify-center">


<GoogleLogin

onSuccess={handleGoogleLoginSuccess}

onError={handleGoogleLoginError}

/>


</div>



<p className="
text-center
mt-6
text-sm
text-slate-500
">


Don't have an account?


<Link

to="/signup"

className="
ml-1
text-blue-400
font-bold
"

>

Sign up for free

</Link>


</p>



</motion.div>



</div>



<Toaster
position="top-right"
/>


</div>

  );

};



export default LoginComponent;