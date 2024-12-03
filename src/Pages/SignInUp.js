import React, { useState } from "react";
import * as Components from "../Components/Components";
import { useNavigate } from "react-router-dom";

const SignInUp = () => {
  const navigate = useNavigate();
  // 상태 이름을 더 직관적으로 변경
  const [isSignIn, setIsSignIn] = useState(true);
  const [upInput, setUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [inInput, setInInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(upInput));
    setUpInput({
      name: "",
      email: "",
      password: "",
    });
    // 로그인 화면으로 전환
    setIsSignIn(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if (
      inInput.email === loggeduser.email &&
      inInput.password === loggeduser.password
    ) {
      localStorage.setItem("loggedin", true);
      navigate("/");
    } else {
      alert("Wrong Email or Password");
    }
  };

  // JSX 반환
  return (
    <Components.Container>
      {/* 회원가입 화면 */}
      <Components.SignUpContainer signinIn={isSignIn}>
        <Components.Form onSubmit={handleSubmit}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            name="name"
            value={upInput.name}
            onChange={(e) =>
              setUpInput({
                ...upInput,
                [e.target.name]: e.target.value,
              })
            }
            type="text"
            placeholder="Name"
          />
          <Components.Input
            name="email"
            value={upInput.email}
            onChange={(e) =>
              setUpInput({
                ...upInput,
                [e.target.name]: e.target.value,
              })
            }
            type="email"
            placeholder="Email"
          />
          <Components.Input
            name="password"
            value={upInput.password}
            onChange={(e) =>
              setUpInput({
                ...upInput,
                [e.target.name]: e.target.value,
              })
            }
            type="password"
            placeholder="Password"
          />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      {/* 로그인 화면 */}
      <Components.SignInContainer signinIn={isSignIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            name="email"
            value={inInput.email}
            onChange={(e) =>
              setInInput({
                ...inInput,
                [e.target.name]: e.target.value,
              })
            }
            type="email"
            placeholder="Email"
          />
          <Components.Input
            name="password"
            value={inInput.password}
            onChange={(e) =>
              setInInput({
                ...inInput,
                [e.target.name]: e.target.value,
              })
            }
            type="password"
            placeholder="Password"
          />
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      {/* 전환 애니메이션을 포함한 오버레이 */}
      <Components.OverlayContainer signinIn={isSignIn}>
        <Components.Overlay signinIn={isSignIn}>
          {/* 로그인으로 전환 */}
          <Components.LeftOverlayPanel signinIn={isSignIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us, please login with your personal info.
            </Components.Paragraph>
            <Components.GhostButton onClick={() => setIsSignIn(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          {/* 회원가입으로 전환 */}
          <Components.RightOverlayPanel signinIn={isSignIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start your journey with us.
            </Components.Paragraph>
            <Components.GhostButton onClick={() => setIsSignIn(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default SignInUp;
