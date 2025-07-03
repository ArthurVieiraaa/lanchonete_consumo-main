import styled from 'styled-components';

export const SidebarContainer = styled.div`
  /* Gradiente vibrante como fundo */
  background: linear-gradient(to bottom, rgba(28, 37, 65, 0.85), rgba(43, 58, 103, 0.85));
  
  /* O efeito de vidro fosco que desfoca o conteúdo atrás */
  backdrop-filter: blur(10px);

  /* Uma borda sutil para definir a aresta do "vidro" */
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  
  /* Animação mais suave com 'cubic-bezier' para um toque profissional */
  transition: width 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  width: ${props => props.isOpen ? '220px' : '70px'};
`;

export const ToggleButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  
  /* Fundo translúcido para integrar com o tema de vidro */
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white; /* Cor do ícone */
  
  position: absolute;
  right: -17px;
  top: 20px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Rotação suave do ícone */
  transition: transform 0.4s ease, background 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  /* O ícone dentro do botão deve ser um componente, como react-icons */
  svg {
      transition: transform 0.4s ease;
      transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

export const NavMenu = styled.nav`
  /* Adiciona um espaço no topo para o logo ou título, se houver */
  padding: 80px 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 8px 12px; /* Margem para os links não ficarem colados */
  }

  a {
    color: #E0E0E0; /* Um branco levemente acinzentado para suavidade */
    text-decoration: none;
    font-weight: 500;
    
    padding: 12px 15px;
    border-radius: 8px; /* Bordas arredondadas para um visual de "pílula" */
    
    display: flex;
    align-items: center;
    gap: 15px;

    transition: background-color 0.3s, color 0.3s;
    
    /* Ícone do link */
    svg {
        font-size: 1.2rem;
        flex-shrink: 0; /* Garante que o ícone não encolha */
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
    }

    /* Estilo para o link ativo */
    &.active {
      background-color: rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      font-weight: 600;
    }
  }

  /* Efeito de animação para o texto do link */
  span {
    white-space: nowrap;
    opacity: ${props => props.isOpen ? 1 : 0};
    /* Transição mais elaborada */
    transition: opacity 0.3s ease-in-out 0.1s, transform 0.3s ease-in-out 0.1s;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-15px)'};
    pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  }
`;