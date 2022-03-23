import styled from "styled-components";

export default styled.div`
    background: ${props => props.theme.logoImage.backgroundImage};
    width: 40px;
    height: 55px;
    background-size: cover;
  font-size: calc(10px + 2vmin);
`