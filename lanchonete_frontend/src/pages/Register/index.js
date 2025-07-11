import { lockClosedOutline, mailOutline, personOutline } from "ionicons/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  Button,
  Container,
  ErrorMessage,
  FormBox,
  FormValue,
  Icon,
  InputBox,
  Login,
  StyledInput,
  StyledLabel,
  Title,
} from "./style"; // Ajuste o caminho conforme necessário

const Register = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !senha || !nome) {
      setError("Preencha email, senha e nome para continuar!");
      return;
    }
    try {
      await api.post("/user", { name: nome, email: email, password: senha });
      navigate("/login");
    } catch (err) {
      setError("Houve um problema ao cadastrar. Tente novamente.");
    }
  };

  return (
    <Container>
      <FormBox>
        <FormValue>
          <form onSubmit={handleSignUp}>
            <Title>Cadastre-se</Title>

            <InputBox>
              <StyledInput
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <StyledLabel>Nome</StyledLabel>
              <Icon icon={personOutline} />
            </InputBox>

            <InputBox>
              <StyledInput
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <StyledLabel>Email</StyledLabel>
              <Icon icon={mailOutline} />
            </InputBox>

            <InputBox>
              <StyledInput
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <StyledLabel>Senha</StyledLabel>
              <Icon icon={lockClosedOutline} />
            </InputBox>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit">Cadastrar</Button>
            </div>

            <Login>
              <p>
                Já tem uma conta? <a href="/login">Log in</a>
              </p>
            </Login>
          </form>
        </FormValue>
      </FormBox>
    </Container>
  );
};
export default Register;