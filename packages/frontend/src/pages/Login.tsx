import React, { useActionState } from "react";  
import { Link, useNavigate } from "react-router";
import "../styles/login.css";

interface ILoginPage {
    isRegistering: boolean;
    setAuthToken: (authToken: string) => void;
}

async function submitRegistration(url: string, username: string, password: string): Promise<{type: string, message: string, token?: string}> {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        });

        if (res.ok) {
            const token = await res.text();
            return {
                type: "success",
                message: `You have successfully ${url.includes("register") ? "registered" : "logged in"}!`,
                token: token
            };
        }
        else {
            return {
                type: "error",
                message: `${url.includes("register") ? "Registration" : "Login"} failed. Incorrect username or password.`
            };
        }
    }
    catch {
        return {
            type: "error",
            message: `${url.includes("register") ? "Registration" : "Login"} failed. Network error.`
        };
    }
}

export function LoginPage(props: ILoginPage) {
    const usernameInputId = React.useId();
    const passwordInputId = React.useId();
    const navigate = useNavigate();
    
    const [result, submitAction, isPending] = useActionState(
        async (_previousState: unknown, formData: FormData) => {
            const username = formData.get("username") as string;
            const password = formData.get("password") as string;

            if (!username || !password) {
                return {
                    type: "error",
                    message: "Please fill in your username and password.",
                };
            }

            if (props.isRegistering) {
                const result = await submitRegistration("/auth/register", username, password);
                if (result.type === "success") {
                    console.log("Successfully registered!");
                    console.log(`Auth token: ${result.token}`);
                    if (result.token) {
                        props.setAuthToken(result.token);
                        navigate('/');
                    }
                }
                return result;
            }
            else {
                const result = await submitRegistration("/auth/login", username, password);
                if (result.type === "success") {
                    console.log(`Auth token: ${result.token}`);
                    if (result.token) {
                        props.setAuthToken(result.token);
                        navigate('/');
                    }
                }
                return result;
            }
        },
        null
    );

    return (
        <>
          {props.isRegistering ? <h1 className="h1-login">Register a new account</h1> : <h1 className="h1-login">Login</h1>}
          <div className="login-container">
            <form className="LoginPage-form" action={submitAction}>
                <div className="form-elements">
                  <label htmlFor={usernameInputId}>Username</label>
                  <input id={usernameInputId} required name="username" disabled={isPending} />
                </div>
                
                <div className="form-elements">
                  <label htmlFor={passwordInputId}>Password</label>
                  <input id={passwordInputId} type="password" name="password" required disabled={isPending} />
                </div>

                <div className="login-buttons-container">
                  <input className="login-buttons" type="submit" value="Submit" disabled={isPending} />
                  {!props.isRegistering && <p>Don't have an account? <Link className="register-link" to="/register">Register here</Link></p>}
                </div>
                {result?.type === "error" && <p className="submit-error" aria-live="polite">{result.message}</p>}
            </form>
          </div>
        </>
    );
}
