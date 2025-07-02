import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import TextInput from "../components/Shared/TextInput";
import PassInput from "../components/Shared/PassInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";

const Signup = () => {
    const [userId, setUserId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const signUp = async () => {
        if (email !== confirmEmail) {
            alert("Email and confirm email must match.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and confirm password must match.");
            return;
        }

        const data = { email, password, userId, firstName, lastName };
        const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);

        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, { path: "/", expires: date });
            alert("Signup Successful!");
            navigate("/");
        } else {
            alert("Signup Failed!");
        }
    };

    return (
        <div className="flex w-full h-full min-h-screen justify-center items-center bg-[url('https://wallpaperaccess.com/full/254381.jpg')] bg-cover bg-center p-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-6 sm:px-6 sm:py-8 w-full max-w-sm overflow-y-auto max-h-[90vh]">
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    Sign Up to <span className="text-yellow-500">Travel</span><span className="text-teal-500">Buddy</span>
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); signUp(); }}>
                    <TextInput
                        type="text"
                        placeholder="User ID"
                        className="my-2"
                        value={userId}
                        setValue={setUserId}
                    />
                    <TextInput
                        type="text"
                        placeholder="First Name"
                        className="my-2"
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <TextInput
                        type="text"
                        placeholder="Last Name"
                        className="my-2"
                        value={lastName}
                        setValue={setLastName}
                    />
                    <TextInput
                        type="email"
                        placeholder="Email"
                        className="my-2"
                        value={email}
                        setValue={setEmail}
                    />
                    <TextInput
                        type="email"
                        placeholder="Confirm Email"
                        className="my-2"
                        value={confirmEmail}
                        setValue={setConfirmEmail}
                    />
                    <PassInput
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                    />
                    <PassInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                    />

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-gray-700 text-white font-semibold text-sm py-2 px-6 rounded-full hover:bg-white hover:text-gray-700 border border-gray-700 transition"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="text-center mt-5 text-sm text-gray-700 font-medium">
                    Already have an account?
                </div>
                <div className="flex justify-center mt-2">
                    <Link
                        to="/login"
                        className="bg-slate-700 text-white text-sm px-5 py-1.5 rounded-full font-medium hover:bg-white hover:text-slate-700 border border-slate-700 transition"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;

