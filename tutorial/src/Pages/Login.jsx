import { useState } from "react";
import TextInput from "../components/Shared/TextInput";
import PassInput from "../components/Shared/PassInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const login = async () => {
        const data = { email, password };
        const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);

        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, { path: "/", expires: date });
            alert("Login Successful!");
            navigate("/home");
        } else {
            alert("Login Failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex w-full h-full min-h-screen justify-center items-center bg-[url('https://wallpaperaccess.com/full/254381.jpg')] bg-cover bg-center p-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-6 sm:px-6 sm:py-8 w-full max-w-sm overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-center items-center mb-6">
                    <span className="text-3xl font-serif font-bold text-yellow-500">Travel</span>
                    <span className="text-xl font-bold text-teal-500 ml-1">Buddy</span>
                </div>

                {/* Form */}
                <form onSubmit={(e) => { e.preventDefault(); login(); }}>
                    <TextInput
                        type="email"
                        placeholder="Email"
                        className="my-2"
                        value={email}
                        setValue={setEmail}
                    />
                    <PassInput
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                    />
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-gray-700 text-white text-sm font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-gray-700 border border-gray-700 transition"
                        >
                            LOG IN
                        </button>
                    </div>
                </form>

                {/* Signup redirect */}
                <div className="text-center mt-6 text-sm text-gray-700 font-medium">
                    Don’t have an account?
                </div>
                <div className="flex justify-center mt-2">
                    <Link
                        to="/signup"
                        className="bg-slate-700 text-white text-sm px-5 py-1.5 rounded-full font-medium hover:bg-white hover:text-slate-700 border border-slate-700 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
