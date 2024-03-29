"use client"
import Navbar from "../../../components/Navbar";
import AuthContextProvider from "../../../context/AuthContext";
import { themes } from "../../../utils/themes";

export default function Home (){
return(
    
    <AuthContextProvider>

<Navbar theme="red"/>
    <div style={{paddingTop:"5em",color:themes.red.link,top:0,left:0,position:"fixed",backgroundColor:themes.red.base,width:"100vw",height:"100%",textAlign:"center"}}>
<h1 >About myStuff:</h1>

<h2>myStuff allows you to make a home page for your online accounts.</h2>
<h2>Start by making a free account and then customize with the built in styles.</h2>
    <h1>About me:</h1>
<h2> My name is Rory Saxton and I&apos;m a self taught web-developer.</h2>
<h2>If you have questions feel free to email me at contact@rorysaxton.com</h2>
<h2>My other work can be found at <a style={{color:themes.red.link}} href="https://rorysaxton.com/">
    rorysaxton.com
    </a></h2>
<p>Thank you for checking out this project!</p>
    </div>
    yoyoo
    </AuthContextProvider>
   
)
}