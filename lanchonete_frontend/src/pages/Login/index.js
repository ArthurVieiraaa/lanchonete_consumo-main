import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  FormBox,
  FormValue,
  Title,
  InputBox,
  StyledInput,
  StyledLabel,
  Forget,
  Button,
  Register,
  ErrorMessage,
  Icon
} from './style';
import api from "../../services/api";
import { login } from "../../services/auth";
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha email e senha para continuar!");
      return;
    }
      const response = await api.post("/user/login", { email, password: senha });
      console.log("Login response:", response);
      if (response && response.data && response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        navigate("/app");
      } else {
        throw new Error("Token não recebido");
      }
  };

  return (
    <Container>
      <FormBox>
        <FormValue>
          <form onSubmit={handleSubmit}>
            <Title>Login</Title>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <InputBox>
              <Icon icon={mailOutline} />
              <StyledInput
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <StyledLabel>Usuário</StyledLabel>
            </InputBox>

            <InputBox>
              <Icon icon={lockClosedOutline} />
              <StyledInput
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <StyledLabel>Senha</StyledLabel>
            </InputBox>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit">Log in</Button>
            </div>

            <Register>
              <p>Não tenho uma conta <Link to="/register">Registrar-se</Link></p>
            </Register>
          </form>
        </FormValue>
      </FormBox>
    </Container>
  );
};

export default Login;
